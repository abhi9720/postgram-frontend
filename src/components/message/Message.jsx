import React from 'react'
import "./message.css";

// import { format } from "timeago.js";
// import date from 'date-and-time';
import displayTimeStamp from './CustomDateTime';
const Message = ({ Message, own, img }) => {

  function displayMessage(text) {
    const regex = /\p{Extended_Pictographic}/ug
    let onlyEmoji = regex.test(text);
    console.log(text.split(""))
    if (onlyEmoji && text.length < 8) {


      return <p className='messageText emojionly'>{text}</p>
    }
    else return <p className='messageText'>{text}</p>


  }

  return (
    <>
      <div className={own ? "message own" : "message"}>
        <div
          className="messageTop"
          style={
            own ? { flexDirection: "row-reverse" } : { flexDirection: "row" }
          }
        >


          {displayMessage(Message.text)}



        </div>

        <span className="messageBottom">{displayTimeStamp(Message.createdAt)}</span>

      </div>
    </>
  );
};

export default Message;
