
export interface IDeck {
    _id: string,
    deck_name: string,
    deck_description: string,
    deck_size: number,
    usercount: number,
    mothercards: Array<string> // ?? might not need
}

export interface ICard {
    // cardID: number,
    type: string,
    word: string,
    definition: string,
    status: string,
    _id: string, // mongoId
    decks: Array<[string, string]>// [deckName, deckID]
}

export interface INounCard extends ICard {
    word: string,
    definition: string,
    definitionFr?: string,
    examples: Array<[string, string]>,
    examples_translation?: string,
}


export interface IConjugateCard extends ICard {
    word: string,
    definition: string,
    tense: string, 
    conjugations: Array<string>
}


export interface IVerbCard extends ICard{
    word: string,
    definition: string,
    examples: Array<[string, string]>,
    examples_translation?: string,

}