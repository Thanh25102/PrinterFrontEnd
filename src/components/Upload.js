import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { useDispatch, useSelector } from "react-redux";
import artworks from "../data/Listartworks"

import "../styles/Upload.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db } from "../firebase/config";
import { v4 } from "uuid";
import { addArtwork } from "../features/artworks/ArtworksSlice";
import { ArtworksThunk } from "../features/artworks/ArtworksThunk";
import { Alert, Button, Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle } from "@mui/material";
import { TopicsThunk } from "../features/topics/TopicsThunk";

const DisplayImage = () => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users?.value);

    const isUserLoggedIn = user !== null && user.id;
    const [topicList, setTopicList] = React.useState([]);

    const topics = useSelector(state => state.topics?.value || [])

    useEffect(() => {
        dispatch(TopicsThunk.getAllTopics())
    }, [])

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpload = async () => {
        if (!isUserLoggedIn) {
            handleClickOpen()
        } else {
            if (image !== null) {
                const imgRef = ref(db, `files/${v4()}`)
                await uploadBytes(imgRef, image).then(value => {
                    getDownloadURL(value.ref).then(url => {
                        const newArtwork = {
                            src: url,
                            title: title,
                            price: price,
                            topics: topicList,
                            description: description,
                            createdBy: user.id
                        };
                        dispatch(ArtworksThunk.createArtwork(newArtwork))
                            .then(() => {
                                dispatch(addArtwork(newArtwork));
                            });
                        clearForm();
                    });
                })
            }
        }
    }
    const clearForm = () => {
        setImage(null);
        setTitle("");
        setDescription("");
        setPrice(0);
        setTopicList([]);
    }

    return (
        <div className="upload-container">
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Tạo mới Artwork"}
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

            <div className="upload-image">
                {image && < img src={URL.createObjectURL(image)} />}
                <p>Choose a file or drag and drop it here</p>
                {!image && (
                    <button>
                        <input
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={(event) => {
                                setImage(event.target.files[0]);
                            }}
                        />
                    </button>
                )}
            </div>
            <div className="description-artwork">
                <p>Title</p>
                <TextField
                    label="Add a title"
                    variant="outlined"
                    sx={{ width: 700 }}
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <p>Description</p>
                <TextField
                    label="Add a detailed description"
                    variant="outlined"
                    sx={{ width: 700 }}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
                <p>Price</p>
                <FormControl fullWidth sx={{ width: 700 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Amount"
                        onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                        value={price}
                    />
                </FormControl>
                <p>Topics</p>
                <Autocomplete
                    sx={{ width: 700 }}
                    multiple
                    id="tags-outlined"
                    options={topics}
                    onChange={(event, newValue) => setTopicList(newValue)}
                    value={topicList}
                    getOptionLabel={(option) => option.name}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField {...params} label="Add a topic" />
                    )}
                />
                <button className="upload-button" onClick={handleUpload}>
                    Upload
                </button>
            </div>
        </div>
    );
};

export default DisplayImage;
