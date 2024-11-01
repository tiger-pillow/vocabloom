
export interface ICard {
    // cardID: number,
    type: string,
    word: string,
    definition: string,
    status: string,
    _id: string, // mongoId
    deck: Array<[string, string]>// [deckName, deckID]
}

export interface INounCard extends ICard {
    word: string,
    definition: string,
    definitionFr?: string,
    examples: Array<[string, string]>,
    examplesTranslation?: string,
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
    examplesTranslation?: string,

}