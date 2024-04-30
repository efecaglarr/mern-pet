import React from 'react'
import { Grid, CircularProgress} from '@material-ui/core'
import { useSelector } from 'react-redux';

import Post from './Post/Post'
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
    const { posts, isLoading } = useSelector((state) => state.posts);
    const classes = useStyles();

    if (!posts || (posts && !posts.length && !isLoading)) return 'No posts found.'

    return (
        isLoading ?     
            <CircularProgress className={classes.loading} />
        : (
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={3} lg={4}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
};




export default Posts;