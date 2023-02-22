
import { React, useEffect } from "react";
import UserContextProvider from "../contexts/UserContext";
import ForgotPassword from "../components/ForgotPassword";
const ForgotPasswordPage = () => {

	return (
		<div>
			<UserContextProvider>
				<ForgotPassword />
			</UserContextProvider>
		</div>
	);
};

export default ForgotPasswordPage;

