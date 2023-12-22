const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');

const Createpost = async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const post = await newPost.save();
        res.status(200).json(post);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

const Updatepost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("The post has been updated");
        } else {
            res.status(403).json("You can update only your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}


const Deletepost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("The post has been deleted");
        } else {
            res.status(403).json("You can delete only your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const LikeDislikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("The post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("The post has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const CommentUncommentPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.comments.includes(req.body.userId)) {
            await post.updateOne({ $push: { comments: req.body.userId } });
            res.status(200).json("You have commented on the post");
        } else {
            await post.updateOne({ $pull: { comments: req.body.userId } });
            res.status(200).json("You have uncommented on the post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const GetPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
}
const GetAllPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
}

const GetTimelinePost = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err) {
        res.status(500).json(err);
    }
}

const GetUserPosts = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const posts = await Post.find({ userId: user._id });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
}




// exporting all controllers
module.exports = {
    Createpost, Updatepost, Deletepost, LikeDislikePost, CommentUncommentPost, GetPost, GetAllPosts, GetUserPosts, GetTimelinePost,
}