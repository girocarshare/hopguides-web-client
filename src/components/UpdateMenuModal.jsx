import React, { useContext, useState, useEffect, useRef } from "react";

import { Modal } from "react-bootstrap";
import { homeDataConstants } from "../constants/HomeDataConstants";
import { HomeDataContext } from "../contexts/HomeDataContext";
import Paper from "@material-ui/core/Paper";
import Axios from "axios";
import { homeDataService } from "../services/HomeDataService";

import { useParams } from 'react-router-dom';
import HomeData from "./HomeData";

var url = process.env.REACT_APP_URL || "http://localhost:3000/";

const UpdateMenuModal = () => {

	const { homeDataState, dispatch } = useContext(HomeDataContext);
	const [file, setFile] = useState(null);
	const [errMessage, setErrMessage] = useState("");
	const uploadRef = React.useRef();
	const statusRef = React.useRef();
	const progressRef = React.useRef();

	const handleModalClose = () => {
		dispatch({ type: homeDataConstants.HIDE_ADD_MENU_MODAL });
		//window.location.reload()
	};

	useEffect(() => {



	}, [dispatch]);


	const onFileChange = (event) => {
		setFile(event.target.files[0]);
	}


	const fileData = () => {
		if (file) {

			return (
				<div>
					<h2 style={{ marginTop: "20px" }}>File details</h2>
					<p>File name: {file.name}</p>
					<p>File type: {file.type}</p>
					<p>
						LAst modified:{" "}
						{file.lastModifiedDate.toDateString()}
					</p>
				</div>
			);
		}
	};



	const handleSubmit = (e) => {
		e.preventDefault();


		if (file == null || homeDataState.id=="") {

			setErrMessage("Please pick a photo")
		} else {
			
			const formData = new FormData();

			formData.append('file', file);

			var xhr = new XMLHttpRequest();
			xhr.upload.addEventListener("progress", ProgressHandler, false);
			xhr.addEventListener("load", SuccessHandler, false);
			xhr.addEventListener("error", ErrorHandler, false);
			xhr.addEventListener("abort", AbortHandler, false);
//************************************** */
			xhr.open('POST', `${url}api/poi/${homeDataState.id}/uploadMenu`, true);
			//xhr.setRequestHeader("Authorization", props.token);
			xhr.onload = function () {
				// do something to response
			};

			xhr.send(formData);


		}
	};
	const ProgressHandler = (e) => {
		var percent = (e.loaded / e.total) * 100;
		progressRef.current.value = Math.round(percent);
		statusRef.current.innerHTML = Math.round(percent) + "% uploaded...";

	};

	const SuccessHandler = (e) => {

		statusRef.current.innerHTML = "Success";
		progressRef.current.value = 100;
		//reportService.addMenu(true, dispatch);
		
		dispatch({ type: homeDataConstants.UPDATE_MENU_PHOTO_SUCCESS });
	};
	const ErrorHandler = () => {

		statusRef.current.innerHTML = "Upload failed";

		dispatch({ type: homeDataConstants.UPDATE_MENU_PHOTO_FAILURE });
		//reportService.addMenu(false, dispatch);
	};
	const AbortHandler = () => {

		statusRef.current.innerHTML = "Upload aborted";

		//reportService.addMenu(false, dispatch);
	};

	return (

		<Modal
		show={homeDataState.showEditMenuModal} aria-labelledby="contained-modal-title-vcenter" class="modal-dialog modal-lg" centered onHide={handleModalClose} size="lg">

		<Modal.Header closeButton>
			<Modal.Title id="contained-modal-title-vcenter">
				<big>Add new tour</big>
			</Modal.Title>
		</Modal.Header>
		<Modal.Body>

				<div>
					<Paper square>


						<div className="container"  >


							<div className="row mt-5">

								<form id="contactForm" >

									<table style={{ marginLeft: "4rem", marginBottom: "4rem" }}>
										<td width="600rem"  >

											<div style={{ marginTop: "15px" }}>
												<input type="file" name="file" onChange={onFileChange} />

											</div>

											{fileData()}

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
													Add menu
												</button>
											</div>

											<label>
												File progress: <progress ref={progressRef} value="0" max="100" />
											</label>
											<p ref={statusRef}></p>
										</td>
									</table>



								</form>
							</div>


						</div>



					</Paper>
				</div>
				</Modal.Body >
			<Modal.Footer>
			</Modal.Footer>


		</Modal>
	);
};

export default UpdateMenuModal;
