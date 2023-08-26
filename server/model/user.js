import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: false
    },
    interests: {
        type: String,
        required: false
    },
});


const user = mongoose.model('user', userSchema);

export default user;