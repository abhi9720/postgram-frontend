import React from 'react';
import './post.css';
import { MoreVert } from '@material-ui/icons';
import axiosInstance from '../../utils/axiosConfig';
import { format } from 'timeago.js';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLike, setisLike] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setisLike(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  const likeHandler = async () => {
    setLike(isLike ? like - 1 : like + 1);
    setisLike(!isLike);
    try {
      await axiosInstance.put(`/post/${post._id}/like`, { userId: currentUser._id });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/user?userId=${post.userId}`);

      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (e) => {
    if (e.currentTarget.id === 'editPost') {
    }
    if (e.currentTarget.id === 'deletePost') {
      try {
        const id = currentUser._id;
        await axiosInstance.delete(`/post/${post._id}`, {
          data: { userId: id },
        });

        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }

    setAnchorEl(null);
  };

  return (
    <>
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <Link to={`/profile/${user.username}`} className="d-flex">
                <img
                  src={
                    user.profilePicture
                      ? user.profilePicture.replace(
                        '/upload',
                        '/upload/w_1000,h_1000,c_thumb,g_faces'
                      )
                      : '/assets/person/noAvatar.png'
                  }
                  alt=".."
                  className="postProfileImg"
                />
              </Link>
              <Link to={`/profile/${user.username}`} className="d-flex">
                <span className="postUserName">{user.username}</span>
              </Link>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
            {post.userId === currentUser._id ? (
              <div className="postTopRight">
                <Button
                  id="menubtn"
                  aria-controls="postdropdown"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVert className="" />
                </Button>
                <Menu
                  id="postdropdown"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem id="deletePost" onClick={handleClose}>
                    Delete
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="postCenter">
            {post?.description && (
              <span className="postText">{post?.description} </span>
            )}
            {post.img ? (
              <img src={post.img} alt=".." className="postImage" />
            ) : (
              ''
            )}
          </div>

          <div className="postBottom">
            <div className="postBottomLeft">
              <ThumbUpAltIcon
                className="likeIcon"
                style={{ fontSize: 25 }}
                color="primary"
                onClick={likeHandler}
                alt=""
              />
              <FavoriteIcon
                className="likeIcon"
                style={{ fontSize: 25 }}
                color="secondary"
                onClick={likeHandler}
                alt=""
              />

              <span className="postLikeCounter">{like} people like it</span>
            </div>
            {/* <div className="postBottomRight">
							<span className="postCommentText">{post.comment} comments</span>
						</div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
