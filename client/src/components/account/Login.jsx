import { React, useState, useContext } from 'react';
import { Box, TextField, Button, styled, Typography } from '@mui/material';
import { DataContext } from '../../context/DataProvider';

import { useNavigate } from 'react-router-dom';

import MyImage from '../../assets/Blogger-Main-Logo.png';

import { API } from '../../service/api.js';

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 10px 2px rgb(0 0 0/ 0.6);
`; 

const Image = styled('img')({
  width: 200,
  display: 'flex',
  margin: 'auto',
  marginTop: 50,
  // marginBottom: 0,
  padding: '50px 0 0'
});

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

const SignupButton = styled(Button)`
    text-transform: none;
    // background: #fff;
    // color: #2874f0;
    height: 40px;
    // border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 16px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`;

const loginValues = {
    email: '',
    password: ''
};

const signupValues = {
    name: '',
    email: '',
    password: '',
    education: '',
    interests: '',
};


const Login = ({ isUserAuthenticated }) => {

  const [account, toggleAccount] = useState('login');
  const [login, setLogin] = useState(loginValues);
  const [signup, setSignup] = useState(signupValues);
  const [error, showError] = useState('');

  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const toggleSignup = () => {
    account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
  }

  const onLoginChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }

  const onSignupChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  }

  const loginUser = async () => {
    let response = await API.userLogin(login);
    if (response.isSuccess) {
        showError('');

        sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
        sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
        setAccount({ _id: response.data._id, name: response.data.name, email: response.data.email, password: response.data.password, education: response.data.education, interests: response.data.interests });
        
        isUserAuthenticated(true)
    //     setLogin(loginInitialValues);
        navigate('/');
    } else {
        showError('Something went wrong! please try again later');
    }
  }

  const signupUser = async () => {
    
    let response = await API.userSignup(signup);

    if (response.isSuccess) {
        showError('');
        setSignup(signupValues);
        toggleAccount('login');
    } else {
        showError('Something went wrong! please try again later');
    }
  }

  return (
    <Component>
      <Box>
        <Image src={MyImage} alt='Bloggger Logo' />

        {
          account === 'login' ?
        
          <Wrapper>
            <TextField variant="standard" value={login.email} required onChange={(e) => onLoginChange(e)} name="email" label="Enter Email"/>
            <TextField variant="standard" value={login.password} required onChange={(e) => onLoginChange(e)} name="password" label="Enter Password"/>

            { error && <Error>{error}</Error>}

            <LoginButton variant="contained" onClick={() => loginUser()}>Login</LoginButton>
            <Text style={{ textAlign: 'center' }}>OR</Text>
            <SignupButton variant="outlined" onClick={() => toggleSignup()}>Create an account</SignupButton>
          </Wrapper>
        :
          <Wrapper>
            <TextField variant="standard" required onChange={(e) => onSignupChange(e)} name="name" label="Enter Name"/>
            <TextField variant="standard" required onChange={(e) => onSignupChange(e)} name="email" label="Enter Email"/>
            <TextField variant="standard" required onChange={(e) => onSignupChange(e)} name="password" label="Enter Password"/>
            <TextField variant="standard" onChange={(e) => onSignupChange(e)} name="education" label="Enter Education"/>
            <TextField variant="standard" onChange={(e) => onSignupChange(e)} name="interests" label="Enter Interests"/>

            { error && <Error>{error}</Error>}

            <LoginButton variant="contained" onClick={() => signupUser()}>Signup</LoginButton>
            <Text style={{ textAlign: 'center' }}>OR</Text>
            <SignupButton variant="outlined" onClick={() => toggleSignup()}>Already have an account</SignupButton>
          </Wrapper>
        }
      </Box>
    </Component>
  )
}

export default Login
