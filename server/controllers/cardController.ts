const VerbCard = require('../schemas/verbCardSchema.ts');
const NounCard = require('../schemas/nounCardSchema.ts');
const ConjugateCard = require('../schemas/conjugateCardSchema.ts');

async function getAllCards(cardType) {
    var data;
    try {
        // Fetch all documents from the VerbCards collection
        if (cardType == "verb") {
            data = await VerbCard.find();
            
        } else if (cardType == "noun") {
            data = await NounCard.find();
        } else if (cardType == "conjugate") {
            data = await ConjugateCard.find();
        }
        return data; // Return the retrieved documents
    } catch (error) {
        console.error('Error retrieving VerbCards:', error);
        throw new Error('Could not fetch verb cards');
    }
};

module.exports =  ({getAllCards}); // Export the function for use in the route handler