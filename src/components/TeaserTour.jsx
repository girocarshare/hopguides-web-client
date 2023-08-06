import React, { useContext, useEffect, useImperativeHandle, forwardRef, useState } from "react";
import { HomeDataContext } from "../contexts/HomeDataContext";
import { homeDataService } from "../services/HomeDataService";
import HomeDataContextProvider from "../contexts/HomeDataContext";
import { YMaps, Map } from "react-yandex-maps";
import { authHeader } from "../helpers/auth-header";
import Axios from "axios";
import { AiOutlineClose } from 'react-icons/ai';

var url = process.env.REACT_APP_URL || "http://localhost:8080/";

var num = 1;
const TeaserTour = () => {

	const { homeDataState, dispatch } = useContext(HomeDataContext);

	const [loading, setLoading] = useState(false);
	const [longitude, setLongitude] = useState("");
	const [latitude, setLatitude] = useState("");
	const [tours, setTours] = useState([]);
	const [title, setTitle] = useState("");
	const [tourTitle, setTourTitle] = useState("");
	const [errMessage, setErrMessage] = useState("");
	const [file, setFile] = useState(null);
	const [filePoi, setFilePoi] = useState(null);
	const [success, setSuccess] = useState(false);
	const [imagePreview, setImagePreview] = useState(null);
	const [imagePreviewPoi, setImagePreviewPoi] = useState(null);
	const [videoPreviewTour, setVideoPreviewTour] = useState(null);
	const [imagePreviews, setImagePreviews] = useState([]);
	const [videoPreview, setVideoPreview] = useState(null);
	const [selectedFiles, setSelectedFiles] = useState([]);

	const [files, setFiles] = useState([]);
	const handleSubmitNew = async (e) => {
		var tour = {
			points: tours,
			title: tourTitle
		}


		const formData = new FormData();
		formData.append('file', file);
		for (var f of files) {
			console.log(f)
			formData.append('file', f);
		}
		formData.append('tour', JSON.stringify(tour));
		var token = authHeader()
		var xhr = new XMLHttpRequest();
		xhr.upload.addEventListener("progress", ProgressHandler, false);
		//xhr.addEventListener("load", SuccessHandler, false);
		//xhr.addEventListener("error", ErrorHandler, false);
		//xhr.addEventListener("abort", AbortHandler, false);
		xhr.open('POST', `${url}api/pnl/tour/add/teasertour`, true);
		xhr.setRequestHeader('authorization', token);
		xhr.onload = function () {

			if (xhr.status == 200) {
				SuccessHandler()
			} else {
				ErrorHandler()
			}
		};
		xhr.send(formData);



		//await homeDataService.addTeaserVideo(dispatch, tour);
	};



	const ProgressHandler = (e) => {

		setLoading(true)

	};

	const SuccessHandler = (e) => {
		
		setLoading(false)
		homeDataService.addTeaserVideo(true, dispatch);
	};
	const ErrorHandler = () => {

		homeDataService.addTeaserVideo(false, dispatch);
	};

	const handleClose = () => {
		window.location = "#/"
	};
	const handleAddTour = () => {
		var tour = {
			title: title,
			longitude: longitude,
			latitude: latitude,
			num : num
		}

		const newData = [...tours, tour];
		setTours(newData)
		setTitle("")
		setLongitude("")
		setLatitude("")


		
		setFiles(files.concat(selectedFiles))
		setSelectedFiles([])
		setImagePreviews([])
		setVideoPreview(null)
		num = num + 1
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


	};

	const selectVideo = (event) => {



		var fs = []
		for (let i = 0; i < event.target.files.length; i++) {

			if ((event.target.files[0].name).substring(event.target.files[0].name.length - 3) == "mp4") {
				var new_file = new File([event.target.files[i]], i + 'partner' + num + "---" + [event.target.files[i].name]);
				fs.push(new_file)
				setVideoPreview(URL.createObjectURL(event.target.files[0]))

			}

		}

		setSelectedFiles(selectedFiles.concat(fs))


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


	
	return (
		<HomeDataContextProvider>
			<div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">

				<div class="modal-overlay"></div>

				<div class="fixed inset-0 z-10 overflow-y-auto">

					<div class="modal-frame">

						<div id="myModal" class="modal modal--3xl">

							<div class="modal__header">
								<h2 class="text-leading">
									Quick teaser tour creation
								</h2>
								<button class="button button--circle button--clear justify-self-end" type="button"
									onClick={handleClose}>
									<AiOutlineClose />
								</button>
							</div>

							<div class="modal__body">


								<div class="form__group">
									<div class="bg-black/[3%] rounded-xl p-4 flex flex-col gap-2">
										<label class="form__label"> </label>
										<div class="flex items-center gap-x-3">

										</div>

										<input className="form__input" type="text" required
											name="name" placeholder="Tour title in english" value={tourTitle}
											onChange={(e) => setTourTitle(e.target.value)}></input>

										<div>

											<label class="button button--secondary button--small">
												<span>Upload background tour image</span>
												<input type={"file"} name="file" onChange={onFileChange}
													class="sr-only" />
											</label>
										</div>

										<div>
											{fileData}
										</div>

										{imagePreview && <img className="image__preview" src={imagePreview} alt={"image-"} />}

										<label class="form__label">Points</label>
										<div class="flex flex-row items-center gap-4">
											<input className="form__input" type="text" required
												name="name" placeholder="Poi title in english" value={title}
												onChange={(e) => setTitle(e.target.value)}></input>
											<input className="form__input" type="text" required
												name="name" placeholder="Longitude" value={longitude}
												onChange={(e) => setLongitude(e.target.value)}></input>
											<input className="form__input" type="text" required
												name="name" placeholder="Latitude" value={latitude}
												onChange={(e) => setLatitude(e.target.value)}></input>

											<div className="form__group">

												<label
													class="button button--secondary button--small">
													<span>Upload image</span>
													<input type={"file"}
														onChange={selectFiles}
														class="sr-only" />
												</label>

											</div>

											<div className="form__group">

												<label
													class="button button--secondary button--small">
													<span>Upload video</span>
													<input type={"file"} multiple
														onChange={selectVideo}
														class="sr-only" />
												</label>

											</div>
											
											<button className="button button--primary min-w-[4rem]" onClick={(e) => handleAddTour()}
											>+</button>
										</div>

										<div >
												<br />
												{imagePreviews.length>0 && <img className="image__preview" src={imagePreviews} alt={"image-"} />}
												{videoPreview && <video className="image__preview" controls src={videoPreview}
													alt={"video-"} />}
											</div>

										{tours.length != 0 && <div class="">
											<table className="table-fix borderd">
												<thead>

													<tr>
														<th>Title
														</th>
														<th>Longitude
														</th>
														<th>Latitude
														</th>

													</tr>
												</thead>

												<tbody
												>	{tours.map((tour) => (
													<tr  >

														<td>{tour.title}</td>
														<td>{tour.longitude}</td>
														<td>{tour.latitude}</td>

													</tr>
												))}
												</tbody>
											</table>
										</div>}
									</div>
								</div>

								<div className="paragraph-box2 grid dgrid-row place-items-center"
									style={{ color: "red", fontSize: "0.8em", marginBottom: "30px" }}
									hidden={!errMessage}>
									{errMessage}
								</div>
										

								{tours.length != 0 && <div className="button-p grid dgrid-row place-items-center">
								{ loading && <div ><img className="mx-8 my-8 h-20" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"></img></div>}
									
									<button className="button button--primary min-w-[8rem]" onClick={(e) => handleSubmitNew()}
									>Add</button>
								</div>
								}

							</div>
						</div>
					</div>
				</div>


			</div>
		</HomeDataContextProvider>
	);


};
export default TeaserTour;