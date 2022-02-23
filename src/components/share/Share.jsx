import React from 'react'
import "./share.css";
import { PermMedia, Cancel } from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import axiosInstance from "../../utils/axiosConfig";
import axios from 'axios'
import { AuthContext } from "../../context/AuthContext";
import { Avatar, LinearProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { Link } from "react-router-dom";
import SendIcon from "@material-ui/icons/Send";

const Share = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { state } = useContext(AuthContext);
  const desc = useRef();
  const [isposting, setIsPosting] = useState(false);
  const [file, setFile] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: state.user._id,
      description: desc.current.value,
    };
    if (!file && desc.current.value.length === 0) {
      return;
    }
    setIsPosting(true);
    if (file) {
      const data = new FormData();
      // const fileName = Date.now() + file.name;
      // data.append('name', fileName);
      data.append("file", file);
      data.append("upload_preset", "chatsocial");
      data.append("cloud_name", "abhi97");

      axios.post(
        "https://api.cloudinary.com/v1_1/abhi97/image/upload",
        data
      ).then(async (res) => {
        newPost.img = res.data.url;
        console.log(res.data);
        await axiosInstance.post("/post", newPost);
        desc.current.value = "";
      })
        .catch(err => {
          // show some message on err
          console.log(err)
          alert("Failed to post ")
        })
        .finally(r => {
          // document.getElementById("cancelPost").click()
          setIsPosting(false);
          window.location.reload();
        })


      //   try {
      //     const res = await axios.post(
      //       "https://api.cloudinary.com/v1_1/abhi97/image/upload",
      //       data
      //     );

      //     alert("new url  : " + res.data.url)

      //   } catch (err) {
      //     console.log(err);
      //     document.getElementById("cancelPost").click()
      //   }
      // }

      // try {
      //   await axiosInstance.post("/post", newPost);
      //   desc.current.value = "";
      //   // window.location.reload();
      // } catch (err) {
      //   console.log(err);
      // } finally {
      //   setIsPosting(false);
      // }
    }
    else {
      try {
        await axiosInstance.post("/post", newPost);
        desc.current.value = "";

      } catch (err) {
        console.log(err);
      } finally {
        window.location.reload();
        setIsPosting(false);
      }
    }
  }
  return (
    <>
      <div className="share">
        <div className="shareWrapper">
          <div className="shareTop">
            <div
              className="d-flex align-items-center"
              style={{ width: "100% " }}>
              <Link to={`/profile/${state.user.username}`} className="d-flex">
                <Avatar
                  src={
                    state.user.profilePicture
                      ? state.user.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="shareProfileImg"
                />

              </Link>
              <span className='fs-5 fw-bold'>{state.user?.username}</span>

              {/* <Fab
                variant="extended"
                color={hide ? "primary" : "default"}
                aria-label="post"
                className="w-100 toggle_post"
                onClick={() => {
                  setHide(!hide);
                  setFile(null);
                }}
              >
                Add Post
              </Fab> */}
            </div>


            <TextareaAutosize
              ref={desc}
              type="text"
              className="shareInput"
              placeholder={"What's is in your mind " + state.user.username + " ?"}
            />

          </div>

          {file && (
            <div className="shareImgContainer">
              <img
                className="shareImg"
                src={URL.createObjectURL(file)}
                alt=""
              />

              <Cancel
                className="shareCancelImg"
                onClick={() => setFile(null)}
              />
            </div>
          )}
          <form className="shareBottom" onSubmit={onSubmitHandler}>

            <>
              <div className="shareOptions">
                <label htmlFor="file" className="shareOption">
                  <PermMedia htmlColor="tomato" className="shareIcon" />
                  <span className="shareOptionText">Photo or vedio </span>
                  <input
                    type="file"
                    id="file"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                    style={{ display: "none" }}
                  />
                </label>
              </div>

              <Button
                variant="contained"
                className="shareButton"
                color="primary"
                type="submit"
                endIcon={<SendIcon />}
              >
                Post
              </Button>
            </>

          </form>

          <div className="update_status">
            {isposting ? <LinearProgress /> : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default Share;
