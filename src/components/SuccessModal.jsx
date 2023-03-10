import React, { useContext, useState, useEffect, useRef } from "react";
import { homeDataConstants } from "../constants/HomeDataConstants";
import { HomeDataContext } from "../contexts/HomeDataContext";



const SuccessModal = () => {

	const { homeDataState, dispatch } = useContext(HomeDataContext);



	const handleClose = () => {
		dispatch({ type: homeDataConstants.HIDE_SUCCESS_FAILURE_MODAL });
	};


	return (





		<div>
			{homeDataState.modalData.success && <div class="overlay" >
				<div id="myModal" class="modal" style={{ background: "white", height: "300px", width: "900px" }}>

					<h2>Success</h2>
					{homeDataState.modalData.text}

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

export default SuccessModal;
