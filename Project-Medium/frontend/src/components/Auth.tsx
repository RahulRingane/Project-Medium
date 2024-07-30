import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "@rahul897/medium-kommon"
import { BACKEND_URL } from "../config"
import axios from "axios"

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [errorInput, setErrorInput] = useState<string | null>(null);
    
    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs)
            const jwt = response.data.jwt
            const name = response.data.name
            const userId = response.data.userid
            localStorage.setItem("username", name)
            localStorage.setItem("token", jwt)
            localStorage.setItem("userid", userId)
            navigate("/blogs")
        } catch (e: any) {
            if (e.response && e.response.status === 500) { // Assuming 409 is the status code for email conflict

                setErrorMessage("Email is already taken, please use another.");
            } if (e.response && e.response.status === 400 && type === "signup") {
                setErrorInput("Password must be at least 6 characters long.");
            } if (e.response && e.response.status === 403 || 400 && type === "signin") {
                setErrorInput("Invalid email or password. Please try again.");
            }
        }
    }

    return <div className=" w-max-xl md:w-max-lg justify-center items-center h-screen flex justify-center flex-col">
        <div className="flex-justify-center max-w-xl">
            <div>
                <div className="px-12">
                    <div className="text-3xl font-black ">
                        Create an account
                    </div>
                    <div className="text-slate-500 flex justify-center">
                        <div className="">
                            {type === "signin" ? "Don't have an account" : "Allready have an account"}
                            <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                                {type === "signin" ? "Sign up" : "Sign in"}</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-4">
                {type === "signup" ? <LabelledInput label="name" placeholder="Name..." onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        name: e.target.value
                    })
                }} ></LabelledInput> : null}

                <LabelledInput label="email" placeholder={type === "signup" ? "Email..." : "Email..."} onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        email: e.target.value
                    })
                    setErrorMessage(null)
                }}></LabelledInput>
                {errorMessage && (
                    <div className="text-red-500 pt-2">{errorMessage}</div>
                )}

                <LabelledInput label="password" type={"password"} placeholder={type === "signup" ? "Create a password (e.g., 123456)." : "Password..."} onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        password: e.target.value
                    })
                    setErrorInput(null)
                }}></LabelledInput>
                {errorInput && (
                    <div className="text-red-500 pt-2">{errorInput}</div>
                )}

                <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-black hover:bg-gray-900 focus:outline-none 
         focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
          dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>
            </div>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}
function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-md font-bold 
         text-gray-900 dark:text-white text-bold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900
         text-md rounded-lg focus:ring-blue-500 font-medium focus:border-blue-500 block w-full 
          p-2.5" placeholder={placeholder} required />

    </div>
}