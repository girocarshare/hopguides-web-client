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
const TeaserTourDataEdit = (props) => {

	const { homeDataState, dispatch } = useContext(HomeDataContext);
	const [loading, setLoading] = useState(false);
	const [errTitle, setErrTitle] = useState("");
	const [errLongDescription, setErrLongDescription] = useState("");
	const [errShortDescription, setErrShortDescription] = useState("");
	const [errAgreementTitle, setErrAgreementTitle] = useState("");
	const [errAgreementDescription, setErrAgreementDescription] = useState("");

	const [audioName, setAudioName] = useState("");
	//const [title, setTitle] = useState(localStorage.getItem('teaserAdded')?.title || "");
	const [title, setTitle] = useState(homeDataState?.updateTourData?.tour?.title || "");
	const [place, setPlace] = useState("");
	const [agreementTitle, setAgreementTitle] = useState(homeDataState?.updateTourData?.tour?.agreementTitle || "");
	const [agreementDesc, setAgreementDesc] = useState(homeDataState?.updateTourData?.tour?.agreementDesc || "");
	const [shortInfo, setShortInfo] = useState(homeDataState?.updateTourData?.tour?.shortInfo || "");
	const [longInfo, setLongInfo] = useState(homeDataState?.updateTourData?.tour?.longInfo || "");
	const [price, setPrice] = useState(0);

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



	const handleSubmit = async (e) => {
		e.preventDefault();
		var tour = {}

		setErrTitle("")
		setErrLongDescription("")
		setErrShortDescription("")
		setErrAgreementDescription("")
		setErrAgreementTitle("")

		var title1 = ""
		if (title == "") {
			console.log("evo me")
			title1 = homeDataState.updateTourData.tour.title
		} else {

			console.log(title)
			title1 = title
		}


		var agreementTitle1 = ""
		if (agreementTitle == "") {
			agreementTitle1 = homeDataState.updateTourData.tour.agreementTitle.english
		} else {
			agreementTitle1 = agreementTitle
		}


		var agreementDesc1 = ""
		if (agreementDesc == "") {
			agreementDesc1 = (homeDataState.updateTourData.tour.agreementDesc.english)
		} else {
			agreementDesc1 = agreementDesc
		}


		var shortInfo1 = ""
		if (shortInfo == "") {
			shortInfo1 = (homeDataState.updateTourData.tour.shortInfo.english)
		} else {
			shortInfo1 = shortInfo
		}


		var longInfo1 = ""
		if (longInfo == "") {
			longInfo1 = (homeDataState.updateTourData.tour.longInfo.english)
		} else {
			longInfo1 = longInfo
		}



		tour.language = homeDataState.language
		tour.title = title1
		tour.agreementTitle = agreementTitle1
		tour.agreementDesc = agreementDesc1
		tour.shortInfo = shortInfo1
		tour.longInfo = longInfo1


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
			tour.image = homeDataState.updateTourData.tour.image;
		}
		if (audio != null) {
			formData.append('file', audio);
		} else {
			tour.audio = homeDataState.updateTourData.tour.audio;
		}

		// Add the tour data to the FormData object
		console.log(tour); // Log the data being sent
		formData.append('tour', JSON.stringify(tour));

		try {
			setLoading(true);
			const response = await Axios.post(`${url}api/pnl/tour/update/tour`, formData, {
				headers: {
					'Authorization': authHeader()
				}
			});

			dispatch({ type: 'TOUR_UPDATE_SUCCESS', data: response.data });
			localStorage.setItem('teaserAdded', JSON.stringify(response.data.updatedTour));
			setLoading(false);
			alert("Success")
			window.location.reload()
		} catch (error) {
			console.error('Error updating tour:', error);
			alert("Some error occured. Try again.")
			setLoading(false);
		}

	};




	const updateTitle = (language, newValue) => {
		setTitle(prevState => ({
			...prevState,
			[language]: newValue // This updates the specific language key with the new value
		}));
	};


	const updateAgreementTitle = (language, newValue) => {
		setAgreementTitle(prevState => ({
			...prevState,
			[language]: newValue // This updates the specific language key with the new value
		}));
	};



	const updateAgreementDesc = (language, newValue) => {
		setAgreementDesc(prevState => ({
			...prevState,
			[language]: newValue // This updates the specific language key with the new value
		}));
	};



	const updateShortInfo = (language, newValue) => {
		setShortInfo(prevState => ({
			...prevState,
			[language]: newValue // This updates the specific language key with the new value
		}));
	};

	const updateLongInfo = (language, newValue) => {
		setLongInfo(prevState => ({
			...prevState,
			[language]: newValue // This updates the specific language key with the new value
		}));
	};
	// Function to render each language field for editing
	const renderLanguageField = (label, valueObj, onChangeFunc) => (
		<div className="form__group">
			<label className="form__label">{label}</label>
			<div className="flex flex-col gap-2">
				<textarea
					className="form__input text-sm"
					placeholder={`${label} in ${homeDataState.language}`} // Add selected language to the placeholder
					aria-describedby="basic-addon1"
					id={label}
					type="text"
					onChange={(e) => {
						console.log(title)
						onChangeFunc(homeDataState.language, e.target.value)
					}}
					value={valueObj[homeDataState.language]} // Use value based on the selected language
					style={{ height: 80 }}
				/>
			</div>
		</div>
	);

	const renderLanguageAudio = (audioObj) => {
		const src = audioObj[homeDataState.language];
		return (
			src ? (
				<ReactAudioPlayer src={src} controls />
			) : (
				<p>No audio available for {homeDataState.language}</p>
			)
		);
	};


	return (
		<div>
			{(
				<div>

					<div >
						<form className="form" id="contactForm">
							<div className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">


								{renderLanguageField("Title", title, updateTitle)}
								{renderLanguageField("Agreement Title", agreementTitle, updateAgreementTitle)}
								{renderLanguageField("Agreement Description", agreementDesc, updateAgreementDesc)}
								{renderLanguageField("Short Information", shortInfo, updateShortInfo)}
								{renderLanguageField("Long Information", longInfo, updateLongInfo)}
							</div>

							<div className="form__group">
								<label className="form__label">Price</label>
								<div className="flex flex-row items-center gap-2">
									<input
										placeholder="Price"
										className="form__input"
										aria-describedby="basic-addon1"
										id="name"
										type="text"
										onChange={(e) => setPrice(e.target.value)}
										value={price === 0 ? `${homeDataState.updateTourData?.tour?.price} ${homeDataState.updateTourData?.tour?.currency} incl tax` : price}
									/>
									<select onChange={(e) => setCurrency(e.target.value)} name="currency" className="form__input">
										{currencyList.map((item) => (
											<option key={item} value={item}>
												{item}
											</option>
										))}
									</select>
								</div>
							</div>

							<div className="form__group">
								<label className="form__label">Tour duration</label>
								<input
									className="form__input"
									placeholder="Tour duration"
									aria-describedby="basic-addon1"
									id="name"
									type="text"
									onChange={(e) => setDuration(e.target.value)}
									value={duration}
								/>
							</div>

							<div className="form__group">
								<label className="form__label">Tour length (km)</label>
								<input
									className="form__input"
									placeholder="Tour length (km)"
									aria-describedby="basic-addon1"
									id="name"
									type="text"
									onChange={(e) => setLength(e.target.value)}
									value={length}
								/>
							</div>

							<div className="form__group">
								<label className="form__label">Highest point*</label>
								<input
									className="form__input"
									placeholder="Highest point"
									aria-describedby="basic-addon1"
									id="name"
									type="text"
									onChange={(e) => setHighestPoint(e.target.value)}
									value={highestPoint}
								/>
							</div>

							<div className="form__group">
								<label className="form__label">Background tour image</label>
								<label className="button button--secondary button--small">
									<span>Upload image</span>
									<input type={"file"} name={"file"} accept="image/*" onChange={onFileChange} className="sr-only" />
								</label>
								<div>{fileData()}</div>
								<div className="mt-2">
									{imagePreview && !videoPreview && (
										<img className="image__preview" src={imagePreview} alt={"image-"} />
									)}
									{!imagePreview && !videoPreview && homeDataState.updateTourData?.tour?.image.substring(homeDataState.updateTourData.tour?.image?.length - 3) != "mp4" && (
										<img className="image__preview" src={homeDataState.updateTourData?.tour?.image} alt={"image-"} />
									)}
									{videoPreview && !imagePreview && (
										<video className="image__preview" controls src={videoPreview} alt={"video-"} />
									)}
									{!videoPreview && !imagePreview && homeDataState.updateTourData?.tour?.image.substring(homeDataState.updateTourData?.tour?.image.length - 3) == "mp4" && (
										<video controls className="image__preview" src={homeDataState.updateTourData?.tour?.image} alt={"video-"} />
									)}
								</div>
							</div>

							<div className="form__group">
								<label className="form__label">Text-to-speech audio</label>
								<div className="mt-2">
									<label className="button button--secondary button--small">
										<span>Upload audio</span>
										<input type={"file"} accept={".mp3"} onChange={addFile} className="sr-only" />
									</label>
									{audioName && <label>{audioName}</label>}
								</div>
								<br />
								<div>
									{!audio && renderLanguageAudio(homeDataState.updateTourData?.tour?.audio)}
								</div>
							</div>

							{showModal && (
								<div>
									<textarea
										className="form__input"
										placeholder="Terms and conditions"
										aria-describedby="basic-addon1"
										id="name"
										type="textarea"
										style={{ height: "500px" }}
										onChange={(e) => setTermsAndConditions(e.target.value)}
										value={termsAndConditions === "" ? homeDataState.updateTourData?.tour?.termsAndConditions : termsAndConditions}
									/>
								</div>
							)}

							<div className="paragraph-box2 grid dgrid-row place-items-center" style={{ color: "red", fontSize: "0.8em", marginBottom: "30px" }} hidden={!errMessage}>
								{errMessage}
							</div>

							<div className="grid place-items-center form__group">
								{loading && (
									<div>
										<img className="mx-8 my-8 h-20" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
									</div>
								)}
								<button onClick={(e) => handleSubmit(e)} className="button button--primary" id="sendMessageButton" type="button">
									Update tour
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};


export default TeaserTourDataEdit;