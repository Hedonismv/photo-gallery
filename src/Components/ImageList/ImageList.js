import React, { useEffect, useState} from 'react';
import '../gallery.css';
import './ImageList.css';

//react-icons
import {FcLike, FcLikePlaceholder} from 'react-icons/fc';
import {BsDownload} from 'react-icons/bs'

//mock data images
import {useDispatch} from "react-redux";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {collection} from "firebase/firestore";
import {projectFirestore} from "../../firebase/config";
import {setValues} from "../../redux/actions/authActions";

const ImageList = () => {
	// const [files, setFiles] = useState([])
	// const [curFiles, setCurFiles] = useState([])
	// const [file] = useContext(FileContext)
	// const [pages, setPages] = useState([])
	// const [currentPage, setCurrentPage, totalPages, setTotalPages] = useContext(PaginationContext)

	const [firstColumn, setFirstColumn] = useState([])
	const [secondColumn, setSecondColumn] = useState([])
	const [thirdColumn, setThirdColumn] = useState([])

	const dispatch = useDispatch()

	const [value, loading, error, snapshot] = useCollectionData(
		collection(projectFirestore, 'images')
	)
	console.log(value, loading, error, snapshot)

	const splitArray = () => {
		//find ceil number
		let stateNumber = Math.ceil(value.length / 3)
		// Take the arrays
		let firstColumn = value.slice(0, stateNumber)
		setFirstColumn(firstColumn)
		let secondColumn = value.slice(stateNumber, stateNumber*2)
		setSecondColumn(secondColumn)
		let thirdColumn = value.slice(stateNumber*2, stateNumber*3)
		setThirdColumn(thirdColumn)

		console.log(firstColumn, secondColumn, thirdColumn)
	}


	useEffect(() => {
		if(value){
			dispatch(setValues(value))
			splitArray()
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
							<div key={imageCard.url} className={'image_list_grid_column_object'}>
								<img src={imageCard.url} alt={'image_card'}/>
								<div className={'image_list_grid_column_object_hidden'}>
									<div className={'image_list_grid_column_object_userInfo'}>
										<img className={'header_user_avatar'} src={imageCard.authorPhotoUrl} alt={'userPhoto'}/>
										<p className={'regular'}>{imageCard.authorDisplayName}</p>
									</div>
									<div className={'image_list_grid_column_object_download'}>
										<BsDownload className={'download_icon'}/>
									</div>
									<div className={'image_list_grid_column_object_likes'}>
										<FcLike className={'like_icon'}/>
										<span className={'regular like_span'}>{imageCard.likes} Likes</span>
									</div>
								</div>
							</div>
						)}
					</div>
					<div className={'image_list_grid_column'}>
						{secondColumn.map(imageCard =>
							<div key={imageCard.url} className={'image_list_grid_column_object'}>
								<img src={imageCard.url} alt={'image_card'}/>
								<div className={'image_list_grid_column_object_hidden'}>
									<div className={'image_list_grid_column_object_userInfo'}>
										<img className={'header_user_avatar'} src={imageCard.authorPhotoUrl} alt={'userPhoto'}/>
										<p className={'regular'}>{imageCard.authorDisplayName}</p>
									</div>
									<div className={'image_list_grid_column_object_download'}>
										<BsDownload className={'download_icon'}/>
									</div>
									<div className={'image_list_grid_column_object_likes'}>
										<FcLike className={'like_icon'}/>
										<span className={'regular like_span'}>{imageCard.likes} Likes</span>
									</div>
								</div>
							</div>
						)}
					</div>
					<div className={'image_list_grid_column'}>
						{thirdColumn.map(imageCard =>
							<div key={imageCard.url} className={'image_list_grid_column_object'}>
								<img src={imageCard.url} alt={'image_card'}/>
								<div className={'image_list_grid_column_object_hidden'}>
									<div className={'image_list_grid_column_object_userInfo'}>
										<img className={'header_user_avatar'} src={imageCard.authorPhotoUrl} alt={'userPhoto'}/>
										<p className={'regular'}>{imageCard.authorDisplayName}</p>
									</div>
									<div className={'image_list_grid_column_object_download'}>
										<BsDownload className={'download_icon'}/>
									</div>
									<div className={'image_list_grid_column_object_likes'}>
										<FcLike className={'like_icon'}/>
										<span className={'regular like_span'}>{imageCard.likes} Likes</span>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImageList;