import React, {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";


import "../styles/Editprofile.css";
import {useDispatch, useSelector} from "react-redux";
import {UsersService} from "../services/UsersService";
import {editUser} from "../features/users/UsersSlice";


const Editprofile = () => {

    const [curUser,setCurUser] = useState()
    const user = useSelector((state) => state.users?.value);
    const dispatch = useDispatch();

    useEffect(()=>{
        setCurUser(user)
    },[])

    const handleEditProfile = () => {
        UsersService.edit(curUser).then((res) => {
            dispatch(editUser(curUser))
        })
    }
    const handleResetProfile = () => {
        setCurUser(user)
    }

    return (
        <div className="edit-container">
            <div className="edit-avatar">
                {/* {image && < img src={URL.createObjectURL(image)} />}
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
                )} */}
            </div>
            <div className="description-artwork">
                <p>First Name</p>
                <TextField
                    // // label="First Name"
                    variant="outlined"
                    sx={{ width: 700 }}
                    value={curUser?.first_name}
                    onChange={(e) => setCurUser({...curUser, first_name: e.target.value})}
                />
                <p>Last Name</p>
                <TextField
                    // label="Last Name"
                    variant="outlined"
                    sx={{ width: 700 }}
                    value={curUser?.last_name}
                    onChange={(e) => setCurUser({...curUser, last_name: e.target.value})}
                />
                <p>Email</p>
                <TextField
                    // label="Email"
                    variant="outlined"
                    sx={{ width: 700 }}
                    value={curUser?.email}
                    onChange={(e) => setCurUser({...curUser, email: e.target.value})}
                />
                <p>Username</p>
                <TextField
                    // label="Username"
                    variant="outlined"
                    sx={{ width: 700 }}
                    value={curUser?.username}
                    onChange={(e) => setCurUser({...curUser, username: e.target.value})}
                />

                <button className="edit-profile" onClick={handleEditProfile} >
                    Edit Profile
                </button>
                <button className="edit-profile" onClick={handleResetProfile} >
                    Reset Profile
                </button>
            </div>
        </div>
    );
};

export default Editprofile;
