import React from 'react';
import "./Header.css";
import { signOut} from "firebase/auth"
import {auth} from "../../firebase/config";
import {useSignInWithGoogle} from "react-firebase-hooks/auth";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../redux/actions/authActions";

const Header = () => {
	const dispatch = useDispatch()
	const {loggedUser} = useSelector(state => state.authReducer)
	const [signInWithGoogle] = useSignInWithGoogle(auth)



	// const signInWithGoogle = () => {
	// 	signInWithPopup(auth, provider)
	// 		.then((result) => {
	// 			// This gives you a Google Access Token. You can use it to access the Google API.
	// 			const credential = GoogleAuthProvider.credentialFromResult(result);
	// 			const token = credential.accessToken;
	// 			// The signed-in user info.
	// 			const user = result.user;
	// 			console.log(user, token)
	// 		}).catch((error) => {
	// 		// Handle Errors here.
	// 		const errorCode = error.code;
	// 		const errorMessage = error.message;
	// 		// The email of the user's account used.
	// 		const email = error.email;
	// 		// The AuthCredential type that was used.
	// 		const credential = GoogleAuthProvider.credentialFromError(error);
	// 		// ...
	// 	});
	// }

	const logout = () => {
		signOut(auth);
		dispatch(logoutUser())
	}


	return (
		<div className={'header_container'}>
			<div>
				{loggedUser ?
					<p className={'header_auth'}>Welcome {loggedUser.displayName}</p>
					: <p className={'header_auth'} onClick={() => signInWithGoogle()}>Login</p>
				}
				{loggedUser && <p className={'header_auth'} onClick={logout}>Logout</p>}
			</div>
		</div>
	);
};

export default Header;