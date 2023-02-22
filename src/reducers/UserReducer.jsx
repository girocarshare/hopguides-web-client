import { userConstants } from "../constants/UserConstants";


export const userReducer = (state, action) => {

	switch (action.type) {

		case userConstants.LOGIN_FAILURE:
			return {
				loginError: {
					showError: true,
					errorMessage: "Incorrect email or password",
				},
			};
		case userConstants.LOGIN_SUCCESS:
			return {
				loginError: {
					showError: false,
					errorMessage: "",
				},
			};

		case userConstants.REGISTRATION_MAIL_SUCCESS:
			return {
				success: true
			};
		case userConstants.REGISTRATION_MAIL_FAILURE:
			return {
				error: true
			};

		case userConstants.SET_PASSWORD_SUCCESS:
			return {
				successPassword: true
			};
		case userConstants.SET_PASSWORD_FAILURE:
			return {
				errorPassword: true
			};

		case userConstants.FORGOT_PASSWORD_SUCCESS:
			return {
				successForgotPassword: true
			};
		case userConstants.FORGOT_PASSWORD_FAILURE:
			return {
				errorForgotPassword: true
			};


		default:
			return state;
	}
};
