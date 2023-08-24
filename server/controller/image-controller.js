// import grid from 'gridfs-stream';
import mongoose from 'mongoose';

const url = 'http://localhost:4000';


let gfs, gridfsBucket;
// const conn = mongoose.connection;
// conn.once('open', () => {
//     gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
//         bucketName: 'fs'
//     });
//     gfs = grid(conn.db, mongoose.mongo);
//     gfs.collection('fs');
// });


export const uploadImage = (request, response) => {

    // console.log("Requested file is in server: " + request.body);

    console.log(request.file);

    if(!request.body.file) 
        return response.status(404).json("File not found");
    
    const imageUrl = `${url}/file/${request.body.name}`;
    // const imageUrl = `${url}/file/${request.file.filename}`;

    response.status(200).json(imageUrl);    
    // response.status(200).json(request.body);    
}

export const getImage = async (request, response) => {
    // try {   
    //     const file = await gfs.files.findOne({ filename: request.params.filename });
    //     // const readStream = gfs.createReadStream(file.filename);
    //     // readStream.pipe(response);
    //     const readStream = gridfsBucket.openDownloadStream(file._id);
    //     readStream.pipe(response);
    // } catch (error) {
    //     response.status(500).json({ msg: error.message });
    // }
}