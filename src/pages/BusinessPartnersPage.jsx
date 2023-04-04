
import { React, useEffect } from "react";

import BusinessPartnersContextProvider from "../contexts/BusinessPartnersContext";
import BusinessPartnersData from "../components/BusinessPartnersData";
import BPartnerData from "../components/BPartnerData";
const BusinessPartnersPage = () => {

	return (
		<div>
			<BusinessPartnersContextProvider>
				<BusinessPartnersData />
				<BPartnerData />
			</BusinessPartnersContextProvider>
		</div>
	);
};

export default BusinessPartnersPage;

