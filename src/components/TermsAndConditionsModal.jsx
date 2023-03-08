import React, { useContext, useState, useEffect, useRef } from "react";

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { homeDataConstants } from "../constants/HomeDataConstants";
import { HomeDataContext } from "../contexts/HomeDataContext";
import Paper from "@material-ui/core/Paper";
import Axios from "axios";
import { reportService } from "../services/ReportService";

var url = process.env.REACT_APP_URL || "http://localhost:3000/";

const style = {
	position: 'absolute',
	top: '35%',
	left: '35%',
	transform: 'translate(-30%, -30%)',
	width: 1200,
	height: 600,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

const TermsAndConditionsModal = (props) => {

	const { homeDataState, dispatch } = useContext(HomeDataContext);



	const handleClose = () => {
		dispatch({ type: homeDataConstants.HIDE_TERMS_AND_CONDITIONS_MODAL });
	};


	return (



		<Modal
			open={homeDataState.termsAndConditionsModal.show} aria-labelledby="contained-modal-title-vcenter" class="modal-dialog modal-lg" centered onClose={handleClose} size="lg">


			<Box sx={style}>


				<div>
					<Paper square>

						<div className="control-group">
							<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>

								<div class="row" >
									<div class="form-group col-lg-10">
										<textarea className="form-control" style={{ height: "430px", width: "1100px" }} type="textarea" required name="message" placeholder="Long description" value={props.termsAndConditions} onChange={(e) => props.setTermsAndConditions(e.target.value)}></textarea>

									</div>
								</div>
							</div>
						</div>

						<div className="button-p">
							<button
								style={{ background: "#0099ff", marginTop: "px", marginRight: "55px", padding: "5px 15px", height: "35px" }}

								onClick={handleClose}
								className="btn btn-primary btn-xl"
								id="sendMessageButton"
								type="button"
							>
								Done
							</button>
						</div>

					</Paper>
				</div>
			</Box>
		</Modal>
	);
};

export default TermsAndConditionsModal;
