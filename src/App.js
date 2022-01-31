import React, { useContext } from "react";
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
import { useAlert } from "react-alert";
import Community from "./pages/Community/Community.jsx";

const App = () => {
  const { user, dispatch } = useContext(AuthContext);
  const alert = useAlert();
  React.useEffect(() => {
    if (user && Object.entries(user).length > 0) {
      fetch(`/user/?userId=${user?._id}`)
        .then((results) => results.json())
        .then((res) => {
          dispatch({ type: "LOGIN_SUCCESS", payload: res });
        });
    } else {
      alert.error(
        <div
          style={{
            color: "red",
            borderRadius: "15px",
            padding: "5px 5px",
          }}
        >
          Login To Continue
        </div>,

        { position: "top right" }
      );

      dispatch({ type: "LOGIN_FAILURE" });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <BrowserRouter>

        <Switch>
          <Route exact path="/">
            {user ? <Home /> : <Login />}
          </Route>
          <Route exact path="/feeds">
            {user ? <TimeLine /> : <Login />}
          </Route>
          <Route exact path="/login">
            {user ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route exact path="/register">
            {user ? <Redirect to="/" /> : <Register />}
          </Route>
          <Route exact path="/messenger">
            {user ? <Messenger /> : <Login />}
          </Route>
          <Route exact path="/profile/:username">
            {user ? <Profile /> : <Login />}
          </Route>

          <Route exact path="/community" className="show_sm">
            {user ? <Community /> : <Login />}
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
