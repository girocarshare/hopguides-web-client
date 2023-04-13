import React, { useContext, useEffect, useState, forwardRef, useRef } from "react";
import { homeDataService } from "../services/HomeDataService";
import { HomeDataContext } from "../contexts/HomeDataContext";
import { homeDataConstants } from "../constants/HomeDataConstants";
import TimePicker from 'react-time-picker';
import { YMaps, Map } from "react-yandex-maps";
import { AiOutlineClose } from 'react-icons/ai';
import ReactAudioPlayer from 'react-audio-player';
import { StyledEngineProvider } from "@mui/material";
import Axios from "axios";
const mapState = {
	center: [44, 21],
	zoom: 8,
	controls: [],
};
var url = process.env.REACT_APP_URL || "http://localhost:8080/";
const POIData = () => {

	const addressInput = React.createRef(null);

	const [name, setName] = useState("");
	const [nameTransl, setNameTransl] = useState("");
	const [shortInfoPointTransl, setShortInfoPointTransl] = useState("");
	const [longInfoPointTransl, setLongInfoPointTransl] = useState("");
	const [voucherDescTransl, setVoucherDescTransl] = useState("");
	const [voucherDesc, setVoucherDesc] = useState("");


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
	const [imageTitles, setImageTitles] = useState([]);



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

			setNameTransl(response.data.choices[0].text)
		} else if (num == 2) {

			setShortInfoPointTransl(response.data.choices[0].text)
		} else if (num == 3) {

			setLongInfoPointTransl(response.data.choices[0].text)
		} else if (num == 4) {

			setVoucherDescTransl(response.data.choices[0].text)
		}

		return response.data.choices[0].text;
	};


	const selectFiles = (event) => {
		let images = [];


		var fs = []
		for (let i = 0; i < event.target.files.length; i++) {
			images.push(URL.createObjectURL(event.target.files[i]));
			var new_file = new File([event.target.files[i]], i + 'partner' + titlePoint + "---" + [event.target.files[i].name]);
			fs.push(new_file)

		}

		setSelectedFiles(selectedFiles.concat(fs))
		setImagePreviews(images);
		setProgressInfos({ val: [] });

	};

	const handleSubmit = (e) => {
		e.preventDefault();
		var point = {}

		if (nameTransl != "") {
			point.name = JSON.parse(nameTransl)
		}
		if (shortInfoPointTransl != "") {
			point.shortInfo = JSON.parse(shortInfoPointTransl)
		}
		if (longInfoPointTransl != "") {
			point.longInfo = JSON.parse(longInfoPointTransl)
		}
		if (voucherDescTransl != "") {
			point.voucherDesc = voucherDescTransl
		}
		if (price != 0) {
			point.price = price
		}
		if (currency != "") {
			point.currency = currency
		}
		if (offerName != "") {
			point.offerName = offerName
		}
		if (responsiblePerson != "") {
			point.contact.name = responsiblePerson
		}

		if (phone != "") {
			point.contact.phone = phone
		}
		if (email != "") {
			point.contact.email = email
		}
		if (weburl != "") {
			point.contact.webURL = weburl
		} if (longitude != "") {
			point.location.longitude = longitude
		}
		if (latitude != "") {
			point.location.latitude = latitude
		}
		if (category != "") {
			point.category = category
		} if (imageTitles != "") {
			point.imageTitles = imageTitles
		}

		point.id = homeDataState.updatePointData.point.id
		point.workingHours = { monday: { from: mondayFrom, to: mondayTo }, tuesday: { from: tuesdayFrom, to: tuesdayTo }, wednesday: { from: wednesdayFrom, to: wednesdayTo }, thursday: { from: thursdayFrom, to: thursdayTo }, friday: { from: fridayFrom, to: fridayTo }, saturday: { from: saturdayFrom, to: saturdayTo }, sunday: { from: sundayFrom, to: sundayTo } }


		const formData = new FormData();

		if (file != null) {

			formData.append('file', file);
		}
		if (audio != null) {

			formData.append('file', audio);
		}

		if (selectedFiles != []) {
			for (var f of selectedFiles) {

				formData.append('file', f);
			}
		}

		formData.append('point', JSON.stringify(point));

		var xhr = new XMLHttpRequest();
		xhr.addEventListener("load", SuccessHandler, false);
		xhr.addEventListener("error", ErrorHandler, false);
		xhr.addEventListener("abort", AbortHandler, false);
		//************************************** */
		xhr.open('POST', `${url}api/poi/update`, true);
		//xhr.setRequestHeader("Authorization", props.token);
		xhr.onload = function () {
			// do something to response
		};

		xhr.send(formData);

		// homeDataService.addTour(tour, dispatch);

	};


	const SuccessHandler = (e) => {


		homeDataService.updatePoint(true, dispatch);

		//dispatch({ type: homeDataConstants.UPDATE_MENU_PHOTO_SUCCESS });
	};
	const ErrorHandler = () => {

		//statusRef.current.innerHTML = "Upload failed";

		//dispatch({ type: homeDataConstants.UPDATE_MENU_PHOTO_FAILURE });
		homeDataService.updatePoint(false, dispatch);
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

			var new_file = new File([e.target.files[0]], 'audio2' + titlePoint + "---" + [e.target.files[0].name]);
			setAudio(new_file);

		}
	};

	const onFileChange = (event) => {

		var new_file = new File([event.target.files[0]], 'menu' + "---" + [event.target.files[0].name]);
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

	const changeImageTitle = (e, i) => {

		var tf = false;
		if (imageTitles.length == 0) {
			var p = e + "---" + i
			const newData = [p, ...imageTitles];
			setImageTitles(newData)
		} else {

			for (var a of imageTitles) {
				var h = a.split('---')
				if (h[1] == i) {
					tf = true
				}
			}

			if (tf) {
				for (var a of imageTitles) {

					var h = a.split('---')
					if (h[1] == i) {
						var arr = imageTitles
						arr.pop(a)
						var p = e + "---" + i
						arr.push(p)
						setImageTitles(arr)
					}

				}
			} else {
				var p = e + "---" + i
				var arr = imageTitles
				arr.push(p)
				setImageTitles(arr)

			}

		}
	};



	return (

		<div  >

			{homeDataState.updatePointData.show && <div class="overlay" >


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
												<label><b>Name</b></label>
												<div class="row" >
													<div class="form-group col-lg-10">
														{edit &&
															<div>
																<input

																	className={"form-control"}
																	placeholder="Name"
																	aria-describedby="basic-addon1"
																	id="name"
																	type="text"
																	style={{ backgroundColor: 'white', outline: 'none', width: "1000px", height: "50px" }}

																	onChange={(e) => setName(e.target.value)}
																	value={name}
																/>

																<button
																	style={{ background: "#0099ff", marginTop: "px", height: "35px" }}

																	onClick={(e) => fetchData(name, 1)}
																	className="btn btn-primary btn-xl"
																	id="sendMessageButton"
																	type="button"
																>
																	Translate partners name
																</button>
															</div>}
														<input
															readOnly={!edit}
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
															onChange={(e) => setNameTransl(e.target.value)}
															value={nameTransl === "" ? JSON.stringify(homeDataState.updatePointData.point.name) : nameTransl}
														/>

													</div>
												</div>
											</div>
										</div>


										<div className="control-group">
											<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
												<label><b>Short description</b></label>
												<div class="row" >
													<div class="form-group col-lg-10">
														{edit &&
															<div>
																<textarea className="form-control" style={{ height: "100px", width: "1000px" }} type="textarea" required name="message" placeholder='Short description' value={shortInfo} onChange={(e) => setShortInfo(e.target.value)}></textarea>

																<button
																	style={{ background: "#0099ff", marginTop: "px", height: "35px" }}

																	onClick={(e) => fetchData(shortInfo, 2)}
																	className="btn btn-primary btn-xl"
																	id="sendMessageButton"
																	type="button"
																>
																	Translate short description
																</button>

															</div>}
														<textarea
															readOnly={!edit}
															placeholder="Short description"
															aria-describedby="basic-addon1"
															id="name"
															type="textarea"
															style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
															onChange={(e) => setShortInfoPointTransl(e.target.value)}
															value={shortInfoPointTransl === "" ? JSON.stringify(homeDataState.updatePointData.point.shortInfo) : shortInfoPointTransl}
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
														{edit &&
															<div><textarea className="form-control" style={{ height: "200px", width: "1000px" }} type="textarea" required name="message" placeholder='Long description' value={longInfo} onChange={(e) => setLongInfo(e.target.value)}></textarea>
																<button
																	style={{ background: "#0099ff", marginTop: "px", height: "35px" }}

																	onClick={(e) => fetchData(longInfo, 3)}
																	className="btn btn-primary btn-xl"
																	id="sendMessageButton"
																	type="button"
																>
																	Translate long description
																</button>
															</div>}
														<textarea
															readOnly={!edit}
															placeholder="Long description"
															aria-describedby="basic-addon1"
															id="name"
															type="textarea"
															style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
															onChange={(e) => setLongInfoPointTransl(e.target.value)}
															value={longInfoPointTransl === "" ? JSON.stringify(homeDataState.updatePointData.point.longInfo) : longInfoPointTransl}
														/>
													</div>
												</div>
											</div>
										</div>

										{homeDataState.updatePointData.point.partner &&
											<div>
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
																		value={price === 0 ? `${homeDataState.updatePointData.point.price} ${homeDataState.updatePointData.point.currency} incl tax` : price}
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
														<label><b>Voucher description*</b></label>
														<div class="row" >
															<div class="form-group col-lg-10">
																{edit &&
																	<div><textarea className="form-control" style={{ height: "200px", width: "1000px" }} type="textarea" required name="message" placeholder='Voucher description' value={voucherDesc} onChange={(e) => setVoucherDesc(e.target.value)}></textarea>
																		<button
																			style={{ background: "#0099ff", marginTop: "px", height: "35px" }}

																			onClick={(e) => fetchData(voucherDesc, 4)}
																			className="btn btn-primary btn-xl"
																			id="sendMessageButton"
																			type="button"
																		>
																			Translate voucher description
																		</button>
																	</div>}
																<div >

																	<div class="form-group col-lg-10">
																		<input

																			className={"form-control"}
																			placeholder='Voucher description translated'
																			aria-describedby="basic-addon1"
																			id="name"
																			type="text"
																			style={{ backgroundColor: 'white', outline: 'none', width: "1000px", height: "50px" }}

																			onChange={(e) => setVoucherDescTransl(e.target.value)}
																			value={voucherDescTransl}
																		/>

																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>


												<div className="control-group">
													<div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
														<label><b>Offer name</b></label>
														<div class="row" >
															<div class="form-group col-lg-10">
																<input
																	readOnly={!edit}
																	placeholder="Offer name"
																	aria-describedby="basic-addon1"
																	id="name"
																	type="text"
																	style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
																	onChange={(e) => setOfferName(e.target.value)}
																	value={offerName === "" ? homeDataState.updatePointData.point.offerName : offerName}
																/>


															</div>
														</div>
													</div>
												</div>


												<div className="control-group">
													<div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
														<label><b>Contact: responsible person</b></label>
														<div class="row" >
															<div class="form-group col-lg-10">
																{homeDataState.updatePointData.point.contact.name != "" && <input
																	readOnly={!edit}
																	placeholder="Contact: responsible person"
																	aria-describedby="basic-addon1"
																	id="name"
																	type="text"
																	style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
																	onChange={(e) => setResponsiblePerson(e.target.value)}
																	value={responsiblePerson === "" ? homeDataState.updatePointData.point.contact.name : responsiblePerson}
																/>}
																1

															</div>
														</div>
													</div>
												</div>

												<div className="control-group">
													<div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
														<label><b>Contact: phone</b></label>
														<div class="row" >
															<div class="form-group col-lg-10">
																<input
																	readOnly={!edit}
																	placeholder="Contact: phone"
																	aria-describedby="basic-addon1"
																	id="name"
																	type="text"
																	style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
																	onChange={(e) => setPhone(e.target.value)}
																	value={phone === "" ? homeDataState.updatePointData.point.contact.phone : phone}
																/>


															</div>
														</div>
													</div>
												</div>

												<div className="control-group">
													<div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
														<label><b>Contact: email</b></label>
														<div class="row" >
															<div class="form-group col-lg-10">
																<input
																	readOnly={!edit}
																	placeholder="Contact: email"
																	aria-describedby="basic-addon1"
																	id="name"
																	type="text"
																	style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
																	onChange={(e) => setEmail(e.target.value)}
																	value={email === "" ? homeDataState.updatePointData.point.contact.email : email}
																/>


															</div>
														</div>
													</div>
												</div>
												<div className="control-group">
													<div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
														<label><b>Contact: website</b></label>
														<div class="row" >
															<div class="form-group col-lg-10">
																<input
																	readOnly={!edit}
																	placeholder="Contact: website"
																	aria-describedby="basic-addon1"
																	id="name"
																	type="text"
																	style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
																	onChange={(e) => setWebURL(e.target.value)}
																	value={weburl === "" ? homeDataState.updatePointData.point.contact.weburl : weburl}
																/>


															</div>
														</div>
													</div>
												</div></div>}

										<div className="control-group">
											<div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
												<label><b>Location</b></label>
												<div class="row" >
													<div class="form-group col-lg-10">
														<input
															readOnly={!edit}
															placeholder="Longitude"
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
															onChange={(e) => setLongitude(e.target.value)}
															value={longitude === "" ? homeDataState.updatePointData.point.location.longitude : longitude}
														/>
														<input
															readOnly={!edit}
															placeholder="Latitude"
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
															onChange={(e) => setLatitude(e.target.value)}
															value={latitude === "" ? homeDataState.updatePointData.point.location.latitude : latitude}
														/>


													</div>
												</div>
											</div>
										</div>
										<div className="control-group">
											<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
												<label><b>Category</b></label>
												<div class="row" >
													<div class="form-group col-lg-10">
														<div class="button-login">


															{!edit && <input
																readOnly={!edit}
																placeholder="Category"
																aria-describedby="basic-addon1"
																id="name"
																type="text"
																style={{ backgroundColor: edit === true ? '#DCDCDC' : 'white', outline: 'none' }}
																onChange={(e) => setCategory(e.target.value)}
																value={category === "" ? homeDataState.updatePointData.point.category : category}
															/>}
															{edit && <select onChange={(e) => setCategory(e.target.value)} name="currency" class="custom-select" style={{ height: "50px", width: "200px" }}>
																{categories.map(item =>
																	<option key={item} value={item} >{item}</option>
																)};

															</select>}
														</div>
													</div>
												</div>
											</div>
										</div>
										{homeDataState.updatePointData.point.partner &&
											<div>

												<h6><b>Working hours *</b></h6>


												{!edit && <div>


													<br />
													<label>
														Monday:
													</label>
													<label>
														{homeDataState.updatePointData.point.workingHours.monday.from} - {homeDataState.updatePointData.point.workingHours.monday.to}
													</label>
													<br />
													<label>
														Tuesday:
													</label>
													<label>
														{homeDataState.updatePointData.point.workingHours.tuesday.from} - {homeDataState.updatePointData.point.workingHours.tuesday.to}
													</label>	<br />
													<label>
														Wednesday:
													</label>
													<label>
														{homeDataState.updatePointData.point.workingHours.wednesday.from} - {homeDataState.updatePointData.point.workingHours.wednesday.to}
													</label>
													<br />
													<label>
														Thursday:
													</label>
													<label>
														{homeDataState.updatePointData.point.workingHours.thursday.from} - {homeDataState.updatePointData.point.workingHours.thursday.to}
													</label>
													<br />
													<label>
														Friday:
													</label>
													<label>
														{homeDataState.updatePointData.point.workingHours.friday.from} - {homeDataState.updatePointData.point.workingHours.friday.to}
													</label>
													<br />
													<label>
														Saturday:
													</label>
													<label>
														{homeDataState.updatePointData.point.workingHours.saturday.from} - {homeDataState.updatePointData.point.workingHours.saturday.to}
													</label>
													<br />
													<label>
														Sunday:
													</label>
													<label>
														{homeDataState.updatePointData.point.workingHours.sunday.from} - {homeDataState.updatePointData.point.workingHours.sunday.to}
													</label>
												</div>
												}

												{edit &&
													<div>
														<br />

														<div className="control-group">
															<div className="form-group controls mb-0 pb-2" style={{ opacity: 1, marginLeft: "300px" }}>
																<label><b>Monday</b></label>

																<br />
																<label>
																	<input
																		type="checkbox"
																		checked={mondayclosed}
																		onChange={(e) => setMondayClosed(!mondayclosed)}
																	/>
																	closed
																</label>
																{!mondayclosed && <div class="row"  >
																	<span style={{ marginLeft: "20px", marginRight: "30px" }}>
																		<TimePicker disableClock={true} onChange={(newValue) => {
																			setMondayFrom(newValue);
																		}} value={mondayFrom} />
																	</span>  <span >
																		<TimePicker disableClock={true} onChange={(newValue) => {
																			setMondayTo(newValue);
																		}} value={mondayTo} /></span>


																</div>}
															</div>
														</div>

														<div className="control-group">
															<div className="form-group controls mb-0 pb-2" style={{ opacity: 1, marginLeft: "300px" }}>
																<label><b>Tuesday</b></label>
																<br />
																<label>
																	<input
																		type="checkbox"
																		checked={tuesdayclosed}
																		onChange={(e) => setTuesdayClosed(!tuesdayclosed)}
																	/>
																	closed
																</label>
																{!tuesdayclosed && <div class="row" >
																	<span style={{ marginLeft: "20px", marginRight: "30px" }}>
																		<TimePicker disableClock={true} onChange={(newValue) => {
																			setTuesdayFrom(newValue);
																		}} value={tuesdayFrom} />
																	</span>  <span >
																		<TimePicker disableClock={true} onChange={(newValue) => {
																			setTuesdayTo(newValue);
																		}} value={tuesdayTo} /></span>
																</div>}
															</div>
														</div>

														<div className="control-group">
															<div className="form-group controls mb-0 pb-2" style={{ opacity: 1, marginLeft: "300px" }}>
																<label><b>Wednesday</b></label>
																<br />
																<label>
																	<input
																		type="checkbox"
																		checked={wednesdayclosed}
																		onChange={(e) => setWednesdayClosed(!wednesdayclosed)}
																	/>
																	closed
																</label>
																{!wednesdayclosed && <div class="row" >
																	<span style={{ marginLeft: "20px", marginRight: "30px" }}>
																		<TimePicker disableClock={true} onChange={(newValue) => {
																			setWednesdayFrom(newValue);
																		}} value={wednesdayFrom} />
																	</span>  <span >
																		<TimePicker disableClock={true} onChange={(newValue) => {
																			setWednesdayTo(newValue);
																		}} value={wednesdayTo} /></span>


																</div>}
															</div>
														</div>

														<div className="control-group">
															<div className="form-group controls mb-0 pb-2" style={{ opacity: 1, marginLeft: "300px" }}>
																<label><b>Thursday</b></label>
																<br />
																<label>
																	<input
																		type="checkbox"
																		checked={thursdayclosed}
																		onChange={(e) => setThursdayClosed(!thursdayclosed)}
																	/>
																	closed
																</label>
																{!thursdayclosed && <div class="row" >

																	<span style={{ marginLeft: "20px", marginRight: "30px" }}>
																		<TimePicker disableClock={true} onChange={(newValue) => {
																			setThursdayFrom(newValue);
																		}} value={thursdayFrom} />
																	</span>  <span >
																		<TimePicker disableClock={true} onChange={(newValue) => {
																			setThursdayTo(newValue);
																		}} value={thursdayTo} /></span>


																</div>}
															</div>
														</div>

														<div className="control-group">
															<div className="form-group controls mb-0 pb-2" style={{ opacity: 1, marginLeft: "300px" }}>
																<label><b>Friday</b></label>
																<br />
																<label>
																	<input
																		type="checkbox"
																		checked={fridayclosed}
																		onChange={(e) => setFridayClosed(!fridayclosed)}
																	/>
																	closed
																</label>
																{!fridayclosed && <div class="row" >

																	<span style={{ marginLeft: "20px", marginRight: "30px" }}>
																		<TimePicker disableClock={true} onChange={(newValue) => {
																			setFridayFrom(newValue);
																		}} value={fridayFrom} />
																	</span>  <span >
																		<TimePicker disableClock={true} onChange={(newValue) => {
																			setFridayTo(newValue);
																		}} value={fridayTo} /></span>


																</div>}
															</div>
														</div>

														<div className="control-group">
															<div className="form-group controls mb-0 pb-2" style={{ opacity: 1, marginLeft: "300px" }}>
																<label><b>Saturday</b></label>
																<br />
																<label>
																	<input
																		type="checkbox"
																		checked={saturdayclosed}
																		onChange={(e) => setSaturdayClosed(!saturdayclosed)}
																	/>
																	closed
																</label>
																{!saturdayclosed && <div class="row" >


																	<span style={{ marginLeft: "20px", marginRight: "30px" }}>
																		<TimePicker disableClock={true} onChange={(newValue) => {
																			setSaturdayFrom(newValue);
																		}} value={saturdayFrom} />
																	</span>  <span >
																		<TimePicker disableClock={true} onChange={(newValue) => {
																			setSaturdayTo(newValue);
																		}} value={saturdayTo} /></span>

																</div>}
															</div>
														</div>

														<div className="control-group">
															<div className="form-group controls mb-0 pb-2" style={{ opacity: 1, marginLeft: "300px" }}>
																<label><b>Sunday</b></label>
																<br />
																<label>
																	<input
																		type="checkbox"
																		checked={sundayclosed}
																		onChange={(e) => setSundayClosed(!sundayclosed)}
																	/>
																	closed
																</label>
																{!sundayclosed && <div class="row" >


																	<span style={{ marginLeft: "20px", marginRight: "30px" }}>
																		<TimePicker disableClock={true} onChange={(newValue) => {
																			setSundayFrom(newValue);
																		}} value={sundayFrom} />
																	</span>  <span >
																		<TimePicker disableClock={true} onChange={(newValue) => {
																			setSundayTo(newValue);
																		}} value={sundayTo} /></span>

																</div>}
															</div>
														</div>

													</div>}
											</div>}

										<div className="control-group">
											<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>

												<div class="row" >
													<div class="form-group col-lg-10">



														<div style={{ marginTop: "15px" }}>
															<label><b>Menu image</b></label>
															<br />   <br />
															{edit && <input type={"file"} name="file" onChange={onFileChange} />}

														</div>

														{fileData()}

														{imagePreview && <img className="preview" src={imagePreview} alt={"image-"} />}
														{!imagePreview && <img className="preview" src={homeDataState.updatePointData.point.menu} alt={"image-"} />}


														<br />
													</div>
												</div>
											</div>
										</div>

										<div>

											<label><b>Image gallery</b></label>
											<br /><br />
											{edit && <div className="row">
												<div className="col-8">
													<label className="btn btn-default p-0">
														<input
															type="file"
															multiple
															accept="image/*"
															onChange={selectFiles}
														/>
													</label>
												</div>


											</div>}

											{progressInfos &&
												progressInfos.val.length > 0 &&
												progressInfos.val.map((progressInfo, index) => (
													<div className="mb-2" key={index}>
														<span>{progressInfo.fileName}</span>
														<div className="progress">
															<div
																className="progress-bar progress-bar-info"
																role="progressbar"
																aria-valuenow={progressInfo.percentage}
																aria-valuemin="0"
																aria-valuemax="100"
																style={{ width: progressInfo.percentage + "%" }}
															>
																{progressInfo.percentage}%
															</div>
														</div>
													</div>
												))}

											{imagePreviews.length != 0 && (
												<div>
													{imagePreviews.map((img, i) => {
														return (
															<div>
																<br />
																<img className="preview" src={img} alt={"image-" + i} key={i} />

																<input

																	className={"form-control"}
																	placeholder={i}
																	aria-describedby="basic-addon1"
																	id="name"
																	type="text"
																	style={{ backgroundColor: 'white', outline: 'none', width: "1000px", height: "50px" }}

																	onChange={(e) => changeImageTitle(e.target.value, i)}
																/>
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
																<br />
																<img className="preview" src={img} alt={"image-" + img} key={i} />
															</div>
														);
													})}
												</div>
											)}


										</div>

										<div className="control-group">
											<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>

												<div class="row" >
													<div class="form-group col-lg-10">


														<div style={{ marginTop: "15px" }}>

															<label><b>Text to speach audio</b></label>
															<br />   <br />
															{!audio && <ReactAudioPlayer
																src={homeDataState.updatePointData.point.audio}

																controls
															/>}

															{edit && <input type={"file"} accept={".mp3"} onChange={addFile} />}
														</div>

														<br />
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
												Update point
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

export default POIData;
