import React, { createContext, useReducer } from "react";
import { userReducer } from "../reducers/UserReducer";

export const UserContext = createContext();

const UserContextProvider = (props) => {
	const [userState, dispatch] = useReducer(userReducer, {
		loginError: {
			showError: false,
			errorMessage: "",
		},
		
		success: false,
		error: false,
		
		successPassword: false,
		errorPassword: false,

		
		successForgotPassword: false,
		errorForgotPassword: false,

		modalData: {
			show: false,
			title:"",
			text: "",
		},
	});

	return <UserContext.Provider value={{ userState, dispatch }}>{props.children}</UserContext.Provider>;
};

export default UserContextProvider;
