import React, { useContext, useState, useEffect, useRef } from "react";
import { homeDataConstants } from "../constants/HomeDataConstants";
import { HomeDataContext } from "../contexts/HomeDataContext";

var url = process.env.REACT_APP_URL || "http://localhost:3000/";

const TermsAndConditionsModal = (props) => {

	const { homeDataState, dispatch } = useContext(HomeDataContext);



	const handleClose = () => {
		dispatch({ type: homeDataConstants.HIDE_TERMS_AND_CONDITIONS_MODAL });
	};


	return (

		<div>

			<div  >
				{homeDataState.termsAndConditionsModal.show && <div class="overlay" >
					<div id="myModal" class="modal" style={{background: "white"}}>

						<div className="control-group">
							<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>

								<div class="row" >
									<div class="form-group col-lg-10">
										<textarea className="form-control" style={{ height: "430px", width: "1100px" }} type="textarea" required name="message" placeholder="Terms and conditions" value={props.termsAndConditions} onChange={(e) => props.setTermsAndConditions(e.target.value)}></textarea>

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
					</div>
				</div>}
			</div>
		</div>
	);
};

export default TermsAndConditionsModal;
