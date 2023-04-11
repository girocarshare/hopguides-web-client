import React, { useContext, useState, useEffect, useRef } from "react";
import { homeDataConstants } from "../constants/HomeDataConstants";
import { homeDataService } from "../services/HomeDataService";
import { HomeDataContext } from "../contexts/HomeDataContext";
import { AiOutlineClose } from 'react-icons/ai';
var url = process.env.REACT_APP_URL || "http://localhost:8080/";


const ChangeLockCodeModal = () => {

	const { homeDataState, dispatch } = useContext(HomeDataContext);
	const [errMessage, setErrMessage] = useState("");
	const [lockCode, setLockCode] = useState("");

	const handleModalClose = () => {
		dispatch({ type: homeDataConstants.HIDE_CHANGE_LOCK_CODE_MODAL });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if(lockCode==""){
			setErrMessage("Please insert new lock code")
		}else{
		homeDataService.changeLockCode(lockCode, dispatch);
		}
	};


	return (
		<div>

			{homeDataState.showEditLockCodeModal && <div class="overlay" >
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

					<div className="container"  >


						<div className="row mt-5">

							<form id="contactForm" >

								<table style={{ marginLeft: "4rem", marginBottom: "4rem" }}>
									<td width="600rem"  >


										<div className="control-group">
											<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
												<label><b>Enter new lock code</b></label>
												<div class="row" >
													<div class="form-group col-lg-10">
														<input

															className={"form-control"}
															placeholder="Lock code"
															aria-describedby="basic-addon1"
															id="name"
															type="email"
															style={{ backgroundColor: 'white', outline: 'none' }}

															onChange={(e) => setLockCode(e.target.value)}
															value={lockCode}
														/>
													</div>
												</div>
											</div>
										</div>
										<div className="form-group text-center" style={{ color: "red", fontSize: "0.8em", marginTop: "30px", marginRight: "40px" }} hidden={!errMessage}>
											{errMessage}
										</div>
										<div className="form-group text-center">
											<button
												style={{ background: "#1977cc", marginTop: "15px", marginRight: "55px" }}

												onClick={(e) => { handleSubmit(e) }}
												className="btn btn-primary btn-xl"
												id="sendMessageButton"
												type="button"
											>
												Update lock code
											</button>
										</div>


									</td>
								</table>



							</form>
						</div>


					</div>



				</div>
			</div>}
		</div>

	);
};

export default ChangeLockCodeModal;
