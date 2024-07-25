
import { BlogsSkeleton } from "../components/BlogsSkeleton";
import { Appbar } from "../components/Appbar";
import { useParams, useNavigate } from "react-router-dom";
import { blogsStateAtom, blogStateAtom, authorsBlogsStateAtom, Blog } from "../atom";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { BACKEND_URL } from '../config.ts';
import axios from 'axios';

const name = localStorage.getItem('username');

export const Updateblogs = () => {
    const { id } = useParams<{ id: string }>();
    const { space } = useParams<{ space : string }>();
    const setBlogs = useSetRecoilState(blogsStateAtom(space || ""));
    const blog = useRecoilValue(blogStateAtom(id || ""));
    const setAuthblogs = useSetRecoilState<Blog[]>(authorsBlogsStateAtom(name || ""));
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk${space}`, {
                    headers: {
                        Authorization: localStorage.getItem('token') ?? '',
                    },
                });

                const fetchedBlogs: Blog[] = response.data.posts;

                    setBlogs(fetchedBlogs);
                
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        const fetchAndUpdateAuthBlogs = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/author/${name}`, {
                    headers: {
                        Authorization: localStorage.getItem('token') ?? '',
                    },
                });

                const fetchedBlogs: Blog[] = response.data.posts;

                
                
                    setAuthblogs(fetchedBlogs);
                
            } catch (error) {
                console.error('Error fetching or updating author blogs:', error);
            }
        };

        fetchAndUpdateAuthBlogs();
        fetchBlogs().then(() => {
            navigate(`/blog/${id}`);
        });
    }, [blog, id, setBlogs, setAuthblogs, navigate]);

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








/*import { BlogsSkeleton } from "../components/BlogsSkeleton";
import { Appbar } from "../components/Appbar";
import { useParams, useNavigate } from "react-router-dom";
import { blogsStateAtom, blogStateAtom, authorsBlogsStateAtom, Blog } from "../atom";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { BACKEND_URL } from '../config.ts';
import axios from 'axios';

const name = localStorage.getItem('username');

export const Updateblogs = () => {
    const { id } = useParams<{ id: string }>();
    const setBlogs = useSetRecoilState(blogsStateAtom);
    const blog = useRecoilValue(blogStateAtom(id || ""));
    const setAuthblogs = useSetRecoilState<Blog[]>(authorsBlogsStateAtom(name || ""));
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAndUpdateBlogs = async () => {
            try {
                // Fetch the entire list of blogs
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: {
                        Authorization: localStorage.getItem('token') ?? '',
                    },
                });

                const fetchedBlogs: Blog[] = response.data.posts;

                // Ensure the edited blog appears first in the list
                if (blog) {
                    // Add the edited blog to the beginning and filter out any existing one with the same id
                    const updatedBlogs = [blog, ...fetchedBlogs.filter(existingBlog => existingBlog.id !== blog.id)];
                    setBlogs(updatedBlogs);
                } else {
                    // If no blog data is provided, just update the state with fetched blogs
                    setBlogs(fetchedBlogs);
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        const fetchAndUpdateAuthBlogs = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/author/${name}`, {
                    headers: {
                        Authorization: localStorage.getItem('token') ?? '',
                    },
                });

                const fetchedBlogs: Blog[] = response.data.posts;
                //setAuthblogs(fetchedBlogs);
                if (blog) {
                    // Add the edited blog to the beginning and filter out any existing one with the same id
                    const updatedBlogs = [blog, ...fetchedBlogs.filter(existingBlog => existingBlog.id !== blog.id)];
                    setAuthblogs(updatedBlogs);
                } else {
                    // If no blog data is provided, just update the state with fetched blogs
                    setAuthblogs(fetchedBlogs);
                }
            } catch (error) {
                console.error('Error fetching or updating author blogs:', error);
            }
        };

        // Fetch and update author's blogs first
        fetchAndUpdateAuthBlogs();

        // Fetch and update blogs state
        fetchAndUpdateBlogs().then(() => {
            // Navigate to the updated blog's route
            navigate(`/blog/${id}`);
        });
    }, [blog, id, setBlogs, setAuthblogs, navigate]);

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
*/







