
import { React, useEffect } from "react";

import HomeDataContextProvider from "../contexts/HomeDataContext";
import Confirmation from "../components/Confirmation";
const ConfirmationPage = () => {

	return (
		<div>
			<HomeDataContextProvider>
				<Confirmation />
				
			</HomeDataContextProvider>
		</div>
	);
};

export default ConfirmationPage;

