import Axios from "axios";
import { businessPartnersConstants } from "../constants/BusinessPartnersConstants";
import { authHeader } from "../helpers/auth-header";
var url = process.env.REACT_APP_URL || "http://localhost:8080/";

export const businessPartnersService = {
	getBPartners,
	updateBPartner,
	deleteBPartner,


};





async function getBPartners(dispatch ) {

	dispatch(request());
	await Axios.get(`${url}api/bp/allwithdata`, { validateStatus: () => true })
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
		return { type: businessPartnersConstants.GET_BPARTNERS_REQUEST };
	}
	function success(data) {
		return { type: businessPartnersConstants.GET_BPARTNERS_SUCCESS, data: data };
	}
	function failure(message) {

		return { type: businessPartnersConstants.GET_BPARTNERS_FAILURE, errorMessage: message };
	}
}


async function deleteBPartner(dispatch, bpartnerId ) {

	dispatch(request());

	var token = authHeader()
	await Axios.get(`${url}api/bp/delete/` + bpartnerId, {
		headers: {
		  Authorization: token 
		}},{ validateStatus: () => true })
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
		return { type: businessPartnersConstants.BUSINESS_PARTNER_DELETE_REQUEST };
	}
	function success(data) {
		return { type: businessPartnersConstants.BUSINESS_PARTNER_DELETE_SUCCESS, data: data };
	}
	function failure(message) {

		return { type: businessPartnersConstants.BUSINESS_PARTNER_DELETE_FAILURE, errorMessage: message };
	}


}

function updateBPartner( tf, dispatch) {
	
	if(tf){


		dispatch(success());
	}else{
		dispatch(failure("Error while updateing business partner"));
	}

	function success() {
		getBPartners(dispatch)
		return { type: businessPartnersConstants.BUSINESS_PARTNER_UPDATE_SUCCESS };
	}
	function failure(error) {
		return { type: businessPartnersConstants.BUSINESS_PARTNER_UPDATE_FAILURE, error };
	}
}

