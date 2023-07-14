import Axios from "axios";
import { homeDataConstants } from "../constants/HomeDataConstants";

import { authHeader } from "../helpers/auth-header";
var url = process.env.REACT_APP_URL || "http://localhost:8080/";

export const homeDataService = {
	getToursAndPointsData,
	getUpdatedToursAndPointsData,
	getPreviousMonthsData,
	addTour,
	addPartner,
	updateTour,
	deleteTour,
	deletePoi,
	getQrCode,
	updatePoint,
	getBPartners,
	changeLockCode,
	insertData,
	getTermsAndConditions,
	confirm,
	getQrCodes,
	generateQrCode,
	approve,
	disapprove,
	getTourData,
	getPoiData,
	addTeaserVideo,
	search

};


async function addTeaserVideo(dispatch ,tour) {
	
	
	dispatch(request());
	
	var token = authHeader()
	Axios.post(`${url}api/pnl/tour/add/teasertour`, tour, {
		headers: {
		  Authorization: token 
		}},{ validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success());
			} else if (res.status === 215) {
				dispatch(failure(res.data.response));
			}else{
				
				dispatch(failure(res.data.error));
			}
		})
		.catch((err) =>{		
				dispatch(failure(err));
			})

	function request() {
		
		return { type: homeDataConstants.ADD_TEASER_REQUEST };
	}
	function success() {
		
		console.log("fdsfsf")
		return { type: homeDataConstants.ADD_TEASER_SUCCESS };
	}
	function failure(error) {
		
		return { type: homeDataConstants.ADD_TEASER_FAILURE, error };
	}
}



async function search(dispatch ,data) {
	
	
	dispatch(request());
	
	var token = authHeader()
	Axios.get(`${url}api/pnl/tour/search/`+ data, {
		headers: {
		  Authorization: token 
		}},{ validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success(res.data));
			} else if (res.status === 215) {
				dispatch(failure(res.data.response));
			}else{
				
				dispatch(failure(res.data.error));
			}
		})
		.catch((err) =>{		
				dispatch(failure(err));
			})

	function request() {
		
		return { type: homeDataConstants.SEARCH_REQUEST };
	}
	function success(data) {
		
		return { type: homeDataConstants.SEARCH_SUCCESS, data };
	}
	function failure(error) {
		
		return { type: homeDataConstants.SEARCH_FAILURE, error };
	}
}



function insertData( tf, dispatch) {
	
	if(tf){


		dispatch(success());
	}else{
		dispatch(failure("Error while uploading new menu"));
	}

	function success() {
		return { type: homeDataConstants.INSERT_DATA_SUCCESS };
	}
	function failure(error) {
		return { type: homeDataConstants.INSERT_DATA_FAILURE, error };
	}
}


async function getTourData(dispatch ,id) {
	

	//dispatch(request());
	var token = authHeader()
	await Axios.get(`${url}api/pnl/tour/gettourdata/` + id, {
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

	/*function request() {
		return { type: homeDataConstants.APPROVE_REQUEST };
	}*/
	function success(data) {
		
		console.log(data)
		return { type: homeDataConstants.UPDATE_TOUR_DATA_MODAL_SHOW, tour: data };
	}
	function failure(message) {
		return { type: homeDataConstants.APPROVE_FAILURE, errorMessage: message };
	}
}





async function getPoiData(dispatch ,id) {
	

	//dispatch(request());
	var token = authHeader()
	await Axios.get(`${url}api/pnl/tour/getpoidata/` + id, {
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

	/*function request() {
		return { type: homeDataConstants.APPROVE_REQUEST };
	}*/
	function success(data) {
		
		console.log(data)
		return { type: homeDataConstants.UPDATE_POINT_DATA_MODAL_SHOW, point: data };
	}
	function failure(message) {
		return { type: homeDataConstants.APPROVE_FAILURE, errorMessage: message };
	}
}


async function approve(dispatch ,id) {
	

	dispatch(request());
	var token = authHeader()
	await Axios.get(`${url}api/pnl/tour/approve/` + id, {
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
		return { type: homeDataConstants.APPROVE_REQUEST };
	}
	function success(data) {
		
		return { type: homeDataConstants.APPROVE_SUCCESS, data: data };
	}
	function failure(message) {
		return { type: homeDataConstants.APPROVE_FAILURE, errorMessage: message };
	}
}


async function disapprove(dispatch ,id) {
	

	dispatch(request());
	var token = authHeader()
	
	await Axios.get(`${url}api/pnl/tour/disapprove/` + id,{
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
		return { type: homeDataConstants.DISAPPROVE_REQUEST };
	}
	function success(data) {
		
		return { type: homeDataConstants.DISAPPROVE_SUCCESS, data: data };
	}
	function failure(message) {
		return { type: homeDataConstants.DISAPPROVE_FAILURE, errorMessage: message };
	}
}


async function getTermsAndConditions(dispatch ,id) {
	

	dispatch(request());
	
	await Axios.get(`${url}api/pnl/tour/termsandconditions/` + id, { validateStatus: () => true })
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
		return { type: homeDataConstants.GET_TERMS_AND_CONSITIONS_REQUEST };
	}
	function success(data) {
		
		return { type: homeDataConstants.GET_TERMS_AND_CONSITIONS_SUCCESS, data: data };
	}
	function failure(message) {
		return { type: homeDataConstants.GET_TERMS_AND_CONSITIONS_FAILURE, errorMessage: message };
	}
}



async function getQrCodes(dispatch ,tourId) {
	
	
	dispatch(request());
	
	await Axios.get(`${url}api/pnl/tour/getqrcodes/` + tourId , { validateStatus: () => true })
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
		return { type: homeDataConstants.GET_QRCODES_REQUEST };
	}
	function success(data) {
		console.log(data)
		return { type: homeDataConstants.GET_QRCODES_SUCCESS, data: data };
	}
	function failure(message) {
		return { type: homeDataConstants.GET_QRCODES_FAILURE, errorMessage: message };
	}
}

function updateTour( tf, dispatch) {
	
	if(tf){


		dispatch(success());
	}else{
		dispatch(failure("Error while updating tour"));
	}

	function success() {
		getToursAndPointsDataUpdate(dispatch, 0)
		return { type: homeDataConstants.TOUR_UPDATE_SUCCESS };
	}
	function failure(error) {
		
		return { type: homeDataConstants.TOUR_UPDATE_FAILURE, error };
	}
}


function addTour(tour, dispatch) {

	dispatch(request());
	
	

	var token = authHeader()
	Axios.post(`${url}api/pnl/tour/add`, tour, {
		headers: {
		  Authorization: token 
		}},{ validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success());
				window.location.reload()
			} else if (res.status === 215) {
				dispatch(failure(res.data.response));
			}else{
				
				dispatch(failure(res.data.error));
			}
		})
		.catch((err) =>{		
				dispatch(failure(err));
			})

	function request() {
		
		return { type: homeDataConstants.TOUR_SUBMIT_REQUEST };
	}
	function success() {
		return { type: homeDataConstants.TOUR_SUBMIT_SUCCESS };
	}
	function failure(error) {
		
		return { type: homeDataConstants.TOUR_SUBMIT_FAILURE, error };
	}
}


async function confirm(dispatch ,bookingId, pointId) {
	
	
	dispatch(request());
	
	await Axios.get(`${url}api/booking/scanQR/` + bookingId +"/" + pointId, { validateStatus: () => true })
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
		return { type: homeDataConstants.CONFIRMATION_REQUEST };
	}
	function success(data) {
		
		return { type: homeDataConstants.CONFIRMATION_SUCCESS, data: data };
	}
	function failure(message) {
		return { type: homeDataConstants.CONFIRMATION_FAILURE, errorMessage: message };
	}
}



async function generateQrCode(dispatch ,tourId, number) {
	
	
	dispatch(request());
	
	await Axios.get(`${url}api/pnl/tour/qr/` + tourId + "/" + number , { validateStatus: () => true })
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
		return { type: homeDataConstants.GENERATE_QRCODE_REQUEST };
	}
	function success(data) {
		return { type: homeDataConstants.GENERATE_QRCODE_SUCCESS, data: data };
	}
	function failure(message) {
		return { type: homeDataConstants.GENERATE_QRCODE_FAILURE, errorMessage: message };
	}
}


function changeLockCode(lockCode, dispatch) {
dispatch(request());
	
	var token = authHeader()
	Axios.post(`${url}api/bp/changeLockCode/` + lockCode, { headers: { Authorization: token } },{ validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success());
			} else if (res.status === 412) {
				dispatch(failure(res.data.response));
			}else{
				
				dispatch(failure(res.data.error));
			}
		})
		.catch((err) =>{		
				dispatch(failure(err));
			})

	function request() {
		
		return { type: homeDataConstants.CHANGE_LOCK_CODE_REQUEST };
	}
	function success() {
		return { type: homeDataConstants.CHANGE_LOCK_CODE_SUCCESS };
	}
	function failure(error) {
		
		return { type: homeDataConstants.CHANGE_LOCK_CODE_FAILURE, error };
	}
}


function deleteTour( dispatch, tourId) {

	
	dispatch(request());
	
	var token = authHeader()
	Axios.get(`${url}api/pnl/tour/deleteTour/`+ tourId, {
		headers: {
		  Authorization: token 
		}},{ validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success(res.data));
			} else if (res.status === 500) {
				dispatch(failure(res.data.response));
			}else{
				
				dispatch(failure(res.data.error));
			}
		})
		.catch((err) =>{		
				dispatch(failure(err));
			})

	function request() {
		
		return { type: homeDataConstants.DELETE_TOUR_REQUEST };
	}
	function success(data) {
		return { type: homeDataConstants.DELETE_TOUR_SUCCESS, data: data };
	}
	function failure(error) {
		
		return { type: homeDataConstants.DELETE_TOUR_FAILURE, error };
	}
}



function deletePoi( dispatch, tourId, poiId) {

	dispatch(request());
	
	var token = authHeader()
	Axios.get(`${url}api/pnl/tour/deletePoi/`+ tourId + "/" + poiId, {
		headers: {
		  Authorization: token 
		}},{ validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success(res.data));
			} else if (res.status === 500) {
				dispatch(failure(res.data.response));
			}else{
				
				dispatch(failure(res.data.error));
			}
		})
		.catch((err) =>{		
				dispatch(failure(err));
			})

	function request() {
		
		return { type: homeDataConstants.DELETE_TOUR_REQUEST };
	}
	function success(data) {
		return { type: homeDataConstants.DELETE_POI_SUCCESS, data: data };
	}
	function failure(error) {
		
		return { type: homeDataConstants.DELETE_POI_FAILURE, error };
	}
}


function addPartner(tf, dispatch) {

	if(tf){


		dispatch(success());
	}else{
		dispatch(failure("Error while adding new point"));
	}

	function success() {
		
		getToursAndPointsDataUpdate(dispatch, 0)
		return { type: homeDataConstants.PARTNER_SUBMIT_SUCCESS };
	}
	function failure(error) {
		return { type: homeDataConstants.PARTNER_SUBMIT_FAILURE, error };
	}
	
}


function updatePoint( tf, dispatch) {
	
	if(tf){


		dispatch(success());
	}else{
		dispatch(failure("Error while updateing tour"));
	}

	function success() {
		
		getToursAndPointsDataUpdate(dispatch, 0)
		return { type: homeDataConstants.POI_UPDATE_SUCCESS };
	}
	function failure(error) {
		return { type: homeDataConstants.POI_UPDATE_FAILURE, error };
	}
}





async function getPreviousMonthsData(dispatch ,id) {
	
	dispatch(request());
	
	if(id===""){
		id = "x"
	}
	await Axios.get(`${url}api/pnl/tour/previousReport/` + id, { validateStatus: () => true })
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
		return { type: homeDataConstants.PREVIOUS_DATA_GET_REQUEST };
	}
	function success(data) {
		return { type: homeDataConstants.PREVIOUS_DATA_GET_SUCCESS, data: data };
	}
	function failure(message) {

		return { type: homeDataConstants.PREVIOUS_DATA_GET_FAILURE, errorMessage: message };
	}
}

async function getToursAndPointsData(dispatch, page) {


		dispatch(request());
		var token = authHeader()
	
	await Axios.get(`${url}api/pnl/tour/allToursWithPoints/`+page,{ headers: { Authorization: token},  validateStatus: () => true })

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
		return { type: homeDataConstants.DATA_TOUR_POINTS_GET_REQUEST };
	}
	function success(data) {
		return { type: homeDataConstants.DATA_TOUR_POINTS_GET_SUCCESS, data: data };
	}
	function failure(message) {

		return { type: homeDataConstants.DATA_TOUR_POINTS_GET_FAILURE, errorMessage: message };
	}
}



async function getToursAndPointsDataUpdate(dispatch, page) {


	dispatch(request());
	var token = authHeader()

await Axios.get(`${url}api/pnl/tour/allToursWithPoints/`+page,{ headers: { Authorization: token},  validateStatus: () => true })

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
	return { type: homeDataConstants.DATA_TOUR_POINTS_GET_REQUEST };
}
function success(data) {
	return { type: homeDataConstants.DATA_TOUR_POINTS_GET_UPDATE_SUCCESS, data: data };
}
function failure(message) {

	return { type: homeDataConstants.DATA_TOUR_POINTS_GET_UPDATE_FAILURE, errorMessage: message };
}
}


async function getUpdatedToursAndPointsData(dispatch, page) {

	dispatch(request());
	var token = authHeader()

await Axios.get(`${url}api/pnl/tour/allUpdatedToursWithPoints/` + page,{ headers: { Authorization: token},  validateStatus: () => true })

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
	return { type: homeDataConstants.DATA_TOUR_POINTS_GET_REQUEST };
}
function success(data) {
	return { type: homeDataConstants.DATA_TOUR_POINTS_GET_SUCCESS, data: data };
}
function failure(message) {

	return { type: homeDataConstants.DATA_TOUR_POINTS_GET_FAILURE, errorMessage: message };
}
}



async function getQrCode(dispatch,id) {

	var token = authHeader()

	const FileDownload = require("js-file-download");


	await Axios.get(`${url}api/reports/qr/ `+id, { headers: { Authorization: token} , validateStatus: () => true,  responseType: 'blob'})
		.then((res) => {
			if (res.status === 200) {
				FileDownload(res.data, id.trim() + ".png");
			}
		})
		.catch((err) => {

		});

}


async function getBPartners(dispatch ) {

	dispatch(request());
	await Axios.get(`${url}api/bp/all`, { validateStatus: () => true })
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
		return { type: homeDataConstants.GET_BPARTNERS_REQUEST };
	}
	function success(data) {
		return { type: homeDataConstants.GET_BPARTNERS_SUCCESS, data: data };
	}
	function failure(message) {

		return { type: homeDataConstants.GET_BPARTNERS_FAILURE, errorMessage: message };
	}
}



