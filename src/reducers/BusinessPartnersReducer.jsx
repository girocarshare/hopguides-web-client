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
	
				/*case homeDataConstants.BUSINESS_PARTNER_UPDATE_SUCCESS:

				/*prodCpy = { ...state };
	
				prodCpy.updateTourData.show = false;
				prodCpy.modalData.success = true;
				prodCpy.modalData.text = "You have successfully updated tour.";
				return prodCpy;
	
	
			case homeDataConstants.BUSINESS_PARTNER_UPDATE_FAILURE:
	
	
				/*return {
					...state,
	
					modalData: {
						success: false,
						failure: true,
						text: "Error while updating tour. Please try again later.",
					},
	
				};*/

		default:
			return state;
	}
};
