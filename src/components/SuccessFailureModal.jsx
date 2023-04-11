import React, { useContext, useState, useEffect, useRef } from "react";
import { businessPartnersConstants } from "../constants/BusinessPartnersConstants";
import { BusinessPartnersContext } from "../contexts/BusinessPartnersContext";


const SuccessFailureModal = () => {

	const { businessPartnersState, dispatch } = useContext(BusinessPartnersContext);



	const handleClose = () => {
		dispatch({ type: businessPartnersConstants.BUSINESS_PARTNER_SUCCESS_FAILURE_HIDE });
	};


	return (


		<div>
			{ businessPartnersState.modalData.show && <div class="overlay" >
				<div id="myModal" class="modal" style={{ background: "white", height: "300px", width: "900px" }}>

					<h2>
					{businessPartnersState.modalData.title}</h2>
					{businessPartnersState.modalData.text}

					<div class="button-login">

						<button
							type="button"
							style={{ background: "#0099ff", marginTop: "px", marginRight: "55px", padding: "5px 15px", height: "35px" }}
							onClick={handleClose}
							class="btn btn-primary btn-lg"
						>
							OK
						</button>
					</div>
				</div>
			</div>}
		</div>
	);
};

export default SuccessFailureModal;
