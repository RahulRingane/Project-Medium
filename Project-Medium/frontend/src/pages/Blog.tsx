 import { useBlog } from "../hooks"
 import { useParams } from "react-router-dom"
 import { Fullblog } from "../components/Fullblog"
 import { BlogsSkeleton } from "../components/BlogsSkeleton"
 import { Appbar } from "../components/Appbar"

export const Blog = () => {
        const { id } = useParams<{ id: string }>();
        const {loading, blog} = useBlog(id || "")

        if(loading || !blog){
            return (<div>
                <Appbar/>
                <div className="flex justify-center">
                  <div>
                    <BlogsSkeleton />
                    <BlogsSkeleton />
                    <BlogsSkeleton />
                    <BlogsSkeleton />
                  </div>
                </div>
              </div>
              );
        }

        return <div>
            <Fullblog blog = {blog}/>
        </div>

}