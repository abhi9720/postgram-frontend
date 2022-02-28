import axiosInstance from './utils/axiosConfig'

// import { useContext } from 'react';
// import setAuthToken from './utils/setAuthToken';
// import { AuthContext } from "./context/AuthContext";
// const { dispatch } = useContext(AuthContext);
// async function loadUser() {

//   if (localStorage.token) {
//     setAuthToken(localStorage.token);

//     try {
//       console.log("making request to get data by token")
//       const res = await axiosInstance.get("/auth");
//       console.log(res.data)
//       dispatch({
//         type: "USER_LOADED",
//         payload: res.data,
//       });
//     } catch (err) {
//       console.log(err)
//     }
//   }
// };

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axiosInstance.post("/auth/login", userCredential);

    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    console.log(err);

    dispatch({ type: "LOGIN_FAILURE", payload: err });

  }
};
