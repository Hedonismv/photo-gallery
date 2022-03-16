import {LOGOUT, SET_USER} from "../actions/authActions";

const initialState = {
	loggedUser: null,
	isLogin: false
}


export const authReducer = (state=initialState, action) => {
	switch (action.type){
		case SET_USER:
			return {
				...state,
				loggedUser: action.payload,
				isLogin: true
			}
		case LOGOUT:
			return{
				...state,
				loggedUser: null,
				isLogin: false
			}
		default:
			return state
	}
}