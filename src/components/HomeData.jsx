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

		<div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">

			<div class="flex flex-row items-center gap-4 mb-20">
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
						<button class="bg-black text-white px-4 py-2 rounded-lg" type="button" onClick={handleLogin}>
							Log in
						</button>
					</div>
				}

				{/*{role &&*/}
				<div>
					<button type="button" onClick={handleLogout}>
						Log out
					</button>
				</div>
				{/*}*/}

				{/*{role &&*/}
				<div>
					<button type="button" onClick={updateLogo}>
						Edit logo
					</button>
				</div>
				{/*}*/}

				{/*{role &&*/}
				<div>
					<button type="button" onClick={editLockCode}>
						Edit lock code
					</button>
				</div>
				{/*}*/}

				{/*{adminOnly &&*/}
				<div>
					<button type="button" onClick={handleRegister}>
						Register new user
					</button>
				</div>
				{/*}*/}

				{/*{adminOnly &&*/}
				<div>
					<button type="button" onClick={allBusinessPartners}>
						All business partners
					</button>
				</div>
				{/*}*/}

				{/*{adminOnly &&*/}
				<div>
					<button type="button" onClick={insertdata}>
						Insert new data
					</button>
				</div>
				{/*}*/}
			</div>

			<div class="title title--lg">
				<h1>
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
							<td>{point.email}</td>
							<td>{point.number}</td>
						</tr>
						</tbody>
					))
					}
				</table>

			</div>

			<div class="title title--sm">
				<h4>
					Tours
				</h4>
			</div>

			<div class="table-frame">

				<table>
					<thead>
					<tr>
						<th>Tour name</th>
						<th>Price</th>
						<th>Tours this month</th>
						<th>Report</th>
						<th>Update</th>
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
								<input
									readOnly={!editTourPrice || rowIdTour != tour.tourId}
									placeholder={editTourPrice === true ? `${tour.price}` : "Insert price"}
									aria-describedby="basic-addon1"
									id="name"
									type="text"
									onChange={(e) => setTourPrice(e.target.value)}
									value={tourPrice === "" ? `${tour.price} ${tour.currency} incl tax` : tourPrice}
								/>
							</td>
							<td>{tour.noOfRidesAMonth}</td>
							<td>
								<button onClick={(e) => getHistory(e, tour.tourId)}>Get report</button>
							</td>
							<td>
								<button onClick={(e) => update(e, tour)}>{updateField}</button>
							</td>
							<td>
								<button onClick={(event) => {
									seeTermsAndConditions(event, tour.tourId)
								}}>
									<MdLaunch/>
								</button>
							</td>
							<td>
								<button onClick={(e) => deleteTour(e, tour)}>Delete</button>
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
						<h4>
							Points of interest/Partners
						</h4>
						<div>
							{/* {admin && */}
							<button variant="contained"
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
								<th>Website</th>
								<th>POI</th>
								<th>Price</th>
								<th>Offer name</th>
								<th>Category</th>
								<th>Coupons this month</th>
								<th>QR code</th>
								<th>Options</th>
							</tr>
							</thead>

							{tour.points.map((points) => (
								<tbody>
								<tr>
									<td>
										<button onClick={(event) => {
											visitWebsite(event, points.point.id)
										}}>
											<MdLaunch/>
										</button>
									</td>
									<td>{points.point.name.english}</td>

									<td>
										<input
											readOnly={!editPartner || rowId != points.point.id}
											placeholder={editPartner === true ? points.point.price : "Price"}
											aria-describedby="basic-addon1"
											id="name"
											type="text"
											onChange={(e) => setPartnerPrice(e.target.value)}
											value={partnerPrice === "" ? `${points.point.price} ${tour.currency} incl tax` : partnerPrice}
										/>
									</td>
									<td>
										<input
											readOnly={!editPartner || rowId != points.point.id}
											placeholder={editPartner === true ? points.point.offerName : "Offer name"}
											aria-describedby="basic-addon1"
											id="name"
											type="text"
											onChange={(e) => setOfferName(e.target.value)}
											value={offerName === "" ? `${points.point.offerName} ` : offerName}
										/>
									</td>

									<td>{points.point.category}</td>

									<td>{points.monthlyUsed}</td>

									<td>
										<button onClick={(event) => {
											getQrCode(event, points.point.id)
										}}>
											Get QR code
										</button>
									</td>
									<td>
										<div class="flex flex-row items-center gap-4">
											<button onClick={(e) => updatePartnerPrice(e, points, tour)}>
												{updatePartner}
											</button>
											<button onClick={(e) => deletePoi(e, tour, points.point.id)}>
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

	);
});

export default HomeData
