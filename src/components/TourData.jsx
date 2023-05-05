import React, { useContext, useEffect, useState, forwardRef, useRef } from "react";
import { homeDataService } from "../services/HomeDataService";
import { HomeDataContext } from "../contexts/HomeDataContext";
import { homeDataConstants } from "../constants/HomeDataConstants";
import { AiOutlineClose } from 'react-icons/ai';
import ReactAudioPlayer from 'react-audio-player';
import Axios from "axios";

const mapState = {
	center: [44, 21],
	zoom: 8,
	controls: [],
};
var url = process.env.REACT_APP_URL || "http://localhost:8080/";
const TourData = () => {
	const [errTitle, setErrTitle] = useState("");
	const [errLongDescription, setErrLongDescription] = useState("");
	const [errShortDescription, setErrShortDescription] = useState("");
	const [errAgreementTitle, setErrAgreementTitle] = useState("");
	const [errAgreementDescription, setErrAgreementDescription] = useState("");

	const [audioName, setAudioName] = useState("");
	const [title, setTitle] = useState("");
	const [place, setPlace] = useState("");
	const [titleTransl, setTitleTransl] = useState("");
	const [agreementTitle, setAgreementTitle] = useState("");
	const [agreementTitleTransl, setAgreementTitleTransl] = useState("");
	const [agreementDesc, setAgreementDesc] = useState("");
	const [agreementDescTransl, setAgreementDescTransl] = useState("");
	const [shortInfo, setShortInfo] = useState("");
	const [longInfo, setLongInfo] = useState("");
	const [price, setPrice] = useState(0);

	const [edit, setEdit] = useState(false);
	const [titlePoint, setTitlePoint] = useState("");
	const [currency, setCurrency] = useState("");
	const [currencyList, setCurrencyList] = useState(["£", "€", "$"]);

	const [errMessage, setErrMessage] = useState("");
	const [file, setFile] = useState(null);
	const [audio, setAudio] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [duration, setDuration] = useState("");
	const [length, setLength] = useState("");
	const [highestPoint, setHighestPoint] = useState("");
	const [termsAndConditions, setTermsAndConditions] = useState("");
	const [showModal, setShowModal] = useState(false);
	const { homeDataState, dispatch } = useContext(HomeDataContext);


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

			setTitleTransl(response.data.choices[0].text)
		} else if (num == 2) {

			setAgreementTitleTransl(response.data.choices[0].text)
		} else if (num == 3) {

			setAgreementDescTransl(response.data.choices[0].text)
		}

		return response.data.choices[0].text;
	};


	const makeShortAndLongDesc = async (input) => {
		const response = await Axios.post(
			"https://api.openai.com/v1/completions",
			{
				prompt: `write me a short description about ${input}, translate it to english, spanish, serbian and slovenian and make it as one json with lower case letters as keys`,
				model: 'text-davinci-003',
				max_tokens: 2049,
				n: 1,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer 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`,
				},
			}
		);

		setShortInfo(response.data.choices[0].text)

		const response2 = await Axios.post(
			"https://api.openai.com/v1/completions",
			{
				prompt: `write me a long description about ${input}, translate it to to english, spanish, serbian and slovenian and make it as one json with lower case letters as keys`,
				model: 'text-davinci-003',
				max_tokens: 2049,
				n: 1,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer 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`,
				},
			}
		);


		setLongInfo(response2.data.choices[0].text)
		return response.data.choices[0].text;
	};


	const editTermsAndConditions = () => {

		setShowModal(true)

		if (homeDataState.updateTourData.tour.termsAndConditions == "") {

			setTermsAndConditions(eval('`' + homeDataState.termsAndConditionsModal.text + '`'))
		} else {

			setTermsAndConditions(eval('`' + homeDataState.updateTourData.tour.termsAndConditions + '`'))
		}


	};
	function isJsonString(str) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		var tour = {}

		setErrTitle("")
		setErrLongDescription("")
		setErrShortDescription("")
		setErrAgreementDescription("")
		setErrAgreementTitle("")


		if (titleTransl != "") {
			if (!isJsonString(titleTransl)) {
				setErrTitle("Please insert the proper JSON format. Pay attention on enter and quotes(\")")
				setErrMessage("JSON format invalid. Check the red fields.")
			}
			tour.title = JSON.parse(titleTransl)
		}
		if (agreementTitleTransl != "") {
			if (!isJsonString(agreementTitleTransl)) {
				setErrAgreementTitle("Please insert the proper JSON format. Pay attention on enter and quotes(\")")
				setErrMessage("JSON format invalid. Check the red fields.")
			}
			tour.agreementTitle = JSON.parse(agreementTitleTransl)
		}
		if (agreementDescTransl != "") {
			if (!isJsonString(agreementDescTransl)) {
				setErrAgreementDescription("Please insert the proper JSON format. Pay attention on enter and quotes(\")")
				setErrMessage("JSON format invalid. Check the red fields.")
			}
			tour.agreementDesc = JSON.parse(agreementDescTransl)
		}
		if (shortInfo != "") {
			if (!isJsonString(shortInfo)) {
				setErrShortDescription("Please insert the proper JSON format. Pay attention on enter and quotes(\")")
				setErrMessage("JSON format invalid. Check the red fields.")
			}
			tour.shortInfo = JSON.parse(shortInfo)
		}
		if (longInfo != "") {
			if (!isJsonString(longInfo)) {
				setErrLongDescription("Please insert the proper JSON format. Pay attention on enter and quotes(\")")
				setErrMessage("JSON format invalid. Check the red fields.")
			}
			tour.longInfo = JSON.parse(longInfo)
		}
		if (price != 0) {
			tour.price = price
		}
		if (currency != "") {
			tour.currency = currency
		}
		if (duration != "") {
			tour.duration = duration
		}
		if (length != "") {
			tour.length = length
		}
		if (highestPoint != "") {
			tour.highestPoint = highestPoint
		}
		if (currency != "") {
			tour.currency = currency
		}
		tour.id = homeDataState.updateTourData.tour.tourId
		const formData = new FormData();
		if (file != null) {
			formData.append('file', file);
		}
		if (audio != null) {
			formData.append('file', audio);
		}
		formData.append('tour', JSON.stringify(tour));
		console.log(formData)
		var xhr = new XMLHttpRequest();
		xhr.addEventListener("load", SuccessHandler, false);
		xhr.addEventListener("error", ErrorHandler, false);
		xhr.addEventListener("abort", AbortHandler, false);
		xhr.open('POST', `${url}api/pnl/tour/update/tour`, true);
		xhr.onload = function () {
		};
		xhr.send(formData);

	};


	const SuccessHandler = (e) => {


		homeDataService.updateTour(true, dispatch);


	};
	const ErrorHandler = () => {

		//statusRef.current.innerHTML = "Upload failed";

		//dispatch({ type: homeDataConstants.UPDATE_MENU_PHOTO_FAILURE });
		homeDataService.updateTour(false, dispatch);
	};
	const AbortHandler = () => {

		//statusRef.current.innerHTML = "Upload aborted";

		homeDataService.insertData(false, dispatch);
	};
	const handleModalClose = () => {
		dispatch({ type: homeDataConstants.UPDATE_TOUR_DATA_MODAL_CLOSE });
	};

	const addFile = (e) => {
		if (e.target.files[0]) {

			var new_file = new File([e.target.files[0]], 'audio1' + titlePoint + "---" + [e.target.files[0].name]);

			setAudio(new_file);
			setAudioName(e.target.files[0].name)

		}
	};

	const onFileChange = (event) => {

		var new_file = new File([event.target.files[0]], 'image' + "---" + [event.target.files[0].name]);
		setFile(new_file);
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


	return (

		<div>

			{homeDataState.updateTourData.show &&

				<div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">

					<div class="modal-overlay"></div>

					<div class="fixed inset-0 z-10 overflow-y-auto">

						<div class="modal-frame">

							<div id="myModal" class="modal modal--3xl">

								<div class="modal__header">
									<h2 class="text-leading">
										Update Tour
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
												Edit tour
											</button>
										</div>}
										<div
											className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
											<div className="form__group">
												<label class="form__label">Title</label>
												<div class="flex flex-col gap-2">
													{edit &&
														<div class="flex flex-row gap-2 items-center">
															<input

																className={"form__input"}
																placeholder='Title'
																aria-describedby="basic-addon1"
																id="name"
																type="text"

																onChange={(e) => setTitle(e.target.value)}
																value={title}
															/>
															<button

																onClick={(e) => fetchData(title, 1)}
																className="button button--primary"
																id="sendMessageButton"
																type="button"
															>
																Translate
															</button>
														</div>}


													<textarea

														className={!errTitle ? "form__input text-sm" : "form__input text-sm !border !border-red-500"}
														style={{ height: 80 }}
														readOnly={!edit}
														placeholder='JSON FORMAT: { "language": "Text"}'
														aria-describedby="basic-addon1"
														id="name"
														type="text"
														onChange={(e) => setTitleTransl(e.target.value)}
														value={titleTransl === "" ? JSON.stringify(homeDataState.updateTourData.tour.title) : titleTransl}

													/>
													<div className="paragraph-box2 grid dgrid-row place-items-center"
														style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }}
														hidden={!errTitle}>
														{errTitle}
													</div>
												</div>
											</div>
										</div>
										<div
											className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
											<div className="form__group">
												<label class="form__label">Agreement title</label>
												<div class="flex flex-col gap-2">
													{edit &&
														<div class="flex flex-row gap-2 items-center">
															<input

																className={"form__input"}
																placeholder='Agreement title'
																aria-describedby="basic-addon1"
																id="name"
																type="text"

																onChange={(e) => setAgreementTitle(e.target.value)}
																value={agreementTitle}
															/>
															<button

																onClick={(e) => fetchData(agreementTitle, 2)}
																className="button button--primary"
																id="sendMessageButton"
																type="button"
															>
																Translate
															</button>

														</div>}

													<textarea

														className={!errAgreementTitle ? "form__input text-sm" : "form__input text-sm !border !border-red-500"}
														style={{ height: 80 }}
														readOnly={!edit}
														placeholder='JSON FORMAT: { "language": "Text"}'
														aria-describedby="basic-addon1"
														id="name"
														type="text"
														onChange={(e) => setAgreementTitleTransl(e.target.value)}
														value={agreementTitleTransl === "" ? JSON.stringify(homeDataState.updateTourData.tour.agreementTitle) : agreementTitleTransl}

													/>
													<div className="paragraph-box2 grid dgrid-row place-items-center"
														style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }}
														hidden={!errAgreementTitle}>
														{errAgreementTitle}
													</div>
												</div>
											</div>
										</div>
										<div
											className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
											<div className="form__group">

												<label class="form__label">Agreement description</label>
												<div class="flex flex-col gap-2">
													{edit &&
														<div class="flex flex-row gap-2 items-center">
															<input

																className={"form__input"}
																placeholder='Agreement description'
																aria-describedby="basic-addon1"
																id="name"
																type="text"

																onChange={(e) => setAgreementDesc(e.target.value)}
																value={agreementDesc}
															/>
															<button

																onClick={(e) => fetchData(agreementDesc, 3)}
																className="button button--primary"
																id="sendMessageButton"
																type="button"
															>
																Translate
															</button>
														</div>}


													<textarea

														className={!errAgreementDescription ? "form__input text-sm" : "form__input text-sm !border !border-red-500"}
														style={{ height: 80 }}
														readOnly={!edit}
														placeholder='JSON FORMAT: { "language": "Text"}'
														aria-describedby="basic-addon1"
														id="name"
														type="text"
														onChange={(e) => setAgreementDescTransl(e.target.value)}
														value={agreementDescTransl === "" ? JSON.stringify(homeDataState.updateTourData.tour.agreementDesc) : agreementDescTransl}

													/>
													<div className="paragraph-box2 grid dgrid-row place-items-center"
														style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }}
														hidden={!errAgreementDescription}>
														{errAgreementDescription}
													</div>
												</div>
											</div>
										</div>
										<div
											className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
											<div className="form__group">
												{edit &&
													<div class="flex flex-col gap-2">
														<label class="form__label">Name of the place*</label>

														<input

															className={"form__input"}
															placeholder='Title'
															aria-describedby="basic-addon1"
															id="name"
															type="text"

															onChange={(e) => setPlace(e.target.value)}
															value={place}
														/>
														<button

															onClick={(e) => makeShortAndLongDesc(place)}
															className="button button--primary"
															id="sendMessageButton"
															type="button"
														>
															Generate short and long description
														</button>
													</div>
												}
												<div class="form__group mt-4">
													<label class="form__label">Short description</label>
													<textarea
														className={!errShortDescription ? "form__input h-32" : "form__input h-32 !border !border-red-500"}

														readOnly={!edit}
														placeholder="Short description"
														aria-describedby="basic-addon1"
														id="name"
														type="textarea"
														onChange={(e) => setShortInfo(e.target.value)}
														value={shortInfo === "" ? JSON.stringify(homeDataState.updateTourData.tour.shortInfo) : shortInfo}
													/>
													<div className="paragraph-box2 grid dgrid-row place-items-center"
														style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }}
														hidden={!errShortDescription}>
														{errShortDescription}
													</div>
												</div>
											</div>

											<div className="form__group">
												<label class="form__label">Long description</label>

												<textarea
													className={!errLongDescription ? "form__input h-32" : "form__input h-32 !border !border-red-500"}

													readOnly={!edit}
													placeholder="Long description"
													aria-describedby="basic-addon1"
													id="name"
													type="textarea"
													onChange={(e) => setLongInfo(e.target.value)}
													value={longInfo === "" ? JSON.stringify(homeDataState.updateTourData.tour.longInfo) : longInfo}
												/>
												<div className="paragraph-box2 grid dgrid-row place-items-center"
													style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }}
													hidden={!errLongDescription}>
													{errLongDescription}
												</div>
											</div>

										</div>
										<div className="form__group">
											<label class="form__label">Price</label>
											<div class="flex flex-row items-center gap-2">
												<input
													readOnly={!edit}
													placeholder="Price"
													class="form__input"
													aria-describedby="basic-addon1"
													id="name"
													type="text"
													onChange={(e) => setPrice(e.target.value)}
													value={price === 0 ? `${homeDataState.updateTourData.tour.price} ${homeDataState.updateTourData.tour.currency} incl tax` : price}
												/>
												{edit &&
													<select onChange={(e) => setCurrency(e.target.value)}
														name="currency" class="form__input"
													>
														{currencyList.map(item =>
															<option key={item} value={item}>{item}</option>
														)};

													</select>}
											</div>
										</div>

										<div className="form__group">
											<label class="form__label">Tour duration</label>
											<input
												class="form__input"
												readOnly={!edit}
												placeholder="Tour duration"
												aria-describedby="basic-addon1"
												id="name"
												type="text"
												onChange={(e) => setDuration(e.target.value)}
												value={duration === "" ? homeDataState.updateTourData.tour.duration : duration}
											/>
										</div>

										<div className="form__group">
											<label class="form__label">Tour lenght (km)</label>
											<input
												class="form__input"
												readOnly={!edit}
												placeholder="Tour lenght (km)"
												aria-describedby="basic-addon1"
												id="name"
												type="text"
												onChange={(e) => setLength(e.target.value)}
												value={length === "" ? homeDataState.updateTourData.tour.length : length}
											/>
										</div>


										<div className="form__group">
											<label class="form__label">Highest point*</label>
											<input
												class="form__input"
												readOnly={!edit}
												placeholder="Highest point"
												aria-describedby="basic-addon1"
												id="name"
												type="text"
												onChange={(e) => setHighestPoint(e.target.value)}
												value={highestPoint === "" ? homeDataState.updateTourData.tour.highestPoint : highestPoint}
											/>
										</div>

										<div className="form__group">
											<label class="form__label">Background tour image</label>
											{edit &&
												<label
													class="button button--secondary button--small">
													<span>Upload image</span>
													<input type={"file"} name={"file"}
														onChange={onFileChange}
														class="sr-only" />
												</label>
											}

											<br />


											<div>
												{fileData()}
											</div>


											<div class="mt-2">
												{imagePreview && <img className="image__preview" src={imagePreview}
													alt={"image-"} />}
												{!imagePreview && <img className="image__preview"
													src={homeDataState.updateTourData.tour.image}
													alt={"image-"} />}
											</div>
										</div>


										<div className="form__group">

											<label class="form__label">Text to speach audio</label>



											<div class="mt-2">
												{edit &&
													<label
														class="button button--secondary button--small">
														<span>Upload audio</span>
														<input type={"file"} accept={".mp3"}
															onChange={addFile}
															class="sr-only" />
													</label>



												}
												{audioName &&


													<label >{audioName}</label>}

											</div>
											<br />
											<div>
												{!audio && <ReactAudioPlayer
													src={homeDataState.updateTourData.tour.audio}

													controls
												/>}
											</div>
										</div>


										<div className="form__group">
											<button
												onClick={(e) => {
													editTermsAndConditions(e)
												}}
												className="button button--primary"
												id="sendMessageButton"
												type="button"
											>
												Terms and conditions
											</button>
										</div>

										{showModal && <div>


											<textarea
												class="form__input"
												readOnly={!edit}
												placeholder="Terms and conditions"
												aria-describedby="basic-addon1"
												id="name"
												type="textarea"
												style={{ height: "500px" }}
												onChange={(e) => setTermsAndConditions(e.target.value)}
												value={termsAndConditions === "" ? homeDataState.updateTourData.tour.termsAndConditions : termsAndConditions}
											/>
										</div>
										}
								
											<div className="paragraph-box2 grid dgrid-row place-items-center"
                                            style={{ color: "red", fontSize: "0.8em", marginBottom: "30px" }}
                                            hidden={!errMessage}>
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
												Update tour
											</button>
										</div>}
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

export default TourData;