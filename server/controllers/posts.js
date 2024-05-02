import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req,res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page.
        const total = await PostMessage.countDocuments({});
        
        const posts = await PostMessage.find().sort({ _id : -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    }catch(error) {
        res.status(404).json({ message : error.message})
    }};

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message : error.message})
    }
}

// Params and query are two different things.   
// QUERY -> /posts?page=1 -> page = 1
// PARAMS -> /posts/123 -> id = 123

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, 'i'); // i stands for -> Test test TEST -> test
        // RegExp means regular expression.

        const posts = await PostMessage.find({ $or : [ { title }, { tags: { $in: tags.split(',') } } ] }) // or stands for either find me the title or tags.

        res.json({ data : posts });
    } catch (error) {
        res.status(404).json({ message : error.message})
    }
}

export const createPost = async (req,res) => {
    const post = req.body;
    console.log("FRONTEND POST : ");
    console.log(post);
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    console.log("DB RESPONSE POST : ");
    console.log(newPost);
 
    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message : error.message});
    }
}

export const updatePost = async (req,res) => {
    const { id: _id } = req.params /* => /posts/4577 here id is 4577 getting it with req.params*/
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with this id');

    
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new : true}) /** findByIdAndUpdate gonna update it in the database too. */

    res.json(updatedPost);
}

export const deletePost = async (req,res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this id');

    await PostMessage.findByIdAndDelete(id);

    res.json({message : 'Post deleted succesfully'});
}

export const likePost = async (req,res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message : "Unauthanticated" })

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this id');

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1) {
        // like the post
        post.likes.push(req.userId);
    } else {
        // dislike a post
        post.likes = post.likes.filter((id) => id != String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true} );/** {new : true} This option causes it to return the updated document after the update process is complete. */

    res.json(updatedPost);
}