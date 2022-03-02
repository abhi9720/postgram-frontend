const AuthReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN_START':

			return {
				...state,
				user: null,
				isFetching: true,
				error: false,
				token: null,
				isAuthenticated: false
			};
		case 'LOGIN_SUCCESS':
		case 'REGISTER_SUCCESS':
			localStorage.setItem("token", action.payload.token);

			return {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				isAuthenticated: true,
				isFetching: false,
				error: false,
			};
		case 'LOADING_USER':
			return {
				...state,
				isFetching: true,
			};
		case 'USER_LOADED':
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
				isFetching: false,
				error: false,
			};
		case 'LOGIN_FAILURE':
		case 'AUTH_ERROR':
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				user: null,
				isFetching: false,
				error: true,
				isAuthenticated: false,
			};
		case 'LOGOUT_SUCCESS':
			localStorage.removeItem("token");
			return {
				user: null,
				isAuthenticated: false,
				token: null,
				isFetching: false,
				error: false,
			};
		case 'FOLLOW':
			return {
				...state,
				user: {
					...state.user,
					followings: [...state.user.followings, action.payload],
				},
			};
		case 'UNFOLLOW':
			return {
				...state,
				user: {
					...state.user,
					followings: state.user.followings.filter((following) => following !== action.payload),
				},
			};
		case 'Update_Profile_Pic':
			return {
				...state,
				user: action.payload,
				isFetching: false,
				error: false,
			};
		case 'Update_Cover_Pic':
			return {
				...state,
				user: action.payload,
				isFetching: false,
				error: false,
			};
		case 'AcceptFriendRequest':

			return {
				...state,
				user: action.payload,
				isFetching: false,
				error: false,
			};
		case 'RejectFriendRequest':

			return {
				...state,
				user: action.payload,
				isFetching: false,
				error: false,
			};
		case 'UNFRIEND':
			return {
				...state,
				user: action.payload,
				isFetching: false,
				error: false,
			};
		case 'pendingRequest':

			return {
				...state,
				user: {
					...state.user,
					pendingRequest: [...state.user.pendingRequest, action.payload],
				},
			};

		// we create here one more thing update friend request
		default:
			return state;
	}
};

export default AuthReducer;
