import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import "../styles/Profile.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Avatar from "@mui/material/Avatar";
import {ArtworksService} from "../services/ArtworksService";
import {useSelector} from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import {Alert} from "@mui/material";
import {stringAvatar} from "../utils/string";

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
                                <div className='avatar-user'><Avatar {...stringAvatar(user?.first_name + " " + user?.last_name)} sx={{width: 24, height: 24,fontSize:12}}/></div>
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
