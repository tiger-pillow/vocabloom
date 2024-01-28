
export interface ICard {
    type: string
}

export interface INounCard extends ICard {
    type: string,
    word: string,
    definition: string,
    definitionFr?: string, 
    gender: string,
    sentence: Array<string>,
    fillIndex: Array<number>, 
    fillWordLength ?: Array<number>
}


export interface IVerbCard extends ICard {
    type: string,
    word: string,
    definition: string,
    tense: string, 
    conjugation: Array<string>
}