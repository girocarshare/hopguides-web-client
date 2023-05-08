import { userConstants } from "../constants/UserConstants";


var prodCpy = {};
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

		console.log("hfhfhfhfhfhf")

		return {
			modalData: {
				show: true,
				title: "Success",
				text : "You have successfully sent registration mail"
			},
		};



		case userConstants.REGISTRATION_MAIL_FAILURE:


			prodCpy = { ...state };
			prodCpy.modalData.show = true;
			prodCpy.modalData.title = "Failure";
			prodCpy.modalData.text = "You are unable to send registration mail. Please try again later";
			return prodCpy;


			case userConstants.USER_SUCCESS_FAILURE_HIDE:


			prodCpy = { ...state };
			prodCpy.modalData.show = false;
			prodCpy.modalData.title = "";
			prodCpy.modalData.text = "";
			return prodCpy;
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
