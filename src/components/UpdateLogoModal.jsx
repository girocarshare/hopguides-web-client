import React, {useContext, useState, useEffect, useRef} from "react";
import {homeDataConstants} from "../constants/HomeDataConstants";
import {HomeDataContext} from "../contexts/HomeDataContext";
import {deleteLocalStorage, authHeader} from "../helpers/auth-header";
import {AiOutlineClose} from 'react-icons/ai';

var url = process.env.REACT_APP_URL || "http://localhost:8080/";


const UpdateLogoModal = () => {

	const {homeDataState, dispatch} = useContext(HomeDataContext);
	const [file, setFile] = useState(null);
	const [errMessage, setErrMessage] = useState("");
	const [height, setHeight] = useState("");
	const [width, setWidth] = useState("");
	const uploadRef = React.useRef();
	const statusRef = React.useRef();
	const progressRef = React.useRef();

	const handleModalClose = () => {
		dispatch({ type: homeDataConstants.HIDE_EDIT_LOGO_MODAL });
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
		e.preventDefault();


		/*if (file == null || height =="" || width == "") {

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
			xhr.setRequestHeader('Authorization',token);
			xhr.upload.addEventListener("progress", ProgressHandler, false);
			xhr.addEventListener("load", SuccessHandler, false);
			xhr.addEventListener("error", ErrorHandler, false);
			xhr.addEventListener("abort", AbortHandler, false);
			xhr.open('POST', `${url}/api/bp/updateLogo`, true);
			xhr.onload = function () {
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

		dispatch({type: homeDataConstants.UPDATE_LOGO_PHOTO_SUCCESS});
	};
	const ErrorHandler = () => {

		dispatch({type: homeDataConstants.UPDATE_LOGO_PHOTO_FAILURE});
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
										<AiOutlineClose/>
									</button>
								</div>

								<div class="modal__body">
									<form class="form" id="contactForm">

										<div class="form__group">
											<div class="flex items-center gap-x-3">
												<svg class="h-12 w-12 text-gray-300" viewBox="0 0 24 24"
													 fill="currentColor" aria-hidden="true">
													<path fill-rule="evenodd"
														  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
														  clip-rule="evenodd"/>
												</svg>
												<label for="file-upload"
													   class="button button--secondary button--small">
													<span>Upload a file</span>
													<input id="file-upload" name="file" type="file" class="sr-only"
														   onChange={onFileChange}/>
												</label>
											</div>
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

										<div class="form__group" hidden={!errMessage}>
											{errMessage}
										</div>

										<div class="form__group">
											<button class="button button--primary" onClick={(e) => {
												handleSubmit(e)
											}} id="sendMessageButton" type="button">
												Upload new logo
											</button>
										</div>

										<div class="form__group">
											<label class="text-sm">
												File progress: <progress class="ml-2" ref={progressRef} value="0"
																		 max="100"/>
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
