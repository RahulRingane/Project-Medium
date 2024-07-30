import { Appbar } from "../components/Appbar"
import axios from "axios";
import { useMemo } from 'react'
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
    const [disabled, setDisabled] = useState(false);

    const Config: any = useMemo(
        () => ({

            placeholder: "Start Writing Cotent",
            askBeforePasteHTML: false,
            askBeforePasteFromWord: false,
            toolbarAdaptive: false,
            width: '100%',
            buttons: [
                "bold",
                "italic",
                "underline",
                "ul",
                "ol",
                "paragraph",
                "copy",
                "paste",
                "undo",

            ],
            style: {
                fontSize: '14px',
                font: "normal"
            }

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
                    onBlur={(newDescription) => setDescription(newDescription)}
                />
                <button onClick={async () => {
                    if (disabled) return;
                    setDisabled(true);

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

                }} disabled={disabled} type="submit" className="flex justify-center flex-col mt-4 py-2  px-3 me-2 text-xs font-medium text-white focus:outline-none bg-blue-500 rounded-lg border border-blue-500 hover:bg-gray-100 hover:text-blue-700 focus:z-10 ">
                    Submit
                </button>
                <div className="flex items-center p-1 mt-2 text-sm text-gray-800 rounded-lg bg-gray-100" role="alert">

                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium ">Note : </span> After submitting the blog, please wait for a moment as the upload may take some time.
                    </div>
                </div>
            </div>
        </div>
    </div>
}


















