import { React, useState, useEffect, useContext } from 'react';

import { styled, Box, TextareaAutosize, Button, InputBase, FormControl, FormLabel } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

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

const InputTitle = styled(InputBase)`
    flex: 1;
    margin: 12px 30px 0px 0px;
    font-size: 25px;
    border: 1px solid gray;
    padding: 5px;
`;

const InputCoverURL = styled(InputBase)`
    flex: 1;
    margin: 12px 30px 0px 0px;
    font-size: 25px;
    border: 1px solid gray;
    padding: 5px;
    width: 100%;
`;

const GuideLabel = styled(FormLabel)`
    width: 100%;
    margin-top: 50px;
    font-size: 12px;
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

const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);

    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    useEffect(() => {
        const getImage = async () => { 
            if(file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                
                // console.log(data);

                const response = await API.uploadFile(data);
                // post.picture = response.data;
                console.log(response.data);
            }
        }
        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.email = account.email;
    }, [file])

    const savePost = async () => {

        if (post.title === ""){
            alert("Please add a title for your blog.");
            return;
        }

        if (post.description === "") {
            alert("Please add a short description of the content you are sharing with readers.");
            return;
        }

        let response = await API.createPost(post);
        if (response.isSuccess) {
            navigate('/');
        }
    }


    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    return (
        <Container>
             {/* <Image src={url} alt="Post Banner" /> */}
             <InputCoverURL onChange={(e) => handleChange(e)} required name='picture' placeholder="Add Cover Photo's URL" />

             <StyledFormControl>
                 <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    // onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTitle onChange={(e) => handleChange(e)} required name='title' placeholder="Title" />
                <Button onClick={() => savePost()} variant="contained" color="primary">Publish</Button>
            </StyledFormControl>

            <GuideLabel>Note: If you wish to add images, paste URL of images where you want to place them.</GuideLabel>
            <Textarea
                rows={5}
                placeholder="Tell Your Story..."
                required
                name='description'
                onChange={(e) => handleChange(e)} 
            />
        </Container>
    )
}

export default CreatePost;
