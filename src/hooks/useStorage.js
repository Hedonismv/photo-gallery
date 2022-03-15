import {useEffect, useState} from "react";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {projectStorage} from "../firebase/config";


export const useStorage = (file) => {
	const [progress, setProgress] = useState(0);
	const [error, setError] = useState(null);
	const [url, setUrl] = useState(null);

	useEffect(() => {
		const storageRef = ref(projectStorage, 'images/' + file.name);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on('state_changed', (snapshot) => {
			let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			setProgress(progress)
			console.log('Progress is:', progress)

			switch (snapshot.state) {
				case 'paused':
					console.log('Upload is paused');
					break;
				case 'running':
					console.log('Upload is running');
					break;
			}
		}, (error) => {
			setError(error)
			switch (error.code) {
				case 'storage/unauthorized':
					// User doesn't have permission to access the object
					break;
				case 'storage/canceled':
					// User canceled the upload
					break;

				// ...

				case 'storage/unknown':
					// Unknown error occurred, inspect error.serverResponse
					break;
			}
		}, () => {
			// Upload completed successfully, now we can get the download URL
			getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
				setUrl(downloadURL)
				console.log('File available at', downloadURL);
			});
		})
	}, [file])

	return {progress, error, url}
}