import React from 'react';
import FileUploadForm from "../../Components/FileUploadForm/FileUploadForm";
import ImageList from "../../Components/ImageList/ImageList";
import {useSelector} from "react-redux";

const Main = () => {

	const {loggedUser} = useSelector(state => state.authReducer)

	return (
		<div className={'App'}>
			{loggedUser && <FileUploadForm/>}
			<ImageList/>
		</div>
	);
};

export default Main;