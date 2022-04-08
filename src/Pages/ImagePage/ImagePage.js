import React from 'react';
import {useParams} from "react-router";
import {doc} from "firebase/firestore";
import {projectFirestore} from "../../firebaseConfig/firestoreConfig";
import {useDocumentData} from "react-firebase-hooks/firestore";
import Comments from "../../Components/Comments/Comments";

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
		<div className={'container'}>
			<h1>Image Page with id: {params.id}</h1>
			<h1>Likes: {imageData.likes}</h1>
			<div>
				<Comments/>
			</div>
		</div>
	);
};

export default ImagePage;