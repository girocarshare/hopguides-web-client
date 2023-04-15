import {React, useEffect} from "react";

import Report from "../components/Report";
import HomeDataContextProvider from "../contexts/HomeDataContext";
import HomePageData from "../components/HomePageData";
import PreviousReportTourModal from "../components/PreviousReportTourModal";
import AddNewTourForm from "../components/AddNewTourForm";
import AddNewPartnerForm from "../components/AddNewPartnerForm";
import UpdateMenuModal from "../components/UpdateMenuModal";
import UpdateLogoModal from "../components/UpdateLogoModal";
import ChangeLockCodeModal from "../components/ChangeLockCodeModal";
import SuccessModal from "../components/SuccessModal";
import FailureModal from "../components/FailureModal";
import TourData from "../components/TourData";
import POIData from "../components/POIData";

const HomePage = () => {

	return (
		<HomeDataContextProvider>
			<TourData/>
			<POIData/>
			<SuccessModal/>
			<FailureModal/>
			<HomePageData/>
			<PreviousReportTourModal/>
			<AddNewTourForm/>
			<AddNewPartnerForm/>
			<UpdateMenuModal/>
			<ChangeLockCodeModal/>
			<UpdateLogoModal/>
		</HomeDataContextProvider>
	);
};

export default HomePage;

