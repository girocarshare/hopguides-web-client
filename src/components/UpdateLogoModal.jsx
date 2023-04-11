import React, { useContext, useState, useEffect, useRef } from "react";
import { homeDataConstants } from "../constants/HomeDataConstants";
import { HomeDataContext } from "../contexts/HomeDataContext";
import { deleteLocalStorage, authHeader } from "../helpers/auth-header";
import { AiOutlineClose } from 'react-icons/ai';
var url = process.env.REACT_APP_URL || "http://localhost:8080/";


const UpdateLogoModal = () => {

	const { homeDataState, dispatch } = useContext(HomeDataContext);
	const [file, setFile] = useState(null);
	const [errMessage, setErrMessage] = useState("");
	const [height, setHeight] = useState("");
	const [width, setWidth] = useState("");
	const uploadRef = React.useRef();
	const statusRef = React.useRef();
	const progressRef = React.useRef();

	const handleModalClose = () => {
		dispatch({ type: homeDataConstants.HIDE_ADD_MENU_MODAL });
	};


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

			{homeDataState.showEditLogoModal && <div class="overlay" >
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

										<div style={{ marginTop: "15px" }}>
											<input type="file" name="file" onChange={onFileChange} />

										</div>

										{fileData()}

										<div className="form-group">
								<input className="form-control" type="text" style={{ height: "50px" }} required name="name" placeholder="Height" value={height} onChange={(e) => setHeight(e.target.value)}></input>
								
								</div>
								<div className="form-group">
								<input className="form-control" type="text" style={{ height: "50px" }} required name="name" placeholder="Width" value={width} onChange={(e) => setWidth(e.target.value)}></input>
								
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
												Upload new logo
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



				</div>
			</div>}
		</div>

	);
};

export default UpdateLogoModal;
