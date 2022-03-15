import React, {useEffect} from 'react';
import {useStorage} from "../hooks/useStorage";

const ProgressBar = ({file, setFile}) => {
	const { url, progress, error} = useStorage(file)
	console.log(url)

	useEffect(() => {
		if(url){
			setFile(null)
		}
	},[url])


	return (
		<div>
			<div className={'progress_bar'} style={{width: progress + '%'}}/>
			{error && <div className={'error'}>{error}</div>}
		</div>
	);
};

export default ProgressBar;