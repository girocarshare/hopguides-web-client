
import { React, useEffect } from "react";

import HomeDataContextProvider from "../contexts/HomeDataContext";
import QRCodesData from "../components/QRCodesData";
const QRCodesPage = () => {

	return (
		<div>
			<HomeDataContextProvider>
				<QRCodesData />
			</HomeDataContextProvider>
		</div>
	);
};

export default QRCodesPage;

