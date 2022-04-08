import React from 'react';
import {Navigate, Route, Routes} from "react-router";
import Main from "../Pages/Main/Main";
import ImagePage from "../Pages/ImagePage/ImagePage";


const PublicRoutes = () => {
	return (
		<Routes>
			<Route path={'/'} element={<Main/>}/>
			<Route path={'/image/:id'} element={<ImagePage/>}/>
			<Route path={'*'} element={<Navigate to={'/'}/>}/>
		</Routes>
	);
};

export default PublicRoutes;