import { React, useEffect } from "react";
import Axios from "axios";
import HomeDataContextProvider from "../contexts/HomeDataContext";
import Chatbot from "../components/Chatbot";

const ChatbotPage = () => {



	return (
		<HomeDataContextProvider>
			<Chatbot />

		</HomeDataContextProvider>
	);
};

export default ChatbotPage;

