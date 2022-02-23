import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "./axiosConfig";

const { dispatch } = useContext(AuthContext);
async function findUserByToken() {
    let history = useHistory();
    try {
        dispatch({ type: "LOADING_USER" })
        const res = await axiosInstance.get("/auth");
        dispatch({
            type: "USER_LOADED",
            payload: res.data,
        });
        history.push('/');
    } catch (err) {
        console.log(err)
    }
};