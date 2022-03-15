import React, {useContext, useEffect, useState} from 'react';
import {getStorage, ref, listAll, getDownloadURL, list} from "firebase/storage";
import './gallery.css';
import {FileContext} from "../context/FileContext";
import Pagination from "./Pagination/Pagination";
import {PaginationContext} from "../context/PaginationContext";


const ImageList = () => {
	const [files, setFiles] = useState([])
	const [curFiles, setCurFiles] = useState([])
	const [file] = useContext(FileContext)
	const [pages, setPages] = useState([])
	const [currentPage, setCurrentPage, totalPages, setTotalPages] = useContext(PaginationContext)


	const storage = getStorage();

// Create a reference under which you want to list
	const listRef = ref(storage, 'images/');


	const changePage = () => {
		let second = currentPage * 6
		let first = second - 6
		const slicedFiles = curFiles.slice(first,second)
		setFiles(slicedFiles)
	}

	useEffect(() => {
		changePage();
	}, [curFiles])


	useEffect(() => {
		const fetchImages = async () => {
			const response = await listAll(listRef)


			const pages = Math.ceil(response.items.length / 6)
			setTotalPages(response.items.length)
			const pageArr = []
			for (let i = 1; i <= pages; i++){
				pageArr.push(i)
			}
			setPages(pageArr)


			let urlPromises = response.items.map(imageRef => getDownloadURL(imageRef))

			return Promise.all(urlPromises)
		}
		const loadImages = async () => {
			const urls = await fetchImages();
			setCurFiles(urls)
		}
		loadImages();
	},[file, currentPage])

	return (
		<div className={'container'}>
			<h1>All images</h1>
			<div className={'gallery_container'}>
				{files.map(imgUrl =>
					<div key={imgUrl} className={'main_item_container'}>
						<div className={'main_item_image'}>
							<img className={'gallery_img'} src={imgUrl} alt={'galleryImg'}/>
							<a href={'/'} className={'main_image_btn btn btn_primary'}>Download</a>
						</div>
					</div>
				)}
			</div>
			<Pagination pages={pages} files={files}/>
		</div>
	);
};

export default ImageList;