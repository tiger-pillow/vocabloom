
export interface ICard {
    // cardID: number,
    type: string
}

export interface INounCard extends ICard {
    word: string,
    definition: string,
    definitionFr?: string, 
    gender: string,
    sentence: Array<string>,
    fillIndex: Array<number>, 
    fillWordLength ?: Array<number>
}


export interface IConjugateCard extends ICard {
    word: string,
    definition: string,
    tense: string, 
    conjugation: Array<string>
}


export interface IVerbCard extends ICard{
    word: string,
    definition: string,
    sentence: Array<[string, number]>,
}