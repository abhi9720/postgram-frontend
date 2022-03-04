import './topbar.css';
import React, { useRef } from 'react';
import { Chat, ExitToAppOutlined, CancelOutlined, AddBoxOutlined, HomeSharp, PersonOutlined } from '@material-ui/icons';
import Share from "../share/Share";
import { NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import { io } from 'socket.io-client';
import FriendRequest from '../FriendRequest/FriendRequest';
// import { Fab } from '@material-ui/core';
import Sidebar from '../sidebar/Sidebar';




const Topbar = () => {
  const { state, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const socket = React.useRef();

  const [friendRequest, setFriendRequest] = useState([]);
  useEffect(() => {
    state.user && setFriendRequest([...state.user?.friendrequest]);
  }, [state.user]);

  useEffect(() => {
    socket.current = io.connect(process.env.REACT_APP_End_Point);

    socket.current.on('getFriendRequest', (data) => {
      setFriendRequest((prev) => {
        return [...prev, data.senderId];
      });
      dispatch({ type: 'FriendRequest', payload: friendRequest });
    });
  }, [dispatch, friendRequest]);
  // console.log(state.user);
  // console.log(state.user?.friendrequest.length);
  useEffect(() => {
    socket.current.emit('addUser', state.user._id);
  });

  const logout = () => {
    try {
      dispatch({ type: 'LOGOUT_SUCCESS', payload: null });
    } catch (err) {
      console.log(err);
    }
  };
  const [showfriendReq, setshowfriendReq] = useState(false);
  const [dropdownMenu, setdropdownMenu] = useState(false);
  const inputRef = useRef();

  const showFriendRequest = () => {
    setshowfriendReq(!showfriendReq);
    setdropdownMenu(!dropdownMenu);

    inputRef.current.focus();
  };

  return (
    <>



      {/* Navbar*/}
      <nav className="navbar navbar-expand-lg navbar-light fixed-top customnav p-2" style={{ backgroundColor: '#fff' }}>
        <div className="container">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            {/* Left elements */}
            <div className="d-flex align-items-center">
              {/* Brand */}
              <NavLink className="navbar-brand m-0" to="/">
                <img className="logolg d-none d-md-block" src={PF + "assets/Logo/logo-removebg-preview.png"} alt="" />
                <img className="logosm d-block d-md-none d-lg-none" src={PF + "assets/Logo/smalllogo192x192.png"} alt="" />
              </NavLink>


            </div>
            {/* Left elements */}


            {/* Center elements */}
            <ul className="navbar-nav flex-row w-sm-90" >

              <Sidebar />

              <li className="logout me-auto d-block d-md-none">
                <span className="topbarNavLink">
                  <NavLink to="/login" onClick={logout}>
                    <IconButton>
                      <ExitToAppOutlined className='iconstyle' />
                    </IconButton>
                  </NavLink>
                </span>
              </li>

            </ul>
            {/* Center elements */}


            {/* Right elements */}
            <ul className="navbar-nav flex-row justify-content-around m-0 d-none d-md-flex">


              <li className='nav-item  active'>
                <NavLink to="/">
                  <span className="topbarNavLink">
                    <IconButton>
                      <HomeSharp className="iconstyle" />
                    </IconButton>
                  </span>
                </NavLink>
              </li>
              <li className='nav-item me-3 me-lg-1 active'>
                <NavLink to="/messenger">
                  <span className="topbarNavLink">
                    <IconButton>
                      <Chat className="iconstyle" />
                    </IconButton>
                  </span>
                </NavLink>

              </li>

              <li className='nav-item'>
                <span className="topbarNavLink">

                  <IconButton data-mdb-toggle="modal" data-mdb-target="#exampleModal">
                    {/* <i className="fas fa-plus-square iconstyle"></i>
                     */}
                    <AddBoxOutlined className='iconstyle' />
                  </IconButton>
                </span>
              </li>

              {/* <li className='nav-item me-3 me-lg-1 active'>
                <NavLink
                  to="/community"
                  className=""
                
                >
                  <span className="topbarNavLink">
                    <IconButton>
                      <People className="iconstyle" />{' '}
                    </IconButton>
                  </span>
                </NavLink>
              </li> */}


              <li className='nav-item  active'>
                <div className="topbarIconItem">
                  <Tooltip title="Friend Request">
                    <IconButton aria-label="delete" onClick={showFriendRequest}>
                      <PersonOutlined className="iconstyle" />
                      <div className="topbarIconBadge">
                        {friendRequest?.length}
                      </div>
                    </IconButton>
                  </Tooltip>
                </div>
              </li>

              <li style={{ marginTop: "1px" }}>
                <NavLink to={`/profile/${state.user?._id}`}>
                  <Avatar
                    alt={state.user.username}
                    src={
                      state.user.profilePicture
                        ? state.user.profilePicture
                        : PF + 'person/noAvatar.png'
                    }
                  />

                </NavLink>
              </li>

              <li className='nav-item me-3 me-lg-1 active'>

                <div className="topbarRight" >
                  <div className="topbarIcons">

                    <div className='card requestcard' tabIndex="-1" ref={inputRef}>
                      {dropdownMenu && (
                        <div className="displayFriendRequest">
                          {friendRequest.length ? (
                            friendRequest.map((u) => <FriendRequest key={u} id={u} />)
                          ) : (
                            <p className="norequest"> No Friend's Request </p>
                          )}
                        </div>
                      )}
                    </div>

                  </div>


                </div>
              </li>


              <li className="logout me-auto">
                <span className="topbarNavLink">
                  <NavLink to="/login" onClick={logout}>
                    <IconButton>
                      <ExitToAppOutlined className='iconstyle' />
                    </IconButton>
                  </NavLink>
                </span>
              </li>
            </ul>



            {/* Right elements */}
          </div>
        </div>
      </nav>
      {/* Navbar */}



      {/* ------------------------------------------------------------------------------------------------- */}

      {/* // nvabar for smaller screen */}
      <nav className="navbar navbar-expand-lg navbar-light fixed-bottom p-0 m-0 d-block d-md-none d-lg-none" style={{ backgroundColor: '#fff' }}>
        <div className="container">
          <div className="container-fluid justify-content-between">
            {/* Right elements */}
            <ul className="navbar-nav flex-row justify-content-around w-100 m-0">


              {/* home button */}
              <li className='nav-item'>
                <NavLink to="/">
                  <span className="topbarNavLink">
                    <IconButton>
                      <HomeSharp className="iconstyle" />
                    </IconButton>
                  </span>
                </NavLink>
              </li>

              {/* chat icon */}
              <li className='nav-item'>
                <NavLink to="/messenger">
                  <span className="topbarNavLink">
                    <IconButton>
                      <Chat className="iconstyle" />
                    </IconButton>
                  </span>
                </NavLink>

              </li>

              {/* add post */}
              <li className='nav-item bnmainbtn'>
                <span className="topbarNavLink">

                  <IconButton color="primary" data-mdb-toggle="modal" data-mdb-target="#exampleModal" variant="contained">
                    {/* <i className="fas fa-plus-square iconstyle"></i>
       */}
                    <AddBoxOutlined style={{ color: "#0072E5" }} />
                  </IconButton>
                </span>
              </li>




              {/* friend request icon */}
              <li className='nav-item'>
                <div className="topbarIconItem">
                  <Tooltip title="Friend Request">
                    {/* onClick={showFriendRequest} */}
                    <IconButton type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" >
                      <PersonOutlined className="iconstyle" />
                      <div className="topbarIconBadge">
                        {friendRequest?.length}
                      </div>
                    </IconButton>
                  </Tooltip>
                </div>
              </li>

              <li style={{ marginTop: "5px" }}>
                <NavLink to={`/profile/${state.user._id}`}>

                  <Avatar
                    alt={state.user.username}
                    src={
                      state.user.profilePicture
                        ? state.user.profilePicture
                        : PF + 'person/noAvatar.png'
                    }
                  />

                </NavLink>
              </li>






              <li className="logout d-none">
                <span className="topbarNavLink">
                  <NavLink to="/login" onClick={logout}>
                    <IconButton>
                      <ExitToAppOutlined className='iconstyle' />
                    </IconButton>
                  </NavLink>
                </span>
              </li>
            </ul>
            {/* Right elements */}
          </div>
        </div>
      </nav>


      {/* // add post */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add Post</h5>
            </div>




            <Share />



          </div>
        </div>
      </div>





      <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel" style={{ zIndex: 1000000 }}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Connection Requests</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          {friendRequest.length ? (
            friendRequest.map((u) => <FriendRequest key={u} id={u} />)
          ) : (
            <p className="norequest"> No Friend's Request </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Topbar;
