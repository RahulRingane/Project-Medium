import { Appbar } from "../components/Appbar"
import axios from "axios";
import { useMemo} from 'react'
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import JoditEditor from "jodit-react"
import { useRef } from 'react'


declare global {
    interface Window {
        editor: any; // Define the type of editor as per your JoditEditor type
    }
}

export const Publish = () => {
    const editor = useRef(null)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const Config: any = useMemo(
        () => ({

            placeholder: "Start Writing Cotent",
            askBeforePasteHTML: false,
            askBeforePasteFromWord: false,
            buttons: [
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "eraser",
                "ul",
                "ol",
                "copyformat",
                "paragraph",
                "superscript",
                "subscript",
                "cut",
                "copy",
                "paste",
                "undo",
                "redo",
                "table",
                "lineHeight",
              ]
        }),
        [])

   

    return <div>
        <Appbar />
        <div className="flex justify-center ml-2 md:ml-0 md:mr-0 w-96 md:w-full pt-8">
            <div className="max-w-screen-lg w-11/12 md:w-full">
                <p className=" text-slate-400 font-light flex justify-center flex-col">Title</p>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter the title (The default styles are applied to the title))"
                    className="mb-8 w-full p-2 border border-gray-300 rounded"
                />
                <p className=" text-slate-400 font-light flex justify-center flex-col">Content</p>
                <JoditEditor
                    ref={editor}
                    value={description}
                    config={Config}
                    onChange={(newDescription) => setDescription(newDescription)}
                />
                <button onClick={async () => {
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                        title,
                        content: description
                    }, {
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    });
                    var newblog = response.data.post
                    

                 
                    navigate(`/Updateblogs/${newblog.id}`)
                }} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                    Publish post
                </button>
            </div>
        </div>
    </div>
}


















