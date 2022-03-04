import React from 'react'
import "./suggestion.css";
import Avatar from "@material-ui/core/Avatar";
import { Typography } from '@material-ui/core';


const Suggestion = ({ user }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <>
            <div key={user._id} className="communityFriend">
                <Avatar
                    src={
                        user.profilePicture.startsWith("https")
                            ? user.profilePicture.replace(
                                "/upload",
                                "/upload/w_1000,h_1000,c_thumb,g_faces"
                            )
                            : PF + "person/noAvatar.png"
                    }
                    alt=""
                    component="div"
                    style={{ height: '27px', width: "27px", marginRight: "20px" }}
                >
                    {user.username ? user.username[0].toUpperCase() : "-----"}
                </Avatar>
                <span className='communityFriendName' >{user.username}</span>

            </div>
        </>
    );
};

export default Suggestion;
