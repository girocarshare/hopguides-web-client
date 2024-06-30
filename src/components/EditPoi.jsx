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
const EditPoi = () => {

	const { homeDataState, dispatch } = useContext(HomeDataContext);
	const addressInput = React.createRef(null);
	const [loading, setLoading] = useState(false);
	const [errTitlePoint, setErrTitlePoint] = useState("");
	const [errShortDescriptionPoint, setErrShortDescriptionPoint] = useState("");
	const [errLongDescriptionPoint, setErrLongDescriptionPoint] = useState("");
	const [errVoucherDescriptionPoint, setErrVoucherDescriptionPoint] = useState("");
	const [videoPreview, setVideoPreview] = useState(null);

	const [audioNamePoint, setAudioNamePoint] = useState("");
	const [name, setName] = useState(homeDataState?.updatePointData?.point?.name || "");
	const [nameTransl, setNameTransl] = useState("");
	const [shortInfoPointTransl, setShortInfoPointTransl] = useState("");
	const [longInfoPointTransl, setLongInfoPointTransl] = useState("");
	const [voucherDescTransl, setVoucherDescTransl] = useState("");

	const [voucherDesc, setVoucherDesc] = useState( homeDataState?.updatePointData?.point?.voucherDesc || "");

	const [errMessagePartner, setErrMessagePartner] = useState("");

	const [shortInfo, setShortInfo] = useState( homeDataState?.updatePointData?.point?.shortInfo || "");
	const [longInfo, setLongInfo] = useState(homeDataState?.updatePointData?.point?.longInfo || "");
	const [price, setPrice] = useState(0);
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [files, setFiles] = useState([]);
	const [imagePreviews, setImagePreviews] = useState([]);
	const [progressInfos, setProgressInfos] = useState({ val: [] });

	const [edit, setEdit] = useState(false);
	const [titlePoint, setTitlePoint] = useState();
	const [offerName, setOfferName] = useState("");
	const [responsiblePerson, setResponsiblePerson] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [weburl, setWebURL] = useState("");
	const [longitude, setLongitude] = useState("");
	const [latitude, setLatitude] = useState("");
	const [category, setCategory] = useState(homeDataState?.updatePointData?.point?.category || "");
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

	const defaultValue = new Date();
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





	const selectFiles = (event) => {
		let images = [];


		var fs = []
		for (let i = 0; i < event.target.files.length; i++) {



			images.push(URL.createObjectURL(event.target.files[i]));
			var new_file = new File([event.target.files[i]], i + 'partner' + name + "---" + [event.target.files[i].name]);
			fs.push(new_file)


		}

		setSelectedFiles(fs);
		setImagePreviews(images);
		setProgressInfos({ val: [] });

	};

	const selectVideo = (event) => {
		const files = event.target.files;
		const fs = [];
		for (let i = 0; i < files.length; i++) {
		  if (files[i].name.endsWith('.mp4')) {
			const new_file = new File([files[i]], i + 'partner' + name + "---" + files[i].name);
			fs.push(new_file);
			setVideoPreview(URL.createObjectURL(files[i]));
			break;
		  }
		}
		setSelectedFiles(selectedFiles.concat(fs));
		setProgressInfos({ val: [] });
	  };


	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrLongDescriptionPoint("")
		setErrShortDescriptionPoint("")
		setErrVoucherDescriptionPoint("")
		setErrTitlePoint("")

		var point = homeDataState.updatePointData.point

		var name1 = ""
		if (name == "") {
			name1 = homeDataState.updatePointData.point.name
		} else {
			name1 = name
		}

		var shortInfo1 = ""
		if (shortInfo == "") {
			shortInfo1 = homeDataState.updatePointData.point.shortInfo
		} else {
			shortInfo1 = shortInfo
		}


		var longInfo1 = ""
		if (longInfo == "") {
			longInfo1 = homeDataState.updatePointData.point.longInfo
		} else {
			longInfo1 = longInfo
		}


		if (homeDataState.updatePointData.point.offerName) {
			var voucherDesc1 = ""
			if (voucherDesc == "") {
				voucherDesc1 = homeDataState.updatePointData.point.voucherDesc
			} else {
				voucherDesc1 = voucherDesc
			}



			point.voucherDesc = voucherDesc1
		}



		point.language = homeDataState.language
		point.name = name1
		point.shortInfo = shortInfo1
		point.longInfo = longInfo1


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
		}
		point.id = homeDataState.updatePointData.point.id
		point.workingHours = { monday: { from: mondayFrom, to: mondayTo }, tuesday: { from: tuesdayFrom, to: tuesdayTo }, wednesday: { from: wednesdayFrom, to: wednesdayTo }, thursday: { from: thursdayFrom, to: thursdayTo }, friday: { from: fridayFrom, to: fridayTo }, saturday: { from: saturdayFrom, to: saturdayTo }, sunday: { from: sundayFrom, to: sundayTo } }
		const formData = new FormData();

		if (audio != null) {
			formData.append('file', audio);
		} else {

			point.audio = homeDataState.updatePointData.point.audio
		}


		if (selectedFiles.length != 0) {
			for (var f of selectedFiles) {
				console.log(f)
				formData.append('file', f);
			}
		} else {

			point.images = homeDataState.updatePointData.point.images
		}

		if (videoPreview == null) {

			point.video = homeDataState.updatePointData.point.video
		}

		if (videoPreview != null && imagePreviews.length == 0) {
			console.log(homeDataState.updatePointData.point.images)
			point.images = homeDataState.updatePointData.point.images
		}
		console.log(point)

		formData.append('point', JSON.stringify(point));
		var token = authHeader()
		var xhr = new XMLHttpRequest();


		try {
			setLoading(true);
			const response = await Axios.post(`${url}api/poi/update`, formData, {
				headers: {
					'Authorization': authHeader()
				}
			});

			setName("")
			setNameTransl("")
			setShortInfo("")
			setShortInfoPointTransl("")
			setLongInfo("")
			setLongInfoPointTransl("")
			setVoucherDesc("")
			setVoucherDescTransl("")
			setPrice("")
			setCategory("")
			setLongitude("")
			setLatitude("")
			setResponsiblePerson("")
			setEmail("")
			setWebURL("")
			setImagePreviews([])
			setVideoPreview(null)
			setFiles([])
			setAudio(null)
			setFile(null)
			setSelectedFiles([])

			console.log(response.data.updatedTour)
			
			dispatch({ type: 'TOUR_UPDATE_SUCCESS', data: response.data });
			localStorage.setItem('teaserAdded', JSON.stringify(response.data.updatedTour));
            setLoading(false);
			alert("Success")

			window.location.reload()



		} catch (error) {
			console.error('Error:', error);
			alert("Some error occured. Try again.")
			setLoading(false);
		}



	};



	const addFile = (e) => {
		if (e.target.files[0]) {

			var new_file = new File([e.target.files[0]], 'audio2' + name + "---" + [e.target.files[0].name]);
			setAudio(new_file);

			setAudioNamePoint(e.target.files[0].name)

		}
	};
	const renderLanguageVideo = (videoObj, videoPreview, selectVideo) => {
		const src = videoPreview || videoObj?.[homeDataState.language];
		return (
		  <div>
			<label className="form__label">Video</label>
			<label className="button button--secondary button--small">
			  <span>Upload video</span>
			  <input
				type="file"
				accept=".mp4"
				onChange={selectVideo}
				className="sr-only"
			  />
			</label>
			<br />
			{src ? (
			  <video className="image__preview" controls src={src} alt="video-preview" />
			) : (
			  <p>No video available for {homeDataState.language}</p>
			)}
		  </div>
		);
	  };


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
						onChangeFunc(homeDataState.language, e.target.value)
					}}
					value={valueObj[homeDataState.language]} // Use value based on the selected language
					style={{ height: 80 }}
				/>
			</div>
		</div>
	);





	const updateTitle = (language, newValue) => {
		setName(prevState => ({
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


	const updateVoucherDesc = (language, newValue) => {
		setVoucherDesc(prevState => ({
			...prevState,
			[language]: newValue // This updates the specific language key with the new value
		}));
	};
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
		<form className="form" id="contactForm">
		  <div className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
			{renderLanguageField("Title", name || homeDataState.updatePointData?.point?.name, updateTitle)}
			{renderLanguageField("Short description", shortInfo || homeDataState.updatePointData?.point?.shortInfo, updateShortInfo)}
			{renderLanguageField("Long description", longInfo || homeDataState.updatePointData?.point?.longInfo, updateLongInfo)}
			{homeDataState.updatePointData.point.offerName && (
			  <div>
				{renderLanguageField("Voucher description", voucherDesc || homeDataState.updatePointData?.point?.voucherDesc, updateVoucherDesc)}
			  </div>
			)}
		  </div>
	  
		  {homeDataState.updatePointData.point.offerName && (
			<div>
			  <div className="form__group">
				<label className="form__label">Price</label>
				<div className="flex flex-row gap-2">
				  <input
					placeholder="Price"
					aria-describedby="basic-addon1"
					className="form__input grow"
					id="name"
					onChange={(e) => setPrice(e.target.value)}
					value={price || `${homeDataState.updatePointData.point.price} ${homeDataState.updatePointData.point.currency} incl tax`}
				  />
				  <select
					onChange={(e) => setCurrency(e.target.value)}
					name="currency"
					className="form__input shrink max-w-4"
				  >
					{currencyList.map((item) => (
					  <option key={item} value={item}>
						{item}
					  </option>
					))}
				  </select>
				</div>
			  </div>
	  
			  <div className="form__group">
				<label className="form__label">Offer name</label>
				<input
				  className="form__input"
				  placeholder="Offer name"
				  aria-describedby="basic-addon1"
				  id="name"
				  type="text"
				  onChange={(e) => setOfferName(e.target.value)}
				  value={offerName || homeDataState.updatePointData.point.offerName}
				/>
			  </div>
	  
			  <div className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
				<div className="form__group">
				  <label className="form__label">Contact: responsible person</label>
				  {homeDataState.updatePointData.point.contact.name && (
					<input
					  className="form__input"
					  placeholder="Contact: responsible person"
					  aria-describedby="basic-addon1"
					  id="name"
					  type="text"
					  onChange={(e) => setResponsiblePerson(e.target.value)}
					  value={responsiblePerson || homeDataState.updatePointData.point.contact.name}
					/>
				  )}
				</div>
	  
				<div className="form__group">
				  <label className="form__label">Contact: phone</label>
				  <input
					className="form__input"
					placeholder="Contact: phone"
					aria-describedby="basic-addon1"
					id="name"
					type="text"
					onChange={(e) => setPhone(e.target.value)}
					value={phone || homeDataState.updatePointData.point.contact.phone}
				  />
				</div>
	  
				<div className="form__group">
				  <label className="form__label">Contact: email</label>
				  <input
					className="form__input"
					placeholder="Contact: email"
					aria-describedby="basic-addon1"
					id="name"
					type="text"
					onChange={(e) => setEmail(e.target.value)}
					value={email || homeDataState.updatePointData.point.contact.email}
				  />
				</div>
	  
				<div className="form__group">
				  <label className="form__label">Contact: website</label>
				  <input
					className="form__input"
					placeholder="Contact: website"
					aria-describedby="basic-addon1"
					id="name"
					type="text"
					onChange={(e) => setWebURL(e.target.value)}
					value={weburl || homeDataState.updatePointData.point.contact.webURL}
				  />
				</div>
			  </div>
			</div>
		  )}
	  
		  <div className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
			<label className="form__label">Location</label>
			<div className="form__group">
			  <input
				className="form__input"
				placeholder="Longitude"
				aria-describedby="basic-addon1"
				id="name"
				type="text"
				onChange={(e) => setLongitude(e.target.value)}
				value={longitude || homeDataState.updatePointData.point.location.longitude}
			  />
			</div>
			<input
			  className="form__input"
			  placeholder="Latitude"
			  aria-describedby="basic-addon1"
			  id="name"
			  type="text"
			  onChange={(e) => setLatitude(e.target.value)}
			  value={latitude || homeDataState.updatePointData.point.location.latitude}
			/>
		  </div>
	  
		  <div className="form__group">
			<label className="form__label">Category</label>
			<select
			  value={category}
			  onChange={(e) => setCategory(e.target.value)}
			  name="currency"
			  className="form__input"
			>
			  {categories.map((item) => (
				<option key={item} value={item}>
				  {item}
				</option>
			  ))}
			</select>
		  </div>
	  
		  {homeDataState.updatePointData.point.partner && (
			<div className="bg-black/[3%] p-4 rounded-xl gap-2 divide-y">
			  <label className="form__label">Working hours *</label>
			  <div>
				{["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => {
				  const dayClosed = eval(`${day.toLowerCase()}closed`);
				  const setDayClosed = eval(`set${day}Closed`);
				  const dayFrom = eval(`${day.toLowerCase()}From`);
				  const setDayFrom = eval(`set${day}From`);
				  const dayTo = eval(`${day.toLowerCase()}To`);
				  const setDayTo = eval(`set${day}To`);
				  return (
					<div className="form__group" key={index}>
					  <label className="form__label">{day}</label>
					  <label>
						<input
						  type="checkbox"
						  checked={dayClosed}
						  onChange={() => setDayClosed(!dayClosed)}
						/>
						closed
					  </label>
					  {!dayClosed && (
						<div>
						  <span>
							<TimePicker
							  disableClock
							  onChange={(newValue) => setDayFrom(newValue)}
							  value={dayFrom}
							/>
						  </span>
						  <span>
							<TimePicker
							  disableClock
							  onChange={(newValue) => setDayTo(newValue)}
							  value={dayTo}
							/>
						  </span>
						</div>
					  )}
					</div>
				  );
				})}
			  </div>
			</div>
		  )}
	  
		  <div>
			<label className="form__label">Image gallery</label>
			<label className="button button--secondary button--small">
			  <span>Upload image gallery</span>
			  <input
				type="file"
				multiple
				accept="image/*"
				onChange={selectFiles}
				className="sr-only"
			  />
			</label>
			<br />
			<div>
			  {imagePreviews.length ? (
				imagePreviews.map((img, i) => (
				  <div key={i}>
					<img className="image__preview" src={img} alt={`image-${i}`} />
					<br />
					<br />
				  </div>
				))
			  ) : (
				homeDataState.updatePointData.point?.images?.map((img, i) => (
				  <div key={i}>
					<img className="image__preview" src={img.image} alt={`image-${img}`} />
					<br />
				  </div>
				))
			  )}
			</div>
		  </div>
	  
		  <div>{renderLanguageVideo(homeDataState.updatePointData?.point?.video, videoPreview, selectVideo)}</div>
	  
		  <div className="form__group">
			<label className="form__label">Text to speech audio</label>
			<div>
			  <label className="button button--secondary button--small">
				<span>Upload audio</span>
				<input type="file" accept=".mp3" onChange={addFile} className="sr-only" />
			  </label>
			  <div>{audioNamePoint && <label>{audioNamePoint}</label>}</div>
			</div>
		  </div>
	  
		  {!audio && renderLanguageAudio(homeDataState.updatePointData?.point?.audio)}
	  
		  <div
			className="paragraph-box2 grid dgrid-row place-items-center"
			style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }}
			hidden={!errMessagePartner}
		  >
			{errMessagePartner}
		  </div>
	  
		  <div className="form__group grid dgrid-row place-items-center">
			{loading && (
			  <div>
				<img
				  className="mx-8 my-8 h-20"
				  src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
				  alt="loading"
				/>
			  </div>
			)}
			<button
			  onClick={handleSubmit}
			  className="button button--primary"
			  id="sendMessageButton"
			  type="button"
			>
			  Update point
			</button>
		  </div>
		</form>
	  </div>

	);
};

export default EditPoi;