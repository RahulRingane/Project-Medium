
import { Blog } from "../atom";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom'

const userid = localStorage.getItem("userid")

export const Fullblog = ({ blog }: { blog: Blog }) => {
    // Sanitize the HTML content from blog.title and blog.content
    const sanitizedTitle = DOMPurify.sanitize(blog.title);
    const sanitizedContent = DOMPurify.sanitize(blog.content);
    // const userid = localStorage.getItem("userid")
    console.log("bodata", blog)
    console.log("userid", userid)

    if (!blog) {
        return <div>Error: Blog data is not available.</div>;
    }




    return (
        <div>
            <Appbar />
            <div className="flex flex-col md:flex-row justify-center">
                <div className="grid grid-cols-12 px-2 md:px-10 w-full gap-8  md:gap-4 pt-12 max-w-screen-xl">
                    <div className="col-span-12 md:col-span-8">
                        <div className="text-5xl font-extrabold w-full" dangerouslySetInnerHTML={{ __html: sanitizedTitle }} />
                        <div className="text-slate-500 pt-2">
                            posted by author
                        </div>
                        <div className="pt-4 whitespace-pre-wrap text-slate-700 text-lg" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                        <div>
                            <Link to={`/edit/${blog.id}`}>
                                <button type="button" className=" flex justify-center flex-col mt-4 py-1  px-2 me-2 text-xs font-medium text-white 
                                   focus:outline-none bg-blue-500 rounded-lg border border-blue-500 hover:bg-gray-100 hover:text-blue-700 focus:z-10 ">Edit</button>
                            </Link>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-4 ">
                        <div className="text-slate-600 text-lg">
                            Author
                        </div>
                        <div className="flex w-full">
                            <div className="pr-4 flex flex-col justify-center">
                                <Avatar size="big" name={blog.author?.name || "Anonymous"} />
                            </div>
                            <div>
                                <div className="text-xl font-extrabold">
                                    {blog.author?.name || "Anonymous"}
                                </div>
                                <div className="pt-2 text-slate-500 p-4">
                                    Random catch phrase about the author's ability to grab the user's attention
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
