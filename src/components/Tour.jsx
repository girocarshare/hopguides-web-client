import React, {
	useEffect,
	useState,
	useImperativeHandle,
	forwardRef,
	useContext,
	useRef
} from "react";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	MenuItem,
	Stack,
	TextField,
	Tooltip,
} from '@mui/material';
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
import { ThemeProvider, createTheme } from '@mui/material';
import 'firebase/compat/auth';
import { AiOutlineClose } from 'react-icons/ai';
import MaterialTable from 'material-table';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { MaterialReactTable } from 'material-react-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
	Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
	Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
	Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
	Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
	ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


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
	const [move, setMove] = useState(false);

	const ref = useRef(null);
	

	const [data, setData] = useState(props.tour.points); // Assuming your data is in props.tour.points


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


	const addNewPartner = (e, id, bpartnerId) => {

		dispatch({ type: homeDataConstants.SHOW_ADD_PARTNER_MODAL, id: id, bpartnerId: bpartnerId });
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


					<div className="table-frame" style={{ marginBottom: "30px", marginLeft: "30px", marginTop: "70px", marginRight: "30px" }} >
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
										<div className="flex" style={{ justifyContent: "flex-end"}}>
    {admin &&
        <>
            <button 
                className="button button--primary button--small" 
                variant="contained"
                onClick={(e) => addNewPartner(e, props.tour.tourId, props.tour.bpartnerId)}>
                Add partner
            </button>

            <button 
                className="button button--primary button--small ml-2" 
                variant="contained"
                onClick={(e) => setMove(!move)}>
                Reorder partners
            </button>
        </>
    }
</div>
											<br/>


											<MaterialReactTable
												displayColumnDefOptions={{
													'mrt-row-actions': {
														muiTableHeadCellProps: {
															align: 'center',
														},
														size: 120,
													},
												}}
												renderRowActions={({ row, table }) => (
													<Box sx={{ display: 'flex', gap: '1rem' }}>
														<Tooltip arrow placement="left" title="Edit">
															<IconButton onClick={() => table.setEditingRow(row)}>
																<Edit />
															</IconButton>
														</Tooltip>
														<Tooltip arrow placement="right" title="Delete">
															<IconButton color="error" onClick={() => handleCloseMain(row)}>
																<Remove />
															</IconButton>
														</Tooltip>
													</Box>
												)}
												autoResetPageIndex={false}
												columns={[
													{ header: 'Name', accessorKey: 'point.name.english' },
													{
														header: 'Price',
														accessorKey: 'point.price',
														Cell: ({ cell }) => (
															<>
																{cell.getValue() === "" ? "/" : `${cell.getValue()} ${props.tour.currency} including tax`}
															</>
														),
													},
													{ header: 'Offer Name', accessorKey: 'point.offerName' },
													{ header: 'Category', accessorKey: 'point.category' },
													{ header: 'Used Coupons', accessorKey: 'monthlyUsed' },
													{
														header: 'Options',
														accessorKey: 'point',
														Cell: ({ cell }) => (
															<>
																<div className="flex flex-row items-center gap-2 justify-end">
																	{cell.getValue().offerName !== "" && <button className="button button--secondary button--small" onClick={() => visitWebsite(cell.getValue().id)}>Web</button>}
																	{cell.getValue().offerName !== "" && <button className="button button--secondary button--small" onClick={(e) => getQrCode(e, cell.getValue().id)}>Get QR</button>}
																	<button className="button button--secondary button--small" onClick={(e) => handleUpdatePartner(e, cell.getValue())}>Update</button>
																	{adminOnly && <button className="button button--secondary button--small" onClick={(e) => deletePoi(e, props.tour, cell.getValue().id)}>Delete</button>}

																</div>
															</>
														),
													},


												]}
												data={props.tour.points}
												enableRowOrdering = {!move}
												enableSorting={false}
												muiTableBodyRowDragHandleProps={({ table }) => ({
													onDragEnd: () => {
														const { draggingRow, hoveredRow } = table.getState();
														if (hoveredRow && draggingRow) {
															data.splice(
																hoveredRow.index,
																0,
																data.splice(draggingRow.index, 1)[0],
															);
															setData([...data]);
														}
													},
												})}
											/>


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