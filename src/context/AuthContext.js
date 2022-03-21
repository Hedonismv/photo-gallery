import React, {useContext, useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth'

export const AuthContext = React.createContext()


export const AuthContextProvider = props => {
	const [user, setUser] = useState()
	const [error, setError] = useState()

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError)
		return () => unsubscribe()
	},[])

	return <AuthContext.Provider value={{}} {...props} />
}

export const useAuthState = () => {
	const auth = useContext(AuthContext)
	return {...auth, isAuthenticated: auth.user !== null}
}