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

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
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
          <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}
          >
            <Grid className={classes.gridPosts} item xs={12} /* take 12 spaces on mobile */ sm={12} md={12}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar
                className={classes.appBarSearch}
                position="static"
                color="inherit" /*if a parent component has a textColor of primary and a child component has a textColor of inherit, the child component's text will have the same color as the parent component's text that is defined as primary.*/
              >
                <TextField
                  name="search"
                  variant="outlined"
                  label="Search"
                  onKeyDown={handleKeyPress}
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />
                <MuiChipsInput
                  style={{ marginBottom: "10px" }}
                  value={tags}
                  onAddChip={handleAdd}
                  onDeleteChip={handleDelete}
                />
                <Button
                  onClick={searchPost}
                  className={classes.searchButton}
                  variant="contained"
                  color="primary"
                >
                  Search
                </Button>
              </AppBar>
              <Form
                currentId={currentId}
                setCurrentId={setCurrentId}
                className={classes.pagination}
              />
              <Paper elevation={10}>
                <Pagination page={page}/>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
    </>
  );
};

export default Home;
