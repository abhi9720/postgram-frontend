import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';

const Community = () => {
  return (
    <>
      <Topbar />
      <div className="container">
        <div className="row">
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default Community;
