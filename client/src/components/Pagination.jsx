import React, { useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';

import { getPosts } from '../actions/posts';

// import useStyles from './styles';  

const Paginate = ({ page }) => {
    // const classes = useStyles();
    const dispatch = useDispatch();
    const { numberOfPages } = useSelector((state ) => state.posts)

    useEffect(() => {
        if(page) dispatch(getPosts(page));
    }, [page])

    return (
    <Stack spacing={2}>
        <Pagination count={numberOfPages} variant="outlined" page={Number(page) || 1} renderItem={(item) => (
            <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`}/>
        )}/>
      </Stack>
    )
}

export default Paginate;