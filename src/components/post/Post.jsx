import React from 'react';
import './post.css';
import { MoreVert } from '@material-ui/icons';
import axiosInstance from '../../utils/axiosConfig';
import { format } from 'timeago.js';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useDoubleTap } from 'use-double-tap';
import Heart from "react-animated-heart";
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import { Grow, Snackbar } from '@material-ui/core';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';




import { Favorite, FavoriteBorderOutlined } from '@material-ui/icons';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Post = ({ post, isprofile }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLike, setisLike] = useState(false);
  const [user, setUser] = useState({});
  const { state } = useContext(AuthContext);
  const [opensnackbar, setOpensnackbar] = React.useState(false);
  const [message, setMessage] = React.useState("");


  useEffect(() => {
    setisLike(post.likes.includes(state.user._id));
  }, [state.user._id, post.likes]);

  const likeHandler = async () => {
    setLike(isLike ? like - 1 : like + 1);
    setisLike(!isLike);
    try {
      await axiosInstance.put(`/post/${post._id}/like`, { userId: state.user._id });

      if (window.screen.width > 850) {
        setMessage("Post Liked")
        setOpensnackbar(true);
      }

    } catch (err) {
      setLike(isLike ? like - 1 : like + 1);
      setisLike(!isLike);
      setMessage("Failed to  like Post")
      setOpensnackbar(true);
      console.log(err);
    } finally {

    }




  };


  const bind = useDoubleTap((event) => {
    if (!isLike) likeHandler()
    else {

      // document.getElementsByClassName("go2484888251").style.border = "1px solid #639";

      event.target.parentNode.parentNode.nextSibling.childNodes[0].childNodes[0].classList.add("transit")
      console.dir(event.target.parentNode.parentNode.nextSibling.childNodes[0].childNodes[0].classList)

      const myTimeout = setTimeout(myGreeting, 500);
      function myGreeting() {
        event.target.parentNode.parentNode.nextSibling.childNodes[0].childNodes[0].classList.remove("transit")
      }

      function myStopFunction() {

        clearTimeout(myTimeout);
      }

    }

  });

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



  const styleprofile = { "WebkitBoxShadow": "1px 1px 2px 1px rgb(29 28 28 / 8%)", "boxShadow": "1px 1px 2px 1px rgb(29 28 28 / 8%)", "border": "1px solid #0000001f", "width": "40%", "margin": "30px", "flex": "1 1 auto", "color": "#fff9" }









  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpensnackbar(false);
  };



  return (
    <>
      <div className="post" style={isprofile ? styleprofile : {}}>
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <Link to={`/profile/${user?._id}`} className="d-flex"  >
                <LazyLoadImage
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
                <Link to={`/profile/${user?._id}`} className="d-flex" >
                  <Typography className="postUserName">{user.username}</Typography>
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
              <Typography className="postText">{post?.description} </Typography>
            )}
            {post.img ? (
              <LazyLoadImage  {...bind} effect="blur" src={post.img} alt=".." className="postImage" loading="lazy" />
            ) : (
              ''
            )}
          </div>

          <div className="postBottom">
            <div className="postBottomLeft">
              {/* {isLike ? <Favorite
                className="likeIcon"
                style={{ fontSize: 25, color: "rgb(237, 73, 86)" }}
                onClick={likeHandler}
                alt=""
              /> :

                <FavoriteBorderOutlined
                  className="likeIcon"
                  style={{ fontSize: 25 }}
                  onClick={likeHandler}
                  alt=""
                />

              } */}

              <Heart isClick={isLike} onClick={likeHandler} />



              <span className="postLikeCounter">{like > 0 && `${like} people like it`}  </span>
            </div>
            {/* <div className="postBottomRight">
							<span className="postCommentText">{post.comment} comments</span>
						</div> */}
          </div>
        </div>
      </div>



      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={opensnackbar}
        onClose={handleCloseSnackbar}
        autoHideDuration={3000}
        key={"bottom" + "right"}
        TransitionComponent={Grow}

      >

        <Alert onClose={handleCloseSnackbar} style={{ backgroundColor: "#223354" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Post;

