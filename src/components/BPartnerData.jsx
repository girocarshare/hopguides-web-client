import React, { useContext, useEffect, useState, forwardRef, useRef } from "react";
import { businessPartnersService } from "../services/BusinessPartnersService";
import { BusinessPartnersContext } from "../contexts/BusinessPartnersContext";
import { businessPartnersConstants } from "../constants/BusinessPartnersConstants";
import { AiOutlineClose } from 'react-icons/ai';

var url = process.env.REACT_APP_URL || "http://localhost:8080/";
const BPartnerData = () => {
				const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [support, setSuppoprt] = useState("");
	const [phone, setPhone] = useState("");
	const [phone2, setPhone2] = useState("");
	const [height, setHeight] = useState("");
	const [width, setWidth] = useState("");
	const [contactEmail, setContactEmail] = useState("");
	const [webURL, setWebURL] = useState("");
	const [address, setAddress] = useState("");
	const [errMessage, setErrMessage] = useState("");
	const [lockCode, setLockCode] = useState("");
	const uploadRef = React.useRef();
	const statusRef = React.useRef();
	const progressRef = React.useRef();
	const [file, setFile] = useState(null);
	const [edit, setEdit] = useState(false);
	const [imagePreview, setImagePreview] = useState(null);

	const { businessPartnersState, dispatch } = useContext(BusinessPartnersContext);

	const onFileChange = (event) => {
		var new_file = new File([event.target.files[0]], 'menu' + "---" + [event.target.files[0].name]);
		setFile(new_file);
		setImagePreview(URL.createObjectURL(event.target.files[0]))

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


	const SuccessHandler = (e) => {

		
		businessPartnersService.updateBPartner(true, dispatch);
	};
	const ErrorHandler = () => {

		statusRef.current.innerHTML = "Upload failed";

	};
	const AbortHandler = () => {

		statusRef.current.innerHTML = "Upload aborted";

	};

	const handleSubmit = (e) => {
		
		e.preventDefault();

	/*	var bpartner = {}

		if (name != "") {
			bpartner.name = name
		}
		if (phone != "") {
			bpartner.contact.phone = phone
		}
		if (phone2 != "") {
			bpartner.contact.phone2 = phone2
		}
	
		if (email != "") {
			bpartner.contact.email = email
		}
		
		if (address != "") {
			bpartner.contact.location.street = address
		}

		if (webURL != "") {
			bpartner.contact.webURL = webURL
		}
		if (lockCode != "") {
			bpartner.lockCode = lockCode
		}
		if (support != "") {
			bpartner.support = JSON.parse(support)
		}

		if (height != "") {
			bpartner.dimensions.height = height
		}
		if (width != "") {
			bpartner.dimensions.height = width
		}

		bpartner.id = businessPartnersState.updateBPartner.bpartner.id
	

		const formData = new FormData();

		if (file != null) {

			formData.append('file', file);
		}
		formData.append('bpartner', JSON.stringify(bpartner));

		var xhr = new XMLHttpRequest();
		xhr.addEventListener("load", SuccessHandler, false);
		xhr.addEventListener("error", ErrorHandler, false);
		xhr.addEventListener("abort", AbortHandler, false);
		xhr.open('POST', `${url}api/bp/update`, true);
		xhr.onload = function () {
			// do something to response
		};

		xhr.send(formData);*/

		SuccessHandler()

	};

	const handleModalClose = () => {
		dispatch({ type: businessPartnersConstants.UPDATE_BPARTNER_DATA_MODAL_HIDE });
		//window.location.reload()
	};

	return (

		<div  >

			{businessPartnersState.updateBPartner.show && <div class="overlay" >


				<div id="myModal" class="modal" style={{ background: "red" }}>


					<div className="containerModal"  >

						<div className="row mt-5">
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
							<form id="contactForm" >

								<table style={{ marginLeft: "4rem", marginBottom: "4rem" }}>
									<td width="600rem"  >
										<div className="control-group">
											<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
												<label><b>Name</b></label>
												<div class="row" >
													<div class="form-group col-lg-10">

														<input
															readOnly={!edit}
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
															onChange={(e) => setName(e.target.value)}
															value={name === "" ? businessPartnersState.updateBPartner.bpartner.name : name}
														/>

													</div>
												</div>
											</div>
										</div>


										<div className="control-group">
											<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
												<label><b>Primary phone</b></label>
												<div class="row" >
													<div class="form-group col-lg-10">
														<textarea
															readOnly={!edit}
															placeholder="Primary phone"
															aria-describedby="basic-addon1"
															id="name"
															type="textarea"
															style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
															onChange={(e) => setPhone(e.target.value)}
															value={phone === "" ? businessPartnersState.updateBPartner.bpartner.contact.phone : phone}
														/>
													</div>
												</div>
											</div>
										</div>

										<div className="control-group">
											<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
												<label><b>Secondary phone</b></label>
												<div class="row" >
													<div class="form-group col-lg-10">
														<textarea
															readOnly={!edit}
															placeholder="Secondary phone"
															aria-describedby="basic-addon1"
															id="name"
															type="textarea"
															style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
															onChange={(e) => setPhone2(e.target.value)}
															value={phone2 === "" ? businessPartnersState.updateBPartner.bpartner.contact.phone2 : phone2}
														/>
													</div>
												</div>
											</div>
										</div>

										
										<div className="control-group">
											<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
												<label><b>Email</b></label>
												<div class="row" >
													<div class="form-group col-lg-10">
														<textarea
															readOnly={!edit}
															placeholder="Email"
															aria-describedby="basic-addon1"
															id="name"
															type="textarea"
															style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
															onChange={(e) => setEmail(e.target.value)}
															value={email === "" ? businessPartnersState.updateBPartner.bpartner.contact.email : email}
														/>
													</div>
												</div>
											</div>
										</div>



												<div className="control-group">
													<div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
														<label><b>Address</b></label>
														<div class="row" >
															<div class="form-group col-lg-10">
																<input
																	readOnly={!edit}
																	placeholder="Address"
																	aria-describedby="basic-addon1"
																	id="name"
																	type="text"
																	style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
																	onChange={(e) => setAddress(e.target.value)}
																	value={address === "" ? businessPartnersState.updateBPartner.bpartner.contact.location.street : address}
																/>


															</div>
														</div>
													</div>
												</div>


												<div className="control-group">
													<div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
														<label><b>Website</b></label>
														<div class="row" >
															<div class="form-group col-lg-10">
																<input
																	readOnly={!edit}
																	placeholder="Website"
																	aria-describedby="basic-addon1"
																	id="name"
																	type="text"
																	style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
																	onChange={(e) => setWebURL(e.target.value)}
																	value={webURL === "" ? businessPartnersState.updateBPartner.bpartner.contact.webURL : webURL}
																/>


															</div>
														</div>
													</div>
												</div>

												<div className="control-group">
													<div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
														<label><b>Website</b></label>
														<div class="row" >
															<div class="form-group col-lg-10">
																<input
																	readOnly={!edit}
																	placeholder="Website"
																	aria-describedby="basic-addon1"
																	id="name"
																	type="text"
																	style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
																	onChange={(e) => setWebURL(e.target.value)}
																	value={webURL === "" ? businessPartnersState.updateBPartner.bpartner.contact.webURL : webURL}
																/>


															</div>
														</div>
													</div>
												</div>

												<div className="control-group">
													<div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
														<label><b>Lock code</b></label>
														<div class="row" >
															<div class="form-group col-lg-10">
																<input
																	readOnly={!edit}
																	placeholder="Lock code"
																	aria-describedby="basic-addon1"
																	id="name"
																	type="text"
																	style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
																	onChange={(e) => setLockCode(e.target.value)}
																	value={lockCode === "" ? businessPartnersState.updateBPartner.bpartner.lockCode : lockCode}
																/>


															</div>
														</div>
													</div>
												</div>

												<div className="control-group">
													<div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
														<label><b>Support text</b></label>
														<div class="row" >
															<div class="form-group col-lg-10">
																<input
																	readOnly={!edit}
																	placeholder='JSON FORMAT: { "language": "Text"}'
																	aria-describedby="basic-addon1"
																	id="name"
																	type="text"
																	style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
																	onChange={(e) => setSuppoprt(e.target.value)}
																	value={support === "" ? JSON.stringify(businessPartnersState.updateBPartner.bpartner.support) : lockCode}
																/>


															</div>
														</div>
													</div>
												</div>

										<div className="control-group">
											<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>

												<div class="row" >
													<div class="form-group col-lg-10">



														<div style={{ marginTop: "15px" }}>
															<label><b>Logo image</b></label>
															<br />   <br />
															{edit && <input type={"file"} name="file" onChange={onFileChange} />}

														</div>

														{fileData()}

														{imagePreview && <img className="preview" src={imagePreview} alt={"image-"} />}
														{!imagePreview && <img className="preview" src={businessPartnersState.updateBPartner.bpartner.logo} alt={"image-"} />}


														<br />
													</div>
												</div>
											</div>
										</div>

										<div className="control-group">
													<div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
														<label><b>Logo height</b></label>
														<div class="row" >
															<div class="form-group col-lg-10">
																<input
																	readOnly={!edit}
																	placeholder="Logo height"
																	aria-describedby="basic-addon1"
																	id="name"
																	type="text"
																	style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
																	onChange={(e) => setHeight(e.target.value)}
																	value={height === "" ? businessPartnersState.updateBPartner.bpartner.dimensions.height : height}
																/>


															</div>
														</div>
													</div>
												</div>
												<div className="control-group">
													<div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
														<label><b>Logo width</b></label>
														<div class="row" >
															<div class="form-group col-lg-10">
																<input
																	readOnly={!edit}
																	placeholder="Logo width"
																	aria-describedby="basic-addon1"
																	id="name"
																	type="text"
																	style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
																	onChange={(e) => setWidth(e.target.value)}
																	value={width === "" ? businessPartnersState.updateBPartner.bpartner.dimensions.width : width}
																/>


															</div>
														</div>
													</div>
												</div>

										<div className="form-group text-center" style={{ color: "red", fontSize: "0.8em", marginTop: "30px", marginRight: "40px" }} hidden={!errMessage}>
											{errMessage}
										</div>
										{!edit && <div className="form-group text-center">
											<button
												style={{ background: "#1977cc", marginTop: "15px" }}

												onClick={(e) => { setEdit(!edit) }}
												className="btn btn-primary btn-xl"
												id="sendMessageButton"
												type="button"
											>
												Edit
											</button>
										</div>}
										{edit && <div className="form-group text-center">
											<button
												style={{ background: "#1977cc", marginTop: "15px" }}

												onClick={(e) => { handleSubmit(e) }}
												className="btn btn-primary btn-xl"
												id="sendMessageButton"
												type="button"
											>
												Update business partner
											</button>
										</div>}

										<br />

									</td>
								</table>
							</form>
						</div>
					</div>
				</div>
			</div>
			}
		</div >

	);
};

export default BPartnerData;
