import "./share.css";
import { PermMedia, Cancel } from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import axiosInstance from "../../utils/axiosConfig";
import { AuthContext } from "../../context/AuthContext";
import { Avatar, Fab, LinearProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { Link } from "react-router-dom";
import SendIcon from "@material-ui/icons/Send";

const Share = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [isposting, setIsPosting] = useState(false);
  const [file, setFile] = useState(null);
  const [hide, setHide] = useState(true);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
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

      try {
        const res = await axiosInstance.post(
          "https://api.cloudinary.com/v1_1/abhi97/image/upload",
          data
        );
        newPost.img = res.data.url;
      } catch (err) {
        console.log(err);
      }
    }

    try {
      await axiosInstance.post("/post", newPost);
      desc.current.value = "";
      window.location.reload();
    } catch (err) {
      console.log(err);
    } finally {
      setIsPosting(false);
    }
  };
  return (
    <>
      <div className="share">
        <div className="shareWrapper">
          <div className="shareTop">
            <div
              className="d-flex justify-content-between"
              style={{ width: "100% " }}
            >
              <Link to={`/profile/${user.username}`}>
                <Avatar
                  src={
                    user.profilePicture
                      ? user.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="shareProfileImg"
                />
              </Link>

              <Fab
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
              </Fab>
            </div>

            {!hide && (
              <TextareaAutosize
                ref={desc}
                type="text"
                className="shareInput"
                placeholder={"What's is in your mind " + user.username + " ?"}
              />
            )}
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
            {!hide && (
              <>
                <div className="shareOptions ml-lg-5">
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
            )}
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
