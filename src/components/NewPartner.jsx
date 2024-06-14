import React, { useContext, useEffect, useState, forwardRef, useRef } from "react";
import { homeDataService } from "../services/HomeDataService";
import { HomeDataContext } from "../contexts/HomeDataContext";
import { homeDataConstants } from "../constants/HomeDataConstants";
import TimePicker from 'react-time-picker';
import Axios from "axios";
import ReactAudioPlayer from 'react-audio-player';
import { deleteLocalStorage, authHeader } from "../helpers/auth-header";
import { AiOutlineClose } from 'react-icons/ai';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

var num = 1;

var url = process.env.REACT_APP_URL || "http://localhost:8080/";
const NewPartner = (props) => {

	const [loading, setLoading] = useState(false);
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
	const [audioPoint, setAudioPoint] = useState();
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


	const addPartner = () => {
		setPartner(true)
		setPoint(false)

	};


	const addPoint = () => {
		setPartner(false)
		setPoint(true)

	};



	function getMimeType(fileName) {
		const extension = fileName.split('.').pop().toLowerCase();
		const mimeTypes = {
			'jpg': 'image/jpeg',
			'jpeg': 'image/jpeg',
			'png': 'image/png',
			// Add other file types as needed
		};
		return mimeTypes[extension] || 'application/octet-stream'; // Default to binary type if unknown
	}



	const handleAdd = async (e) => {
		const presignedUrlEndpoint = `${url}api/pnl/tour/teaser-tour/generate-presigned-url`;
		setErrLongDescriptionPoint("");
		setErrShortDescriptionPoint("");
		setErrVoucherDescriptionPoint("");
		setErrTitlePoint("");
	
		if (partner && (titlePoint == "" || shortInfoPoint == "" || longInfoPoint == "" || category == "" || pointPrice == "" || offerName == "" || responsiblePerson == "" || voucherDesc == "" || phone == "" || email == "" || longitude == "" || latitude == "" || audio2 == null || selectedFiles.length == 0 || (!mondayclosed && (mondayFrom == "" || mondayTo == "")) || (!tuesdayclosed && (tuesdayFrom == "" || tuesdayTo == "")) || (!wednesdayclosed && (wednesdayFrom == "" || wednesdayTo == "")) || (!thursdayclosed && (thursdayFrom == "" || thursdayTo == "")) || (!fridayclosed && (fridayFrom == "" || fridayTo == "")) || (!saturdayclosed && (saturdayFrom == "" || saturdayTo == "")) || (!sundayclosed && (sundayFrom == "" || sundayTo == "")))) {
			setErrMessagePartner("Please insert mandatory fields for partner");
		} else if (point && (titlePoint == "" || shortInfoPoint == "" || longInfoPoint == "" || category == "" || longitude == "" || latitude == "" || audio2 == null || selectedFiles.length == 0)) {
			setErrMessagePartner("Please insert mandatory fields for point of interest ");
		} else {
			setAdd(false);
			setErrMessagePartner("");
	
			var tourStorage = JSON.parse(localStorage.getItem('teaserAdded'));
			var point = {
				num: num,
				price: pointPrice,
				offerName: offerName,
				contact: { phone: phone, email: email, webURL: webURL, name: responsiblePerson },
				location: { latitude: latitude, longitude: longitude },
				workingHours: { monday: { from: mondayFrom, to: mondayTo }, tuesday: { from: tuesdayFrom, to: tuesdayTo }, wednesday: { from: wednesdayFrom, to: wednesdayTo }, thursday: { from: thursdayFrom, to: thursdayTo }, friday: { from: fridayFrom, to: fridayTo }, saturday: { from: saturdayFrom, to: saturdayTo }, sunday: { from: sundayFrom, to: sundayTo } },
				category: category,
				bpartnerId: tourStorage.bpartnerId,
			};
	
			if (partner) {
				point.voucherDesc = voucherDesc;
			}
	
			point.name = titlePoint;
			point.shortInfo = shortInfoPoint;
			point.longInfo = longInfoPoint;
	
			var images = [];
			var video = null;
	
			for (var f of selectedFiles) {
				console.log(f.type);
	
				let poiType = f.type;
				if (!poiType || poiType === "application/octet-stream") {
					poiType = getMimeType(f.name);
					console.log('Detected MIME type:', poiType);
				}
	
				const poiResponse = await fetch(
					`${presignedUrlEndpoint}?fileName=${f.name}&fileType=${poiType.toLowerCase()}`
				);
				const poiData = await poiResponse.json();
				const poiPresignedUrl = poiData.url;
	
				console.log("Presigned URL obtained");
				const uploadPOI = await fetch(poiPresignedUrl, {
					method: 'PUT',
					headers: {
						'Content-Type': poiType,
					},
					body: f,
				});
	
				if (!uploadPOI.ok) {
					alert(`POI file upload failed: ${uploadPOI.statusText}`);
					return;
				}
	
				console.log("Upload successful");
	
				if (poiType.startsWith('video/')) {
					video = "https://hopguides.s3.amazonaws.com/" + poiData.name;
				} else {
					images.push({ image: "https://hopguides.s3.amazonaws.com/" + poiData.name });
				}
			}
	
			point.images = images;
			if (video) {
				point.video = video;
			}
	
			function getAudioMimeType(fileName) {
				const extension = fileName.split('.').pop().toLowerCase();
				const mimeTypes = {
					'mp3': 'audio/mpeg',
					'wav': 'audio/wav',
					'ogg': 'audio/ogg',
					'aac': 'audio/aac',
					// Add other audio types as needed
				};
				return mimeTypes[extension] || 'application/octet-stream'; // Default to binary type if unknown
			}
	
			let poiType = audio2.type;
			if (!poiType) {
				poiType = getAudioMimeType(audio2.name);
				console.log('Detected MIME type:', poiType);
			}
	
			const poiResponse = await fetch(
				`${presignedUrlEndpoint}?fileName=${audio2.name}&fileType=${poiType.toLowerCase()}`
			);
			const poiData = await poiResponse.json();
			const poiPresignedUrl = poiData.url;
	
			console.log("Presigned URL obtained");
			const uploadPOI = await fetch(poiPresignedUrl, {
				method: 'PUT',
				headers: {
					'Content-Type': poiType,
				},
				body: audio2,
			});
	
			if (!uploadPOI.ok) {
				alert(`Audio upload failed: ${uploadPOI.statusText}`);
				return;
			}
	
			console.log("Audio upload successful");
	
			point.audio = "https://hopguides.s3.amazonaws.com/" + poiData.name;
			point.language = homeDataState.language;
	
			var points = [];
			points.push(point);
	
			e.preventDefault();
			var tour = {
				id: tourStorage.id,
				points: points,
			};
	
			console.log(tour);
	
			const formData = new FormData();
			formData.append('tour', JSON.stringify(tour));
	
			try {
				setLoading(true);
	
				const qrcodeResponse = await fetch(`${url}api/pnl/tour/addFull/partner`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						tour: tour,
					}),
				});
	
				if (qrcodeResponse.ok) {
					setLoading(false);
					alert("Success");
					const responseData = await qrcodeResponse.json();
	
					console.log(responseData);
	
					var tourStorage = JSON.parse(localStorage.getItem('teaserAdded'));
					tourStorage.points.push(responseData);
					localStorage.setItem('teaserAdded', JSON.stringify(tourStorage));
					window.location.reload();
				} else {
					alert('Failed to add the tour');
				}
			} catch (error) {
				console.error('Error:', error);
				alert("Some error occurred. Try again.");
				setLoading(false);
			}
		}
	};
	
	function getMimeType(fileName) {
		const extension = fileName.split('.').pop().toLowerCase();
		const mimeTypes = {
			'jpg': 'image/jpeg',
			'jpeg': 'image/jpeg',
			'png': 'image/png',
			'gif': 'image/gif',
			'mp4': 'video/mp4',
			'mov': 'video/quicktime',
			// Add other MIME types as needed
		};
		return mimeTypes[extension] || 'application/octet-stream'; // Default to binary type if unknown
	}
	const addFile2 = (e) => {
		if (e.target.files[0]) {

			var new_file = new File([e.target.files[0]], 'audio2' + num + "---" + [e.target.files[0].name]);

			setAudio2(new_file);
			setAudioName(e.target.files[0].name)
		}
	};

	const renderAudioField = (label, valueObj, onChangeFunc) => (
		<div className="form__group">
			<label className="form__label">{label}</label>
			<div className="flex flex-col gap-2">
				<input
					className="form__input text-sm"
					placeholder={`${label} in ${homeDataState.language}`} // Add selected language to the placeholder
					aria-describedby="basic-addon1"
					id={label}
					type="file"
					accept="audio/*"
					onChange={(e) => {
						const file = e.target.files[0];
						onChangeFunc(homeDataState.language, file);
					}}
					style={{ height: 40 }}
				/>
				{valueObj[homeDataState.language] && (
					<audio controls>
						<source src={URL.createObjectURL(valueObj[homeDataState.language])} />
					</audio>
				)}
			</div>
		</div>
	);

	const updateAudio = (language, newValue) => {
		setAudio2(prevState => ({
			...prevState,
			[language]: newValue // This updates the specific language key with the new value
		}));
	};



	const renderLanguageVideo = (videoObj, videoPreview, selectVideo) => {
		const src = videoPreview;
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
				{src &&
					<video className="image__preview" controls src={src} alt="video-preview" />
				}
			</div>
		);
	};

	const selectVideo = (event) => {



		var fs = []
		for (let i = 0; i < event.target.files.length; i++) {

			if ((event.target.files[i].name).substring(event.target.files[i].name.length - 3) == "mp4") {

				var new_file = new File([event.target.files[i]], i + 'partner' + num + "---" + [event.target.files[i].name]);
				fs.push(new_file)
				setVideoPreview(URL.createObjectURL(event.target.files[i]))

			}

		}

		setSelectedFiles(selectedFiles.concat(fs))
		setProgressInfos({ val: [] });
		setMessage([]);

	};



	const updateVideo = (language, newValue) => {
		setVideoPreview(prevState => ({
			...prevState,
			[language]: newValue // This updates the specific language key with the new value
		}));
	};


	const selectFiles = (event) => {
		let images = [];


		var fs = []
		for (let i = 0; i < event.target.files.length; i++) {

			images.push(URL.createObjectURL(event.target.files[i]));
			var new_file = new File([event.target.files[i]], i + 'partner' + num + "---" + [event.target.files[i].name]);
			fs.push(new_file)


		}

		setSelectedFiles(fs)
		setImagePreviews(images);
		setProgressInfos({ val: [] });
		setMessage([]);

	};


	const SuccessHandler = (e) => {

		setLoading(false)
		alert("Success")
		var tourStorage = JSON.parse(localStorage.getItem('teaserAdded'));
		tourStorage.points.push()
		window.location.reload()
		//homeDataService.addPartner(true, dispatch);

	};
	const ErrorHandler = () => {

		setLoading(false)
		alert("Some error occured. Try again.")
		//homeDataService.addPartner(false, dispatch);
	};
	const AbortHandler = () => {

		homeDataService.insertData(false, dispatch);
	};


	const ProgressHandler = (e) => {

		setLoading(true)

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
		setTitlePoint(prevState => ({
			...prevState,
			[language]: newValue // This updates the specific language key with the new value
		}));
	};


	const updateShortInfo = (language, newValue) => {
		setShortInfoPoint(prevState => ({
			...prevState,
			[language]: newValue // This updates the specific language key with the new value
		}));
	};




	const updateLongInfo = (language, newValue) => {
		setLongInfoPoint(prevState => ({
			...prevState,
			[language]: newValue // This updates the specific language key with the new value
		}));
	};

	const updateVouncherDesc = (language, newValue) => {
		setVoucherDesc(prevState => ({
			...prevState,
			[language]: newValue // This updates the specific language key with the new value
		}));
	};



	return (


		<div>
			{
				<div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">


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
										<div className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
											{renderLanguageField("Title", titlePoint, updateTitle)}
											{renderLanguageField("Short description", shortInfoPoint, updateShortInfo)}
											{renderLanguageField("Long description", longInfoPoint, updateLongInfo)}
											{partner && <div>{renderLanguageField("Voucher description", voucherDesc, updateVouncherDesc)}</div>}
										</div>

										<div className="form__group">
											<label class="form__label">Category</label>
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
												<label class="form__label">Price</label>
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
												<label class="form__label">Offer name</label>
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

												<label class="form__label">Address </label>
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
														hours</label>

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
											<label class="form__label">Text to speach audio</label>
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

											<label class="form__label">Image gallery</label>

											<label
												class="button button--secondary button--small">
												<span>Upload image gallery</span>
												<input type="file"
													multiple
													accept="image/*"
													onChange={selectFiles}
													class="sr-only" />
											</label>
											<br />


											{imagePreviews && (
												<div>
													{imagePreviews.map((img, i) => {
														return (
															<div>  <br />
																<img className="image__preview" src={img}
																	alt={"image-" + i} key={i} />

																<br />

															</div>
														);
													})}
												</div>
											)}


										</div>


										<div>


											{renderLanguageVideo(homeDataState.updatePointData?.point?.video, videoPreview, selectVideo)}


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
															partner</label>
													</div>
													<div className="form__group">
														<label class="form__label">Responsible person
															name</label>
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
														<label class="form__label">Phone</label>
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
														<label class="form__label">Email</label>
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
														<label class="form__label">Web page</label><input

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
												Add point of interest
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


				</div>


			}
		</div>

	);
};

export default NewPartner;