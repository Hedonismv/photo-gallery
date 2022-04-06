import React from 'react';
import {doc} from "firebase/firestore";
import {projectFirestore} from "../../firebaseConfig/firestoreConfig";
import {useDocumentData} from "react-firebase-hooks/firestore";
import './userListItem.css';
import {useSelector} from "react-redux";
import {handleSubscribe, handleUnsubscribe} from "../../helpers/subsHandlers";
import {Link} from "react-router-dom";

const UserListItem = ({id, setVisible}) => {

	const {loggedUser} = useSelector(state => state.authReducer)

	const profileUserRef = doc(projectFirestore, 'users', id)
	const loggedUserRef = loggedUser ? doc(projectFirestore, 'users', loggedUser.id) : ''


	const [userProfileData, loading, error] = useDocumentData(profileUserRef)


	if(loading){
		return (
			<h1>Loading...</h1>
		)
	}

	if(error){
		return (
			<h1>Something went wrong...</h1>
		)
	}

	return (
		<div className={'user_item'}>
			<Link to={`/profile/${userProfileData.id}`} onClick={() => setVisible(false)}>
				<div className={'user_list_info'}>
					<img className={'header_user_avatar'} src={userProfileData.photoURL} alt={'userPhoto'}/>
					<p className={'regular'}>{userProfileData.displayName}</p>
				</div>
			</Link>
			<div className={'user-profile_sub_btn-container'}>
				{loggedUser.id === id
					?
					null
					:
					loggedUser.following.includes(id) ?
							<button
								className={'user-profile-sub-btn'}
								onClick={() => handleUnsubscribe(loggedUserRef, profileUserRef, id, loggedUser.id)}
							>
								Unsubscribe
							</button>
							: <button
								className={'user-profile-sub-btn'}
								onClick={() => handleSubscribe(loggedUserRef, profileUserRef, id, loggedUser.id)}
							>
								Subscribe
							</button>
				}
			</div>
		</div>
	);
};

export default UserListItem;