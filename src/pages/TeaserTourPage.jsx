import {React, useEffect} from "react";
import HomeDataContextProvider from "../contexts/HomeDataContext";
import TeaserTour from "../components/TeaserTour";
import SuccessModal from "../components/SuccessModal";
import FailureModal from "../components/FailureModal";

const TeaserTourPage = () => {

	return (
		<HomeDataContextProvider>
			<TeaserTour/>
			
		<FailureModal/>
		<SuccessModal/>
		</HomeDataContextProvider>
	);
};

export default TeaserTourPage;

