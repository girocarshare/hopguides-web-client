
import { React, useEffect } from "react";

import Report from "../components/Report";
import HomeDataContextProvider from "../contexts/HomeDataContext";
import HomePageData from "../components/HomePageData";
import PreviousReportTourModal from "../components/PreviousReportTourModal";
import AddNewTourForm from "../components/AddNewTourForm";
import AddNewPartnerForm from "../components/AddNewPartnerForm";
import UpdateMenuModal from "../components/UpdateMenuModal";
import SuccessModal from "../components/SuccessModal";
import FailureModal from "../components/FailureModal";
const HomePage = () => {

	return (
		<div>
			<HomeDataContextProvider>
				<SuccessModal />
				<FailureModal />
				<HomePageData />
				<PreviousReportTourModal/>
				<AddNewTourForm/>
				<AddNewPartnerForm/>
				<UpdateMenuModal/>
			</HomeDataContextProvider>
		</div>
	);
};

export default HomePage;

