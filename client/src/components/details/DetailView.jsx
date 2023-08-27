import { useState, useEffect, useContext, React } from 'react';

import { Box, Typography, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom'

import { API } from '../../service/api';

import { DataContext } from '../../context/DataProvider';

import Comments from './comments/Comments';

const parseDescription = (description) => {
    // Regular expression to identify URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
  
    // Replace URLs with placeholders and store URL list
    let urls = [];
    const parsedDescription = description.replace(urlRegex, (url) => {
      urls.push(url);
      return `__URL_${urls.length - 1}__`;
    });
  
    return { parsedDescription, urls };
  };

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 5
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const BlogImage = styled('img')({
    width: '100%',
    maxHeight: '100vh',
    objectFit: 'cover'
});

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
    word-break: break-word;
`;

const Description = styled(Typography)`
    word-break: break-word;
    margin: 10px 0;

    img {
        display: block;
        max-width: 100%;
        height: auto;
        margin: 10px auto;
    }
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    },
}));

const DetailView = () => {
    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    const [post, setPost] = useState({});
    const { account } = useContext(DataContext);

    const navigate = useNavigate();
    const { id } = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        }
        fetchData();
    }, []);

    const { parsedDescription, urls } = post.description ? parseDescription(post.description) : { parsedDescription: "", urls: [] };

    const deleteBlog = async () => {  
        let responce = await API.deletePost(post._id);
        if (responce.isSuccess){
            navigate('/');
        }
        
    }

    return (
        <Container>
            <Image src={post.picture || url} alt="post" />
            <Box style={{ float: 'right' }}>
                {   
                    account.email === post.email && 
                    <>  
                        <Link to={`/update/${post._id}`}><EditIcon color="primary" /></Link>
                        <DeleteIcon onClick={() => deleteBlog()} color="error" />
                    </>
                }
            </Box>
            <Heading>{post.title}</Heading>

            <Author>
                <a href={`mailto:${post.email}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography>Author: <span style={{fontWeight: 600}}>{post.name}</span></Typography>
                    <Typography>Email: <span style={{fontWeight: 600}}>{post.email}</span></Typography>
                </a>
                <Typography style={{marginLeft: 'auto'}}>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>

            {/* <Description>{post.description}</Description> */}
            <Description>        
                {
                    parsedDescription.split('__URL_').map((content, index) => {
                        const paragraphs = content.split('\n').filter(paragraph => paragraph.trim() !== '');

                        return (
                            <div key={index}>
                                {paragraphs.map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                                {urls[index] && <BlogImage src={urls[index]} alt={`Image ${index}`} />}
                            </div>
                        );
                    })
                }
            </Description>
            <Comments post={post} />
        </Container>
    )
}

export default DetailView;