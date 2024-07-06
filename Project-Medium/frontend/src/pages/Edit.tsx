import { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import JoditEditor from 'jodit-react';
import { Appbar } from '../components/Appbar';
import { Spinner } from '../components/Spinner';
import { useBlog } from '../hooks';
import { BACKEND_URL } from '../config';



export const Edit = () => {
    const editor = useRef(null);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { loading, blog } = useBlog(id || "");
   


    const [title, setTitle] = useState(blog?.title || '');
    const [content, setContent] = useState(blog?.content || '');
    const [authorId, setAuthorId] = useState('');
    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setContent(blog.content);
            setAuthorId(blog.author.id)
        }
    }, [blog]);

    const handleSave = async () => {
        try {
            const updatedBlog = { id, title, content, authorId };
            await axios.put(`${BACKEND_URL}/api/v1/blog/edit/${id}`, updatedBlog, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            navigate(`/blog/${id}`);
        } catch (error) {
            return ("error while updating the blog")
        }
    }


        if (loading || !blog) {
            return (
                <div className="h-screen flex flex-col justify-center">
                    <div className="flex justify-center">
                        <Spinner />
                    </div>
                </div>
            );
        }

        return (<div>
            <Appbar />
            <div className="flex justify-center w-full">

                <div className="max-w-screen-lg w-full">
                    <input className="mb-6 mt-2 text-grey-900 w-full py-2 border border-gray-300 rounded"
                        type="text"
                        value={title}
                        onBlur={(e) => setTitle(e.target.value)}
                        placeholder="Enter the title"
                    />
                    <JoditEditor className="mt-4"
                        ref={editor}
                        value={content}
                        onBlur={newContent => setContent(newContent)}
                    />
                    <button type="button" onClick={handleSave} className=" rounded text-white bg-gradient-to-r from-blue-500 via-blue-600
                 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 
                 dark:focus:ring-blue-800 font-semibold rounded-lg text-base px-5 py-2 text-center me-2 
                 ml-2 mt-2 mb-2">save</button>

                </div>
            </div>
        </div>
        );
    ; 
}