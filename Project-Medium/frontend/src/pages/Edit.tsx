


import { useRef, useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import JoditEditor from 'jodit-react';
import { Appbar } from '../components/Appbar';
import { BACKEND_URL } from '../config';
import { useRecoilState} from 'recoil';
import { blogStateAtom } from '../atom';



export const Edit = () => {
    const editor = useRef(null);
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useRecoilState(blogStateAtom(id || ""))
    const navigate = useNavigate();
    const [title, setTitle] = useState(blog?.title || '');
    const [content, setContent] = useState(blog?.content || '');
    const [authorId] = useState(blog.author?.id || '');
   const userid = localStorage.getItem('userid')

    const Config : any = useMemo(
        () => ({
            placeholder: "Start writing content...",
            askBeforePasteHTML: false,
            askBeforePasteFromWord: false,
            toolbarAdaptive: false,
            buttons: [
              "bold",
                "italic",
                "underline",
                "ul",
                "ol",
                "paragraph",
                "cut",
                "copy",
                "paste",
                "undo",
                "redo",
              ],
              style: {
                fontSize: '14px',
                font: "normal"  
            }
            
        }),
        []
    );

    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setContent(blog.content);
        
        }
    }, [blog, setBlog]);

    const handleSave = async () => {
        try {
            const updatedBlog = { id, title, content, authorId };
            const response = await axios.put(`${BACKEND_URL}/api/v1/blog/edit/${id}`, updatedBlog, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
          
              const updatedblog = response.data.post
             setBlog(updatedblog); 
            console.log(updatedblog.title)
    
            navigate(`/Updateblogs/${updatedblog.id}`);
        } catch (error) {
            console.error("Error while updating the blog:", error);
        }
    };
     if(userid !== authorId){
        
        return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Note!!</strong>
        <span className="block sm:inline"> Refresh the page and then try... if problem still persist then it is Unauthorized action, You are not permitted to do this.</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
      </div>
     } 

     if(!blog){
        <div>
            loading...
        </div>
     }



    return (
        <div>
            <Appbar />
            <div className="flex justify-center ml-2 md:ml-0 md:mr-0 w-96 md:w-full">
                <div className="max-w-screen-lg w-11/12 md:w-full">
                    <p className="text-slate-400 font-light flex justify-center flex-col">Title (click on the title box for edit)</p>
                    <input
                        className="mb-6 text-grey-900 w-full py-2 px-4 md:px-0 border border-gray-200 rounded"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter the title"
                    />
                    <p className="text-slate-400 font-light flex justify-center flex-col">Content (click on the content box for edit)</p>
                    <JoditEditor
                        ref={editor}
                        value={content}
                        config={Config}
                        onBlur={(newContent) => setContent(newContent)}
                    />
                    <button
                        type="button"
                        onClick={handleSave}
                        className=" flex justify-center flex-col mt-4 py-1.5  px-3 me-2 text-xs font-medium text-white focus:outline-none bg-blue-500 rounded-lg border border-blue-500 hover:bg-blue-700 hover:text-white focus:z-10 "
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

