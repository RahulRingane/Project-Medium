 import { useBlog } from "../hooks"
 import { useParams } from "react-router-dom"
 import { Fullblog } from "../components/Fullblog"
 import { Spinner } from "../components/Spinner"

export const Blog = () => {
        const { id } = useParams<{ id: string }>();
        const {loading, blog} = useBlog(id || "")

        if(loading || !blog){
            return <div className = "h-screen flex flex-col justify-center">
                <div className = "flex justify-center">
                <Spinner/>
                </div>
            </div>
        }

        return <div>
            <Fullblog blog = {blog}/>
        </div>

}