import React, { useContext, useEffect, useState, forwardRef, useRef } from "react";
import { homeDataService } from "../services/HomeDataService";
import { HomeDataContext } from "../contexts/HomeDataContext";
import { homeDataConstants } from "../constants/HomeDataConstants";
import TimePicker from 'react-time-picker';
import { AiOutlineClose } from 'react-icons/ai';
import Axios from "axios";
import AddPartnerOrPointForm from "./AddPartnerOrPointForm";

var url = process.env.REACT_APP_URL || "http://localhost:8080/";

var num = 1;
const InsertData = (props) => {
	const [audioName, setAudioName] = useState("");
	const [place, setPlace] = useState("");
	const [title, setTitle] = useState("");
	const [imageTitles, setImageTitles] = useState([]);
	const [titleTransl, setTitleTransl] = useState("");
	const [agreementTitle, setAgreementTitle] = useState("");
	const [agreementTitleTransl, setAgreementTitleTransl] = useState("");
	const [agreementDesc, setAgreementDesc] = useState("");
	const [agreementDescTransl, setAgreementDescTransl] = useState("");
	const [changeTermsAndConditions, setChangeTermsAndConditions] = useState(false);
	const [shortInfo, setShortInfo] = useState("");
	const [longInfo, setLongInfo] = useState("");
	const [currency, setCurrency] = useState("");
	const [currencyList, setCurrencyList] = useState(["£", "€", "$"]);
	const [price, setPrice] = useState("");
	const [showModal, setShowModal] = useState(false);


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

	const [selectedFiles, setSelectedFiles] = useState([]);
	const [files, setFiles] = useState([]);
	const [categories, setCategories] = useState(["HISTORY", "DRINKS", "NATURE", "EATS", "BRIDGE", "MUSEUMS", "EXPERIENCE"]);
	const [category, setCategory] = useState(categories[0]);
	const [imagePreviews, setImagePreviews] = useState([]);
	const [progressInfos, setProgressInfos] = useState({ val: [] });
	const [message, setMessage] = useState([]);
	const [imageInfos, setImageInfos] = useState([]);

	const { homeDataState, dispatch } = useContext(HomeDataContext);

	const [termsAndConditions, setTermsAndConditions] = useState("");


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
		} else if (num == 4) {

			setTitlePointTransl(response.data.choices[0].text)
		} else if (num == 5) {

			setShortInfoPointTransl(response.data.choices[0].text)
		} else if (num == 6) {

			setLongInfoPointTransl(response.data.choices[0].text)
		} else if (num == 7) {

			setVoucherDescTransl(response.data.choices[0].text)
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

	const someFetchActionCreator = () => {
		const getDocumentsInfoHandler = async () => {
			await homeDataService.getBPartners(dispatch);


		};
		getDocumentsInfoHandler();
	};


	useEffect(() => {
		someFetchActionCreator();
	}, [dispatch]);

	const selectFiles = (event) => {
		let images = [];

		var fs = []
		for (let i = 0; i < event.target.files.length; i++) {
			images.push(URL.createObjectURL(event.target.files[i]));
			var new_file = new File([event.target.files[i]], i + 'partner' + num + "---" + [event.target.files[i].name]);
			fs.push(new_file)

		}

		setSelectedFiles(selectedFiles.concat(fs))
		setImagePreviews(images);
		setProgressInfos({ val: [] });
		setMessage([]);

	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (titleTransl == "" || agreementDescTransl == "" || agreementDescTransl == "" || audio == null || shortInfo == "" || longInfo == "" || price == "" || hotelId == "" || duration == "" || length == "" || highestPoint == "") {
			setErrMessage("Please fill in the fileds marked with *")
		} else {
			var tour = {
				title: JSON.parse(titleTransl),
				agreementTitle: JSON.parse(agreementTitleTransl),
				agreementDesc: JSON.parse(agreementDescTransl),
				shortInfo: JSON.parse(shortInfo),
				longInfo: JSON.parse(longInfo),
				price: price,
				points: points,
				duration: duration,
				length: length,
				highestPoint: highestPoint,
				termsAndConditions: termsAndConditions,
				currency: currency,
				bpartnerId: hotelId,
			}
			const formData = new FormData();
			formData.append('file', file);
			formData.append('file', audio);
			formData.append('file', audio2);
			for (var f of files) {
				console.log(f)
				formData.append('file', f);
			}
			for (var a of audios) {
				formData.append('file', a);
			}
			formData.append('tour', JSON.stringify(tour));
			console.log(tour)
			var xhr = new XMLHttpRequest();
			xhr.upload.addEventListener("progress", ProgressHandler, false);
			xhr.addEventListener("load", SuccessHandler, false);
			xhr.addEventListener("error", ErrorHandler, false);
			xhr.addEventListener("abort", AbortHandler, false);
			xhr.open('POST', `${url}api/pnl/tour/addFull/add`, true);
			xhr.onload = function () {
			};
			xhr.send(formData);
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

	const addPartner = () => {
		setPartner(true)
		setPoint(false)

	};

	const addPoint = () => {
		setPartner(false)
		setPoint(true)

	};

	const editTermsAndConditions = () => {

		setShowModal(true)
		setTermsAndConditions(eval('`' + homeDataState.termsAndConditionsModal.text + '`'))

	};

	const handleAdd = (e) => {

		if (partner && (titlePointTransl == "" || shortInfoPointTransl == "" || longInfoPointTransl == "" || category == "" || pointPrice == "" || offerName == "" || responsiblePerson == "" || voucherDescTransl == "" || phone == "" || email == "" || longitude == "" || latitude == "" || audio2 == null || selectedFiles.length == 0 || (!mondayclosed && (mondayFrom == "" || mondayTo == "")) || (!tuesdayclosed && (tuesdayFrom == "" || tuesdayTo == "")) || (!wednesdayclosed && (wednesdayFrom == "" || wednesdayTo == "")) || (!thursdayclosed && (thursdayFrom == "" || thursdayTo == "")) || (!fridayclosed && (fridayFrom == "" || fridayTo == "")) || (!saturdayclosed && (saturdayFrom == "" || saturdayTo == "")) || (!sundayclosed && (sundayFrom == "" || sundayTo == "")))) {
			setErrMessagePartner("Please insert mandatory fields for partner (marked with *)")
		} else if (point && (titlePointTransl == "" || shortInfoPointTransl == "" || longInfoPointTransl == "" || category == "" || longitude == "" || latitude == "" || audio2 == null || selectedFiles.length == 0)) {
			setErrMessagePartner("Please insert mandatory fields for point of interest (marked with *)")
		} else {
			setAdd(false)
			setErrMessagePartner("")
			var jsonTitles = []
			for (var ti of imageTitles) {
				var help = ti.split("---")
				var titlee = JSON.parse(help[0])
				var titleObj = {
					number: help[1],
					name: titlee
				}
				jsonTitles.push(titleObj)
			}
			var point = {
				num: num,
				name: JSON.parse(titlePointTransl),
				shortInfo: JSON.parse(shortInfoPointTransl),
				longInfo: JSON.parse(longInfoPointTransl),
				price: pointPrice,
				offerName: offerName,
				contact: { phone: phone, email: email, webURL: webURL, name: responsiblePerson },
				location: { latitude: latitude, longitude: longitude },
				workingHours: { monday: { from: mondayFrom, to: mondayTo }, tuesday: { from: tuesdayFrom, to: tuesdayTo }, wednesday: { from: wednesdayFrom, to: wednesdayTo }, thursday: { from: thursdayFrom, to: thursdayTo }, friday: { from: fridayFrom, to: fridayTo }, saturday: { from: saturdayFrom, to: saturdayTo }, sunday: { from: sundayFrom, to: sundayTo } },
				bpartnerId: hotelId,
				category: category,
				imageTitles: jsonTitles,
			}
			if (voucherDesc == "") {
				point.voucherDesc = JSON.parse(`{
                  "english": "",
                  "spanish": "",
                  "serbian": "",
                  "slovenian": ""
                  }`)
				point.partner = false
			} else {
				point.voucherDesc = JSON.parse(voucherDescTransl)
				point.partner = true
			}
			const newData = [point, ...points];
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
			setShortInfoPointTransl("")
			setLongInfoPointTransl("")
			setVoucherDescTransl("")
			setImageTitles([])
			setFiles(files.concat(selectedFiles))
			setAudios(audios.concat(audio2))
			setSelectedFiles([])
			setAudio2(null)
			setImagePreviews([])
			num = num + 1

			setPartner(false)
			setPoint(false)
		}



	}

	const addFile = (e) => {
		if (e.target.files[0]) {

			var new_file = new File([e.target.files[0]], 'audio1' + num + "---" + [e.target.files[0].name]);
			setAudio(new_file);
			setAudioName(e.target.files[0].name)

		}
	};

	const addFile2 = (e) => {
		if (e.target.files[0]) {

			var new_file = new File([e.target.files[0]], 'audio2' + num + "---" + [e.target.files[0].name]);

			setAudio2(new_file);
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
				<div class="bg-black/[3%] rounded-xl p-4">
					<h2 class="form__label">File details</h2>
					<ul class="list text-sm">
						<li>
							File name: {file.name}
						</li>
						<li>
							File type: {file.type}
						</li>
						<li>
							LAst modified:{" "}
							{file.lastModifiedDate.toDateString()}
						</li>
					</ul>
				</div>
			);
		}
	};

	const ProgressHandler = (e) => {
		var percent = (e.loaded / e.total) * 100;
		progressRef.current.value = Math.round(percent);
		statusRef.current.innerHTML = Math.round(percent) + "% uploaded...";

	};

	const SuccessHandler = (e) => {

		homeDataService.insertData(true, dispatch);

		setTitlePoint("")
		setShortInfoPoint("")
		setLongInfoPoint("")
		setPointPrice("")
		setPhone("")
		setEmail("")
		setResponsiblePerson("")
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
		setFiles([])
		setFile(null)
		setAudios([])
		setAudio(null)
		setSelectedFiles([])
		setAudio2(null)
		setTitle("")
		setLongInfo("")
		setShortInfo("")
		setPrice("")
		setDuration("")
		setLongitude("")
		setAgreementTitle("")
		setAgreementDesc("")
		setLatitude("")
		setHighestPoint("")
		setLength("")
		setTitleTransl("")
		setAgreementDescTransl("")
		setAgreementTitleTransl("")
		setImagePreview(null)
		setImagePreviews([])
		setImageTitles([])
		num = 0

	};
	const ErrorHandler = () => {

		homeDataService.insertData(false, dispatch);
	};
	const AbortHandler = () => {

		homeDataService.insertData(false, dispatch);
	};


	const handleCloseMain = () => {
		window.location = "#/"
	};

	const handleClose = () => {

		setShowModal(false)
	};

	const handleClosePoi = () => {

		setPartner(false)
		setPoint(false)
	};

	const handleChangeTermsAndConditions = () => {

		if (changeTermsAndConditions) {

			setChangeTermsAndConditions(false)
			setShowModal(false)

		} else {
			setChangeTermsAndConditions(true)
			setTermsAndConditions(eval('`' + homeDataState.termsAndConditionsModal.text + '`'))
		}
	};

	return (

		<div className="containerModal">

			<div>


				<div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">

					<div class="modal-overlay"></div>

					<div class="fixed inset-0 z-10 overflow-y-auto">

						<div class="modal-frame">

							<div id="myModal" class="modal modal--3xl">

								<div class="modal__header">
									<h2 class="text-leading">
										Add new tour
									</h2>
									<button class="button button--circle button--clear justify-self-end"
										type="button"
										onClick={handleCloseMain}>
										<AiOutlineClose />
									</button>
								</div>
								<div class="modal__body">
									<form class="form" id="contactForm">
										<div className="form__group">

											<div className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
												<label class="form__label">Title*</label>
												<div class="flex flex-row gap-2">
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
												</div>
												<textarea

													className={"form__input text-sm "}
													style={{ height: 80 }}
													placeholder='JSON FORMAT: { "language": "Text"}'
													aria-describedby="basic-addon1"
													id="name"
													type="text"
													onChange={(e) => setTitleTransl(e.target.value)}
													value={titleTransl}
												/>
											</div>
										</div>

										<div className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
											<div className="form__group">
												<label class="form__label">Name of the place*</label>
												<div class="flex flex-col gap-2">
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
											</div>
											<div className="form__group">
												<label class="form__label">Short description*</label>
												<textarea className="form__input text-sm h-32 "
													type="textarea"
													required name="message"
													placeholder='JSON FORMAT: { "language": "Text"}'
													value={shortInfo}
													onChange={(e) => setShortInfo(e.target.value)}></textarea>
											</div>

											<div className="form__group">
												<label class="form__label">Long description*</label>
												<textarea className="form__input text-sm h-32 "
													type="textarea"
													required name="message"
													placeholder='JSON FORMAT: { "language": "Text"}'
													value={longInfo}
													onChange={(e) => setLongInfo(e.target.value)}></textarea>
											</div>

										</div>

										<div className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
											<div className="form__group">
												<label class="form__label">Agreement title*</label>
												<div class="flex flex-row items-center gap-2">
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
												</div>
											</div>
											<textarea

												className={"form__input text-sm "}
												style={{ height: 80 }}
												placeholder='JSON FORMAT: { "language": "Text"}'
												aria-describedby="basic-addon1"
												id="name"
												type="text"
												onChange={(e) => setAgreementTitleTransl(e.target.value)}
												value={agreementTitleTransl}
											/>
										</div>

										<div className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
											<div className="form__group">
												<label class="form__label">Agreement description*</label>
												<div class="flex flex-row items-center gap-2">
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
												</div>
											</div>
											<textarea

												className={"form__input text-sm "}
												style={{ height: 80 }}
												placeholder='JSON FORMAT: { "language": "Text"}'
												aria-describedby="basic-addon1"
												id="name"
												type="text"
												onChange={(e) => setAgreementDescTransl(e.target.value)}
												value={agreementDescTransl}
											/>
										</div>

										<div className="form__group">
											<label class="form__label">Price*</label>
											<div class="flex flex-row gap-2">
												<input

													className={"form__input grow "}
													placeholder="Price"
													aria-describedby="basic-addon1"
													id="name"
													type="text"

													onChange={(e) => setPrice(e.target.value)}
													value={price}
												/>
												<select onChange={(e) => setCurrency(e.target.value)}
													name="currency"
													class="form__input shrink max-w-4 "
												>
													{currencyList.map(item =>
														<option key={item} value={item}>{item}</option>
													)};

												</select>

											</div>
										</div>


										<div className="form__group">
											<label class="form__label">Business partner*</label>
											<select onChange={(e) => setHotelId(e.target.value)}
												name="category"
												class="form__input "
											>

												<option key={"none"}></option>
												{homeDataState.bpartners.bpartners.map(item =>
													<option key={item.id}
														value={item.id}>{item.name}</option>
												)};

											</select>
										</div>

										<div className="form__group">
											<label class="form__label">Tour duration*</label>
											<input

												className={"form__input "}
												placeholder="Tour duration"
												aria-describedby="basic-addon1"
												id="name"
												type="text"

												onChange={(e) => setDuration(e.target.value)}
												value={duration}
											/>
										</div>

										<div className="form__group">
											<label class="form__label">Tour lenght (km)*</label>
											<input

												className={"form__input "}
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

												className={"form__input "}
												placeholder="Highest point"
												aria-describedby="basic-addon1"
												id="name"
												type="text"

												onChange={(e) => setHighestPoint(e.target.value)}
												value={highestPoint}
											/>
										</div>

										<div>

											<label class="form__label">Text to speach audio*</label>

											<label class="button button--secondary button--small">
												<span>Upload audio</span>
												<input type={"file"} accept={".mp3"} onChange={addFile}
													class="sr-only" />

											</label>

											{audioName &&


												<label >{audioName}</label>}

										</div>
										<div>
											<label class="form__label">Background tour image</label>

											<label class="button button--secondary button--small">
												<span>Upload image</span>
												<input type={"file"} name="file" onChange={onFileChange}
													class="sr-only" />
											</label>
										</div>

										<div>
											{fileData()}
										</div>

										{imagePreview &&


											<img className="image__preview" src={imagePreview} alt={"image-"} />}

										<div className="form__group">
											<div class="flex flex-row items-center gap-4 ">
												<button

													onClick={(e) => {
														editTermsAndConditions(e)
													}}
													className="button button--primary"
													id="sendMessageButton"
													type="button"
												>
													Edit terms and conditions
												</button>
											</div>
											<br />
											<br />
											{(!partner || point) &&
												<div class="flex flex-row items-center gap-2" style={{ marginLeft: "200px" }}><button
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
													</button></div>}
										</div>


										<AddPartnerOrPointForm
											partner={partner}
											point={point}
											handleClosePoi={handleClosePoi}
											setTitlePoint={setTitlePoint}
											titlePoint={setTitlePoint}
											fetchData={fetchData}
											setTitlePointTransl={setTitlePointTransl}
											titlePointTransl={titlePointTransl}
											setShortInfoPoint={setShortInfoPoint}
											shortInfoPoint={shortInfoPoint}
											setShortInfoPointTransl={setShortInfoPointTransl}
											shortInfoPointTransl={shortInfoPointTransl}
											setLongInfoPoint={setLongInfoPoint}
											longInfoPoint={longInfoPoint}
											setLongInfoPointTransl={setLongInfoPointTransl}
											longInfoPointTransl={longInfoPointTransl}
											voucherDesc={voucherDesc}
											setVoucherDesc={setVoucherDesc}
											setVoucherDescTransl={setVoucherDescTransl}
											voucherDescTransl={voucherDescTransl}
											setCategory={setCategory}
											categories={categories}
											setPointPrice={setPointPrice}
											pointPrice={pointPrice}
											setCurrency={setCurrency}
											currencyList={currencyList}
											setOfferName={setOfferName}
											offerName={offerName}
											setLongitude={setLongitude}
											longitude={longitude}
											setLatitude={setLatitude}
											latitude={latitude}
											mondayclosed={mondayclosed}
											setMondayClosed={setMondayClosed}
											setMondayFrom={setMondayFrom}
											mondayFrom={mondayFrom}
											setMondayTo={setMondayTo}
											mondayTo={mondayTo}
											tuesdayclosed={tuesdayclosed}
											setTuesdayClosed={setTuesdayClosed}
											setTuesdayFrom={setTuesdayFrom}
											tuesdayFrom={tuesdayFrom}
											setTuesdayTo={setTuesdayTo}
											tuesdayTo={tuesdayTo}
											wednesdayclosed={wednesdayclosed}
											setWednesdayClosed={setWednesdayClosed}
											setWednesdayFrom={setWednesdayFrom}
											wednesdayFrom={wednesdayFrom}
											setWednesdayTo={setWednesdayTo}
											wednesdayTo={wednesdayTo}
											thursdayclosed={thursdayclosed}
											setThursdayClosed={setThursdayClosed}
											setThursdayFrom={setThursdayFrom}
											thursdayFrom={thursdayFrom}
											setThursdayTo={setThursdayTo}
											thursdayTo={thursdayTo}
											fridayclosed={fridayclosed}
											setFridayClosed={setFridayClosed}
											setFridayFrom={setFridayFrom}
											fridayFrom={fridayFrom}
											setFridayTo={setFridayTo}
											fridayTo={fridayTo}
											saturdayclosed={saturdayclosed}
											setSaturdayClosed={setSaturdayClosed}
											setSaturdayFrom={setSaturdayFrom}
											saturdayFrom={saturdayFrom}
											setSaturdayTo={setSaturdayTo}
											saturdayTo={saturdayTo}
											sundayclosed={sundayclosed}
											setSundayClosed={setSundayClosed}
											setSundayFrom={setSundayFrom}
											sundayFrom={sundayFrom}
											setSundayTo={setSundayTo}
											sundayTo={sundayTo}
											addFile2={addFile2}
											selectFiles={selectFiles}
											imagePreviews={imagePreviews}
											changeImageTitle={changeImageTitle}
											errMessagePhoto={errMessagePhoto}
											setResponsiblePerson={setResponsiblePerson}
											responsiblePerson={responsiblePerson}
											setPhone={setPhone}
											phone={phone}
											setEmail={setEmail}
											email={email}
											setWebUrl={setWebUrl}
											webURL={webURL}
											errMessagePartner={errMessagePartner}
											handleAdd={handleAdd}
										/>
									</form>

								</div>

								{
									points.length > 0 &&
									<div class="modal__body">
										{

											<div class="table-frame">
												<table>
													<thead>
														<tr>
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

													{points.map((point) => (
														<tbody>
															<tr>
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
														</tbody>))
													}

												</table>
											</div>
										}

										<div class="modal__body">
											<div
												hidden={!errMessage}>
												{errMessage}
											</div>
											<div className="button-p">
												<button

													onClick={(e) => {
														handleSubmit(e)
													}}
													className="button button--primary"
													id="sendMessageButton"
													type="button"
												>
													Add tour
												</button>
											</div>
										</div>
									</div>
								}

							</div>
						</div>
					</div>
				</div>

				{showModal && <div>

					<div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">

						<div class="modal-overlay"></div>

						<div class="fixed inset-0 z-10 overflow-y-auto">

							<div class="modal-frame">

								<div id="myModal" class="modal modal--3xl">


									<div class="modal__header">
										<h2 class="text-leading">
											Terms and conditions
										</h2>
										<button class="button button--circle button--clear justify-self-end"
											type="button"
											onClick={handleClose}>
											<AiOutlineClose />
										</button>
									</div>

									<div class="modal__body">

										<div className="form__group">
											<div className="form-group controls mb-0 pb-2"
												style={{ color: "#6c757d", opacity: 1 }}>

												<div class="flex flex-col gap-2">
													<div class="flex flex-row items-center gap-2">
														<textarea className="form-control"

															readOnly={!changeTermsAndConditions}
															style={{ height: "430px", width: "1100px" }}
															type="textarea"
															required name="message"
															placeholder="Terms and conditions"
															value={termsAndConditions}
															onChange={(e) => setTermsAndConditions(e.target.value)}></textarea>

													</div>
												</div>
											</div>
										</div>

										<div class="grid place-items-center form__group">
											<button


												onClick={handleChangeTermsAndConditions}
												className="button button--primary"
												id="sendMessageButton"
												type="button"
											>
												{changeTermsAndConditions === true ? `Done` : "Edit"}
											</button>
										</div>



									</div>
								</div>
							</div>
						</div>
					</div>
				</div>}
			</div>
		</div>


	);
};
export default InsertData