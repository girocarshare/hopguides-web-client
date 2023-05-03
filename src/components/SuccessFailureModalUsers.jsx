import React, { useContext, useState, useEffect, useRef } from "react";
import { userConstants } from "../constants/UserConstants";
import { UserContext } from "../contexts/UserContext";


const SuccessFailureModalUsers = () => {

	const { userState, dispatch } = useContext(UserContext);



	const handleClose = () => {
		dispatch({ type: userConstants.USER_SUCCESS_FAILURE_HIDE });
	};


	return (


		<div>
			{ userState.modalData.show && <div class="overlay" >
				<div id="myModal" class="modal" style={{ background: "white", height: "300px", width: "900px" }}>

					<h2>
					{userState.modalData.title}</h2>
					{userState.modalData.text}

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

export default SuccessFailureModalUsers;
