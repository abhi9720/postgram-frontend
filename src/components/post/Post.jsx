import React from 'react';
import './post.css';
import { MoreVert } from '@material-ui/icons';
import axiosInstance from '../../utils/axiosConfig';
import { format } from 'timeago.js';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import Button from '@material-ui/core/Button';


import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';



import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
const Post = ({ post, isprofile }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLike, setisLike] = useState(false);
  const [user, setUser] = useState({});
  const { state } = useContext(AuthContext);

  useEffect(() => {
    setisLike(post.likes.includes(state.user._id));
  }, [state.user._id, post.likes]);

  const likeHandler = async () => {
    setLike(isLike ? like - 1 : like + 1);
    setisLike(!isLike);
    try {
      await axiosInstance.put(`/post/${post._id}/like`, { userId: state.user._id });
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
        const id = state.user._id;
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
      <div className="post" >
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <Link to={`/profile/${user?._id}`} className="d-flex">
                <LazyLoadImage effect="blur"
                  loading="lazy"
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
              <div className="Post_user">
                <Link to={`/profile/${user?._id}`} className="d-flex">
                  <span className="postUserName">{user.username}</span>
                </Link>
                <span className="postDate">{format(post.createdAt)}</span>
              </div>
            </div>
            {post.userId === state.user._id ? (
              <div className="postTopRight">
                <Button
                  id="menubtn"
                  aria-controls="postdropdown"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVert />
                </Button>


                <Dialog
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    Want to delete Post ?
                  </DialogTitle>
                  <DialogContent>

                  </DialogContent>
                  <DialogActions>
                    <Button id="deletePost" className="bg-danger text-white" onClick={handleClose}>Delete</Button>
                    <Button id="cancel" onClick={handleClose} autoFocus>
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>


                {/* <Menu
                  id="postdropdown"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem id="deletePost" onClick={handleClose}>
                    Delete
                  </MenuItem>
                </Menu> */}
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
              <LazyLoadImage effect="blur" src={post.img} alt=".." className="postImage" loading="lazy" />
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
