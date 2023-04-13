
import React, { useContext, useEffect, useState, forwardRef, useRef } from "react";
import { homeDataService } from "../services/HomeDataService";
import { HomeDataContext } from "../contexts/HomeDataContext";
import { homeDataConstants } from "../constants/HomeDataConstants";
import TimePicker from 'react-time-picker';
import Axios from "axios";
import { AiOutlineClose } from 'react-icons/ai';

var num = 1;

var url = process.env.REACT_APP_URL || "http://localhost:8080/";
const AddNewPartnerForm = (props) => {


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

		if (num == 4) {

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
	const addPartner = () => {
		setPartner(true)
		setPoint(false)

	};



	const addPoint = () => {
		setPartner(false)
		setPoint(true)

	};

	const handleModalClose = () => {
		dispatch({ type: homeDataConstants.HIDE_ADD_PARTNER_MODAL });
		window.location.reload()
	};

	const handleAdd = (e) => {

		/*if (partner && (titlePointTransl == "" || shortInfoPointTransl == "" || longInfoPointTransl == "" || category == "" || pointPrice == "" || offerName == "" || responsiblePerson == "" || voucherDescTransl == "" || phone == "" || email == "" || longitude == "" || latitude == "" || audio2 == null || selectedFiles.length == 0 || (!mondayclosed && (mondayFrom == "" || mondayTo == "")) || (!tuesdayclosed && (tuesdayFrom == "" || tuesdayTo == "")) || (!wednesdayclosed && (wednesdayFrom == "" || wednesdayTo == "")) || (!thursdayclosed && (thursdayFrom == "" || thursdayTo == "")) || (!fridayclosed && (fridayFrom == "" || fridayTo == "")) || (!saturdayclosed && (saturdayFrom == "" || saturdayTo == "")) || (!sundayclosed && (sundayFrom == "" || sundayTo == "")))) {

			setErrMessagePartner("Please insert mandatory fields for partner (marked with *)")
		} else if (point && (titlePointTransl == "" || shortInfoPointTransl == "" || longInfoPointTransl == "" || category == "" || longitude == "" || latitude == "" || audio2 == null || selectedFiles.length == 0)) {

			setErrMessagePartner("Please insert mandatory fields for point of interest (marked with *)")
		} else {
			setAdd(false)
			setErrMessagePartner("")

var jsonTitles = []
    for(var ti of imageTitles){
      var help = ti.split("---")

      var titlee = JSON.parse(help[0])
      var titleObj = {
        number : help[1],
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
				category: category,
				bpartnerId: homeDataState.showAddPartnerModal.bpartnerId,
				imageTitles : jsonTitles
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
			setImageTitles([])
			
			setShortInfoPointTransl("")
			setLongInfoPointTransl("")
			setVoucherDescTransl("")

			setFiles(files.concat(selectedFiles))
			setAudios(audios.concat(audio2))

			setSelectedFiles([])
			setAudio2(null)
			setImagePreviews([])
			num = num + 1


			// });
		}*/
		var point = {
			num: num,
			name: JSON.parse(`{"english": "Name text", "slovenian": "naslovno besedilo" } `),
			shortInfo: JSON.parse(`{"english": "Short description", "slovenian": "naslovno besedilo" } `),
			longInfo: JSON.parse(`{"english": "Long description", "slovenian": "naslovno besedilo" } `),
			price: 5,
			offerName: "Offer name",
			contact: { phone: "+38669617624", email: "email@gmail.com", webURL: "www.page.com", name: "Responsible person name" },
			location: { latitude: "13.4125895", longitude: "49.8151515" },
			workingHours: { monday: { from: mondayFrom, to: mondayTo }, tuesday: { from: tuesdayFrom, to: tuesdayTo }, wednesday: { from: wednesdayFrom, to: wednesdayTo }, thursday: { from: thursdayFrom, to: thursdayTo }, friday: { from: fridayFrom, to: fridayTo }, saturday: { from: saturdayFrom, to: saturdayTo }, sunday: { from: sundayFrom, to: sundayTo } },
			bpartnerId: hotelId,
			category: "NATURE"
		}

		if (voucherDesc == "") {
			point.voucherDesc = JSON.parse(`{"english": "", "spanish": "", "serbian": "",  "slovenian": "" }`)
			point.partner = false
		} else {
			point.voucherDesc = JSON.parse(`{"english": "Voucher text", "slovenian": "naslovno besedilo" } `)
			point.partner = true
		}
		const newData = [point, ...points];

		setPoints(newData)
	}
	const addFile2 = (e) => {
		if (e.target.files[0]) {

			var new_file = new File([e.target.files[0]], 'audio2' + num + "---" + [e.target.files[0].name]);

			setAudio2(new_file);
		}
	};


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



	const SuccessHandler = (e) => {

		homeDataService.addPartner(true, dispatch);

	};
	const ErrorHandler = () => {

		homeDataService.addPartner(false, dispatch);
	};
	const AbortHandler = () => {

		homeDataService.insertData(false, dispatch);
	};
	const handleSubmit = (e) => {

		/*if (points.length == 0) {
			setErrMessage("Please add at least one partner")
		} else {

			e.preventDefault();


			var tour = {
				id: homeDataState.showAddPartnerModal.id,
				points: points
			}

			const formData = new FormData();

			for (var f of files) {

				formData.append('file', f);
			}
			for (var a of audios) {

				formData.append('file', a);
			}
			//formData.append('audio', audio);
			formData.append('tour', JSON.stringify(tour));

			var xhr = new XMLHttpRequest();
			xhr.addEventListener("load", SuccessHandler, false);
			xhr.addEventListener("error", ErrorHandler, false);
			xhr.addEventListener("abort", AbortHandler, false);
			xhr.open('POST', `${url}api/pnl/tour/addFull/partner`, true);
			xhr.onload = function () {
				// do something to response
			};

			xhr.send(formData);



		}*/

		SuccessHandler()

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
			{homeDataState.showAddPartnerModal.show &&
				<div class="overlay" >
					<div id="myModal" class="modal" style={{ background: "white" }}>



						<div   >

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


												<div className="button-tc">
													<button
														style={{ background: "#0099ff", marginTop: "px", marginRight: "55px", padding: "5px 15px", height: "35px" }}
														onClick={(e) => { addPartner(e) }}
														className="btn btn-primary btn-xl"
														id="sendMessageButton"
														type="button"
													>
														Add partner
													</button>

													<button
														style={{ background: "#0099ff", marginTop: "px", marginRight: "55px", padding: "5px 15px", height: "35px" }}
														onClick={(e) => { addPoint(e) }}
														className="btn btn-primary btn-xl"
														id="sendMessageButton"
														type="button"
													>
														Add point of interest
													</button>
												</div>






												<div>
													{(partner || point) &&
														<div><div className="control-group">
															<div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
																<label><b>Name *</b></label>
																<div class="row" >
																	<div class="form-group col-lg-10">
																		<input

																			className={"form-control"}
																			placeholder="Name"
																			aria-describedby="basic-addon1"
																			id="name"
																			type="text"
																			style={{ backgroundColor: 'white', outline: 'none', width: "1000px", height: "50px" }}

																			onChange={(e) => setTitlePoint(e.target.value)}
																			value={titlePoint}
																		/>

																		<button
																			style={{ background: "#0099ff", marginTop: "px", height: "35px" }}

																			onClick={(e) => fetchData(titlePoint, 4)}
																			className="btn btn-primary btn-xl"
																			id="sendMessageButton"
																			type="button"
																		>
																			Translate partners name
																		</button>

																		<div >

																			<div class="form-group col-lg-10">
																				<input

																					className={"form-control"}
																					placeholder='JSON FORMAT: { "language": "Text"}'
																					aria-describedby="basic-addon1"
																					id="name"
																					type="text"
																					style={{ backgroundColor: 'white', outline: 'none', width: "1000px", height: "50px" }}

																					onChange={(e) => setTitlePointTransl(e.target.value)}
																					value={titlePointTransl}
																				/>

																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>

															<div className="control-group">
																<div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
																	<label><b>Short description* </b></label>
																	<div class="row" >
																		<div class="form-group col-lg-10">
																			<textarea className="form-control" style={{ height: "100px", width: "1000px" }} type="textarea" required name="message" placeholder='Short description' value={shortInfoPoint} onChange={(e) => setShortInfoPoint(e.target.value)}></textarea>

																			<button
																				style={{ background: "#0099ff", marginTop: "px", height: "35px" }}

																				onClick={(e) => fetchData(shortInfoPoint, 5)}
																				className="btn btn-primary btn-xl"
																				id="sendMessageButton"
																				type="button"
																			>
																				Translate short description
																			</button>

																			<div >

																				<div class="form-group col-lg-10">
																					<input

																						className={"form-control"}
																						placeholder='JSON FORMAT: { "language": "Text"}'
																						aria-describedby="basic-addon1"
																						id="name"
																						type="text"
																						style={{ backgroundColor: 'white', outline: 'none', width: "1000px", height: "50px" }}

																						onChange={(e) => setShortInfoPointTransl(e.target.value)}
																						value={shortInfoPointTransl}
																					/>

																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>

															<div className="control-group">
																<div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
																	<label><b>Long description*</b></label>
																	<div class="row" >
																		<div class="form-group col-lg-10">
																			<textarea className="form-control" style={{ height: "200px", width: "1000px" }} type="textarea" required name="message" placeholder='Long description' value={longInfoPoint} onChange={(e) => setLongInfoPoint(e.target.value)}></textarea>
																			<button
																				style={{ background: "#0099ff", marginTop: "px", height: "35px" }}

																				onClick={(e) => fetchData(longInfoPoint, 6)}
																				className="btn btn-primary btn-xl"
																				id="sendMessageButton"
																				type="button"
																			>
																				Translate long description
																			</button>

																			<div >

																				<div class="form-group col-lg-10">
																					<input

																						className={"form-control"}
																						placeholder='JSON FORMAT: { "language": "Text"}'
																						aria-describedby="basic-addon1"
																						id="name"
																						type="text"
																						style={{ backgroundColor: 'white', outline: 'none', width: "1000px", height: "50px" }}

																						onChange={(e) => setLongInfoPointTransl(e.target.value)}
																						value={longInfoPointTransl}
																					/>

																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>

															{partner && <div className="control-group">
																<div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
																	<label><b>Voucher description*</b></label>
																	<div class="row" >
																		<div class="form-group col-lg-10">
																			<textarea className="form-control" style={{ height: "200px", width: "1000px" }} type="textarea" required name="message" placeholder='Voucher description' value={voucherDesc} onChange={(e) => setVoucherDesc(e.target.value)}></textarea>
																			<button
																				style={{ background: "#0099ff", marginTop: "px", height: "35px" }}

																				onClick={(e) => fetchData(voucherDesc, 7)}
																				className="btn btn-primary btn-xl"
																				id="sendMessageButton"
																				type="button"
																			>
																				Translate voucher description
																			</button>

																			<div >

																				<div class="form-group col-lg-10">
																					<input

																						className={"form-control"}
																						placeholder='JSON FORMAT: { "language": "Text"}'
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
															</div>}

															<div className="control-group">
																<div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
																	<label><b>Category*</b></label>
																	<div class="row" >
																		<div class="form-group col-lg-10">

																			<select onChange={(e) => setCategory(e.target.value)} name="category" class="custom-select" style={{ height: "50px", width: "1000px" }}>
																				{categories.map(item =>
																					<option key={item} value={item} >{item}</option>
																				)};

																			</select>
																		</div>
																	</div>
																</div>
															</div>

															{partner && <div className="control-group">
																<div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
																	<label><b>Price*</b></label>
																	<div class="row" >
																		<div class="form-group col-lg-10">
																			<div class="button-login">
																				<input

																					className={"form-control"}
																					placeholder="Price"
																					aria-describedby="basic-addon1"
																					id="name"
																					type="text"
																					style={{ backgroundColor: 'white', outline: 'none', width: "800px", height: "50px" }}

																					onChange={(e) => setPointPrice(e.target.value)}
																					value={pointPrice}
																				/>

																				<select onChange={(e) => setCurrency(e.target.value)} name="currency" class="custom-select" style={{ height: "50px", width: "200px" }}>
																					{currencyList.map(item =>
																						<option key={item} value={item} >{item}</option>
																					)};

																				</select>
																			</div>
																		</div>
																	</div>
																</div>
															</div>}
															{partner && <div className="control-group">
																<div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
																	<label><b>Offer name*</b></label>
																	<div class="row" >
																		<div class="form-group col-lg-10">
																			<input

																				className={"form-control"}
																				placeholder="Offer name"
																				aria-describedby="basic-addon1"
																				id="name"
																				type="text"
																				style={{ backgroundColor: 'white', outline: 'none', width: "1000px", height: "50px" }}

																				onChange={(e) => setOfferName(e.target.value)}
																				value={offerName}
																			/>
																		</div>
																	</div>
																</div>
															</div>}

															<div >

																<label><b>Address *</b></label>
																<div class="row" >
																	<div class="form-group col-lg-10">
																		<input

																			className={"form-control"}
																			placeholder="Longitude"
																			aria-describedby="basic-addon1"
																			id="name"
																			type="text"
																			style={{ backgroundColor: 'white', outline: 'none', width: "1000px", height: "50px" }}

																			onChange={(e) => setLongitude(e.target.value)}
																			value={longitude}
																		/>
																	</div>
																	<div class="row" >
																		<div class="form-group col-lg-10">
																			<input

																				className={"form-control"}
																				placeholder="Latitude"
																				aria-describedby="basic-addon1"
																				id="name"
																				type="text"
																				style={{ backgroundColor: 'white', outline: 'none', width: "1000px", height: "50px" }}

																				onChange={(e) => setLatitude(e.target.value)}
																				value={latitude}
																			/>
																		</div>
																	</div>
																</div>
															</div>

															{partner &&
																<div><h6><b>Working hours *</b></h6>
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

															<div style={{ marginTop: "15px" }}>

																<label><b>Text to speach audio*</b></label>
																<br /><br />
																<input type={"file"} accept={".mp3"} onChange={addFile2} />
															</div>

															<br />
															<div>

																<label><b>Image gallery*</b></label>
																<br /><br />
																<div className="row">
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


																</div>

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

																{imagePreviews && (
																	<div>
																		{imagePreviews.map((img, i) => {
																			return (
																				<div>
																					<br />
																					<img className="preview" src={img} alt={"image-" + i} key={i} />

																					<input

																						className={"form-control"}
																						placeholder={'JSON FORMAT: { "language": "Text"}'}
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

																{message.length > 0 && (
																	<div className="alert alert-secondary mt-2" role="alert">
																		<ul>
																			{message.map((item, i) => {
																				return <li key={i}>{item}</li>;
																			})}
																		</ul>
																	</div>
																)}

																{imageInfos.length > 0 && (
																	<div className="card mt-3">
																		<br />
																		<div className="card-header">List of Images</div>
																		<ul className="list-group list-group-flush">
																			{imageInfos &&
																				imageInfos.map((img, index) => (
																					<li className="list-group-item" key={index}>
																						<p>
																							<a href={img.url}>{img.name}</a>
																						</p>
																						<img src={img.url} alt={img.name} height="80px" />
																					</li>
																				))}
																		</ul>
																	</div>
																)}
															</div>



															{titlePoint.length == 0 && <div className="paragraph-box2" style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }} hidden={!errMessagePhoto}>
																{errMessagePhoto}
															</div>}

															<br />

															{partner &&
																<div><h6><b>Contact information about partner*</b></h6>
																	<br />
																	<div className="control-group">
																		<div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
																			<label><b>Responsible person name*</b></label>
																			<div class="row" >
																				<div class="form-group col-lg-10">
																					<input

																						className={"form-control"}
																						placeholder="Responsible person name"
																						aria-describedby="basic-addon1"
																						id="name"
																						type="text"
																						style={{ backgroundColor: 'white', outline: 'none', width: "1000px", height: "50px" }}

																						onChange={(e) => setResponsiblePerson(e.target.value)}
																						value={responsiblePerson}
																					/>
																				</div>
																			</div>
																		</div>
																	</div>
																	<div className="control-group">
																		<div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
																			<label><b>Phone*</b></label>
																			<div class="row" >
																				<div class="form-group col-lg-10">
																					<input

																						className={"form-control"}
																						placeholder="Phone"
																						aria-describedby="basic-addon1"
																						id="name"
																						type="text"
																						style={{ backgroundColor: 'white', outline: 'none', width: "1000px", height: "50px" }}

																						onChange={(e) => setPhone(e.target.value)}
																						value={phone}
																					/>
																				</div>
																			</div>
																		</div>
																	</div>

																	<div className="control-group">
																		<div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
																			<label><b>Email*</b></label>
																			<div class="row" >
																				<div class="form-group col-lg-10">
																					<input

																						className={"form-control"}
																						placeholder="Email"
																						aria-describedby="basic-addon1"
																						id="name"
																						type="email"
																						style={{ backgroundColor: 'white', outline: 'none', width: "1000px", height: "50px" }}

																						onChange={(e) => setEmail(e.target.value)}
																						value={email}
																					/>
																				</div>
																			</div>
																		</div>
																	</div>

																	<div className="control-group">
																		<div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
																			<label><b>Web page*</b></label>
																			<div class="row" >
																				<div class="form-group col-lg-10">
																					<input

																						className={"form-control"}
																						placeholder="Web page"
																						aria-describedby="basic-addon1"
																						id="name"
																						type="text"
																						style={{ backgroundColor: 'white', outline: 'none', width: "1000px", height: "50px" }}

																						onChange={(e) => setWebUrl(e.target.value)}
																						value={webURL}
																					/>
																				</div>
																			</div>
																		</div>
																	</div>


																</div>}


															<div className="button-p">
																<button
																	style={{ background: "#0099ff", marginTop: "px", marginRight: "55px", padding: "5px 15px", height: "35px" }}

																	onClick={(e) => { handleAdd(e) }}
																	className="btn btn-primary btn-xl"
																	id="sendMessageButton"
																	type="button"
																>
																	Add
																</button>
															</div>

														</div>
													}</div></td>

										</table>
									</form>
									<div className="paragraph-box2" style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }} hidden={!errMessagePartner}>
										{errMessagePartner}
									</div>
								</div>

								{
									points.length > 0 &&
									<div>
										{

											<div class="flex flex-col">
												<div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
													<div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
														<div class="overflow-hidden">
															<table class="min-w-full text-left text-sm font-light">
																<thead class="border-b font-medium dark:border-neutral-500">
																	<tr >
																		<th scope="col" class="px-6 py-4" style={{ border: "1px solid gray" }} >Title</th>
																		<th scope="col" class="px-6 py-4" style={{ border: "1px solid gray" }}>Short description</th>
																		<th scope="col" class="px-6 py-4" style={{ border: "1px solid gray" }}>Long description</th>
																		<th scope="col" class="px-6 py-4" style={{ border: "1px solid gray" }}>Category</th>
																		<th scope="col" class="px-6 py-4" style={{ border: "1px solid gray" }}>Price</th>
																		<th scope="col" class="px-6 py-4" style={{ border: "1px solid gray" }}>Offer name</th>
																		<th scope="col" class="px-6 py-4" style={{ border: "1px solid gray" }}>Responsible person</th>
																		<th scope="col" class="px-6 py-4" style={{ border: "1px solid gray" }}>Email</th>
																		<th scope="col" class="px-6 py-4" style={{ border: "1px solid gray" }}>Phone</th>
																		<th scope="col" class="px-6 py-4" style={{ border: "1px solid gray" }}>Web page</th>
																		<th scope="col" class="px-6 py-4" style={{ border: "1px solid gray" }}>Location</th>
																	</tr>
																</thead>

																{points.map((point) => (
																	<tbody>
																		<tr class="border-b dark:border-neutral-500" >
																			<td class="whitespace-nowrap px-6 py-4 font-medium" style={{ border: "1px solid gray" }}>{point.name.english}</td>
																			<td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>{point.shortInfo.english}</td>
																			<td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>{point.longInfo.english}</td>
																			<td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>{point.category}</td>
																			{point.price == "" ? <td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>/</td> : <td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>{point.price} {currency}</td>}
																			{point.offerName == "" ? <td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>/</td> : <td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>{point.offerName}</td>}
																			{point.contact.name == "" ? <td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>/</td> : <td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>{point.contact.name}</td>}
																			{point.contact.email == "" ? <td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>/</td> : <td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>{point.contact.email}</td>}
																			{point.contact.phone == "" ? <td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>/</td> : <td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>{point.contact.phone}</td>}
																			{point.contact.webURL == "" ? <td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>/</td> : <td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>{point.contact.webURL}</td>}

																			<td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>{`${point.location.latitude}  ${point.location.longitude}`}</td>

																		</tr>
																	</tbody>))
																}

															</table>

														</div>
													</div>
												</div>
											</div>
										}

									</div>
								}
								<div className="paragraph-box2" style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }} hidden={!errMessagePartner}>
									{errMessagePartner}
								</div>
							</div>


							<div className="form-group text-center">
								<button
									style={{ background: "#1977cc", marginTop: "15px" }}

									onClick={(e) => { handleSubmit(e) }}
									className="btn btn-primary btn-xl"
									id="sendMessageButton"
									type="button"
								>
									Add partner
								</button>
							</div>

							<br />

						</div>
					</div>
				</div>
			}
		</div >

	);
};

export default AddNewPartnerForm;
