const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        // Don't include password in query results by default
        select: false
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    passwordChangedAt: Date,
    // Keep track of failed login attempts for rate limiting
    loginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: Date
}, {
    timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();
    
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(12);
        // Hash the password along with the new salt
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        // Need to explicitly select password since we set select: false
        const user = await this.model('User').findById(this._id).select('+password');
        return await bcrypt.compare(candidatePassword, user.password);
    } catch (error) {
        throw error;
    }
};

// Auth controller example
const authController = {
    register: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Validate password strength
            if (!isStrongPassword(password)) {
                return res.status(400).json({
                    message: 'Password must meet strength requirements'
                });
            }

            const user = new User({
                email,
                password
            });

            await user.save();

            // Never send password back in response
            const userObject = user.toObject();
            delete userObject.password;

            res.status(201).json(userObject);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check for rate limiting
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            if (user.lockUntil && user.lockUntil > Date.now()) {
                return res.status(429).json({
                    message: 'Account temporarily locked. Try again later.'
                });
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                // Increment failed attempts
                user.loginAttempts += 1;
                
                // Lock account if too many attempts
                if (user.loginAttempts >= 5) {
                    user.lockUntil = Date.now() + (15 * 60 * 1000); // 15 minutes
                }
                
                await user.save();
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Reset login attempts on successful login
            user.loginAttempts = 0;
            user.lockUntil = null;
            await user.save();

            // Generate JWT token
            const token = generateToken(user);

            res.json({ token });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

// Password strength validation helper
function isStrongPassword(password) {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
}

// JWT token generation (using jsonwebtoken package)
function generateToken(user) {
    return jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
}