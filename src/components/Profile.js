import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import "../styles/Profile.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Avatar from "@mui/material/Avatar";
import {ArtworksService} from "../services/ArtworksService";
import {useSelector} from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import {Alert} from "@mui/material";

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}


const Profile = () => {

    const [createdArtworks, setCreatedArtworks] = useState([]);
    const [savedArtworks, setSavedArtworks] = useState([]);
    const [selectedArtworks, setSelectedArtworks] = useState([]);

    const user = useSelector(state => state.users?.value);

    useEffect(() => {
        if (!user && !user.id) return
        (async () => {
            const createdArtworks = await ArtworksService.getCreatedArtworks(user.id);
            const savedArtworks = await ArtworksService.getSavedArtworks(user.id);
            console.log("savedArtworks", savedArtworks)
            setCreatedArtworks(createdArtworks);
            setSavedArtworks(savedArtworks);
            setSelectedArtworks(createdArtworks);
        })()
    }, [])

    const handleSaved = (artworkId) => {
        ArtworksService.saveArtwork(user.id, artworkId)
            .then((res) => {
                if (res.message === "Artwork already saved")
                    handleClickAlert()
            })
            .catch(() => {
                handleClickAlert()
            });
    }
    const [openAlert, setOpenAlert] = useState(false);
    const handleClickAlert = () => {
        console.log("alert")
        setOpenAlert(true);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    return (
        <>
            <div className='profile'>
                <h1 className='user-name'>{user.first_name + " " + user.last_name}</h1>
                <Avatar {...stringAvatar(user?.first_name + " " + user?.last_name)} sx={{width: 52, height: 52}}/>
                <Link to="/edit-profile">
                    <button className='edit-profile'>Edit Profile</button>
                </Link>
                <div className='created-saved'>
                    <button className='created' onClick={() => setSelectedArtworks(createdArtworks)}>Created</button>
                    <button className='saved' onClick={() => setSelectedArtworks(savedArtworks)}>Saved</button>
                </div>
            </div>
            <div className={"container"}>
                {selectedArtworks?.map((art, index) => (
                    <Link to={`/artwork/${art.id}`} key={art.id}>
                        <div id={art.id} className={`artwork artwork-${index % 4}`}>
                            <img src={art.src} alt={art.src}/>
                            <div className='overlay'>
                                <div className='save-btn' onClick={(e) => {
                                    e.preventDefault();
                                    handleSaved(art.id);
                                }}
                                >Save
                                </div>
                                <div className='hidden-tag' alt="Danhyeye"
                                ><
                                    HighlightOffIcon onClick={(e) => {
                                    e.preventDefault();
                                    // dispatch(ArtworksThunk.deleteArtwork(art.id))
                                    //     .then(() => dispatch(deleteArtwork(art.id)));
                                }}/>
                                </div>
                                <div className='avatar-user'><Avatar sx={{width: 24, height: 24}}/></div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={openAlert}
                autoHideDuration={2000}
                onClose={handleCloseAlert}
            >
                <Alert onClose={handleCloseAlert} severity="warning">
                    Bạn đã lưu Artwork này rồi!
                </Alert>
            </Snackbar>
        </>
    );
}

export default Profile;
