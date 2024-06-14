import React, { useContext, useState, useEffect, useRef } from "react";
import { homeDataConstants } from "../constants/HomeDataConstants";
import { HomeDataContext } from "../contexts/HomeDataContext";
import { deleteLocalStorage, authHeader } from "../helpers/auth-header";
import { AiOutlineClose } from 'react-icons/ai';
import { homeDataService } from "../services/HomeDataService";

import Axios from "axios";
var url = process.env.REACT_APP_URL || "http://localhost:8080/";


const AddGpxModal = () => {

	const { homeDataState, dispatch } = useContext(HomeDataContext);
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [errMessage, setErrMessage] = useState("");
	const [text, setText] = useState("");
	const uploadRef = React.useRef();
	const statusRef = React.useRef();
	const progressRef = React.useRef();

	const handleModalClose = () => {
		dispatch({ type: homeDataConstants.ADD_GPX_MODAL_HIDE });
		setFile(null)
	};

	
	const onFileChange = (event) => {
		setFile(event.target.files[0]);

		event.preventDefault() 
  
		const reader = new FileReader() 
  
		reader.onload = async (event) => { 
  
		   const text = (event.target.result) 
  
		   setText(text) 
  
  
		}; 
  
		reader.readAsText(event.target.files[0]) 

	
	}

	const handleSubmit = (e) => {
		e.preventDefault();


		if (file == null ) {

			setErrMessage("Please pick a gpx file")
		} else {

			var requestobj = {
				text: text,
				id: homeDataState.id
			}

			console.log(homeDataState.id)
			var token = authHeader()
			var xhr = new XMLHttpRequest();
			xhr.upload.addEventListener("progress", ProgressHandler, false);
			//xhr.addEventListener("load", SuccessHandler, false);
			//xhr.addEventListener("error", ErrorHandler, false);
			//xhr.addEventListener("abort", AbortHandler, false);
			xhr.open('POST', `${url}api/pnl/tour/parse/gpx`, true);
		
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded','authorization', token);
			xhr.onload = function () {

				setLoading(false)
				if (xhr.status == 200) {
					dispatch({ type: homeDataConstants.ADD_GPX_SUCCESS });
				} else {
					dispatch({ type: homeDataConstants.ADD_GPX_FAILURE });
				}
			};
			xhr.send(`text=${text}&id=${homeDataState.id}`);

		}
	};
	const ProgressHandler = (e) => {

		setLoading(true)

	};

	return (
		<div>
			{homeDataState.addGpxModalShow &&

				<div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">

					<div class="modal-overlay"></div>

					<div class="fixed inset-0 z-10 overflow-y-auto">

						<div class="modal-frame">

							<div id="myModal" class="modal modal--sm">

								<div class="modal__header">
									<h2 class="text-leading">
										Add gpx for tour
									</h2>
									<button class="button button--circle button--clear justify-self-end" type="button"
										onClick={handleModalClose}>
										<AiOutlineClose />
									</button>
								</div>

								<div class="modal__body">
									<form class="form" id="contactForm">

											

											<div class="form__group"><label for="file-upload"
													class="button button--secondary button--small">
														
											<input  type="file" name="file" onChange={onFileChange} />
											<br />
											</label>
										</div>
										
									

										
										<div className="paragraph-box2 grid dgrid-row place-items-center"
											style={{ color: "red", fontSize: "0.8em", marginBottom: "30px" }}
											hidden={!errMessage}>
											{errMessage}
										</div>
										
										<div className="button-p grid dgrid-row place-items-center">
										{ loading && <div ><img className="mx-8 my-8 h-20" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"></img></div>}
											
											<button class="button button--primary" onClick={(e) => {
												handleSubmit(e)
											}} id="sendMessageButton" type="button">
												Upload gpx file
											</button>
										</div>

										

									</form>
								</div>

							</div>
						</div>
					</div>
				</div>

			}
		</div>
	);
};

export default AddGpxModal;
