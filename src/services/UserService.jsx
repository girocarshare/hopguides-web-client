
import Axios from "axios";
import { userConstants } from "../constants/UserConstants";
import { setAuthInLocalStorage } from "../helpers/auth-header";
var url = process.env.REACT_APP_URL || "http://localhost:8080/";
export const userService = {
	login,
	getRoles,
	sendRegistrationMail,
	sendSetPassword,
	forgotPassword,
	registerandlogin,
	signup
};


function login(loginRequest, dispatch) {

	dispatch(request());
	Axios.post(`${url}api/users/login`, loginRequest, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				setAuthInLocalStorage(res.data);
				dispatch(success());
				window.location.href="/#"
							
			} else if (res.status === 412) {
				dispatch(failure(res.data.error));
			} else {
				dispatch({ type: userConstants.LOGIN_FAILURE });
			}
		})
		.catch((err) =>{
			
			var error = "Unknown error, please try again later."
				dispatch(failure(error));
			})

	function request() {
		return { type: userConstants.LOGIN_SUCCESS };
	}
	function success() {
		return { type: userConstants.LOGIN_SUCCESS };
	}
	function failure(error) {
		
		return { type: userConstants.LOGIN_FAILURE, error };
	}
}



function signup(loginRequest, dispatch) {

	dispatch(request());
	Axios.post(`${url}api/users/addUser`, loginRequest, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				setAuthInLocalStorage(res.data);
				dispatch(success());
				window.location.href="/#/verificationsent"
							
			} else if (res.status === 412) {
				dispatch(failure(res.data.error));
			} else {
				dispatch({ type: userConstants.LOGIN_FAILURE });
			}
		})
		.catch((err) =>{
			
			var error = "Unknown error, please try again later."
				dispatch(failure(error));
			})

	function request() {
		return { type: userConstants.LOGIN_SUCCESS };
	}
	function success() {
		return { type: userConstants.LOGIN_SUCCESS };
	}
	function failure(error) {
		
		return { type: userConstants.LOGIN_FAILURE, error };
	}
}



function registerandlogin(loginRequest, dispatch) {

	dispatch(request());
	Axios.post(`${url}api/users/registerandlogin`, loginRequest, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				setAuthInLocalStorage(res.data);
				dispatch(success());
				window.location.href="/#/welcome"
							
			} else if (res.status === 412) {
				dispatch(failure(res.data.error));
			} else {
				dispatch({ type: userConstants.LOGIN_FAILURE });
			}
		})
		.catch((err) =>{
			
			var error = "Unknown error, please try again later."
				dispatch(failure(error));
			})

	function request() {
		return { type: userConstants.LOGIN_SUCCESS };
	}
	function success() {
		return { type: userConstants.LOGIN_SUCCESS };
	}
	function failure(error) {
		console.log(error)
		return { type: userConstants.LOGIN_FAILURE, error };
	}
}


function sendSetPassword(sendEmailRequest, dispatch) {
	

	dispatch(request());
	Axios.post(`${url}api/users/register`, sendEmailRequest, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success());
							
			} else {
				dispatch(failure(res.data.error));
			} 
		})
		.catch((err) =>{
			
			var error = "Unknown error, please try again later."
				dispatch(failure(error));
			})

	function request() {
		return { type: userConstants.SET_PASSWORD_REQUEST };
	}
	function success() {
		return { type: userConstants.SET_PASSWORD_SUCCESS };
	}
	function failure(error) {
		
		return { type: userConstants.SET_PASSWORD_FAILURE, error };
	}
}


function forgotPassword(sendEmailRequest, dispatch) {
	

	dispatch(request());
	Axios.post(`${url}api/users/forgotPassword`, sendEmailRequest, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success());
							
			} else {
				dispatch(failure(res.data.error));
			} 
		})
		.catch((err) =>{
			
			var error = "Unknown error, please try again later."
				dispatch(failure(error));
			})

	function request() {
		return { type: userConstants.FORGOT_PASSWORD_REQUEST };
	}
	function success() {
		return { type: userConstants.FORGOT_PASSWORD_SUCCESS };
	}
	function failure(error) {
		
		return { type: userConstants.FORGOT_PASSWORD_FAILURE, error };
	}
}

function sendRegistrationMail( tf, dispatch) {
	
	if(tf){
		dispatch(success());
	}else{
		dispatch(failure("Error while sending registration mail"));
	}

	function success() {
		return { type: userConstants.REGISTRATION_MAIL_SUCCESS };
	}
	function failure(error) {
		return { type: userConstants.REGISTRATION_MAIL_FAILURE, error };
	}
}



async function getRoles(dispatch) {
	dispatch(request());
	
	await Axios.get(`${url}api/roles`, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success(res.data));
			} else {
				
				var error = "Error while fetching data"
				dispatch(failure(error));
			}
		})
		.catch((err) => {
			
			var error = "Unknown error, please try again later."
				dispatch(failure(error));
		});

	function request() {
		return { type: userConstants.ROLES_GET_REQUEST };
	}
	function success(data) {
		return { type: userConstants.ROLES_GET_SUCCESS, data: data };
	}
	function failure(message) {
		
		return { type: userConstants.ROLES_GET_FAILURE, errorMessage: message };
	}
}
