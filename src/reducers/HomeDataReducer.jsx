import { InfoSharp } from "@mui/icons-material";
import { homeDataConstants } from "../constants/HomeDataConstants";

var prodCpy = {};
function convertMonth(month) {
	if (month == 1) {

		return "January"

	} else if (month == 2) {

		return "February"
	} else if (month == 3) {

		return "March"
	} else if (month == 4) {

		return "April"

	} else if (month == 5) {

		return "May"
	} else if (month == 6) {

		return "June"
	} else if (month == 7) {

		return "July"
	} else if (month == 8) {

		return "August"
	} else if (month == 9) {

		return "September"
	} else if (month == 10) {

		return "October"
	} else if (month == 11) {

		return "November"
	} else if (month == 12) {

		return "December"
	}

}
export const homeDataReducer = (state, action) => {

	switch (action.type) {

		/*case homeDataConstants.DATA_GET_SUCCESS:



			var array = []
			var tour = {
				tourId: "446a706b-baa6-4feb-bc0b-0bcd9b2d2e0b",
				tourName: "Foodie tour Ljubljana",
				tourPrice: "49€ withouth tax",
				noOfRidesAMonth: 2
			}
			var tour2 = {
				tourId: "446a706b-baa6-4feb-bc0b-0bcd9b2d2e0a",
				tourName: "Second tour Ljubljana",
				tourPrice: "62€ withouth tax",
				noOfRidesAMonth: 5
			}

			array.push(tour)
			array.push(tour2)
			return {
				...state,
				tours: {
					tours: action.data
					//tours: array
				},
			};

		case homeDataConstants.DATA_GET_FAILURE:

			return {
				...state,
				tours: {
					tours: []
				},
			};
*/
		case homeDataConstants.DATA_TOUR_POINTS_GET_SUCCESS:

		console.log("cskjbcjsbjhsbf")
			var array = []
			var points = []
			var points2 = []
			var point1 = {
				monthlyUsed: 0,
				point: {
					bpartnerId: "bec8f5a0-1580-48f1-a9c5-d8347b729aba",
					contact: {
						email: "info@klobasarna.si",
						name: "Name",
						phone: "0038651605017",
						webURL: "https://www.klobasarna.si/"
					},
					id: "0c4d2a86-9083-42ee-ad4f-4c3665ff0823",
					offerName: "half of a sausage",
					price: "2.8€ withouth tax",
					title: {
						en: "Klobasarna"
					}
				}
			}

			var point2 = {
				monthlyUsed: 0,
				point: {
					bpartnerId: "bec8f5a0-1580-48f1-a9c5-d8347b729aba",
					contact: {
						email: "info@struklji.si",
						name: "Name",
						phone: "0038651605017",
						webURL: "https://www.struklji.si/"
					},
					id: "5932de05-740e-477c-b1ec-b19b845acf0a",
					offerName: "half of a sausage",
					price: "2.8€ withouth tax",
					title: {
						en: "Struklji"
					}
				}
			}

			var point3 = {
				monthlyUsed: 0,
				point: {
					bpartnerId: "bec8f5a0-1580-48f1-a9c5-d8347b729aba",
					contact: {
						email: "info@daktari.si",
						name: "Name",
						phone: "0038651605017",
						webURL: "https://www.daktari.si/"
					},
					id: "0b487422-1b2b-4ee0-9df1-9dc5d34c90cb",
					offerName: "half of a sausage",
					price: "2.8€ withouth tax",
					title: {
						en: "Daktari"
					}
				}
			}

			var point4 = {
				monthlyUsed: 0,
				point: {
					bpartnerId: "bec8f5a0-1580-48f1-a9c5-d8347b729aba",
					contact: {
						email: "info@point4.si",
						name: "Name",
						phone: "0038651605017",
						webURL: "https://www.point4.si/"
					},
					id: "0c4d2a86-9083-42ee-ad4f-4c3665ff0824",
					offerName: "half of a sausage",
					price: "2.8€ withouth tax",
					title: {
						en: "Point4"
					}
				}
			}

			var point5 = {
				monthlyUsed: 0,
				point: {
					bpartnerId: "bec8f5a0-1580-48f1-a9c5-d8347b729aba",
					contact: {
						email: "info@point5.si",
						name: "Name",
						phone: "0038651605017",
						webURL: "https://www.point5.si/"
					},
					id: "0c4d2a86-9083-42ee-ad4f-4c3665ff0825",
					offerName: "half of a sausage",
					price: "2.8€ withouth tax",
					title: {
						en: "Point 5"
					}
				}
			}



			points.push(point1)
			points.push(point2)
			points.push(point3)

			points2.push(point4)
			points2.push(point5)

			var tour = {
				tourId: "446a706b-baa6-4feb-bc0b-0bcd9b2d2e0b",
				tourName: "Foodie tour Ljubljana",
				tourPrice: "49€ withouth tax",
				noOfRidesAMonth: 2,
				points: points
			}
			var tour2 = {
				tourId: "446a706b-baa6-4feb-bc0b-0bcd9b2d2e0a",
				tourName: "Second tour Ljubljana",
				tourPrice: "62€ withouth tax",
				noOfRidesAMonth: 5,
				points: points2
			}

			array.push(tour)
			array.push(tour2)

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


			var array = []
			var item = {
				from: "32019",
				count: 2
			}
			var item2 = {
				from: "02022",
				count: 5
			}

			array.push(item)
			array.push(item2)

			var arrReports = []
			for (var report of action.data) {
				if (report.from.length == 5) {
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

			return {
				...state,

				modalData: {
					success: true,
					failure: false,
					text: "You have successfully added new partner.",
				},

			};

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

			/*	var array = []
				var tour = {
					tourId: "446a706b-baa6-4feb-bc0b-0bcd9b2d2e0b",
					tourName: "Blablaaaaaaa",
					tourPrice: "49€ withouth tax",
					noOfRidesAMonth: 2
				}
				var tour2 = {
					tourId: "446a706b-baa6-4feb-bc0b-0bcd9b2d2e0a",
					tourName: "Blablaaaaddfsdfsdfsffaaa",
					tourPrice: "62€ withouth tax",
					noOfRidesAMonth: 5
				}
	
				array.push(tour)
				array.push(tour2)
	
	*/

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


			//console.log(action.data)
			return {
				...state,

				modalData: {
					success: true,
					failure: false,
					text: "You have successfully updated menu photo.",
				},

			};

		case homeDataConstants.UPDATE_MENU_PHOTO_FAILURE:


			return {
				...state,

				modalData: {
					success: false,
					failure: true,
					text: "Error while updating menu photo. Please try again later.",
				},

			};

		case homeDataConstants.POI_UPDATE_SUCCESS:


			var array = []
			var points = []
			var points2 = []
			var point1 = {
				monthlyUsed: 0,
				point: {
					bpartnerId: "bec8f5a0-1580-48f1-a9c5-d8347b729aba",
					contact: {
						email: "info@klobasarna.si",
						name: "Name",
						phone: "0038651605017",
						webURL: "https://www.klobasarna.si/"
					},
					id: "0c4d2a86-9083-42ee-ad4f-4c3665ff0823",
					offerName: "half of a sausage",
					price: "2.8€ withouth tax",
					title: {
						en: "Klobasarna2"
					}
				}
			}

			var point2 = {
				monthlyUsed: 0,
				point: {
					bpartnerId: "bec8f5a0-1580-48f1-a9c5-d8347b729aba",
					contact: {
						email: "info@struklji.si",
						name: "Name",
						phone: "0038651605017",
						webURL: "https://www.struklji.si/"
					},
					id: "5932de05-740e-477c-b1ec-b19b845acf0a",
					offerName: "half of a sausage",
					price: "2.8€ withouth tax",
					title: {
						en: "Struklji2"
					}
				}
			}

			var point3 = {
				monthlyUsed: 0,
				point: {
					bpartnerId: "bec8f5a0-1580-48f1-a9c5-d8347b729aba",
					contact: {
						email: "info@daktari.si",
						name: "Name",
						phone: "0038651605017",
						webURL: "https://www.daktari.si/"
					},
					id: "0b487422-1b2b-4ee0-9df1-9dc5d34c90cb",
					offerName: "half of a sausage",
					price: "2.8€ withouth tax",
					title: {
						en: "Daktari2"
					}
				}
			}

			var point4 = {
				monthlyUsed: 0,
				point: {
					bpartnerId: "bec8f5a0-1580-48f1-a9c5-d8347b729aba",
					contact: {
						email: "info@point4.si",
						name: "Name",
						phone: "0038651605017",
						webURL: "https://www.point4.si/"
					},
					id: "0c4d2a86-9083-42ee-ad4f-4c3665ff0824",
					offerName: "half of a sausage",
					price: "2.8€ withouth tax",
					title: {
						en: "Point42"
					}
				}
			}

			var point5 = {
				monthlyUsed: 0,
				point: {
					bpartnerId: "bec8f5a0-1580-48f1-a9c5-d8347b729aba",
					contact: {
						email: "info@point5.si",
						name: "Name",
						phone: "0038651605017",
						webURL: "https://www.point5.si/"
					},
					id: "0c4d2a86-9083-42ee-ad4f-4c3665ff0825",
					offerName: "half of a sausage",
					price: "2.8€ withouth tax",
					title: {
						en: "Point 52"
					}
				}
			}



			points.push(point1)
			points.push(point2)
			points.push(point3)

			points2.push(point4)
			points2.push(point5)

			var tour = {
				tourId: "446a706b-baa6-4feb-bc0b-0bcd9b2d2e0b",
				tourName: "Foodie tour Ljubljana",
				tourPrice: "49€ withouth tax",
				noOfRidesAMonth: 2,
				points: points
			}
			var tour2 = {
				tourId: "446a706b-baa6-4feb-bc0b-0bcd9b2d2e0a",
				tourName: "Second tour Ljubljana",
				tourPrice: "62€ withouth tax",
				noOfRidesAMonth: 5,
				points: points2
			}

			array.push(tour)
			array.push(tour2)


			prodCpy = { ...state };

			console.log(action.data)
			prodCpy.toursWithPoints.toursWithPoints = action.data;//array;
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

			prodCpy.modalData.success = false;
			prodCpy.modalData.failure = false;
			prodCpy.modalData.text = "";

			return prodCpy;


		case homeDataConstants.SHOW_ADD_PARTNER_MODAL:

			return {
				...state,
				showAddPartnerModal: {
					show: true,
					id: action.id
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

			case homeDataConstants.INSERT_DATA_SUCCESS:

			return {
				...state,

				modalData: {
					success: true,
					failure: false,
					text: "You have successfully added new data.",
				},

			};

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

			console.log(action.tour)
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

		default:
			return state;
	}
};
