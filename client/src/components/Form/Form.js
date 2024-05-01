import React, {useState, useEffect} from 'react'
import useStyles from './styles'
import { Typography, TextField, Button, Paper, InputAdornment } from '@material-ui/core';
import LocationOnIcon from '@mui/icons-material/LocationOn'
import FileBase from 'react-file-base64'
import { useNavigate } from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux'
import {createPost, updatePost} from '../../actions/posts'

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '', description: '', location: '' })
    const classes = useStyles();
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId): null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(post) setPostData(post)
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name}));
            clear();
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name}, navigate));
            clear();
        }
    };

    if (!user?.result?.name) {
        return(
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    Please sign in to create your own posts and like others posts
                </Typography>
            </Paper>
        )
    }
   
    const clear = () => {
        setCurrentId(null);
        setPostData({title: '',message: '',tags: '',selectedFile: '', description: '', location: ''});
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? `Editing` : `Creating`} a pet post</Typography>
                <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e)=> setPostData({ ...postData, title: e.target.value })}/>
                <TextField name='message' variant='outlined' label='Message' fullWidth value={postData.message} onChange={(e)=> setPostData({ ...postData, message: e.target.value })}/>
                <TextField name='text' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e)=> setPostData({ ...postData, tags: e.target.value.split(',') })}/>
                <TextField name='description' variant='outlined' label='Description' fullWidth multiline minRows={6} value={postData.description} onChange={(e) => 	setPostData({ ...postData, description: e.target.value }) } />

                <TextField InputProps={{ startAdornment: ( <InputAdornment position='start'> <LocationOnIcon sx={{ color: 'gray' }} /> 	</InputAdornment> ), }} name='location' variant='outlined' label='Location' fullWidth value={postData.location} onChange={(e) => setPostData({ ...postData, location: e.target.value })} />

                <div className={classes.fileInput}><FileBase type='file' multiple={false} onDone={({base64}) => setPostData({...postData, selectedFile: base64})}/></div>
                
                <Button className={classes.buttonSubmit} variant="contained" color='primary' size="large" type='submit' fullWidth>Submit</Button> {/* Çok fazla props (özellik) var ama bunlar materialUI'a ait*/}
                <br/>
                <Button variant="contained" color='secondary' size="large" onClick={clear} fullWidth>Clear</Button> {/* Bu propslar olmasaydı oldukça fazla css yazacaktık*/}
            </form>
        </Paper>
    )
}

export default Form;