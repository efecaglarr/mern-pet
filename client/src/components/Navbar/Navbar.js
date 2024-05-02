import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	Container,
	Button,
	MenuItem,
	Avatar,
	Hidden,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NavLink from "./NavLink";

import { jwtDecode } from "jwt-decode";

import "./styles.css";

import logo from "../../images/logo.png";

const pages = ["ADOPT", "PETS", "CREATE"];

const Navbar = () => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
	const [anchorElNav, setAnchorElNav] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
		event.preventDefault(); // Prevent the default behavior of the <a> tag

	};
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const openSign = () => {
		navigate(`/auth`);
	};

	const logout = () => {
		dispatch({ type: "LOGOUT" });

		navigate("/");

		setUser(null);
	};

	useEffect(() => {
		const token = user?.token;

		if (token) {
			const decodedToken = jwtDecode(token);

			// Tokenin son kullanma tarihi geçmişse
			if (decodedToken.exp * 1000 < new Date().getTime()) {
				// Kullanıcıyı logout et
				logout();
			}
		}

		// useEffect'te localStorage'dan kullanıcı profili ayarlanırken koşula dahil edilmeli
		setUser(JSON.parse(localStorage.getItem("profile")));
	}, [location]); // Eğer location değişirse useEffect yeniden çalışır

	return (
		<AppBar
			position='static'
			style={{
				border: "3px solid #B5C0D0",
			}}
			sx={{
				backgroundColor: "#FAF9F6",
				py: "0.3rem",
				px: "0.6rem",
			}}
			className='custom-app-bar'
			maxwidth='lg'

		>
			{" "}
			<Container maxWidth='lg'>
				<Toolbar disableGutters>
					
					<NavLink to={`/`}>
						<img
                            src={logo}
                            width={90}
                            alt='Logo'
                        />
					</NavLink>
					<Box
						sx={{
							flexGrow: 1,
							justifyContent: "center",
							alignItems: "center",
							display: { xs: "none", md: "flex" },
							width: "100%",
							justifyContent: "end",
						}}
					>
						{pages.map((page) => (
								<NavLink key={page} to={`/${page.toLowerCase()}`} className="nav_texts">
								<span className="nav_texts">
									{page}
								</span>
								</NavLink>
						))}
					</Box>

					<div
						style={{
							width: "100%",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							justifyContent: "end",
						}}
					>
						{user ? (
							<div className='profile'>
								<Hidden mdDown>
									{" "}
									{/* mdDown means hide when screen size is medium or smaller */}
									<Avatar
										className='purple'
										alt={user.result.name}
										src={user.result.picture}
									>
										{user?.result?.name?.charAt(0)}
									</Avatar>
									<Typography className='username' variant='h6'>
										{user.result.name}
									</Typography>
								</Hidden>
								<button
									style={{
										marginRight: "5px",
									}}
								>
									<a
										onClick={() => {
											logout();
										}}
										className='button_top'
									>
										Log out
									</a>
								</button>
							</div>
						) : (
							<button
								style={{
									marginRight: "5px",
								}}
							>
								<a
									onClick={() => {
										openSign();
									}}
									className='button_top'
								>
									LOGIN
								</a>
							</button>
						)}
					</div>
					<Box sx={{ flexGrow: 2, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='black'
							className="mobile_menu" 
						>
							<MenuIcon className="menu_icon"/>
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{pages.map((page) => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Link key={page} to={`/${page.toLowerCase()}`}>
									<Typography className='nav_texts' textAlign='center'>
										{page}
									</Typography>
									</Link>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navbar;
