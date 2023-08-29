import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';

import { DataContext } from '../../../context/DataProvider';

import { API } from '../../../service/api';

//components
import Comment from './Comment';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
`;

const initialValue = {
    name: '',
    email: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [rendered, setRendered] = useState(false);

    const { account } = useContext(DataContext);

    useEffect(() => {
        const getData = async () => {
                const response = await API.getAllComments(post._id);
                if (response.isSuccess) {
                    setComments(response.data);
                }
        }
        getData();
    }, [toggle, post]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.name,
            email: account.email,
            postId: post._id,
            comments: e.target.value
        });
    }

    // const newComment = async() => {
    //     const response = await API.getAllComments(post._id);
    //     if (response.isSuccess) {
    //         setComments(response.data);
    //     }
    // }

    const addComment = async() => {
        if (comment.comments === "") {
            alert("Please add some text for your comment");
            return;
        }
        let response = await API.newComment(comment);
        if (response.isSuccess) {
            setComment(initialValue);
        }
        
        // setToggle(prev => !prev);
        setToggle(prevState => !prevState);
        // newComment();
    }
    
    return (
        <Box>
            <Container>
                <Image src={url} alt="dp" />   
                <StyledTextArea 
                    rows={5}
                    placeholder="Share your thoughts!"
                    onChange={(e) => handleChange(e)} 
                    name='comments'
                    value={comment.comments}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="medium" 
                    style={{ height: 40 }}
                    onClick={(e) => addComment(e)}
                >Post</Button>             
            </Container>
            <Box>
                {
                    comments && comments.length > 0 && comments.map(comment => (
                        <Comment comment={comment} setToggle={setToggle} />
                    ))
                }
            </Box>
        </Box>
    )
}

export default Comments;