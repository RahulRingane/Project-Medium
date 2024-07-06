import { Avatar } from "../components/BlogCard"
import { Link } from "react-router-dom"
import { SearchBar } from './SearchBar'


export const Appbar = () => {

    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={`/blogs`} className="flex flex-col justify-center cursor-pointer">
        <p className = "font-semibold text-xl"> Medium </p>
        </Link>
        <div className = "flex">
            <div className = "flex justify-center flex-col">
            <SearchBar/>
            </div>
            <div className = "flex justify-center flex-col">
            <Link to={`/publish`}>
                <button type="button" className="ml-4 mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none 
            focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center
             me-2  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Publish</button>
            </Link>
            </div>
            <Avatar name={localStorage.getItem("username")||"A"} size={"big"} />
        </div>

    </div>
}