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
import TeaserTourData from "./TeaserTourData";
import { deleteLocalStorage, authHeader } from "../helpers/auth-header";
import AddNewTourForm from "./AddNewTourForm";
import UpdateLogoModal from "./UpdateLogoModal";
import TourData from "./TourData";
import ChangeLockCodeModal from "./ChangeLockCodeModal";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
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


const HomeData2 = forwardRef((props) => {

	const { homeDataState, dispatch } = useContext(HomeDataContext);
	const [users, setUsers] = useState([]);
	const [teaserAdded, setTeaserAdded] = useState(false);
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
		const storedTeaserAdded = localStorage.getItem('teaserAdded');
		setTeaserAdded(storedTeaserAdded ? JSON.parse(storedTeaserAdded) : false);
	}, []);

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
		window.location.href = "#/teasertour"
	};



	const update = async (event, tour) => {
		event.preventDefault();

		var token = authHeader()

		const qrcodeResponse = await fetch(`${url}api/pnl/tour/gettourdata/` + tour.tourId, {
			method: 'GET',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},

		});

		if (qrcodeResponse.ok) {
			const responseData = await qrcodeResponse.json();

			console.log(responseData)
			setTeaserAdded(responseData);
			localStorage.setItem('teaserAdded', JSON.stringify(responseData));
		} else {
			alert('Failed to add the tour');
		}

	
};



const deleteTour = async (e, tour) => {


	await homeDataService.deleteTour(dispatch, tour.tourId);


};

const deletePoi = async (e, tour, poiId) => {

	await homeDataService.deletePoi(dispatch, tour.tourId, poiId);

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
		{teaserAdded && 
			<TeaserTourData tour={teaserAdded} />}

{!teaserAdded && 
		
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


				<div onScroll={onScroll} ref={ref} className="container pt-20 lg:pt-40 pb-12">

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

					<div className="grid grid-cols-12 mb-12 lg:mb-16 items-start justify-center gap-8">
						<div className="col-span-12 lg:col-span-3"></div>
						<div className="flex flex-col items-center justify-center gap-8 col-span-12 lg:col-span-6">
							<div
								className="w-48 h-48 rounded-full bg-white border border-black/10 overflow-hidden bg-contain bg-center bg-no-repeat"
								style={{ backgroundImage: `url(${"assets/img/logo.svg"})` }}
							></div>
							<h1 className="text-heading4 text-center">Tours Overview</h1>
						</div>
					</div>
					<div className="flex justify-end mb-12">
						<div className="flex flex-row justify-end gap-2 w-1/3">
							<input
								className="p-2 border rounded-lg shadow-sm w-full"
								placeholder="Search by tours name"
								aria-describedby="basic-addon1"
								id="name"
								type="text"
								onChange={(e) => setSearch(e.target.value)}
								value={search}
							/>
							<button
								onClick={(e) => {
									handleSearch(e);
								}}
								className="button button--primary p-2 rounded-lg shadow-sm"
								id="sendMessageButton"
								type="button"
							>
								Search
							</button>
						</div>
					</div>

					<div className="p-4 bg-gray-50 rounded-2xl mb-12 shadow-md">
						<div className="py-3 px-4 flex flex-row items-center justify-between gap-4 mb-4">
							<h4 className="text-heading6">Tour List</h4>
							{admin && (
								<button
									className="button button--primary button--small p-2 rounded-lg shadow-sm"
									variant="contained"
									type="button"
									onClick={insertdata}
								>
									New Tour
								</button>
							)}
						</div>

						<div className="space-y-4">
							{homeDataState.toursWithPoints.toursWithPoints.map((tour) => (
								<div key={tour.id} className="bg-white p-3 rounded-lg ">
									<div className="flex justify-between items-center mb-2">
										<h4 className="text-heading7">{tour.title.english}</h4>
										<td>
											<div className="flex flex-row items-center gap-2 justify-end">
										<button
											className="button button--secondary button--small"
											onClick={(e) => update(e, tour)}
										>
											View data
										</button>
										<button className="button button--secondary button--small"
													onClick={(e) => deleteTour(e, tour)}>Delete
												</button>
												</div>
												</td>
									</div>
									<table ref={ref} id="my-table" className="w-full table-fixed">
										{/* Table content can go here if needed */}
									</table>
								</div>
							))}
						</div>
					</div>


				</div>

			</div>
		}
	</div>

)
	;
});

export default HomeData2