import React from 'react';
import "./Header.css";
import { signOut} from "firebase/auth"
import {auth} from "../../firebase/config";
import {useSignInWithGoogle} from "react-firebase-hooks/auth";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../redux/actions/authActions";
import {NavLink} from "react-router-dom";

const Header = () => {
	const dispatch = useDispatch()
	const {loggedUser} = useSelector(state => state.authReducer)
	const [signInWithGoogle] = useSignInWithGoogle(auth)

	const logout = () => {
		signOut(auth);
		dispatch(logoutUser())
	}


	return (
		<div className={'header_container'}>
			<div className={'header_logo'}>
				<h1>Simple Images</h1>
			</div>
			<div className={'header_links'}>
				<NavLink to={'/information'}>Information</NavLink>
				{loggedUser &&
					<>
						<NavLink to={'/my-images'}>My Images</NavLink>
						<NavLink to={'/my-profile'}>My Profile</NavLink>
					</>
				}
			</div>
			<div className={'header_user_block'}>
				{loggedUser && <p className={'header_auth header_logout'} onClick={logout}>Logout</p>}
				{loggedUser ?
					<div className={'header_user_block_info'}>
						<p className={'header_auth'}>{loggedUser.displayName}</p>
						<img className={'header_user_avatar'} src={loggedUser.photoURL} alt={'userPhoto'}/>
					</div>
					: <p className={'header_auth'} onClick={() => signInWithGoogle()}>Login</p>
				}
			</div>
		</div>
	);
};

export default Header;