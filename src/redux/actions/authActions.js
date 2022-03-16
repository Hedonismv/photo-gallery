export const SET_USER = "SET_USER"
export const LOGOUT = "LOGOUT"






export const setUserAuth = (user) => ({type: SET_USER, payload: user})
export const logoutUser = () => ({type: LOGOUT})