import Comment from '../model/comment.js';


export const newComment = async (request, response) => {
    try {
        const comment = await new Comment(request.body);
        comment.save();

        response.status(200).json('Comment Saved Successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}


export const getComments = async (request, response) => {
    try {
        const comments = await Comment.find({ postId: request.params.id });

        response.status(200).json(comments);
    } catch (error) {
        response.status(500).json(error)
    }
}

export const getComment = async (request, response) => {
    response.status(200).json({});
}

export const deleteComment = async (request, response) => {
    try {
        const comment = await Comment.findByIdAndDelete(request.params.id);
        // console.log("Found Comment: " + comment);
        // // await comment.delete();
        // console.log("Comment Deleted Comment: " + comment);

        response.status(200).json('Comment Deleted Successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}