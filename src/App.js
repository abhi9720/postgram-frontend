import React, { useContext, useEffect } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import ERROR404 from "./pages/ERROR404";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messanger/Messenger";
import TimeLine from "./pages/feeds/TimeLine";
import "./app.css";
import axiosInstance from './utils/axiosConfig'
// import { useAlert } from "react-alert";
import Community from "./pages/Community/Community.jsx";
import setAuthToken from "./utils/setAuthToken";

const App = () => {
  const { state, dispatch } = useContext(AuthContext);
  console.log("isAuth : " + state.isAuthenticated);

  // const alert = useAlert();
  if (localStorage.token) {

    setAuthToken(localStorage.token);
  }


  async function loadUser() {

    if (localStorage.token) {
      setAuthToken(localStorage.token);

      try {

        dispatch({ type: "LOADING_USER" })
        const res = await axiosInstance.get("/auth");

        dispatch({
          type: "USER_LOADED",
          payload: res.data,
        });
      } catch (err) {
        dispatch({
          type: "AUTH_ERROR"
        });

        console.log(err)
      }
    }
  };


  useEffect(() => {
    // if (user && Object.entries(user).length > 0) {
    //   fetch(`/user/?userId=${user?._id}`)
    //     .then((results) => results.json())
    //     .then((res) => {
    //       dispatch({ type: "LOGIN_SUCCESS", payload: res });
    //     });
    // } else {
    //   alert.error(
    //     <div
    //       style={{
    //         color: "red",
    //         borderRadius: "15px",
    //         padding: "5px 5px",
    //       }}>
    //       Login To Continue
    //     </div>,

    //     { position: "bottom right" }
    //   );

    //   dispatch({ type: "LOGIN_FAILURE" });
    // }
    loadUser()
    // eslint-disable-next-line
  }, []);


  return (
    <>
      <BrowserRouter>

        <Switch>
          <Route exact path="/">
            {state.isAuthenticated ? <Home /> : <Login />}
          </Route>
          <Route exact path="/feeds">
            {state.isAuthenticated ? <TimeLine /> : <Login />}
          </Route>
          <Route exact path="/login">
            {state.isAuthenticated ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route exact path="/register">
            {state.isAuthenticated ? <Redirect to="/" /> : <Register />}
          </Route>
          <Route exact path="/messenger">
            {state.isAuthenticated ? <Messenger /> : <Login />}
          </Route>
          <Route exact path="/profile/:id">
            {state.isAuthenticated ? <Profile /> : <Login />}
          </Route>

          <Route exact path="/community" className="show_sm">
            {state.isAuthenticated ? <Community /> : <Login />}
          </Route>

          <Route path="*">
            <ERROR404 />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
