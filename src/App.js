import './App.css';
import Header from "./Components/Header/Header";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection, useCollectionData} from 'react-firebase-hooks/firestore'
import { auth} from "./firebase/config";
import {BrowserRouter} from "react-router-dom";
import {FileContext} from "./context/FileContext";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setUserAuth} from "./redux/actions/authActions";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";


function App() {

	const dispatch = useDispatch()
	const [file, setFile] = useState(null)

	// const [value, loading, error, snapshot] = useCollectionData(
	// 	collection(projectFirestore, 'images')
	// )
	// console.log(value, loading, error, snapshot)

	const [user, loading, error] = useAuthState(auth)

	useEffect(() => {
		if(user){
			dispatch(setUserAuth(user))
		}
	},[user, dispatch])

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
		<FileContext.Provider value={[file, setFile]}>
			<BrowserRouter>
				<Header/>
				{user ? <PrivateRoutes/> : <PublicRoutes/>}
			</BrowserRouter>
		</FileContext.Provider>
	);
}

export default App;
