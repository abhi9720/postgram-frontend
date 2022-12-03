import { useContext, useEffect, useState } from "react";
import "./login.css";
import React from "react";
import { NavLink } from 'react-router-dom';
import { Link } from "react-router-dom";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, IconButton, Paper, styled, TextField, Typography } from "@material-ui/core";
// import { useAlert } from "react-alert";
// import { GitHub } from "@material-ui/icons";
import CountUp from 'react-countup';
import { MutatingDots } from 'react-loader-spinner'
import axiosInstance from "../../utils/axiosConfig";




const Login = () => {

  const MyButton = styled(Typography)({
    background: '#1b263b',
    border: 0,
    color: "#41ead4",
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    marginTop: "0px",

    padding: '0 30px',
    display: "flex",

    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  });


  const [field, setField] = useState({
    email: "",
    password: "",
  });

  const [visit, setvisitCount] = useState(-1);
  useEffect(() => {
    async function getUserVisit() {

      await axiosInstance.get('visitcounter').then(result => {
        const arr = result.data;
        let sum = 0;
        arr.forEach(val => {
          sum += val.value
        })
        setvisitCount(sum)
      })

      // const arr = visitdata.data;

      // let sum = 0;
      // for (let i = 0; i < arr.length; i++) {
      //   sum += arr[i].value;
      // }

      // setvisitCount(0)
    }
    getUserVisit()

  }, []);
  //@ts-expect-error

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;


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
          <div className="d-flex vh-100 align-items-center justify-content-center">
            {/* <ReactLoading type={'bars'} color="#00e676" /> */}
            <MutatingDots height="100"
              width="100"
              color='#ff5733'
              ariaLabel='loading' />

          </div>
          :
          <div className="login vh-100 d-flex flex-column">
            <nav className="navbar fixed-top navbar-light removedecoration">
              <div className="container-fluid">
                <div className="d-flex justify-content-between w-100 px-0 px-lg-5" >
                  <NavLink className="navbar-brand" to="/" component="div">
                    <img className="postgramlogo" src={PF + "assets/Logo/logo-removebg-preview.png"} alt="" />
                  </NavLink>




                </div>
              </div>
            </nav>

            <div className="loginWrapper" >
              <div className="loginLeft hide-sm">
                <Typography variant="h3" gutterBottom component="div" className="loginLogo">Postgram</Typography>
                <Typography variant="h6" gutterBottom component="div" className="loginDesc">
                  Connect with friends and the world around you

                </Typography>
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
