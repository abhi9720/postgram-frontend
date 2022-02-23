import { useContext, useState } from "react";
import "./login.css";
import React from "react";
import { NavLink } from 'react-router-dom';
import { Link } from "react-router-dom";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress, TextField } from "@material-ui/core";
// import { useAlert } from "react-alert";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { MutatingDots } from 'react-loader-spinner'

const Login = () => {
  const [field, setField] = useState({
    email: "",
    password: "",
  });

  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const inputEvent = (event) => {
    const { value, name } = event.target;
    console.log(value, name);
    setField((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const { state, dispatch } = useContext(AuthContext);
  // const alert = useAlert();
  const handleClick = async (e) => {
    e.preventDefault();

    await loginCall(
      { email: field.email, password: field.password },
      dispatch
    );
  };

  const handleClickShowPassword = () => {
    setValues({ showPassword: !values.showPassword });
  };

  return (
    <>

      {
        state.isFetching ?
          <div class="d-flex vh-100 align-items-center justify-content-center">
            {/* <ReactLoading type={'bars'} color="#00e676" /> */}
            <MutatingDots height="100"
              width="100"
              color='#ff5733'
              ariaLabel='loading' />

          </div>
          :
          <div className="login vh-100">
            <nav class="navbar fixed-top navbar-light removedecoration">
              <div class="container-fluid">
                <NavLink class="navbar-brand" to="/">
                  <img className="postgramlogo" src="http://localhost:3000/assets/Postgram_LOGIN.png" alt="" />


                </NavLink>
              </div>
            </nav>

            <div className="loginWrapper">
              <div className="loginLeft">
                <h3 className="loginLogo hide-sm">Postgram</h3>
                <span className="loginDesc">
                  Connect with friends and the world around you on
                  postgram-social.herokuapp.com
                </span>
              </div>
              <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                  <TextField
                    id="filled-email-input"
                    label="Email"
                    type="email"
                    name="email"
                    variant="filled"
                    onChange={inputEvent}
                    value={field.email}
                    validators={["required", "isEmail"]}
                  />

                  <TextField
                    id="filled-password-input"
                    label="Password"
                    variant="filled"
                    required
                    name="password"
                    type={values.showPassword ? "text" : "password"}
                    onChange={inputEvent}
                    value={field.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                          // onMouseDown={handleMouseDownPassword}
                          >
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <button
                    type="submit"
                    className="loginButton"
                    disabled={state.isFetching}
                  >
                    {state.isFetching ? (
                      <CircularProgress color="primary" size="24px" />
                    ) : (
                      "Log In"
                    )}
                  </button>
                  {/* <span className="loginForget">Forgot Password</span> */}
                </form>
                <span className="registerNew">
                  Don't have an account?
                  <Link
                    to="/register"
                    style={{ textDecoration: "none" }}
                    className="loginRegisterButton"
                  >
                    Sign Up
                  </Link>
                </span>
              </div>
            </div>
          </div>

      }


    </>
  );
};

export default Login;
