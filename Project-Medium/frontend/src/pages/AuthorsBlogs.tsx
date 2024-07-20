
//import { useFetchAuthorsBlogs } from "../hooks"

import { BlogCard } from '../components/BlogCard';
import { Appbar } from '../components/Appbar';
import { BlogsSkeleton } from "../components/BlogsSkeleton";
import { useParams } from "react-router-dom";
import { authorsBlogsStateAtom, Blog } from "../atom";
import { useRecoilValueLoadable } from 'recoil';
import { useState, useEffect } from "react";

export const AuthorsBlogs = () => {
  const { name } = useParams<{ name: string }>();
  const authorsBlogsLoadable = useRecoilValueLoadable(authorsBlogsStateAtom(name || ""));
  const [loading, setLoading] = useState(authorsBlogsLoadable.state === 'loading');

  useEffect(() => {
    setLoading(authorsBlogsLoadable.state === 'loading');
  }, [authorsBlogsLoadable.state]);

  if (loading || !authorsBlogsLoadable.contents) {
    return (
      <div className="h-screen">
        <div className="flex justify-center">
          <div className="flex flex-col justify-center">
            <BlogsSkeleton />
            <BlogsSkeleton />
            <BlogsSkeleton />
            <BlogsSkeleton />
          </div>
        </div>
      </div>
    );
  }

  const contents = authorsBlogsLoadable.contents;
  if (!Array.isArray(contents)) {
    return <div>Error: Loaded data is not an array.</div>;
  }

  return (
    <div>
      <div>
        <Appbar />
      </div>
      <div className="justify-center">
        <div className="">
          {contents.map((blog: Blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
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




