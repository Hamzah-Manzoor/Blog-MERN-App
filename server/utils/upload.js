import multer from 'multer';
import path from 'path';
import { GridFsStorage } from 'multer-gridfs-storage';

import dotenv from 'dotenv';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;


const storage = new GridFsStorage({

    url: `mongodb+srv://${username}:${password}@cluster0.ve4doe3.mongodb.net/?retryWrites=true&w=majority`, 
    // url: `mongodb+srv://user:hamzahmanzoor8@cluster0.ve4doe3.mongodb.net/?retryWrites=true&w=majority`,
    // url: `mongodb://user:hamzahmanzoor8@blogweb-shard-00-00.ch1hk.mongodb.net:27017,blogweb-shard-00-01.ch1hk.mongodb.net:27017,blogweb-shard-00-02.ch1hk.mongodb.net:27017/BLOG?ssl=true&replicaSet=atlas-lhtsci-shard-0&authSource=admin&retryWrites=true&w=majority`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(request.body.file.memeType) === -1) {
            console.log("You came here.");
            return`${Date.now()}-blog-${file.originalname}`;
        }
            
        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});



export default multer({storage}); 