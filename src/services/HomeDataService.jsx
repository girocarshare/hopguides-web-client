import Axios from "axios";
import { homeDataConstants } from "../constants/HomeDataConstants";

import { authHeader } from "../helpers/auth-header";
var url = process.env.REACT_APP_URL || "http://localhost:3000/";

export const homeDataService = {
	getData,
	getToursAndPointsData,
	getPreviousMonthsData,
	addTour,
	addPartner,
	updateTour,
	getQrCode,
	updatePoint

};


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


function addPartner(tour, dispatch) {

	dispatch(request());
	
	

	var token = authHeader()
	Axios.post(`${url}api/pnl/tour/addPartners`, tour, {
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
		
		return { type: homeDataConstants.PARTNER_SUBMIT_REQUEST };
	}
	function success() {
		return { type: homeDataConstants.PARTNER_SUBMIT_SUCCESS };
	}
	function failure(error) {
		
		return { type: homeDataConstants.PARTNER_SUBMIT_FAILURE, error };
	}
}


async function updatePoint( dispatch, point) {

	dispatch(request());
	var token = authHeader()
	await Axios.post(`${url}api/poi/update/`+point.point.id, point, {
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
		
		return { type: homeDataConstants.POI_UPDATE_REQUEST };
	}
	function success(data) {
		return { type: homeDataConstants.POI_UPDATE_SUCCESS, data:data };
	
	}
	function failure(error) {
		
		return { type: homeDataConstants.POI_UPDATE_FAILURE, error };
	}
}


  async function updateTour( dispatch, tour) {
  
	  dispatch(request());
	  var token = authHeader()
	  await Axios.post(`${url}api/pnl/tour/update/`+tour.id, tour, {
		  headers: {
			Authorization: token 
		  }},{ validateStatus: () => true })
		  .then((res) => {
			  if (res.status === 200) {
				  console.log(res.data)
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
		  
		  return { type: homeDataConstants.TOUR_UPDATE_REQUEST };
	  }
	  function success(data) {
		  return { type: homeDataConstants.TOUR_UPDATE_SUCCESS, data: data  };
	  
	  }
	  function failure(error) {
		  
		  return { type: homeDataConstants.TOUR_UPDATE_FAILURE, error };
	  }
  }


async function getPreviousMonthsData(dispatch ,id) {

	dispatch(request());
	
	if(id==""){
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

async function getData(dispatch) {

	dispatch(request());
	
	await Axios.get(`${url}api/pnl/tour/allReport`, { validateStatus: () => true })
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
		return { type: homeDataConstants.DATA_GET_REQUEST };
	}
	function success(data) {
		return { type: homeDataConstants.DATA_GET_SUCCESS, data: data };
	}
	function failure(message) {

		return { type: homeDataConstants.DATA_GET_FAILURE, errorMessage: message };
	}
}


async function getToursAndPointsData(dispatch) {

		dispatch(request());
	
	
	await Axios.get(`${url}api/pnl/tour/allToursWithPoints`, { validateStatus: () => true })
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
				console.log(res.data)
				FileDownload(res.data, id.trim() + ".png");
				//window.location.reload(true);
			}
		})
		.catch((err) => {

		});

}