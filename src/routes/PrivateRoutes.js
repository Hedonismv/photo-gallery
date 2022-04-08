import React from 'react';
import {Navigate, Route, Routes} from "react-router";
import Main from "../Pages/Main/Main";
import UserProfile from '../Pages/UserProfile/UserProfile';
import TUserProfile from "../Pages/TestUserProfile/TUserProfile";
import DirectMessages from "../Pages/DirectMessages/DirectMessages";
import ImagePage from "../Pages/ImagePage/ImagePage";

const PrivateRoutes = () => {
	return (
		<Routes>
			<Route path={'/'} element={<Main/>}/>
			<Route path={'/direct'} element={<DirectMessages/>}/>
			<Route path={'/my-profile'} element={<UserProfile/>}/>
			<Route path={'/profile/:id'} element={<TUserProfile/>}/>
			<Route path={'/image/:id'} element={<ImagePage/>}/>
			<Route path={'*'} element={<Navigate to={'/'}/>}/>
		</Routes>
	);
};

export default PrivateRoutes;