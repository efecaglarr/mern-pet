import * as api from '../api'
import { FETCH_ALL, FETCH_POST ,FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, START_LOADING, END_LOADING } from '../constants/actionTypes';

//Action Creators
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({type : START_LOADING})
        const { data } = await api.fetchPost(id);

        console.log(`POST ID IS ${id}`);

        dispatch({ type : FETCH_POST, payload : data});
        dispatch({ type : END_LOADING });

    } catch (error) {
        console.log(` Error happened in getPost actions. and
        ${error.message}`);
    } 
}

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page);
        

        dispatch  ({type: FETCH_ALL, payload: data}); /* Payload is the
        data where we store all of our posts */
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data : { data } } = await api.fetchPostsBySearch(searchQuery);

        // console.log(data);
        dispatch  ({type: FETCH_BY_SEARCH, payload: { data }});
        dispatch({ type: END_LOADING });
    }catch(error) {
        console.log(error);
    }   /* Payload is the data where we store all of our posts */
}

export const createPost = (post, navigate) => async (dispatch) => {
    try {        
        const { data } = await api.createPost(post);
        
        const action = { type: CREATE ,payload: data };

        navigate(`/posts/${data._id}`)

        dispatch(action)
    } catch (error) {
        console.log(error)   
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({type: UPDATE, payload: data});
    } catch (error) {
        console.log(error);
    }
} 

export const deletePost = (id) => async (dispatch) => {
    try {
        const response = await api.deletePost(id);

        dispatch({type : DELETE, payload: id});
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({type: UPDATE, payload: data}); 

    } catch (error) {
        console.log(error);
    }
}