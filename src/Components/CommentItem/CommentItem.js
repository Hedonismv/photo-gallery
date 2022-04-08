import React from 'react';

const CommentItem = ({comment}) => {

	const {createdAt} = comment;
	return (
		<div>
			<h3>Date: {new Date(createdAt).toDateString()}</h3>
			<h5>Time: {new Date(createdAt).toLocaleTimeString()}</h5>
			<p>Text: {comment.text}</p>
		</div>
	);
};

export default CommentItem;