
import React from 'react'
import axiosInstance from '../../utils/axiosConfig'

import { useEffect, useState } from 'react';
import './conversation.css';
import ContentLoader from 'react-content-loader';

export default function Conversation({ conversation, currentuser, Online, ChatOpen }) {
  const [user, setUser] = useState(null);
  const [loading, setIsloading] = useState(false);

  const Loader = () => {
    return (
      <div style={{ marginBottom: '30px' }}>
        <ContentLoader
          speed={2}
          width={183}
          height={60}
          viewBox="0 0 143 60"
          backgroundColor="#ddd9d9"
          foregroundColor="#bebbbb"
        >
          <circle cx="20" cy="20" r="20" />
          <rect x="48" y="8" rx="3" ry="3" width="120" height="15" />
        </ContentLoader>
      </div>
    );
  };

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentuser._id);

    const getUser = async () => {
      try {
        setIsloading(true);
        const res = await axiosInstance('/user?userId=' + friendId);
        setUser(res.data);

      } catch (err) {
        console.log(err);
      } finally {
        setIsloading(false);
      }
    };
    getUser();
  }, [currentuser, conversation]);


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={(ChatOpen?._id === user?._id) ? "conversation activeconversation" : "conversation"} >
            <div className="ConversationUser">
              <img
                loading="lazy"
                className="conversationImg"
                src={
                  user?.profilePicture
                    ? user.profilePicture.replace(
                      '/upload',
                      '/upload/w_230,h_250'
                    )
                    : './assets/person/noAvatar.png'
                }
                alt=""
              />

              {Online?.includes(user?._id) && (
                <span className="rightbarOnline"> </span>
              )}
            </div>
            <span className="conversationName">{user?.username}</span>
          </div>
        </>
      )}
    </>
  );
}
