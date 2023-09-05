import { React, useEffect } from "react";
import Verified from "../components/Verified";
import UserContextProvider from "../contexts/UserContext";



const VerifiedPage = () => {


	

	return (
	
			<div>
				<section>
					<UserContextProvider>
						<Verified />
					</UserContextProvider>
				</section>
			</div>


		
	);
};

export default VerifiedPage;
