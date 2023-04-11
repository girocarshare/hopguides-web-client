import { InfoSharp } from "@mui/icons-material";
import { businessPartnersConstants } from "../constants/BusinessPartnersConstants";

var prodCpy = {};
export const businessPartnersReducer = (state, action) => {

	switch (action.type) {



		case businessPartnersConstants.GET_BPARTNERS_REQUEST:
			prodCpy = { ...state };

			prodCpy.bpartners.bpartners = [];

			return prodCpy;

		case businessPartnersConstants.GET_BPARTNERS_SUCCESS:
			prodCpy = { ...state };

			var array = []
			var bpartner = {
				id: "446a706b-baa6-4feb-bc0b-0bcd9b2d2e0b",
				name: "Business Partner Name One",
				contact: {
					phone: "652610775",
					phone2: "652610775",
					email: "lunazivkovic@gmail.com",
					location: {
						street: "Pavla Simića 2"
					},
					webURL: "Luna Zivkovic"
				},

				userId: "d494f403-67d3-4be9-869c-b651bc5ac5ef",
				logo: "https://hopguides.s3.eu-central-1.amazonaws.com/logos/V2jkmGsvxo.jpg",
				dimensions: {
					width: "200",
					height: "40"
				},
				support: {
					english: "Title text",
					slovenian: "naslovno besedilo",
				},
				lockCode: "12312"

			}

			array.push(bpartner)

			prodCpy.bpartners.bpartners = array//action.data;

			return prodCpy;



		case businessPartnersConstants.GET_BPARTNERS_FAILURE:
			return {
				...state,
				bpartners: {
					bpartners: [],
				}

			};

		case businessPartnersConstants.UPDATE_BPARTNER_DATA_MODAL_SHOW:

			var bpartner = {
				id: "446a706b-baa6-4feb-bc0b-0bcd9b2d2e0b",
				name: "Business Partner Name One",
				contact: {
					phone: "652610775",
					phone2: "652610775",
					email: "lunazivkovic@gmail.com",
					location: {
						street: "Pavla Simića 2"
					},
					webURL: "Luna Zivkovic"
				},

				userId: "d494f403-67d3-4be9-869c-b651bc5ac5ef",
				logo: "https://hopguides.s3.eu-central-1.amazonaws.com/logos/V2jkmGsvxo.jpg",
				dimensions: {
					width: "200",
					height: "40"
				},
				support: {
					english: "Title text",
					slovenian: "naslovno besedilo",
				},
				lockCode: "12312"

			}

			return {
				...state,

				updateBPartner: {
					show: true,
					bpartner: bpartner//action.bpartner
				}



			};


		case businessPartnersConstants.UPDATE_BPARTNER_DATA_MODAL_HIDE:
			return {
				...state,
				updateBPartner: {
					show: false,
					bpartner: null
				}


			};

		case businessPartnersConstants.BUSINESS_PARTNER_UPDATE_SUCCESS:

			prodCpy = { ...state };

			prodCpy.updateBPartner.show = false;
			prodCpy.modalData.show = true;
			prodCpy.modalData.title = "Success";
			prodCpy.modalData.text = "You have successfully updated business partner.";
			return prodCpy;


		case businessPartnersConstants.BUSINESS_PARTNER_UPDATE_FAILURE:


			prodCpy = { ...state };
			prodCpy.updateBPartner.show = false;
			prodCpy.modalData.show = true;
			prodCpy.modalData.title = "Failure";
			prodCpy.modalData.text = "You are unable to update business partner. Please try again later";
			return prodCpy;

			case businessPartnersConstants.BUSINESS_PARTNER_SUCCESS_FAILURE_HIDE:


			prodCpy = { ...state };
			prodCpy.modalData.show = false;
			prodCpy.modalData.title = "";
			prodCpy.modalData.text = "";
			window.location.reload()
			return prodCpy;


			case businessPartnersConstants.BUSINESS_PARTNER_DELETE_SUCCESS:

			prodCpy = { ...state };

			prodCpy.modalData.show = true;
			prodCpy.modalData.title = "Success";
			prodCpy.modalData.text = "You have successfully deleted business partner.";
			return prodCpy;


		case businessPartnersConstants.BUSINESS_PARTNER_DELETE_FAILURE:


			prodCpy = { ...state };
			prodCpy.modalData.show = true;
			prodCpy.modalData.title = "Failure";
			prodCpy.modalData.text = "You are unable to delete business partner. Please try again later";
			return prodCpy;

		default:
			return state;
	}
};
