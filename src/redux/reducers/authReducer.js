import {LOGOUT, SET_USER, SET_VALUES} from "../actions/authActions";

const initialState = {
	loggedUser: null,
	isLogin: false,
	imageData: []
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
		case SET_VALUES:
			return{
				...state,
				imageData: action.payload
			}
		default:
			return state
	}
}