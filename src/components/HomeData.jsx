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

			<div class="container pt-20 lg:pt-40 pb-12">

				<div class="navbar">
					<div class="navbar__content">
						<div>
							<img class="h-8 w-auto" src="assets/img/logo.svg"/>
						</div>
						<div class="hidden lg:flex flex-row items-center gap-2">


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

						</div>
					</div>
				</div>

				<div class="grid grid-cols-12 mb-12 lg:mb-16 items-start justif-start gap-8">

					<div class="col-span-12 lg:col-span-3">
						&nbsp;
					</div>
					<div class="flex flex-col items-center justify-center gap-8 col-span-12 lg:col-span-6">
						<div
							class="w-48 h-48 rounded-full bg-white border border-black/10 oveflow-hidden bg-contain bg-center bg-no-repeat"
							style={{backgroundImage: `url(${("assets/img/turizem-lj.jpg")})`,}}>
						</div>
						<h1 class=" text-heading4 text-center">
							Tourism Ljubljana
						</h1>
					</div>

					{/*Contact*/}
					<div
						class="fixed z-20 left-0 bottom-0 right-0 col-span-12 lg:col-span-3 lg:relative flex flex-col items-center justify-center bg-white/80 backdrop-blur border-t lg:border-none border-black/10 drop-shadow-[0_-2px_6px_rgba(0,0,0,0.15)] lg:drop-shadow-none">
						<div
							class="flex flex-row lg:flex-col items-center lg:items-start gap-0 lg:gap-4 p-3 lg:p-6 lg:rounded-2xl lg:border lg:border-black/
						10 lg:shadow-2xl lg:shadow-black/10 w-full">
							<div class="label label--primary -rotate-90 lg:rotate-0 -ml-7 lg:ml-0">
								Contact
							</div>
							{users.map((point) => (
								<div class="flex flex-col gap-1 lg:gap-2 w-full overflow-hidden -ml-2 lg:ml-0">
									<div class="text-sm lg:text-xl font-bold text-black">
										{point.name}
									</div>
									<div class="flex flex-col gap-1 lg:gap-2 text-xs lg:text-sm">
										<a class="link" href="mailto:'{point.email}'">{point.email}</a>
										<div>{point.number}</div>
									</div>
								</div>
							))
							}
						</div>
					</div>

				</div>

				<div class="p-2 md:p-4 bg-black/[3%] rounded-2xl mb-12">
					<div class="py-3 px-2 pb-4 md:pb-6">
						<h4 class="text-heading6">
							Tours
						</h4>
					</div>

					<div class="table-frame">

						<table>
							<thead>
							<tr>
								<th>Name</th>
								<th class="whitespace-nowrap">Price<span
									class="text-xs font-normal text-black/60 ml-1">/ incl tax</span>
								</th>
								<th class="whitespace-nowrap">Tours<span
									class="text-xs font-normal text-black/60 ml-1">/ this month</span></th>
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
									<td>{`${tour.price} ${tour.currency} including tax`}</td>
										
									<td>{tour.noOfRidesAMonth}</td>
									<td>
										<div class="flex flex-row items-center gap-2 justify-end">
											<button class="button button--secondary button--small" onClick={(event) => {
												seeTermsAndConditions(event, tour.tourId)
											}}>
												Terms
											</button>
											<button class="button button--secondary button--small"
													onClick={(e) => getHistory(e, tour.tourId)}>Get report
											</button>
                      <button class="button button--secondary button--small" onClick={(e) => getQrCodes(e, tour.tourId)} >Get qr codes</button>
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
				</div>

				<div class="p-2 md:p-4 bg-black/[3%] rounded-2xl mb-12">

					{homeDataState.toursWithPoints.toursWithPoints.map((tour, i) =>

						<div id={tour.tourId}>

							<div class="py-3 px-2 pb-4 md:pb-6 flex flex-row items-center justify-between gap-4">
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
										<th class="whitespace-nowrap">Price<span
											class="text-xs font-normal text-black/60 ml-1">/ incl tax</span>
										</th>
										<th class="whitespace-nowrap">Offer name</th>
										<th>Category</th>
										<th class="whitespace-nowrap">Coupons<span
											class="text-xs font-normal text-black/60 ml-1">/ this month</span></th>
										<th>Options</th>
									</tr>
									</thead>

									{tour.points.map((points) => (
										<tbody>
										<tr>

											<td>{points.point.name.english}</td>
											<td>
												{`${points.point.price} ${tour.currency} icluding tax`}
											</td>
											<td>
											{`${points.point.offerName} `}
											</td>

											<td>{points.point.category}</td>

											<td>{points.monthlyUsed}</td>
											<td>
												<div class="flex flex-row items-center gap-2 justify-end">
													<button class="button button--secondary button--small"
															onClick={(event) => {
																visitWebsite(event, points.point.id)
															}}>
														Web
													</button>
													<button class="button button--secondary button--small"
															onClick={(event) => {
																getQrCode(event, points.point.id)
															}}>
														Get QR
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

			</div>

			<div class="text-sm text-black/40">
				<div class="container pb-40 lg:pb-16">
					<div
						class="flex flex-col lg:flex-row items-center justify-start lg:justify-between gap-4 border-t black/10 pt-6">
						<div class="flex items-center gap-2 lg:order-last mb-2 lg:mb-0">
							<a class="button button--clear button--small" href="#" target="_blank">
								Terms
							</a>
							<a class="button button--clear button--small" href="#" target="_blank">
								Privacy
							</a>
							<a class="button button--clear button--small" target="_blank">
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

	)
		;
});

export default HomeData