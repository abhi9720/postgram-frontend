import React from 'react'
import "./message.css";
import { format } from "timeago.js";
const Message = ({ Message, own, img }) => {
  return (
    <>
      <div className={own ? "message own" : "message"}>
        <div
          className="messageTop"
          style={
            own ? { flexDirection: "row-reverse" } : { flexDirection: "row" }
          }
        >
          <p className="messageText">{Message.text} </p>
        </div>

        <span className="messageBottom">{format(Message.createdAt)}</span>
      </div>
    </>
  );
};

export default Message;
