import React, {useEffect} from 'react';
import "./Header.css";
import { signOut} from "firebase/auth"
import {auth, projectFirestore, userFirestoreRef} from "../../firebaseConfig/config.js";
import {useSignInWithGoogle} from "react-firebase-hooks/auth";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../redux/actions/authActions";
import {NavLink} from "react-router-dom";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {addDoc, collection} from "firebase/firestore";

const Header = () => {
	const dispatch = useDispatch()
	const {loggedUser} = useSelector(state => state.authReducer)
	const [signInWithGoogle, user] = useSignInWithGoogle(auth)

	const [value] = useCollectionData(
		collection(projectFirestore, 'users')
	)
	const loginAndSetUser = () => {
		const bool = value.find(usr => usr.uid === user.user.uid)
		console.log('BOOL', bool)
		if(bool){
			console.log('user uid', user.user.uid)
			console.log('value', value)
		}else{
			console.log('working here', user.user.displayName)
			addDoc(userFirestoreRef, {
				uid: user.user.uid,
				email: user.user.email,
				displayName: user.user.displayName,
				photoURL: user.user.photoURL,
				followers: [],
				following: [],
				liked: []
			})
				.then(res => {
					console.log(res)
				})
				.catch(err => {
					console.log(err)
				})
		}
	}

	const logout = () => {
		signOut(auth);
		dispatch(logoutUser())
	}

	useEffect(() => {
		if(user){
			loginAndSetUser()
		}
	},[user])

	return (
		<div className={'header_container'}>
			<div className={'header_logo'}>
				<h1><NavLink to={'/'}>Simple Images</NavLink></h1>
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