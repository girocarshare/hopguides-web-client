import React, { useContext, useEffect, useState, forwardRef, useRef } from "react";
import { homeDataService } from "../services/HomeDataService";
import { HomeDataContext } from "../contexts/HomeDataContext";
import { homeDataConstants } from "../constants/HomeDataConstants";
import TimePicker from 'react-time-picker';
import { YMaps, Map } from "react-yandex-maps";
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
		dispatch({ type: homeDataConstants.HIDE });
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

		<div  >

			{homeDataState.updateTourData.show && <div class="overlay" >


				<div id="myModal" class="modal" style={{ background: "white" }}>


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
												<label><b>Title</b></label>
												<div class="row" >
													<div class="form-group col-lg-10">
														{edit &&
															<div><input

																className={"form-control"}
																placeholder='Title'
																aria-describedby="basic-addon1"
																id="name"
																type="text"
																style={{ backgroundColor: 'white', outline: 'none', width: "800px", height: "50px" }}

																onChange={(e) => setTitle(e.target.value)}
																value={title}
															/>
																<button
																	style={{ background: "#0099ff", marginTop: "px", height: "35px" }}

																	onClick={(e) => fetchData(title, 1)}
																	className="btn btn-primary btn-xl"
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
															style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
															onChange={(e) => setTitleTransl(e.target.value)}
															value={titleTransl === "" ? JSON.stringify(homeDataState.updateTourData.tour.title) : titleTransl}
														/>

													</div>
												</div>
											</div>
										</div>

										<div className="control-group">
											<div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
												<label><b>Agreement title</b></label>
												<div class="row" >
													<div class="form-group col-lg-10">
														{edit && <div>
															<input

																className={"form-control"}
																placeholder='Agreement title'
																aria-describedby="basic-addon1"
																id="name"
																type="text"
																style={{ backgroundColor: 'white', outline: 'none', width: "1000px", height: "50px" }}

																onChange={(e) => setAgreementTitle(e.target.value)}
																value={agreementTitle}
															/>
															<button
																style={{ background: "#0099ff", marginTop: "px", height: "35px" }}

																onClick={(e) => fetchData(agreementTitle, 2)}
																className="btn btn-primary btn-xl"
																id="sendMessageButton"
																type="button"
															>
																Translate agreement title
															</button>

														</div>}
														<input
															readOnly={!edit}
															aria-describedby="basic-addon1"
															placeholder="Agreement title"
															id="name"
															type="text"
															style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
															onChange={(e) => setAgreementTitleTransl(e.target.value)}
															value={agreementTitleTransl === "" ? JSON.stringify(homeDataState.updateTourData.tour.agreementTitle) : agreementTitleTransl}
														/>

													</div>
												</div>
											</div>
										</div>

										<div className="control-group">

											<div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
												<label><b>Agreement description</b></label>
												<div class="row" >
													<div class="form-group col-lg-10">
														{edit && <div>
															<input

																className={"form-control"}
																placeholder='Agreement description'
																aria-describedby="basic-addon1"
																id="name"
																type="text"
																style={{ backgroundColor: 'white', outline: 'none', width: "1000px", height: "50px" }}

																onChange={(e) => setAgreementDesc(e.target.value)}
																value={agreementDesc}
															/>
															<button
																style={{ background: "#0099ff", marginTop: "px", height: "35px" }}

																onClick={(e) => fetchData(agreementDesc, 3)}
																className="btn btn-primary btn-xl"
																id="sendMessageButton"
																type="button"
															>
																Translate agreement description
															</button>
														</div>}

														<input
															readOnly={!edit}
															aria-describedby="basic-addon1"
															placeholder="Agreement description"
															id="name"
															type="text"
															style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
															onChange={(e) => setAgreementDescTransl(e.target.value)}
															value={agreementDescTransl === "" ? JSON.stringify(homeDataState.updateTourData.tour.agreementDesc) : agreementDescTransl}
														/>



													</div>
												</div>
											</div>
										</div>

										<div className="control-group">
											<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>

												{edit &&
													<div>
														<label><b>Name of the place*</b></label>

														<div >
															<div >
																<input

																	className={"form-control"}
																	placeholder='Title'
																	aria-describedby="basic-addon1"
																	id="name"
																	type="text"
																	style={{ backgroundColor: 'white', outline: 'none', width: "800px", height: "50px" }}

																	onChange={(e) => setPlace(e.target.value)}
																	value={place}
																/>
																<button
																	style={{ background: "#0099ff", marginTop: "px", height: "35px" }}

																	onClick={(e) => makeShortAndLongDesc(place)}
																	className="btn btn-primary btn-xl"
																	id="sendMessageButton"
																	type="button"
																>
																	Generate short and long description
																</button>
															</div>
														</div>
													</div>}
												<label><b>Short description</b></label>
												<div class="row" >
													<div class="form-group col-lg-10">
														<textarea
															readOnly={!edit}
															placeholder="Short description"
															aria-describedby="basic-addon1"
															id="name"
															type="textarea"
															style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
															onChange={(e) => setShortInfo(e.target.value)}
															value={shortInfo === "" ? JSON.stringify(homeDataState.updateTourData.tour.shortInfo) : shortInfo}
														/>
													</div>
												</div>
											</div>
										</div>

										<div className="control-group">
											<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
												<label><b>Long description</b></label>
												<div class="row" >
													<div class="form-group col-lg-10">
														<textarea
															readOnly={!edit}
															placeholder="Long description"
															aria-describedby="basic-addon1"
															id="name"
															type="textarea"
															style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
															onChange={(e) => setLongInfo(e.target.value)}
															value={longInfo === "" ? JSON.stringify(homeDataState.updateTourData.tour.longInfo) : longInfo}
														/>
													</div>
												</div>
											</div>
										</div>

										<div className="control-group">
											<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
												<label><b>Price</b></label>
												<div class="row" >
													<div class="form-group col-lg-10">
														<div class="button-login">


															<input
																readOnly={!edit}
																placeholder="Price"
																aria-describedby="basic-addon1"
																id="name"
																type="text"
																style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
																onChange={(e) => setPrice(e.target.value)}
																value={price === 0 ? `${homeDataState.updateTourData.tour.price} ${homeDataState.updateTourData.tour.currency} incl tax` : price}
															/>
															{edit && <select onChange={(e) => setCurrency(e.target.value)} name="currency" class="custom-select" style={{ height: "50px", width: "200px" }}>
																{currencyList.map(item =>
																	<option key={item} value={item} >{item}</option>
																)};

															</select>}
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className="control-group">
											<div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
												<label><b>Tour duration</b></label>
												<div class="row" >
													<div class="form-group col-lg-10">
														<input
															readOnly={!edit}
															placeholder="Tour duration"
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
															onChange={(e) => setDuration(e.target.value)}
															value={duration === "" ? homeDataState.updateTourData.tour.duration : duration}
														/>

													</div>
												</div>
											</div>
										</div>

										<div className="control-group">
											<div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
												<label><b>Tour lenght (km)</b></label>
												<div class="row" >
													<div class="form-group col-lg-10">
														<input
															readOnly={!edit}
															placeholder="Tour lenght (km)"
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
															onChange={(e) => setLength(e.target.value)}
															value={length === "" ? homeDataState.updateTourData.tour.length : length}
														/>


													</div>
												</div>
											</div>
										</div>


										<div className="control-group">
											<div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
												<label><b>Highest point*</b></label>
												<div class="row" >
													<div class="form-group col-lg-10">
														<input
															readOnly={!edit}
															placeholder="Highest point"
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
															onChange={(e) => setHighestPoint(e.target.value)}
															value={highestPoint === "" ? homeDataState.updateTourData.tour.highestPoint : highestPoint}
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
															<label><b>Background tour image</b></label>
															<br />   <br />
															{edit && <input type={"file"} name="file" onChange={onFileChange} />}

														</div>

														{fileData()}

														{imagePreview && <img className="preview" src={imagePreview} alt={"image-"} />}
														{!imagePreview && <img className="preview" src={homeDataState.updateTourData.tour.image} alt={"image-"} />}


														<br />
													</div>
												</div>
											</div>
										</div>



										<div className="control-group">
											<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>

												<div class="row" >
													<div class="form-group col-lg-10">


														<div style={{ marginTop: "15px" }}>

															<label><b>Text to speach audio</b></label>
															<br />   <br />
															{!audio && <ReactAudioPlayer
																src={homeDataState.updateTourData.tour.audio}

																controls
															/>}

															{edit && <input type={"file"} accept={".mp3"} onChange={addFile} />}
														</div>

														<br />
													</div>
												</div>
											</div>
										</div>



										<div className="form-group text-center">
											<button
												style={{ background: "#f0f0f0", marginTop: "px", marginRight: "55px", border: "1px solid black", padding: "5px 15px", height: "35px" }}

												onClick={(e) => { editTermsAndConditions(e) }}
												className="btn btn-primary btn-xl"
												id="sendMessageButton"
												type="button"
											>
												Terms and conditions
											</button>
										</div>

										{showModal && <div >


											<textarea
												readOnly={!edit}
												placeholder="Terms and conditions"
												aria-describedby="basic-addon1"
												id="name"
												type="textarea"
												style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
												onChange={(e) => setTermsAndConditions(e.target.value)}
												value={termsAndConditions === "" ? homeDataState.updateTourData.tour.termsAndConditions : termsAndConditions}
											/>
										</div>
										}
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
												Update tour
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

export default TourData;
