import React, { useContext, useEffect, useImperativeHandle, forwardRef, useState } from "react";
import SetPassword from "../components/SetPassword";
import UserContextProvider from "../contexts/UserContext";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";
import { authHeader } from "../helpers/auth-header";
import Axios from "axios";
var url = process.env.REACT_APP_URL || "http://localhost:8080/";


const SetPasswordPage = () => {
	
	
	return (
	
			<div>
			
					<UserContextProvider>
					<SetPassword/>
					</UserContextProvider>
			
			</div>


		
	);
};

export default SetPasswordPage;
