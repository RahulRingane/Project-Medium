import { Link } from 'react-router-dom'
import DOMPurify from 'dompurify';
import  striptags from 'striptags';

interface BlogCardProps {
    id: string,
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
   
}

export const BlogCard = ({ authorName, title, content, publishedDate, id }: BlogCardProps) => {


    const sanitizedTitle = DOMPurify.sanitize(title);
  // const Content = striptags(content)

  const cleanText = (text: string): string => {
    // Use striptags to remove HTML tags
    let strippedText = striptags(text);
    // Replace &nbsp; with a normal space
    strippedText = strippedText.replace(/&nbsp;/g, ' ');
    return strippedText;
};

const truncateText = (text: string, limit: number): string => {
    if (text.length <= limit) return text;
    const truncated = text.substring(0, limit);
    return truncated.substring(0, truncated.lastIndexOf(' ')) + '...';
};

const cleanedContent = cleanText(content);
const contentSnippet = truncateText(cleanedContent, 200);
console.log('contentSnippet', contentSnippet)


    return <Link to={`/blog/${id}`}>
        <div className=" p-2 md:p-4 border-b border-slate-200 pb-4 w-sm md:w-md cursor-pointer">
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
            <div className="text-2xl font-bold pt-2" dangerouslySetInnerHTML={{ __html: sanitizedTitle }}></div>
            <div className="text-base text-slate-700 font-normal">{contentSnippet}</div>
                  <div className="text-grey-600 text-base font-thin pt-4">
                   {`${Math.ceil(cleanText(content).length / 200)} minutes read`}
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
           bg-greay-100 rounded-full bg-purple-600 ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
        <span className={`text-white ${size === "small" ? "text-xs" : "text-lg"}`}>{name[0]}</span>
    </div>


}