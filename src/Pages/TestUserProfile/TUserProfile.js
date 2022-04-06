import React, {useEffect, useState} from 'react';
import './tUserProfile.css';
import {useDocumentData} from "react-firebase-hooks/firestore";
import {doc} from "firebase/firestore";
import {projectFirestore} from "../../firebaseConfig/firestoreConfig";
import {useParams} from "react-router";
import ImageList from "../../Components/ImageList/ImageList";
import {useSelector} from "react-redux";
import UsersList from "../../Components/UsersList/UsersList";
import {handleUnsubscribe, handleSubscribe} from "../../helpers/subsHandlers";


const TUserProfile = () => {

	const params = useParams()

	const {loggedUser} = useSelector(state => state.authReducer)

	const [visible, setVisible] = useState(false)
	const [setting, setSetting] = useState("")

	const [profileView, setProfileView] = useState(false)
	const [personalView, setPersonalView] = useState(false)

	//Firestore const
	const profileUserRef = doc(projectFirestore, 'users', params.id)
	const loggedUserRef = loggedUser ? doc(projectFirestore, 'users', loggedUser.id) : ''


	const [userProfileData, loading, error] = useDocumentData(profileUserRef)
	console.log(userProfileData)

	const handleVisible = (setting) => {
		setSetting(setting)
		setVisible(true)
	}


	useEffect(() => {
		if(params.id === loggedUser.id){
			setPersonalView(true)
			setProfileView(false)
		}else{
			setPersonalView(false)
			setProfileView(true)
		}
	},[params, loggedUser])

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
			{visible ? <UsersList usrData={userProfileData} setting={setting} setVisible={setVisible}/> : null}
			<div className={'user-profile_container'}>
				<div className={'user-profile_top_container'}>
					<div className={'user-profile_vis_info'}>
						<img className={'header_user_avatar'} src={userProfileData.photoURL} alt={'userPhoto'}/>
						<p className={'regular'}>{userProfileData.displayName}</p>
					</div>
					<div className={'user-profile_sub_btn-container'}>
						{params.id === loggedUser.id
							?
							null
							:
							loggedUser.following.includes(params.id) ?
									<button
										className={'user-profile-sub-btn'}
										onClick={() => handleUnsubscribe(loggedUserRef,profileUserRef, params.id, loggedUser.id)}
									>
										Unsubscribe
									</button>
									: <button
										className={'user-profile-sub-btn'}
										onClick={() => handleSubscribe(loggedUserRef,profileUserRef, params.id, loggedUser.id)}
									>
										Subscribe
									</button>
						}
					</div>
				</div>
				<div className={'profile_subs_container'}>
					<span className={'profile_followers'} onClick={() => handleVisible("followers")}>Followers: {userProfileData.followers.length}</span>
					<span className={'profile_following'} onClick={() => handleVisible("following")}>Following: {userProfileData.following.length}</span>
				</div>
			</div>
			<ImageList profileView={profileView} personalView={personalView}/>
		</div>
	);
};

export default TUserProfile;