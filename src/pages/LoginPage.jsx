import { React, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import HomeDataContextProvider from "../contexts/HomeDataContext";
import UserContextProvider from "../contexts/UserContext";



const LoginPage = () => {


	

	return (
	
			<div>
				<section>
					<UserContextProvider>
						<LoginForm />
					</UserContextProvider>
				</section>
			</div>


		
	);
};

export default LoginPage;
