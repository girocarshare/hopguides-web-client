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
const UpdatedTourData = () => {
	const [errTitle, setErrTitle] = useState("");
	const [errLongDescription, setErrLongDescription] = useState("");
	const [errShortDescription, setErrShortDescription] = useState("");
	const [errAgreementTitle, setErrAgreementTitle] = useState("");
	const [errAgreementDescription, setErrAgreementDescription] = useState("");

	const [audioName, setAudioName] = useState("");
	const [title, setTitle] = useState("");
	const [place, setPlace] = useState("");
	const [shortInfoTransl, setShortInfoTransl] = useState("");
	const [longInfoTransl, setLongInfoTransl] = useState("");
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

	const editTermsAndConditions = () => {

		setShowModal(true)

		if (homeDataState.updateTourData.tour.termsAndConditions == "") {

			setTermsAndConditions(eval('`' + homeDataState.termsAndConditionsModal.text + '`'))
		} else {

			setTermsAndConditions(eval('`' + homeDataState.updateTourData.tour.termsAndConditions + '`'))
		}


	};

	const handleModalClose = () => {
		dispatch({ type: homeDataConstants.UPDATE_TOUR_DATA_MODAL_CLOSE });
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
															value={title === "" ? homeDataState.updateTourData.tour.title.english : title}
														/>
														
													</div>

													<div class="flex flex-row gap-2 items-center">
														<label class="form__label">Slovenian:</label>
														<input

															className={"form__input"}
															placeholder='Title'
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															readOnly={!edit}
															onChange={(e) => setTitleTransl(e.target.value)}
															value={titleTransl === "" ? homeDataState.updateTourData.tour.title.slovenian : titleTransl}

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

															className={!errAgreementTitle ? "form__input text-sm" : "form__input text-sm !border !border-red-500"}
															style={{ height: 80 }}
															readOnly={!edit}
															placeholder='Agreement title'
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															onChange={(e) => setAgreementTitle(e.target.value)}
															value={agreementTitle === "" ? homeDataState.updateTourData.tour.agreementTitle.english : agreementTitle}

														/>

													

													</div>
													<div class="flex flex-row gap-2 items-center">

														<label class="form__label">Slovenian:</label>
														<textarea

															className={!errAgreementTitle ? "form__input text-sm" : "form__input text-sm !border !border-red-500"}
															style={{ height: 80 }}
															readOnly={!edit}
															placeholder='Agreement title in slovenian'
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															onChange={(e) => setAgreementTitleTransl(e.target.value)}
															value={agreementTitleTransl === "" ? homeDataState.updateTourData.tour.agreementTitle.slovenian : agreementTitleTransl}

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
															readOnly={!edit}
															placeholder='Agreement description'
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															onChange={(e) => setAgreementDesc(e.target.value)}
															value={agreementDesc === "" ? homeDataState.updateTourData.tour.agreementDesc.english : agreementDesc}

														/>

														
													</div>

													<div class="flex flex-row gap-2 items-center">

														<label class="form__label">Slovenian:</label>
														<textarea

															className={!errAgreementDescription ? "form__input text-sm" : "form__input text-sm !border !border-red-500"}
															style={{ height: 80 }}
															readOnly={!edit}
															placeholder='Agreement description in slovenian'
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															onChange={(e) => setAgreementDescTransl(e.target.value)}
															value={agreementDescTransl === "" ? homeDataState.updateTourData.tour.agreementDesc.slovenian : agreementDescTransl}

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
												
												<div class="form__group mt-4">
													<label class="form__label">Short description</label>
													<div class="flex flex-col gap-2">

														<div class="flex flex-row gap-2 items-center">
															<label class="form__label" style={{ marginRight: "18px" }}>English:</label>
															<textarea

																className={!errShortDescription ? "form__input h-32" : "form__input h-32 !border !border-red-500"}
																style={{ height: 80 }}
																readOnly={!edit}
																placeholder='Short description'
																aria-describedby="basic-addon1"
																id="name"
																type="text"
																onChange={(e) => setShortInfo(e.target.value)}
																value={shortInfo === "" ? homeDataState.updateTourData.tour.shortInfo.english : shortInfo}

															/>


														</div>

														<div class="flex flex-row gap-2 items-center">
															<label class="form__label" >Slovenian:</label>
															<textarea

																className={!errShortDescription ? "form__input h-32" : "form__input h-32 !border !border-red-500"}
																style={{ height: 80 }}
																readOnly={!edit}
																placeholder='Short description in slovenian'
																aria-describedby="basic-addon1"
																id="name"
																type="text"
																onChange={(e) => setShortInfoTransl(e.target.value)}
																value={shortInfoTransl === "" ? homeDataState.updateTourData.tour.shortInfo.slovenian : shortInfoTransl}

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

															className={!errShortDescription ? "form__input h-32" : "form__input h-32 !border !border-red-500"}
															style={{ height: 80 }}
															readOnly={!edit}
															placeholder='Long description'
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															onChange={(e) => setLongInfo(e.target.value)}
															value={longInfo === "" ? homeDataState.updateTourData.tour.longInfo.english : longInfo}

														/>


													</div>

													<div class="flex flex-row gap-2 items-center">
														<label class="form__label" >Slovenian:</label>
														<textarea

															className={!errShortDescription ? "form__input h-32" : "form__input h-32 !border !border-red-500"}
															style={{ height: 80 }}
															readOnly={!edit}
															placeholder='Long description in slovenian'
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															onChange={(e) => setLongInfoTransl(e.target.value)}
															value={longInfoTransl === "" ? homeDataState.updateTourData.tour.longInfo.slovenian : longInfoTransl}

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

export default UpdatedTourData;