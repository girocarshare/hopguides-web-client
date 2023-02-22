import { React, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import UserContextProvider from "../contexts/UserContext";



const LoginPage = () => {


	

	return (
	
			<div style={{ background: "#387499", backgroundSize:"cover", height:"100%"}}>
				<section className="login-clean">
					<UserContextProvider>
						<LoginForm />
					</UserContextProvider>
				</section>
			</div>


		
	);
};

export default LoginPage;
