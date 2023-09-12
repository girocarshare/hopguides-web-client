import { React, useEffect } from "react";
import Axios from "axios";
import HomeDataContextProvider from "../contexts/HomeDataContext";
import WelcomePageForm from "../components/WelcomePageForm";
import SuccessModal from "../components/SuccessModal";
import FailureModal from "../components/FailureModal";

const WelcomePage = () => {



	return (
		<HomeDataContextProvider>
			<WelcomePageForm />
			<FailureModal />
			<SuccessModal />
		</HomeDataContextProvider>
	);
};

export default WelcomePage;

