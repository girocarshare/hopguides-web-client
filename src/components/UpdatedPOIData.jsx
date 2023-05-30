import React, { useContext, useEffect, useState, forwardRef, useRef } from "react";
import { homeDataService } from "../services/HomeDataService";
import { HomeDataContext } from "../contexts/HomeDataContext";
import { homeDataConstants } from "../constants/HomeDataConstants";
import TimePicker from 'react-time-picker';
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
const UpdatedPOIData = () => {

	const addressInput = React.createRef(null);
	const [errImageTitle, setErrImageTitle] = useState("");
	const [errTitlePoint, setErrTitlePoint] = useState("");
	const [errShortDescriptionPoint, setErrShortDescriptionPoint] = useState("");
	const [errLongDescriptionPoint, setErrLongDescriptionPoint] = useState("");
	const [errVoucherDescriptionPoint, setErrVoucherDescriptionPoint] = useState("");

	const [audioNamePoint, setAudioNamePoint] = useState("");
	const [name, setName] = useState("");
	const [nameTransl, setNameTransl] = useState("");
	const [shortInfoPointTransl, setShortInfoPointTransl] = useState("");
	const [longInfoPointTransl, setLongInfoPointTransl] = useState("");
	const [voucherDescTransl, setVoucherDescTransl] = useState("");
	const [voucherDesc, setVoucherDesc] = useState("");

	const [errMessagePartner, setErrMessagePartner] = useState("");

	const [shortInfo, setShortInfo] = useState("");
	const [longInfo, setLongInfo] = useState("");
	const [price, setPrice] = useState(0);
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [files, setFiles] = useState([]);
	const [imagePreviews, setImagePreviews] = useState([]);
	const [progressInfos, setProgressInfos] = useState({ val: [] });

	const [edit, setEdit] = useState(false);
	const [titlePoint, setTitlePoint] = useState("");
	const [offerName, setOfferName] = useState("");
	const [responsiblePerson, setResponsiblePerson] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [weburl, setWebURL] = useState("");
	const [longitude, setLongitude] = useState("");
	const [latitude, setLatitude] = useState("");
	const [category, setCategory] = useState("");
	const [menu, setMenu] = useState(null);
	const [currency, setCurrency] = useState("");
	const [currencyList, setCurrencyList] = useState(["£", "€", "$"]);
	const [categories, setCategories] = useState(["HISTORY", "DRINKS", "NATURE", "EATS", "BRIDGE", "MUSEUMS", "EXPERIENCE"]);

	const [errMessage, setErrMessage] = useState("");
	const [points, setPoints] = useState([]);
	const progressRef = React.useRef();
	const statusRef = React.useRef();
	const [file, setFile] = useState(null);
	const [audio, setAudio] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [errMessagePhoto, setErrMessagePhoto] = useState("");
	const [imageTitles, setImageTitles] = useState([]);


	const [mondayFrom, setMondayFrom] = useState("");
	const [mondayTo, setMondayTo] = useState("");
	const [tuesdayFrom, setTuesdayFrom] = useState("");
	const [tuesdayTo, setTuesdayTo] = useState("");
	const [wednesdayFrom, setWednesdayFrom] = useState("");
	const [wednesdayTo, setWednesdayTo] = useState("");
	const [thursdayFrom, setThursdayFrom] = useState("");
	const [thursdayTo, setThursdayTo] = useState("");
	const [fridayFrom, setFridayFrom] = useState("");
	const [fridayTo, setFridayTo] = useState("");
	const [saturdayFrom, setSaturdayFrom] = useState("");
	const [saturdayTo, setSaturdayTo] = useState("");
	const [sundayFrom, setSundayFrom] = useState("");
	const [sundayTo, setSundayTo] = useState("");

	const [mondayclosed, setMondayClosed] = useState(false);
	const [tuesdayclosed, setTuesdayClosed] = useState(false);
	const [wednesdayclosed, setWednesdayClosed] = useState(false);
	const [thursdayclosed, setThursdayClosed] = useState(false);
	const [fridayclosed, setFridayClosed] = useState(false);
	const [saturdayclosed, setSaturdayClosed] = useState(false);
	const [sundayclosed, setSundayClosed] = useState(false);


	const { homeDataState, dispatch } = useContext(HomeDataContext);



	const handleModalClose = () => {
		dispatch({ type: homeDataConstants.UPDATE_POINT_DATA_MODAL_CLOSE });
	};



	return (

		<div>

			{homeDataState.updatePointData.show &&


				<div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">

					<div class="modal-overlay"></div>

					<div class="fixed inset-0 z-10 overflow-y-auto">

						<div class="modal-frame">

							<div id="myModal" class="modal modal--3xl">

								<div class="modal__header">
									<h2 class="text-leading">
										Update POI
									</h2>
									<button class="button button--circle button--clear justify-self-end" type="button"
										onClick={handleModalClose}>
										<AiOutlineClose />
									</button>
								</div>

								<div className="modal__body">
									<form class="form" id="contactForm">

										<div className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
											<div className="form__group">
												<label class="form__label">Name</label>
												<div class="flex flex-col gap-2">

													<input
														className={"form__input"}
														readOnly={!edit}
														aria-describedby="basic-addon1"
														id="name"
														type="text"
														onChange={(e) => setNameTransl(e.target.value)}
														value={nameTransl === "" ? JSON.stringify(homeDataState.updatePointData.point.name) : nameTransl}
													/>
												</div>
											</div>
										</div>

										<div className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
											<div className="form__group">
												<label class="form__label">Short description</label>


												<textarea
													readOnly={!edit}
													className={!errShortDescriptionPoint ? "form__input text-sm h-32" : "form__input text-sm h-32 !border !border-red-500"}
													placeholder="Short description"
													aria-describedby="basic-addon1"
													id="name"
													type="textarea"
													onChange={(e) => setShortInfoPointTransl(e.target.value)}
													value={shortInfoPointTransl === "" ? JSON.stringify(homeDataState.updatePointData.point.shortInfo) : shortInfoPointTransl}
												/>
												<div className="paragraph-box2 grid dgrid-row place-items-center"
													style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }}
													hidden={!errShortDescriptionPoint}>
													{errShortDescriptionPoint}
												</div>
											</div>
										</div>
										<div className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
											<div className="form__group">
												<label class="form__label">Long description</label>

												<textarea
													readOnly={!edit}
													className={!errLongDescriptionPoint ? "form__input text-sm h-32" : "form__input text-sm h-32 !border !border-red-500"}
													placeholder="Long description"
													aria-describedby="basic-addon1"
													id="name"
													type="textarea"
													onChange={(e) => setLongInfoPointTransl(e.target.value)}
													value={longInfoPointTransl === "" ? JSON.stringify(homeDataState.updatePointData.point.longInfo) : longInfoPointTransl}
												/>
												<div className="paragraph-box2 grid dgrid-row place-items-center"
													style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }}
													hidden={!errLongDescriptionPoint}>
													{errLongDescriptionPoint}
												</div>
											</div>
										</div>
										{homeDataState.updatePointData.point.offerName &&
											<div class="form">

												<div className="form__group">
													<label class="form__label">Price</label>
													<div class="flex flex-row gap-2">


														<input
															readOnly={!edit}
															placeholder="Price"
															aria-describedby="basic-addon1"
															className={"form__input grow "}
															id="name"
															type="number"
															onChange={(e) => setPrice(e.target.value)}
															value={price === 0 ? `${homeDataState.updatePointData.point.price} ${homeDataState.updatePointData.point.currency} incl tax` : price}
														/>

														{edit && <select onChange={(e) => setCurrency(e.target.value)}
															name="currency"
															class="form__input shrink max-w-4 "
														>
															{currencyList.map(item =>
																<option key={item} value={item}>{item}</option>
															)};

														</select>}
													</div>
												</div>
												<div className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
													<div className="form__group">
														<label class="form__label">Voucher description*</label>
														
														<textarea

															className={!errVoucherDescriptionPoint ? "form__input text-sm h-32" : "form__input text-sm h-32 !border !border-red-500"}
															placeholder='Voucher description translated'
															aria-describedby="basic-addon1"
															id="name"
															type="text"

															onChange={(e) => setVoucherDescTransl(e.target.value)}
															value={voucherDescTransl}
														/>
														<div className="paragraph-box2 grid dgrid-row place-items-center"
															style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }}
															hidden={!errVoucherDescriptionPoint}>
															{errVoucherDescriptionPoint}
														</div>
													</div>
												</div>

												<div className="form__group">
													<label class="form__label">Offer name</label>
													<input

														className={"form__input"}
														readOnly={!edit}
														placeholder="Offer name"
														aria-describedby="basic-addon1"
														id="name"
														type="text"
														onChange={(e) => setOfferName(e.target.value)}
														value={offerName === "" ? homeDataState.updatePointData.point.offerName : offerName}
													/>
												</div>

												<div
													className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
													<div className="form__group">
														<label class="form__label">Contact: responsible person</label>
														{homeDataState.updatePointData.point.contact.name != "" &&
															<input
																className={"form__input"}
																readOnly={!edit}
																placeholder="Contact: responsible person"
																aria-describedby="basic-addon1"
																id="name"
																type="text"
																onChange={(e) => setResponsiblePerson(e.target.value)}
																value={responsiblePerson === "" ? homeDataState.updatePointData.point.contact.name : responsiblePerson}
															/>}
													</div>

													<div className="form__group">
														<label class="form__label">Contact: phone</label>
														<input
															className={"form__input"}
															readOnly={!edit}
															placeholder="Contact: phone"
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															onChange={(e) => setPhone(e.target.value)}
															value={phone === "" ? homeDataState.updatePointData.point.contact.phone : phone}
														/>
													</div>

													<div className="form__group">
														<label class="form__label">Contact: email</label>
														<input
															className={"form__input"}
															readOnly={!edit}
															placeholder="Contact: email"
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															onChange={(e) => setEmail(e.target.value)}
															value={email === "" ? homeDataState.updatePointData.point.contact.email : email}
														/>
													</div>
													<div className="form__group">
														<label class="form__label">Contact: website</label>
														<input
															className={"form__input"}
															readOnly={!edit}
															placeholder="Contact: website"
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															onChange={(e) => setWebURL(e.target.value)}
															value={weburl === "" ? homeDataState.updatePointData.point.contact.webURL : weburl}
														/>
													</div>
												</div>
											</div>}
										<div
											className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">

											<label class="form__label">Location</label>
											<div className="form__group">
												<input
													className={"form__input"}
													readOnly={!edit}
													placeholder="Longitude"
													aria-describedby="basic-addon1"
													id="name"
													type="text"
													onChange={(e) => setLongitude(e.target.value)}
													value={longitude === "" ? homeDataState.updatePointData.point.location.longitude : longitude}
												/>
											</div>
											<input
												className={"form__input"}
												readOnly={!edit}
												placeholder="Latitude"
												aria-describedby="basic-addon1"
												id="name"
												type="text"
												onChange={(e) => setLatitude(e.target.value)}
												value={latitude === "" ? homeDataState.updatePointData.point.location.latitude : latitude}
											/>

										</div>
										<div className="form__group">
											<label class="form__label">Category</label>
											{!edit &&
												<input
													className={"form__input"}
													readOnly={!edit}
													placeholder="Category"
													aria-describedby="basic-addon1"
													id="name"
													type="text"
													onChange={(e) => setCategory(e.target.value)}
													value={category === "" ? homeDataState.updatePointData.point.category : category}
												/>}
											{edit &&
												<select
													onChange={(e) => setCategory(e.target.value)}
													name="currency" class="form__input"
												>
													{categories.map(item =>
														<option key={item}
															value={item}>{item}</option>
													)};
												</select>}
										</div>
										{homeDataState.updatePointData.point.partner &&
											<div class="bg-black/[3%] p-4 rounded-xl gap-2 divide-y">

												<label class="form__label">Working hours *</label>


												{!edit &&
													<div class="form pt-6">
														<div className="form__group">
															<label class="form__label">
																Monday:
															</label>
															<label>
																{homeDataState.updatePointData.point.workingHours.monday.from} - {homeDataState.updatePointData.point.workingHours.monday.to}
															</label>
														</div>
														<div className="form__group">
															<label class="form__label">
																Tuesday:
															</label>
															<label>
																{homeDataState.updatePointData.point.workingHours.tuesday.from} - {homeDataState.updatePointData.point.workingHours.tuesday.to}
															</label>
														</div>
														<div className="form__group">
															<label class="form__label">
																Wednesday:
															</label>
															<label>
																{homeDataState.updatePointData.point.workingHours.wednesday.from} - {homeDataState.updatePointData.point.workingHours.wednesday.to}
															</label>
														</div>
														<div className="form__group">
															<label class="form__label">
																Thursday:
															</label>
															<label>
																{homeDataState.updatePointData.point.workingHours.thursday.from} - {homeDataState.updatePointData.point.workingHours.thursday.to}
															</label>
														</div>
														<div className="form__group">
															<label class="form__label">
																Friday:
															</label>
															<label>
																{homeDataState.updatePointData.point.workingHours.friday.from} - {homeDataState.updatePointData.point.workingHours.friday.to}
															</label>
														</div>
														<div className="form__group">
															<label class="form__label">
																Saturday:
															</label>
															<label>
																{homeDataState.updatePointData.point.workingHours.saturday.from} - {homeDataState.updatePointData.point.workingHours.saturday.to}
															</label>
														</div>
														<div className="form__group">
															<label class="form__label">
																Sunday:
															</label>
															<label>
																{homeDataState.updatePointData.point.workingHours.sunday.from} - {homeDataState.updatePointData.point.workingHours.sunday.to}
															</label>
														</div>
													</div>
												}

												{edit &&
													<div>

														<div className="form__group">

															<label class="form__label">Monday</label>
															<label>
																<input
																	type="checkbox"
																	checked={mondayclosed}
																	onChange={(e) => setMondayClosed(!mondayclosed)}
																/>
																closed
															</label>
															{!mondayclosed &&
																<div>
																	<span>
																		<TimePicker disableClock={true}
																			onChange={(newValue) => {
																				setMondayFrom(newValue);
																			}} value={mondayFrom} />
																	</span>
																	<span>
																		<TimePicker disableClock={true}
																			onChange={(newValue) => {
																				setMondayTo(newValue);
																			}} value={mondayTo} />
																	</span>
																</div>
															}
														</div>

														<div className="form__group">
															<label class="form__label">Tuesday</label>
															<label>
																<input
																	type="checkbox"
																	checked={tuesdayclosed}
																	onChange={(e) => setTuesdayClosed(!tuesdayclosed)}
																/>
																closed
															</label>
															{!tuesdayclosed &&
																<div>
																	<span>
																		<TimePicker disableClock={true}
																			onChange={(newValue) => {
																				setTuesdayFrom(newValue);
																			}} value={tuesdayFrom} />
																	</span>
																	<span>
																		<TimePicker disableClock={true}
																			onChange={(newValue) => {
																				setTuesdayTo(newValue);
																			}} value={tuesdayTo} />
																	</span>
																</div>
															}
														</div>

														<div className="form__group">
															<label class="form__label">Wednesday</label>
															<label>
																<input
																	type="checkbox"
																	checked={wednesdayclosed}
																	onChange={(e) => setWednesdayClosed(!wednesdayclosed)}
																/>
																closed
															</label>
															{!wednesdayclosed &&
																<div>
																	<span>
																		<TimePicker disableClock={true}
																			onChange={(newValue) => {
																				setWednesdayFrom(newValue);
																			}} value={wednesdayFrom} />
																	</span>
																	<span>
																		<TimePicker disableClock={true}
																			onChange={(newValue) => {
																				setWednesdayTo(newValue);
																			}} value={wednesdayTo} />
																	</span>
																</div>
															}
														</div>

														<div className="form__group">
															<label class="form__label">Thursday</label>
															<label>
																<input
																	type="checkbox"
																	checked={thursdayclosed}
																	onChange={(e) => setThursdayClosed(!thursdayclosed)}
																/>
																closed
															</label>
															{!thursdayclosed &&
																<div>

																	<span>
																		<TimePicker disableClock={true}
																			onChange={(newValue) => {
																				setThursdayFrom(newValue);
																			}} value={thursdayFrom} />
																	</span>
																	<span>
																		<TimePicker disableClock={true}
																			onChange={(newValue) => {
																				setThursdayTo(newValue);
																			}} value={thursdayTo} />
																	</span>
																</div>
															}
														</div>

														<div className="form__group">
															<label class="form__label">Friday</label>
															<label>
																<input
																	type="checkbox"
																	checked={fridayclosed}
																	onChange={(e) => setFridayClosed(!fridayclosed)}
																/>
																closed
															</label>
															{!fridayclosed &&
																<div>

																	<span>
																		<TimePicker disableClock={true}
																			onChange={(newValue) => {
																				setFridayFrom(newValue);
																			}} value={fridayFrom} />
																	</span> <span>
																		<TimePicker disableClock={true}
																			onChange={(newValue) => {
																				setFridayTo(newValue);
																			}} value={fridayTo} /></span>


																</div>}
														</div>

														<div className="form__group">
															<label class="form__label">Saturday</label>
															<label>
																<input
																	type="checkbox"
																	checked={saturdayclosed}
																	onChange={(e) => setSaturdayClosed(!saturdayclosed)}
																/>
																closed
															</label>
															{!saturdayclosed && <div>


																<span>
																	<TimePicker disableClock={true}
																		onChange={(newValue) => {
																			setSaturdayFrom(newValue);
																		}} value={saturdayFrom} />
																</span> <span>
																	<TimePicker disableClock={true}
																		onChange={(newValue) => {
																			setSaturdayTo(newValue);
																		}} value={saturdayTo} /></span>

															</div>}
														</div>

														<div className="form__group">
															<label class="form__label">Sunday</label>
															<label>
																<input
																	type="checkbox"
																	checked={sundayclosed}
																	onChange={(e) => setSundayClosed(!sundayclosed)}
																/>
																closed
															</label>
															{!sundayclosed && <div>


																<span>
																	<TimePicker disableClock={true}
																		onChange={(newValue) => {
																			setSundayFrom(newValue);
																		}} value={sundayFrom} />
																</span> <span>
																	<TimePicker disableClock={true}
																		onChange={(newValue) => {
																			setSundayTo(newValue);
																		}} value={sundayTo} /></span>

															</div>}
														</div>

													</div>}
											</div>}

										<div className="form__group">
											<label class="form__label">Menu image</label>
											
											{imagePreview &&
												<img className="preview" src={imagePreview}
													alt={"image-"} />}
											{!imagePreview && <img className="preview"
												src={homeDataState.updatePointData.point.menu}
												alt={"image-"} />}
										</div>

										<div>

											<label class="form__label">Image gallery</label>

											<br />


											{imagePreviews.length != 0 && (
												<div>
													{imagePreviews.map((img, i) => {
														return (
															<div>
																<img className="image__preview" src={img}
																	alt={"image-" + i} key={i} />

																<br />

																<br />
															</div>
														);
													})}
												</div>
											)}
											{imagePreviews.length == 0 && (
												<div>
													{homeDataState.updatePointData.point.images.map((img, i) => {
														return (
															<div>
																<img className="image__preview" src={img.image}
																	alt={"image-" + img} key={i} />
																<br />
															</div>
														);
													})}
												</div>
											)}


										</div>

										<div className="form__group">

											<label class="form__label">Text to speach audio</label>




										</div>

										{!audio && <ReactAudioPlayer
											src={homeDataState.updatePointData.point.audio}

											controls
										/>}
										<div className="paragraph-box2 grid dgrid-row place-items-center"
											style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }}
											hidden={!errMessagePartner}>
											{errMessagePartner}
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

export default UpdatedPOIData;