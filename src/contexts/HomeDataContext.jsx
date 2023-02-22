import React, { createContext, useReducer } from "react";
import { homeDataReducer } from "../reducers/HomeDataReducer";

export const HomeDataContext = createContext();

const HomeDataContextProvider = (props) => {

	const [homeDataState, dispatch] = useReducer(homeDataReducer, {

	
		report: {
			pointId: "",
			monthlyUsedCoupons: 0,
			name: "",
			bpartnerName : "",
			bpartnerEmail: "",
			bpratnerPhone: "",
			showModal: false,
		},

		showModal: false,
		
		showEditMenuModal: false,

		id: "",
		tours: {
			tours: null
		},

		toursWithPoints: {
			toursWithPoints: [],
			success: false,
			failure: false,
		},

		previousReports: {
			reports: [],
			id: "",
			showModal: false,
		},


		modalData: {
			success: false,
			failure: false,
			text: "",
		},
	});

	return <HomeDataContext.Provider value={{ homeDataState, dispatch }}>{props.children}</HomeDataContext.Provider>;
};

export default HomeDataContextProvider;
