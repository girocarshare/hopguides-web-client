import React, { useContext, useEffect, useState, forwardRef, useRef } from "react";
import { businessPartnersService } from "../services/BusinessPartnersService";
import { BusinessPartnersContext } from "../contexts/BusinessPartnersContext";
import { businessPartnersConstants } from "../constants/BusinessPartnersConstants";
import Axios from "axios";
import {deleteLocalStorage, authHeader} from "../helpers/auth-header";
import { AiOutlineClose } from 'react-icons/ai';

var url = process.env.REACT_APP_URL || "http://localhost:8080/";
const BPartnerData = () => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [supportTransl, setSuppoprtTransl] = useState("");
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


	const fetchData = async (input, num) => {
		const response = await Axios.post(
			"https://api.openai.com/v1/completions",
			{
				prompt: `translate "${input}" to english, spanish, serbian and slovenian and make it as one json with lower case letters as keys`,
				model: 'text-davinci-002',
				max_tokens: 500,
				n: 1,
				stop: ".",
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer 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`,
				},
			}
		);

		if (num == 1) {

			setSuppoprtTransl(response.data.choices[0].text)
		}

		return response.data.choices[0].text;
	};
	const handleSubmit = (e) => {

		e.preventDefault();

		var bpartner = businessPartnersState.updateBPartner.bpartner

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
		if (supportTransl != "") {
			if (!isJsonString(supportTransl)) {
				setErrMessage("Please insert the proper JSON format of support field. Pay attention on enter and quotes(\")")
			}

			bpartner.support = JSON.parse(supportTransl)
		}

		if (height != "") {
			bpartner.dimensions.height = height
		}
		if (width != "") {
			bpartner.dimensions.width = width
		}

		bpartner.id = businessPartnersState.updateBPartner.bpartner.id

		console.log(bpartner)

		const formData = new FormData();

		if (file != null) {

			formData.append('file', file);
		}
		formData.append('bpartner', JSON.stringify(bpartner));

		var xhr = new XMLHttpRequest();
		var token = authHeader()
		xhr.addEventListener("load", SuccessHandler, false);
		xhr.addEventListener("error", ErrorHandler, false);
		xhr.addEventListener("abort", AbortHandler, false);
		xhr.open('POST', `${url}api/bp/update`, true);
		xhr.setRequestHeader('authorization', token);
		xhr.onload = function () {
			// do something to response
		};

		xhr.send(formData);


	};
	function isJsonString(str) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}
	const handleModalClose = () => {
		dispatch({ type: businessPartnersConstants.UPDATE_BPARTNER_DATA_MODAL_HIDE });
		//window.location.reload()
	};

	return (

		<div  >

			{businessPartnersState.updateBPartner.show &&

				<div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">

					<div class="modal-overlay"></div>

					<div class="fixed inset-0 z-10 overflow-y-auto">

						<div class="modal-frame">

							<div id="myModal" class="modal modal--3xl">


								<div class="modal__header">
									<h2 class="text-leading">
										Update business partner
									</h2>
									<button class="button button--circle button--clear justify-self-end" type="button"
										onClick={handleModalClose}>
										<AiOutlineClose />
									</button>
								</div>

								<div className="modal__body">

									<form class="form" id="contactForm">

										{!edit && <div className="grid place-items-end">
											<button


												onClick={(e) => {
													setEdit(!edit)
												}}
												className="button button--primary"
												id="sendMessageButton"
												type="button"
											>
												Edit business partner
											</button>
										</div>}
										<div class="form">

											<div className="form__group">

												<label class="form__label" ><b>Name</b></label>
												<div class="flex flex-col gap-2">
													<div class="flex flex-row items-center gap-2">

														<input
															className={"form__input"}
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


											<div className="form__group">
												<label class="form__label"><b>Primary phone</b></label>
												<div class="flex flex-col gap-2">
													<div class="flex flex-row items-center gap-2">

														<input
															className={"form__input"}
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

											<div className="form__group">
												<label class="form__label"><b>Secondary phone</b></label>
												<div class="flex flex-col gap-2">
													<div class="flex flex-row items-center gap-2">
														<input
															className={"form__input"}
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


											<div className="form__group">
												<label class="form__label"><b>Email</b></label>
												<div class="flex flex-col gap-2">
													<div class="flex flex-row items-center gap-2">
														<input
															className={"form__input"}
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



											<div className="form__group">
												<label class="form__label"><b>Address</b></label>
												<div class="flex flex-col gap-2">
													<div class="flex flex-row items-center gap-2">
														<input
															className={"form__input"}
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


											<div className="form__group">
												<label class="form__label"><b>Website</b></label>
												<div class="flex flex-col gap-2">
													<div class="flex flex-row items-center gap-2">
														<input
															className={"form__input"}
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

											

											<div className="form__group">
												<label class="form__label"><b>Lock code</b></label>
												<div class="flex flex-col gap-2">
													<div class="flex flex-row items-center gap-2">
														<input
															className={"form__input"}
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

											{!edit && <div className="form__group">
												<label class="form__label"><b>Support text</b></label>
												<div class="flex flex-col gap-2">
													<div class="flex flex-row items-center gap-2">
														<input
															className={"form__input"}
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
}
											{edit && <div className="form__group">


												<div class="bg-black/[3%] rounded-xl p-4 flex flex-col gap-2"><label class="form__label"><b>Support text</b></label>
													<div class="flex flex-row items-center gap-2">
														<input

															className={"form__input"}
															placeholder="Support"
															aria-describedby="basic-addon1"
															id="name"
															type="text"

															onChange={(e) => setSuppoprt(e.target.value)}
															value={support}
														/>
														<button

															onClick={(e) => fetchData(support, 1)}
															className="button button--primary button--small"
															id="sendMessageButton"
															type="button"
														>
															Translate
														</button>
													</div>


													<input
														class="form__input mt-2 text-sm"
														readOnly={!edit}
														placeholder='JSON FORMAT: { "language": "Text"}'
														aria-describedby="basic-addon1"
														id="name"
														type="text"
														style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
														onChange={(e) => setSuppoprtTransl(e.target.value)}
														value={supportTransl === "" ? JSON.stringify(businessPartnersState.updateBPartner.bpartner.support) : supportTransl}
													/>
												</div>


											</div>}


											<div className="form__group">

												<label class="form__label"><b>Logo image</b></label>
												<br />   <br />
												{edit &&
													<label
														class="button button--secondary button--small">
														<span>Upload image</span>
														<input type={"file"} name={"file"}
															onChange={onFileChange}
															class="sr-only" />
													</label>
												}


												{fileData()}
												<div class="mt-2">
													{imagePreview && <img className="image__preview" src={imagePreview} alt={"image-"} />}
													{!imagePreview && <img className="image__preview" src={businessPartnersState.updateBPartner.bpartner.logo} alt={"image-"} />}
												</div>

												<br />
											</div>

											<div className="form__group">
												<label class="form__label"><b>Logo height</b></label>
												<div class="flex flex-col gap-2">
													<div class="flex flex-row items-center gap-2">
														<input
															className={"form__input"}
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
											<div className="form__group">
												<label class="form__label"><b>Logo width</b></label>
												<div class="flex flex-col gap-2">
													<div class="flex flex-row items-center gap-2">
														<input
															className={"form__input"}
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

											<div className="form-group text-center" style={{ color: "red", fontSize: "0.8em", marginTop: "30px", marginRight: "40px" }} hidden={!errMessage}>
												{errMessage}
											</div>

											{edit && <div className="grid place-items-center form__group">
												<button

													onClick={(e) => {
														handleSubmit(e)
													}}
													className="button button--primary"
													id="sendMessageButton"
													type="button"
												>
													Update business partner
												</button>
											</div>}


											<br />

										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			}
		</div >

	);
};

export default BPartnerData;
