import React, { useContext, useState, useEffect, useRef } from "react";
import { homeDataConstants } from "../constants/HomeDataConstants";
import { HomeDataContext } from "../contexts/HomeDataContext";
import { deleteLocalStorage, authHeader } from "../helpers/auth-header";
import { AiOutlineClose } from 'react-icons/ai';

var url = process.env.REACT_APP_URL || "http://localhost:8080";


const UpdateLogoModal = () => {

	const { homeDataState, dispatch } = useContext(HomeDataContext);
	const [file, setFile] = useState(null);
	const [errMessage, setErrMessage] = useState("");
	const [height, setHeight] = useState("");
	const [width, setWidth] = useState("");
	const uploadRef = React.useRef();
	const statusRef = React.useRef();
	const progressRef = React.useRef();
	const [imagePreview, setImagePreview] = useState(null);

	const handleModalClose = () => {
		dispatch({ type: homeDataConstants.HIDE_EDIT_LOGO_MODAL });
		setFile(null)
		setHeight("")
		setWidth("")
		setErrMessage("")
		setImagePreview(null)
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


		if (file == null || height == "" || width == "") {

			setErrMessage("Please pick a photo and height and width")
		} else {

			const formData = new FormData();
			var dimensions = {
				height: height,
				width: width
			}
			formData.append('dimensions', JSON.stringify(dimensions));
			formData.append('file', file);
			var token = authHeader()
			var xhr = new XMLHttpRequest();
			
			xhr.upload.addEventListener("progress", ProgressHandler, false);
			xhr.addEventListener("load", SuccessHandler, false);
			xhr.addEventListener("error", ErrorHandler, false);
			xhr.addEventListener("abort", AbortHandler, false);
			xhr.open('POST', `${url}/api/bp/updateLogo`, true);
			xhr.setRequestHeader('authorization', token);
			xhr.onload = function () {
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

		dispatch({ type: homeDataConstants.UPDATE_LOGO_PHOTO_SUCCESS });
	};
	const ErrorHandler = () => {

		dispatch({ type: homeDataConstants.UPDATE_LOGO_PHOTO_FAILURE });
	};
	const AbortHandler = () => {

		statusRef.current.innerHTML = "Upload aborted";

	};

	return (
		<div>
			{homeDataState.showEditLogoModal &&

				<div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">

					<div class="modal-overlay"></div>

					<div class="fixed inset-0 z-10 overflow-y-auto">

						<div class="modal-frame">

							<div id="myModal" class="modal modal--sm">

								<div class="modal__header">
									<h2 class="text-leading">
										Edit logo
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
										
											<div>
												{imagePreview &&
													<img className="preview" src={imagePreview}
														alt={"image-"} />}
											</div>

											<div class="form__group" hidden={!fileData()}>
												{fileData()}
											</div>

										<div class="form__group">
											<div class="flex flex-row items-start justify-start gap-4">
												<input class="form__input" type="number" required name="name"
													placeholder="Height" value={height}
													onChange={(e) => setHeight(e.target.value)}></input>
												<input class="form__input" type="number" required name="name"
													placeholder="Width" value={width}
													onChange={(e) => setWidth(e.target.value)}></input>
											</div>
										</div>

										<div className="paragraph-box2 grid dgrid-row place-items-center"
											style={{ color: "red", fontSize: "0.8em", marginBottom: "30px" }}
											hidden={!errMessage}>
											{errMessage}
										</div>

										<div className="button-p grid dgrid-row place-items-center">
											<button class="button button--primary" onClick={(e) => {
												handleSubmit(e)
											}} id="sendMessageButton" type="button">
												Upload new logo
											</button>
										</div>

										<div class="form__group">
											<label class="text-sm">
												File progress: <progress class="ml-2" ref={progressRef} value="0"
													max="100" />
											</label>
											<p class="text-sm" ref={statusRef}></p>
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

export default UpdateLogoModal;
