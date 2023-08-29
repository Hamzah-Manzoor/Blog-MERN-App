import { React, useState, useEffect, useContext } from 'react';
import { Box, TextField, Button, styled, Typography } from '@mui/material';
import { DataContext } from '../../context/DataProvider';

import { useNavigate } from 'react-router-dom';

import { API } from '../../service/api.js';

const Component = styled(Box)`
  width: 85%;
  margin: auto;
  margin-top: 40px;
  margin-bottom: 30px;
  box-shadow: 5px 2px 10px 2px rgb(0 0 0/ 0.6);
`; 

const Banner = styled(Box)`
    background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    // overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    // background: #FB641B;
    // color: #fff;
    height: 40px;
    // border-radius: 2px;
`;

const userValues = {
    name: '',
    email: '',
    password: '',
    education: '',
    interests: '',
};

const About = () => {

    const [userInfo, setUserInfo] = useState(userValues);
  
    const { account } = useContext(DataContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = () => { 
            userInfo.name = account.name;
            userInfo.email = account.email;
            userInfo.password = account.password;
            userInfo.education = account.education;
            userInfo.interests = account.interests;
        }
        fetchData();
      }, []);
  
  
    const onValueChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
  
    const updateUser = async () => {
        let response = await API.updateUser(userInfo);
        if (response.isSuccess) {
            navigate('/');
        }
    }

    return (
        <>
        <Banner/>
        <Component>
            <Box>
                <Wrapper>
                    <TextField variant="standard" value={userInfo.name} onChange={(e) => onValueChange(e)} name="name" label="Enter Name"/>
                    {/* <TextField variant="standard" value={userInfo.email} onChange={(e) => onValueChange(e)} name="email" label="Enter Email"/> */}
                    <TextField variant="standard" value={userInfo.password} onChange={(e) => onValueChange(e)} name="password" label="Enter Password"/>
                    <TextField variant="standard" value={userInfo.education} onChange={(e) => onValueChange(e)} name="education" label="Enter Education"/>
                    <TextField variant="standard" value={userInfo.interests} onChange={(e) => onValueChange(e)} name="interests" label="Enter Interests"/>
        
                    <LoginButton variant="contained" onClick={() => updateUser()}>Update</LoginButton>
                </Wrapper>
            </Box>
      </Component>
      </>
    )
}

export default About;