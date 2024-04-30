import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router'

import { Avatar, Button, Paper, Grid, Typography, Container} from "@material-ui/core";
import { LockOutlined } from "@mui/icons-material";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import Icon from "./icon";
import useStyles from "./styles";
import Input from "./Input";
import { signin, signup} from "../../actions/auth"

import { jwtDecode } from 'jwt-decode'

const initialState = { firstName : '', lastName : '', email : '' , password : '', confirmPassword : ''}

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignUp, setSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
  const handleShowConfirmPassword = () => setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);

  const handleSubmit = (e) => { 
    e.preventDefault();

    if(isSignUp) {
      dispatch(signup(formData, navigate)) 
    } else {
      dispatch(signin(formData, navigate)) 
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  };

  const switchMode = () => {
    setSignUp((prevSignUp) => !prevSignUp);
    setShowPassword(false);
  };

    const googleSuccess = async (response) => {
        const result = jwtDecode(response?.credential);
        const token = response?.credential;

        navigate('/');
        
        console.log(result);
        try {
          dispatch({ type: 'AUTH', data : { result, token } });
        } catch (error) {
          console.log(error)
        }

    }

    const googleFailure = (error) => {
      console.log(error);
      console.log("Google Sign In was unsuccesful. Try again later.");
    }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type={showConfirmPassword ? "text" : "password"}
                handleShowPassword={handleShowConfirmPassword}
              />
            )}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                  {isSignUp ? "Google Sign Up" : "Google Sign In"}
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="center">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
