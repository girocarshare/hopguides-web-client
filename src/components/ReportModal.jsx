import React, { useContext, useState, useEffect, useRef } from "react";

import { Modal } from "react-bootstrap";
import { reportConstants } from "../constants/ReportConstants";
import { ReportContext } from "../contexts/ReportContext";
import Paper from "@material-ui/core/Paper";
import Axios from "axios";
import { reportService } from "../services/ReportService";

import { useParams } from 'react-router-dom';

var url = process.env.REACT_APP_URL || "http://localhost:3000/";

const ReportModal = () => {

	let { id } = useParams()
	const { reportState, dispatch } = useContext(ReportContext);
	const [file, setFile] = useState(null);
	const [errMessage, setErrMessage] = useState("");
	const uploadRef = React.useRef();
	const statusRef = React.useRef();
	const progressRef = React.useRef();

	const handleModalClose = () => {
		dispatch({ type: reportConstants.HIDE_ADD_MENU_MODAL });
		window.location.reload()
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


		if (file == null || reportState.report.pointId) {

			setErrMessage("Please fill all fields")
		} else {
			if(id == null){
				id = reportState.id
			}
			const formData = new FormData();

			formData.append('file', file);
			formData.append("pointId", reportState.report.pointId);

			var xhr = new XMLHttpRequest();
			xhr.upload.addEventListener("progress", ProgressHandler, false);
			xhr.addEventListener("load", SuccessHandler, false);
			xhr.addEventListener("error", ErrorHandler, false);
			xhr.addEventListener("abort", AbortHandler, false);

			xhr.open('POST', `${url}api/poi/${id}/uploadMenu`, true);
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
		reportService.addMenu(true, dispatch);
	};
	const ErrorHandler = () => {

		statusRef.current.innerHTML = "Upload failed";

		reportService.addMenu(false, dispatch);
	};
	const AbortHandler = () => {

		statusRef.current.innerHTML = "Upload aborted";

		reportService.addMenu(false, dispatch);
	};

	return (

		<Modal
		show={reportState.report.showModal} aria-labelledby="contained-modal-title-vcenter" class="modal-dialog modal-lg" centered onHide={handleModalClose} size="lg">

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

export default ReportModal;
