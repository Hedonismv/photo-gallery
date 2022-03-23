import React from 'react';
import {BsDownload} from "react-icons/bs";
import {FcLike, FcLikePlaceholder} from "react-icons/fc";
import {AiTwotoneDelete} from 'react-icons/ai';
import {useSelector} from "react-redux";
import {updateDoc, doc, arrayRemove, arrayUnion, deleteDoc} from 'firebase/firestore'
import {projectFirestore} from "../../firebaseConfig/config.js";
import {saveAs} from 'file-saver';

const ImageCard = ({imageCard, personal}) => {

	const {loggedUser} = useSelector(state => state.authReducer)

	const imageRef = doc(projectFirestore, 'images', imageCard.id)
	const userRef = loggedUser ? doc(projectFirestore, 'users', loggedUser.id) : ''


	const downloadImage = () => {
		saveAs(imageCard.url, 'simpleImages.jpg')
	}

	const deleteImage = () => {
		deleteDoc(imageRef)
			.catch(error => console.log(error))
	}

	const handleLike = () => {

		updateDoc(imageRef, {
			likes: imageCard.likes + 1
		})
			.catch(err => console.log(err));

		updateDoc(userRef, {
			liked: arrayUnion(imageCard.id)
		})
			.catch(err => console.log(err));
	}

	const handleDislike = () => {

		updateDoc(imageRef, {
			likes: imageCard.likes - 1
		})
			.catch(err => console.log(err));

		updateDoc(userRef, {
			liked: arrayRemove(imageCard.id)
		})
			.catch(err => console.log(err));
	}


	return (
		<div className={'image_list_grid_column_object'}>
			<img src={imageCard.url} alt={'image_card'}/>
			<div className={'image_list_grid_column_object_hidden'}>
				<div className={'image_list_grid_column_object_userInfo'}>
					<img className={'header_user_avatar'} src={imageCard.authorPhotoUrl} alt={'userPhoto'}/>
					<p className={'regular'}>{imageCard.authorDisplayName}</p>
				</div>
				<div className={'image_list_grid_column_object_download'}>
					<BsDownload className={'download_icon'} onClick={downloadImage}/>
				</div>
				<div className={'image_list_grid_column_object_likes'}>
					{loggedUser ?
						loggedUser.liked.includes(imageCard.id) ?
								<FcLike className={'like_icon'} onClick={() => handleDislike()}/>
								: <FcLikePlaceholder className={'like_icon'} onClick={() => handleLike()}/>
						: null
					}
					<span className={'regular like_span'}>{imageCard.likes} Likes</span>
				</div>
				{personal ?
					<div className={'image_list_grid_column_object_delete'}>
						<AiTwotoneDelete className={'delete_icon'} onClick={deleteImage}/>
					</div>
					: null
				}
			</div>
		</div>
	);
};

export default ImageCard;