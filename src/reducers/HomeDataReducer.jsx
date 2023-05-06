
import { homeDataConstants } from "../constants/HomeDataConstants";

var prodCpy = {};
function convertMonth(month) {
	if (month === 1) {

		return "January"

	} else if (month === 2) {

		return "February"
	} else if (month === 3) {

		return "March"
	} else if (month === 4) {

		return "April"

	} else if (month ===5) {

		return "May"
	} else if (month=== 6) {

		return "June"
	} else if (month === 7) {

		return "July"
	} else if (month === 8) {

		return "August"
	} else if (month === 9) {

		return "September"
	} else if (month === 10) {

		return "October"
	} else if (month === 11) {

		return "November"
	} else if (month === 12) {

		return "December"
	}

}
export const homeDataReducer = (state, action) => {

	switch (action.type) {

		case homeDataConstants.DATA_TOUR_POINTS_GET_SUCCESS:

			
			prodCpy = { ...state };

			prodCpy.toursWithPoints.toursWithPoints = action.data;
			return prodCpy;



		case homeDataConstants.DATA_TOUR_POINTS_GET_FAILURE:

			return {
				...state,
				toursWithPoints: {
					toursWithPoints: []
				},
			};


		case homeDataConstants.PREVIOUS_DATA_GET_SUCCESS:



			var arrReports = []
			for (var report of action.data) {
				if (report.from.length === 5) {
					var monthNum = report.from.charAt(0)
					monthNum = parseInt(monthNum) + 1
					var month = convertMonth(monthNum)
					var year = report.from.substring(1, 5)
					var count = report.count
					var obj = { count, month, year }
					arrReports.push(obj)
				} else {
					var monthNum = report.from.substring(0, 1)
					monthNum = parseInt(monthNum) + 1
					var month = convertMonth(monthNum)
					var year = report.from.substring(2, 6)
					var count = report.count
					var obj = { count, month, year }
					arrReports.push(obj)
				}
			}

			return {
				...state,
				previousReports: {
					reports: arrReports,
					showModal: true,
				},
			};

		case homeDataConstants.PREVIOUS_DATA_GET_FAILURE:

			return {
				...state,
				previousReports: {
					reports: []
				},
			};



		case homeDataConstants.SHOW_MODAL:
			return {
				...state,
				previousReports: {
					showModal: true,
					id: action.data
				}

			};


		case homeDataConstants.HIDE_MODAL:
			return {
				...state,
				previousReports: {
					showModal: false,
					reports: [],
					id: "",
				}



			};

		case homeDataConstants.SHOW_TERMS_AND_CONDITIONS_MODAL:

			prodCpy = { ...state };

			prodCpy.termsAndConditionsModal.show = true;
			return prodCpy;


		case homeDataConstants.HIDE_TERMS_AND_CONDITIONS_MODAL:
			return {
				...state,
				termsAndConditionsModal: {
					show: false,
				}



			};


		case homeDataConstants.SHOW_ADD_MENU_MODAL:


			return {
				...state,
				id: action.data,
				showEditMenuModal: true

			};


		case homeDataConstants.HIDE_ADD_MENU_MODAL:
			return {
				...state,
				id: "",

				showEditMenuModal: false



			};

		


		

		case homeDataConstants.SHOW_UPDATE_LOGO_MODAL:


			return {
				...state,
				showEditLogoModal: true

			};


		case homeDataConstants.HIDE_UPDATE_LOGO_MODAL:
			return {
				...state,

				showEditLogoModal: false



			};

		case homeDataConstants.SHOW_CHANGE_LOCK_CODE_MODAL:


			return {
				...state,
				showEditLockCodeModal: true

			};


		case homeDataConstants.HIDE_CHANGE_LOCK_CODE_MODAL:
			return {
				...state,

				showEditLockCodeModal: false



			};


		case homeDataConstants.SHOW_ADD_MODAL:
			return {
				...state,
				showModal: true

			};


		case homeDataConstants.HIDE_ADD_MODAL:
			return {
				...state,
				showModal: false



			};
		case homeDataConstants.LOCK_CHANGE_SUCCESS:
			prodCpy = { ...state };
			prodCpy.showEditLockCodeModal = false;
			prodCpy.modalData.success = true;
			prodCpy.modalData.failure = false;
			prodCpy.modalData.text = "You have successfully changed lock code.";
			return prodCpy;


		case homeDataConstants.LOCK_CHANGE_FAILURE:

			return {
				...state,
				showEditLockCodeModal: false,
				modalData: {

					success: true,
					failure: false,
					text: "There has been error while changing lock code. Please try again later.",
				},

			};
		case homeDataConstants.DELETE_TOUR_SUCCESS:

			return {
				...state,

				modalData: {

					success: true,
					failure: false,
					text: "You have successfully deleted tour.",
				},

			};

		case homeDataConstants.DELETE_TOUR_FAILURE:

			return {
				...state,

				modalData: {
					success: false,
					failure: true,
					text: "Error while deleting tour. Please try again later.",
				},

			};


		case homeDataConstants.DELETE_POI_SUCCESS:

			return {
				...state,

				modalData: {

					success: true,
					failure: false,
					text: "You have successfully deleted point.",
				},

			};

		case homeDataConstants.DELETE_POI_FAILURE:

			return {
				...state,

				modalData: {
					success: false,
					failure: true,
					text: "Error while deleting point. Please try again later.",
				},

			};

		case homeDataConstants.TOUR_SUBMIT_SUCCESS:

			return {
				...state,

				modalData: {

					success: true,
					failure: false,
					text: "You have successfully added new tour.",
				},

			};

		case homeDataConstants.TOUR_SUBMIT_FAILURE:

			return {
				...state,

				modalData: {
					success: false,
					failure: true,
					text: "Error while adding new tour. Please try again later.",
				},

			};

		case homeDataConstants.PARTNER_SUBMIT_SUCCESS:
			prodCpy.showAddPartnerModal.show = false;
			prodCpy.modalData.success = true;
			prodCpy.modalData.text = "You have successfully added new partner.";
			return prodCpy;


		case homeDataConstants.PARTNER_SUBMIT_FAILURE:

			return {
				...state,

				modalData: {
					success: false,
					failure: true,
					text: "Error while adding new partner. Please try again later.",
				},

			};


		case homeDataConstants.TOUR_UPDATE_SUCCESS:

			
			prodCpy = { ...state };

			prodCpy.updateTourData.show = false;
			prodCpy.modalData.success = true;
			prodCpy.modalData.text = "You have successfully updated tour.";
			return prodCpy;


		case homeDataConstants.TOUR_UPDATE_FAILURE:


			return {
				...state,

				modalData: {
					success: false,
					failure: true,
					text: "Error while updating tour. Please try again later.",
				},

			};

		case homeDataConstants.UPDATE_MENU_PHOTO_SUCCESS:


			console.log("fjsfjd")
			return {
				...state,
				showEditMenuModal: false,
				modalData: {
					success: true,
					failure: false,
					text: "You have successfully updated menu photo.",
				},

			};

		case homeDataConstants.UPDATE_MENU_PHOTO_FAILURE:


			return {
				...state,
				showEditMenuModal: false,
				modalData: {
					success: false,
					failure: true,
					text: "Error while updating menu photo. Please try again later.",
				},

			};


		case homeDataConstants.HIDE_EDIT_LOGO_MODAL:


			return {
				...state,

				showEditLogoModal: false,


			};

		case homeDataConstants.UPDATE_LOGO_PHOTO_SUCCESS:


			return {
				...state,

				showEditLogoModal: false,
				modalData: {
					success: true,
					failure: false,
					text: "You have successfully updated logo photo.",
				},

			};

		case homeDataConstants.UPDATE_LOGO_PHOTO_FAILURE:


			return {
				...state,
				showEditLogoModal: false,
				modalData: {
					success: false,
					failure: true,
					text: "Error while updating logo photo. Please try again later.",
				},

			};

		case homeDataConstants.POI_UPDATE_SUCCESS:


			prodCpy = { ...state };

			//prodCpy.toursWithPoints.toursWithPoints = action.data;//array;
			prodCpy.modalData.success = true;
			prodCpy.modalData.text = "You have successfully updated partners data.";


			return prodCpy;

		case homeDataConstants.POI_UPDATE_FAILURE:


			prodCpy = { ...state };


			prodCpy.toursWithPoints.toursWithPoints = [];
			prodCpy.modalData.failure = true;
			prodCpy.modalData.text = "Error while updating data. Please try again later.";

			return prodCpy;

		case homeDataConstants.HIDE_SUCCESS_FAILURE_MODAL:
			prodCpy = { ...state };
			prodCpy.updatePointData.show = false;
			prodCpy.modalData.success = false;
			prodCpy.modalData.failure = false;
			prodCpy.modalData.text = "";

			return prodCpy;




		case homeDataConstants.SHOW_ADD_PARTNER_MODAL:

			return {
				...state,
				showAddPartnerModal: {
					show: true,
					id: action.id,
					bpartnerId: action.bpartnerId
				}

			};

		case homeDataConstants.HIDE_ADD_PARTNER_MODAL:
			return {
				...state,
				showAddPartnerModal: {
					show: false,
					id: ""
				}

			};

		case homeDataConstants.GET_BPARTNERS_SUCCESS:
			prodCpy = { ...state };

		

			prodCpy.bpartners.bpartners = action.data;

			return prodCpy;



		case homeDataConstants.GET_BPARTNERS_FAILURE:
			return {
				...state,
				bpartners: {
					bpartners: [],
				}

			};


		case homeDataConstants.CONFIRMATION_FAILURE:
			return {
				...state,
				notConfirmed: true

			};

		case homeDataConstants.INSERT_DATA_SUCCESS:

			prodCpy = { ...state };


			prodCpy.modalData.success = true;
			prodCpy.modalData.failure = false;
			prodCpy.modalData.text = "You have successfully added new data.";

			return prodCpy;


		case homeDataConstants.INSERT_DATA_FAILURE:

			return {
				...state,

				modalData: {
					success: false,
					failure: true,
					text: "Error while adding new data. Please try again later.",
				},

			};
		case homeDataConstants.UPDATE_TOUR_DATA_MODAL_SHOW:

			prodCpy = { ...state };

			prodCpy.updateTourData.show = true;
			prodCpy.updateTourData.tour = action.tour;

			return prodCpy;

		case homeDataConstants.UPDATE_TOUR_DATA_MODAL_CLOSE:

			return {
				...state,
				updateTourData: {
					show: false,

				},
			};

		case homeDataConstants.UPDATE_POINT_DATA_MODAL_SHOW:

			prodCpy = { ...state };

			prodCpy.updatePointData.show = true;
			prodCpy.updatePointData.point = action.point.point;

			return prodCpy;

		case homeDataConstants.UPDATE_POINT_DATA_MODAL_CLOSE:

			return {
				...state,
				updatePointData: {
					show: false,

				},
			};

		case homeDataConstants.GET_TERMS_AND_CONSITIONS_REQUEST:


			return {
				...state,
				termsAndConsitions: ""

			};


		case homeDataConstants.GET_TERMS_AND_CONSITIONS_SUCCESS:
			return {
				...state,

				termsAndConsitions: action.data



			};


		case homeDataConstants.GET_TERMS_AND_CONSITIONS_FAILURE:
			return {
				...state,
				termsAndConsitions: ""

			};

	case homeDataConstants.GET_QRCODES_SUCCESS:
		return {
			...state,
			qrCodes: action.data,

		};

	case homeDataConstants.GET_QRCODES_FAILURE:
		return {
			...state,
			qrCodes: []

		};

		case homeDataConstants.SHOW_ADD_QR_CODE_MODAL:
			return {
				...state,
				generateQrCodeModalShow: true

			};

		case homeDataConstants.CONFIRMATION_SUCCESS:
			return {
				...state,
				confirmed: true

			};

				case homeDataConstants.GENERATE_QRCODE_SUCCESS:
			
			
				prodCpy = { ...state };

			prodCpy.qrCode = action.data;
			prodCpy.qr = action.data.qrcode;
			prodCpy.generateQrCodeModalShow = true;

			return prodCpy;


		case homeDataConstants.GENERATE_QRCODE_FAILURE:
			return {
				...state,
				qrCode: null

			};

			case homeDataConstants.CHANGE_LOCK_CODE_SUCCESS:

				return {
					...state,
	
					showEditLockCodeModal:false,
					modalData: {
						success: true,
						failure: false,
						text: "You have successfully changed lock code",
					},
	
				};
		
			case homeDataConstants.CHANGE_LOCK_CODE_FAILURE:
				return {
					...state,
	
					modalData: {
						success: false,
						failure: true,
						text: "Error while changing lock code. Please try again later.",
					},
	
				};

		default:
			return state;
	}
};
