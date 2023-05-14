import React, {useContext} from "react";
import { WordContext } from "./WordPage";


export const ProgressBar = () => {
    const {cardIndex, totalCardCount} = useContext(WordContext)

    return(
        <div className="flex m-2 border-2">
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