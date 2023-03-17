
import React, { useContext, useEffect, useState, forwardRef, useRef } from "react";
import { homeDataService } from "../services/HomeDataService";
import { HomeDataContext } from "../contexts/HomeDataContext";
import { homeDataConstants } from "../constants/HomeDataConstants";
import TimePicker from 'react-time-picker';
import { YMaps, Map } from "react-yandex-maps";

import { AiOutlineClose } from 'react-icons/ai';
const mapState = {
	center: [44, 21],
	zoom: 8,
	controls: [],
};


var url = process.env.REACT_APP_URL || "http://localhost:3000/";
const AddNewPartnerForm = (props) => {

	const addressInput = React.createRef(null);



	const [titlePoint, setTitlePoint] = useState("");
	const [shortInfoPoint, setShortInfoPoint] = useState("");
	const [longInfoPoint, setLongInfoPoint] = useState("");
	const [pointPrice, setPointPrice] = useState("");
	const [offerName, setOfferName] = useState("");
	const [currency, setCurrency] = useState("");
	const [currencyList, setCurrencyList] = useState(["£", "€", "$"]);

	const [location, setLocation] = useState("");
	const [phone, setPhone] = useState("");
	const [ymaps, setYmaps] = useState(null);
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

	const [mondayclosed, setMondayClosed] = useState(false);
	const [tuesdayclosed, setTuesdayClosed] = useState(false);
	const [wednesdayclosed, setWednesdayClosed] = useState(false);
	const [thursdayclosed, setThursdayClosed] = useState(false);
	const [fridayclosed, setFridayClosed] = useState(false);
	const [saturdayclosed, setSaturdayClosed] = useState(false);
	const [sundayclosed, setSundayClosed] = useState(false);


	const [errMessagePartner, setErrMessagePartner] = useState("");
	const [errMessage, setErrMessage] = useState("");
	const [points, setPoints] = useState([]);

	const { homeDataState, dispatch } = useContext(HomeDataContext);


	const onYmapsLoad = (ymaps) => {
		setYmaps(ymaps)
		new ymaps.SuggestView(addressInput.current, {
			provider: {
				suggest: (request, options) => ymaps.suggest(request),
			},
		});
	};


	const handleSubmit = (e) => {
		e.preventDefault();

		if (points.length == 0) {
			setErrMessage("Please add at least one partner")
		} else {

			var tour = {
				id: homeDataState.showAddPartnerModal.id,
				points: points


			}

			homeDataService.addPartner(tour, dispatch);
		}

	};


	const handleModalClose = () => {
		dispatch({ type: homeDataConstants.HIDE_ADD_PARTNER_MODAL });
		window.location.reload()
	};

	const handleAdd = (e) => {

		if (titlePoint == "" || shortInfoPoint == "" || longInfoPoint == "" || pointPrice == "" || offerName == "" || responsiblePerson == "" || phone == "" || email == "" || webURL == "" || addressInput.current.value == "" || (!mondayclosed && (mondayFrom == "" || mondayTo == "")) || (!tuesdayclosed && (tuesdayFrom == "" || tuesdayTo == "")) || (!wednesdayclosed && (wednesdayFrom == "" || wednesdayTo == "")) || (!thursdayclosed && (thursdayFrom == "" || thursdayTo == "")) || (!fridayclosed && (fridayFrom == "" || fridayTo == "")) || (!saturdayclosed && (saturdayFrom == "" || saturdayTo == "")) || (!sundayclosed && (sundayFrom == "" || sundayTo == ""))) {

			setErrMessagePartner("Please insert mandatory fields for partner (marked with *)")
		} else {

			let street;
			let city;
			let country;
			let latitude;
			let longitude;
			let found = true;
			ymaps.geocode(addressInput.current.value, {
				results: 1,
			})
				.then(function (res) {

					if (typeof res.geoObjects.get(0) === "undefined") found = false;
					else {
						var firstGeoObject = res.geoObjects.get(0),
							coords = firstGeoObject.geometry.getCoordinates();

						console.log(firstGeoObject)
						latitude = coords[0];
						longitude = coords[1];
						country = firstGeoObject.getCountry();
						street = firstGeoObject.getThoroughfare();
						city = firstGeoObject.getLocalities().join(", ");
					}
				})
				.then((res) => {

					var point = {
						name: titlePoint,
						shortInfo: { en: shortInfoPoint },
						longInfo: { en: longInfoPoint },
						price: pointPrice,
						offerName: offerName,
						contact: { phone: phone, email: email, webURL: webURL, name: responsiblePerson },
						location: { street: street, country: country, city: city, latitude: latitude, longitude: longitude },
						workingHours: { monday: { from: mondayFrom, to: mondayTo }, tuesday: { from: tuesdayFrom, to: tuesdayTo }, wednesday: { from: wednesdayFrom, to: wednesdayTo }, thursday: { from: thursdayFrom, to: thursdayTo }, friday: { from: fridayFrom, to: fridayTo }, saturday: { from: saturdayFrom, to: saturdayTo }, sunday: { from: sundayFrom, to: sundayTo } },

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
					setMondayClosed(false)
					setTuesdayClosed(false)
					setWednesdayClosed(false)
					setThursdayClosed(false)
					setFridayClosed(false)
					setSaturdayClosed(false)
					setSundayClosed(false)
					setOfferName("")
					//setAddressInput(null)
					setWebUrl("")
					setLocation("")


				});
		}
	}



	return (


		<div  >
			{homeDataState.showAddPartnerModal.show && <div class="overlay" >
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


											<div>
												<div><div className="control-group">
													<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
														<label><b>Partner's name *</b></label>
														<div class="row" >
															<div class="form-group col-lg-10">
																<input

																	className={"form-control"}
																	placeholder="Partner's name"
																	aria-describedby="basic-addon1"
																	id="name"
																	type="text"
																	style={{ backgroundColor: 'white', outline: 'none' }}

																	onChange={(e) => setTitlePoint(e.target.value)}
																	value={titlePoint}
																/>
															</div>
														</div>
													</div>
												</div>

													<div className="control-group">
														<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
															<label><b>Short description </b></label>
															<div class="row" >
																<div class="form-group col-lg-10">
																	<textarea className="form-control" style={{ height: "100px" }} type="textarea" required name="message" placeholder="Short description" value={shortInfoPoint} onChange={(e) => setShortInfoPoint(e.target.value)}></textarea>

																</div>
															</div>
														</div>
													</div>

													<div className="control-group">
														<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
															<label><b>Long description</b></label>
															<div class="row" >
																<div class="form-group col-lg-10">
																	<textarea className="form-control" style={{ height: "200px" }} type="textarea" required name="message" placeholder="Long description" value={longInfoPoint} onChange={(e) => setLongInfoPoint(e.target.value)}></textarea>

																</div>
															</div>
														</div>
													</div>
													<div className="control-group">
														<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
															<label><b>Price</b></label>
															<div class="row" >
																<div class="form-group col-lg-10">
																	<div class="button-login">
																		<input

																			className={"form-control"}
																			placeholder="Price"
																			aria-describedby="basic-addon1"
																			id="name"
																			type="text"
																			style={{ backgroundColor: 'white', outline: 'none' }}

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
													</div>
													<div className="control-group">
														<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
															<label><b>Offer name</b></label>
															<div class="row" >
																<div class="form-group col-lg-10">
																	<input

																		className={"form-control"}
																		placeholder="Offer name"
																		aria-describedby="basic-addon1"
																		id="name"
																		type="text"
																		style={{ backgroundColor: 'white', outline: 'none' }}

																		onChange={(e) => setOfferName(e.target.value)}
																		value={offerName}
																	/>
																</div>
															</div>
														</div>
													</div>

													<div className="control-group">
														<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
															<label><b>Address *</b></label>
															<div class="row" >
																<div class="form-group col-lg-10">
																	<input className="form-control" id="suggest" ref={addressInput} placeholder="Address" />

																	<YMaps
																		query={{
																			load: "package.full",
																			apikey: "b0ea2fa3-aba0-4e44-a38e-4e890158ece2",
																			lang: "en_RU",
																		}}
																	>
																		<Map
																			style={{ display: "none" }}
																			state={mapState}
																			onLoad={onYmapsLoad}
																			instanceRef={(map) => (map = map)}
																			modules={["coordSystem.geo", "geocode", "util.bounds"]}
																		></Map>
																	</YMaps>
																</div>
															</div>
														</div>
													</div>

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

													</div>


													<br />

													<h6><b>Contact information about partner</b></h6>
													<br />
													<div className="control-group">
														<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
															<label><b>Responsible person name</b></label>
															<div class="row" >
																<div class="form-group col-lg-10">
																	<input

																		className={"form-control"}
																		placeholder="Responsible person name"
																		aria-describedby="basic-addon1"
																		id="name"
																		type="text"
																		style={{ backgroundColor: 'white', outline: 'none' }}

																		onChange={(e) => setResponsiblePerson(e.target.value)}
																		value={responsiblePerson}
																	/>
																</div>
															</div>
														</div>
													</div>
													<div className="control-group">
														<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
															<label><b>Phone</b></label>
															<div class="row" >
																<div class="form-group col-lg-10">
																	<input

																		className={"form-control"}
																		placeholder="Phone"
																		aria-describedby="basic-addon1"
																		id="name"
																		type="text"
																		style={{ backgroundColor: 'white', outline: 'none' }}

																		onChange={(e) => setPhone(e.target.value)}
																		value={phone}
																	/>
																</div>
															</div>
														</div>
													</div>

													<div className="control-group">
														<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
															<label><b>Email</b></label>
															<div class="row" >
																<div class="form-group col-lg-10">
																	<input

																		className={"form-control"}
																		placeholder="Email"
																		aria-describedby="basic-addon1"
																		id="name"
																		type="email"
																		style={{ backgroundColor: 'white', outline: 'none' }}

																		onChange={(e) => setEmail(e.target.value)}
																		value={email}
																	/>
																</div>
															</div>
														</div>
													</div>

													<div className="control-group">
														<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
															<label><b>Web page</b></label>
															<div class="row" >
																<div class="form-group col-lg-10">
																	<input

																		className={"form-control"}
																		placeholder="Web page"
																		aria-describedby="basic-addon1"
																		id="name"
																		type="text"
																		style={{ backgroundColor: 'white', outline: 'none' }}

																		onChange={(e) => setWebUrl(e.target.value)}
																		value={webURL}
																	/>
																</div>
															</div>
														</div>
													</div>




													<div className="form-group text-center">
														<button
															style={{ background: "#1977cc", marginTop: "15px", marginRight: "55px" }}

															onClick={(e) => { handleAdd(e) }}
															className="btn btn-primary btn-xl"
															id="sendMessageButton"
															type="button"
														>
															Add
														</button>
													</div>

												</div>
											</div></td>
									</table>
								</form>
								<div className="form-group text-center" style={{ color: "red", fontSize: "0.8em", marginTop: "30px", marginRight: "40px" }} hidden={!errMessagePartner}>
									{errMessagePartner}
								</div>
							</div>
						</div>

						{points.length > 0 &&
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
																	<td class="whitespace-nowrap px-6 py-4 font-medium" style={{ border: "1px solid gray" }}>{point.title}</td>
																	<td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>{point.shortInfo.english}</td>
																	<td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>{point.longInfo.english}</td>
																	<td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>{point.category}</td>
																	{point.price == "" ? <td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>/</td> : <td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>{point.price} {currency}</td>}
																	{point.offerName == "" ? <td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>/</td> : <td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>{point.offerName}</td>}
																	{point.contact.name == "" ? <td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>/</td> : <td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>{point.contact.name}</td>}
																	{point.contact.email == "" ? <td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>/</td> : <td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>{point.contact.email}</td>}
																	{point.contact.phone == "" ? <td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>/</td> : <td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>{point.contact.phone}</td>}
																	{point.contact.webURL == "" ? <td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>/</td> : <td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>{point.contact.webURL}</td>}

																	<td class="whitespace-nowrap px-6 py-4" style={{ border: "1px solid gray" }}>{`${point.location.street}  ${point.location.city} ${point.location.country} ${point.location.latitute}  ${point.location.longitude}`}</td>

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



						<div className="form-group text-center" style={{ color: "red", fontSize: "0.8em", marginTop: "30px", marginRight: "40px" }} hidden={!errMessage}>
							{errMessage}
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
			</div>}
		</div>


	);
};

export default AddNewPartnerForm;
