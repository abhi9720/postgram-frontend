import React, { useContext, useEffect, useState } from "react";
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
let deferredPrompt;
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
    loadUser()
    // eslint-disable-next-line
  }, []);

  const [installable, setInstallable] = useState(false);
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      setInstallable(true);
    });

    window.addEventListener('appinstalled', () => {
      // Log install to analytics
      console.log('INSTALL: Success');
    });
  }, []);
  const handleInstallClick = (e) => {
    // Hide the app provided install promotion
    setInstallable(false);
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    });
  };

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
