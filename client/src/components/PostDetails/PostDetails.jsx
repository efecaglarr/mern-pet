import React from "react";
import useStyles from "./styles";
import {
	Paper,
	Typography,
	CircularProgress,
	Divider,
} from "@material-ui/core";
import LocationOn from "@mui/icons-material/LocationOn";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { getPost, getPostsBySearch } from "../../actions/posts";

const PostDetails = () => {
	const { post, posts, isLoading } = useSelector((state) => state.posts);
	const classes = useStyles();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		dispatch(getPost(id));
	}, [id]);

	useEffect(() => {
		dispatch(getPostsBySearch({ search: "none", tags: post?.tags.join(",") }));
	}, [post]);

	if (!post) return null;

	if (isLoading) {
		return (
			<Paper
				elevation={6}
				className={classes.loadingPaper}
				style={{
					padding: "20px",
					borderRadius: "5px",
					backgroundColor: "#FAF9F6",
				}}
			>
				<CircularProgress size='3em' />
			</Paper>
		);
	}

	const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

	const openPost = (_id) => {
		navigate(`/posts/${_id}`);
	};

	return (
		<Paper
			style={{
				padding: "20px",
				borderRadius: "5px",
				backgroundColor: "#FAF9F6",
			}}
			elevation={6}
		>
			<div className={classes.card}>
				<div className={classes.imageSection}>
					<img className={classes.media} src={post.selectedFile} alt={post.title} />
				</div>
				<div className={classes.section}>
					<Typography variant='h3' component='h2'>
						{post.title}
					</Typography>
					<Typography gutterBottom variant='h6' color='textSecondary' component='h2'>
						{post.tags.map((tag) => `#${tag} `)}
					</Typography>
					<Typography gutterBottom variant='body1' component='p'>
						{post.message}
					</Typography>
					<Typography variant='h6'>Created by: {post.name}</Typography>
					<Divider style={{ margin: "20px 0" }} />
					<Typography variant='body1'>
						<strong>
							Location : {post.location}{" "}
							<LocationOn sx={{ verticalAlign: "middle", width: "13px", marginBottom: "3px"}} />
						</strong>
					</Typography>
					<Typography variant='body1'>
						{moment(post.createdAt).fromNow()}
					</Typography>
					<Typography variant='body1'>
						<strong>Description</strong>
					</Typography>
					<Typography variant='h6'>{post.description}</Typography>
					<Divider style={{ margin: "20px 0" }} />

					<Typography variant='body1'>
						<strong>Contact : {post.contact}{" "}</strong>
					</Typography>
					<Divider style={{ margin: "20px 0" }} />
				</div>
			</div>
			{recommendedPosts.length && (
				<div className={classes.section}>
					<Typography gutterBottom variant='h5'>
						You might also like:
					</Typography>
					<Divider />
					<div className={classes.recommendedPosts}>
						{recommendedPosts.map(
							({ title, name, message, likes, selectedFile, _id }) => (
								<div
									style={{
										border: "1px solid #B5C0D0",
										borderRadius: "10px",
										margin: "20px",
										cursor: "pointer",
										padding: "20px",
									}}
									onClick={() => openPost(_id)}
									key={_id}
								>
									<Typography gutterBottom variant='h6'>
										{title}
									</Typography>
									<Typography gutterBottom variant='subtitle2'>
										{name}
									</Typography>
									<Typography gutterBottom variant='subtitle2'>
										{message}
									</Typography>
									<Typography gutterBottom variant='subtitle1'>
										Likes: {likes.length}
									</Typography>
									<img src={selectedFile} width='200px' />
								</div>
							),
						)}
					</div>
				</div>
			)}
		</Paper>
	);
};

export default PostDetails;
