import { Box, styled, Typography, Link } from '@mui/material';
import { React, useContext } from 'react';
import Categories from '../home/Categories';
import Posts from '../home/post/Posts';
import { DataContext } from '../../context/DataProvider';

import { Grid } from '@mui/material';

const Banner = styled(Box)`
    background-image: url(http://mrtaba.ir/image/bg2.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px top -100px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;


const Contact = () => {

    const { account } = useContext(DataContext);

    return (
        <Box>
            <Banner />
            <Grid container>
                <Grid item lg={2} xs={12} sm={2}>
                    <Categories />
                </Grid>
                <Grid container item xs={12} sm={10} lg={10}>
                    <Posts userEmail={account.email}/>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Contact;