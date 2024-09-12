const VerbCard = require('../schemas/verbCardSchema.tsx'); 

async function getAllVerbCards() {
    try {
        // Fetch all documents from the VerbCards collection
        const verbCards = await VerbCard.find();
        console.log('All VerbCards retrieved:', verbCards);
        return verbCards; // Return the retrieved documents
    } catch (error) {
        console.error('Error retrieving VerbCards:', error);
        throw new Error('Could not fetch verb cards');
    }
};

module.exports = ({getAllVerbCards});