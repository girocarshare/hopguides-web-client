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
import Axios from "axios";


const Chatbot = forwardRef((props, ref) => {

	const { homeDataState, dispatch } = useContext(HomeDataContext);
	const [cityList, setCityList] = useState(["Ljubljana", "Barcelona", "Paris"]);
	const [characterList, setCharacterList] = useState(["Joze Plecnik", "Character 2"]);
	const [introductionList, setIntroductionList] = useState([ "Helena Novak", "Character 3"]);
	const [city, setCity] = useState(cityList[0]);
	const [character, setCharacter] = useState(characterList[0]);
	const [introductionCharacter, setIntroductionCharacter] = useState(introductionList[0]);
	const [response, setResponse] = useState("");

	const handleSend = async () => {

		var data = {
			city: city,
			character: character,
			introductionCharacter: introductionCharacter
		}
		
	//	toggleMsgLoader();
	//data = "Where was helena novak born"
		//Axios.get(`https://hopguides-chatgpt-main-j7limbsbmq-oc.a.run.app/api/data/` + data, { validateStatus: () => true })
		Axios.get(`http://localhost:5000/api/tour/` + city + "/" + character , { validateStatus: () => true })
	.then(response => {
        setResponse(response.data.answer);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

	};

	return (

		<div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">

			<div class="modal-overlay"></div>

			<div class="fixed inset-0 z-10 overflow-y-auto">

				<div class="modal-frame">

					<div id="myModal" class="modal modal--3xl">

						<div class="modal__header">
							<h2 class="text-leading">
								Choose data
							</h2>

						</div>

						<div class="modal__body">

						<div className="form__group">
								<label class="form__label">Choose introduction character*</label>
								<select
									onChange={(e) => setCharacter(e.target.value)}
									name="category"
									class="form__input shrink max-w-4"
								>
									{characterList.map(item =>
										<option key={item}
											value={item}>{item}</option>
									)};

								</select>
							</div>


							<div className="form__group">
								<label class="form__label">Choose story teller*</label>
								<select
									onChange={(e) => setCharacter(e.target.value)}
									name="category"
									class="form__input shrink max-w-4"
								>
									{characterList.map(item =>
										<option key={item}
											value={item}>{item}</option>
									)};

								</select>
							</div>

							<br />

							<div className="form__group">
								<label class="form__label">Choose city*</label>
								<select
									onChange={(e) => setCity(e.target.value)}
									name="category"
									class="form__input shrink max-w-4"
								>
									{cityList.map(item =>
										<option key={item}
											value={item}>{item}</option>
									)};

								</select>
							</div>

							<br />
							<br />

							<div class="grid place-items-center">
								<button

									onClick={(e) => {
										handleSend(e)
									}}
									className="button button--primary"
									id="sendMessageButton"
									type="button"
								>
									Get tour
								</button>
							</div>
							<br/>



							<div className="form__group">
											<textarea
												className="form__input"
												name="Email"
												type="Text"
												editable = "false"
												placeholder="Response"
												value={response}
											></textarea>
										</div>

						</div>
					</div>
				</div>
			</div>


		</div>

	);
});

export default Chatbot
