
import axiosInstance from './utils/axiosConfig'

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axiosInstance.post("/auth/login", userCredential);

    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    return 200;
  } catch (err) {
    console.log(err);

    dispatch({ type: "LOGIN_FAILURE", payload: err });
    return 403;
  }
};
