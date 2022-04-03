import React from 'react';
import './tUserProfile.css';
import {useDocumentData} from "react-firebase-hooks/firestore";
import {arrayRemove, arrayUnion, doc, updateDoc} from "firebase/firestore";
import {projectFirestore} from "../../firebaseConfig/firestoreConfig";
import {useParams} from "react-router";
import ImageList from "../../Components/ImageList/ImageList";
import {useSelector} from "react-redux";


const TUserProfile = () => {

	const params = useParams()

	const {loggedUser} = useSelector(state => state.authReducer)

	//Firestore const
	const profileUserRef = doc(projectFirestore, 'users', params.id)
	const loggedUserRef = loggedUser ? doc(projectFirestore, 'users', loggedUser.id) : ''


	const docRef = doc(projectFirestore, 'users', params.id)
	const [userProfileData, loading, error] = useDocumentData(docRef)
	console.log(userProfileData)


	const handleSubscribe = () => {

		updateDoc(loggedUserRef, {
			following: arrayUnion(params.id)
		})
			.catch(error => console.log(error));

		updateDoc(profileUserRef, {
			followers: arrayUnion(loggedUser.id)
		})
			.catch(error => console.log(error));
	}

	const handleUnsubscribe = () => {
		updateDoc(loggedUserRef, {
			following: arrayRemove(params.id)
		})
			.catch(error => console.log(error));

		updateDoc(profileUserRef, {
			followers: arrayRemove(loggedUser.id)
		})
			.catch(error => console.log(error));
	}


	if(loading){
		return (
			<div>
				<h1>Loading...</h1>
			</div>
		)
	}

	if(error){
		return (
			<div>
				<h1>Something went wrong, try again</h1>
			</div>
		)
	}

	return (
		<div className={'container'}>
			<div className={'user-profile_container'}>
				<div className={'user-profile_top_container'}>
					<div className={'user-profile_vis_info'}>
						<img className={'header_user_avatar'} src={userProfileData.photoURL} alt={'userPhoto'}/>
						<p className={'regular'}>{userProfileData.displayName}</p>
					</div>
					<div className={'user-profile_sub_btn-container'}>
						{loggedUser.following.includes(params.id) ?
							<button className={'user-profile-sub-btn'} onClick={handleUnsubscribe}>Unsubscribe</button>
							: <button className={'user-profile-sub-btn'} onClick={handleSubscribe}>Subscribe</button>
						}
					</div>
				</div>
				<div className={'profile_subs_container'}>
					<span className={'profile_followers'}>Followers: {userProfileData.followers.length}</span>
					<span className={'profile_following'}>Following: {userProfileData.following.length}</span>
				</div>
			</div>
			<ImageList profileView={true}/>
		</div>
	);
};

export default TUserProfile;