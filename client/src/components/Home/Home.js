import React, { useState, useEffect } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import { MuiChipsInput } from "mui-chips-input";

import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getPosts, getPostsBySearch } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";
import useStyles from "./styles.js";
import Hero from "../Hero/Hero.js";

function useQuery() {
  // For searching React-Router-Dom says use function and call it as useQuery .
  return new URLSearchParams(useLocation().search);
}

const Home = ({currentId, setCurrentId}) => {
  
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1; // If we don't have the page we must be on the first page.
  const searchQuery = query.get("searchQuery");
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const searchPost = () => {
    if (search.trim() || tags) { // trim() -> Removes spaces at the beginning, end of the text, and repeating spaces in the text.
      dispatch(getPostsBySearch({ search, tags: tags.join(',') })); // This action is going to take some parameters. It is going to have Search Query object as a parameter.
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      navigate("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.code === "Enter") {
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  return (
    <>
    <Hero />
    <Container >
      <Grow in>
        <Container>
          <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} /* take 12 spaces on mobile */ sm={12} md={12}>
              <div className={classes.appBarSearch}>
                <TextField name="search" variant="outlined" label="Search" onKeyDown={handleKeyPress} fullWidth value={search} onChange={(e) => setSearch(e.target.value)} style={{ marginRight: "10px", width: "70%"}} />
                <MuiChipsInput size="large" style={{padding: '0.2em',}} value={tags} onAddChip={handleAdd} onDeleteChip={handleDelete}/>
                <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">
                  Search
                </Button>
              </div>
              
              <Grid className={classes.gridPosts} item xs={12} /* take 12 spaces on mobile */ sm={12} md={12}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>

              <div style={{marginTop: '30px',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Pagination page={page}/>
                </div>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
    </>
  );
};

export default Home;
