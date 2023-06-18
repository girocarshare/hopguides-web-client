import {useContext, React, useEffect, useState, forwardRef} from "react";
import {useParams} from 'react-router-dom';
import {homeDataService} from "../services/HomeDataService";
import {HomeDataContext} from "../contexts/HomeDataContext";
import {homeDataConstants} from "../constants/HomeDataConstants";
import {deleteLocalStorage, authHeader} from "../helpers/auth-header";
import Axios from "axios";
import {AiOutlineClose} from 'react-icons/ai';

const Report = forwardRef((props, ref) => {
	const {homeDataState, dispatch} = useContext(HomeDataContext);

	let {id} = useParams()
	const someFetchActionCreator = () => {
		const getReportInfoHandler = async () => {
			await homeDataService.termsAndConditionsModal(dispatch, id);
		};


		getReportInfoHandler();
	}


	useEffect(() => {

		someFetchActionCreator();
	}, [dispatch]);

	


	return (
		<div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">

			<div class="modal-overlay"></div>

			<div class="fixed inset-0 z-10 overflow-y-auto">

				<div class="modal-frame">

					<div id="myModal" class="modal modal--xl">
						<div class="modal__header">
							
							<h2 class="text-leading">
								Terms and conditions
							</h2>
							
						</div>
						<div class="modal__body">
							{homeDataState.termsAndConditionsModal.text}
						</div>

					</div>
				</div>
			</div>

		</div>
	)
});

export default Report;