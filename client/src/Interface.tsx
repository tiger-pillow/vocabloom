
export interface Card {
    type: string
}

export interface NounCard extends Card {
    type: string,
    definition: string,
    definitionFr?: string, 
    noun: string,
    gender: string,
    sentence: Array<string>,
    fillIndex: Array<number>, 
    fillWordLength ?: Array<number>
}

export interface Verb{
    type: string, 
    verb: string, 
    definition: string,
}

export interface VerbCard extends Card {
    type: string,
    verb: string,
    temp: string, // "present", "imparfait", "futur", "conditionel", "subjunctif", "passe compose"
    definition: string,
    definitionFr?: string,
    participePasse: string,
    firstPerson: string | undefined | null,
    secondPerson: string | undefined | null,
    thirdPerson: string | undefined | null,
    firstPersonPlural: string | undefined | null,
    secondPersonPlural: string | undefined | null,
    thirdPersonPlural: string | undefined | null,
}