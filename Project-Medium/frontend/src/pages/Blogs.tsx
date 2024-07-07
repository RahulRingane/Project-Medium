// Blogs.js

import { BlogCard } from '../components/BlogCard';
import { Appbar } from '../components/Appbar';
import { useBlogs } from '../hooks';
import { BlogsSkeleton } from "../components/BlogsSkeleton"

export const Blogs = () => {
  const { loading, blogs } = useBlogs(); // Update to reflect the correct variable name

  if (loading) {
    return (<div className = "">
      <Appbar/>
      <div className=" flex justify-center">
        <div className = "">
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
    <div className="w-sm md:max-w-full">
      <div>
        <Appbar />
      </div>
      <div className="justify-center">
        <div className="">
          {blogs.map((blog) => ( // Update to reflect the correct variable name
            <BlogCard
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate={"july 2024"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};


