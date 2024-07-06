import { Link } from 'react-router-dom'
import DOMPurify from 'dompurify';

interface BlogCardProps {
    id: string,
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
   
}

export const BlogCard = ({ authorName, title, content, publishedDate, id }: BlogCardProps) => {


    const sanitizedTitle = DOMPurify.sanitize(title);
    const sanitizedContent = DOMPurify.sanitize(content);


    return <Link to={`/blog/${id}`}>
        <div className=" p-4 border-b border-slate-200 pb-4 w-screen cursor-pointer">
            <div className="flex">
                <div className="">
                    <Avatar name={authorName} size={"small"} />
                </div>
                <div className=" pl-2 text-slate-700 flex justify-center flex-col">
                    {authorName}
                </div>
                <div className="flex justify-center flex-col pl-2 flex justify-center flex-col">
                    <Circle />
                </div>
                <div className="pl-2 text-slate-500">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-semibold pt-2" dangerouslySetInnerHTML={{ __html: sanitizedTitle }}></div>
            <div className="text-md text-grey-800 font-extralight" dangerouslySetInnerHTML={{ __html: sanitizedContent.slice(0, 100) }}></div>
                  <div className="text-slate-400 text-sm font-thin pt-4">
                   {`${Math.ceil(content.length / 100)} minutes read`}
                   </div>
        </div>
    </Link>
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden 
           bg-gray-100 rounded-full dark:bg-gray-600 bg-slate-300 ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
        <span className={`text-gray-600 dark:text-gray-300 ${size === "small" ? "text-xs" : "text-lg"}`}>{name[0]}</span>
    </div>


}