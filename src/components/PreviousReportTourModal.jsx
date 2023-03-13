import { useContext, useState, useEffect, useRef, React } from "react";
import { homeDataConstants } from "../constants/HomeDataConstants";
import { HomeDataContext } from "../contexts/HomeDataContext";
import PreviousReportTourForm from "./PreviousReportTourForm";
import { AiOutlineClose } from 'react-icons/ai';
const PreviousReportTourModal = () => {

	const { homeDataState, dispatch } = useContext(HomeDataContext);
	const handleModalClose = () => {
		dispatch({ type: homeDataConstants.HIDE_MODAL });
	};

	return (


		<div>

			{homeDataState.previousReports.showModal && <div class="overlay" >
				<div id="myModal" class="modal" style={{ background: "white" }}>
					<div class="button-login">

						<button
							type="button"
							style={{ background: "#0099ff", marginTop: "px", marginRight: "55px", padding: "5px 15px", height: "35px" }}
							onClick={handleModalClose}
							class="btn btn-primary btn-lg"
						>
							<AiOutlineClose />
						</button>
					</div>
					<h1>Previous resports</h1>
					<PreviousReportTourForm
						homeDataState={homeDataState}
						dispatch={dispatch} />
				</div>
			</div>

			}
		</div>
	);
};

export default PreviousReportTourModal;
