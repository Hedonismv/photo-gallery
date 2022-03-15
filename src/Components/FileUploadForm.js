import React, {useContext, useState} from 'react';
import ProgressBar from "./ProgressBar";
import {FileContext} from "../context/FileContext";
import {AiOutlinePlusCircle} from 'react-icons/ai'

const FileUploadForm = () => {
	// const [file, setFile] = useState(null)
	const [file, setFile] = useContext(FileContext)
	const [isError, setIsError] = useState(null)

	const types = ['image/png', 'image/jpeg'];

	const changeHandler = (e) =>{
		let selected = e.target.files[0]
		console.log(selected.type)

		if(selected && types.includes(selected.type)){
			setIsError(null)
			console.log(selected)
			setFile(selected)
		}else{
			setFile(null)
			setIsError('Select IMAGE with a PNG or JPEG/JPG format')
		}
	}

	return (
		<form>
			<label htmlFor={'upload'}>
				<input id={'upload'} hidden type={'file'} onChange={(e) => changeHandler(e)}/>
				<span><AiOutlinePlusCircle className={'file_upload_input'}/></span>
			</label>
			{isError && <div className={'error'}>{isError}</div>}
			{file && <div>{file.name}</div>}
			{file && <ProgressBar file={file} setFile={setFile}/>}
		</form>
	);
};

export default FileUploadForm;