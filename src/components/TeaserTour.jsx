import React, { useContext, useEffect, useState } from "react";
import { HomeDataContext } from "../contexts/HomeDataContext";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import TeaserTourData from "./TeaserTourData";

const url = process.env.REACT_APP_URL || "http://localhost:8080/";

function LoadingOverlay() {
    return (
        <div className="loading-overlay flex flex-col items-center justify-center">
            <div className="loading-spinner"></div>
            <div className="loading-text">Generating video - this may take up to one minute</div>
        </div>
    );
}

const TeaserTour = () => {
    const { dispatch } = useContext(HomeDataContext);

    const [teaserAdded, setTeaserAdded] = useState(false);
    const [title, setTitle] = useState("");
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [backgroundPreview, setBackgroundPreview] = useState(null);
    const [pointsOfInterest, setPointsOfInterest] = useState([]);
    const [newPOI, setNewPOI] = useState({ title: "", image: null, longitude: "", latitude: "" });
    const [poiPreview, setPOIPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const commonLanguages = ['english', 'spanish', 'french', 'german', 'italian', 'slovenian', 'serbian'];

    useEffect(() => {
        const storedTeaserAdded = localStorage.getItem('teaserAdded');
        setTeaserAdded(storedTeaserAdded ? JSON.parse(storedTeaserAdded) : false);
    }, []);

    const handleLanguageSelect = (language) => {
        setSelectedLanguages((prev) =>
            prev.includes(language) ? prev.filter((l) => l !== language) : [...prev, language]
        );
    };

    const handleBackgroundChange = (event) => {
        const file = event.target.files[0];
        setBackgroundImage(file);
        setBackgroundPreview(URL.createObjectURL(file));
    };

    const handlePOIChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setNewPOI((prev) => ({ ...prev, image: files[0] }));
            setPOIPreview(URL.createObjectURL(files[0]));
        } else {
            setNewPOI((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleAddPOI = () => {
        if (newPOI.title && newPOI.longitude && newPOI.latitude) {
            setPointsOfInterest((prev) => [...prev, { ...newPOI, id: new Date().toISOString() }]);
            setNewPOI({ title: "", image: null, longitude: "", latitude: "" });
            setPOIPreview(null);
        } else {
            alert("Please fill out all POI details.");
        }
    };

    const handleRemovePOI = (index) => {
        setPointsOfInterest((prev) => prev.filter((_, i) => i !== index));
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedPoints = Array.from(pointsOfInterest);
        const [movedItem] = reorderedPoints.splice(result.source.index, 1);
        reorderedPoints.splice(result.destination.index, 0, movedItem);
        setPointsOfInterest(reorderedPoints);
    };

    const handleSubmitNew = async (event) => {
        event.preventDefault();
        setLoading(true);
        const presignedUrlEndpoint = `${url}api/pnl/tour/teaser-tour/generate-presigned-url`;

        try {
            const backgroundType = backgroundImage.type.toLowerCase();
            const backgroundResponse = await fetch(
                `${presignedUrlEndpoint}?fileName=${backgroundImage.name}&fileType=${backgroundType}`
            );

            const backgroundData = await backgroundResponse.json();
            const backgroundPresignedUrl = backgroundData.url;

            const uploadBackground = await fetch(backgroundPresignedUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': backgroundType,
                },
                body: backgroundImage,
            });

            if (!uploadBackground.ok) {
                alert('Background image upload failed');
                return;
            }

            const updatedPOIs = [];

            for (const poi of pointsOfInterest) {
                if (poi.image) {
                    const poiType = poi.image.type.toLowerCase();
                    const poiResponse = await fetch(
                        `${presignedUrlEndpoint}?fileName=${poi.image.name}&fileType=${poiType}`
                    );
                    const poiData = await poiResponse.json();
                    const poiPresignedUrl = poiData.url;

                    const uploadPOI = await fetch(poiPresignedUrl, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': poiType,
                        },
                        body: poi.image,
                    });

                    if (!uploadPOI.ok) {
                        alert(`POI image upload failed for ${poi.title}`);
                        return;
                    }

                    updatedPOIs.push({
                        ...poi,
                        imageUrl: poiData.name,
                    });
                } else {
                    updatedPOIs.push(poi);
                }
            }

            const qrcodeResponse = await fetch(`${url}api/pnl/tour/add/teasertour`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: backgroundData.name,
                    title: title,
                    languages: selectedLanguages,
                    pointsOfInterest: updatedPOIs,
                }),
            });

            if (qrcodeResponse.ok) {
                const responseData = await qrcodeResponse.json();
                setTeaserAdded(responseData);
                localStorage.setItem('teaserAdded', JSON.stringify(responseData));
                setLoading(false);
                alert('Tour successfully added');
            } else {
                setLoading(false);
                alert('Failed to add the tour');
            }
        } catch (error) {
            console.error('Error uploading files:', error);
            alert('Error occurred while uploading.');
        }
    };

    return (
        <div className="page-container">
            {loading && <LoadingOverlay />}
            {teaserAdded && <TeaserTourData tour={teaserAdded} />}

            {!teaserAdded && (
                <form
                    onSubmit={handleSubmitNew}
                    className="min-h-screen flex flex-col items-stretch w-full overflow-hidden"
                >
                    <div className="bg-neutral-100 bg-opacity-90 backdrop-blur rounded-lg p-8">
                        <div className="grid place-items-center form__group">
                            <h1 className="text-3xl font-bold mb-4 text-black">Create Tour</h1>
                        </div>

                        <div className="mb-4">
                            <div className="section-title">
                                <div className="label-count">1</div> Enter tour name in English:
                            </div>
                            <input
                                className="form__input mt-6"
                                type="text"
                                placeholder="Tour title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <div className="section-title">
                                <div className="label-count">2</div> Select languages:
                            </div>
                            <div className="flex flex-wrap gap-2 mt-6">
                                {commonLanguages.map((language) => (
                                    <button
                                        key={language}
                                        type="button"
                                        className={`py-2 px-4 rounded-md text-m ${selectedLanguages.includes(language)
                                            ? 'bg-gray-400 text-white'
                                            : 'bg-white text-gray-800'
                                            }`}
                                        onClick={() => handleLanguageSelect(language)}
                                    >
                                        {language}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="section-title">
                                <div className="label-count">3</div> Upload tour background image:
                            </div>
                            <label className="button button--secondary button--small mt-6">
                                <span>Choose background image</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleBackgroundChange}
                                    className="sr-only"
                                />
                            </label>
                            {backgroundPreview && (
                                <img
                                    src={backgroundPreview}
                                    alt="Background Preview"
                                    className="mt-2 w-full max-w-xs rounded-md"
                                />
                            )}
                        </div>

                        <div className="mb-4">
                            <div className="p-2 md:p-4 bg-black/[3%] rounded-2xl mb-12">
                                <div className="section-title">
                                    <div className="label-count">4</div> Add Points of Interest (POI):
                                </div>
                                <div className="flex flex-wrap items-center space-x-4 p-4 bg-gray-100 rounded-md mt-6">
                                    <input
                                        type="text"
                                        name="title"
                                        className="form__input flex-1"
                                        placeholder="POI Title"
                                        value={newPOI.title}
                                        onChange={handlePOIChange}
                                    />
                                    <input
                                        type="text"
                                        name="longitude"
                                        className="form__input flex-1"
                                        placeholder="Longitude"
                                        value={newPOI.longitude}
                                        onChange={handlePOIChange}
                                    />
                                    <input
                                        type="text"
                                        name="latitude"
                                        className="form__input flex-1"
                                        placeholder="Latitude"
                                        value={newPOI.latitude}
                                        onChange={handlePOIChange}
                                    />
                                    <label className="button button--secondary button--small">
                                        <span>Choose POI Image</span>
                                        <input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            onChange={handlePOIChange}
                                            className="sr-only"
                                        />
                                    </label>
                                    <button
                                        type="button"
                                        onClick={handleAddPOI}
                                        className="button button--primary button--small mb-4"
                                    >
                                        Add POI
                                    </button>
                                </div>
                                {poiPreview && (
                                    <img
                                        src={poiPreview}
                                        alt="POI Preview"
                                        className="mt-2 w-full max-w-xs rounded-md"
                                    />
                                )}

                                <div className="mb-4">
                                    <h3 className="section-title mt-8">Existing Points of Interest:</h3>
                                    {pointsOfInterest.length > 0 ? (
                                        <DragDropContext onDragEnd={handleDragEnd}>
                                            <Droppable droppableId="points">
                                                {(provided) => (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        className="grid-menu grid-cols-1 md lg gap-2 p-5 pt-1 pb-20 overflow-y-scroll"
                                                        style={{ maxHeight: '60vh' }}
                                                    >
                                                        {pointsOfInterest.map((poi, index) => (
                                                            <Draggable key={poi.id} draggableId={poi.id} index={index}>
                                                                {(provided) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        className="grid-menu-item mb-2 item-hover"
                                                                    >
                                                                        <div className="p-4 flex justify-between items-center">
                                                                            <div>
                                                                                <h3>{poi.title}</h3>
                                                                                <small>
                                                                                    [{poi.latitude}, {poi.longitude}]
                                                                                </small>
                                                                                {poi.image && (
                                                                                    <img
                                                                                        src={URL.createObjectURL(poi.image)}
                                                                                        alt="POI"
                                                                                        className="w-full max-w-xs rounded-md mt-2"
                                                                                    />
                                                                                )}
                                                                            </div>
                                                                            <button
                                                                                className="button button--secondary button--small"
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    handleRemovePOI(index);
                                                                                }}
                                                                            >
                                                                                Remove
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
                                    ) : (
                                        <p>No points of interest added yet.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="grid place-items-center form__group">
                            <button type="submit" className="button button--primary">
                                Create Tour
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}

export default TeaserTour;
