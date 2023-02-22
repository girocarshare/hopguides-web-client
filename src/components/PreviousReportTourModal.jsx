import { useContext, useState, useEffect,useRef, React } from "react";

import { Modal } from "react-bootstrap";
import { homeDataConstants } from "../constants/HomeDataConstants";
import { HomeDataContext } from "../contexts/HomeDataContext";
import PreviousReportTourForm from "./PreviousReportTourForm";

import { homeDataService } from "../services/HomeDataService";
const PreviousReportTourModal = () => {
	
	const { homeDataState, dispatch } = useContext(HomeDataContext);
	const handleModalClose = () => {
		dispatch({ type: homeDataConstants.HIDE_MODAL});
	};
 
	return (
	
		<Modal
		show={homeDataState.previousReports.showModal} aria-labelledby="contained-modal-title-vcenter" class="modal-dialog modal-lg" centered onHide={handleModalClose} size="lg">

		<Modal.Header closeButton>
			<Modal.Title id="contained-modal-title-vcenter">
				<big>Previous resports</big>
			</Modal.Title>
		</Modal.Header>
		<Modal.Body>

		<PreviousReportTourForm
				homeDataState = {homeDataState}
				dispatch = {dispatch}/>
	</Modal.Body >
			<Modal.Footer>
			</Modal.Footer>


		</Modal>
	);
};

export default PreviousReportTourModal;
