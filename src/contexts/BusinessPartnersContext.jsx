import React, { createContext, useReducer } from "react";
import { businessPartnersReducer } from "../reducers/BusinessPartnersReducer";

export const BusinessPartnersContext = createContext();

const BusinessPartnersContextProvider = (props) => {

	const [businessPartnersState, dispatch] = useReducer(businessPartnersReducer, {

		bpartners: {
			bpartners: [],
		},

		updateBPartner: {
			show: false,
			bpartner: null
		},

	});

	return <BusinessPartnersContext.Provider value={{ businessPartnersState, dispatch }}>{props.children}</BusinessPartnersContext.Provider>;
};

export default BusinessPartnersContextProvider;
