
import { React, useEffect } from "react";

import Report from "../components/Report";
import ReportContextProvider from "../contexts/ReportContext";
import PreviousReport from "../components/PreviousReport";


const PreviousReportPage = () => {

	return (
		<div>
			<ReportContextProvider>
				<PreviousReport />
			</ReportContextProvider>
		</div>
	);
};

export default PreviousReportPage;

