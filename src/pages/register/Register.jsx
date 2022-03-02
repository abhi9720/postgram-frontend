import "./register.css";
import { useContext, useState } from "react";
import axiosInstance from "../../utils/axiosConfig";
import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useAlert, positions } from "react-alert";
import { Checkbox, CircularProgress, FormControlLabel, TextField, Typography } from "@material-ui/core";

import { NavLink } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [field, setField] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const status = React.useRef(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const history = useHistory();
  const [loading, setloading] = useState(false);
  const alert = useAlert();
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const inputEvent = (event) => {
    const { value, name } = event.target;
    setField((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const { dispatch } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: field.username,
      email: field.email,
      password: field.password,
    };
    const confirmPassword = field.confirmPassword;

    if (user.password === "undefined" || user.password !== confirmPassword) {
      alert.error(
        <div
          style={{
            color: "red",
            whiteSpace: "pre-wrap"
          }}
        >
          Password mismatch
        </div>,
        {
          position: positions.TOP_CENTER,
          containerStyle: {
            backgroundColor: "white",
          },
        }
      );
    } else {
      try {
        setloading(true);
        const res = await axiosInstance.post("/auth/register", user);
        console.log(res);
        dispatch({ type: "REGISTER_SUCCESS", payload: res.data });

      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err });
        console.log(err);
      } finally {
        setloading(false);
      }
    }
  };

  const handleClickShowPassword = () => {
    setValues({ showPassword: !values.showPassword });
  };

  return (
    <>
      <div className="register vh-100">
        <nav className="navbar fixed-top navbar-light removedecoration">
          <div className="container-fluid">

            <div className="container-fluid">
              <div className="d-flex justify-content-between w-100 px-0 px-lg-5" >
                <NavLink className="navbar-brand" to="/" component="div">
                  <img className="postgramlogo" src={PF + "assets/Logo/logo-removebg-preview.png"} alt="" />
                </NavLink>
                {/* <IconButton component="button" size="large" color="default" href="https://github.com/abhi9720/postgram-frontend" >

                  <GitHub fontSize="large" />

                </IconButton> */}



              </div>
            </div>


          </div>
        </nav>
        <div className="registerWrapper mt-5">
          <div className="registerLeft hide-sm">
            <Typography variant="h3" gutterBottom component="div" className="registerLogo">Postgram</Typography>
            <Typography variant="h6" gutterBottom component="div" className="registerDesc">
              Connect with friends and the world around you

            </Typography>
          </div>
          <div className="registerRight">
            <form className="registerBox" onSubmit={handleSubmit}>
              <TextField
                type="text"
                id="filled-basic"
                name="username"
                variant="filled"
                onChange={inputEvent}
                value={field.username}
                required
                label="Username"
              />

              <TextField
                id="filled-email-input"
                label="Email"
                type="email"
                name="email"
                variant="filled"
                onChange={inputEvent}
                value={field.email}
                required
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
              // InputProps={{
              //   endAdornment: (
              //     <InputAdornment position="end">
              //       <IconButton
              //         onClick={handleClickShowPassword}
              //       // onMouseDown={handleMouseDownPassword}
              //       >
              //         {values.showPassword ? (
              //           <Visibility />
              //         ) : (
              //           <VisibilityOff />
              //         )}
              //       </IconButton>
              //     </InputAdornment>
              //   ),
              // }}
              />
              <TextField
                id="filled-password-input"
                label="Confirm Password"
                variant="filled"
                name="confirmPassword"
                type={values.showPassword ? "text" : "password"}
                onChange={inputEvent}
                value={field.confirmPassword}
              // InputProps={{
              //   endAdornment: (
              //     <InputAdornment position="end">
              //       <IconButton
              //         onClick={handleClickShowPassword}
              //       // onMouseDown={handleMouseDownPassword}
              //       >
              //         {values.showPassword ? (
              //           <Visibility />
              //         ) : (
              //           <VisibilityOff />
              //         )}
              //       </IconButton>
              //     </InputAdornment>
              //   ),
              // }}
              />
              {status.current && (
                <small style={{ color: "red" }}>* Password not match </small>
              )}

              <div className="w-100">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.showPassword}
                      onChange={handleClickShowPassword}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Show Password"
                />
              </div>
              <button type="submit" className="registerButton">
                {loading ? (
                  <CircularProgress color="primary" size="24px" />
                ) : (
                  "Register"
                )}
              </button>
            </form>

            <span className="registerAccount">
              Having an account ?
              <Link
                to="/login"
                style={{ textDecoration: "none" }}
                className="registerRegisterButton"
              >
                Sign In
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
