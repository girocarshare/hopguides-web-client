import React, {useContext, useState, useEffect, useRef} from "react";
import {homeDataConstants} from "../constants/HomeDataConstants";
import {HomeDataContext} from "../contexts/HomeDataContext";
import {AiOutlineClose} from 'react-icons/ai';


const SuccessFailureModalAfterInsert = () => {

	const {homeDataState, dispatch} = useContext(HomeDataContext);


		const handleClose = () => {
			window.location.href = "/#/"
		};


		return (

			<div>
				{homeDataState.modalData.successInsert &&

				<div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">

				<div class="modal-overlay"></div>

				<div class="fixed inset-0 z-10 overflow-y-auto">

					<div class="modal-frame">

						<div id="myModal" class="modal modal--sm">

								<div class="modal__header">
									<h2 class="text-leading">
									{homeDataState.modalData.title}
									</h2>
									<button class="button button--circle button--clear justify-self-end" type="button"
										onClick={handleClose}>
										<AiOutlineClose />
									</button>
								</div>
								<div class="modal__body">
								{homeDataState.modalData.text}
								</div>


							</div>
						</div>
					</div>
				</div>}
		</div>
	);
};

export default SuccessFailureModalAfterInsert;
