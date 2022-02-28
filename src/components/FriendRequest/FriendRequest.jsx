import React, { useContext, useEffect, useState } from "react";
import { Button, Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";

import "./friendRequest.css";
import { AuthContext } from "../../context/AuthContext";

const FriendRequest = ({ id }) => {
  // get user by id
  const [loading, setIsloading] = useState(false);

  const [user, setuser] = useState(null);
  const { state, dispatch } = useContext(AuthContext);
  useEffect(() => {
    const getuser = async () => {
      const res = await axiosInstance.get("/user/?userId=" + id);
      setuser(res.data);

      // here we will update user state
    };
    setIsloading(true);
    getuser();
    setIsloading(false);
  }, [id]);

  const AcceptRequest = async () => {
    // here user is id of that user who send request
    // and  currentuser is whi got friend request(will accept or reject )

    const res = await axiosInstance.put(`/user/${user?._id}/acceptFriendRequest`, {
      userId: state.user._id,
    });

    await axiosInstance.post("/conversation/", {
      senderId: user._id,
      receiverId: state.user._id,
    });

    dispatch({ type: "AcceptFriendRequest", payload: res.data });
  };
  const rejectFriendRequest = async () => {
    const res = await axiosInstance.put(`/user/${user._id}/rejectrequest`, {
      userId: state.user._id,
    });

    dispatch({ type: "RejectFriendRequest", payload: res.data });
  };

  return (
    <>
      {loading ? (
        <div> loading ... </div>
      ) : (
        <Link
          to={"/profile/" + user?._id}
          className="friendrequest"
          style={{ textDecoration: "none" }}
        >
          <div className="friendrequestuserInfo">
            <Avatar
              src={
                user?.profilePicture
                  ? user.profilePicture
                  : "assets/person/noAvatar.png"
              }
              alt={user?.username}
              className="friendrequestImg"
            />
            <span className="friendrequestName">{user?.username}</span>
          </div>
          <div className="friendRequestAccept">
            <>
              <Button color="secondary" onClick={rejectFriendRequest}>
                Reject
              </Button>
              <Button onClick={AcceptRequest}>Accept</Button>
            </>
          </div>
        </Link>
      )}
    </>
  );
};

export default FriendRequest;
