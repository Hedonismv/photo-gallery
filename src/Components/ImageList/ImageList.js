import React, { useEffect, useState} from 'react';
import '../gallery.css';
import './ImageList.css';
import {useDispatch, useSelector} from "react-redux";
import {useCollection} from "react-firebase-hooks/firestore";
import {collection} from "firebase/firestore";
import {projectFirestore} from "../../firebaseConfig/config.js";
import {setValues} from "../../redux/actions/authActions";
import ImageCard from "../ImageCard/ImageCard";

const ImageList = ({personal}) => {

	const [firstColumn, setFirstColumn] = useState([])
	const [secondColumn, setSecondColumn] = useState([])
	const [thirdColumn, setThirdColumn] = useState([])




	const dispatch = useDispatch()

	const [value, loading, error] = useCollection(
		collection(projectFirestore, 'images')
	)

	const {imageData, loggedUser} = useSelector(state => state.authReducer)


	const splitArray = () => {
		let imagesData = [];
		if(personal){
			imagesData = imageData.filter(img => img.authorId === loggedUser.uid)
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
	}

	useEffect(() => {
		if(imageData){
			splitArray()
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
		return (
			<div>
				<h1>Error</h1>
			</div>
		)
	}

	return (
		<div className={'container adaptive_padding'}>
			<div>
				<div className={'image_list_grid'}>
					<div className={'image_list_grid_column'}>
						{firstColumn.map(imageCard =>
							<ImageCard personal={personal} key={imageCard.id} imageCard={imageCard}/>
						)}
					</div>
					<div className={'image_list_grid_column'}>
						{secondColumn.map(imageCard =>
							<ImageCard personal={personal} key={imageCard.id} imageCard={imageCard}/>
						)}
					</div>
					<div className={'image_list_grid_column'}>
						{thirdColumn.map(imageCard =>
							<ImageCard personal={personal} key={imageCard.id} imageCard={imageCard}/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImageList;