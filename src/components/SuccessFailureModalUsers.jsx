import React, { useContext, useState, useEffect, useRef } from "react";
import { userConstants } from "../constants/UserConstants";
import { UserContext } from "../contexts/UserContext";

import { AiOutlineClose } from 'react-icons/ai';

const SuccessFailureModalUsers = () => {

	const { userState, dispatch } = useContext(UserContext);



	const handleClose = () => {
		dispatch({ type: userConstants.USER_SUCCESS_FAILURE_HIDE });
	};

	return (

		<div>

{userState.modalData.show &&
	<div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">

	<div class="modal-overlay"></div>

	<div class="fixed inset-0 z-10 overflow-y-auto">

		<div class="modal-frame">

							<div id="myModal" class="modal modal--md">

								<div class="modal__header">
									<h2 class="text-leading">
										{userState.modalData.title}
									</h2>
									<button class="button button--circle button--clear justify-self-end" type="button"
										onClick={handleClose}>
										<AiOutlineClose />
									</button>
								</div>

								<div class="modal__body">
									<div class="overlay" >
										<div id="myModal" class="modal" style={{ background: "white", height: "300px", width: "900px" }}>


											{userState.modalData.text}


										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
		</div>}
		</div>
	);
};

export default SuccessFailureModalUsers;
