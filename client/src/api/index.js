import axios from 'axios' /** It is a JavaScript library that allows us
to easily perform HTTP operations in client side applications. */

const API = axios.create({ baseURL: 'https://memories-app-pclg.onrender.com'});
// const API = axios.create({ baseURL: 'http://localhost:4444' });

console.log(API.baseURL);

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})

export const fetchPosts = (page) => API.get(`/posts?page=?${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search/?searchQuery=${searchQuery.search ||  'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost); 
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signin = (formData) => API.post(`/user/signin`, formData)
export const signup = (formData) => API.post(`/user/signup`, formData)

