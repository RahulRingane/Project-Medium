// Blogs.js
import { BlogCard } from '../components/BlogCard';
import { Appbar } from '../components/Appbar';
import { BlogsSkeleton } from "../components/BlogsSkeleton";
import { Blog, blogsStateSelector} from "../atom";
import {useRecoilValueLoadable } from 'recoil';
import { useEffect, useState } from "react";

export const Blogs = () => {
 
  const blogsLoadable = useRecoilValueLoadable(blogsStateSelector);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    switch (blogsLoadable.state) {
      case 'loading':
        setLoading(true);
        break;
      case 'hasValue':
        setLoading(false);
        break;
      case 'hasError':
        setLoading(false);
        setError("Failed to load blogs");
        console.error(blogsLoadable.contents);
        break;
    }
  }, [blogsLoadable]);

  if (loading) {
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

  if (error) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-sm md:max-w-full">
      <div>
        <Appbar />
      </div>
      <div className="justify-center">
        <div>
          {blogsLoadable.contents.map((blog: Blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              authorName={blog.author?.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate={"July 2024"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};



