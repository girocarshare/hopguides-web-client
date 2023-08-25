import React, {
	useEffect,
	useState,
	useImperativeHandle,
	forwardRef,
	useContext,
	useRef
} from "react";
import { HomeDataContext } from "../contexts/HomeDataContext";
import HomeData from "./HomeData";
import { homeDataService } from "../services/HomeDataService";


const WelcomePageForm = forwardRef((props, ref) => {

	const { homeDataState, dispatch } = useContext(HomeDataContext);
	const [checkInOptions, setCheckInOptions] = useState(["2pm", "3pm", "4pm"]);
	const [checkOutOptions, setCheckOutOptions] = useState(["10am", "11am", "12am"]);
	const [characterList, setCharacterList] = useState(["https://hopguides.s3.eu-central-1.amazonaws.com/video-images/Klemen_Furlan_ultrarealistic_portrait_photo_extremely_handsome__68a25b9b-74fc-4d9c-a270-f9ea802a231f.png", "https://hopguides.s3.eu-central-1.amazonaws.com/video-images/Klemen_Furlan_ultrarealistic_close_up_portrait_photo_of_beautif_a106ea0f-dfe0-4d7c-b80d-504c2274826a.png", "https://hopguides.s3.eu-central-1.amazonaws.com/video-images/Klemen_Furlan_ultrarealistic_close_up_portrait_photo_of_beautif_2ba1303a-99f4-477c-a7bc-cfbce87bb16f.png", "https://hopguides.s3.eu-central-1.amazonaws.com/video-images/vodic2.png"]);
	const [checkIn, setCheckIn] = useState(checkInOptions[0]);
	const [checkOut, setCheckOut] = useState(checkOutOptions[0]);
	const [character, setCharacter] = useState(characterList[0]);
	const [loading, setLoading] = useState(false);

	const [languages, setLanguages] = useState(["Italian", "English", "German", "Spanish", "French", "Croatian"]);
	const [language, setLanguage] = useState(languages[0]);
	const [words, setWords] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [uploadedImage, setUploadedImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [selectedCharacter, setSelectedCharacter] = useState(null);

	const handleSend = async () => {

		if (!selectedCharacter || !checkIn || !checkOut || !language || !words) {
			setErrorMessage("All fields must be filled out!");
			return;
		} else {
			var data = {
				checkIn: checkIn,
				checkOut: checkOut,
				character: character,
				language: language,
				words: words
			}

			console.log(data)
			await homeDataService.getDemoVideo(dispatch, data);
		}
	};




	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 w-screen min-w-[1024px]">
			<div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>

			<div className="modal-content flex w-full h-screen bg-white p-4 rounded-none shadow-xl z-10">
				<div className="form-section w-1/3 pr-4 h-full">
					<h2 className="text-xl font-bold text-black mb-2">Try a simple welcome video for your guests</h2>

					<br />
					<div className="mb-2">
						<label className="block text-sm font-medium text-gray-700 mb-2">Choose when your guests check in</label>
						<select name="checkin" className="form__input w-full p-2 text-sm border rounded-md">
							{checkInOptions.map((checkin, idx) => (
								<option key={idx} value={checkin}>{checkin}</option>
							))}
						</select>
					</div>

					<div className="mb-2">
						<label className="block text-sm font-medium text-gray-700 mb-2">Choose when your guests check out</label>
						<select name="checkout" className="form__input w-full p-2 text-sm border rounded-md">
							{checkOutOptions.map((checkout, idx) => (
								<option key={idx} value={checkout}>{checkout}</option>
							))}
						</select>
					</div>

					<div className="mb-2">
						<label className="block text-sm font-medium text-gray-700 mb-2">Select the language for the welcome message</label>
						<select name="language" className="form__input w-full p-2 text-sm border rounded-md">
							{languages.map((language, idx) => (
								<option key={idx} value={language}>{language}</option>
							))}
						</select>
						<p className="text-xs text-red-500 mt-2">(Not available in the free version)</p>
					</div>



					<div className="mb-2">
						<label className="block text-sm font-medium text-gray-700 mb-2">Select a character to welcome your guests</label>
						<div className="grid grid-cols-4 gap-2">
							{characterList.map((src, idx) => (
								<button
									key={idx}
									onClick={() => setSelectedCharacter(src)}
									className={`border rounded-md p-1 ${selectedCharacter === src ? 'border-indigo-500' : ''} hover:border-indigo-500 transition duration-300`}
								>
									<img
										className="w-50 h-50 object-cover"
										src={src}
										alt={`Character ${src + 1}`}
										style={{ width: "200px", height: "150px", objectFit: "cover" }}  // Adjusted height to 150px
									/>
								</button>
							))}
						</div>
					</div>

					<div className="mb-2">
						<label className="block text-sm font-medium text-gray-700 mb-2">Edit Words:</label>
						<textarea
							value={words}
							onChange={(e) => setWords(e.target.value)}
							className="form__input w-full p-2 text-sm border rounded-md h-24"
							placeholder="Edit words here..."
						/>
					</div>

					{errorMessage && (
						<div className="text-sm text-red-500 mb-4">
							{errorMessage}
						</div>
					)}

					<div className="text-center mt-2">
					{ loading && <div ><img className="mx-8 my-8 h-20" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"></img></div>}
											
						<button
							onClick={handleSend}
							className="bg-indigo-600 text-sm text-white px-4 py-1 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300"
						>
							Send
						</button>
					</div>
				</div>

				{homeDataState.video == null && <div className="video-section w-2/3 pl-4 h-full">
					<iframe
						width="100%"
						height="100%"
						src="https://www.youtube.com/embed/ps95dckxwdI"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen>
					</iframe>
				</div>
				}
				{homeDataState.video && <div className="video-section w-2/3 pl-4 h-full">
					<iframe
						width="100%"
						height="100%"
						src={homeDataState.video}
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen>
					</iframe>
				</div>
				}
			</div>
		</div>
	);
});

export default WelcomePageForm
