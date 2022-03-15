import React, {useContext} from 'react';
import {PaginationContext} from "../../context/PaginationContext";
import './pagination.css';

const Pagination = ({pages}) => {
	const [currentPage, setCurrentPage, totalPages, setTotalPages] = useContext(PaginationContext)


	return (
		<div className={'pagination_container'}>
			{pages.map(pg =>
				<div className={`pagination_block ${currentPage === pg ? 'current': ''}`} key={pg} onClick={() => setCurrentPage(pg) }>{pg}</div>
			)}
		</div>
	);
};

export default Pagination;