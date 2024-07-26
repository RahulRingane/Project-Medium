import { atomFamily,selectorFamily, atom, selector } from 'recoil';
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

  const space : string = " "
  console.log(space)


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
    key: 'authblogsState',
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
 
  export const blogsStateAtom = atom<Blog[]>({
    key: 'blogsState',
    default: [], // Default to an empty array
  });
  
  
  export const blogsStateSelector = selector<Blog[]>({
    key: 'BlogsStateSelector',
    get: async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
            Authorization: localStorage.getItem('token') ?? '',
          },
        });
        return response.data.posts; // Adjust based on the actual structure of the response
      } catch (error) {
        console.error('Error fetching blogs:', error);
        return []; // Return an empty array in case of an error
      }
    },
  });
  
  




  
 /* export const blogsStateAtom = atom<Blog[]>({
    key: 'blogsStateAtom',
    default: [],
  });

export const blogsStateSelector = selector({
  key: 'blogsStateSelector',
  get: async ({  }) => {
    
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem('token') ?? '',
        },
      });
      return response.data.posts;
  },
  set: ({ set } , response.data.posts) => {
    set(blogsStateAtom, response.data.posts);
  }
});


/*export const blogsStateWithFetchSelector = selector({
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
});*/