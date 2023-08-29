import React, {
	useEffect,
	useState,
	useImperativeHandle,
	forwardRef,
	useContext,
	useRef
} from "react";

import { Link } from 'react-router-dom';
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
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { AiOutlineClose } from 'react-icons/ai';
var url = process.env.REACT_APP_URL || "http://localhost:8080/";


const firebaseConfig = {
	apiKey: "AIzaSyCT-HKuQUQT94cSIF5Fu7zzPnWbn9ao8i0",
	authDomain: "hopguides.firebaseapp.com",
	projectId: "hopguides",
	storageBucket: "hopguides.appspot.com",
	messagingSenderId: "520191148823",
	appId: "1:520191148823:web:f1920e502d3f692840ad52"
};

firebase.initializeApp(firebaseConfig);


const Tour = forwardRef((props) => {

	const { homeDataState, dispatch } = useContext(HomeDataContext);
	const [users, setUsers] = useState([]);
	const [tours, setTours] = useState(props.data);
	const [page, setPage] = useState(0);
	const [role, setRole] = useState(false);
	const [admin, setAdmin] = useState(false);
	const [adminOnly, setAdminOnly] = useState(false);
	const [updatePartner, setUpdatePartner] = useState("Update");
	const [search, setSearch] = useState("");
	var myElementRef = React.createRef();
	const listInnerRef = useRef();


	const ref = useRef(null);
	const handleLogout = () => {
		deleteLocalStorage();
		firebase.auth().signOut().then(function () {
			// Sign-out successful.
		}).catch(function (error) {
			// An error happened.
		});

		window.location = "#/login";
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


		window.addEventListener("scroll", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
		};

	}, [dispatch]);

	const getHistory = (e, data) => {
		const getDocumentsInfoHandlerr = async () => {
			await homeDataService.getPreviousMonthsData(dispatch, data);
		};

		getDocumentsInfoHandlerr();
	};
	const handleCloseMain = () => {
		props.setView(false)
	};


	const addGpx = (e, data) => {


		dispatch({ type: homeDataConstants.ADD_GPX_MODAL_SHOW, data: data });
	};

	const handleSearch = async (e) => {
		await homeDataService.search(dispatch, search);

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

	const seeHomePage = (e) => {

		window.location = "#/";
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

	const updatedTours = () => {
		window.location.href = "#/updatedtours"
	};

	const teaserTour = () => {
		window.location.href = "#/teasertour"
	};

	const insertdata = () => {
		window.location.href = "#/insertdata"
	};


	const update = async (e, tour) => {


		await homeDataService.getTourData(dispatch, tour.tourId);
		//dispatch({ type: homeDataConstants.UPDATE_TOUR_DATA_MODAL_SHOW, tour });


	};

	const deleteTour = async (e, tour) => {


		await homeDataService.deleteTour(dispatch, tour.tourId);


	};

	const deletePoi = async (e, tour, poiId) => {


		await homeDataService.deletePoi(dispatch, tour.tourId, poiId);


	};

	const handleUpdatePartner = async (e, point) => {

		await homeDataService.getPoiData(dispatch, point.id);
		//dispatch({ type: homeDataConstants.UPDATE_POINT_DATA_MODAL_SHOW, point });


	};


	const onScroll = (e) => {
		const el = e.target.documentElement;
		var bottom = el.scrollHeight - el.scrollTop === el.clientHeight;
		console.log(el.clientHeight - (el.scrollHeight - el.scrollTop))
		if (el.clientHeight - (el.scrollHeight - el.scrollTop) > -0.7) {
			bottom = true
		}

		if (bottom) {
			props.setPage(homeDataState.toursWithPoints.page + 1)
		}


	};


	return (

		<div >

			<div className="containerModal">

				<div>


					<div className="table-frame" style={{ marginBottom: "30px", marginLeft: "30px", marginTop:"70px", marginRight: "30px" }} >
						<table ref={ref} id="my-table" style={{ width: "100%", tableLayout: "fixed" }} >
							<caption><div className="py-3 px-2 pb-4 md:pb-6 flex flex-row items-center justify-between gap-4">
								<h4 className="text-heading6">
									{props.tour.title.english}
								</h4>
								<button class="button button--circle button--clear justify-self-end"
										type="button"
										onClick={handleCloseMain}>
										<AiOutlineClose />
									</button>

							</div></caption>
							<thead>

								<tr>
									<th style={{ width: "20%" }} >Name</th>
									<th style={{ width: "15%" }} className=" whitespace-nowrap">Price<span
										className=" text-xs font-normal text-black/60 ml-1">/ incl tax</span>
									</th>
									<th style={{ width: "10%" }} className=" whitespace-nowrap">Tours booked<span
										className="text-xs font-normal text-black/60 ml-1">/ this month</span></th>
									<th>Options</th>
								</tr>
							</thead>

							<tbody>
								<tr><td>     </td></tr>
								<tr class="text-sm transition-all hover:bg-gray-100">
									<td style={{ width: "20%", overflow: "hidden" }} id={props.tour.tourId} >{props.tour.title.english}</td>
									<td style={{ width: "15%", overflow: "hidden" }}>{`${props.tour.price} ${props.tour.currency} including tax`}</td>

									<td style={{ width: "10%", overflow: "hidden" }}>{props.tour.noOfRidesAMonth}</td>
									<td>
										<div className="flex flex-row items-center gap-2 justify-end">
											<button className="button button--secondary button--small" onClick={(event) => {
												seeTermsAndConditions(event, props.tour.tourId)
											}}>
												Terms and conditions
											</button>
											<button className="button button--secondary button--small"
												onClick={(e) => getHistory(e, props.tour.tourId)}>Get report
											</button>
											{adminOnly && <button className="button button--secondary button--small"
												onClick={(e) => addGpx(e, props.tour.tourId)}>Add gpx
											</button>}
											{adminOnly && <button className="button button--secondary button--small" onClick={(e) => getQrCodes(e, props.tour.tourId)} >Get qr codes</button>}
											<button className="button button--secondary button--small"
												onClick={(e) => update(e, props.tour)}>View data</button>
											{adminOnly && <button className="button button--secondary button--small"
												onClick={(e) => deleteTour(e, props.tour)}>Delete
											</button>}
										</div>
									</td>

								</tr>


								<tr colspan="4">
									<td colspan="4">
										<div className="p-2 md:p-4 bg-black/[3%] rounded-2xl mb-12">
											<div>
												{admin &&
													<button className="button button--primary button--small" variant="contained"
														onClick={(e) => addNewPartner(e, props.tour.tourId, props.tour.bpartnerId)}>
														Add partner
													</button>
												}
											</div>
											<table style={{ width: "100%", tableLayout: "fixed" }} >

												<thead>

													<tr>
														<th style={{ width: "25%" }}>Name</th>
														<th style={{ width: "15%" }} className="whitespace-nowrap">Price<span
															className="text-xs font-normal text-black/60 ml-1">/ incl tax</span>
														</th>
														<th style={{ width: "15%" }} className="whitespace-nowrap">Offer name</th>
														<th style={{ width: "10%" }}>Category</th>
														<th style={{ width: "10%" }} className="whitespace-nowrap">Used coupons<span
															className="text-xs font-normal text-black/60 ml-1">/ this month</span></th>
														<th>Options</th>
													</tr>
												</thead>

												{props.tour.points.map((points) => (
													<tbody>
														<tr id={props.tour.tourId}>

															<td style={{ textAlign: "left", width: "25%", overflow: "hidden" }}>{points.point.name.english} </td>
															<td style={{ textAlign: "left", width: "15%", overflow: "hidden" }}>
																{points.point.price == "" ? "/" : `${points.point.price} ${props.tour.currency} including tax`}
															</td>
															<td style={{ textAlign: "left", width: "15%", overflow: "hidden" }}>
																{points.point.offerName == "" ? "/" : `${points.point.offerName} `}
															</td>

															<td style={{ textAlign: "left", width: "10%", overflow: "hidden" }}>{points.point.category}</td>

															<td style={{ textAlign: "left" }}>{points.monthlyUsed}</td>
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
																		onClick={(e) => handleUpdatePartner(e, points.point)}>
																		{updatePartner}
																	</button>
																	{adminOnly && <button className="button button--secondary button--small"
																		onClick={(e) => deletePoi(e, props.tour, points.point.id)}>
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
									</td>
								</tr>

							</tbody>



						</table>



					</div>

				</div>


			</div>


		</div>

	)
		;
});

export default Tour