import {React, useEffect} from "react";
import HomeDataContextProvider from "../contexts/HomeDataContext";
import TeaserTour from "../components/TeaserTour";
import SuccessModal from "../components/SuccessModal";
import FailureModal from "../components/FailureModal";
import TeaserTourData from "../components/TeaserTourData";
import AddGpxModal from "../components/AddGpxModal";

const TeaserTourPage = () => {

	return (
		<HomeDataContextProvider>
		<TeaserTour/>
			<AddGpxModal/>
			
			
		<FailureModal/>
		<SuccessModal/>
		</HomeDataContextProvider>
	);
};

export default TeaserTourPage;

