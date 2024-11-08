import React from 'react';
import '../App.css'
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { HomeDataContext } from "../contexts/HomeDataContext";
import { homeDataService } from "../services/HomeDataService";
import { userService } from '../services/UserService';
import { deleteLocalStorage, authHeader, gettokens, getDidTokens } from "../helpers/auth-header";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { homeDataConstants } from "../constants/HomeDataConstants";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'; // Example with react-beautiful-dnd

import Axios from "axios";
import { Fragment, useState } from 'react'
import TeaserTourDataEdit from './TeaserTourDataEdit';
import AddNewPartnerForm from './AddNewPartnerForm';
import NewPartner from './NewPartner';
import EditPoi from './EditPoi';

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

function LoadingOverlay() {
	return (
		<div className="loading-overlay flex flex-col items-center justify-center">
			<div className="loading-spinner"></div>
			<div className="loading-text">Generating video - this may take up to one minute</div>
		</div>
	);
}

function TextBoxes1({ languages, tour, selectedLanguage, setSelectedLanguage, editTour, setEditTour, setEditPoi, setAddPoi, setCheckOut, tokens, setCountTokens, countTokens, checkInOptions, checkOutOptions, selectedVoice, setShowvideo }) {


	const { homeDataState, dispatch } = React.useContext(HomeDataContext);
	const [selectedProductId, setSelectedProductId] = React.useState(1);

	const saveState = (e, data) => {
		localStorage.setItem('teaserAdded', data);
		window.location.reload()
	};

	const addGpx = (e, data) => {
		dispatch({ type: homeDataConstants.ADD_GPX_MODAL_SHOW, data: data });
	};

	const updatePoi = async (e, point) => {
		await homeDataService.getPoiData(dispatch, point.id);
		setEditTour(false)
		setAddPoi(false)
		setEditPoi(true)
	};

	const update = async (e, tour) => {
		await homeDataService.getTourData(dispatch, tour.id);
		setEditTour(true)
		setAddPoi(false)
		setEditPoi(false)
	};

	const [points, setPoints] = useState(tour.points);

	const selectLanguage = (data) => {
		dispatch({ type: homeDataConstants.CHANGE_LANGUAGE, data: data });
	};

	const renderLanguageDropdown = (onChangeFunc) => (
		<select
			className="form__input_small mt-6 ml-4"
			onChange={(e) => selectLanguage(e.target.value)}
			value={homeDataState.language}
		>
			{languages.map((lang) => (
				<option key={lang} value={lang}>
					{lang.charAt(0).toUpperCase() + lang.slice(1)} {/* Capitalize each language */}
				</option>
			))}
		</select>
	);

	const addNewPartner = (e, id, bpartnerId) => {
		setEditTour(false)
		setEditPoi(false)
		setAddPoi(true)
	};

	const handleDragEnd = (result) => {
		if (!result.destination) return; // If dropped outside the list

		const items = Array.from(points);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		setPoints(items);
	};

	const saveOrder = async () => {
		try {
			var data={
				tourId: tour.id,
				points: points
			}

			console.log(data)
			await Axios.post(`${url}api/pnl/tour/pointsorder/rearrange`, { data});
			
			const storedTeaserAdded = localStorage.getItem('teaserAdded');
			if (storedTeaserAdded) {
				// Parse the stored JSON string to an object
				const teaserAddedObject = JSON.parse(storedTeaserAdded);
				
				// Update the points property
				teaserAddedObject.points = points;
				
				// Convert the updated object back to a JSON string
				const updatedTeaserAdded = JSON.stringify(teaserAddedObject);
				
				// Save the updated JSON string back to localStorage
				localStorage.setItem('teaserAdded', updatedTeaserAdded);
			}
			alert('Order saved successfully!');
		} catch (error) {
			console.error('Error saving order', error);
			alert('Failed to save order.');
		}
	};

	const getQrCode = (e, data) => {
		window.location = "#/qrcodes/" + data;
	};


    const deletePoint = async (index, id) => {
        const confirmed = window.confirm("Are you sure you want to delete this point?");
        if (confirmed) {
            const updatedPoints = [...points];
            updatedPoints.splice(index, 1);
            setPoints(updatedPoints);
			await Axios.get(`${url}api/pnl/tour/deletePoi/${tour.id}/${id}`);

			const storedTeaserAdded = localStorage.getItem('teaserAdded');
			if (storedTeaserAdded) {
				// Parse the stored JSON string to an object
				const teaserAddedObject = JSON.parse(storedTeaserAdded);
				
				// Update the points property
				teaserAddedObject.points = updatedPoints;
				
				// Convert the updated object back to a JSON string
				const updatedTeaserAdded = JSON.stringify(teaserAddedObject);
				
				// Save the updated JSON string back to localStorage
				localStorage.setItem('teaserAdded', updatedTeaserAdded);
			}
        }
    };
	return (
		<div className="grow flex flex-col items-stretch md:h-screen md:overflow-hidden">
			<div className="grow h-[50vh] md:h-full bg-neutral-100 pt-16 lg:pt-0">
				<div className="sticky z-10 top-0 p-5 bg-neutral-100 bg-opacity-90 backdrop-blur">
					<button className="button button--primary button--small mb-4 w-36" onClick={(e) => saveState(e, false)}>Go back</button>
					<div className="section-title">Tour data</div>
				</div>
				<label style={{ fontSize: 15, marginLeft: "20px" }}>Select language of the tour</label>
				{renderLanguageDropdown()}

				<table id="my-table" style={{ width: "100%", tableLayout: "fixed" }}>
					<thead></thead>
					<tbody>
						<tr><td></td></tr>
						<tr className="text-sm transition-all hover:bg-gray-100">
							<td style={{ width: "20%", overflow: "hidden" }} id={tour.id}>{(tour.title[homeDataState.language]) ? tour.title[homeDataState.language] : "No title in this language"}</td>
							<td style={{ width: "15%", overflow: "hidden" }}>{`${tour.price} ${tour.currency} including tax`}</td>
							<td style={{ width: "10%", overflow: "hidden" }}>{tour.noOfRidesAMonth}</td>
							<td>
								<div className="flex flex-row items-center gap-2 justify-end">
									<button className="button button--secondary button--small" onClick={(e) => addGpx(e, tour.id)}>Add gpx</button>
									<button className="button button--secondary button--small" onClick={(e) => getQrCode(e, tour.id)}>Get qr codes</button>
									<button className="button button--secondary button--small" onClick={(e) => update(e, tour)}>Edit general tour data</button>
								</div>
							</td>
						</tr>
					</tbody>
				</table>

				<div className="sticky z-10 top-0 p-5 bg-neutral-100 bg-opacity-90 backdrop-blur">
					<div className="section-title">Points of interest</div>
				</div>

				<div className="flex gap-4 p-5">
					<button
						className="button button--primary button--small"
						onClick={(e) => addNewPartner(e, tour.id, tour.bpartnerId)}
					>
						Add partner
					</button>
					<button
						className="button button--primary button--small"
						onClick={saveOrder}
					>
						Save order of pois
					</button>
				</div>

				<DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="points">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="grid-menu grid-cols-1 md lg gap-2 p-5 pt-1 pb-20 overflow-y-scroll"
                                style={{ maxHeight: '60vh' }}
                            >
                                {points.map((product, index) => (
                                     <Draggable key={product.id} draggableId={product.id} index={index}>
									 {(provided) => (
										 <div
											 ref={provided.innerRef}
											 {...provided.draggableProps}
											 {...provided.dragHandleProps}
											 className={`grid-menu-item mb-2 item-hover`}
											 onClick={(e) => updatePoi(e, product)}
										 >
											 <div className="p-4 flex justify-between items-center">
												 <div>
													 <h3>{product.name[homeDataState.language]? product.name[homeDataState.language]: "No data in "+homeDataState.language}</h3>
													 <small>{product.shortInfo[homeDataState.language]?product.shortInfo[homeDataState.language]: "No data in "+homeDataState.language }</small>
												 </div>
												 <button
													 className="button button--secondary button--small"
													 onClick={(e) => {
														 e.stopPropagation(); // Prevent the click event from bubbling up to the parent div
														 deletePoint(index);
													 }}
												 >
													 Delete
												 </button>
											 </div>
										 </div>
									 )}
								 </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
			</div>
		</div>
	)
}

function TeaserTourData(props) {
	// Moved state to this parent component

	const [selectedVoice, setSelectedVoice] = React.useState("");

	const languages = ["english", "slovenian", "serbian", "spanish", "german", "french", "italian"];
	const [selectedLanguage, setSelectedLanguage] = useState("english");
	const [editTour, setEditTour] = React.useState(false);
	const [editPoi, setEditPoi] = React.useState(false);
	const [addPoi, setAddPoi] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState("");
	const [countTokens, setCountTokens] = React.useState(false);
	const [tokens, setTokens] = React.useState("");
	const [selectedImage, setSelectedImage] = React.useState('imgSam');
	const [updateapi, setUpdateapi] = React.useState(false);
	const [api, setApi] = React.useState("");
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const [showvideo, setShowvideo] = useState(true)
	const [isOpen, setIsOpen] = useState(false)
	const [isLoaded, setIsLoaded] = React.useState(false); // New state to track loading

	const { homeDataState, dispatch } = React.useContext(HomeDataContext);

	return (
		<div>
			{(homeDataState.loading && !homeDataState.video) && <LoadingOverlay />}
			<div className="min-h-screen flex flex-col gap-0 items-stretch w-full overflow-hidden  lg:divide-y-0">
				<div className="grow flex flex-col md:flex-row items-stretch w-full md:overflow-hidden divide-x-0 md:divide-x divide-y md:divide-y-0">
					<TextBoxes1 languages={languages} tour={props.tour} selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} editTour={editTour} setEditTour={setEditTour} setEditPoi={setEditPoi} setAddPoi={setAddPoi} countTokens={countTokens} selectedVoice={selectedVoice} setShowvideo={setShowvideo} />
					<div className="flex flex-col  items-stretch md:w-2/5 shrink-0 md:pt-16 lg:pt-0 md:h-screen overflow-y-scroll divide-y">
						<div className="grow flex flex-col items-stretch">
							<div className="p-5 shrink-0">
								<div className="section-title">Edit data</div>
							</div>
							<div className="p-5 pt-1">
								{editTour && <TeaserTourDataEdit />}
								{addPoi && <NewPartner />}
								{editPoi && <EditPoi />}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TeaserTourData;