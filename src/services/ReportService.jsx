import Axios from "axios";
import { reportConstants } from "../constants/ReportConstants";

var url = process.env.REACT_APP_URL || "http://localhost:3000/";

export const reportService = {
	getReport,
	getReports,
	addMenu

};


async function getReport(dispatch ,id) {

	dispatch(request());
	
	await Axios.get(`${url}api/reports/` + id, { validateStatus: () => true })
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
		return { type: reportConstants.REPORT_GET_REQUEST };
	}
	function success(data) {
		
		return { type: reportConstants.REPORT_GET_SUCCESS, data: data };
	}
	function failure(message) {
		return { type: reportConstants.REPORT_GET_FAILURE, errorMessage: message };
	}
}


async function getReports(dispatch ,id) {
	
	dispatch(request());
	
	
	await Axios.get(`${url}api/reports/previous/` + id, { validateStatus: () => true })
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
		return { type: reportConstants.PREVIOUS_REPORT_GET_REQUEST };
	}
	function success(data) {
		return { type: reportConstants.PREVIOUS_REPORT_GET_SUCCESS, data: data };
	}
	function failure(message) {

		return { type: reportConstants.PREVIOUS_REPORT_GET_FAILURE, errorMessage: message };
	}
}


function addMenu( tf, dispatch) {
	
	if(tf){


		dispatch(success());
	}else{
		dispatch(failure("Error while uploading new menu"));
	}

	function success() {
		window.location.reload()
		return { type: reportConstants.MENU_SUBMIT_SUCCESS };
	}
	function failure(error) {
		return { type: reportConstants.MENU_SUBMIT_FAILURE, error };
	}
}
