import React from 'react';
import {useForm} from "react-hook-form";
import './commentAddForm.css';
import {addDoc, collection, doc} from "firebase/firestore";
import {projectFirestore} from "../../firebaseConfig/firestoreConfig";
import {useSelector} from "react-redux";
import {useParams} from "react-router";

const CommentAddForm = () => {

	const params = useParams()

	const { register, reset, handleSubmit, formState: { errors } } = useForm();

	const {loggedUser} = useSelector(state => state.authReducer)

	const commentFirestoreRef = collection(projectFirestore, 'comments')

	const addComment = (data) => {
		addDoc(commentFirestoreRef, {
			text: data.comment,
			createdAt: Date.now(),
			userRef: doc(projectFirestore, 'users', loggedUser.id),
			imageRef: doc(projectFirestore, 'images', params.id)
		})
			.catch(error => console.log(error))
			.finally( () => reset({
				comment: ''
			}));
	}


	return (
		<form onSubmit={handleSubmit(addComment)} className={'comment_add_form'}>
			<textarea
				className={'comment_add_textarea'}
				placeholder={`Write comment as @${loggedUser.displayName}`}
				{...register("comment", {required: true, max: 256, min: 10, maxLength: 256})}
			/>
			{errors.comment?.type === 'required' && <span className={'error'}>Write comment</span>}
			{errors.comment?.type === 'maxLength' && <span className={'error'}>Comment to length</span>}

			<input className={'comment_add_submit'} type="submit" value={'Send Comment'} />
		</form>
	);
};

export default CommentAddForm;