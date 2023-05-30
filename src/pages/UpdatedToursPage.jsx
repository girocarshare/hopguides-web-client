
import { React, useEffect } from "react";

import Report from "../components/Report";
import HomeDataContextProvider from "../contexts/HomeDataContext";
import UpdateToursData from "../components/UpdateToursData";
import UpdatedTourData from "../components/UpdatedTourData";
import UpdatedPOIData from "../components/UpdatedPOIData";
import SuccessModal from "../components/SuccessModal";
import FailureModal from "../components/FailureModal";
const UpdatedToursPage = () => {

	return (
		<div>
			<HomeDataContextProvider>
				<SuccessModal/>
				<FailureModal/>
				<UpdatedPOIData/>
				<UpdatedTourData/>
			<UpdateToursData/>
		</HomeDataContextProvider>
		</div>
	);
};

export default UpdatedToursPage;

