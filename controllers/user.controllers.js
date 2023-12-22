const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// user controllers
const Createuser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }

}

const Updateuser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }

        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated!");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can update only your account!");
    }
}

const Deleteuser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {

        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Your account has been deleted!");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can delete only your account!");
    }
}

const Getuser = async (req, res) => {

    const _id = req.query.id;
    const username = req.query.username;
    try {
        const user = _id
            ? await User.findById(_id)
            : await User.findOne({ username: username });
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
}

const GetAllUsers = async (req, res) => {
    try {
        const allusers = await User.find();
        res.status(200).json(allusers)
    } catch (error) {
        res.status(500).json(error);
    }
}

const GetOnlineFriends = async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id)
        const friends = await Promise.all(
            user.followings.map(friendId => {
                return User.findById(friendId);
            })
        )
        let friendList = [];
        friends.map(friend => {
            const { _id, username, profilePicture } = friend;
            friendList.push({ _id, username, profilePicture });
        })
        res.status(200).json(friendList);
    } catch (err) {
        res.status(500).json(err);
    }
}

const Followuser = async (req, res) => {
    const pu = req.params.id
    const lu = req.body.loggedUser
    if (req.body.userId !== pu) {
        try {
            const user = await User.findById(pu);
            const currentUser = await User.findById(req.body.loggedUser);
            if (!user.followers.includes(lu)) {
                await user.updateOne({ $push: { followers: lu } });
                await currentUser.updateOne({ $push: { followings: pu } });
                res.status(200).json(`You are now following: ${user.username}`);
            } else {
                res.status(403).json(`You already follow this user!: ${user.username}`);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can't follow yourself!");
    }
}

const Unfollowuser = async (req, res) => {
    const pu = req.params.id
    const lu = req.body.loggedUser
    if (lu !== pu) {
        try {
            const user = await User.findById(pu);
            const currentUser = await User.findById(lu);

            if (user.followers.includes(lu)) {
                await user.updateOne({ $pull: { followers: lu } });
                await currentUser.updateOne({ $pull: { followings: pu } });

                res.status(200).json(`${pu.username} has been unfollowed!`);
            } else {
                res.status(403).json(`You already unfollowed this user!: ${pu.username}`);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can't unfollow yourself!");
    }
}

// auth controllers
const Login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(404).json(`${req.body.username}, User not found!`);

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json(`${req.body.password}, Wrong password!`);

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

const SearchUser = async (req, res) => {
    const username = req.query.username;
    console.log(username);
    try {
        const result = await User.find({ username: username })
        console.log("res", result);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


// exporting all controllers
module.exports = {
    Createuser, Updateuser, SearchUser, Deleteuser, GetAllUsers, Login, Getuser, GetOnlineFriends, Followuser, Unfollowuser,
}