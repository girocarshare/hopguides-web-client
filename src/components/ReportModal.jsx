import React, {useContext, useState, useEffect, useRef} from "react";
import {reportConstants} from "../constants/ReportConstants";
import {ReportContext} from "../contexts/ReportContext";
import {reportService} from "../services/ReportService";
import {AiOutlineClose} from 'react-icons/ai';
import {useParams} from 'react-router-dom';

var url = process.env.REACT_APP_URL || "http://localhost:8080/";

const ReportModal = () => {

	let {id} = useParams()
	const {reportState, dispatch} = useContext(ReportContext);
	const [file, setFile] = useState(null);
	const [errMessage, setErrMessage] = useState("");
	const uploadRef = React.useRef();
	const statusRef = React.useRef();
	const progressRef = React.useRef();

	const handleModalClose = () => {
		dispatch({type: reportConstants.HIDE_ADD_MENU_MODAL});
		window.location.reload()
	};

	const onFileChange = (event) => {
		setFile(event.target.files[0]);
	}


	const fileData = () => {
		if (file) {

			return (
				<div>
					<h2 style={{marginTop: "20px"}}>File details</h2>
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
		/*e.preventDefault();


		if (file == null || reportState.report.pointId) {

			setErrMessage("Please fill all fields")
		} else {
			if (id == null) {
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

		}*/
		SuccessHandler()
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

		<div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">

			{reportState.report.showModal &&

				<div>

					<div class="modal-overlay"></div>

					<div class="fixed inset-0 z-10 overflow-y-auto">

						<div class="modal-frame">

							<div id="myModal" class="modal modal--sm">

								<div class="modal__header">
									<h2 class="text-leading">
										Update menu
									</h2>
									<button class="button button--circle button--clear justify-self-end" type="button"
											onClick={handleModalClose}>
										<AiOutlineClose/>
									</button>
								</div>

								<div class="modal__body">

									<form id="contactForm">

										<div class="form">
											<div class="form__group">
												<label for="file-upload"
													   class="button button--secondary button--small">
													<span>Upload a file</span>
													<input id="file-upload" name="file" type="file" class="sr-only"
														   onChange={onFileChange}/>
												</label>
											</div>
											<div class="form__group">
												{fileData()}
											</div>
											<div class="form__group">
												<div hidden={!errMessage}>
													{errMessage}
												</div>
											</div>

											<div class="form__group">
												<label class="text-sm">
													File progress: <progress class="ml-2" ref={progressRef} value="0"
																			 max="100"/>
												</label>
												<p class="text-sm" ref={statusRef}></p>
											</div>

											<div class="form__group">
												<button
													onClick={(e) => {
														handleSubmit(e)
													}}
													className="button button--primary"
													id="sendMessageButton"
													type="button"
												>
													Add menu
												</button>
											</div>
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

export default ReportModal;
