import React, { useContext, useEffect, useImperativeHandle, forwardRef, useState } from "react";
import Register from "../components/Register";
import UserContextProvider from "../contexts/UserContext";
import SuccessFailureModalUsers from "../components/SuccessFailureModalUsers";
import Axios from "axios";
var url = process.env.REACT_APP_URL || "http://localhost:8080/";


const RegisterPage = () => {
	
	
	return (
	
			<div>
			
					<UserContextProvider>
					<Register/>
					</UserContextProvider>
			
			</div>


		
	);
};

export default RegisterPage;
