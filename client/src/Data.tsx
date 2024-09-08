import { INounCard, ICard, IConjugateCard, IVerbCard } from "./Interface";

export const nouns: INounCard[] = [
    {
        type: "noun",
        word: "la réticence",
        definition: "reluctance",
        definitionFr: "la hésitation",
        gender: "la",
        sentence: ["J'ai demandé une augmentation de salaire, mais le patron a ", "la réticence", "de me donner une réponse."],
        fillIndex: [1],
    },
    {
        type: "noun",
        word: "la pénurie",
        definition: "shortage",
        definitionFr: "la manque",
        gender: "la",
        sentence: ["Il y a", "la pénurie", "de masques en France."],
        fillIndex: [1],
    },
    {
        type: "noun",
        word: "le rendement",
        definition: "yield",
        definitionFr: "la productivité",
        gender: "le",
        sentence: ["Le rendement", "de la machine est très bon."],
        fillIndex: [0],
    },
    {
        type: "noun",
        word: "l'averse",
        definition: "hail, shower",
        definitionFr: "la pluie soudaine et brève",
        gender: "la",
        sentence: ["Aujourd'hui alternance", "d'averses", "et d'éclairecies sur l'Ouest beau temps sur la reste de la France."],
        fillIndex: [1],
    }
]

export const verbs: IVerbCard[] = [
    {
        type: "verb",
        word: "fléchir",
        definition: "to bend",
        sentence:[
            ["Après des heures de négociations, il", 0],
            ["a", 1], 
            ["finalement", 0],
            ["fléchi", 1], 
            ["sous la pression et a accepté les conditions du contrat.", 0]
        ]
    }, 
    {
        type: "verb",
        word: "fléchir",
        definition: "to bend",
        sentence: [
            ["Les branches de l'arbre commencent à", 0],
            ["fléchir", 1],
            ["sous le poids de la neige.", 0]
        ]
    },
    {
        type: "verb",
        word: "bondir",
        definition: "to jump",
        sentence: [
            ["En entendant le bruit soudain, le chat", 0],
            ["a bondi", 1],
            ["hors de sa cachette.", 0]
        ]
    }, 
    {
        type: "verb",
        word: "bondir",
        definition: "to jump",
        sentence: [
            ["À la fin du match, les supporters", 0],
            ["ont bondi", 1],
            ["de joie pour célébrer la victoire de leur équipe.", 0]
        ]

    }
]

export const conjugates: IConjugateCard[] = [
    {
        type: "verb",
        word: "aimer",
        definition: "to like, to love",
        tense: "present",
        conjugation: ["aime", "aimes", "aime", "aimons", "aimez", "aiment"],
    }, 
    {
        type: "verb",
        word: "s'assoir",
        definition: "to sit down",
        tense: "present",
        conjugation: ["m'assieds", "t'assieds", "s'assied", "nous asseyons", "vous asseyez", "s'asseyent"],
    },
    {
        type: "verb",
        word: "pleuvoir",
        definition: "to rain",
        tense: "present",
        conjugation: ["", "", "pleut", "", "", "pluvent"],
    }, 
    {
        type: "verb",
        word: "aimer",
        definition: "to like, to love",
        tense: "subjonctif",
        conjugation: ["aime", "aimes", "aime", "aimions", "aimiez", "aiment"],
    },
    
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