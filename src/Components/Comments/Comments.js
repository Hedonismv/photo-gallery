import React, {useEffect, useState} from 'react';
import CommentItem from "../CommentItem/CommentItem";
import CommentAddForm from "../CommentAddForm/CommentAddForm";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {collection} from "firebase/firestore";
import {projectFirestore} from "../../firebaseConfig/firestoreConfig";
import {useParams} from "react-router";

const Comments = () => {

	const params = useParams()

	const [comments, setComments] = useState([])

	//firestore const
	const commentsRef = collection(projectFirestore, 'comments')

	const [value, loading, error] = useCollectionData(commentsRef)
	console.log('val', value)

	const filterComments = () => {
		let comArr = value.filter(com => com.imageRef.id === params.id)
		comArr.sort((a,b) => b.createdAt - a.createdAt)
		setComments(comArr)
	}


	useEffect(() => {
		if(value){
			filterComments()
			console.log('NOT EMPTY')
		}
	},[value])

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
		<div>
			<div>
				{comments.map(comment =>
					<CommentItem comment={comment} key={comment.createdAt}/>
				)}
			</div>
			<div>
				<CommentAddForm/>
			</div>
		</div>
	);
};

export default Comments;