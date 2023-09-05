import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";
import { AiOutlineClose } from 'react-icons/ai';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
var url = process.env.REACT_APP_URL || "http://localhost:8080/";
//var ui = new firebaseui.auth.AuthUI(firebase.auth());


const SignupForm = () => {
	const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
	const { userState, dispatch } = useContext(UserContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [lang, setLang] = useState("");
	const [emailInserted, setEmailInserted] = useState(false)
	const [errMessage, setErrMessage] = useState("")




	const uiConfig = {
		// Popup signin flow rather than redirect flow.
		signInFlow: 'popup',
		// Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
		//signInSuccessUrl: '/#/',
		// We will display Google and Facebook as auth providers.
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.FacebookAuthProvider.PROVIDER_ID,
		],
		callbacks: {
			signInSuccessWithAuthResult: function (authResult, redirectUrl) {
				console.log(authResult.user.multiFactor.user.email)
				var user = authResult.user.multiFactor.user.email;
				if (user != null) {
					let loginRequest = {
						email: user,
						password: "12345",
						role: "PROVIDER"
					};

					userService.registerandlogin(loginRequest, dispatch);
				}
			},
		},
	};



	const handleClose = () => {
		window.location = "#/"
	};

	function handleSubmit(event) {
		event.preventDefault();

		const passwordValue = password; // Assuming password is a state variable or you can directly access the input value

		let validationCount = 0;

		// At least 8 characters
		if (passwordValue.length >= 8) validationCount++;

		// Contains lower case
		if (/[a-z]/.test(passwordValue)) validationCount++;

		// Contains upper case
		if (/[A-Z]/.test(passwordValue)) validationCount++;

		// Contains numbers
		if (/[0-9]/.test(passwordValue)) validationCount++;

		// Contains special characters
		if (/[\W_]/.test(passwordValue)) validationCount++;

		if (validationCount <= 4) {
			// Submit the form or any other logic you want to execute
			setErrMessage("Please make sure password criteria is met.")
		} else {
			// Show an error message to the user
			// Example: Set the error message in your state and display it on the UI
		
			
			let loginRequest = {
				email,
				password,
			};
			userService.signup(loginRequest, dispatch);
		}
	}

	function handlePasswordChange(e) {
		const passwordValue = e.target.value;

		// At least 8 characters
		document.getElementById("lengthCheck").checked = passwordValue.length >= 8;

		// Contains lower case
		document.getElementById("lowerCheck").checked = /[a-z]/.test(passwordValue);

		// Contains upper case
		document.getElementById("upperCheck").checked = /[A-Z]/.test(passwordValue);

		// Contains numbers
		document.getElementById("numberCheck").checked = /[0-9]/.test(passwordValue);

		// Contains special characters
		document.getElementById("specialCheck").checked = /[\W_]/.test(passwordValue);

		setPassword(passwordValue);  // Assuming setPassword updates a state variable for the password
	}

	return (
		<div>

			<div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">

				<div class="modal-overlay"></div>

				<div class="fixed inset-0 z-10 overflow-y-auto">

					<div class="modal-frame">

						<div id="myModal" class="modal modal--md">

							<div class="modal__body">
								<div class="flex flex-col ">

									<div class="w-24 h-24 rounded-full bg-white border border-black/10 oveflow-hidden bg-contain bg-center bg-no-repeat mx-auto mb-4" style={{ backgroundImage: `url(${("assets/img/logo.svg")})`, }}></div>

									<h1 class="text-center text-2xl mb-2">Create your account</h1>
									<h3 class="text-center text-m mb-8">Set up your password to continue</h3>


									<form method="post" onSubmit={handleSubmit}>
										<div >
											<input
												className="form__input"
												style={{ marginBottom: "15px" }}
												required
												name="Email"
												type="Email"
												placeholder="Your email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
											></input>
										</div>



										<div>
											<input
												className="form__input"
												style={{ marginBottom: "30px" }}
												type="password"
												required
												name="password"
												placeholder="Your password"
												value={password}
												onChange={(e) => handlePasswordChange(e)}
											></input>

											<div class="mt-2">
												<div class="flex items-center">

													<label class="ml-2 text-xs text-gray-500">Your password must contain:</label>
												</div>
												<div class="flex items-center">
													<input type="checkbox" id="lengthCheck" class="form-checkbox h-4 w-4 text-blue-600" disabled />
													<label for="lengthCheck" class="ml-2 text-xs text-gray-500">At least 8 characters</label>
												</div>
												<div class="flex items-center">
													<input type="checkbox" id="lowerCheck" class="form-checkbox h-4 w-4 text-blue-600" disabled />
													<label for="lowerCheck" class="ml-2 text-xs text-gray-500">Contains lower case</label>
												</div>
												<div class="flex items-center">
													<input type="checkbox" id="upperCheck" class="form-checkbox h-4 w-4 text-blue-600" disabled />
													<label for="upperCheck" class="ml-2 text-xs text-gray-500">Contains upper case</label>
												</div>
												<div class="flex items-center">
													<input type="checkbox" id="numberCheck" class="form-checkbox h-4 w-4 text-blue-600" disabled />
													<label for="numberCheck" class="ml-2 text-xs text-gray-500">Contains numbers</label>
												</div>
												<div class="flex items-center">
													<input type="checkbox" id="specialCheck" class="form-checkbox h-4 w-4 text-blue-600" disabled />
													<label for="specialCheck" class="ml-2 text-xs text-gray-500">Contains special characters</label>
												</div>
											</div>
										</div>
										<div
											className="form__group"
											hidden={!userState.loginError.showError}
										>
											{userState.loginError.errorMessage}
										</div>
										<div className="paragraph-box2 grid dgrid-row place-items-center"
											style={{ color: "red", fontSize: "0.8em", marginBottom: "30px" }}
											hidden={!errMessage}>
											{errMessage}
										</div>

										<div class="form__group flex flex-col items-center">
											<button
												className="button button--primary-1 min-w-[8rem]"
												type="submit"
												id="kayitol"
												value="Log in"
											>
												Continue
											</button>

										</div>
										<br />
										<p style={{ display: "inline", fontSize: "0.8rem" }}>Alredy have an account? </p>
										<a class="link text-sm" style={{ color: "blue", fontSize: "0.8rem" }} href="#/login"> Log in</a>

									</form>
								</div>

							</div>
						</div>


					</div>
					<div class="text-center w-full max-w-sm mx-auto">
						<p style={{ display: "inline", fontSize: "0.8rem" }}>By signing in, I confirm that I have read and accepted Hopguide's</p>
						<a class="link text-sm" style={{ color: "blue", fontSize: "0.8rem" }} href="#/forgotPassword"> Terms and conditions </a>
						<p style={{ display: "inline", fontSize: "0.8rem" }}>and</p>
						<a class="link text-sm" style={{ color: "blue", fontSize: "0.8rem" }} href="#/forgotPassword"> Privacy policy</a>
					</div>


				</div>
			</div>
		</div>
	)
		;
};

export default SignupForm;
