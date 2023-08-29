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
import Tour from "./Tour";
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


const HomeData = forwardRef((props) => {

	const { homeDataState, dispatch } = useContext(HomeDataContext);
	const [users, setUsers] = useState([]);
	const [tours, setTours] = useState(props.data);
	const [page, setPage] = useState(0);
	const [role, setRole] = useState(false);
	const [admin, setAdmin] = useState(false);
	const [adminOnly, setAdminOnly] = useState(false);
	const [view, setView] = useState(false);
	const [search, setSearch] = useState("");
	const [selectedTour, setSelectedTour] = useState(null);


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


	const handleSearch = async (e) => {
		await homeDataService.search(dispatch, search);

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


	const viewTour = async (e, tour) => {


		setSelectedTour(tour)
		setView(true)


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

			{view && <div>
				<Tour
					tour = {selectedTour}
					setView = {setView} />
			</div>}


			{!view && <div onScroll={onScroll} ref={ref} className="container pt-20 lg:pt-40 pb-12">

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


							{adminOnly &&
								<div>
									<button className="button button--clear button--small" type="button"
										onClick={updatedTours}>
										Updated tours
									</button>
								</div>
							}

							{adminOnly &&
								<div>
									<button className="button button--clear button--small" type="button"
										onClick={teaserTour}>
										Teaser tour
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
							style={{ backgroundImage: `url(${("assets/img/logo.svg")})`, }}>
						</div>
						<h1 className=" text-heading4 text-center">
							Tours overview
						</h1>
					</div>



				</div>
				<div>
					<div class="flex flex-row justify-end  gap-2 mb-12 ">
						<input

							className={"form__input"}
							placeholder="Insert tours name"
							aria-describedby="basic-addon1"
							id="name"
							type="text"
							style={{ width: "30%" }}

							onChange={(e) => setSearch(e.target.value)}
							value={search}
						/>

						<button

							onClick={(e) => {
								handleSearch(e)
							}}
							className="button button--primary"
							id="sendMessageButton"
							type="button"
						>
							Search
						</button>
					</div>
				</div>
				<div className="p-2 md:p-4 bg-black/[3%] rounded-2xl mb-12"  >
					<div className="py-3 px-2 pb-4 md:pb-6 flex flex-row items-center justify-between gap-4">
						<h4 className="text-heading6">

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


					<div className="table-frame" style={{ marginBottom: "30px" }} >
						<table ref={ref} id="my-table" style={{ width: "100%", tableLayout: "fixed" }} >
							<caption><div className="py-3 px-2 pb-4 md:pb-6 flex flex-row items-center justify-between gap-4">
								<h4 className="text-heading6">
									Tours
								</h4>

							</div></caption>
							<thead>

								<tr>
									

								</tr>
							</thead>

							<tbody>
								{homeDataState.toursWithPoints.toursWithPoints.map((tour) => (
									<div>
										<tr class="text-sm transition-all hover:bg-gray-100">
											<td style={{ width: "100%", overflow: "hidden" }} id={tour.tourId} >{tour.title.english}</td>

											<td>
												<div className="flex flex-row items-center gap-2 justify-end">

													<button className="button button--secondary button--small"
														onClick={(e) => viewTour(e, tour)}>View tour
													</button>

												</div>
											</td>
										</tr>
									</div>

								))
								}
							</tbody>
						</table>
					</div>
				</div>


			</div>}

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