import mongoose from 'mongoose';

const Connection = async (username, password) => {
    // const URL = `mongodb+srv://hamzahmanzoor8:NjM4J0Po09gCzITq@cluster0.ve4doe3.mongodb.net/?retryWrites=true&w=majority`;
    const dbName = 'Blogger';
    const URL = `mongodb+srv://${username}:${password}@cluster0.ve4doe3.mongodb.net/${dbName}?retryWrites=true&w=majority`;
    
    try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log('Database connected successfully');

        // const dbName = 'Blogger';
        // const db = mongoose.connection.db;
        // await db.command({ create: dbName });

        // console.log(`Database "${dbName}" created successfully`);


    } catch (error) {
        console.log('Error! Could not connect to the database ', error);
    }
};

export default Connection;