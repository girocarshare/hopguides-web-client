import {React, useEffect} from "react";
import Axios from "axios";
import HomeDataContextProvider from "../contexts/HomeDataContext";
import Tour from "../components/Tour";

const TourPage = () => {

	  
	return (
		<HomeDataContextProvider>
		
			<Tour/>
		
		</HomeDataContextProvider>
	);
};

export default TourPage;

