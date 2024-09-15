import VerbComponent from "./VerbCardComponent";
import ConjugateComponent from "./ConjugateCardComponent";
import NounComponent from "./NounCardComponent";
import { IVerbCard, IConjugateCard, INounCard, ICard} from "../../interfaces/cardsInterface";

export function CardComponent({card} : {card: ICard}) {
    switch (card.type) {
        case "verb":
            return <VerbComponent verbCard={card as IVerbCard}/>
        case "conjugate":
            return <ConjugateComponent conjugateCard={card as IConjugateCard}/>
        case "noun":
            return <NounComponent nounCard={card as INounCard}/>
        default:
            return <div>Card type not recognized</div>
    }
}


