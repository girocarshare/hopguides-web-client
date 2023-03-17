import React, { useContext, useEffect, useImperativeHandle, forwardRef, useState } from "react";
import Register from "../components/Register";
import UserContextProvider from "../contexts/UserContext";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";
import { authHeader } from "../helpers/auth-header";
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
