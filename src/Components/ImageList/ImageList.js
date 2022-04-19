import React, {useCallback, useEffect, useState} from 'react';
import '../gallery.css';
import './ImageList.css';
import {useDispatch, useSelector} from "react-redux";
import {useCollection} from "react-firebase-hooks/firestore";
import {collection} from "firebase/firestore";
import {projectFirestore} from "../../firebaseConfig/firestoreConfig.js";
import {setValues} from "../../redux/actions/authActions";
import ImageCard from "../ImageCard/ImageCard";
import {useParams} from "react-router";

const ImageList = ({personalView, profileView}) => {

	const params = useParams()

	const [firstColumn, setFirstColumn] = useState([])
	const [secondColumn, setSecondColumn] = useState([])
	const [thirdColumn, setThirdColumn] = useState([])




	const dispatch = useDispatch()

	const [value, loading, error] = useCollection(
		collection(projectFirestore, 'images')
	)

	const {imageData, loggedUser} = useSelector(state => state.authReducer)


	const memoizedSplit = useCallback( () => {
		let imagesData;
		if(personalView){
			imagesData = imageData.filter(img => img.authorUID === loggedUser.uid)
		}else if(profileView){
			imagesData = imageData.filter(img => img.authorID === params.id)
		}else{
			imagesData = imageData
		}
		//find ceil number
		let stateNumber = Math.ceil(imagesData.length / 3)
		// Take the arrays
		let firstColumn = imagesData.slice(0, stateNumber)
		setFirstColumn(firstColumn)
		let secondColumn = imagesData.slice(stateNumber, stateNumber*2)
		setSecondColumn(secondColumn)
		let thirdColumn = imagesData.slice(stateNumber*2, stateNumber*3)
		setThirdColumn(thirdColumn)

		console.log(firstColumn, secondColumn, thirdColumn)
	}, [imageData])


	useEffect(() => {
		if(imageData){
			memoizedSplit()
		}
	}, [imageData])


	useEffect(() => {
		if(value){
			const values = []
			value.docs.forEach(doc => {
				let data = {
					...doc.data(),
					id: doc.id
				}
				values.push(data)
			})
			dispatch(setValues(values))
		}
	},[value, dispatch])

	if(loading){
		return (
			<div>
				<h1>Loading...</h1>
			</div>
		)
	}

	if(error){
		console.log(error)
		return (
			<div>
				<h1>{error.message}</h1>
			</div>
		)
	}

	return (
		<div className={'container adaptive_padding'}>
			{imageData.length ?
				<div>
					<div className={'image_list_grid'}>
						<div className={'image_list_grid_column'}>
							{firstColumn.map(imageCard =>
								<ImageCard personalView={personalView} key={imageCard.id} imageCard={imageCard}/>
							)}
						</div>
						<div className={'image_list_grid_column'}>
							{secondColumn.map(imageCard =>
								<ImageCard personalView={personalView} key={imageCard.id} imageCard={imageCard}/>
							)}
						</div>
						<div className={'image_list_grid_column'}>
							{thirdColumn.map(imageCard =>
								<ImageCard personalView={personalView} key={imageCard.id} imageCard={imageCard}/>
							)}
						</div>
					</div>
				</div>
				:
				<div className={'empty_image_list'}>
					<h1>Want to download some image?</h1>
				</div>
			}
		</div>
	);
};

export default ImageList;