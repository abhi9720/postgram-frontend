import "./messenger.css";
import MessengerNavbar from "./MessengerNavbar";


import Picker from 'emoji-picker-react';
import { io } from "socket.io-client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import Conversation from "../../components/conversation/Conversation";
import axiosInstance from "../../utils/axiosConfig";
import { Avatar, Button, Card, CardContent, CircularProgress, IconButton } from "@material-ui/core";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import Message from "../../components/message/Message";

import { Link, NavLink } from "react-router-dom";
import { Chat, Home, Close } from "@material-ui/icons";
import { MutatingDots } from "react-loader-spinner";

const Messenger = () => {
  const { state } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [otherSide, setotherSide] = useState(null);
  const [send, setSend] = useState(false);
  const socket = React.useRef();
  const messagesEndRef = useRef(null)

  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  // const [search, SetSearch] = useState("");
  const [hide, showSidebar] = useState(true);

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
        setConversations(res.data);
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
        const res = await axiosInstance.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getMessages();
  }, [currentChat]);



  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })


  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  useEffect(() => {
    const getUser = async () => {
      const friendId = currentChat.members.find((m) => m !== state.user._id);
      try {
        const res = await axiosInstance("/user?userId=" + friendId);
        setotherSide(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (currentChat) {
      getUser();
    }
  }, [state.user, currentChat]);

  // useEffect(() => {
  //   SetSearch();
  // }, [SetSearch]);

  const sidebarHandler = () => {
    showSidebar(!hide);
    if (window.screen.width > 850) {
      showSidebar(true);
    }
  };

  useEffect(() => { }, [hide]);




  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showEmojiPannel, setshowEmojiPannel] = useState(null);


  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);

    setNewMessage((newMessage || '') + chosenEmoji.emoji)
  };

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
              <Button   >
                <NavLink
                  to="/"
                  role="button"
                >
                  <Home
                    variant="extended"
                    onClick={() =>
                      window.location.href = "/"
                    } />
                </NavLink>
              </Button>

              <Button
                onClick={(e) => {
                  sidebarHandler(e);
                }}
                backgroundColor="#f50057"
                variant="contained"
                startIcon={<Chat />}
              >
                Chat

              </Button>
            </div>

            <div className={hide ? "sidebar_flex0" : "sidebar_flex1"}>
              <div className="chatMenuWrapper">
                {/* <div className="chatMenuInput">
              <Search />
              <input
                type="text"
                placeholder="Search for a friend .  .  ."
                onChange={(e) => SetSearch(e.target.value)}
                value={search}
              />
            </div> */}

                <div className="user">
                  {conversations.map((data) => {
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

            <div
              className={hide ? "chat chatbox_flex" : "chat chatbox_flexsmall"}>
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
                        </div>
                      </Link>

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
                  </div>
                  <div className="chat_headerRight"></div> */}
                    {/* </div> */}

                    <div className="chat_body">
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
                    </div>
                    <div className="messageSender">
                      <div className="chat_footer">
                        <IconButton onClick={() => setshowEmojiPannel(!showEmojiPannel)}>
                          <InsertEmoticonIcon />
                        </IconButton>
                        <form onSubmit={submitHandler}>
                          <input
                            type="text"

                            placeholder="Type a message"
                            onChange={(e) => {
                              setNewMessage(e.target.value)

                            }}
                            onFocus={() => setshowEmojiPannel(null)}
                            value={newMessage}
                          />
                          <button type="submit">Send a Message</button>
                        </form>
                        <small className="loader">
                          {send ? (
                            <CircularProgress color="primary" size="24px" />
                          ) : (
                            " "
                          )}
                        </small>
                      </div>
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
            {
              showEmojiPannel &&

              <Card className="p-0 m-0">

                <CardContent className="p-0 m-0">
                  <div className="emojipannelclose">
                    <IconButton onClick={() => setshowEmojiPannel(!showEmojiPannel)} aria-label="close" component="span">
                      <Close size="small" />
                    </IconButton>
                  </div>

                  <Picker
                    onEmojiClick={onEmojiClick} />
                </CardContent>
              </Card>

            }
          </div>
        </>

      }


    </>
  );
};

export default Messenger;
