const AuthReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN_START':
			return {
				user: null,
				isFetching: true,
				error: false,
			};
		case 'LOGIN_SUCCESS':
			return {
				user: action.payload,
				isFetching: false,
				error: false,
			};
		case 'LOGIN_FAILURE':
			return {
				user: null,
				isFetching: false,
				error: true,
			};
		case 'LOGOUT_SUCCESS':
			return {
				user: action.payload,
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
				user: action.payload,
				isFetching: false,
				error: false,
			};
		case 'Update_Cover_Pic':
			return {
				user: action.payload,
				isFetching: false,
				error: false,
			};
		case 'AcceptFriendRequest':
			
			return {
				user: action.payload,
				isFetching: false,
				error: false,
			};
		case 'RejectFriendRequest':
			
			return {
				user: action.payload,
				isFetching: false,
				error: false,
			};
		case 'UNFRIEND':
			return {
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
