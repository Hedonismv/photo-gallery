import React from 'react';
import './commentItem.css';
import {useDocumentDataOnce} from "react-firebase-hooks/firestore";

const CommentItem = ({comment}) => {

	const {createdAt, text, userRef} = comment;

	//Firestore const
	const [userData, loading, error] = useDocumentDataOnce(userRef)
	console.log(userData)

	if(error){
		return(
			<h1>{error}</h1>
		)
	}

	if(loading){
		return (
			<h1>Loading...</h1>
		)
	}

	return (
		<div className={'comment_main'}>
			<div className={'comment_info'}>
				<div className={'comment_info_avatar'}>
					<img className={'header_user_avatar'} src={userData.photoURL} alt={'userPhoto'}/>
				</div>
				<div className={'comment_info_text'}>
					<span className={'regular'}>{userData.displayName}</span>
					<div className={'comment_info_date'}>
						<span className={'grey'}>{new Date(createdAt).toLocaleDateString()}</span>
						<span className={'grey'}>{new Date(createdAt).toLocaleTimeString()}</span>
					</div>
				</div>
			</div>
			<div className={'comment_text'}>
				<div className={'comment_text_main'}>
					{text}
				</div>
			</div>
			<div className={'comment_functions'}>
				<span>D</span>
			</div>
		</div>
	);
};

export default CommentItem;