import React, { useState, useEffect } from 'react';

import { Box, styled, TextareaAutosize, Button, FormControl, InputBase, FormLabel } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

import { API } from '../../service/api';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 5
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const GuideLabel = styled(FormLabel)`
    width: 100%;
    margin-top: 50px;
    font-size: 12px;
`;

const InputCoverURL = styled(InputBase)`
    flex: 1;
    margin: 12px 30px 0px 0px;
    font-size: 25px;
    border: 1px solid gray;
    padding: 5px;
    width: 100%;
`;

const InputTitle = styled(InputBase)`
    flex: 1;
    margin: 12px 30px 0px 0px;
    font-size: 25px;
    border: 1px solid gray;
    padding: 5px;
`;

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    font-size: 18px;
    min-height: 40vh;
    &:focus-visible {
        outline: none;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    email: '',
    name: '',
    categories: '',
    createdDate: new Date(),
    likedBy: [],
    clapedBy: []
}

const Update = () => {
    const navigate = useNavigate();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const [imageURL, setImageURL] = useState('');

    const { id } = useParams();

    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const getImage = async () => { 
            if(file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                
                const response = await API.uploadFile(data);
                if (response.isSuccess) {
                    post.picture = response.data;
                    setImageURL(response.data);    
                }
            }
        }
        getImage();
    }, [file])

    const updateBlogPost = async () => {
        let response = await API.updatePost(post);
        if (response.isSuccess) {
            navigate(`/details/${id}`);
        }
        
    }

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    return (
        <Container>
            <Image src={post.picture || url} alt="post" />

            <InputCoverURL onChange={(e) => handleChange(e)} required name='picture' placeholder="Add Cover Photo's URL" />

            <StyledFormControl>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTitle onChange={(e) => handleChange(e)} value={post.title} name='title' placeholder="Title" />
                <Button onClick={() => updateBlogPost()} variant="contained" color="primary">Update</Button>
            </StyledFormControl>

            <GuideLabel>Note: If you wish to add images, paste URL of images where you want to place them.</GuideLabel>
            <Textarea
                rows={5}
                placeholder="Tell your story..."
                name='description'
                onChange={(e) => handleChange(e)} 
                value={post.description}
            />
        </Container>
    )
}

export default Update;