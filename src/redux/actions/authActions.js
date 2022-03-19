export const SET_USER = "SET_USER"
export const LOGOUT = "LOGOUT"

export const SET_VALUES = "SET_VALUES"






export const setUserAuth = (user) => ({type: SET_USER, payload: user})
export const logoutUser = () => ({type: LOGOUT})

export const setValues = (value) => ({type: SET_VALUES, payload: value})