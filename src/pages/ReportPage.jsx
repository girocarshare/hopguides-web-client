
import { React, useEffect } from "react";

import Report from "../components/Report";
import ReportContextProvider from "../contexts/ReportContext";
import ReportModal from "../components/ReportModal";
import ReportPrint from "../components/ReportPrint";

import { authHeader } from "../helpers/auth-header";
import Axios from "axios";
var url = process.env.REACT_APP_URL || "http://localhost:8080/";
const ReportPage = () => {




	return (
		<div>
			<ReportContextProvider>
				<ReportModal />
				<ReportPrint/>
			</ReportContextProvider>
		</div>
	);
};

export default ReportPage;

