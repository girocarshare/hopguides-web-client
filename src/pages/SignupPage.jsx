import { React, useEffect } from "react";
import SignupForm from "../components/SignupForm";
import UserContextProvider from "../contexts/UserContext";



const SignupPage = () => {


	

	return (
	
			<div>
				<section>
					<UserContextProvider>
						<SignupForm />
					</UserContextProvider>
				</section>
			</div>


		
	);
};

export default SignupPage;
