
import { React, useEffect } from "react";

import HomeDataContextProvider from "../contexts/HomeDataContext";
import TermsAndConditions from "../components/TermsAndConditions";

import { authHeader } from "../helpers/auth-header";
import Axios from "axios";
var url = process.env.REACT_APP_URL || "http://localhost:8080/";
const TermsAndConditionsPage = () => {




	return (
		<div>
			<HomeDataContextProvider>
				<TermsAndConditions />
			</HomeDataContextProvider>
		</div>
	);
};

export default TermsAndConditionsPage;

