
import { React, useEffect } from "react";

import BusinessPartnersContextProvider from "../contexts/BusinessPartnersContext";
import BusinessPartnersData from "../components/BusinessPartnersData";
import BPartnerData from "../components/BPartnerData";
import SuccessFailureModal from "../components/SuccessFailureModal";
const BusinessPartnersPage = () => {

	return (
		<div>
			<BusinessPartnersContextProvider>
				<BusinessPartnersData />
				<BPartnerData />
				<SuccessFailureModal />
			</BusinessPartnersContextProvider>
		</div>
	);
};

export default BusinessPartnersPage;

