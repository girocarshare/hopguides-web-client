
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

			var array = []
			var points = []
			var points2 = []

			var point1 = {
				monthlyUsed: 0,
				point: {
					id: "50712ef7-8123-4c88-a0c6-5ac92c0caf58",
					audio: "https://hopguides.s3.amazonaws.com/tours/UELc4rwB6v.mp3",
					bpartnerId: "b95afd04-cd69-4d6e-939c-c4b40aff2c6f",
					category: "EATS",
					contact: {
						phone: "652610775",
						name: "Luna Zivkovic",
						email: "lunazivkovic@gmail.com",
						webURL: "/"
					},
					workingHours: {
						monday: {
							from: "",
							to: ""
						},
						tuesday: {
							from: "",
							to: ""
						},
						wednesday: {
							from: "",
							to: ""
						},
						thursday: {
							from: "",
							to: ""
						},
						friday: {
							from: "",
							to: ""
						},
						saturday: {
							from: "",
							to: ""
						},
						sunday: {
							from: "",
							to: ""
						}
					},
					images: [],
					location: {

						latitude: "44",
						longitude: "33"
					},
					name: {
						english: "title",
						slovenian: "Naslov",
					},
					shortInfo: {
						english: "This is a short description",
						slovenian: "To je kratki opis",
					},
					longInfo: {
						english: "This is a long description",
						slovenian: "To je dolg opis"

					},
					offerName: "Offer",
					price: "44",
					partner: true

				}
			}
			points.push(point1)


			var tour = {
				tourId: "446a706b-baa6-4feb-bc0b-0bcd9b2d2e0b",
				title: {
					english: "this is title",
					slovenian: "to je naslov",
				},
				shortInfo: {
					english: "Cerkno is a tiny town located in the west of Slovenia. It is a great destination for outdoor activities like skiing and mountain biking, as well as for exploring the local culture and heritage.",
					slovenian: "Cerkno je majhno mesto, ki se nahaja na zahodu Slovenije. Je odlična destinacija za aktivnosti na prostem, kot so smučanje in gorsko kolesarjenje, ter za raziskovanje lokalne kulture in dediščine.",
				},
				longInfo: {
					english: "Cerkno is a small town in northwestern Slovenia. It is known for its Alpine mountains, pristine valleys, and unspoiled nature. The snow-covered Jalovec mountain range and the Cerknica Plain provide a unique backdrop to the town. Beside wonderful nature, the town offers a range of cultural and historical sites. Here you can see some interesting architecture, such as the Cerkno Museum and the first Slovenian Chapel. You can also explore the many local churches in the area such as the Church of St. Leonard or the Parish Church of St. Martin. In addition, the town has some great restaurants and pubs where you can enjoy traditional Slovenian food. During your visit, don't forget to explore the surrounding area, which includes the Logar Valley, the Krvavec Ski Area, and the Škofja Loka region.",
					slovenian: "Cerkno je majhno mesto v Severni Sloveniji. Znano je po svojih alpskih gorah, čistih dolinah in nedotaknjeni naravi. Snopkopana planina Jalovec in Cerkniška kotlina ponujata edinstveno ozadje mestu. Ob čudoviti naravi ponuja tudi mesto različne kulturne in zgodovinske znamenitosti. Tu lahko vidite zanimivo arhitekturo, kot so Cerkniški muzej in prva slovenska kapela. Poleg tega lahko obiskovalci raziščejo množico lokalnih cerkva, kot so cerkvica sv. Leona ali župnijska cerkev sv. Martina. Poleg tega ima mesto tudi odlične restavracije in kavarne, kjer lahko uživate v tradicionalni slovenski hrani. Med obiskom ne pozabite obiskati tudi okolja, ki obsega Logarsko dolino, smučišče Krvavec in Škofjo Loko regijo.",
				},
				currency: "$",
				price: "89",
				image: "https://hopguides.s3.amazonaws.com/tours/fVPDcUI2IM.jpg",
				audio: "https://hopguides.s3.amazonaws.com/tours/HjY9cHXL4K.mp3",
				duration: "50",
				length: "50",
				highestPoint: "50",
				agreementTitle: {
					english: "this is agreement title",
					slovenian: "to je naslov pogodbe",
				},
				agreementDesc: {
					english: "this is description",
					slovenian: "to je opis",
				},
				termsAndConditions: "Ovo je tekst",
				noOfRidesAMonth: 8,
				bpartnerId: "b95afd04-cd69-4d6e-939c-c4b40aff2c6f",
				points: points
			}

			array.push(tour)
			prodCpy = { ...state };

			prodCpy.toursWithPoints.toursWithPoints = array//action.data;
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
			for (var report of array/*action.data*/) {
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

			var array = []
			var bpartner = {
				id: "446a706b-baa6-4feb-bc0b-0bcd9b2d2e0b",
				name: "Business Partner Name One"
			}
			var bpartner2 = {
				id: "446a706b-baa6-4feb-bc0b-0bcd9b2d2e0a",
				name: "Business Partner Name Two"
			}

			array.push(bpartner)
			array.push(bpartner2)

			prodCpy.bpartners.bpartners = array//action.data;

			return prodCpy;



		case homeDataConstants.GET_BPARTNERS_FAILURE:
			return {
				...state,
				bpartners: {
					bpartners: [],
				}

			};


		case homeDataConstants.INSERT_DATA_SUCCESS:

			prodCpy = { ...state };


			prodCpy.modalData.success = true;
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

			console.log(action.point.point)
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

				termsAndConsitions: "These are terms and conditions"//action.data



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

		case homeDataConstants.CONFIRMATION_FAILURE:
			return {
				...state,
				notConfirmed: true

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





		default:
			return state;
	}
};
