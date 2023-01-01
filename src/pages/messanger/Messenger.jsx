import "./messenger.css";
import MessengerNavbar from "./MessengerNavbar";


import Picker from 'emoji-picker-react';
import { io } from "socket.io-client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import Conversation from "../../components/conversation/Conversation";
import axiosInstance from "../../utils/axiosConfig";
import { Avatar, Button, Card, CardContent, CircularProgress, IconButton, TextareaAutosize } from "@material-ui/core";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import Message from "../../components/message/Message";

import { Link, NavLink } from "react-router-dom";
import { Chat, Home, Close, SendOutlined } from "@material-ui/icons";
import { MutatingDots } from "react-loader-spinner";
import displayTimeStamp from "../../components/message/CustomDateTime";

const Messenger = () => {
  const day = 1;
  const { state } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [daysCount, setDayCount] = useState(day);
  const [friendList, setfriendList] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [otherSide, setotherSide] = useState(null);
  const [send, setSend] = useState(false);
  const socket = React.useRef();
  const messagesEndRef = useRef(null)

  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  // const [search, SetSearch] = useState("");

  const [screenLargeStatus, setScreenLargeStatus] = useState(window.screen.width > 850);




  useEffect(() => {
    const items = JSON.parse(sessionStorage.getItem("CurrentChat"));
    if (items) {
      setCurrentChat(items);
    }
  }, []);

  const [hideSidebar, sethideSidebar] = useState(sessionStorage.getItem("CurrentChat") === null);


  useEffect(() => {
    socket.current = io.connect(process.env.REACT_APP_End_Point);

    socket.current.emit("addUser", state.user._id);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [state.user]); // i  am removing id from here






  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    // so it add this userid and socket in user array
    socket.current.on("getUsers", (users) => {
      // getting latest user
      setOnlineUsers(
        state.user.friends.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [state.user]); // as user change it send request to server

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!newMessage.length) {
      return;
    }
    const inputField = document.querySelector(".chatBoxWritting");

    inputField.focus();
    // const receiverId = currentChat.members.find((member) => member !== state.user._id);

    socket.current.emit("sendMessage", {
      senderId: state.user._id,
      receiverId: otherSide?._id,
      text: newMessage,
    });

    // adding message in database

    const addNewMessage = {
      sender: state.user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    try {
      setSend(true);
      const res = await axiosInstance.post("/messages", addNewMessage);

      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log("Failed to send message check ur internet connection ");
    } finally {
      setSend(false);
    }
  };

  useEffect(() => {
    const getConversation = async () => {
      try {
        setLoading(true)
        const res = await axiosInstance.get(`/conversation/${state.user._id}`);
        setfriendList(res.data);

      } catch (err) {
        console.log(err);
      }
      finally {
        setLoading(false)
      }
    };
    getConversation();
  }, [state.user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (!currentChat?._id) return;
        setMessages([]);
        const res = await axiosInstance.get("/messages/" + currentChat?._id + `?days=${daysCount}`);
        setMessages(res.data);

      } catch (err) {
        setDayCount(prevDay => Math.max(prevDay - 1, 1));
        console.log(err);
      }
    };

    getMessages();
  }, [currentChat, daysCount]);



  function incrementChatDay() {
    setDayCount(prevDay => prevDay + 1);
  }







  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages]);

  useEffect(() => {
    const getUser = async () => {
      const friendId = currentChat.members.find((m) => m !== state.user._id);
      try {
        const res = await axiosInstance("/user?userId=" + friendId);
        setotherSide(res.data);
        setshowEmojiPannel(null)
        setNewMessage("")

      } catch (err) {
        console.log(err);
      }
    };

    if (currentChat) {
      sessionStorage.setItem("CurrentChat", JSON.stringify(currentChat))
      getUser();
    }

  }, [state.user, currentChat]);

  // window.unload = function () {
  //   sessionStorage.removeItem('CurrentChat');
  //   return '';
  // };


  useEffect(() => {
    function handleWindowresize() {
      setScreenLargeStatus(window.screen.width > 850)
      return () => window.removeEventListener("resize", handleResize);
    }
    window.addEventListener("resize", handleWindowresize);

    return () => {
      window.removeEventListener("resize", handleWindowresize);

    };

  }, [])
  const sidebarHandler = () => {
    if (window.screen.width > 850) {
      sethideSidebar(true);
      setScreenLargeStatus(true)
    }
    else {
      setScreenLargeStatus(false)
      sethideSidebar(!hideSidebar);
    }
    setshowEmojiPannel(null)
    setNewMessage("")
  };







  const [showEmojiPannel, setshowEmojiPannel] = useState(null);


  const onEmojiClick = (event, emojiObject) => {
    console.log(event)

    setNewMessage((newMessage || '') + emojiObject.emoji)
  };


  function toglleEmojiPannel() {
    setshowEmojiPannel(!showEmojiPannel)
  }

  return (
    <>
      {loading ? <>

        <div className="d-flex vh-100 align-items-center justify-content-center">
          {/* <ReactLoading type={'bars'} color="#00e676" /> */}
          <MutatingDots height="100"
            width="100"
            color='#ff5733'
            ariaLabel='loading' />

        </div>
      </> :

        <>


          <MessengerNavbar />

          <div className="messenger">


            <div className="chat_icon">

              <div className="display-6 text-white">
                <span>Messenger </span>
              </div>
              <div>
                <Button   >
                  <NavLink
                    to="/"
                    role="button">
                    <Home
                      style={{ color: "white" }}
                      variant="contained"
                      onClick={() =>
                        window.location.href = "/"
                      } />
                  </NavLink>
                </Button>
              </div>
            </div>

            <div className={"sidebar_flex"} style={(hideSidebar || screenLargeStatus)
              ? { display: "block" } : { display: "none" }} >
              <div className="chatMenuWrapper">


                <div className="user">
                  {friendList.map((data) => {
                    return (
                      <div
                        key={data._id}
                        onClick={() => {
                          setCurrentChat(data);
                          if (window.screen.width <= 850) {
                            sidebarHandler();
                          }
                        }}>
                        <Conversation
                          key={data._id}
                          conversation={data}
                          currentuser={state.user}
                          Online={onlineUsers}
                          ChatOpen={otherSide}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className={"chat chatbox_flex"}

              style={(!hideSidebar || screenLargeStatus)
                ? { display: "block" } : { display: "none" }}

            >
              <div className="chatBoxWrapper">
                {currentChat ? (
                  <>
                    <div className="chat_header">

                      <Link
                        className="otherside_username"
                        to={"/profile/" + otherSide?._id}
                      >
                        <Avatar src={otherSide?.profilePicture} />

                        <div className="chat_headerInfo">
                          <p className="chat-room-name">
                            {otherSide?.username}
                          </p>


                          {onlineUsers?.includes(otherSide?._id) ? (
                            <p className="useronline">Online</p>
                          ) :
                            <p className="useronline">{otherSide?.lastSeen && "last seen : " + displayTimeStamp(otherSide?.lastSeen)}</p>
                          }
                        </div>
                      </Link>


                      <div className="IconsShownOnSmallScreen">
                        <Button   >
                          <NavLink
                            to="/"
                            role="button">
                            <Home
                              style={{ color: "white" }}
                              variant="contained"
                              onClick={() =>
                                window.location.href = "/"
                              } />
                          </NavLink>
                        </Button>

                        <IconButton
                          onClick={(e) => {
                            sidebarHandler(e);
                          }}
                          style={{ color: "white" }}
                          variant="contained">
                          <Chat />

                        </IconButton>
                      </div>

                    </div>

                    {/* <Avatar src={otherSide?.profilePicture} />
                  <div className="chat_headerInfo">
                    <span
                      className="otherside_username"
                      to={"./profile/" + otherSide?.username}
                    >
                      {otherSide?.username}
                    </span>
                    <p className="chat-room-last-seen">last seen 20:22 PM </p>
                  </div
                  <div className="chat_headerRight"></div> */}
                    {/* </div> */}

                    <div className="chat_body">
                      <div className="d-flex justify-content-center mb-2" >
                        <Button onClick={incrementChatDay} className="bg-light" variant="text">Load Previous Chat</Button>
                      </div>

                      {messages.map((m) => (
                        <div key={m._id} ref={messagesEndRef}>
                          <Message
                            Message={m}
                            own={m.sender === state.user._id ? true : false}
                            img={
                              m.sender === state.user._id
                                ? state.user.profilePicture
                                : otherSide?.profilePicture
                            }
                          />



                        </div>

                      ))}


                      {/* <div className="emojipannelclose" style={{ display: showEmojiPannel ? "block" : "none" }}>
                        <IconButton onClick={() => setshowEmojiPannel(!showEmojiPannel)} aria-label="close" component="span">
                          <Close size="small" />
                        </IconButton>
                        <Picker
                          onEmojiClick={onEmojiClick} />
                      </div> */}

                    </div>

                    <div className="messageSender">
                      <div className="chat_footer">
                        <IconButton className="emojibtn" onClick={() => setshowEmojiPannel(!showEmojiPannel)}>
                          <InsertEmoticonIcon />
                        </IconButton>


                        <form>



                          <TextareaAutosize
                            maxRows={window.screen.width > 850 ? 2 : 4}
                            aria-label="maximum height"
                            placeholder="Type a message"
                            className="chatBoxWritting"
                            type="text"
                            onChange={(e) => {
                              setNewMessage(e.target.value)
                            }}
                            onFocus={() => setshowEmojiPannel(null)}
                            value={newMessage}
                          />

                          {/* <button type="submit">Send a Message</button> */}
                        </form>


                      </div>

                      {send ? (
                        <IconButton className="SendMessagebtn" aria-label="Send Message">
                          <CircularProgress color="primary" size="24px" />
                        </IconButton>
                      ) : (
                        <IconButton className="SendMessagebtn" aria-label="Send Message" onClick={submitHandler}>
                          <SendOutlined />
                        </IconButton>

                      )}

                    </div>
                  </>
                ) : (
                  <>
                    <div className="no_conversation">
                      <img
                        src="https://res.cloudinary.com/abhi97/image/upload/v1633285360/recipes/undraw_Begin_chat_re_v0lw_lyfrkb.svg"
                        alt="failed to load"
                      />
                      <span>Open a new Conversation </span>
                    </div>
                  </>
                )}
              </div>
            </div>



            <Card className="p-0 m-0" style={{ display: showEmojiPannel ? "block" : "none" }}>

              <CardContent className="p-0 m-0">
                <div className="emojipannelclose">
                  <IconButton onClick={toglleEmojiPannel} aria-label="close" component="span">
                    <Close size="small" />
                  </IconButton>
                </div>

                <Picker
                  onEmojiClick={onEmojiClick} />
              </CardContent>
            </Card>







          </div>
        </>

      }


    </>
  );
};

export default Messenger;
