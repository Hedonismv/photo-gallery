import React, {useContext, useEffect, useState} from 'react';
import {getStorage, ref, listAll, getDownloadURL, list} from "firebase/storage";
import '../gallery.css';
import {FileContext} from "../../context/FileContext";
import Pagination from "../Pagination/Pagination";
import {PaginationContext} from "../../context/PaginationContext";
import './ImageList.css';

//react-icons
import {FcLike, FcLikePlaceholder} from 'react-icons/fc';
import {BsDownload} from 'react-icons/bs'

//mock data images
import Sea from '../../testImages/glauber-sampaio-KGuljhjLRMw-unsplash.jpg';
import Wear from '../../testImages/kate-hliznitsova-pxUky4mk0FI-unsplash.jpg';
import Girl from '../../testImages/nicholas-ng-lN-fwWY2UxY-unsplash.jpg';
import NoteBook from '../../testImages/windows-aeVCU-vit3o-unsplash.jpg';
import WindowImage from '../../testImages/surface-nC35efkdYBg-unsplash.jpg';
import Car from '../../testImages/nastaran-taghipour-4O7Gfyfoo1Q-unsplash.jpg';
import {useSelector} from "react-redux";

const ImageList = () => {
	// const [files, setFiles] = useState([])
	// const [curFiles, setCurFiles] = useState([])
	// const [file] = useContext(FileContext)
	// const [pages, setPages] = useState([])
	// const [currentPage, setCurrentPage, totalPages, setTotalPages] = useContext(PaginationContext)

	const {loggedUser} = useSelector(state => state.authReducer)

	const storage = getStorage();

// Create a reference under which you want to list
// 	const listRef = ref(storage, 'images/');
//
//
// 	const changePage = () => {
// 		let second = currentPage * 6
// 		let first = second - 6
// 		const slicedFiles = curFiles.slice(first,second)
// 		setFiles(slicedFiles)
// 	}
//
// 	useEffect(() => {
// 		changePage();
// 	}, [curFiles])
//
//
// 	useEffect(() => {
// 		const fetchImages = async () => {
// 			const response = await listAll(listRef)
//
//
// 			const pages = Math.ceil(response.items.length / 6)
// 			setTotalPages(response.items.length)
// 			const pageArr = []
// 			for (let i = 1; i <= pages; i++){
// 				pageArr.push(i)
// 			}
// 			setPages(pageArr)
//
//
// 			let urlPromises = response.items.map(imageRef => getDownloadURL(imageRef))
//
// 			return Promise.all(urlPromises)
// 		}
// 		const loadImages = async () => {
// 			const urls = await fetchImages();
// 			setCurFiles(urls)
// 		}
// 		loadImages();
// 	},[file, currentPage])

// 	<div className={'gallery_container'}>
// 		{files.map(imgUrl =>
// 				<div key={imgUrl} className={'main_item_container'}>
// 					<div className={'main_item_image'}>
// 						<img className={'gallery_img'} src={imgUrl} alt={'galleryImg'}/>
// 						<a href={'/'} className={'main_image_btn btn btn_primary'}>Download</a>
// 					</div>
// 				</div>
// 			)}
// </div>

	return (
		<div className={'container adaptive_padding'}>
			<div>
				<div className={'image_list_grid'}>
					<div className={'image_list_grid_column'}>
						<div className={'image_list_grid_column_object'}>
							<img src={NoteBook} alt={'notebook'}/>
							<div className={'image_list_grid_column_object_hidden'}>
								<div className={'image_list_grid_column_object_userInfo'}>
									<img className={'header_user_avatar'} src={loggedUser.photoURL} alt={'userPhoto'}/>
									<p className={'regular'}>{loggedUser.displayName}</p>
								</div>
								<div className={'image_list_grid_column_object_download'}>
									<BsDownload className={'download_icon'}/>
								</div>
								<div className={'image_list_grid_column_object_likes'}>
									<FcLike className={'like_icon'}/>
									<span className={'regular like_span'}>13445 Likes</span>
								</div>
							</div>
						</div>
						<div>
							<img src={Car} alt={'notebook'}/>
						</div>
						<div>
							<img src={Sea} alt={'notebook'}/>
						</div>
					</div>
					<div className={'image_list_grid_column'}>
						<div>
							<img src={Girl} alt={'notebook'}/>
						</div>
						<div>
							<img src={WindowImage} alt={'notebook'}/>
						</div>
						<div>
							<img src={NoteBook} alt={'notebook 2'}/>
						</div>
					</div>
					<div className={'image_list_grid_column'}>
						<div>
							<img src={Sea} alt={'notebook'}/>
						</div>
						<div>
							<img src={Wear} alt={'notebook'}/>
						</div>
						<div>
							<img src={Girl} alt={'girl'}/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImageList;