import React, {
	useEffect,
	useState,
	useImperativeHandle,
	forwardRef,
	useContext,
	useRef
} from "react";
import {HomeDataContext} from "../contexts/HomeDataContext";
import {homeDataService} from "../services/HomeDataService";
import {homeDataConstants} from "../constants/HomeDataConstants";
import {MdOutlineModeEditOutline, MdLaunch} from 'react-icons/md';
import Axios from "axios";
import {deleteLocalStorage, authHeader} from "../helpers/auth-header";
import AddNewTourForm from "./AddNewTourForm";
import UpdateLogoModal from "./UpdateLogoModal";
import TourData from "./TourData";
import ChangeLockCodeModal from "./ChangeLockCodeModal";

var url = process.env.REACT_APP_URL || "http://localhost:8080/";


const HomeData = forwardRef((props, ref) => {

	const {homeDataState, dispatch} = useContext(HomeDataContext);
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


	const handleLogout = () => {
		deleteLocalStorage();
		window.location = "#/login";
	};
	useEffect(() => {
		/*var token = authHeader()
        if (token == "null") {
          window.location = "#/unauthorized";
        } else {

          /*Axios.get(`${url}api/users/getRole`, { headers: { Authorization: token } }, { validateStatus: () => true },
          )
            .then((res) => {
              if (res.status === 200) {
                if ("BPARTNER" == res.data) {

                  setRole(true)
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
        }*/
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


		dispatch({type: homeDataConstants.SHOW_UPDATE_LOGO_MODAL});
	};


	const editLockCode = (e) => {


		dispatch({type: homeDataConstants.SHOW_CHANGE_LOCK_CODE_MODAL});
	};


	const addNew = (e) => {

		dispatch({type: homeDataConstants.SHOW_ADD_MODAL});
	};
	const addNewPartner = (e, id, bpartnerId) => {

		console.log(bpartnerId)
		dispatch({type: homeDataConstants.SHOW_ADD_PARTNER_MODAL, id: id, bpartnerId: bpartnerId});
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


		dispatch({type: homeDataConstants.UPDATE_TOUR_DATA_MODAL_SHOW, tour});


	};

	const deleteTour = async (e, tour) => {


		await homeDataService.deleteTour(dispatch, tour.tourId);


	};

	const deletePoi = async (e, tour, poiId) => {


		await homeDataService.deletePoi(dispatch, tour.tourId, poiId);


	};

	const updatePartnerPrice = (e, point, tour) => {

		dispatch({type: homeDataConstants.UPDATE_POINT_DATA_MODAL_SHOW, point});


	};


	return (

		<div>
			<div class="container pt-40 pb-16">

				<div class="navbar">
					<div class="navbar__content">
						<div>
							<img class="h-8 w-auto" src="assets/img/logo.svg"/>
						</div>
						<div class="hidden lg:flex flex-row items-center gap-2">
							{homeDataState.showModal && <div>
								<AddNewTourForm/>
							</div>}

							{homeDataState.showEditLogoModal && <div>
								<UpdateLogoModal/>
							</div>}

							{homeDataState.showEditLockCodeModal && <div>
								<ChangeLockCodeModal/>
							</div>}

							{homeDataState.updateTourData.show && <div>
								<TourData/>
							</div>}

							{!role &&
								<div>
									<button class="button button--clear button--small" type="button"
											onClick={handleLogin}>
										Log in
									</button>
								</div>
							}

							{/*{role &&*/}
							<div>
								<button class="button button--clear button--small" type="button" onClick={handleLogout}>
									Log out
								</button>
							</div>
							{/*}*/}

							{/*{role &&*/}
							<div>
								<button class="button button--clear button--small" type="button" onClick={updateLogo}>
									Edit logo
								</button>
							</div>
							{/*}*/}

							{/*{role &&*/}
							<div>
								<button class="button button--clear button--small" type="button" onClick={editLockCode}>
									Edit lock code
								</button>
							</div>
							{/*}*/}

							{/*{adminOnly &&*/}
							<div>
								<button class="button button--clear button--small" type="button"
										onClick={handleRegister}>
									New user
								</button>
							</div>
							{/*}*/}

							{/*{adminOnly &&*/}
							<div>
								<button class="button button--clear button--small" type="button"
										onClick={allBusinessPartners}>
									Partners
								</button>
							</div>
							{/*}*/}

							{/*{adminOnly &&*/}
							<div>
								<button class="button button--clear button--small" type="button" onClick={insertdata}>
									New data
								</button>
							</div>
							{/*}*/}
						</div>
					</div>
				</div>

				<div class="title title--lg">
					<h1 class="text-heading4">
						Tourism Ljubljana
					</h1>
				</div>

				<div class="table-frame">

					<table class="table-auto">
						<thead>
						<tr>
							<th>Contact name</th>
							<th>Email</th>
							<th>Phone</th>
						</tr>
						</thead>

						{users.map((point) => (
							<tbody>
							<tr>
								<td>{point.name}</td>
								<td>
									<a class="link" href="mailto:'{point.email}'">{point.email}</a>
								</td>
								<td>{point.number}</td>
							</tr>
							</tbody>
						))
						}
					</table>

				</div>

				<div class="title title--sm">
					<h4 class="text-heading6">
						Tours
					</h4>
				</div>

				<div class="table-frame">

					<table>
						<thead>
						<tr>
							<th>Name</th>
							<th class="whitespace-nowrap">Price <span class="text-sm font-normal text-black/60 ml-2">($incl tax)</span>
							</th>
							<th>Tours this month</th>
							<th>Terms & conditions</th>
							<th>Options</th>
						</tr>
						</thead>

						{homeDataState.toursWithPoints.toursWithPoints.map((tour) => (
							<tbody>
							<tr>
								<td id={tour.tourId} onClick={(e) => {

									const element = document.getElementById(tour.tourId);
									if (element) {
										element.scrollIntoView({behavior: 'smooth'});
									}


								}}>{tour.title.english}</td>
								<td>
									<div class="form__group">
										<input class="form__input"
											   readOnly={!editTourPrice || rowIdTour != tour.tourId}
											   placeholder={editTourPrice === true ? `${tour.price}` : "Insert price"}
											   aria-describedby="basic-addon1"
											   id="name"
											   type="text"
											   onChange={(e) => setTourPrice(e.target.value)}
											   value={tourPrice === "" ? `${tour.price} ${tour.currency}` : tourPrice}
										/>
									</div>

								</td>
								<td>{tour.noOfRidesAMonth}</td>
								<td>
									<button onClick={(event) => {
										seeTermsAndConditions(event, tour.tourId)
									}}>
										<MdLaunch/>
									</button>
								</td>
								<td>
									<div class="flex flex-row items-center gap-2 justify-end">
										<button class="button button--secondary button--small"
												onClick={(e) => getHistory(e, tour.tourId)}>Get report
										</button>
										<button class="button button--secondary button--small"
												onClick={(e) => update(e, tour)}>{updateField}</button>
										<button class="button button--secondary button--small"
												onClick={(e) => deleteTour(e, tour)}>Delete
										</button>
									</div>
								</td>

							</tr>
							</tbody>
						))
						}
					</table>

				</div>

				{homeDataState.toursWithPoints.toursWithPoints.map((tour, i) =>

					<div id={tour.tourId}>

						<div class="title title--sm">
							<h4 class="text-heading6">
								POIs & Partners
							</h4>
							<div>
								{/* {admin && */}
								<button class="button button--primary button--small" variant="contained"
										onClick={(e) => addNewPartner(e, tour.tourId, tour.bpartnerId)}>
									Add partner
								</button>
								{/*}*/}
							</div>
						</div>


						<div class="table-frame">

							<table>
								<thead>

								<tr>
									<th>Name</th>
									<th class="whitespace-nowrap">Price <span
										class="text-sm font-normal text-black/60 ml-2">(incl tax)</span>
									</th>
									<th class="whitespace-nowrap">Offer name</th>
									<th>Category</th>
									<th>Coupons this month</th>
									<th>Website</th>
									<th>Options</th>
								</tr>
								</thead>

								{tour.points.map((points) => (
									<tbody>
									<tr>

										<td>{points.point.name.english}</td>
										<td>
											<div class="form__group">
												<input
													class="form__input"
													readOnly={!editPartner || rowId != points.point.id}
													placeholder={editPartner === true ? points.point.price : "Price"}
													aria-describedby="basic-addon1"
													id="name"
													type="text"
													onChange={(e) => setPartnerPrice(e.target.value)}
													value={partnerPrice === "" ? `${points.point.price} ${tour.currency}` : partnerPrice}
												/>
											</div>
										</td>
										<td>
											<div class="form__group">
												<input
													class="form__input"
													readOnly={!editPartner || rowId != points.point.id}
													placeholder={editPartner === true ? points.point.offerName : "Offer name"}
													aria-describedby="basic-addon1"
													id="name"
													type="text"
													onChange={(e) => setOfferName(e.target.value)}
													value={offerName === "" ? `${points.point.offerName} ` : offerName}
												/>
											</div>
										</td>

										<td>{points.point.category}</td>

										<td>{points.monthlyUsed}</td>
										<td>
											<button onClick={(event) => {
												visitWebsite(event, points.point.id)
											}}>
												<MdLaunch/>
											</button>
										</td>
										<td>
											<div class="flex flex-row items-center gap-2 justify-end">
												<button class="button button--secondary button--small"
														onClick={(event) => {
															getQrCode(event, points.point.id)
														}}>
													Get QR code
												</button>
												<button class="button button--secondary button--small"
														onClick={(e) => updatePartnerPrice(e, points, tour)}>
													{updatePartner}
												</button>
												<button class="button button--secondary button--small"
														onClick={(e) => deletePoi(e, tour, points.point.id)}>
													Delete
												</button>
											</div>
										</td>

									</tr>
									</tbody>
								))}
							</table>

						</div>

					</div>
				)}

			</div>

			<div class="text-sm text-black/40 border-t black/10">
				<div class="container pt-8 pb-12">
					<div
						class="flex flex-col lg:flex-row items-center justify-start lg:justify-between gap-4">
						<div class="flex items-center gap-4 lg:order-last mb-4 lg:mb-0">
							<a class="button button--clear button--tiny" href="#" target="_blank">
								Terms
							</a>
							<a class="button button--clear button--tiny" href="#" target="_blank">
								Privacy
							</a>
							<a class="button button--clear button--tiny" target="_blank">
								Contact
							</a>
						</div>
						<div>
							2023 © <span class="font-bold">Hopguides™</span> Ltd. All rights reserved.
						</div>
					</div>
				</div>
			</div>
		</div>

	);
});

export default HomeData
