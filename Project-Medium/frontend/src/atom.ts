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





  export const blogsStateAtom = atom<Blog[]>({
    key: 'blogsState',
    default: selector({
      key: 'blogsStateSelector',
      get: async () => {
         
          const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
              Authorization: localStorage.getItem('token') ?? '',
            },
          });
          // Ensure response.data.posts is correctly typed as Blog[]
          return response.data.posts  // Handle potential empty response
        /* catch (error) {
          console.error('Error fetching blogs:', error);
          return []; // Return empty array in case of error
        }*/
      },
    }),
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
  




/*  export const authorsBlogsState = atom<Blog[]>({
    key: 'authorsBlogsState',
    default: undefined,
  });
  

export const blogsLoadingState = atom<boolean>({
  key: 'blogsLoadingState',
  default: false,
});


export const editBlogState = atom<boolean>({
  key: 'editBlogState',
  default: false,
});



export const authorsBlogsLoadingState = atom<boolean>({
  key: 'authorsBlogsLoadingState',
  default: false,
});



export const fetchBlogsSelector = selector<Blog[]>({
  key: 'fetchBlogsSelector',
  get: async () => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
      headers: {
        Authorization: localStorage.getItem('token') ?? '',
      },
    });
    return response.data.posts;
  },
});

export const fetchBlogSelector = selectorFamily<Blog | undefined, string>({
  key: 'fetchBlogSelector',
  get: (id: string) => async () => {

    if (!id) return undefined;
    const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
      headers: {
        Authorization: localStorage.getItem('token') ?? '',
      },
    });
    return response.data.post;
  },
 
});

export const fetchAuthorsBlogsSelector = selectorFamily<Blog[], string>({
  key: 'fetchAuthorsBlogsSelector',
  get: (authorName: string) => async () => {
    if (!authorName) return [];
    const response = await axios.get(`${BACKEND_URL}/api/v1/blog/author/${authorName}`, {
      headers: {
        Authorization: localStorage.getItem('token') ?? '',
      },
    });
    return response.data.posts;
  },
});*/
