import React from 'react'
import "./message.css";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
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

          <ReactMarkdown children={`${Message.text + ""}`} remarkPlugins={[remarkGfm]} className="messageText">

          </ReactMarkdown>

        </div>

        <span className="messageBottom">{displayTimeStamp(Message.createdAt)}</span>

      </div>
    </>
  );
};

export default Message;
