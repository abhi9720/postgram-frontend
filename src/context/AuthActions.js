export const LoginStart = (userCreadentials) => ({
	type: 'LOGIN_START',
});

export const LoginSuccess = (token) => ({
	type: 'LOGIN_SUCCESS',
	payload: token,
});

export const LoginFailing = (error) => ({
	type: 'LOGIN_FAILURE',
	payload: error,
});


export const follow = (userId) => ({
	type: 'FOLLOW',
	payload: userId,
});

export const unfollow = (userId) => ({
	type: 'UNFOLLOW',
	payload: userId,
});
