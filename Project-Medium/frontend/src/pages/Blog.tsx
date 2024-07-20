// import { useFetchBlog } from "../hooks"

import { useParams } from "react-router-dom";
import { Fullblog } from "../components/Fullblog";
import { BlogsSkeleton } from "../components/BlogsSkeleton";
import { Appbar } from "../components/Appbar";
import { useRecoilValueLoadable } from "recoil";
import { useState, useEffect } from "react";
import { blogStateAtom } from "../atom";
//import { Link } from 'react-router-dom'
//const userid = localStorage.getItem('userid')


export const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const blogLoadable = useRecoilValueLoadable(blogStateAtom(id || ""));
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (blogLoadable.state === 'loading') {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [blogLoadable.state]);

  if (loading || !blogLoadable.contents) {
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
  }

  return (
    <div>
    <div>
    
      <Fullblog blog={blogLoadable.contents} />
    </div>
    
   </div>
    
  
  );
};

