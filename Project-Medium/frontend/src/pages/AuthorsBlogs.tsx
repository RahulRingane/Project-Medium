
import { useAuthorsBlogs } from "../hooks"
import { BlogCard } from '../components/BlogCard';
import { Appbar } from '../components/Appbar';
import { BlogsSkeleton } from "../components/BlogsSkeleton"
import { useParams } from "react-router-dom"

export const AuthorsBlogs = () => {
  const { name } = useParams<{ name: string }>();
  const {loading, AuthorsBlogs} = useAuthorsBlogs(name||"")
 

  if(loading || !AuthorsBlogs){
    return <div className = "h-screen flex flex-col justify-center">
        <div className = "flex justify-center">
        <BlogsSkeleton/>
        <BlogsSkeleton/>
        <BlogsSkeleton/>
        <BlogsSkeleton/>
        </div>
    </div>
}


return (
  <div>
    <div>
      <Appbar />
    </div>
    <div className="flex justify-center">
      <div className="">
        {AuthorsBlogs.map((blog) => ( // Update to reflect the correct variable name
          <BlogCard
            id={blog.id}
            authorName={blog.author.name || "Anonymous"}
            title={blog.title}
            content={blog.content}
            publishedDate={"july 2024"}
          />
        ))}
      </div>
    </div>
  </div>
);
};




