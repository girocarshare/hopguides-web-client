import { React, useEffect } from "react";
import VerificationSent from "../components/VerificationSent";
import UserContextProvider from "../contexts/UserContext";



const VerificationSentPage = () => {


	

	return (
	
			<div>
				<section>
					<UserContextProvider>
						<VerificationSent />
					</UserContextProvider>
				</section>
			</div>


		
	);
};

export default VerificationSentPage;
