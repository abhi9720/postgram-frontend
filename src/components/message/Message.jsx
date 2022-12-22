import React from 'react'
import "./message.css";

// import { format } from "timeago.js";
// import date from 'date-and-time';
import displayTimeStamp from './CustomDateTime';
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

          <p className="messageText">
            {Message.text}
          </p>


        </div>

        <span className="messageBottom">{displayTimeStamp(Message.createdAt)}</span>

      </div>
    </>
  );
};

export default Message;
