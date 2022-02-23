import React from 'react'
import { createContext } from 'react';

import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
	token: localStorage.getItem("token") || null,
	isFetching: false,
	isAuthenticated: false,
	error: false,
	user: null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = React.useReducer(AuthReducer, INITIAL_STATE);

	//this useEffect update my user if there is any change in user state
	// useEffect(() => {
	// 	localStorage.setItem('user', JSON.stringify(state.user));
	// }, [state.user]);



	return (
		<AuthContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
