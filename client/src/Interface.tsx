
export interface Card {
    type: string
}

export interface NounCard extends Card {
    type: string,
    definition: string,
    noun: string,
    gender: string,
    sentence: Array<string>,
    fillIndex: Array<number>
}