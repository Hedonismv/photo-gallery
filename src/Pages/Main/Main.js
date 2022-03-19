import React from 'react';
import FileUploadForm from "../../Components/FileUploadForm/FileUploadForm";
import ImageList from "../../Components/ImageList/ImageList";

const Main = () => {
	return (
		<div className={'App'}>
			<FileUploadForm/>
			<ImageList/>
		</div>
	);
};

export default Main;