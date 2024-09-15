import React, {useContext} from "react";
import { WordContext } from "../pages/CardPage";


export const ProgressBar = () => {
    const {cardIndex, totalCardCount} = useContext(WordContext)

    return(
        <div className="flex m-2 border-2">
            <div className="m-px">{cardIndex}/{totalCardCount}</div>
            {
                [...Array(totalCardCount)].map((_, index) => {
                    return (
                        <div key={index} className={`h-6 flex-1 ${index < cardIndex ? "bg-emerald-500" : "bg-slate-100"} m-px`}></div>
                    )
                })
            }
        </div>
    )

}