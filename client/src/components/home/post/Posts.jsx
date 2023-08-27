import { useEffect, useState } from 'react';

import { Grid, Box, TextField, styled, Typography } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';


// import { getAllPosts } from '../../../service/api';
import { API } from '../../../service/api';

//components
import Post from './Post';
import { Height } from '@mui/icons-material';

const StyledSearch = styled(TextField)`
    margin: 20px;
    margin-bottom: 10px;
    display: block;
    width: 100%;
    padding: 0px;
    // display: flex;
    // flex-direction: column;
`;


const Posts = ({ userEmail }) => {
    const [posts, getPosts] = useState([]);
    const [search, setSearch] = useState('');
    
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => { 
            let response = await API.getAllPosts({ category : category || '' });
            if (response.isSuccess) {
                // getPosts(response.data);


                if (userEmail) {
                    const newLikedState = response.data.map(post => {
                        if (userEmail === post.email) {
                            return true;
                        }
                        return false;
                    });
    
                    const anyLiked = newLikedState.some(value => value);
    
                    if (!anyLiked) {
                        getPosts([]);
                    } else {
                        getPosts(response.data);
                    }
                } else {
                    getPosts(response.data);
                }






            }
        }
        fetchData();
    }, [category]);

    const onValueChange = (e) => {
        setSearch(e.target.value);
    }

    return (
        <>
            <StyledSearch id="outlined-basic" label="Search for Blogs..." onChange={(e) => onValueChange(e)} variant="outlined" />
            <>
            {
                posts?.length ? posts.map( (post, index) => (

                    <>
                    {
                        userEmail ? 
                            ( userEmail === post.email 
                            && 
                            <>
                            {
                                search ?
                                (
                                    post.title.includes(search) 
                                    &&
                                    <Grid item lg={3} sm={4} xs={12}>
                                        <Link style={{textDecoration: 'none', color: 'inherit'}} to={`details/${post._id}`} key={post._id}>
                                            <Post post={post} />
                                        </Link>
                                    </Grid> 
                                )
                                :
                                (
                                    <Grid item lg={3} sm={4} xs={12}>
                                        <Link style={{textDecoration: 'none', color: 'inherit'}} to={`details/${post._id}`} key={post._id}>
                                            <Post post={post} />
                                        </Link>
                                    </Grid> 
                                )
                            }                  
                            </>

                            ) 
                            : 
                            (        
                                <>
                                {
                                    search ?
                                    (
                                        post.title.includes(search) 
                                        &&
                                        <Grid item lg={3} sm={4} xs={12}>
                                            <Link style={{textDecoration: 'none', color: 'inherit'}} to={`details/${post._id}`} key={post._id}>
                                                <Post post={post} />
                                            </Link>
                                        </Grid> 
                                    )
                                    :
                                    (
                                        <Grid item lg={3} sm={4} xs={12}>
                                            <Link style={{textDecoration: 'none', color: 'inherit'}} to={`details/${post._id}`} key={post._id}>
                                                <Post post={post} />
                                            </Link>
                                        </Grid> 
                                    )
                                }                  
                                </>
                            )
                    }
                    </>

                )) : 
                (
                    <Box style={{color: '878787', margin: 'auto auto 200px auto', fontSize: '30px', fontWeight: 700}}>
                        No Blog Posted Yet!
                    </Box>
                )
            }
            </>
        </>
    )
}

export default Posts;
