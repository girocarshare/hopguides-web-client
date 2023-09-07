import React from 'react';
import '../App.css'
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { HomeDataContext } from "../contexts/HomeDataContext";
import HomeData from "./HomeData";
import { homeDataService } from "../services/HomeDataService";

import { deleteLocalStorage, authHeader, gettokens } from "../helpers/auth-header";

function LoadingOverlay() {
    return (
        <div className="loading-overlay flex flex-col items-center justify-center">
            <div className="loading-spinner"></div>
            <div className="loading-text">Generating video - this may take up to one minute</div>
        </div>
    );
}

function TextBoxes({ selectedImage }) {

	const [checkInOptions, setCheckInOptions] = React.useState(["2pm", "3pm", "4pm"]);
	const [checkOutOptions, setCheckOutOptions] = React.useState(["10am", "11am", "12am"]);
	const [checkIn, setCheckIn] = React.useState(checkInOptions[0]);
	const [checkOut, setCheckOut] = React.useState(checkOutOptions[0]);

	const [countTokens, setCountTokens] = React.useState(false);
	const [tokens, setTokens] = React.useState("");
	const { homeDataState, dispatch } = React.useContext(HomeDataContext);
	const descriptions = {
		1: `Hello and welcome to [Property Name]! We're genuinely excited to have you here. Let's quickly touch on a few essentials to make your arrival seamless. Once you're here, our reception desk is where you'll start. They'll guide you through the check-in process. You'll be given access to your room, either through a key card or a digital method. Please remember that check-in starts from ${checkIn}, and please check out by ${checkOut}. Of course, we're always here to help, so if you have any questions or need flexibility, don't hesitate to ask. Welcome to [Property Name], and we hope you have a memorable stay. `,
		2: `Safety first, right? At [Property Name], we genuinely believe that. I want to guide you through some key safety features. Our property has clearly marked emergency exits on every floor. Do take a moment to check the evacuation plan in your room. And for your valuables, each room has a secure safe. It's straightforward to use, but we're just a call away if you need help. And just so you know, we've got a 24/7 security system in place, ensuring your peace of mind. Your comfort and security are our top priorities. `,
		3: `Now, let's talk about the fun stuff - our amenities! Right here at [Property Name], we've created spaces for relaxation, activity, and indulgence. Imagine taking a dip in our refreshing pool or keeping up with your fitness goals in our modern gym. And for those moments when you just want to unwind and treat yourself, our spa offers a range of therapies. There's so much to experience and enjoy here. So, go ahead, explore, and make the most of your stay. `,
		4: `Hello again! Let's familiarize you with the comfort and convenience we've packed into each room at [Property Name]. Every room is equipped with modern amenities to make your stay truly seamless. Whether it's adjusting the room's temperature for your comfort, enjoying a variety of entertainment on the television, or brewing a fresh cup of coffee in the morning, we've got you covered. And if you're unsure about how to use anything, don't hesitate. We're just a call away, always ready to assist. `,
		5: `Stepping out and exploring? [Property Name] is perfectly situated to give you a taste of the best attractions around. Whether you're in the mood for historical sites, shopping sprees, local dining, or just a leisurely walk in nature, we're surrounded by experiences waiting to be discovered. And if you need recommendations or directions, our team is well-versed with the local gems. Don't miss out on making memories while you're here." `,
		6: `Navigating a new place can sometimes be daunting, but at [Property Name], we aim to make it effortless for you. Whether you're looking to get to the city center, a popular tourist spot, or just need to know the best way to travel around, we've got the information. From shuttle services to public transportation tips, we're here to guide you. And if you ever find yourself in need of a taxi or rideshare, just reach out. Let's make your travels smooth and enjoyable. `,
		7: `One of the joys of travel is immersing oneself in a new culture. Here at [Property Name], we're nestled in a rich tapestry of traditions and customs. If you're unfamiliar with our local etiquette, I'm here to share a few tips. From the way we greet one another to dining customs, there are little nuances that make our culture unique. Embracing these can enrich your experience and connect you deeper with the locals. And if you ever find yourself uncertain or curious about something, please ask. We love sharing our heritage and ensuring you feel right at home. `,
		8: `Food is more than just sustenance; it's an experience, especially here at [Property Name]. Our on-site dining options are curated to tantalize your taste buds and introduce you to local flavors. Whether you're looking for a hearty breakfast, a light snack, or a gourmet dinner, our chefs are passionate about serving you the best. And for those special evenings or celebrations, we offer a diverse wine and beverage list. Every meal here is a journey, and we're excited for you to embark on it. `,
		9: `There's always something happening at [Property Name]. From live music evenings to culinary workshops, art exhibitions to local festivals, our event calendar is bustling with activities. Whether you're staying with us for business or leisure, we encourage you to partake in these experiences. It's a wonderful opportunity to mingle, learn, and create memories. For a detailed rundown of upcoming events during your stay, our front desk or concierge team will be delighted to assist. Let's make every moment count. `,
		10: `Hello again! We understand that sometimes the array of modern amenities and technology can be a tad overwhelming. Whether you're trying to connect to our high-speed Wi-Fi, access on-demand movies, or simply adjust the room lighting, we've ensured that everything is intuitive. However, if you ever find yourself scratching your head, don't worry. We're just a phone call away, ready to guide you through any process. Your comfort and convenience are paramount to us. `,
		13: `In today's world, sustainability is not just a choice; it's a responsibility. Here at [Property Name], we're deeply committed to eco-friendly practices. From energy-saving measures in our rooms, waste reduction initiatives, to supporting local and organic produce in our kitchens, we're constantly striving to reduce our carbon footprint. It's our way of giving back to the environment and ensuring a greener tomorrow. When you choose to stay with us, you're not just picking a destination; you're endorsing a sustainable future. `,
		14: `Traveling with little ones? We've got you covered! [Property Name] is proud to offer a range of activities tailored just for kids. Whether it's our dedicated play area, interactive workshops, or kid-friendly menus, we've taken every step to ensure our youngest guests have a memorable stay. And for parents, we understand the need for some 'me-time'. Our trained staff is here to engage and entertain your kids, giving you those precious moments of relaxation. Here, family time is always special. `,
		15: `Every season brings its own charm to [Property Name]. Whether you're joining us in the vibrant bloom of spring, the golden warmth of summer, the crisp embrace of fall, or the cozy blanket of winter, there's always something special in store. Our seasonal guides are curated to help you make the most of your visit, highlighting events, activities, and experiences unique to each time of year. Dive into seasonal flavors at our restaurant, partake in festivities, or simply explore the ever-changing beauty of our surroundings. Embrace the season and let it elevate your stay. `,
		16: `Every guest is unique, and at [Property Name], we believe in tailoring experiences to match. Beyond the standard offerings, we provide a range of special services designed for those seeking that extra touch of luxury and convenience. From personal concierge assistance, bespoke dining experiences, to private tours and excursions, our team is dedicated to crafting moments that'll stay with you long after you leave. All you have to do is express a wish, and we'll go above and beyond to make it come true. `,
		17: `Beneath the modern comforts and amenities of [Property Name] lies a rich tapestry of history and architectural marvel. Every brick, corridor, and archway tells a story. From [specific historical event or figure] to the inspiration behind our [specific architectural feature], there's a legacy waiting to be discovered. We invite you to not just stay, but to journey through time with us, understanding the roots that make our property more than just a destination. Feel free to inquire for guided tours or more insights.`
	};

	const characterDescriptions = {
		1: "Italian Hotel Receptionist. Isabella is a charismatic woman in her early 30s who works at a boutique hotel in Rome. She's multilingual, fluent in Italian, English, Spanish, and French. Known for her stylish attire and warm personality, she always greets guests with her dazzling smile and helpful recommendations for local attractions.",
		2: "Ahistorian from Rome, Italy, hosts guests in his renovated apartment in a historic building, offering insightful guided tours and sharing lesser-known stories about the Eternal City's fascinating past.",
		3: "German Resort Receptionist. Maria, a charming woman in her late 30s, works at a beach resort in Rio de Janeiro. Her energy is infectious, and her helpful recommendations about the city's best samba clubs and hidden culinary gems are always on point. Maria speaks Portuguese and German.",
		4: " German Hostel Receptionist. Johann is a friendly, laid-back man in his mid-20s. He works at a popular youth hostel in Berlin and is known for his quick wit and extensive knowledge about the city's underground music scene. He loves connecting with guests from around the world and often organizes group outings to local concerts.",
		5: "Welsh Bed & Breakfast Receptionist. Nia, a middle-aged woman with a cheery demeanor, works at a cozy B&B in the heart of Cardiff. Known for her infectious laughter and knack for storytelling, she can engage guests in English and Welsh, making their stay extra memorable.",
		6: "an outdoor enthusiast from Colorado, USA, offers his rustic mountain cabin, enhancing the stay with guided hiking recommendations and showcasing his love for the Rockies' beauty.",
		7: "Spanish Hotel Receptionist. Esperanza is a vibrant woman in her late 20s, working at a beach resort in Ibiza. Known for her sunny disposition and excellent customer service, she always has the best recommendations for beaches, clubs, and restaurants on the island. Esperanza is fluent in Spanish and English, and can also converse in French and Italian.",
		8: "Mexican Hostel Receptionist. Diego, a lively man in his mid-20s, runs the front desk at a popular hostel in Cancun. With his insider tips on local eateries and hidden beaches, he is loved by backpackers. He's fluent in Spanish and English.",
		9: "French Bed & Breakfast Receptionist. Sophie, a charming woman in her early 50s, works at a quaint B&B in Provence. Her warm, maternal demeanor and her delicious homemade croissants make every guest feel like they're home. She speaks French and English fluently and has a basic understanding of German and Italian.",
		10: " French Hotel Receptionist. Samuel, a friendly man in his early 40s, works at a hotel in Accra. Known for his excellent customer service and captivating stories about local folklore, Samuel converses with guests in English and French."
	};

	function roundUp(number) {
		return Math.ceil(number);
	}



	React.useEffect(() => {

		var token = authHeader()
		if (token == "null") {
			window.location = "#/unauthorized";
		}

	}, [dispatch]);


	const handleCountTokens = async () => {
		if (!selectedImage || !checkIn || !checkOut || !selectedDescription) {
			setErrorMessage("All fields must be filled out!");
			return;
		} else {
			console.log(checkIn + checkOut)
			setCountTokens(true)
			var tokens = selectedDescription.length / 100
			setTokens(roundUp(tokens))
		}

	}

	const handleClose = () => {

		setCountTokens(false)
	};


	const [language, setLanguage] = React.useState("");
	const [text, setText] = React.useState("");
	const [edit, setEdit] = React.useState(false);

	const [selectedDescription, setSelectedDescription] = React.useState("");

	const [errorMessage, setErrorMessage] = React.useState("");

	const [selectedCharacterDescription, setSelectedCharacterDescription] = React.useState(characterDescriptions[1]);

	const handleDescriptionChange = (event) => {
		const value = event.target.value;
		setSelectedDescription(descriptions[value] || '');
	};



	const editText = (event) => {

		//window.location.href = "https://checkout.stripe.com/c/pay/cs_live_b1wua73BmQZrHfi4mURyd99kJLaycoEWZsXEwuxuO8A1ZwTVjN6cEWPrUz#fidkdWxOYHwnPyd1blppbHNgWjA0SER8MWJBaHRjSDJWalB%2FY0N%2FcFJwbzZQX1RNa2x%2FUGFjfHFNdFJHRmxucTNwc2pGZ0tkbm9XQmgzXEtxPXVzV009b2x8SXFPfHx1ZHA8fXJkQnQ2XDFONTVXYkNUU3ZyXScpJ3VpbGtuQH11anZgYUxhJz8nMnZMZ09KYk1kYzxSNGBqZkhVJyknd2BjYHd3YHdKd2xibGsnPydtcXF1dj8qKnJycittanVicGxhYHYrZmpoKid4JSUl";

		setEdit(!edit)

	};
	const highlightImage = (character) => {
		const allImages = document.querySelectorAll('.character-image');
		allImages.forEach(img => img.classList.remove('highlighted'));

		const selectedImg = document.getElementById('img' + character);
		if (selectedImg) {
			selectedImg.classList.add('highlighted');
		}
	};
	const redirectToUrl = (e) => {
		const selectedValue = document.getElementById('language').value;

		setLanguage(selectedValue)
		// if (selectedValue !== "0") {
		//    window.location.href = "https://checkout.stripe.com/c/pay/cs_live_b1wua73BmQZrHfi4mURyd99kJLaycoEWZsXEwuxuO8A1ZwTVjN6cEWPrUz#fidkdWxOYHwnPyd1blppbHNgWjA0SER8MWJBaHRjSDJWalB%2FY0N%2FcFJwbzZQX1RNa2x%2FUGFjfHFNdFJHRmxucTNwc2pGZ0tkbm9XQmgzXEtxPXVzV009b2x8SXFPfHx1ZHA8fXJkQnQ2XDFONTVXYkNUU3ZyXScpJ3VpbGtuQH11anZgYUxhJz8nMnZMZ09KYk1kYzxSNGBqZkhVJyknd2BjYHd3YHdKd2xibGsnPydtcXF1dj8qKnJycittanVicGxhYHYrZmpoKid4JSUl";
		//}
	}


	const handleSend = async () => {

		var ofTokens = parseFloat(gettokens()) - parseFloat(tokens)

		var data = {
			checkIn: checkIn,
			checkOut: checkOut,
			character: selectedImage,
			//language: language,
			words: selectedDescription,
			tokens: ofTokens,
		}

		await homeDataService.getDemoVideo(dispatch, data, ofTokens);

	};




	return (
		<div className="textboxes">
			<div>
				{countTokens &&

					<div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
						<div class="modal-overlay"></div>
						<div class="fixed inset-0 z-10 overflow-y-auto">
							<div class="modal-frame">
								<div id="myModal" class="modal modal--md">
									<div class="modal__header">
										<h2 class="text-leading">
											Tokens
										</h2>
										<button class="button button--circle button--clear justify-self-end" type="button"
											onClick={handleClose}>
											<AiOutlineClose />
										</button>
									</div>

									<div class="modal__body flex flex-col items-center justify-center p-5">
										<p class="text-center text-xl font-bold mb-4">
											Number of tokens needed for generating this video is:
										</p>
										<div class="text-4xl mb-6">
											{tokens}
										</div>
										<p class="text-center text-xl font-bold mb-4">
											available tokens: {gettokens()}
										</p>

										<div class="flex space-x-4">
											<button onClick={e => handleClose(e)} class="px-4 py-2 bg-gray-300 rounded">
												Cancel
											</button>
											<button onClick={e => handleSend(e)} class="px-4 py-2 bg-blue-500 text-white rounded">
												OK
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>}
			</div>
			<div className="mb-2">
				<label className="block text-sm font-medium text-gray-700 mb-2">Choose when your guests check in</label>
				<select name="checkin" onChange={e => setCheckIn(e.target.value)} className="form__input w-full p-2 text-sm border rounded-md">
					{checkInOptions.map((checkin, idx) => (
						<option key={idx} value={checkin}>{checkin}</option>
					))}
				</select>
			</div>

			<div className="mb-2">
				<label className="block text-sm font-medium text-gray-700 mb-2">Choose when your guests check out</label>
				<select name="checkout" onChange={e => setCheckOut(e.target.value)} className="form__input w-full p-2 text-sm border rounded-md">
					{checkOutOptions.map((checkout, idx) => (
						<option key={idx} value={checkout}>{checkout}</option>
					))}
				</select>
			</div>

			<label htmlFor="useCases">Use Cases:</label>
			<select id="useCases" defaultValue="0" onChange={handleDescriptionChange}>
				<option value="0">Select a Use Case...</option>
				<option value="1">Welcome Video (Check-In and Check-Out Procedures)</option>
				<option value="2">Safety and Security</option>
				<option value="3">Amenities Tour</option>
				<option value="4">Room Features</option>
				<option value="5">Local Attractions</option>
				<option value="6">Transportation Guide</option>
				<option value="7">Cultural Etiquette</option>
				<option value="8">Dining Options</option>
				<option value="9">Event Calendar</option>
				<option value="10">How to's</option>
				<option value="13">Eco-Friendly Initiatives</option>
				<option value="14">Kids Activities</option>
				<option value="15">Seasonal Guides</option>
				<option value="16">Special Services</option>
				<option value="17">History and Architecture</option>
			</select>

			<div className="description">
				<button className="button-1" onClick={(e) => editText(e)} style={{ marginBottom: "10px" }}>Edit text</button>

				<textarea className="textarea-1" onChange={e => setSelectedDescription(e.target.value)} readOnly={!edit} value={selectedDescription}></textarea>
			</div>

			{errorMessage && (
				<div className="text-sm text-red-500 mb-4">
					{errorMessage}
				</div>
			)}

			<button className="button-1" id="generateVideo" onClick={handleCountTokens}>Generate Video</button>

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
	);
}

function SideMenu() {
	return (
		<div className="side-menu bg-black text-white w-64 min-h-screen p-4 flex flex-col">
		<ul className="flex-1 space-y-4">
			<li className="flex items-center space-x-2 py-2">
				<a href="https://hopguides-web-client-main-j7limbsbmq-oc.a.run.app/#/welcome">
					<i className="fas fa-video"></i>
					<span>Create Video</span>
				</a>
			</li>
			<li className="flex items-center space-x-2 py-2 border-t border-white">
				<a href="https://www.hopguides.com/about-us">
					<i className="fas fa-info-circle"></i>
					<span>About Us</span>
				</a>
			</li>
			<li className="flex items-center space-x-2 py-2 border-t border-white">
				<a href="https://www.hopguides.com/contact">
					<i className="fas fa-envelope"></i>
					<span>Contact</span>
				</a>
			</li>
			<li className="flex items-center space-x-2 py-2 border-t border-white">
				<a href="/">
					<i className="fas fa-envelope"></i>
					<span>Pricing</span>
				</a>
			</li>
			{/* Add more menu items here */}
		</ul>
		<div className="flex items-center space-x-2 mt-4 py-2 border-t border-white">
			<i className="fas fa-coins"></i>
			<span>Available tokens {gettokens()}</span>
		</div>
	</div>
	);
}
function PhotoGallery({ selectedImage, setSelectedImage, videoMapping }) {
	// Placeholder video mapping (this remains the same)


	return (
		<div className="photo-gallery">
			{['Sam', 'Isabella', 'Lorenzo', 'Maria', 'Johann', 'Nia', 'Esperanza', 'Diego', 'Sophie', 'Samuel'].map(name => (
				<div className="character-container" key={name}>
					<img
						id={`img${name}`}
						src={`https://hopguides.s3.eu-central-1.amazonaws.com/video-images/character_descriptions/${name.toLowerCase()}.png`}
						alt={`${name}`}
						className={`character-image ${selectedImage === `img${name}` ? 'selected' : ''}`}

						onClick={() => {
							setSelectedImage(`img${name}`);
							console.log(`Selected image: img${name}`);
						}}
					/>
				</div>
			))}
		</div>
	);
}


function WelcomePageForm() {
	// Moved state to this parent component
	const [selectedImage, setSelectedImage] = React.useState(null);

	const { homeDataState, dispatch } = React.useContext(HomeDataContext);
	const videoMapping = {
		'imgSam': 'https://hopguides.s3.eu-central-1.amazonaws.com/video-images/character_descriptions/6+Sam.mp4',
		'imgIsabella': 'https://hopguides.s3.eu-central-1.amazonaws.com/video-images/character_descriptions/1+Isabella.mp4',
		'imgLorenzo': 'https://hopguides.s3.eu-central-1.amazonaws.com/video-images/character_descriptions/2+Lorenzo.mp4',
		'imgMaria': 'https://hopguides.s3.eu-central-1.amazonaws.com/video-images/character_descriptions/3+Maria.mp4',
		'imgJohann': 'https://hopguides.s3.eu-central-1.amazonaws.com/video-images/character_descriptions/4+Johann.mp4',
		'imgNia': 'https://hopguides.s3.eu-central-1.amazonaws.com/video-images/character_descriptions/5+Nia.mp4',
		'imgEsperanza': 'https://hopguides.s3.eu-central-1.amazonaws.com/video-images/character_descriptions/7+Esperanza.mp4',
		'imgDiego': 'https://hopguides.s3.eu-central-1.amazonaws.com/video-images/character_descriptions/8+Diego.mp4',
		'imgSophie': 'https://hopguides.s3.eu-central-1.amazonaws.com/video-images/character_descriptions/9+Sophia.mp4',
		'imgSamuel': 'https://hopguides.s3.eu-central-1.amazonaws.com/video-images/character_descriptions/10+Samuel.mp4',
		// ... add other mappings here
	};

	const characterDescriptions = {
		'imgIsabella': "Italian Hotel Receptionist. Isabella is a charismatic woman in her early 30s who works at a boutique hotel in Rome. She's multilingual, fluent in Italian, English, Spanish, and French. Known for her stylish attire and warm personality, she always greets guests with her dazzling smile and helpful recommendations for local attractions.",
		'imgLorenzo': "Ahistorian from Rome, Italy, hosts guests in his renovated apartment in a historic building, offering insightful guided tours and sharing lesser-known stories about the Eternal City's fascinating past.",
		'imgMaria': "German Resort Receptionist. Maria, a charming woman in her late 30s, works at a beach resort in Rio de Janeiro. Her energy is infectious, and her helpful recommendations about the city's best samba clubs and hidden culinary gems are always on point. Maria speaks Portuguese and German.",
		'imgJohann': " German Hostel Receptionist. Johann is a friendly, laid-back man in his mid-20s. He works at a popular youth hostel in Berlin and is known for his quick wit and extensive knowledge about the city's underground music scene. He loves connecting with guests from around the world and often organizes group outings to local concerts.",
		'imgNia': "Welsh Bed & Breakfast Receptionist. Nia, a middle-aged woman with a cheery demeanor, works at a cozy B&B in the heart of Cardiff. Known for her infectious laughter and knack for storytelling, she can engage guests in English and Welsh, making their stay extra memorable.",
		'imgSam': "an outdoor enthusiast from Colorado, USA, offers his rustic mountain cabin, enhancing the stay with guided hiking recommendations and showcasing his love for the Rockies' beauty.",
		'imgEsperanza': "Spanish Hotel Receptionist. Esperanza is a vibrant woman in her late 20s, working at a beach resort in Ibiza. Known for her sunny disposition and excellent customer service, she always has the best recommendations for beaches, clubs, and restaurants on the island. Esperanza is fluent in Spanish and English, and can also converse in French and Italian.",
		'imgDiego': "Mexican Hostel Receptionist. Diego, a lively man in his mid-20s, runs the front desk at a popular hostel in Cancun. With his insider tips on local eateries and hidden beaches, he is loved by backpackers. He's fluent in Spanish and English.",
		'imgSophie': "French Bed & Breakfast Receptionist. Sophie, a charming woman in her early 50s, works at a quaint B&B in Provence. Her warm, maternal demeanor and her delicious homemade croissants make every guest feel like they're home. She speaks French and English fluently and has a basic understanding of German and Italian.",
		'imgSamuel': " French Hotel Receptionist. Samuel, a friendly man in his early 40s, works at a hotel in Accra. Known for his excellent customer service and captivating stories about local folklore, Samuel converses with guests in English and French."
	};



	return (
		<div>

			{ homeDataState.loading && <LoadingOverlay />}
			<div className="bg-black">
				<header>
					<img src="https://hopguides.s3.eu-central-1.amazonaws.com/video-images/character_descriptions/Logo+white.png" alt="Logo" className="logo w-48" />
					<h1 className="text-center text-2xl mb-2 text-white">Welcome to hopguides</h1>
				</header>

				<div className="flex-grow-container">
					{/* Assuming SideMenu has a class you can target for width adjustment */}
					<div className="side-menu w-64">
						<SideMenu />
					</div>
					<div className="video-section-container">
						{/* Top part of the video section */}
						<div className="video-section-top bg-gray-200 p-2">
							{/* Display video based on selected character */}
							{selectedImage && (
								<video width="300" height="300" controls key={videoMapping[selectedImage]}>
									<source src={videoMapping[selectedImage]} type="video/mp4" />
									Your browser does not support the video tag.
								</video>
							)}
						</div>



						{/* Bottom part of the video section */}
						<div className="video-section-bottom bg-gray-200 p-2">
							<PhotoGallery selectedImage={selectedImage} setSelectedImage={setSelectedImage} videoMapping={videoMapping} />
						</div>

						{/* Middle part of the video section */}
						<div className="video-section-middle bg-gray-300 p-4">
							<textarea className="textarea-1" value={characterDescriptions[selectedImage]} readOnly />
						</div>
					</div>

					{/* Adjusted the width from w-900 to w-full for maximum width */}
					<div className="textboxes-section w-3/5 p-4 bg-white textbox-container">
						<TextBoxes selectedImage={selectedImage} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default WelcomePageForm;