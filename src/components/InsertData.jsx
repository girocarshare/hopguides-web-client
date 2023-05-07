import React, { useContext, useEffect, useState, forwardRef, useRef } from "react";
import { homeDataService } from "../services/HomeDataService";
import { HomeDataContext } from "../contexts/HomeDataContext";
import { homeDataConstants } from "../constants/HomeDataConstants";
import TimePicker from 'react-time-picker';
import { AiOutlineClose } from 'react-icons/ai';
import {deleteLocalStorage, authHeader} from "../helpers/auth-header";
import Axios from "axios";
import AddPartnerOrPointForm from "./AddPartnerOrPointForm";
import BasicTourData from "./BasicTourData";

var url = process.env.REACT_APP_URL || "http://localhost:8080/";

var num = 1;
const InsertData = (props) => {

	
	const [errTitle, setErrTitle] = useState("");
	const [errLongDescription, setErrLongDescription] = useState("");
	const [errShortDescription, setErrShortDescription] = useState("");
	const [errAgreementTitle, setErrAgreementTitle] = useState("");
	const [errAgreementDescription, setErrAgreementDescription] = useState("");


	const [errImageTitle, setErrImageTitle] = useState("");
	const [errTitlePoint, setErrTitlePoint] = useState("");
	const [errShortDescriptionPoint, setErrShortDescriptionPoint] = useState("");
	const [errLongDescriptionPoint, setErrLongDescriptionPoint] = useState("");
	const [errVoucherDescriptionPoint, setErrVoucherDescriptionPoint] = useState("");


	const [audioName, setAudioName] = useState("");
	const [audioNamePoint, setAudioNamePoint] = useState("");
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
	const [audio2, setAudio2] = useState(null);
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

	function isJsonString(str) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}

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

		setErrTitle("")
		setErrLongDescription("")
		setErrShortDescription("")
		setErrAgreementDescription("")
		setErrAgreementTitle("")


		if (titleTransl == "" || agreementDescTransl == "" || file==null|| agreementDescTransl == "" || audio == null || shortInfo == "" || longInfo == "" || price == "" || hotelId == "" || duration == "" || length == "" || highestPoint == "") {
			setErrMessage("Please fill in the fileds marked with *")
		} else {
		
			if(!isJsonString(titleTransl)){
				setErrTitle("Please insert the proper JSON format. Pay attention on enter and quotes(\")")
				setErrMessage("JSON format invalid. Check the red fields.")
			}
			if(!isJsonString(agreementTitleTransl)){
				setErrAgreementTitle("Please insert the proper JSON format. Pay attention on enter and quotes(\")")
				setErrMessage("JSON format invalid. Check the red fields.")
			}
			if(!isJsonString(agreementDescTransl)){
				setErrAgreementDescription("Please insert the proper JSON format. Pay attention on enter and quotes(\")")
				setErrMessage("JSON format invalid. Check the red fields.")
			}
			if(!isJsonString(shortInfo)){
				setErrShortDescription("Please insert the proper JSON format. Pay attention on enter and quotes(\")")
				setErrMessage("JSON format invalid. Check the red fields.")
			}
			if(!isJsonString(longInfo)){
				setErrLongDescription("Please insert the proper JSON format. Pay attention on enter and quotes(\")")
				setErrMessage("JSON format invalid. Check the red fields.")
			}

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
	useEffect(() => {
		var token = authHeader()
        if (token == "null") {
          window.location = "#/unauthorized";
        } else {
          Axios.get(`${url}api/users/getRole`, { headers: { Authorization: token } }, { validateStatus: () => true },
          )
            .then((res) => {
              if (res.status === 200) {
                if ("BPARTNER" == res.data) {
                 
          window.location = "#/unauthorized";
                }
              
              }
            })
            .catch((err) => {
            })
        }
	
	}, [dispatch]);
	const addPartner = () => {
		setPartner(true)
		setPoint(false)
		window.scrollTo(0, 0);

	};

	const addPoint = () => {
		console.log("Evoo")
		setPartner(false)
		setPoint(true)
		window.scrollTo(0, 0);

	};

	const editTermsAndConditions = () => {

		setShowModal(true)
		setTermsAndConditions(eval('`' + homeDataState.termsAndConditionsModal.text + '`'))

	};

	const handleAdd = (e) => {

		setErrImageTitle("")
		setErrLongDescriptionPoint("")
		setErrShortDescriptionPoint("")
		setErrVoucherDescriptionPoint("")
		setErrTitlePoint("")


		if (partner && (titlePointTransl == "" || shortInfoPointTransl == "" || longInfoPointTransl == "" || category == "" || pointPrice == "" || offerName == "" || responsiblePerson == "" || voucherDescTransl == "" || phone == "" || email == "" || longitude == "" || latitude == "" || audio2 == null || selectedFiles.length == 0 || (!mondayclosed && (mondayFrom == "" || mondayTo == "")) || (!tuesdayclosed && (tuesdayFrom == "" || tuesdayTo == "")) || (!wednesdayclosed && (wednesdayFrom == "" || wednesdayTo == "")) || (!thursdayclosed && (thursdayFrom == "" || thursdayTo == "")) || (!fridayclosed && (fridayFrom == "" || fridayTo == "")) || (!saturdayclosed && (saturdayFrom == "" || saturdayTo == "")) || (!sundayclosed && (sundayFrom == "" || sundayTo == "")))) {
			setErrMessagePartner("Please insert mandatory fields for partner (marked with *)")
		} else if (point && (titlePointTransl == "" || shortInfoPointTransl == "" || longInfoPointTransl == "" || category == "" || longitude == "" || latitude == "" || audio2 === null || selectedFiles.length === 0)) {
			
			setErrMessagePartner("Please insert mandatory fields for point of interest (marked with *)")
		} else {
			setAdd(false)
			setErrMessagePartner("")
			var jsonTitles = []
			for (var ti of imageTitles) {
				var help = ti.split("---")
				if(!isJsonString(help[0])){
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


			if(!isJsonString(titlePointTransl)){
				setErrTitlePoint("Please insert the proper JSON format. Pay attention on enter and quotes(\")")
				setErrMessagePartner("JSON format invalid. Check the red fields.")
			}
			if(!isJsonString(shortInfoPointTransl)){
				setErrShortDescriptionPoint("Please insert the proper JSON format. Pay attention on enter and quotes(\")")
				setErrMessagePartner("JSON format invalid. Check the red fields.")
			}
			if(!isJsonString(longInfoPointTransl)){
				setErrLongDescriptionPoint("Please insert the proper JSON format. Pay attention on enter and quotes(\")")
				setErrMessagePartner("JSON format invalid. Check the red fields.")
			}
			if(partner && !isJsonString(voucherDescTransl)){
				setErrVoucherDescriptionPoint("Please insert the proper JSON format. Pay attention on enter and quotes(\")")
				setErrMessagePartner("JSON format invalid. Check the red fields.")
			}
			var pointObj = {
				num: num,
				name: JSON.parse(titlePointTransl),
				shortInfo: JSON.parse(shortInfoPointTransl),
				longInfo: JSON.parse(longInfoPointTransl),
				price: pointPrice.toString(),
				offerName: offerName,
				contact: { phone: phone, email: email, webURL: webURL, name: responsiblePerson },
				location: { latitude: latitude.toString(), longitude: longitude.toString() },
				workingHours: { monday: { from: mondayFrom, to: mondayTo }, tuesday: { from: tuesdayFrom, to: tuesdayTo }, wednesday: { from: wednesdayFrom, to: wednesdayTo }, thursday: { from: thursdayFrom, to: thursdayTo }, friday: { from: fridayFrom, to: fridayTo }, saturday: { from: saturdayFrom, to: saturdayTo }, sunday: { from: sundayFrom, to: sundayTo } },
				bpartnerId: hotelId,
				category: category,
				imageTitles: jsonTitles,
			}
			if (voucherDesc == "") {
				pointObj.voucherDesc = JSON.parse(`{
                  "english": "",
                  "spanish": "",
                  "serbian": "",
                  "slovenian": ""
                  }`)
				  pointObj.partner = false
			} else {
				pointObj.voucherDesc = JSON.parse(voucherDescTransl)
				pointObj.partner = true
			}
			const newData = [pointObj, ...points];
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
			setAudioNamePoint("")
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
			
			setAudioNamePoint(e.target.files[0].name)
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

										<BasicTourData
											setTitle={setTitle}
											title={title}
											fetchData={fetchData}
											setTitleTransl={setTitleTransl}
											titleTransl={titleTransl}
											setPlace={setPlace}
											place={place}
											makeShortAndLongDesc={makeShortAndLongDesc}
											shortInfo={shortInfo}
											setShortInfo={setShortInfo}
											longInfo={longInfo}
											setLongInfo={setLongInfo}
											setAgreementTitle={setAgreementTitle}
											agreementTitle={agreementTitle}
											setAgreementTitleTransl={setAgreementTitleTransl}
											agreementTitleTransl={agreementTitleTransl}
											setAgreementDesc={setAgreementDesc}
											agreementDesc={agreementDesc}
											setAgreementDescTransl={setAgreementDescTransl}
											agreementDescTransl={agreementDescTransl}
											setPrice={setPrice}
											price={price}
											setCurrency={setCurrency}
											currencyList={currencyList}
											setHotelId={setHotelId}
											homeDataState={homeDataState}
											setDuration={setDuration}
											duration={duration}
											setLength={setLength}
											length={length}
											setHighestPoint={setHighestPoint}
											highestPoint={highestPoint}
											addFile={addFile}
											audioName={audioName}
											onFileChange={onFileChange}
											fileData={fileData}
											imagePreview={imagePreview}
											editTermsAndConditions={editTermsAndConditions}
											partner={partner}
											point={point}
											addPartner={addPartner}
											addPoint={addPoint}
											errTitle = {errTitle}
											errLongDescription = {errLongDescription}
											errShortDescription = {errShortDescription}
											errAgreementTitle = {errAgreementTitle}
											errAgreementDescription = {errAgreementDescription}
										/>


										<AddPartnerOrPointForm
											partner={partner}
											point={point}
											handleClosePoi={handleClosePoi}
											setTitlePoint={setTitlePoint}
											titlePoint={titlePoint}
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
											errTitlePoint = {errTitlePoint}
											errShortDescriptionPoint = {errShortDescriptionPoint}
											errLongDescriptionPoint = {errLongDescriptionPoint}
											errVoucherDescriptionPoint = {errVoucherDescriptionPoint}
											errImageTitle = {errImageTitle}
											audioNamePoint = {audioNamePoint}
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

										<div class="modal__body grid dgrid-row place-items-center">
											

											<div className="paragraph-box2 grid dgrid-row place-items-center"
                                            style={{ color: "red", fontSize: "0.8em", marginBottom: "30px" }}
                                            hidden={!errMessage}>
                                            {errMessage}
                                        </div>


											<div className="button-p grid dgrid-row place-items-center">
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