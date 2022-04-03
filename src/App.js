import './App.css';
import React from "react";
import Header from "./Components/Header/Header";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection} from 'react-firebase-hooks/firestore'
import {auth, projectFirestore} from './firebaseConfig/firestoreConfig.js';
import {BrowserRouter} from "react-router-dom";
import {FileContext} from "./context/FileContext";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setUserAuth} from "./redux/actions/authActions";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import {collection, doc, updateDoc} from "firebase/firestore";


function App() {

	const dispatch = useDispatch()
	const [file, setFile] = useState(null)


	const [user, loading, error] = useAuthState(auth)
	const [value] = useCollection(collection(projectFirestore, 'users'))

	useEffect(() => {
		if(user && value){
			console.log(user)
			console.log('value Tot samy',value.empty)
			if(!value.empty){
				const values = []
				value.docs.forEach(doc => {
					let data = {
						...doc.data(),
						id: doc.id
					}
					values.push(data)
				})
				const dbUser = values.find(usr => usr.uid === user.uid)
				console.log('DBUSER', dbUser)
				if (dbUser){
					const dbUserRef = doc(projectFirestore, 'users', dbUser.id)
					updateDoc(dbUserRef, {
						id: dbUser.id
					})
						.catch(error => console.log(error));
					const readyData = {
						...user,
						liked: dbUser.liked,
						id: dbUser.id,
						followers: dbUser.followers,
						following: dbUser.following
					}
					console.log('ReadyData', readyData)
					dispatch(setUserAuth(readyData))
				}
			}
		}
	},[user, dispatch, value])

	if(loading){
		return (
			<div>
				<h1>Loading......</h1>
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
		<FileContext.Provider value={[file, setFile]}>
			<BrowserRouter>
				<Header/>
				{user ? <PrivateRoutes/> : <PublicRoutes/>}
			</BrowserRouter>
		</FileContext.Provider>
	);
}

export default App;
