import React from 'react'

import Avatar from "@material-ui/core/Avatar";
import { Typography } from '@material-ui/core';
const CloseFriend = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (

    <div key={user._id} className="d-flex">
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
        style={{ height: '30px', width: "30px", marginRight: "20px" }}
      >
        {user.username ? user.username[0].toUpperCase() : "-"}
      </Avatar>
      <Typography variant="body2" gutterBottom component="div" ml={2}>{user.username}</Typography>
    </div>

  );
};

export default CloseFriend;