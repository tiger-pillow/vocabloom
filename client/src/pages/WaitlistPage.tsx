
import axiosConfig from "../axiosConfig";
import { useState } from "react";

export default function WaitlistPage() {
    const [email, setEmail] = useState(String)

    const submitEmail = () => {
        console.log("current input is ", email)
        if (email === ""){
            alert("please input your email")
            return 
        } 
        axiosConfig.post("/waitlist", {
            email: email.trim()
        }).then((res) => {
            console.log("response status", res.status)
            if (res.status === 200){
                alert("thank you! you will be the first to know")
            } else {
                alert("something went wrong...contact Yiyuan!")
            }
        }
        )
    }


    return (
        <div className="bg-gray-100 h-screen flex items-center justify-center">
            <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold text-gray-800 leading-tight tracking-tight">
                    vocabloom
                </h1>

                <p className="mt-6 text-lg sm:text-xs lg:text-2xl text-gray-500">
                    Tackle foreign language, one word at a time.
                </p>
                
                <div className="pl-1 mt-3 flex justify-center text-gray-500 text-xs">Expected early 2025</div>
                <div className="mt-10">
                    <form className="flex flex-col sm:flex-row justify-center items-center">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            onChange={(e) => {setEmail(e.target.value)}}
                            className="p-2 w-full sm:w-96 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-md"
                        />
                        <button
                            type="button"
                            className="mt-4 sm:mt-0 sm:ml-4 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-500 text-md"
                            onClick={() => { submitEmail ()}}>
                                
                            Notify me
                        </button>
                    </form>
                    

                </div>
            </div>

            
        </div>
    )

}