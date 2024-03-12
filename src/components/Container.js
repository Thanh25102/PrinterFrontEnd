import React, {useEffect, useState} from 'react'
import '../styles/Container.css';
import Avatar from '@mui/material/Avatar';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {deleteArtwork} from "../features/artworks/ArtworksSlice";
import {ArtworksThunk} from "../features/artworks/ArtworksThunk";
import {ArtworksService} from "../services/ArtworksService";
import {Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";


const Container = () => {
    const dispatch = useDispatch();

    const artworks = useSelector((state) => state.artworks?.value);
    const user = useSelector((state) => state.users?.value);

    useEffect(() => {
        dispatch(ArtworksThunk.getAllArtworks());
    }, []);



    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleSaved = (artworkId) => {
        if (user && user.id)
            ArtworksService.saveArtwork(user.id, artworkId)
                .then((res) => {
                    if (res.message === "Artwork already saved")
                        handleClickAlert()
                })
                .catch(() => {
                    handleClickAlert()
                });
        else handleClickOpen()
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
        <div className='container'>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Lưu Artwork?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Vui lòng đăng nhập để có thể thực hiện chức năng này
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Bỏ qua</Button>
                    <Button onClick={handleClose} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
            {artworks?.map((art, index) => (
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
                            ><HighlightOffIcon onClick={(e) => {
                                e.preventDefault();
                                dispatch(ArtworksThunk.deleteArtwork(art.id))
                                    .then(() => dispatch(deleteArtwork(art.id)));
                            }}/></div>
                            <div className='avatar-user'><Avatar sx={{width: 24, height: 24}}/></div>
                        </div>
                    </div>
                </Link>
            ))}
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
        </div>
    )
}


export default Container;
