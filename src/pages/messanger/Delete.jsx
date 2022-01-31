import React from "react";

const Delete = () => {
  return (
    <div>
      <div className="sideBar">
        <div className="sideBarWrapper">
          <div className="sideBarSearch">
            {/* <div className="searchBarWrapper">
                <Search />
                <input type="text" placeholder="Search for a friend .  .  ." />
              </div> */}
          </div>
          <div className="usersList">
            {conversations.map((data) => {
              return (
                <div key={data._id} onClick={() => setCurrentChat(data)}>
                  <Conversation
                    key={data._id}
                    conversation={data}
                    currentuser={currentUser}
                    Online={onlineUsers}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delete;
