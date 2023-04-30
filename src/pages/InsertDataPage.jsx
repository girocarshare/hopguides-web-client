
import { React, useEffect } from "react";

import Report from "../components/Report";
import HomeDataContextProvider from "../contexts/HomeDataContext";
import InsertData from "../components/InsertData";
import SuccessModal from "../components/SuccessModal";
import FailureModal from "../components/FailureModal";
const InsertDataPage = () => {

	return (
		<div>
			<HomeDataContextProvider>
				<InsertData />
				<SuccessModal />
				<FailureModal />
			</HomeDataContextProvider>
		</div>
	);
};

export default InsertDataPage;

