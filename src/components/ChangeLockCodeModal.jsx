import React, {useContext, useState, useEffect, useRef} from "react";
import {homeDataConstants} from "../constants/HomeDataConstants";
import {homeDataService} from "../services/HomeDataService";
import {HomeDataContext} from "../contexts/HomeDataContext";
import {AiOutlineClose} from 'react-icons/ai';

var url = process.env.REACT_APP_URL || "http://localhost:8080/";


const ChangeLockCodeModal = () => {

	const {homeDataState, dispatch} = useContext(HomeDataContext);
	const [errMessage, setErrMessage] = useState("");
	const [lockCode, setLockCode] = useState("");

	const handleModalClose = () => {
		dispatch({type: homeDataConstants.HIDE_CHANGE_LOCK_CODE_MODAL});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (lockCode == "") {
			setErrMessage("Please choose your new lock code.")
		} else {
			homeDataService.changeLockCode(lockCode, dispatch);
		}
	};


	return (
		<div>

			{homeDataState.showEditLockCodeModal &&
				<div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">

					<div class="modal-overlay"></div>

					<div class="fixed inset-0 z-10 overflow-y-auto">

						<div class="modal-frame">
							<div id="myModal" class="modal modal--sm">

								<div class="modal__header">
									<h2 class="text-leading">
										Edit lock code
									</h2>
									<button class="button button--circle button--clear justify-self-end" type="button"
											onClick={handleModalClose}>
										<AiOutlineClose/>
									</button>
								</div>

								<div className="modal__body">


									<form class="form" id="contactForm">

										<div class="form__group">
											<label class="form__label">

												Enter new lock code
											</label>
											<input

												className={"form__input"}
												placeholder="New lock code"
												aria-describedby="basic-addon1"
												id="name"
												type="number"

												onChange={(e) => setLockCode(e.target.value)}
												value={lockCode}
											/>
										</div>

										<div class="form__group" hidden={!errMessage}>
											{errMessage}
										</div>

										<div class="form__group">
											<button class="button button--primary"

													onClick={(e) => {
														handleSubmit(e)
													}}
													className="button button--primary"
													id="sendMessageButton"
													type="button"
											>
												Update lock code
											</button>
										</div>


									</form>


								</div>

							</div>
						</div>

					</div>
				</div>}
		</div>

	);
};

export default ChangeLockCodeModal;
