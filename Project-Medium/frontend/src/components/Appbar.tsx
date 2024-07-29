import { Link } from "react-router-dom"
import { SearchBar } from './SearchBar'
import {Avatar } from "../components/BlogCard"



export const Appbar = () => {

    return <div className="border-b px-1 md:px-10 py-4">
        <div className="flex justify-between">
            <Link to={`/blogs`} className="flex flex-col justify-center cursor-pointer">
                <p className="font-semibold text-xl mr-4 md:mr-4 ml-1 md:ml-0"> Medium </p>
            </Link>
            <div className="flex">
                <div className="flex justify-center flex-col">
                    <SearchBar />
                </div>
                <div className="flex justify-center flex-col ml-3">
                    <Link to={`/publish`}>
                        <button type="button" className=" md:ml-4 md:mr-4 text-white bg-green-600 hover:bg-green-700 focus:outline-none 
            focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 md:py-2.5 text-center
             me-2 hover:bg-green-700">Publish</button>
                    </Link>
                </div>
                <div>
                <Avatar name={localStorage.getItem("username")||"A"} size={"big"} />
                </div>
            </div>
        </div>

    </div>
}