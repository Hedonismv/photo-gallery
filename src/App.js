import './App.css';
import FileUploadForm from "./Components/FileUploadForm";
import ImageList from "./Components/ImageList";
import {useState} from "react";
import {FileContext} from "./context/FileContext";
import {PaginationContext} from "./context/PaginationContext";

function App() {
	const [file, setFile] = useState(null)
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(null)

  return (
	<FileContext.Provider value={[file, setFile]}>
		<PaginationContext.Provider value={[currentPage, setCurrentPage, totalPages, setTotalPages]}>
			<div className="App">
				<h1>Download your Images</h1>
				<FileUploadForm/>
				<ImageList/>
			</div>
		</PaginationContext.Provider>
	</FileContext.Provider>
  );
}

export default App;
