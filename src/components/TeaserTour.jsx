import React, { useContext, useEffect, useImperativeHandle, forwardRef, useState } from "react";
import { HomeDataContext } from "../contexts/HomeDataContext";
import { homeDataService } from "../services/HomeDataService";
import HomeDataContextProvider from "../contexts/HomeDataContext";
import { YMaps, Map } from "react-yandex-maps";
import { authHeader } from "../helpers/auth-header";
import Axios from "axios";
import { AiOutlineClose } from 'react-icons/ai';


const TeaserTour = () => {

	const { homeDataState, dispatch } = useContext(HomeDataContext);

	const [longitude, setLongitude] = useState("");
	const [latitude, setLatitude] = useState("");
	const [tours, setTours] = useState([]);
	const [title, setTitle] = useState("");
	const [tourTitle, setTourTitle] = useState("");
	const [errMessage, setErrMessage] = useState("");
	const [file, setFile] = useState(null);
	const [success, setSuccess] = useState(false);
	const [imagePreview, setImagePreview] = useState(null);

	const handleSubmitNew = async (e) => {
		var tour = {
			points: tours,
			title: tourTitle
		}
		await homeDataService.addTeaserVideo(dispatch, tour);
	};

	const handleClose = () => {
		window.location = "#/"
	};
	const handleAddTour = () => {
		var tour = {
			title: title,
			longitude: longitude,
			latitude: latitude
		}
		
		const newData = [...tours, tour];
		setTours(newData)
		setTitle("")
		setLongitude("")
		setLatitude("")
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

												<button className="button button--primary min-w-[4rem]" onClick={(e) => handleAddTour()}
												>+</button>
											</div>

											{tours.length!=0 && <div class="">
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
									{tours.length!=0 && <div className="button-p grid dgrid-row place-items-center">
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