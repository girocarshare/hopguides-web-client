
import { React, useEffect } from "react";

import Report from "../components/Report";
import HomeDataContextProvider from "../contexts/HomeDataContext";
import InsertData from "../components/InsertData";
import PreviousReportTourModal from "../components/PreviousReportTourModal";
import AddNewTourForm from "../components/AddNewTourForm";
import AddNewPartnerForm from "../components/AddNewPartnerForm";
import UpdateMenuModal from "../components/UpdateMenuModal";
import SuccessModal from "../components/SuccessModal";
import FailureModal from "../components/FailureModal";
const InsertDataPage = () => {

	return (
		<div>
			<HomeDataContextProvider>
				<SuccessModal />
				<FailureModal />
				<InsertData />
			</HomeDataContextProvider>
		</div>
	);
};

export default InsertDataPage;

