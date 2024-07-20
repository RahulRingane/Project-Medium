
import { BlogsSkeleton } from "../components/BlogsSkeleton";
import { Appbar } from "../components/Appbar";
import { useParams, useNavigate } from "react-router-dom";
import { blogsStateAtom, blogStateAtom, authorsBlogsStateAtom, Blog } from "../atom";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { BACKEND_URL } from '../config.ts'
import axios from 'axios'



const name = localStorage.getItem('username')
export const Updateblogs = () => {
    const { id } = useParams<{ id: string }>();
    const  setBlogs = useSetRecoilState(blogsStateAtom);
    const blog = useRecoilValue(blogStateAtom(id || ""));
    const  setAuthblogs = useSetRecoilState<Blog []>(authorsBlogsStateAtom(name || ""))
    const navigate = useNavigate();

    useEffect(() => {



        const fetchAndUpdateAuthBlogs = async () => {
            try {
                // Fetch author's blogs from backend
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/author/${name}`, {
                    headers: {
                        Authorization: localStorage.getItem('token') ?? '',
                    },
                });

                const fetchedBlogs: Blog[] = response.data.posts; // Adjust based on actual API response structure

                // Update authBlogs state with fetched data
                console.log("abcd", fetchedBlogs)
                setAuthblogs(fetchedBlogs);
            } catch (error) {
                console.error('Error fetching or updating author blogs:', error);
            }
        };
        fetchAndUpdateAuthBlogs()





        if (blog) {
            setBlogs((blogs) => {
                const existingBlogIndex = blogs.findIndex(existingBlog => existingBlog.id === blog.id);
                if (existingBlogIndex !== -1) {
                    // Update the existing blog
                    const updatedBlogs = [...blogs];
                    updatedBlogs[existingBlogIndex] = blog;
                    return updatedBlogs;
                } else {
                    // Add the new blog
                    return [blog, ...blogs];

                }
            });




            navigate(`/blog/${id}`);
        }
    }, [blog, id, setBlogs, navigate]);

    return (
        <div>
            <Appbar />
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
};








