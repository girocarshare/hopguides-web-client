import React, { useContext, useEffect, useState, forwardRef, useRef } from "react";
import { homeDataService } from "../services/HomeDataService";
import { HomeDataContext } from "../contexts/HomeDataContext";
import { homeDataConstants } from "../constants/HomeDataConstants";
import TimePicker from 'react-time-picker';
import Axios from "axios";
import { deleteLocalStorage, authHeader } from "../helpers/auth-header";
import { AiOutlineClose } from 'react-icons/ai';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

var num = 1;

var url = process.env.REACT_APP_URL || "http://localhost:8080/";
const AddNewPartnerForm = (props) => {

	const [loading, setLoading] = useState(false);
	const [errImageTitle, setErrImageTitle] = useState("");
	const [errTitlePoint, setErrTitlePoint] = useState("");
	const [errShortDescriptionPoint, setErrShortDescriptionPoint] = useState("");
	const [errLongDescriptionPoint, setErrLongDescriptionPoint] = useState("");
	const [errVoucherDescriptionPoint, setErrVoucherDescriptionPoint] = useState("");

	const [audioName, setAudioName] = useState("");
	const [titlePoint, setTitlePoint] = useState("");
	const [titlePointTransl, setTitlePointTransl] = useState("");
	const [shortInfoPoint, setShortInfoPoint] = useState("");
	const [shortInfoPointTransl, setShortInfoPointTransl] = useState("");
	const [longInfoPoint, setLongInfoPoint] = useState("");
	const [longInfoPointTransl, setLongInfoPointTransl] = useState("");
	const [pointPrice, setPointPrice] = useState("");
	const [offerName, setOfferName] = useState("");
	const [duration, setDuration] = useState("");
	const [length, setLength] = useState("");
	const [imagePreview, setImagePreview] = useState("");
	const [highestPoint, setHighestPoint] = useState("");

	const [location, setLocation] = useState("");
	const [longitude, setLongitude] = useState("");
	const [latitude, setLatitude] = useState("");
	const [phone, setPhone] = useState("");
	const [hotelId, setHotelId] = useState("");
	const [email, setEmail] = useState("");
	const [responsiblePerson, setResponsiblePerson] = useState("");
	const [webURL, setWebUrl] = useState("");

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
	const [partner, setPartner] = useState(false);
	const [point, setPoint] = useState(false);
	const [videoPreview, setVideoPreview] = useState(null);
	const [imageTitles, setImageTitles] = useState([]);

	const [mondayclosed, setMondayClosed] = useState(false);
	const [tuesdayclosed, setTuesdayClosed] = useState(false);
	const [wednesdayclosed, setWednesdayClosed] = useState(false);
	const [thursdayclosed, setThursdayClosed] = useState(false);
	const [fridayclosed, setFridayClosed] = useState(false);
	const [saturdayclosed, setSaturdayClosed] = useState(false);
	const [sundayclosed, setSundayClosed] = useState(false);

	const [errMessagePartner, setErrMessagePartner] = useState("");
	const [errMessage, setErrMessage] = useState("");
	const [voucherDesc, setVoucherDesc] = useState("");
	const [voucherDescTransl, setVoucherDescTransl] = useState("");
	const [errMessagePhoto, setErrMessagePhoto] = useState("");
	const [points, setPoints] = useState([]);
	const [add, setAdd] = useState(false);
	const [file, setFile] = useState(null);
	const [audio, setAudio] = useState();
	const [audio2, setAudio2] = useState();
	const [audios, setAudios] = useState([]);
	const statusRef = React.useRef();
	const progressRef = React.useRef();
	const [currency, setCurrency] = useState("");
	const [currencyList, setCurrencyList] = useState(["£", "€", "$"]);

	const [selectedFiles, setSelectedFiles] = useState([]);
	const [files, setFiles] = useState([]);
	const [categories, setCategories] = useState(["HISTORY", "DRINKS", "NATURE", "EATS", "BRIDGE", "MUSEUMS", "EXPERIENCE"]);
	const [category, setCategory] = useState(categories[0]);
	const [imagePreviews, setImagePreviews] = useState([]);
	const [progressInfos, setProgressInfos] = useState({ val: [] });
	const [message, setMessage] = useState([]);
	const [imageInfos, setImageInfos] = useState([]);

	const { homeDataState, dispatch } = useContext(HomeDataContext);


	const handleDragEnd = (e) => {
		if (!e.destination) return;
		let tempData = Array.from(points);
		let [source_data] = tempData.splice(e.source.index, 1);
		tempData.splice(e.destination.index, 0, source_data);
		setPoints(tempData);
	};
	const fetchData = async (input, num) => {

		input = input.replace(/(\r\n|\n|\r)/gm, " ");
		const response = await Axios.post(
			"https://api.openai.com/v1/completions",
			{
				prompt: `translate "${input}" to slovenian`,
				model: 'text-davinci-002',
				max_tokens: 2500,
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

			setTitlePointTransl(response.data.choices[0].text)
		} else if (num == 2) {

			setShortInfoPointTransl(response.data.choices[0].text)
		} else if (num == 3) {

			setLongInfoPointTransl(response.data.choices[0].text)
		} else if (num == 4) {

			setVoucherDescTransl(response.data.choices[0].text)
		}

		return response.data.choices[0].text;
	};


	const addPartner = () => {
		setPartner(true)
		setPoint(false)

	};


	const addPoint = () => {
		setPartner(false)
		setPoint(true)

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
		setPartner(false)
		setPoint(false)
		setPoints([])
		dispatch({ type: homeDataConstants.HIDE_ADD_PARTNER_MODAL });

	};

	const handleAdd = (e) => {
		setErrImageTitle("")
		setErrLongDescriptionPoint("")
		setErrShortDescriptionPoint("")
		setErrVoucherDescriptionPoint("")
		setErrTitlePoint("")

		if (partner && (titlePoint == "" || titlePointTransl == "" || shortInfoPoint == "" || shortInfoPointTransl == "" || longInfoPoint == "" || longInfoPointTransl == "" || category == "" || pointPrice == "" || offerName == "" || responsiblePerson == "" || voucherDesc == "" || voucherDescTransl == "" || phone == "" || email == "" || longitude == "" || latitude == "" || audio2 == null || selectedFiles.length == 0 || (!mondayclosed && (mondayFrom == "" || mondayTo == "")) || (!tuesdayclosed && (tuesdayFrom == "" || tuesdayTo == "")) || (!wednesdayclosed && (wednesdayFrom == "" || wednesdayTo == "")) || (!thursdayclosed && (thursdayFrom == "" || thursdayTo == "")) || (!fridayclosed && (fridayFrom == "" || fridayTo == "")) || (!saturdayclosed && (saturdayFrom == "" || saturdayTo == "")) || (!sundayclosed && (sundayFrom == "" || sundayTo == "")))) {
			setErrMessagePartner("Please insert mandatory fields for partner (marked with *)")
		} else if (point && (titlePoint == "" || titlePointTransl == "" || shortInfoPoint == "" || shortInfoPointTransl == "" || longInfoPoint == "" || longInfoPointTransl == "" || category == "" || longitude == "" || latitude == "" || audio2 == null || selectedFiles.length == 0)) {

			setErrMessagePartner("Please insert mandatory fields for point of interest (marked with *)")
		} else {
			setAdd(false)
			setErrMessagePartner("")
			var jsonTitles = []
			if (imageTitles.length != 0) {
				for (var ti of imageTitles) {
					var help = ti.split("---")
					if (!isJsonString(help[0])) {
						setErrImageTitle("Please insert the proper JSON format. Pay attention on enter and quotes(\")")
						setErrMessagePartner("JSON format invalid. Check the red fields.")
					}
					var titlee = JSON.parse(help[0])
					var titleObj = {
						number: help[1],
						name: titlee

					}
					jsonTitles.push(titleObj)
				}
			}



			var point = {
				num: num,
				price: pointPrice,
				offerName: offerName,
				contact: { phone: phone, email: email, webURL: webURL, name: responsiblePerson },
				location: { latitude: latitude, longitude: longitude },
				workingHours: { monday: { from: mondayFrom, to: mondayTo }, tuesday: { from: tuesdayFrom, to: tuesdayTo }, wednesday: { from: wednesdayFrom, to: wednesdayTo }, thursday: { from: thursdayFrom, to: thursdayTo }, friday: { from: fridayFrom, to: fridayTo }, saturday: { from: saturdayFrom, to: saturdayTo }, sunday: { from: sundayFrom, to: sundayTo } },
				category: category,
				bpartnerId: homeDataState.showAddPartnerModal.bpartnerId,
				imageTitles: jsonTitles,

			}


			if (partner) {
				var voucherDesc1 = voucherDesc.replace(/(\r\n|\n|\r)/gm, " ");
				var voucherDescTransl1 = voucherDescTransl.replace(/(\r\n|\n|\r)/gm, " ");
				point.voucherDesc = JSON.parse(`{"english":"${voucherDesc1.trim()} ", "slovenian" : "${voucherDescTransl1.trim()}"}`)
			}


			var titlePoint1 = titlePoint.replace(/(\r\n|\n|\r)/gm, " ");
			var titlePointTransl1 = titlePointTransl.replace(/(\r\n|\n|\r)/gm, " ");
			var shortInfoPoint1 = shortInfoPoint.replace(/(\r\n|\n|\r)/gm, " ");
			var shortInfoPointTransl1 = shortInfoPointTransl.replace(/(\r\n|\n|\r)/gm, " ");
			var longInfoPoint1 = longInfoPoint.replace(/(\r\n|\n|\r)/gm, " ");
			var longInfoPointTransl1 = longInfoPointTransl.replace(/(\r\n|\n|\r)/gm, " ");

			titlePoint1 = titlePoint1.replace(/("|'|}|{)/g, "");
			titlePointTransl1 = titlePointTransl1.replace(/("|'|}|{)/g, "");
			shortInfoPoint1 = shortInfoPoint1.replace(/("|'|}|{)/g, "");
			shortInfoPointTransl1 = shortInfoPointTransl1.replace(/("|'|}|{)/g, "");
			longInfoPoint1 = longInfoPoint1.replace(/("|'|}|{)/g, "");
			longInfoPointTransl1 = longInfoPointTransl1.replace(/("|'|}|{)/g, "");


			point.name = JSON.parse(`{"english":" ${titlePoint1.trim()} ", "slovenian" : "${titlePointTransl1.trim()}"}`)
			point.shortInfo = JSON.parse(`{"english":" ${shortInfoPoint1.trim()} ", "slovenian" : "${shortInfoPointTransl1.trim()} "}`)
			point.longInfo = JSON.parse(`{"english":"${longInfoPoint1.trim()} ", "slovenian" : "${longInfoPointTransl1.trim()}"}`)


			const newData = [...points, point];
			setPoints(newData)
			setTitlePoint("")
			setShortInfoPoint("")
			setLongInfoPoint("")
			setPointPrice("")
			setPhone("")
			setEmail("")
			setResponsiblePerson("")
			setVoucherDesc("")
			setMondayClosed(false)
			setTuesdayClosed(false)
			setWednesdayClosed(false)
			setThursdayClosed(false)
			setFridayClosed(false)
			setSaturdayClosed(false)
			setSundayClosed(false)
			setOfferName("")
			setWebUrl("")
			setLocation("")
			setLongitude("")
			setLatitude("")
			setTitlePointTransl("")
			setImageTitles([])
			setAudioName("")

			setShortInfoPointTransl("")
			setLongInfoPointTransl("")
			setVoucherDescTransl("")
			setFiles(files.concat(selectedFiles))
			setAudios(audios.concat(audio2))
			setSelectedFiles([])
			setAudio2(null)
			setImagePreviews([])
			setVideoPreview(null)
			num = num + 1

			setPartner(false)
			setPoint(false)
		}



	}
	const addFile2 = (e) => {
		if (e.target.files[0]) {

			var new_file = new File([e.target.files[0]], 'audio2' + num + "---" + [e.target.files[0].name]);

			setAudio2(new_file);
			setAudioName(e.target.files[0].name)
		}
	};


	const selectFiles = (event) => {
		let images = [];


		var fs = []
		for (let i = 0; i < event.target.files.length; i++) {

			if ((event.target.files[i].name).substring(event.target.files[i].name.length - 3) == "mp4") {
				var new_file = new File([event.target.files[i]], i + 'partner' + num + "---" + [event.target.files[i].name]);

				fs.push(new_file)
				setVideoPreview(URL.createObjectURL(event.target.files[i]))
				setImagePreviews([])
				break;
			} else {

				images.push(URL.createObjectURL(event.target.files[i]));
				var new_file = new File([event.target.files[i]], i + 'partner' + num + "---" + [event.target.files[i].name]);

				setVideoPreview(null)
				fs.push(new_file)
			}

		}

		console.log(fs)
		setSelectedFiles(selectedFiles.concat(fs))

		setImagePreviews(images);
		setProgressInfos({ val: [] });
		setMessage([]);

	};


	const SuccessHandler = (e) => {

		setLoading(false)
		var arr = []
		setPoints(arr)
		homeDataService.addPartner(true, dispatch);

	};
	const ErrorHandler = () => {

		setLoading(false)
		homeDataService.addPartner(false, dispatch);
	};
	const AbortHandler = () => {

		homeDataService.insertData(false, dispatch);
	};
	const handleSubmit = (e) => {

		if (points.length == 0) {
			setErrMessage("Please add at least one partner")
		} else {
			e.preventDefault();
			var tour = {
				id: homeDataState.showAddPartnerModal.id,
				points: points
			}
			const formData = new FormData();
			for (var f of files) {
				console.log("hdghsrhr")
				formData.append('file', f);
			}
			for (var a of audios) {
				formData.append('file', a);
			}
			//formData.append('audio', audio);

			formData.append('tour', JSON.stringify(tour));
			var token = authHeader()
			var xhr = new XMLHttpRequest();
			xhr.upload.addEventListener("progress", ProgressHandler, false);
			xhr.addEventListener("load", SuccessHandler, false);
			xhr.addEventListener("error", ErrorHandler, false);
			xhr.addEventListener("abort", AbortHandler, false);
			xhr.open('POST', `${url}api/pnl/tour/addFull/partner`, true);
			xhr.setRequestHeader('authorization', token);
			xhr.onload = function () {
				// do something to response
			};
			xhr.send(formData);



		}


	};

	const ProgressHandler = (e) => {

		setLoading(true)

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


		<div>
			{homeDataState.showAddPartnerModal.show &&
				<div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">

					<div class="modal-overlay"></div>

					<div class="fixed inset-0 z-10 overflow-y-auto">

						<div class="modal-frame">

							<div id="myModal" class="modal modal--3xl">

								<div class="modal__header">
									<h2 class="text-leading">
										New partner
									</h2>
									<button class="button button--circle button--clear justify-self-end" type="button"
										onClick={handleModalClose}>
										<AiOutlineClose />
									</button>
								</div>

								<div className="modal__body">

									<form class="form" id="contactForm">
										{(!partner && !point) &&
											<div class="grid dgrid-row place-items-center gap-2">
												<button
													onClick={(e) => {
														addPartner(e)
													}}
													className="button button--primary"
													id="sendMessageButton"
													type="button"
												>

													Add partner
												</button>

												<button
													onClick={(e) => {
														addPoint(e)
													}}
													className="button button--primary"
													id="sendMessageButton"
													type="button"
												>
													Add point of interest
												</button>
											</div>
										}

										<div>
											{(partner || point) &&

												<div class="form">
													<div
														className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
														<div className="form__group">
															<label class="form__label">Name *</label>


															<div class="flex flex-col gap-2">
																<div class="flex flex-row gap-2 items-center">
																	<label class="form__label" style={{ marginRight: "18px" }}>English:</label>
																	<input

																		className={"form__input"}
																		placeholder="Name"
																		aria-describedby="basic-addon1"
																		id="name"
																		type="text"

																		onChange={(e) => setTitlePoint(e.target.value)}
																		value={titlePoint}
																	/>

																	<button


																		onClick={(e) => fetchData(titlePoint, 1)}
																		className="button button--primary"
																		id="sendMessageButton"
																		type="button"
																	>
																		Translate
																	</button>
																</div>
																<div class="flex flex-row gap-2 items-center">
																	<label class="form__label">Slovenian:</label>
																	<input
																		className={"form__input"}
																		aria-describedby="basic-addon1"
																		placeholder="Name in slovenian"
																		id="name"
																		type="text"
																		onChange={(e) => setTitlePointTransl(e.target.value)}
																		value={titlePointTransl} />
																</div>

																<div className="paragraph-box2 grid dgrid-row place-items-center"
																	style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }}
																	hidden={!errTitlePoint}>
																	{errTitlePoint}
																</div>
															</div>
														</div>
													</div>
													<div
														className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
														<div className="form__group">
															<div className="form__group"
																style={{ opacity: 1 }}>
																<label class="form__label">Short description* </label>

																<div class="flex flex-col gap-2">
																	<div class="flex flex-row gap-2 items-center">
																		<label class="form__label" style={{ marginRight: "18px" }}>English:</label>

																		<textarea className="form__input text-sm h-32"

																			type="textarea" required name="message"
																			placeholder='Short description'
																			value={shortInfoPoint}
																			onChange={(e) => setShortInfoPoint(e.target.value)}></textarea>

																		<button


																			onClick={(e) => fetchData(shortInfoPoint, 2)}
																			className="button button--primary"
																			id="sendMessageButton"
																			type="button"
																		>
																			Translate
																		</button>

																	</div>
																	<div class="flex flex-row gap-2 items-center">
																		<label class="form__label">Slovenian:</label>
																		<textarea
																			className={!errShortDescriptionPoint ? "form__input text-sm h-32" : "form__input text-sm h-32 !border !border-red-500"}
																			placeholder='Short description in slovenian'
																			aria-describedby="basic-addon1"
																			id="name"
																			type="text"
																			onChange={(e) => setShortInfoPointTransl(e.target.value)}
																			value={shortInfoPointTransl}
																		/>

																		<div className="paragraph-box2 grid dgrid-row place-items-center"
																			style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }}
																			hidden={!errShortDescriptionPoint}>
																			{errShortDescriptionPoint}
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div
														className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
														<div className="form__group">
															<label class="form__label">Long description*</label>
															<div class="flex flex-col gap-2">
																<div class="flex flex-row gap-2 items-center">
																	<label class="form__label" style={{ marginRight: "18px" }}>English:</label>

																	<textarea className="form__input text-sm h-32"
																		type="textarea" required name="message"
																		placeholder='Long description'
																		value={longInfoPoint}
																		onChange={(e) => setLongInfoPoint(e.target.value)}></textarea>
																	<button


																		onClick={(e) => fetchData(longInfoPoint, 3)}
																		className="button button--primary"
																		id="sendMessageButton"
																		type="button"
																	>
																		Translate
																	</button>
																</div><div class="flex flex-row gap-2 items-center">
																	<label class="form__label">Slovenian:</label>
																	<textarea

																		className={!errLongDescriptionPoint ? "form__input text-sm h-32" : "form__input text-sm h-32 !border !border-red-500"}
																		placeholder='Long description in slovenian'
																		aria-describedby="basic-addon1"
																		id="name"
																		type="text"
																		onChange={(e) => setLongInfoPointTransl(e.target.value)}
																		value={longInfoPointTransl}
																	/>
																	<div className="paragraph-box2 grid dgrid-row place-items-center"
																		style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }}
																		hidden={!errLongDescriptionPoint}>
																		{errLongDescriptionPoint}
																	</div>
																</div>
															</div>
														</div>
													</div>
													{partner &&
														<div
															className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
															<div className="form__group">
																<label class="form__label">Voucher description*</label>
																<div class="flex flex-col gap-2">
																	<div class="flex flex-row gap-2 items-center">
																		<label class="form__label" style={{ marginRight: "18px" }}>English:</label>

																		<textarea className="form__input text-sm h-32"
																			type="textarea" required name="message"
																			placeholder='Voucher description'
																			value={voucherDesc}
																			onChange={(e) => setVoucherDesc(e.target.value)}></textarea>
																		<button


																			onClick={(e) => fetchData(voucherDesc, 4)}
																			className="button button--primary"
																			id="sendMessageButton"
																			type="button"
																		>
																			Translate
																		</button>
																	</div><div class="flex flex-row gap-2 items-center">
																		<label class="form__label">Slovenian:</label>
																		<textarea

																			className={!props.errVoucherDescriptionPoint ? "form__input text-sm h-32" : "form__input text-sm h-32 !border !border-red-500"}
																			placeholder='Voucher description in slovenian'
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
															</div>
														</div>
													}

													<div className="form__group">
														<label class="form__label">Category*</label>
														<select
															onChange={(e) => setCategory(e.target.value)}
															name="category"
															class="form__input shrink max-w-4"
														>
															{categories.map(item =>
																<option key={item}
																	value={item}>{item}</option>
															)};

														</select>
													</div>

													{partner &&
														<div className="form__group">
															<label class="form__label">Price*</label>
															<div class="flex flex-row items-center gap-2">
																<input

																	className={"form__input"}
																	placeholder="Price"
																	aria-describedby="basic-addon1"
																	id="name"
																	type="text"

																	onChange={(e) => setPointPrice(e.target.value)}
																	value={pointPrice}
																/>

																<select
																	onChange={(e) => setCurrency(e.target.value)}
																	name="currency" class="form__input"
																>
																	{currencyList.map(item =>
																		<option key={item}
																			value={item}>{item}</option>
																	)};

																</select>
															</div>
														</div>}
													{partner &&
														<div className="form__group">
															<label class="form__label">Offer name*</label>
															<input

																className={"form__input"}
																placeholder="Offer name"
																aria-describedby="basic-addon1"
																id="name"
																type="text"

																onChange={(e) => setOfferName(e.target.value)}
																value={offerName}
															/>
														</div>
													}

													<div
														className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
														<div class="form__group">

															<label class="form__label">Address *</label>
															<div class="flex flex-col items-start gap-2">
																<input

																	className={"form__input"}
																	placeholder="Longitude"
																	aria-describedby="basic-addon1"
																	id="name"
																	type="text"

																	onChange={(e) => setLongitude(e.target.value)}
																	value={longitude}
																/>
																<input

																	className={"form__input"}
																	placeholder="Latitude"
																	aria-describedby="basic-addon1"
																	id="name"
																	type="text"

																	onChange={(e) => setLatitude(e.target.value)}
																	value={latitude}
																/>
															</div>

														</div>
													</div>
													{partner &&
														<div
															className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
															<div className="form__group divide-y">
																<label class="form__label">Working
																	hours*</label>

																<div class="form pt-6">

																	<div className="form__group">
																		<label
																			class="form__label">Monday</label>
																		<div
																			class="flex flex-row items-center justify-between gap-2">

																			<label
																				class="form__group--checkbox">
																				<input
																					type="checkbox"
																					checked={mondayclosed}
																					onChange={(e) => setMondayClosed(!mondayclosed)}
																				/>
																				<span>
																					Closed
																				</span>
																			</label>
																			{!mondayclosed &&
																				<div>
																					<TimePicker
																						disableClock={true}
																						onChange={(newValue) => {
																							setMondayFrom(newValue);
																						}}
																						value={mondayFrom} />
																					<TimePicker
																						disableClock={true}
																						onChange={(newValue) => {
																							setMondayTo(newValue);
																						}}
																						value={mondayTo} />
																				</div>
																			}
																		</div>
																	</div>

																	<div className="form__group">
																		<label
																			class="form__label">Tuesday</label>
																		<div
																			class="flex flex-row items-center justify-between gap-2">
																			<label
																				class="form__group--checkbox">
																				<input
																					type="checkbox"
																					checked={tuesdayclosed}
																					onChange={(e) => setTuesdayClosed(!tuesdayclosed)}
																				/>
																				<span>
																					Closed
																				</span>
																			</label>
																			{!tuesdayclosed &&
																				<div>
																					<TimePicker
																						disableClock={true}
																						onChange={(newValue) => {
																							setTuesdayFrom(newValue);
																						}}
																						value={tuesdayFrom} />
																					<TimePicker
																						disableClock={true}
																						onChange={(newValue) => {
																							setTuesdayTo(newValue);
																						}}
																						value={tuesdayTo} />
																				</div>
																			}
																		</div>
																	</div>

																	<div className="form__group">
																		<label
																			class="form__label">Wednesday</label>
																		<div
																			class="flex flex-row items-center justify-between gap-2">
																			<label
																				class="form__group--checkbox">
																				<input
																					type="checkbox"
																					checked={wednesdayclosed}
																					onChange={(e) => setWednesdayClosed(!wednesdayclosed)}
																				/>
																				<span>
																					Closed
																				</span>
																			</label>
																			{!wednesdayclosed &&
																				<div>

																					<TimePicker
																						disableClock={true}
																						onChange={(newValue) => {
																							setWednesdayFrom(newValue);
																						}}
																						value={wednesdayFrom} />
																					<TimePicker
																						disableClock={true}
																						onChange={(newValue) => {
																							setWednesdayTo(newValue);
																						}}
																						value={wednesdayTo} />
																				</div>
																			}
																		</div>
																	</div>

																	<div className="form__group">
																		<label
																			class="form__label">Thursday</label>
																		<div
																			class="flex flex-row items-center justify-between gap-2">
																			<label
																				class="form__group--checkbox">
																				<input
																					type="checkbox"
																					checked={thursdayclosed}
																					onChange={(e) => setThursdayClosed(!thursdayclosed)}
																				/>
																				<span>
																					Closed
																				</span>
																			</label>
																			{!thursdayclosed &&
																				<div>
																					<TimePicker
																						disableClock={true}
																						onChange={(newValue) => {
																							setThursdayFrom(newValue);
																						}}
																						value={thursdayFrom} />
																					<TimePicker
																						disableClock={true}
																						onChange={(newValue) => {
																							setThursdayTo(newValue);
																						}}
																						value={thursdayTo} />
																				</div>
																			}
																		</div>
																	</div>

																	<div className="form__group">
																		<label
																			class="form__label">Friday</label>
																		<div
																			class="flex flex-row items-center justify-between gap-2">
																			<label
																				class="form__group--checkbox">
																				<input
																					type="checkbox"
																					checked={fridayclosed}
																					onChange={(e) => setFridayClosed(!fridayclosed)}
																				/>
																				<span>
																					Closed
																				</span>
																			</label>
																			{!fridayclosed &&
																				<div>
																					<TimePicker
																						disableClock={true}
																						onChange={(newValue) => {
																							setFridayFrom(newValue);
																						}}
																						value={fridayFrom} />
																					<TimePicker
																						disableClock={true}
																						onChange={(newValue) => {
																							setFridayTo(newValue);
																						}}
																						value={fridayTo} />
																				</div>
																			}
																		</div>
																	</div>

																	<div className="form__group">
																		<label
																			class="form__label">Saturday</label>
																		<div
																			class="flex flex-row items-center justify-between gap-2">
																			<label
																				class="form__group--checkbox">
																				<input
																					type="checkbox"
																					checked={saturdayclosed}
																					onChange={(e) => setSaturdayClosed(!saturdayclosed)}
																				/>
																				<span>
																					Closed
																				</span>
																			</label>
																			{!saturdayclosed &&
																				<div>
																					<TimePicker
																						disableClock={true}
																						onChange={(newValue) => {
																							setSaturdayFrom(newValue);
																						}}
																						value={saturdayFrom} />
																					<TimePicker
																						disableClock={true}
																						onChange={(newValue) => {
																							setSaturdayTo(newValue);
																						}}
																						value={saturdayTo} />
																				</div>
																			}
																		</div>
																	</div>

																	<div className="form__group">
																		<label
																			class="form__label">Sunday</label>
																		<div
																			class="flex flex-row items-center justify-between gap-2">
																			<label
																				class="form__group--checkbox">
																				<input
																					type="checkbox"
																					checked={sundayclosed}
																					onChange={(e) => setSundayClosed(!props.sundayclosed)}
																				/>
																				<span>
																					Closed
																				</span>
																			</label>
																			{!sundayclosed &&
																				<div>
																					<TimePicker
																						disableClock={true}
																						onChange={(newValue) => {
																							setSundayFrom(newValue);
																						}}
																						value={sundayFrom} />
																					<TimePicker
																						disableClock={true}
																						onChange={(newValue) => {
																							setSundayTo(newValue);
																						}}
																						value={sundayTo} />
																				</div>
																			}
																		</div>
																	</div>
																</div>
															</div>
														</div>}

													<div>

														<label class="form__label">Text to speach audio*</label>
														<label
															class="button button--secondary button--small">
															<span>Upload audio</span>
															<input type={"file"} accept={".mp3"}
																onChange={addFile2}
																class="sr-only" />
														</label>
														{audioName &&


															<label >{audioName}</label>}
													</div>
													<div>

														<label class="form__label">Image gallery*</label>

														<label
															class="button button--secondary button--small">
															<span>Upload image/video</span>
															<input type="file"
																multiple
																onChange={selectFiles}
																class="sr-only" />
														</label>
														<br />


														{imagePreviews && !videoPreview && (
															<div>
																{imagePreviews.map((img, i) => {
																	return (
																		<div>  <br />
																			<img className="image__preview" src={img}
																				alt={"image-" + i} key={i} />

																			<br />
																			<input

																				className={!props.errImageTitle ? "form__input" : "form__input !border !border-red-500"}
																				placeholder={'JSON FORMAT: { "language": "Text"}'}
																				aria-describedby="basic-addon1"
																				id="name"
																				type="text"


																				onChange={(e) => changeImageTitle(e.target.value, i)}
																			/>
																			<div className="paragraph-box2 grid dgrid-row place-items-center"
																				style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }}
																				hidden={!errImageTitle}>
																				{errImageTitle}
																			</div>
																		</div>
																	);
																})}
															</div>
														)}

														{videoPreview && imagePreviews.length == 0 && <video className="image__preview" controls src={videoPreview}
															alt={"video-"} />}


														{message.length > 0 && (
															<div role="alert">
																<ul>
																	{message.map((item, i) => {
																		return <li key={i}>{item}</li>;
																	})}
																</ul>
															</div>
														)}


													</div>


													{titlePoint.length == 0 && <div hidden={!errMessagePhoto}>
														{errMessagePhoto}
													</div>}

													{partner &&

														<div class="form">
															<div
																className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
																<div class="form__group">
																	<label class="form__label">Contact information about
																		partner*</label>
																</div>
																<div className="form__group">
																	<label class="form__label">Responsible person
																		name*</label>
																	<input

																		className={"form__input"}
																		placeholder="Responsible person name"
																		aria-describedby="basic-addon1"
																		id="name"
																		type="text"


																		onChange={(e) => setResponsiblePerson(e.target.value)}
																		value={responsiblePerson}
																	/>
																</div>
																<div className="form__group">
																	<label class="form__label">Phone*</label>
																	<input

																		className={"form__input"}
																		placeholder="Phone"
																		aria-describedby="basic-addon1"
																		id="name"
																		type="text"

																		onChange={(e) => setPhone(e.target.value)}
																		value={phone}
																	/>
																</div>

																<div className="form__group">
																	<label class="form__label">Email*</label>
																	<input

																		className={"form__input"}
																		placeholder="Email"
																		aria-describedby="basic-addon1"
																		id="name"
																		type="email"


																		onChange={(e) => setEmail(e.target.value)}
																		value={email}
																	/>
																</div>

																<div className="form__group">
																	<label class="form__label">Web page*</label><input

																		className={"form__input"}
																		placeholder="Web page"
																		aria-describedby="basic-addon1"
																		id="name"
																		type="text"


																		onChange={(e) => setWebUrl(e.target.value)}
																		value={webURL}
																	/>
																</div>

															</div>
														</div>}


													<div class="grid place-items-center">
														<button

															onClick={(e) => {
																handleAdd(e)
															}}
															className="button button--primary"
															id="sendMessageButton"
															type="button"
														>
															Add partner to the table
														</button>
													</div>

												</div>
											}</div>

									</form>
									<div className="paragraph-box2 grid dgrid-row place-items-center"
										style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }}
										hidden={!errMessagePartner}>
										{errMessagePartner}
									</div>
								</div>

								{
									points.length > 0 &&
									<div>
										<div class="modal__footer">
											<DragDropContext onDragEnd={handleDragEnd}>
												<div class="table-frame">
													<table className="table borderd">
														<thead>

															<tr>
																<th> =
																</th>
																<th>Title
																</th>
																<th>Short
																	description
																</th>
																<th>Long
																	description
																</th>
																<th>Category
																</th>
																<th>Price
																</th>
																<th>Offer name
																</th>
																<th>Responsible
																	person
																</th>
																<th>Email
																</th>
																<th>Phone
																</th>
																<th>Web
																	page
																</th>
																<th>Location
																</th>
															</tr>
														</thead>
														<Droppable droppableId="droppable-1">
															{(provider) => (
																<tbody
																	className="text-capitalize"
																	ref={provider.innerRef}
																	{...provider.droppableProps}
																>
																	{points.map((point, index) => (
																		<Draggable
																			key={point.name.english}
																			draggableId={point.name.english}
																			index={index}
																		>
																			{(provider) => (

																				<tr {...provider.draggableProps} ref={provider.innerRef} >
																					<td {...provider.dragHandleProps}>=</td>
																					<td>{point.name.english}</td>
																					<td>{point.shortInfo.english}</td>
																					<td>{point.longInfo.english}</td>
																					<td>{point.category}</td>
																					{point.price == "" ?
																						<td>/</td> :
																						<td>{point.price} {currency}</td>}
																					{point.offerName == "" ?
																						<td>/</td> :
																						<td>{point.offerName}</td>}
																					{point.contact.name == "" ?
																						<td>/</td> :
																						<td>{point.contact.name}</td>}
																					{point.contact.email == "" ?
																						<td>/</td> :
																						<td>{point.contact.email}</td>}
																					{point.contact.phone == "" ?
																						<td>/</td> :
																						<td>{point.contact.phone}</td>}
																					{point.contact.webURL == "" ?
																						<td>/</td> :
																						<td>{point.contact.webURL}</td>}

																					<td>{`${point.location.latitude}  ${point.location.longitude}`}</td>


																				</tr>
																			)}
																		</Draggable>
																	))}
																	{provider.placeholder}
																</tbody>
															)}
														</Droppable>
													</table>
												</div>
											</DragDropContext>

										</div>

										<div class="grid place-items-center "  >
											<div
												hidden={!errMessagePartner}>
												{errMessagePartner}
											</div>
											<div className="form__group ">
												{loading && <div ><img className="mx-8 my-8 h-20" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"></img></div>}

												<button
													onClick={(e) => {
														handleSubmit(e)
													}}
													className="button button--primary"
													id="sendMessageButton"
													type="button"
												>
													Add partner(s)
												</button>
											</div>
										</div>
									</div>
								}
							</div>


						</div>
					</div>
				</div>
			}
		</div>

	);
};

export default AddNewPartnerForm;