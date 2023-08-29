import Post from '../model/post.js';


export const createPost = async (request, response) => {
    try {
        const post = await new Post(request.body);
        post.email = request.user.email;
        post.name = request.user.name;
        post.save();

        response.status(200).json('Post saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

export const updatePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if (!post) {
            response.status(404).json({ msg: 'Post not found' })
        }
        
        await Post.findByIdAndUpdate( request.params.id, { $set: request.body })

        response.status(200).json('Post Updated Successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

export const deletePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if (!post) {
            response.status(404).json({ msg: 'Post not found' });
        }
        
        await Post.findByIdAndDelete(request.params.id);

        response.status(200).json('Post Deleted Successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}

export const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        response.status(200).json(post);
    } catch (error) {
        response.status(500).json(error)
    }
}

export const getAllPosts = async (request, response) => {
    let username = request.query.username;
    let category = request.query.category;
    let posts;
    try {
        if(username) 
            posts = await Post.find({ username: username });
        else if (category) 
            posts = await Post.find({ categories: category });
        else 
            posts = await Post.find({});
            
        response.status(200).json(posts);
    } catch (error) {
        response.status(500).json(error)
    }
}

// export const likePost = async (postId, userEmails) => {
    // try {
    //     const post = await Post.findById(postId);
    //     if (!post) {
    //         console.log('Post not found');
    //         return;
    //     }

    //     userEmails.forEach(userEmail => {
    //         if (!post.likedBy.includes(userEmail)) {
    //             post.likedBy.push(userEmail);
    //         }
    //     });

    //     await post.save();
    //     console.log('Post liked by users successfully');
    // } catch (error) {
    //     console.error('Error liking post:', error);
    // }
// }

export const likePost = async (request, response) => {

    // console.log(request.params.id);
    // console.log(request.body.likedBy[0]);

        //     userEmails.forEach(userEmail => {
    //         if (!post.likedBy.includes(userEmail)) {
    //             post.likedBy.push(userEmail);
    //         }
    //     });

    //     await post.save();


    try {
        const post = await Post.findById(request.params.id);

        if (!post) {
            response.status(404).json({ msg: 'Post not found' })
        }
        
        await Post.findByIdAndUpdate( request.params.id, { $set: request.body })

        response.status(200).json('Post Updated Successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

export const clapPost = async (request, response) => {

    try {
        const post = await Post.findById(request.params.id);

        if (!post) {
            response.status(404).json({ msg: 'Post not found' })
        }
        
        await Post.findByIdAndUpdate( request.params.id, { $set: request.body })

        response.status(200).json('Post Updated Successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}