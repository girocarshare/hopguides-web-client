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


const UpdateTours = forwardRef((props) => {

	const { homeDataState, dispatch } = useContext(HomeDataContext);
	const [users, setUsers] = useState([]);
	const [tours, setTours] = useState(props.data);
	const [role, setRole] = useState(false);
	const [admin, setAdmin] = useState(false);
	const [adminOnly, setAdminOnly] = useState(false);
	const [reorganizeData, setReorganizeData] = useState([]);

	const ref = useRef(null);
	const handleLogout = () => {
		deleteLocalStorage();
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
		var contactUser = {
			name: "Danijel Omrzel",
			email: "danijel.omrzel@visitlljubljana.si",
			number: "0038641386295"
		}
		var arr = []
		arr.push(contactUser)
		setUsers(arr)
		window.addEventListener("scroll", onScroll);
		return () => {
		  window.removeEventListener("scroll", onScroll);
		};
	}, [dispatch]);


	const getQrCode = (e, data) => {
		homeDataService.getQrCode(dispatch, data);
	};


	const approve = (e, data) => {
		homeDataService.approve(dispatch, data);
	};

	const disapprove = (e, data) => {
		homeDataService.disapprove(dispatch, data);
	};

	const visitWebsite = (e, data) => {

		window.location = "#/report/" + data;
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




	const update = async (e, tour) => {


		await homeDataService.getTourData(dispatch, tour.tourId);
		//dispatch({ type: homeDataConstants.UPDATE_TOUR_DATA_MODAL_SHOW, tour });


	};
	const seeHomePage = (e) => {

		window.location = "#/" ;
	};


	const updatePartnerPrice = async (e, point, tour) => {

		await homeDataService.getPoiData(dispatch, point.point.id);
		//dispatch({ type: homeDataConstants.UPDATE_POINT_DATA_MODAL_SHOW, point });


	};

	const onScroll = (e) => {
		const el = e.target.documentElement;
		var bottom = el.scrollHeight - el.scrollTop === el.clientHeight;
		if(el.clientHeight - (el.scrollHeight - el.scrollTop) > 0){
			bottom = true
		}

		if (bottom) { 
			props.setPage(homeDataState.toursWithPoints.page + 1)
		 }


	  };



	return (

		<div>

			<div className="container pt-20 lg:pt-40 pb-12">


				<div className="navbar">
					<div className="navbar__content">
						<div>
							<img className="h-8 w-auto" src="assets/img/logo.svg" />
						</div>
						<div className="hidden lg:flex flex-row items-center gap-2">

						{(role || adminOnly) &&
								<div>
									<button className="button button--clear button--small" type="button" onClick={seeHomePage}>
										Home page
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
						
						<h1 className=" text-heading4 text-center">
							Updated tours
						</h1>
					</div>


				</div>

				<div className="p-2 md:p-4 bg-black/[3%] rounded-2xl mb-12">
					<div className="py-3 px-2 pb-4 md:pb-6 flex flex-row items-center justify-between gap-4">
						<h4 className="text-heading6">
							Tours
						</h4>

					</div>



					{homeDataState.toursWithPoints.toursWithPoints.map((tour) => (
						<div className="table-frame" style={{ marginBottom: "30px" }}>
							<table ref={ref} id="my-table">
								<thead>
									<tr>
										<th>Name</th>
										<th>Options</th>

									</tr>
								</thead>


								<tbody>
									<tr><div className="py-3 px-2 pb-4 md:pb-6 flex flex-row items-center justify-between gap-4">
										<h4 className="text-heading6">
											{tour.title.english} tour
										</h4>

									</div></tr>
									<tr class="text-sm transition-all hover:bg-gray-100">



										<td colspan="2">
											<div className="flex flex-row items-center gap-2 justify-center ">
												<button className="button button--secondary button--small"
													onClick={(e) => update(e, tour)}>View data</button>

											</div>
										</td>

									</tr>



									<tr colspan="2">
										<td colspan="2">
											<div className="p-2 md:p-4 bg-black/[3%] rounded-2xl mb-12">

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

																		<button className="button button--secondary button--small"
																			onClick={(e) => updatePartnerPrice(e, points, tour)}>
																			View data
																		</button>

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
									<tr class="text-sm transition-all hover:bg-gray-100">
										<td colspan="2">
											<div className="flex flex-row items-center gap-2 justify-center">

												{adminOnly && <button className="button button--secondary button--small"
													onClick={(e) => approve(e, tour.tourId)}>Approve
												</button>}
												{adminOnly && <button className="button button--secondary button--small"
													onClick={(e) => disapprove(e, tour.tourId)}>Disapprove
												</button>}
											</div>
										</td>

									</tr>
								</tbody>

							</table>

						</div>

					))
					}
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

export default UpdateTours