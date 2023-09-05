import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";
import { AiOutlineClose } from 'react-icons/ai';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
var url = process.env.REACT_APP_URL || "http://localhost:8080/";
//var ui = new firebaseui.auth.AuthUI(firebase.auth());

console.log(process.env.REACT_APP_FIREBASE_APP_ID)
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);

const LoginForm = () => {
	const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
	const { userState, dispatch } = useContext(UserContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [lang, setLang] = useState("");
	const [emailInserted, setEmailInserted] = useState(false)

	const handleSubmit = (e) => {
		e.preventDefault();
		let loginRequest = {
			email,
			password,
		};
		userService.login(loginRequest, dispatch);
	};


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

									<h1 class="text-center text-2xl mb-2">Let's get started</h1>
									<h3 class="text-center text-m mb-8">Transform your photos into stunning videos</h3>
									<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
									<div class="divider-container">
										<span class="divider-text">or</span>
									</div>
									<form method="post" onSubmit={handleSubmit}>
										<div >
											{!emailInserted && <input
												className="form__input"
												style={{marginBottom: "30px"}}
												required
												name="Email"
												type="Email"
												placeholder="Your email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
											></input>}
										</div>
										{emailInserted && <div>
											<input
												className="form__input"
												type="password"
												required
												name="password"
												placeholder="Your password"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
											></input>
											<div
												className="form__helper text-right " style={{ marginBottom: "10px" }}
											>

												<a class="link" href="#/forgotPassword" > Forgot password? </a>
											</div>

										</div>}
										<div
											className="form__group"
											hidden={!userState.loginError.showError}
										>
											{userState.loginError.errorMessage}
										</div>




										{!emailInserted && <div class="form__group flex flex-col items-center">
											<button
												className="button button--primary-1 min-w-[8rem]"
												onClick={e => setEmailInserted(true)}
												id="kayitol"
												value="Continue"
											>
												Continue
											</button>
										</div>}
										{emailInserted && <div class="form__group flex flex-col items-center">
											<button
												className="button button--primary-1 min-w-[8rem]"
												type="submit"
												id="kayitol"
												value="Log in"
											>
												Login
											</button>

										</div>}
										<br />
										<p style={{ display: "inline", fontSize: "0.8rem" }}>Don't have an account? </p>
										<a class="link text-sm" style={{ color: "blue", fontSize: "0.8rem" }} href="#/signup"> Sign up</a>

									</form>
								</div>

							</div>
						</div>


					</div>					  <div class="text-center w-full max-w-sm mx-auto">
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

export default LoginForm;
