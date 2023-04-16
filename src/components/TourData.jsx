import React, {useContext, useEffect, useState, forwardRef, useRef} from "react";
import {homeDataService} from "../services/HomeDataService";
import {HomeDataContext} from "../contexts/HomeDataContext";
import {homeDataConstants} from "../constants/HomeDataConstants";
import TimePicker from 'react-time-picker';
import {YMaps, Map} from "react-yandex-maps";
import {AiOutlineClose} from 'react-icons/ai';
import ReactAudioPlayer from 'react-audio-player';
import Axios from "axios";

const mapState = {
	center: [44, 21],
	zoom: 8,
	controls: [],
};
var url = process.env.REACT_APP_URL || "http://localhost:8080/";
const TourData = () => {

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
	const {homeDataState, dispatch} = useContext(HomeDataContext);


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
	const handleSubmit = (e) => {
		/*e.preventDefault();
		var tour = {}

		if (titleTransl != "") {
			tour.title = JSON.parse(titleTransl)
		}
		if (agreementTitleTransl != "") {
			tour.agreementTitle = JSON.parse(agreementTitleTransl)
		}
		if (agreementDescTransl != "") {
			tour.agreementDesc = JSON.parse(agreementDescTransl)
		}
		if (shortInfo != "") {
			tour.shortInfo = JSON.parse(shortInfo)
		}
		if (longInfo != "") {
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
*/
		SuccessHandler()
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
		dispatch({type: homeDataConstants.HIDE});
		window.location.reload()
	};

	const addFile = (e) => {
		if (e.target.files[0]) {

			var new_file = new File([e.target.files[0]], 'audio1' + titlePoint + "---" + [e.target.files[0].name]);

			setAudio(new_file);

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
										Update Partner
									</h2>
									<button class="button button--circle button--clear justify-self-end" type="button"
											onClick={handleModalClose}>
										<AiOutlineClose/>
									</button>
								</div>

								<div className="modal__body">
									<form class="form" id="contactForm">
										<div className="form__group">
											<label class="form__label">Title</label>
											{edit &&
												<div><input

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
														Translate title
													</button>
												</div>}
											<input
												readOnly={!edit}
												aria-describedby="basic-addon1"
												id="name"
												type="text"
												onChange={(e) => setTitleTransl(e.target.value)}
												value={titleTransl === "" ? JSON.stringify(homeDataState.updateTourData.tour.title) : titleTransl}
											/>
										</div>

										<div className="form__group">
											<label class="form__label">Agreement title</label>
											{edit && <div>
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
											<input
												readOnly={!edit}
												aria-describedby="basic-addon1"
												placeholder="Agreement title"
												id="name"
												type="text"
												onChange={(e) => setAgreementTitleTransl(e.target.value)}
												value={agreementTitleTransl === "" ? JSON.stringify(homeDataState.updateTourData.tour.agreementTitle) : agreementTitleTransl}
											/>
										</div>

										<div className="form__group">

											<label class="form__label">Agreement description</label>
											{edit && <div>
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

											<input
												className={"form__input"}
												readOnly={!edit}
												aria-describedby="basic-addon1"
												placeholder="Agreement description"
												id="name"
												type="text"
												onChange={(e) => setAgreementDescTransl(e.target.value)}
												value={agreementDescTransl === "" ? JSON.stringify(homeDataState.updateTourData.tour.agreementDesc) : agreementDescTransl}
											/>
										</div>

										<div className="form__group">
											{edit &&
												<div>
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
											<label class="form__label">Short description</label>
											<textarea
												className={"form__input"}
												readOnly={!edit}
												placeholder="Short description"
												aria-describedby="basic-addon1"
												id="name"
												type="textarea"
												onChange={(e) => setShortInfo(e.target.value)}
												value={shortInfo === "" ? JSON.stringify(homeDataState.updateTourData.tour.shortInfo) : shortInfo}
											/>
										</div>

										<div className="form__group">
											<label class="form__label">Long description</label>

											<textarea
												className={"form__input"}
												readOnly={!edit}
												placeholder="Long description"
												aria-describedby="basic-addon1"
												id="name"
												type="textarea"
												onChange={(e) => setLongInfo(e.target.value)}
												value={longInfo === "" ? JSON.stringify(homeDataState.updateTourData.tour.longInfo) : longInfo}
											/>
										</div>

										<div className="form__group">
											<label class="form__label">Price</label>
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
											{edit && <input type={"file"} name="file"
															onChange={onFileChange}/>}

											{fileData()}

											{imagePreview && <img className="image__preview" src={imagePreview}
																  alt={"image-"}/>}
											{!imagePreview && <img className="image__preview"
																   src={homeDataState.updateTourData.tour.image}
																   alt={"image-"}/>}
										</div>


										<div className="form__group">

											<label class="form__label">Text to speach audio</label>
											{!audio && <ReactAudioPlayer
												src={homeDataState.updateTourData.tour.audio}

												controls
											/>}

											{edit && <input type={"file"} accept={".mp3"}
															onChange={addFile}/>}
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
												onChange={(e) => setTermsAndConditions(e.target.value)}
												value={termsAndConditions === "" ? homeDataState.updateTourData.tour.termsAndConditions : termsAndConditions}
											/>
										</div>
										}
										<div className="form__group" hidden={!errMessage}>
											{errMessage}
										</div>
										{!edit && <div className="form__group">
											<button


												onClick={(e) => {
													setEdit(!edit)
												}}
												className="button button--primary"
												id="sendMessageButton"
												type="button"
											>
												Edit
											</button>
										</div>}
										{edit && <div className="form__group">
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
