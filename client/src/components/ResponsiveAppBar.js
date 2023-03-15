import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import '../style/navbar.css';
import Logo from '../resources/logo.PNG';
import {useAtom} from "jotai";
import {LOGGED_IN, RE_RENDER} from "../util/Store";
import profileImg from '../resources/AvatarNoBg.png';
import LoginIcon from '@mui/icons-material/Login';


function ResponsiveAppBar() {

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [loggedIn, setLoggedIn] = useAtom(LOGGED_IN);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logout = () => {
        setLoggedIn(false);
        localStorage.removeItem("user");
        setAnchorElUser(null);
        window.location.replace("/login");
    };

    const viewProfile = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        let username = user.username;
        if (username) {
            window.location.replace(`/profile/${username}`)
        }
    }

    const goLogin = () => {
        setAnchorElNav(null);
        window.location.replace("/login");
    }

    const goAddAnnouncement = () => {
        window.location.replace("/addAnnouncement")
    }

    const goMainPage = () => {
        window.location.replace("/")
    }

    return (
        <AppBar position="fixed" style={{background: "white"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters className={"mainBar"}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            flexGrow: 1
                        }}
                    >
                        <img src={Logo} width={250} height={64} alt={""} onClick={goMainPage}
                             style={{cursor: "pointer"}}/>
                    </Typography>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <img src={Logo} width={250} height={64} alt={""}/>
                    </Typography>

                    <Button className={"addAnnouncementBtn"} variant="contained" href="/addAnnouncement"
                            style={{marginRight: "2em"}}>
                        <AddIcon/>
                        Sell Now
                    </Button>

                    {loggedIn ? (
                        <Box sx={{flexGrow: 0}} style={{marginLeft: "2em"}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="L" src={profileImg}/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem key={"profile"} onClick={viewProfile}>
                                    <Typography textAlign="center">Profile</Typography>
                                </MenuItem>
                                <MenuItem key={"menuAddAnnouncement"} className={"menuAddAnnouncement"}
                                          onClick={goAddAnnouncement}>
                                    <Typography textAlign="center">Sell Now +</Typography>
                                </MenuItem>
                                <MenuItem key={"logout"} onClick={logout}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    ) : (
                        <>
                            <IconButton className={"loginIcon"} onClick={goLogin}>
                                <LoginIcon/>
                            </IconButton>
                            <Box className={"authentication"} sx={{display: {xs: 'none', md: 'flex'}}}>
                                <div className={"login"}><a href={"/login"}
                                                            style={{textDecoration: "none", color: "black"}}>Login</a>
                                </div>
                                <div className={"divider"}>&nbsp; | &nbsp;</div>
                                <div className={"register"}><a href={"/register"} style={{
                                    textDecoration: "none",
                                    color: "black"
                                }}>Register</a></div>
                            </Box>
                        </>

                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;