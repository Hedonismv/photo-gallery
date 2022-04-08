import React from 'react';
import {useForm} from "react-hook-form";
import './commentAddForm.css';
import {addDoc, collection, doc} from "firebase/firestore";
import {projectFirestore} from "../../firebaseConfig/firestoreConfig";
import {useSelector} from "react-redux";
import {useParams} from "react-router";

const CommentAddForm = () => {

	const params = useParams()

	const { register, handleSubmit, formState: { errors } } = useForm();

	const {loggedUser} = useSelector(state => state.authReducer)

	const commentFirestoreRef = collection(projectFirestore, 'comments')

	const addComment = (data) => {
		addDoc(commentFirestoreRef, {
			text: data.comment,
			createdAt: Date.now(),
			userRef: doc(projectFirestore, 'users', loggedUser.id),
			imageRef: doc(projectFirestore, 'images', params.id)
		})
			.catch(error => console.log(error));
	}


	return (
		<form onSubmit={handleSubmit(addComment)}>
			<textarea className={'comment_add_textarea'} {...register("comment", {required: true, max: 256, min: 10, maxLength: 256})} />

			<input type="submit" />
		</form>
	);
};

export default CommentAddForm;