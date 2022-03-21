import React from 'react';
import {BsDownload} from "react-icons/bs";
import {FcLike, FcLikePlaceholder} from "react-icons/fc";
import {useSelector} from "react-redux";
import {collection, updateDoc} from 'firebase/firestore'
import {projectFirestore} from "../../firebase/config";

const ImageCard = ({imageCard}) => {

	const {loggedUser} = useSelector(state => state.authReducer)
	const userFirestoreRef = collection(projectFirestore, 'users')

	const handleLike = () => {

	}

	const handleDislike = () => {

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
					<BsDownload className={'download_icon'}/>
				</div>
				<div className={'image_list_grid_column_object_likes'}>
					{loggedUser.liked.includes(imageCard.imageId) ?
						<FcLike className={'like_icon'} onClick={() => handleDislike()}/>
						: <FcLikePlaceholder className={'like_icon'} onClick={() => handleLike()}/>
					}
					<span className={'regular like_span'}>{imageCard.likes} Likes</span>
				</div>
			</div>
		</div>
	);
};

export default ImageCard;