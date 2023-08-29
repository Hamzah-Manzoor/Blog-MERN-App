import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const dbName = 'Blogger';
    const URL = `mongodb+srv://${username}:${password}@cluster0.ve4doe3.mongodb.net/${dbName}?retryWrites=true&w=majority`;
    
    try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log('Database connected successfully');

    } catch (error) {
        console.log('Error! Could not connect to the database ', error);
    }
};

export default Connection;