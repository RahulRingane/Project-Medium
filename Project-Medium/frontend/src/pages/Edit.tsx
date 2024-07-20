
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
    const [authorId] = useState(blog?.author?.id || '');
   const userid = localStorage.getItem('userid')

    const Config : any = useMemo(
        () => ({
            placeholder: "Start writing content...",
            askBeforePasteHTML: false,
            askBeforePasteFromWord: false
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
     if(userid !== blog.author?.id){
        return <div>
            Author can only update the blog.
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
                        onChange={(newContent) => setContent(newContent)}
                    />
                    <button
                        type="button"
                        onClick={handleSave}
                        className="rounded text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-semibold rounded-lg text-base px-5 py-2 text-center me-2 ml-2 mt-2 mb-2"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

