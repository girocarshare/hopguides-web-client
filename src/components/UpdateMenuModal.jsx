import React, { useContext, useState, useEffect, useRef } from "react";
import { homeDataConstants } from "../constants/HomeDataConstants";
import { HomeDataContext } from "../contexts/HomeDataContext";
import { AiOutlineClose } from 'react-icons/ai';

var url = process.env.REACT_APP_URL || "http://localhost:8080/";


const UpdateMenuModal = () => {

	const { homeDataState, dispatch } = useContext(HomeDataContext);
	const [file, setFile] = useState(null);
	const [errMessage, setErrMessage] = useState("");
	const uploadRef = React.useRef();
	const statusRef = React.useRef();
	const progressRef = React.useRef();
	const [imagePreview, setImagePreview] = useState(null);

	const handleModalClose = () => {
		dispatch({ type: homeDataConstants.HIDE_ADD_MENU_MODAL });
	};


	const onFileChange = (event) => {
		setFile(event.target.files[0]);
		setImagePreview(URL.createObjectURL(event.target.files[0]));
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


		if (file == null || homeDataState.id == "") {

			setErrMessage("Please pick a photo")
		} else {

			const formData = new FormData();

			formData.append('file', file);

			var xhr = new XMLHttpRequest();
			xhr.upload.addEventListener("progress", ProgressHandler, false);
			xhr.addEventListener("load", SuccessHandler, false);
			xhr.addEventListener("error", ErrorHandler, false);
			xhr.addEventListener("abort", AbortHandler, false);
			xhr.open('POST', `${url}api/poi/${homeDataState.id}/uploadMenu`, true);
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
		<div>

			{homeDataState.showEditMenuModal &&

				<div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">

					<div class="modal-overlay"></div>

					<div class="fixed inset-0 z-10 overflow-y-auto">

						<div class="modal-frame">

							<div id="myModal" class="modal">

								<div class="modal__header">
									<h2 class="text-leading">
										Success
									</h2>
									<button class="button button--circle button--clear justify-self-end" type="button"
										onClick={handleModalClose}>
										<AiOutlineClose />
									</button>
								</div>

								<div className="modal__body">
									<form id="contactForm">

										<div class="form__group">
											<input type="file" name="file" onChange={onFileChange} />
											<br />

										</div>

										<div>
											{imagePreview &&
												<img className="preview" src={imagePreview}
													alt={"image-"} />}
										</div>
										<div class="form__group" hidden={!errMessage}>
											{errMessage}
										</div>

										<div class="form__group">
											<button
												style={{
													background: "#1977cc",
													marginTop: "15px",
													marginRight: "55px"
												}}

												onClick={(e) => {
													handleSubmit(e)
												}}
												className="btn btn-primary btn-xl"
												id="sendMessageButton"
												type="button"
											>
												Add menu
											</button>
										</div>

										<div class="form__group">
											<label>
												File progress: <progress ref={progressRef} value="0" max="100" />
											</label>
											<p ref={statusRef}></p>
										</div>


									</form>
								</div>
							</div>
						</div>
					</div>
				</div>}
		</div>

	)
		;
}
	;

export default UpdateMenuModal;
