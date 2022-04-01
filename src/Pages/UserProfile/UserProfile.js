import React from 'react';
import './userProfile.css';
import {useSelector} from "react-redux";


const UserProfile = () => {

	const {loggedUser} = useSelector(state => state.authReducer)

	return (
		<div className={'container'}>
			{loggedUser ?
				<div className={'profile_container'}>
					<h1>Hello, {loggedUser.displayName}</h1>
					<div className={'profile_counter_block'}>
						<span className={'profile_followers'}>Followers: {loggedUser.followers.length}</span>
						<span className={'profile_following'}>Following: {loggedUser.following.length}</span>
					</div>
				</div>
				: <h1>Loading...</h1>
			}
		</div>
	);
};

export default UserProfile;