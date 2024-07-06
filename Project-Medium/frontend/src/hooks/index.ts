import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from "../config"

export interface Blog {
  "content": string;
  "title": string;
  "id": string;
  "author": {
    "name": string;
    "id": string;
  }
 
}




export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
            Authorization: localStorage.getItem("token")
        }
    })
        .then(response => {
            setBlogs(response.data.posts);
            setLoading(false);
        })
}, [])


  return {
    loading,
    blogs
  }

}





export const useBlog = (id: string) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
            Authorization: localStorage.getItem("token")
        }
    })
        .then(response => {
            setBlog(response.data.post);
            setLoading(false);
        })
}, [])


  return {
    loading,
    blog
  }

}

export const useAuthorsBlogs = (name: string) => {
  const [loading, setLoading] = useState(true);
  const [AuthorsBlogs, setAuthorsBlogs] = useState<Blog[]>([]);
 

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/author/${name}`, {
        headers: {
            Authorization: localStorage.getItem("token")
        }
    })
        .then(response => {
            setAuthorsBlogs(response.data.posts);
            setLoading(false);
            
        })

       
}, [name])

 
  return {
    loading,
    AuthorsBlogs
  }

}


