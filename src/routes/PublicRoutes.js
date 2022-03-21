import React from 'react';
import {Navigate, Route, Routes} from "react-router";
import Main from "../Pages/Main/Main";


const PublicRoutes = () => {
	return (
		<Routes>
			<Route path={'/'} element={<Main/>}/>
			<Route path={'*'} element={<Navigate to={'/'}/>}/>
		</Routes>
	);
};

export default PublicRoutes;