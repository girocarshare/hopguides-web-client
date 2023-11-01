import React, { useContext, useEffect, useState, forwardRef, useRef } from "react";
import { homeDataService } from "../services/HomeDataService";
import { HomeDataContext } from "../contexts/HomeDataContext";
import { homeDataConstants } from "../constants/HomeDataConstants";
import { AiOutlineClose } from 'react-icons/ai';
import ReactAudioPlayer from 'react-audio-player';
import { deleteLocalStorage, authHeader } from "../helpers/auth-header";
import Axios from "axios";

const mapState = {
	center: [44, 21],
	zoom: 8,
	controls: [],
};
var url = process.env.REACT_APP_URL || "http://localhost:8080/";
const TourData = () => {

	const { homeDataState, dispatch } = useContext(HomeDataContext);
	const [loading, setLoading] = useState(false);
	const [errTitle, setErrTitle] = useState("");
	const [errLongDescription, setErrLongDescription] = useState("");
	const [errShortDescription, setErrShortDescription] = useState("");
	const [errAgreementTitle, setErrAgreementTitle] = useState("");
	const [errAgreementDescription, setErrAgreementDescription] = useState("");

	const [audioName, setAudioName] = useState("");
	const [title, setTitle] = useState(homeDataState?.updateTourData?.tour?.title?.english || "");
	const [titleTransl, setTitleTransl] = useState(homeDataState?.updateTourData?.tour?.title?.slovenian || "");
	const [place, setPlace] = useState("");
	const [shortInfoTransl, setShortInfoTransl] = useState(homeDataState?.updateTourData?.tour?.shortInfo?.slovenian || "");
	const [longInfoTransl, setLongInfoTransl] = useState(homeDataState?.updateTourData?.tour?.longInfo?.slovenian || "");
	const [agreementTitle, setAgreementTitle] = useState(homeDataState?.updateTourData?.tour?.agreementTitle?.english || "");
	const [agreementTitleTransl, setAgreementTitleTransl] = useState(homeDataState?.updateTourData?.tour?.agreementTitle?.slovenian || "");
	const [agreementDesc, setAgreementDesc] = useState(homeDataState?.updateTourData?.tour?.agreementDesc?.english || "");
	const [agreementDescTransl, setAgreementDescTransl] = useState(homeDataState?.updateTourData?.tour?.agreementDesc?.slovenian || "");
	const [shortInfo, setShortInfo] = useState(homeDataState?.updateTourData?.tour?.shortInfo?.english || "");
	const [longInfo, setLongInfo] = useState(homeDataState?.updateTourData?.tour?.longInfo?.english || "");
	const [price, setPrice] = useState(0);

	const [edit, setEdit] = useState(false);
	const [titlePoint, setTitlePoint] = useState("");
	const [currency, setCurrency] = useState("");
	const [currencyList, setCurrencyList] = useState(["£", "€", "$"]);

	const [errMessage, setErrMessage] = useState("");
	const [file, setFile] = useState(null);
	const [audio, setAudio] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [videoPreview, setVideoPreview] = useState(null);
	const [duration, setDuration] = useState(homeDataState?.updateTourData?.tour?.duration || "");
	const [length, setLength] = useState(homeDataState?.updateTourData?.tour?.length || "");
	const [highestPoint, setHighestPoint] = useState(homeDataState?.updateTourData?.tour?.highestPoint || "");
	const [termsAndConditions, setTermsAndConditions] = useState("");
	const [showModal, setShowModal] = useState(false);

	const [isTitleModified, setIsTitleModified] = useState(false);

	const fetchData = async (input, num) => {

		input = input.replace(/(\r\n|\n|\r)/gm, " ");
		const response = await Axios.post(
			"https://api.openai.com/v1/completions",
			{
				prompt: `translate "${input}" to slovenian`,
				model: 'text-davinci-002',
				max_tokens: 500,
				n: 1,
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
				prompt: `in one paragraph write me a short description about ${input}`,
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


		const responseSlo = await Axios.post(
			"https://api.openai.com/v1/completions",
			{
				prompt: `translate ${response.data.choices[0].text} to slovenian`,
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

		setShortInfoTransl(responseSlo.data.choices[0].text)


		const response2 = await Axios.post(
			"https://api.openai.com/v1/completions",
			{
				prompt: ` write me a long description about ${input} and put it in one paragraph`,
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

		const response2Slo = await Axios.post(
			"https://api.openai.com/v1/completions",
			{
				prompt: `translate ${response2.data.choices[0].text} to slovenian`,
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

		setLongInfoTransl(response2Slo.data.choices[0].text)
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

		var title1 = ""
		if (title == "") {
			title1 = homeDataState.updateTourData.tour.title.english
		} else {
			title1 = title
		}

		var titleTransl1 = ""
		if (titleTransl == "") {
			titleTransl1 = homeDataState.updateTourData.tour.title.slovenian
		} else {
			titleTransl1 = titleTransl
		}

		var agreementTitle1 = ""
		if (agreementTitle == "") {
			agreementTitle1 = homeDataState.updateTourData.tour.agreementTitle.english
		} else {
			agreementTitle1 = agreementTitle
		}

		var agreementTitleTransl1 = ""
		if (agreementTitleTransl == "") {
			agreementTitleTransl1 = homeDataState.updateTourData.tour.agreementTitle.slovenian
		} else {
			agreementTitleTransl1 = agreementTitleTransl
		}

		var agreementDesc1 = ""
		if (agreementDesc == "") {
			agreementDesc1 = (homeDataState.updateTourData.tour.agreementDesc.english)
		} else {
			agreementDesc1 = agreementDesc
		}

		var agreementDescTransl1 = ""
		if (agreementDescTransl == "") {
			agreementDescTransl1 = (homeDataState.updateTourData.tour.agreementDesc.slovenian)
		} else {
			agreementDescTransl1 = agreementDescTransl
		}


		var shortInfo1 = ""
		if (shortInfo == "") {
			shortInfo1 = (homeDataState.updateTourData.tour.shortInfo.english)
		} else {
			shortInfo1 = shortInfo
		}

		var shortInfoTransl1 = ""
		if (shortInfoTransl == "") {
			shortInfoTransl1 = (homeDataState.updateTourData.tour.shortInfo.slovenian)
		} else {
			shortInfoTransl1 = shortInfoTransl
		}

		var longInfo1 = ""
		if (longInfo == "") {
			longInfo1 = (homeDataState.updateTourData.tour.longInfo.english)
		} else {
			longInfo1 = longInfo
		}

		var longInfoTransl1 = ""
		if (longInfoTransl == "") {
			longInfoTransl1 = (homeDataState.updateTourData.tour.longInfo.slovenian)
		} else {
			longInfoTransl1 = longInfoTransl
		}


		tour.title = JSON.parse(`{"english": ${JSON.stringify(title1.trim())} , "slovenian" : ${JSON.stringify(titleTransl1.trim())}}`)
		tour.agreementTitle = JSON.parse(`{"english":${JSON.stringify(agreementTitle1.trim())} , "slovenian" :${JSON.stringify(agreementTitleTransl1.trim())}}`)
		tour.agreementDesc = JSON.parse(`{"english":${JSON.stringify(agreementDesc1.trim())}, "slovenian" : ${JSON.stringify(agreementDescTransl1.trim())} }`)
		tour.shortInfo = JSON.parse(`{"english": ${JSON.stringify(shortInfo1.trim())} , "slovenian" : ${JSON.stringify(shortInfoTransl1.trim())} }`)
		tour.longInfo = JSON.parse(`{"english":${JSON.stringify(longInfo1.trim())}, "slovenian" : ${JSON.stringify(longInfoTransl1.trim())}}`)


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


		tour.id = homeDataState.updateTourData.tour.id

		const formData = new FormData();
		if (file != null) {
			formData.append('file', file);
		} else {

			tour.image = homeDataState.updateTourData.tour.image
		}
		if (audio != null) {
			formData.append('file', audio);
		} else {

			tour.audio = homeDataState.updateTourData.tour.audio
		}
		console.log(tour)
		formData.append('tour', JSON.stringify(tour));
		var token = authHeader()
		var xhr = new XMLHttpRequest();
		xhr.upload.addEventListener("progress", ProgressHandler, false);
		xhr.open('POST', `${url}api/pnl/tour/update/tour`, true);
		xhr.setRequestHeader('authorization', token);
		xhr.onload = function () {

			setLoading(false)
			if (xhr.status == "412") {

				homeDataService.updateTour(false, dispatch);

			}
			if (xhr.status == "200") {

				homeDataService.updateTour(true, dispatch);

			}
		};
		xhr.send(formData);

	};

	const ProgressHandler = (e) => {

		setLoading(true)

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


		if ((event.target.files[0].name).substring(event.target.files[0].name.length - 3) == "mp4") {
			var new_file = new File([event.target.files[0]], 'image' + "---" + [event.target.files[0].name]);
			setFile(new_file);
			setVideoPreview(URL.createObjectURL(event.target.files[0]))
			setImagePreview(null)
		} else {
			var new_file = new File([event.target.files[0]], 'image' + "---" + [event.target.files[0].name]);
			setFile(new_file);
			setImagePreview(URL.createObjectURL(event.target.files[0]));
			setVideoPreview(null)
		}
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

													<div class="flex flex-row gap-2 items-center">
														<label class="form__label" style={{ marginRight: "18px" }}>English:</label>
														<input
															className={"form__input"}
															placeholder='Title'
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															readOnly={!edit}
															onChange={(e) => setTitle(e.target.value)}
															value={title}
														/>
														{edit && <button

															onClick={(e) => fetchData(title, 1)}
															className="button button--primary"
															id="sendMessageButton"
															type="button"
														>
															Translate
														</button>}
													</div>

													<div class="flex flex-row gap-2 items-center">
														<label class="form__label">Slovenian:</label>


														<input
															className={"form__input"}
															placeholder='Title in slovenian'
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															readOnly={!edit}
															onChange={(e) => setTitleTransl(e.target.value)}
															value={titleTransl}
														/>


														<div className="paragraph-box2 grid dgrid-row place-items-center"
															style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }}
															hidden={!errTitle}>
															{errTitle}
														</div>
													</div>
												</div>
											</div>
										</div>
										<div
											className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
											<div className="form__group">
												<label class="form__label">Agreement title</label>
												<div class="flex flex-col gap-2">

													<div class="flex flex-row gap-2 items-center">

														<label class="form__label" style={{ marginRight: "18px" }}>English:</label>


														<textarea
															style={{ height: 80 }}
															className={"form__input"}
															placeholder='Agreement title'
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															readOnly={!edit}
															onChange={(e) => setAgreementTitle(e.target.value)}
															value={agreementTitle}
														/>



														{edit &&
															<button

																onClick={(e) => fetchData(agreementTitle, 2)}
																className="button button--primary"
																id="sendMessageButton"
																type="button"
															>
																Translate
															</button>}

													</div>
													<div class="flex flex-row gap-2 items-center">

														<label class="form__label">Slovenian:</label>


														<textarea
															style={{ height: 80 }}
															className={"form__input"}
															placeholder='Agreement title in slovenian'
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															readOnly={!edit}
															onChange={(e) => setAgreementTitleTransl(e.target.value)}
															value={agreementTitleTransl}
														/>
														<div className="paragraph-box2 grid dgrid-row place-items-center"
															style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }}
															hidden={!errAgreementTitle}>
															{errAgreementTitle}
														</div>
													</div>
												</div>
											</div>
										</div>
										<div
											className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
											<div className="form__group">

												<label class="form__label">Agreement description</label>
												<div class="flex flex-col gap-2">

													<div class="flex flex-row gap-2 items-center">
														<label class="form__label" style={{ marginRight: "18px" }}>English:</label>




														<textarea
															className={!errAgreementDescription ? "form__input text-sm" : "form__input text-sm !border !border-red-500"}

															style={{ height: 80 }}
															placeholder='Agreement description'
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															readOnly={!edit}
															onChange={(e) => setAgreementDesc(e.target.value)}
															value={agreementDesc}
														/>

														{edit && <button

															onClick={(e) => fetchData(agreementDesc, 3)}
															className="button button--primary"
															id="sendMessageButton"
															type="button"
														>
															Translate
														</button>}
													</div>

													<div class="flex flex-row gap-2 items-center">

														<label class="form__label">Slovenian:</label>


														<textarea
															className={!errAgreementDescription ? "form__input text-sm" : "form__input text-sm !border !border-red-500"}


															style={{ height: 80 }}
															placeholder='Agreement description in slovenian'
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															readOnly={!edit}
															onChange={(e) => setAgreementDescTransl(e.target.value)}
															value={agreementDescTransl}
														/>
														<div className="paragraph-box2 grid dgrid-row place-items-center"
															style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }}
															hidden={!errAgreementDescription}>
															{errAgreementDescription}
														</div>
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
													<div class="flex flex-col gap-2">

														<div class="flex flex-row gap-2 items-center">
															<label class="form__label" style={{ marginRight: "18px" }}>English:</label>


															<textarea
																className={!errShortDescription ? "form__input text-sm h-32" : "form__input text-sm h-32 !border !border-red-500"}

																style={{ height: 80 }}
																placeholder='Short description'
																aria-describedby="basic-addon1"
																id="name"
																type="text"
																readOnly={!edit}
																onChange={(e) => setShortInfo(e.target.value)}
																value={shortInfo}
															/>


														</div>

														<div class="flex flex-row gap-2 items-center">
															<label class="form__label" >Slovenian:</label>


															<textarea
																className={!errShortDescription ? "form__input text-sm h-32" : "form__input text-sm h-32 !border !border-red-500"}

																style={{ height: 80 }}
																placeholder='Short description in slovenian'
																aria-describedby="basic-addon1"
																id="name"
																type="text"
																readOnly={!edit}
																onChange={(e) => setShortInfoTransl(e.target.value)}
																value={shortInfoTransl}
															/>




														</div>
													</div>
												</div>
											</div>









											<div className="form__group">
												<label class="form__label">Long description</label>
												<div class="flex flex-col gap-2">
													<div class="flex flex-row gap-2 items-center">
														<label class="form__label" style={{ marginRight: "18px" }}>English:</label>



														<textarea
															className={!errShortDescription ? "form__input text-sm h-32" : "form__input text-sm h-32 !border !border-red-500"}

															style={{ height: 80 }}
															placeholder='Long description'
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															readOnly={!edit}
															onChange={(e) => setLongInfo(e.target.value)}
															value={longInfo}
														/>



													</div>

													<div class="flex flex-row gap-2 items-center">
														<label class="form__label" >Slovenian:</label>



														<textarea
															className={!errShortDescription ? "form__input text-sm h-32" : "form__input text-sm h-32 !border !border-red-500"}

															style={{ height: 80 }}
															placeholder='Long description in slovenian'
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															readOnly={!edit}
															onChange={(e) => setLongInfoTransl(e.target.value)}
															value={longInfoTransl}
														/>



													</div>
												</div>

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
												value={duration}
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
												value={length}
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
												value={highestPoint}
											/>
										</div>

										<div className="form__group">
											<label class="form__label">Background tour image</label>
											{edit &&
												<label
													class="button button--secondary button--small">
													<span>Upload image</span>
													<input type={"file"} name={"file"} accept="image/*"
														onChange={onFileChange}
														class="sr-only" />
												</label>
											}

											<br />


											<div>
												{fileData()}
											</div>


											<div class="mt-2">
												{imagePreview && !videoPreview && <img className="image__preview" src={imagePreview}
													alt={"image-"} />}
												{!imagePreview && !videoPreview && homeDataState.updateTourData.tour.image.substring(homeDataState.updateTourData.tour.image.length - 3) != "mp4" && <img className="image__preview"
													src={homeDataState.updateTourData.tour.image}
													alt={"image-"} />}

												{videoPreview && !imagePreview && <video className="image__preview" controls src={videoPreview}
													alt={"video-"} />}
												{!videoPreview && !imagePreview && homeDataState.updateTourData.tour.image.substring(homeDataState.updateTourData.tour.image.length - 3) == "mp4" && <video controls className="image__preview"
													src={homeDataState.updateTourData.tour.image}
													alt={"video-"} />}
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
											{loading && <div ><img className="mx-8 my-8 h-20" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"></img></div>}

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