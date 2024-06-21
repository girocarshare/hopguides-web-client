import {React, useEffect} from "react";
import Axios from "axios";
import HomeDataContextProvider from "../contexts/HomeDataContext";
import HomePageData from "../components/HomePageData";
import PreviousReportTourModal from "../components/PreviousReportTourModal";
import AddNewTourForm from "../components/AddNewTourForm";
import AddNewPartnerForm from "../components/AddNewPartnerForm";
import UpdateMenuModal from "../components/UpdateMenuModal";
import UpdateLogoModal from "../components/UpdateLogoModal";
import ChangeLockCodeModal from "../components/ChangeLockCodeModal";
import SuccessModal from "../components/SuccessModal";
import FailureModal from "../components/FailureModal";
import TourData from "../components/TourData";
import AddGpxModal from "../components/AddGpxModal";
import { Widget, addResponseMessage, toggleMsgLoader } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

const HomePage = () => {
	useEffect(() => {
		addResponseMessage('Welcome, feel free to ask me anything!');
	  }, []);

	  const handleNewUserMessage = (newMessage) => {
		console.log(`New message incoming! ${newMessage}`);
		var question = newMessage
	//	toggleMsgLoader();
		Axios.get(`https://hopguides-chatgpt-main-j7limbsbmq-oc.a.run.app/api/data/` + question, { validateStatus: () => true })
	.then(response => {
        addResponseMessage(response.data.answer);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
		
	  };

	  
	return (
		<HomeDataContextProvider>
		
			<TourData/>
			<AddGpxModal/>
			<FailureModal/>
			<HomePageData/>
			<SuccessModal/>
			<PreviousReportTourModal/>
			<AddNewTourForm/>
			<AddNewPartnerForm/>
			<UpdateMenuModal/>
			<ChangeLockCodeModal/>
			<UpdateLogoModal/>
		</HomeDataContextProvider>
	);
};

export default HomePage;

