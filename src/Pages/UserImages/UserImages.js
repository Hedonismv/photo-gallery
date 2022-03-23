import React from 'react';
import ImageList from "../../Components/ImageList/ImageList";
import './userImages.css';

const UserImages = () => {
	return (
		<div className={'container'}>
			<div className={'personal_images_container'}>
				<ImageList personal={true}/>
			</div>
		</div>
	);
};

export default UserImages;