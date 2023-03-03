import React, { useContext, useState, useEffect, useRef } from "react";

import { Modal } from "react-bootstrap";
import { homeDataConstants } from "../constants/HomeDataConstants";
import { HomeDataContext } from "../contexts/HomeDataContext";


var url = process.env.REACT_APP_URL || "http://localhost:3000/";

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
  };
  
const SuccessModal = () => {

	const { homeDataState, dispatch } = useContext(HomeDataContext);


	
	const handleClose = () => {
		dispatch({ type: homeDataConstants.HIDE_SUCCESS_FAILURE_MODAL });
	  };


	return (
		<Modal
		show={homeDataState.modalData.failure} aria-labelledby="contained-modal-title-vcenter" class="modal-dialog modal-lg" centered onHide={handleClose} size="lg">

		<Modal.Header closeButton>
			<Modal.Title id="contained-modal-title-vcenter">
				<big>Error</big>
			</Modal.Title>
		</Modal.Header>
		<Modal.Body>
		{homeDataState.modalData.text}

		</Modal.Body >
			<Modal.Footer>
			</Modal.Footer>
		</Modal>
	);
};

export default SuccessModal;
