
import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import "./feed.css";
import { ThreeCircles } from "react-loader-spinner";
import Post from "../post/Post";
import { useContext, useState } from "react";

import axiosInstance from '../../utils/axiosConfig'
import { AuthContext } from "../../context/AuthContext";

import { Box, Typography } from '@material-ui/core';



const Feed = ({ userid, profile }) => {
  const [feedState, setFeedState] = useState({
    posts: [],
    page: 0,
    hasMore: true
  });
  // const [posts, setPosts] = useState([]);
  // const [page, setPage] = useState(0);
  const { state } = useContext(AuthContext);
  const [fetching, setfetching] = useState(false);



  const fetchPosts = () => {


    setfetching(true);
    setTimeout(async () => {

      const res = profile
        ? await axiosInstance.get("/post/profile/" + userid + `?page=${feedState.page}`)
        : await axiosInstance.get("/post/timeline/" + state?.user?._id + `?page=${feedState.page}`);
      const p = feedState.page;
      if (res.data.length === 0) {
        setFeedState(prev => {
          return {
            ...prev,
            hasMore: false
          }
        });
        return
      }
      const allpost = [...feedState.posts, ...res.data]
      console.log(allpost)
      setFeedState(prev => {
        return {
          ...prev,
          posts: allpost,
          page: p + 1
        }
      });
      console.log("after fetching data new data : ")
      console.dir(feedState)


    }, 2000);
    setfetching(false);



  };


  return (
    <div className="feed" >
      <div className="feedWrapper">
        {/* {username ? username === state.user?.username ? <Share /> : "" : <Share />} */}




        <InfiniteScroll
          key="InfiniteScroll"
          pageStart={feedState.page}
          loadMore={fetchPosts}
          hasMore={feedState.hasMore}
          loader={

            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "40px" }}>
              <ThreeCircles
                height="40"
                width="40"
                color='#0f1724'
                ariaLabel='loading' />
            </div>
          }
        >


          <div className="postList" style={profile ? { flexDirection: "row" } : { flexDirection: "column" }}>



            {feedState?.posts?.map((p, i) => (
              <Post key={p._id} post={p} isprofile={profile || false} />
            ))}

            {(feedState.hasMore === false && !profile) &&
              <Box style={feedState.posts.length === 0 ? { textAlign: 'center', width: "100%", marginTop: '19%' } : { textAlign: 'center', width: "100%" }}>

                {feedState.posts.length === 0 ?

                  <Typography variant="h4" component="div" >
                    Yay! No Post Yet
                  </Typography>

                  : <b>Yay! You have seen it all</b>
                }


              </Box>

            }

          </div>

        </InfiniteScroll>



        {
          feedState.posts.length === 0 &&
          <>


            {profile &&
              <Typography variant="h5" color="textSecondary" gutterBottom component="div" className="text-center mt-5">
                No Post Yet
              </Typography >
            }

          </>
        }




      </div >
    </div >
  );
};

export default Feed;
