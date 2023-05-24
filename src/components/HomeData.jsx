import React, {
	useEffect,
	useState,
	useImperativeHandle,
	forwardRef,
	useContext,
	useRef
} from "react";
import { HomeDataContext } from "../contexts/HomeDataContext";
import { homeDataService } from "../services/HomeDataService";
import { homeDataConstants } from "../constants/HomeDataConstants";
import { MdOutlineModeEditOutline, MdLaunch } from 'react-icons/md';
import Axios from "axios";
import { deleteLocalStorage, authHeader } from "../helpers/auth-header";
import AddNewTourForm from "./AddNewTourForm";
import UpdateLogoModal from "./UpdateLogoModal";
import TourData from "./TourData";
import ChangeLockCodeModal from "./ChangeLockCodeModal";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

var url = process.env.REACT_APP_URL || "http://localhost:8080/";


const HomeData = forwardRef((props) => {

	const { homeDataState, dispatch } = useContext(HomeDataContext);
	const [users, setUsers] = useState([]);
	const [tours, setTours] = useState(props.data);
	const [tourPrice, setTourPrice] = useState("");
	const [rowId, setRowId] = useState("");
	const [rowIdTour, setRowIdTour] = useState("");
	const [role, setRole] = useState(false);
	const [admin, setAdmin] = useState(false);
	const [adminOnly, setAdminOnly] = useState(false);
	const [updateField, setUpdateField] = useState("Update");
	const [updatePartner, setUpdatePartner] = useState("Update");
	const [editTourPrice, setEditTourPrice] = useState(false);
	const [editPartner, setEditPartner] = useState(false);
	const [partnerPrice, setPartnerPrice] = useState("");
	const [offerName, setOfferName] = useState("");
	var myElementRef = React.createRef();
	const [reorganize, setReorganize] = useState(false);
	const [reorganizeData, setReorganizeData] = useState([]);
	const [data, setData] = useState([
		{
			name: "Jeevan",
			age: 21,
			gender: "male"
		},
		{
			name: "Piyush",
			age: 17,
			gender: "male"
		},
		{
			name: "Arti",
			age: 22,
			gender: "female"
		}
	]);

	const ref = useRef(null);
	const handleLogout = () => {
		deleteLocalStorage();
		window.location = "#/login";
	};

	const handleDragEnd = (e) => {
		if (!e.destination) return;
		let tempData = Array.from(reorganizeData);
		let [source_data] = tempData.splice(e.source.index, 1);
		tempData.splice(e.destination.index, 0, source_data);
		setReorganizeData(tempData);
	};

	useEffect(() => {

		const element = ref.current;
		console.log(element);
		console.log(element.id);


		var token = authHeader()
		if (token == "null") {
			window.location = "#/unauthorized";
		} else {
			Axios.get(`${url}api/users/getRole`, { headers: { Authorization: token } }, { validateStatus: () => true },
			)
				.then((res) => {
					if (res.status === 200) {
						if ("BPARTNER" == res.data) {
							setRole(true)

							window.location = "#/unauthorized";
						}
						if ("PROVIDER" == res.data) {
							setRole(true)
							setAdmin(true)
						}
						if ("ADMIN" == res.data) {
							setAdminOnly(true)
							setAdmin(true)
						}
					}
				})
				.catch((err) => {
				})
		}
		setTours(homeDataState.toursWithPoints.toursWithPoints)
		var contactUser = {
			name: "Danijel Omrzel",
			email: "danijel.omrzel@visitlljubljana.si",
			number: "0038641386295"
		}
		var arr = []
		arr.push(contactUser)
		setUsers(arr)
	}, [dispatch]);

	const getHistory = (e, data) => {
		const getDocumentsInfoHandlerr = async () => {
			await homeDataService.getPreviousMonthsData(dispatch, data);
		};

		getDocumentsInfoHandlerr();
	};



	const getQrCodes = (e, data) => {

		window.location = "#/qrcodes/" + data;
	};


	const getQrCode = (e, data) => {
		homeDataService.getQrCode(dispatch, data);
	};


	const visitWebsite = (e, data) => {

		window.location = "#/report/" + data;
	};


	const seeTermsAndConditions = (e, data) => {

		window.location = "#/termsAndConditions/" + data;
	};


	const updateLogo = (e) => {


		dispatch({ type: homeDataConstants.SHOW_UPDATE_LOGO_MODAL });
	};


	const editLockCode = (e) => {


		dispatch({ type: homeDataConstants.SHOW_CHANGE_LOCK_CODE_MODAL });
	};


	const addNew = (e) => {

		dispatch({ type: homeDataConstants.SHOW_ADD_MODAL });
	};
	const addNewPartner = (e, id, bpartnerId) => {

		console.log(bpartnerId)
		dispatch({ type: homeDataConstants.SHOW_ADD_PARTNER_MODAL, id: id, bpartnerId: bpartnerId });
	};


	const onUpdatePoint = (oldData, newData) => {

		const getUpdateHandlerr = async () => {
			return await homeDataService.updatePoint(dispatch, oldData);
		};

		return getUpdateHandlerr();

	};
	const onUpdate = async (oldData, newData) => {

		const getUpdateHandlerr = async () => {
			return await homeDataService.updateTour(dispatch, oldData);
		};


		return await getUpdateHandlerr();


	};
	const handleLogin = () => {
		window.location.href = "#/login"
	};


	const handleRegister = () => {
		window.location.href = "#/register"
	};

	const allBusinessPartners = () => {
		window.location.href = "#/businesspartners"
	};

	const insertdata = () => {
		window.location.href = "#/insertdata"
	};


	const update = (e, tour) => {


		dispatch({ type: homeDataConstants.UPDATE_TOUR_DATA_MODAL_SHOW, tour });


	};

	const deleteTour = async (e, tour) => {


		await homeDataService.deleteTour(dispatch, tour.tourId);


	};

	const deletePoi = async (e, tour, poiId) => {


		await homeDataService.deletePoi(dispatch, tour.tourId, poiId);


	};

	const updatePartnerPrice = (e, point, tour) => {

		dispatch({ type: homeDataConstants.UPDATE_POINT_DATA_MODAL_SHOW, point });


	};
	function timeout(delay) {
		return new Promise(res => setTimeout(res, delay));
	}




	const reorgnizeTableRows = async (e, data) => {

		console.log(data)
		/*for(var obj of data){
			setReorganizeData(reorganizeData => [...reorganizeData, obj])
		}*/

		// setReorganizeData([...data])    
		// setState(prevState => [...prevState, obj1])
		//setReorganizeData(data)

		for (var obj of data) {
			const newData = [...reorganizeData, obj];
			setReorganizeData(newData)
		}
		
		setReorganize(!reorganize)
	};


	return (

		<div>

			{homeDataState.showModal && <div>
				<AddNewTourForm />
			</div>}

			{homeDataState.showEditLogoModal && <div>
				<UpdateLogoModal />
			</div>}

			{homeDataState.showEditLockCodeModal && <div>
				<ChangeLockCodeModal />
			</div>}

			{homeDataState.updateTourData.show && <div>
				<TourData />
			</div>}

			<div className="container pt-20 lg:pt-40 pb-12">


				<div className="navbar">
					<div className="navbar__content">
						<div>
							<img className="h-8 w-auto" src="assets/img/logo.svg" />
						</div>
						<div className="hidden lg:flex flex-row items-center gap-2">


							{role &&
								<div>
									<button className="button button--clear button--small" type="button" onClick={updateLogo}>
										Edit logo
									</button>
								</div>
							}

							{role &&
								<div>
									<button className="button button--clear button--small" type="button" onClick={editLockCode}>
										Edit lock code
									</button>
								</div>
							}

							{adminOnly &&
								<div>
									<button className="button button--clear button--small" type="button"
										onClick={handleRegister}>
										New user
									</button>
								</div>
							}

							{adminOnly &&
								<div>
									<button className="button button--clear button--small" type="button"
										onClick={allBusinessPartners}>
										Partners
									</button>
								</div>
							}


							{(!role && !adminOnly) &&
								<div>
									<button className="button button--clear button--small" type="button"
										onClick={handleLogin}>
										Log in
									</button>
								</div>
							}

							{(role || adminOnly) &&
								<div>
									<button className="button button--clear button--small" type="button" onClick={handleLogout}>
										Log out
									</button>
								</div>
							}

						</div>
					</div>
				</div>

				<div className="grid grid-cols-12 mb-12 lg:mb-16 items-start justif-start gap-8">

					<div className="col-span-12 lg:col-span-3">
						&nbsp;
					</div>
					<div className="flex flex-col items-center justify-center gap-8 col-span-12 lg:col-span-6">
						<div
							className="w-48 h-48 rounded-full bg-white border border-black/10 oveflow-hidden bg-contain bg-center bg-no-repeat"
							style={{ backgroundImage: `url(${("assets/img/turizem-lj.jpg")})`, }}>
						</div>
						<h1 className=" text-heading4 text-center">
							Tourism Ljubljana
						</h1>
					</div>

					{/*Contact*/}
					<div
						className="fixed z-20 left-0 bottom-0 right-0 col-span-12 lg:col-span-3 lg:relative flex flex-col items-center justify-center bg-white/80 backdrop-blur border-t lg:border-none border-black/10 drop-shadow-[0_-2px_6px_rgba(0,0,0,0.15)] lg:drop-shadow-none">
						<div
							className="flex flex-row lg:flex-col items-center lg:items-start gap-0 lg:gap-4 p-3 lg:p-6 lg:rounded-2xl lg:border lg:border-black/
						10 lg:shadow-2xl lg:shadow-black/10 w-full">
							<div className="label label--primary -rotate-90 lg:rotate-0 -ml-7 lg:ml-0">
								Contact
							</div>
							{users.map((point) => (
								<div className="flex flex-col gap-1 lg:gap-2 w-full overflow-hidden -ml-2 lg:ml-0">
									<div className="text-sm lg:text-xl font-bold text-black">
										{point.name}
									</div>
									<div className="flex flex-col gap-1 lg:gap-2 text-xs lg:text-sm">
										<a className="link" href="mailto:'{point.email}'">{point.email}</a>
										<div>{point.number}</div>
									</div>
								</div>
							))
							}
						</div>
					</div>

				</div>

				<div className="p-2 md:p-4 bg-black/[3%] rounded-2xl mb-12">
					<div className="py-3 px-2 pb-4 md:pb-6 flex flex-row items-center justify-between gap-4">
						<h4 className="text-heading6">
							Tours
						</h4>
						<div>


							{admin &&
								<div>
									<button className="button button--primary button--small" variant="contained" type="button" onClick={insertdata}>
										New tour
									</button>
								</div>
							}
						</div>
					</div>

					<div className="table-frame">


						<table ref={ref} id="my-table">
							<thead>
								<tr>
									<th>Name</th>
									<th className="whitespace-nowrap">Price<span
										className="text-xs font-normal text-black/60 ml-1">/ incl tax</span>
									</th>
									<th className="whitespace-nowrap">Tours booked<span
										className="text-xs font-normal text-black/60 ml-1">/ this month</span></th>
									<th>Options</th>
								</tr>
							</thead>

							{homeDataState.toursWithPoints.toursWithPoints.map((tour) => (
								<tbody>
									<tr class="text-sm transition-all hover:bg-gray-100">
										<td id={tour.tourId} onClick={(e) => {

											const element = document.getElementById(tour.tourId);
											if (element) {
												element.scrollIntoView({ behavior: 'smooth' });
											}


										}}>{tour.title.english}</td>
										<td>{`${tour.price} ${tour.currency} including tax`}</td>

										<td>{tour.noOfRidesAMonth}</td>
										<td>
											<div className="flex flex-row items-center gap-2 justify-end">
												<button className="button button--secondary button--small" onClick={(event) => {
													seeTermsAndConditions(event, tour.tourId)
												}}>
													Terms and conditions
												</button>
												<button className="button button--secondary button--small"
													onClick={(e) => getHistory(e, tour.tourId)}>Get report
												</button>
												{adminOnly && <button className="button button--secondary button--small" onClick={(e) => getQrCodes(e, tour.tourId)} >Get qr codes</button>}
												<button className="button button--secondary button--small"
													onClick={(e) => update(e, tour)}>{updateField}</button>
												{adminOnly && <button className="button button--secondary button--small"
													onClick={(e) => deleteTour(e, tour)}>Delete
												</button>}
											</div>
										</td>

									</tr>
								</tbody>
							))
							}
						</table>

					</div>
				</div>

				<div className="p-2 md:p-4 bg-black/[3%] rounded-2xl mb-12">

					{!reorganize && <div>{homeDataState.toursWithPoints.toursWithPoints.map((tour, i) =>

						<div >

							<div className="py-3 px-2 pb-4 md:pb-6 flex flex-row items-center justify-between gap-4">
								<h4 className="text-heading6">
									POIs & Partners for {tour.title.english} tour
								</h4>
								<div>
									{admin &&
										<button className="button button--primary button--small" variant="contained"
											onClick={(e) => addNewPartner(e, tour.tourId, tour.bpartnerId)}>
											Add partner
										</button>
									}
								</div>{/*<div>
									{admin &&
										<button className="button button--primary button--small" variant="contained"
											onClick={(e) => reorgnizeTableRows(e, tour.points)}>
											Change the order
										</button>
									}


								</div>*/}
							</div>


							<div className="table-frame">

								<table >
									<thead>

										<tr>
											<th>Name</th>
											<th className="whitespace-nowrap">Price<span
												className="text-xs font-normal text-black/60 ml-1">/ incl tax</span>
											</th>
											<th className="whitespace-nowrap">Offer name</th>
											<th>Category</th>
											<th className="whitespace-nowrap">Used coupons<span
												className="text-xs font-normal text-black/60 ml-1">/ this month</span></th>
											<th>Options</th>
										</tr>
									</thead>

									{tour.points.map((points) => (
										<tbody>
											<tr id={tour.tourId}>

												<td>{points.point.name.english}</td>
												<td>
													{points.point.price == "" ? "/" : `${points.point.price} ${tour.currency} including tax`}
												</td>
												<td>
													{points.point.offerName == "" ? "/" : `${points.point.offerName} `}
												</td>

												<td>{points.point.category}</td>

												<td>{points.monthlyUsed}</td>
												<td>
													<div className="flex flex-row items-center gap-2 justify-end">
														{points.point.offerName != "" && <button className="button button--secondary button--small"
															onClick={(event) => {
																visitWebsite(event, points.point.id)
															}}>
															Web
														</button>}
														{points.point.offerName != "" && <button className="button button--secondary button--small"
															onClick={(event) => {
																getQrCode(event, points.point.id)
															}}>
															Get QR
														</button>}
														<button className="button button--secondary button--small"
															onClick={(e) => updatePartnerPrice(e, points, tour)}>
															{updatePartner}
														</button>
														{adminOnly && <button className="button button--secondary button--small"
															onClick={(e) => deletePoi(e, tour, points.point.id)}>
															Delete
														</button>}
													</div>
												</td>

											</tr>
										</tbody>
									))}
								</table>

							</div>

							<br /> <br />
						</div>
					)}
					</div>}

					{reorganize && homeDataState.reorganizeData.length != 0 && <div>
						{homeDataState.reorganizeData.map((tour, i) =>

							<div >

								<div className="py-3 px-2 pb-4 md:pb-6 flex flex-row items-center justify-between gap-4">
									<h4 className="text-heading6">
										POIs & Partners for {tour.title.english} tour
									</h4>
									<div>
										{admin &&
											<button className="button button--primary button--small" variant="contained"
												onClick={(e) => addNewPartner(e, tour.tourId, tour.bpartnerId)}>
												Add partner
											</button>
										}
									</div><div>

										{admin &&
											<button className="button button--primary button--small" variant="contained"
												onClick={(e) => reorgnizeTableRows(e, tour.points)}>
												Save
											</button>
										}
									</div>
								</div>


								<div className="table-frame">


									<DragDropContext onDragEnd={handleDragEnd}>
										<table className="table borderd">
											<thead>

												<tr>
													<th>Name</th>
													<th className="whitespace-nowrap">Price<span
														className="text-xs font-normal text-black/60 ml-1">/ incl tax</span>
													</th>
													<th className="whitespace-nowrap">Offer name</th>
													<th>Category</th>
													<th className="whitespace-nowrap">Used coupons<span
														className="text-xs font-normal text-black/60 ml-1">/ this month</span></th>
													<th>Options</th>
												</tr>
											</thead>
											<Droppable droppableId="droppable-1">
												{(provider) => (
													<tbody
														className="text-capitalize"
														ref={provider.innerRef}
														{...provider.droppableProps}
													>
														{tour.points.map((points, index) => (
															<Draggable
																key={points.point.id}
																draggableId={points.point.id}
																index={index}
															>
																{(provider) => (

																	<tr {...provider.draggableProps} ref={provider.innerRef} id={tour.tourId}>
																		{reorganize && <td {...provider.dragHandleProps}>=</td>}
																		<td > {points.point.name.english}</td>
																		<td>
																			{points.point.price == "" ? "/" : `${points.point.price} ${tour.currency} including tax`}
																		</td>
																		<td>
																			{points.point.offerName == "" ? "/" : `${points.point.offerName} `}
																		</td>

																		<td>{points.point.category}</td>

																		<td>{points.monthlyUsed}</td>
																		<td>
																			<div className="flex flex-row items-center gap-2 justify-end">
																				{points.point.offerName != "" && <button className="button button--secondary button--small"
																					onClick={(event) => {
																						visitWebsite(event, points.point.id)
																					}}>
																					Web
																				</button>}
																				{points.point.offerName != "" && <button className="button button--secondary button--small"
																					onClick={(event) => {
																						getQrCode(event, points.point.id)
																					}}>
																					Get QR
																				</button>}
																				<button className="button button--secondary button--small"
																					onClick={(e) => updatePartnerPrice(e, points, tour)}>
																					{updatePartner}
																				</button>
																				{adminOnly && <button className="button button--secondary button--small"
																					onClick={(e) => deletePoi(e, tour, points.point.id)}>
																					Delete
																				</button>}
																			</div>
																		</td>

																	</tr>
																)}
															</Draggable>
														))}
														{provider.placeholder}
													</tbody>
												)}
											</Droppable>
										</table>
									</DragDropContext>

								</div>

								<br /> <br />
							</div>
						)}
					</div>}
				</div>

			</div>

			<div className="text-sm text-black/40">
				<div className="container pb-40 lg:pb-16">
					<div
						className="flex flex-col lg:flex-row items-center justify-start lg:justify-between gap-4 border-t black/10 pt-6">
						<div className="flex items-center gap-2 lg:order-last mb-2 lg:mb-0">
							<a className="button button--clear button--small" href="#" target="_blank">
								Terms
							</a>
							<a className="button button--clear button--small" href="#" target="_blank">
								Privacy
							</a>
							<a className="button button--clear button--small" target="_blank">
								Contact
							</a>
						</div>
						<div>
							2023 © <span className="font-bold">Hopguides™</span> Ltd. All rights reserved.
						</div>
					</div>
				</div>
			</div>
		</div>

	)
		;
});

export default HomeData