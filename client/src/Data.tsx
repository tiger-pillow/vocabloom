import { NounCard, Card, VerbCard } from "./Interface";

export const nouns: NounCard[] = [
    {
        type: "noun",
        noun: "la réticence",
        definition: "reluctance",
        definitionFr: "la hésitation",
        gender: "la",
        sentence: ["J'ai demandé une augmentation de salaire, mais le patron a ", "la réticence", "de me donner une réponse."],
        fillIndex: [1],
    },
    {
        type: "noun",
        noun: "la pénurie",
        definition: "shortage",
        definitionFr: "la manque",
        gender: "la",
        sentence: ["Il y a", "la pénurie", "de masques en France."],
        fillIndex: [1],
    },
    {
        type: "noun",
        noun: "le rendement",
        definition: "yield",
        definitionFr: "la productivité",
        gender: "le",
        sentence: ["Le rendement", "de la machine est très bon."],
        fillIndex: [0],
    },
    {
        type: "noun",
        noun: "l'averse",
        definition: "hail, shower",
        definitionFr: "la pluie soudaine et brève",
        gender: "la",
        sentence: ["Aujourd'hui alternance", "d'averses", "et d'éclairecies sur l'Ouest beau temps sur la reste de la France."],
        fillIndex: [1],
    }
]

export const verbs: VerbCard[] = [
    {
        type: "verb",
        verb: "pleuvoir",
        definition: "to rain",
        definitionFr: "tomber de l'eau du ciel",
        temp: "present",
        participePasse: "plu", 
        firstPerson: "NA",
        secondPerson: "NA",
        thirdPerson: "pleut",
        firstPersonPlural: "NA",
        secondPersonPlural: "NA",
        thirdPersonPlural: "pleuvent", 
    }, 
    {
        type: "verb",
        verb: "pleurer",
        definition: "to cry",
        definitionFr: "verser les armes",
        temp: "present",
        participePasse: "plu", 
        firstPerson: "pleure",
        secondPerson: "pleures",
        thirdPerson: "pleure",
        firstPersonPlural: "pleurons",
        secondPersonPlural: "pleurez",
        thirdPersonPlural: "pleurent"
    }, 
    {
        type: "verb",
        verb: "pleurer",
        definition: "to cry",
        definitionFr: "verser les armes",
        temp: "imparfait",
        participePasse: "plu",
        firstPerson: "pleurais",
        secondPerson: "pleurais",
        thirdPerson: "pleurait",
        firstPersonPlural: "pleurions",
        secondPersonPlural: "pleuriez",
        thirdPersonPlural: "pleuraient"
    }, 
    {
        type: "verb",
        verb: "pleurer",
        definition: "to cry",
        definitionFr: "verser les armes",
        temp: "futur",
        participePasse: "plu",
        firstPerson: "pleurerai",
        secondPerson: "pleureras",
        thirdPerson: "pleurera",
        firstPersonPlural: "pleurerons",
        secondPersonPlural: "pleurerez",
        thirdPersonPlural: "pleureront"
    }

]


export const verbPair = [
    {
        explanation: "Start to do something",
        verb: "commencer",
        proposition1: "à",
        object1: "faire qqch",
        sentence: ["Finalement je ", "commence", " à ", "comprendre ce que ma Maman m'a dit."],
        fillIndex: [1, 2]
    },
    {
        explanation: "Decided to do something",
        verb: "décider",
        proposition1: "de",
        object1: "faire qqch",
        sentence: ["Le docteur m'a dit que je dois prendre soins de ma santé.", "Alors ", "je", "décide", " de ", "manger des fruits."],
        fillIndex: [2, 3]
    },
    {
        explanation: "Teach someone to do soemthing ",
        verb: "apprendre",
        proposition1: "à",
        object1: "qqn",
        proposition2: "à",
        object2: "faire qqch",
        sentence: ["Ma Maman ", "m'apprend", " à ", "faire du vélo."],
        fillIndex: [1, 2]
    }
]



export const adjectives = [
    "délétère",
    "raide",
]