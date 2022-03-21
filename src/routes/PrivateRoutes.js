import React from 'react';
import {Navigate, Route, Routes} from "react-router";
import Main from "../Pages/Main/Main";
import UserImages from "../Pages/UserImages/UserImages";

const PrivateRoutes = () => {
	return (
		<Routes>
			<Route path={'/'} element={<Main/>}/>
			<Route path={'/images'} element={<UserImages/>}/>
			<Route path={'*'} element={<Navigate to={'/'}/>}/>
		</Routes>
	);
};

export default PrivateRoutes;