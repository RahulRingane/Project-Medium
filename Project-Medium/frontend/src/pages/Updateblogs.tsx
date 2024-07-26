
import { BlogsSkeleton } from "../components/BlogsSkeleton";
import { Appbar } from "../components/Appbar";
import { useParams, useNavigate } from "react-router-dom";
import { blogStateAtom, authorsBlogsStateAtom, Blog, blogsStateAtom} from "../atom";
import { useRecoilValue, useSetRecoilState} from 'recoil';
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
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
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







