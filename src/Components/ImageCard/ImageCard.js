import React from 'react';
import {BsDownload} from "react-icons/bs";
import {FcLike, FcLikePlaceholder} from "react-icons/fc";
import {AiTwotoneDelete} from 'react-icons/ai';
import {useSelector} from "react-redux";
import {updateDoc, doc, arrayRemove, arrayUnion, deleteDoc} from 'firebase/firestore'
import {projectFirestore} from "../../firebaseConfig/firestoreConfig.js";
import {saveAs} from 'file-saver';
import {useNavigate} from "react-router";

const ImageCard = ({imageCard, personalView}) => {

	const navigate = useNavigate()

	const {loggedUser} = useSelector(state => state.authReducer)

	const imageRef = doc(projectFirestore, 'images', imageCard.id)
	const userRef = loggedUser ? doc(projectFirestore, 'users', loggedUser.id) : ''


	const downloadImage = (event) => {
		event.stopPropagation()
		saveAs(imageCard.url, 'simpleImages.jpg')
	}

	const deleteImage = (event) => {
		event.stopPropagation()
		deleteDoc(imageRef)
			.catch(error => console.log(error))
	}

	const handleLike = (event) => {
		event.stopPropagation()
		updateDoc(imageRef, {
			likes: imageCard.likes + 1
		})
			.catch(err => console.log(err));

		updateDoc(userRef, {
			liked: arrayUnion(imageCard.id)
		})
			.catch(err => console.log(err));
	}

	const handleDislike = (event) => {
		event.stopPropagation()
		updateDoc(imageRef, {
			likes: imageCard.likes - 1
		})
			.catch(err => console.log(err));

		updateDoc(userRef, {
			liked: arrayRemove(imageCard.id)
		})
			.catch(err => console.log(err));
	}

	const handlePageSwitch = (event, image) => {
		event.stopPropagation()
		if(image){
			navigate(`image/${imageCard.id}`)
		}else{
			navigate(`profile/${imageCard.authorID}`)
		}
	}


	return (
		<div className={'image_list_grid_column_object'} onClick={(event) => handlePageSwitch(event, true)}>
			<img src={imageCard.url} alt={'image_card'}/>
			<div className={'image_list_grid_column_object_hidden'}>
				<div onClick={(event) => handlePageSwitch(event, false)}>
					<div className={'image_list_grid_column_object_userInfo'}>
						<img className={'header_user_avatar'} src={imageCard.authorPhotoUrl} alt={'userPhoto'}/>
						<p className={'regular'}>{imageCard.authorDisplayName}</p>
					</div>
				</div>
				<div className={'image_list_grid_column_object_download'}>
					<BsDownload className={'download_icon'} onClick={(event) => downloadImage(event)}/>
				</div>
				<div className={'image_list_grid_column_object_likes'}>
					{loggedUser ?
						loggedUser.liked.includes(imageCard.id) ?
								<FcLike className={'like_icon'} onClick={(event) => handleDislike(event)}/>
								: <FcLikePlaceholder className={'like_icon'} onClick={(event) => handleLike(event)}/>
						: null
					}
					<span className={'regular like_span'}>{imageCard.likes} Likes</span>
				</div>
				{personalView ?
					<div className={'image_list_grid_column_object_delete'}>
						<AiTwotoneDelete className={'delete_icon'} onClick={(event) => deleteImage(event)}/>
					</div>
					: null
				}
			</div>
		</div>
	);
};

export default ImageCard;