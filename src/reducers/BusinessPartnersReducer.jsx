
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

			

			prodCpy.bpartners.bpartners = action.data;

			return prodCpy;



		case businessPartnersConstants.GET_BPARTNERS_FAILURE:
			return {
				...state,
				bpartners: {
					bpartners: [],
				}

			};

		case businessPartnersConstants.UPDATE_BPARTNER_DATA_MODAL_SHOW:

			
			return {
				...state,

				updateBPartner: {
					show: true,
					bpartner: action.bpartner
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

		


		case businessPartnersConstants.BUSINESS_PARTNER_DELETE_FAILURE:


			prodCpy = { ...state };
			prodCpy.updateBPartner.show = false;
			prodCpy.modalData.show = true;
			prodCpy.modalData.title = "Failure";
			prodCpy.modalData.text = "You are unable to delete business partner. Please try again later";
			return prodCpy;

			case businessPartnersConstants.BUSINESS_PARTNER_SUCCESS_FAILURE_HIDE:


			prodCpy = { ...state };
			prodCpy.modalData.show = false;
			prodCpy.modalData.title = "";
			prodCpy.modalData.text = "";
			return prodCpy;


			case businessPartnersConstants.BUSINESS_PARTNER_DELETE_SUCCESS:

			prodCpy = { ...state };

			prodCpy.bpartners.bpartners = action.data;
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
