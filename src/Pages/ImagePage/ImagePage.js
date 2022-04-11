import React from 'react';
import {useParams} from "react-router";
import {doc} from "firebase/firestore";
import {projectFirestore} from "../../firebaseConfig/firestoreConfig";
import {useDocumentData} from "react-firebase-hooks/firestore";
import Comments from "../../Components/Comments/Comments";
import './imagePage.css';

const ImagePage = () => {
	const params = useParams()

	//firestore const
	const imageRef = doc(projectFirestore, 'images', params.id)

	const [imageData, loading, error] = useDocumentData(imageRef)
	console.log(imageData)

	if(error){
		return(
			<h1>{error}</h1>
		)
	}

	if(loading){
		return(
			<h1>Loading...</h1>
		)
	}

	return (
		<div className={'container adaptive_padding'}>
			<div className={'img_page_main'}>
				<div className={'image_list_grid_column'}>
					<div className={'img_page_image_object'}>
						<img src={imageData.url} alt={'image_Page'}/>
					</div>
				</div>
				<div className={'image_list_grid_column'}>
					<div className={'img_page_image_object'}>
						<div className={'img_page_author-info'}>
							<img className={'header_user_avatar'} src={imageData.authorPhotoUrl} alt={'userPhoto'}/>
							<p className={'regular'}>{imageData.authorDisplayName}</p>
						</div>
						<div className={'img_page_author_date'}>
							<span className={'grey'}>{new Date(imageData.createdAt).toLocaleDateString()}</span>
							<span className={'grey'}>{new Date(imageData.createdAt).toLocaleTimeString()}</span>
						</div>
					</div>
					<div className={'img_page_author-likes'}>
						<span>Likes: {imageData.likes}</span>
					</div>
				</div>
			</div>
			<div>
				<Comments/>
			</div>
		</div>
	);
};

export default ImagePage;