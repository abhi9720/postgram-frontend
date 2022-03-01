import axiosInstance from "../../utils/axiosConfig";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Friends = ({ userId }) => {
  const [user, setuser] = useState(null);

  useEffect(() => {
    const getuser = async () => {
      const res = await axiosInstance.get("/user/?userId=" + userId);
      setuser(res.data);
    };
    getuser();
  }, [userId]);

  return (
    <>
      <Link
        to={"/profile/" + user?._id}
        style={{ textDecoration: "none" }}
      >
        <div className="rightbarFollowing">
          <img
            loading="lazy"
            src={
              user?.profilePicture
                ? user?.profilePicture
                : "../assets/person/noAvatar.png"
            }
            alt=""
            className="rightbarFollowingImg"
          />
          <span className="rightbarFollowingName">{user?.username}</span>
        </div>
      </Link>
    </>
  );
};

export default Friends;
