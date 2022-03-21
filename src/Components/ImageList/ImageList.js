import React, { useEffect, useState} from 'react';
import '../gallery.css';
import './ImageList.css';

//react-icons
import {FcLike, FcLikePlaceholder} from 'react-icons/fc';
import {BsDownload} from 'react-icons/bs'

//mock data images
import {useDispatch, useSelector} from "react-redux";
import {useCollection, useCollectionData} from "react-firebase-hooks/firestore";
import {collection} from "firebase/firestore";
import {projectFirestore} from "../../firebase/config";
import {setValues} from "../../redux/actions/authActions";
import ImageCard from "../ImageCard/ImageCard";

const ImageList = () => {

	const [firstColumn, setFirstColumn] = useState([])
	const [secondColumn, setSecondColumn] = useState([])
	const [thirdColumn, setThirdColumn] = useState([])




	const dispatch = useDispatch()

	// const [value, loading, error, snapshot] = useCollectionData(
	// 	collection(projectFirestore, 'images')
	// )
	// console.log(value, loading, error, snapshot)
	const [value, loading, error] = useCollection(
		collection(projectFirestore, 'images')
	)

	const {imageData} = useSelector(state => state.authReducer)


	const splitArray = () => {
		//find ceil number
		let stateNumber = Math.ceil(imageData.length / 3)
		// Take the arrays
		let firstColumn = imageData.slice(0, stateNumber)
		setFirstColumn(firstColumn)
		let secondColumn = imageData.slice(stateNumber, stateNumber*2)
		setSecondColumn(secondColumn)
		let thirdColumn = imageData.slice(stateNumber*2, stateNumber*3)
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
							<ImageCard key={imageCard.id} imageCard={imageCard}/>
						)}
					</div>
					<div className={'image_list_grid_column'}>
						{secondColumn.map(imageCard =>
							<ImageCard key={imageCard.id} imageCard={imageCard}/>
						)}
					</div>
					<div className={'image_list_grid_column'}>
						{thirdColumn.map(imageCard =>
							<ImageCard key={imageCard.id} imageCard={imageCard}/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImageList;