import { atomFamily, atom, selector,selectorFamily } from 'recoil';
import axios from 'axios';
import { BACKEND_URL } from './config';


export interface Blog {
    content: string;
    title: string;
    id: string;
    author: {
      name: string;
      id: string;
    };
  }

  // Atom family to store each blog




export const blogsStateSelector = selector({
  key: 'blogsStateSelector',
  get: async ({  }) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem('token') ?? '',
        },
      });
      return response.data.posts;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return [];
    }
  },
});

export const blogsStateAtom = atom<Blog[]>({
  key: 'blogsStateAtom',
  default: [],
});

export const blogsStateWithFetchSelector = selector({
  key: 'blogsStateWithFetchSelector',
  get: ({ get }) => {
    const blogs = get(blogsStateAtom);
    if (blogs.length === 0) {
      const fetchedBlogs = get(blogsStateSelector);
      return fetchedBlogs;
    }
    return blogs;
  },
  set: ({ set }, newBlogs) => {
    set(blogsStateAtom, newBlogs);
  },
});

export const blogStateAtom = atomFamily<Blog, string>({
    key: 'blogState',
    default: selectorFamily({
      key: "bselectorFamily",
      get: (id: string) => async () => {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: localStorage.getItem('token') ?? '',
          },
        });
        return response.data.post
      },
    }),
  });


  export const authorsBlogsStateAtom = atomFamily<Blog[], string>({
    key: 'blogsState',
    default: selectorFamily({
      key: 'AuthorBlogsStateSelector',
      get: (authorName) => async () => {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/author/${authorName}`, {
          headers: {
            Authorization: localStorage.getItem('token') ?? '',
          },
        });
        return response.data.posts; // Adjust based on the actual structure of the response
      },
    }),
  });
  
