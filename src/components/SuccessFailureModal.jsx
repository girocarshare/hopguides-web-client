import React, { useContext, useState, useEffect, useRef } from "react";
import { businessPartnersConstants } from "../constants/BusinessPartnersConstants";
import { BusinessPartnersContext } from "../contexts/BusinessPartnersContext";
import {AiOutlineClose} from 'react-icons/ai';


const SuccessFailureModal = () => {

	const { businessPartnersState, dispatch } = useContext(BusinessPartnersContext);



	const handleClose = () => {
		dispatch({ type: businessPartnersConstants.BUSINESS_PARTNER_SUCCESS_FAILURE_HIDE });
	};

	return (

		<div>
			{businessPartnersState.modalData.show &&
				<div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">

				<div class="modal-overlay"></div>

				<div class="fixed inset-0 z-10 overflow-y-auto">

					<div class="modal-frame">

						<div id="myModal" class="modal modal--md">

								<div class="modal__header">
									<h2 class="text-leading">
										{businessPartnersState.modalData.title}
									</h2>
									<button class="button button--circle button--clear justify-self-end" type="button"
										onClick={handleClose}>
										<AiOutlineClose />
									</button>
								</div>
								<div class="modal__body">
									{businessPartnersState.modalData.text}
								</div>


							</div>
						</div>
					</div>
				</div>}
		</div>
	);
};

export default SuccessFailureModal;
