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
	const [checkInOptions, setCheckInOptions] = useState(["1pm", "2pm", "3pm"]);
	const [checkOutOptions, setCheckOutOptions] = useState(["10am", "11am", "12am"]);
	const [characterList, setCharacterList] = useState(["Character1", "Character2", "Character3"]);
	const [checkIn, setCheckIn] = useState(checkInOptions[0]);
	const [checkOut, setCheckOut] = useState(checkOutOptions[0]);
	const [character, setCharacter] = useState(characterList[0]);

	const handleSend = async () => {

		var data = {
			checkIn: checkIn,
			checkOut: checkOut,
			character: character
		}
		
		await homeDataService.getDemoVideo(dispatch, data);

	};

	return (

		<div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">

			<div class="modal-overlay"></div>

			<div class="fixed inset-0 z-10 overflow-y-auto">

				<div class="modal-frame">

					<div id="myModal" class="modal modal--3xl">

						<div class="modal__header">
							<h2 class="text-leading">
								Get your customized demo
							</h2>

						</div>

						<div class="modal__body">

							<div className="form__group">
								<label class="form__label">Choose character*</label>
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
								<label class="form__label">Choose check in time*</label>
								<select
									onChange={(e) => setCheckIn(e.target.value)}
									name="category"
									class="form__input shrink max-w-4"
								>
									{checkInOptions.map(item =>
										<option key={item}
											value={item}>{item}</option>
									)};

								</select>
							</div>


							<br />

							<div className="form__group">
								<label class="form__label">Choose check out time*</label>
								<select
									onChange={(e) => setCheckOut(e.target.value)}
									name="category"
									class="form__input shrink max-w-4"
								>
									{checkOutOptions.map(item =>
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
									Get video
								</button>
							</div>


						</div>
					</div>
				</div>
			</div>


		</div>

	);
});

export default WelcomePageForm
