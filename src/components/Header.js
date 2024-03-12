import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import artworks from '../data/Listartworks';
import '../styles/Header.css';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../features/users/UsersSlice";
import Box from "@mui/material/Box";
import {Divider, ListItemIcon, Menu, MenuItem, Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import {Logout, PersonAdd, Settings} from "@mui/icons-material";

const Header = ({badgeCount}) => {
    const location = useLocation();
    const shouldShowHeader = !['/login', '/signup'].includes(location.pathname);

    const user = useSelector((state) => state.users?.value);
    const dispatch = useDispatch();

    console.log("user", user);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        handleClose();
        dispatch(logout());
    }

    return shouldShowHeader ? (
        <div className="navbar">
            <div className="logo-bar">
                <Link to={'/home'}>
                    <img className="logo" src="assets/images/logo.png" alt="logo"/>
                </Link>
                <Link to={'/home'}>
                    <button className="home" alt="home">
                        Home
                    </button>
                </Link>
                <Link to={'/upload'}>
                    <button className="create" alt="create">
                        Create
                    </button>
                </Link>
            </div>
            <div className="search-bar">
                <Stack spacing={2} sx={{width: 800, alignContent: 'center', p: 1.5}}>
                    <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={artworks.map((option) => option.topic)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={<SearchIcon/>}
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                    sx: {
                                        borderRadius: 10,
                                    },
                                }}
                            />
                        )}
                    />
                </Stack>
            </div>
            <div className="info">
                <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center', marginRight: '10px'}}>
                    <button className='btn-nofi'><TuneIcon/></button>
                    <Link to={"/cart"}>
                        <button className='btn-chat'>
                            <ShoppingBagIcon/>
                        </button>
                    </Link>
                    {
                        user.username ?
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar sx={{
                                        width: 32,
                                        height: 32
                                    }}>{user?.last_name?.charAt(0) || ""}</Avatar>
                                </IconButton>
                            </Tooltip> :
                            <Link to={"/login"}>
                                <button className='login'>Login</button>
                            </Link>
                    }
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{horizontal: 'right', vertical: 'top'}}
                        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    >
                        <Link to="/profile">
                            <MenuItem onClick={handleClose}>'
                                <Avatar/> Profile
                            </MenuItem>
                        </Link>
                        <Divider/>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <PersonAdd fontSize="small"/>
                            </ListItemIcon>
                            Add another account
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Settings fontSize="small"/>
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout fontSize="small"/>
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </div>
        </div>
    ) : null;
};

export default Header;
