import {useContext, useState, useEffect, useRef, React} from "react";
import {homeDataConstants} from "../constants/HomeDataConstants";
import {HomeDataContext} from "../contexts/HomeDataContext";
import PreviousReportTourForm from "./PreviousReportTourForm";
import {AiOutlineClose} from 'react-icons/ai';

const PreviousReportTourModal = () => {

	const {homeDataState, dispatch} = useContext(HomeDataContext);
	const handleModalClose = () => {
		dispatch({type: homeDataConstants.HIDE_MODAL});
	};

	return (


		<div>

			{homeDataState.previousReports.showModal &&
				<div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">

					<div class="modal-overlay"></div>

					<div class="fixed inset-0 z-10 overflow-y-auto">

						<div class="modal-frame">

							<div id="myModal" class="modal modal--3xl">

								<div class="modal__header">
									<h2 class="text-leading">
										Previous reports
									</h2>
									<button class="button button--circle button--clear justify-self-end" type="button"
										onClick={handleModalClose}>
										<AiOutlineClose/>
									</button>
								</div>
								<div class="modal__body">
									<PreviousReportTourForm
										homeDataState={homeDataState}
										dispatch={dispatch}/>
								</div>
							</div>
						</div>
					</div>
				</div>

			}
		</div>
	);
};

export default PreviousReportTourModal;
