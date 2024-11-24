import React, {useContext} from "react";


export const ProgressBar = ({ daily_limit, current_count }:{daily_limit:number, current_count:number}) => {

    return(
        <div className="flex m-2 border-2">
            <div className="m-px">{current_count}/{daily_limit}</div>
            {
                [...Array(daily_limit)].map((_, index) => {
                    return (
                        <div key={index} className={`h-6 flex-1 ${index < current_count ? "bg-emerald-500" : "bg-slate-100"} m-px`}></div>
                    )
                })
            }
        </div>
    )

}