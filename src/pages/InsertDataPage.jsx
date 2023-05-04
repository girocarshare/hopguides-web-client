
import { React, useEffect } from "react";

import Report from "../components/Report";
import HomeDataContextProvider from "../contexts/HomeDataContext";
import InsertData from "../components/InsertData";
import AddPartnerOrPointForm from "../components/AddPartnerOrPointForm";
import SuccessModal from "../components/SuccessModal";
import FailureModal from "../components/FailureModal";
import BasicTourData from "../components/BasicTourData";
const InsertDataPage = () => {

	return (
		<div>
			<HomeDataContextProvider>
				<BasicTourData/>
				<AddPartnerOrPointForm />
				<InsertData />
				<SuccessModal />
				<FailureModal />
			</HomeDataContextProvider>
		</div>
	);
};

export default InsertDataPage;

