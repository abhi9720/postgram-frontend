import React from 'react'
import "./message.css";

// import { format } from "timeago.js";
// import date from 'date-and-time';
import displayTimeStamp from './CustomDateTime';
const Message = ({ Message, own, img }) => {

  function fancyCount(str) {
    return Array.from(str.split(/[\ufe00-\ufe0f]/).join("")).length;
  }


  function displayMessage(text) {
    const regex = /\p{Extended_Pictographic}/ug
    let onlyEmoji = regex.test(text);


    if (onlyEmoji && (fancyCount(text) == 1)) {

      return <div className='messageText emojiBox'><p className='emojionly'>{text}</p></div>

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


          {displayMessage(Message.text.trim())}



        </div>

        <span className="messageBottom">{displayTimeStamp(Message.createdAt)}</span>

      </div>
    </>
  );
};

export default Message;
