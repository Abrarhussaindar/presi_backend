const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        min: 8,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    phoneNumber: {
        type: String,
        max: 10,
    },
    department: {
        type: String,
    },
    position: {
        type: String,
    },
    cabin: {
        type: String,
    },
    followers: {
        type: Array,
        default: [],
    },
    clubName: {
        type: String
    },
    followings: {
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
},
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
