import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
        // unique: true
    },
    description: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        required: false   
    },
    createdDate: {
        type: Date
    },
    likedBy: [
        {
            type: String,
        },
    ],
    clapedBy: [
        {
            type: String,
        },
    ],
});


const post = mongoose.model('post', PostSchema);

export default post;