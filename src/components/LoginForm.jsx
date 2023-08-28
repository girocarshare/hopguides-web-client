import {useContext, useState,useEffect} from "react";
import {UserContext} from "../contexts/UserContext";
import {userService} from "../services/UserService";
import {AiOutlineClose} from 'react-icons/ai';

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
	const {userState, dispatch} = useContext(UserContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [lang, setLang] = useState("");

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
			signInSuccessWithAuthResult: function(authResult, redirectUrl) {
				console.log( authResult.user.multiFactor.user.email)
				var user = authResult.user.multiFactor.user.email;
				if(user != null){
					let loginRequest = {
						email : user,
						password : "12345",
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

						<div id="myModal" class="modal modal--sm">
	
							<div class="modal__header">
								<h2 class="text-leading">
									Login
								</h2>
								<button class="button button--circle button--clear justify-self-end" type="button"
										onClick={handleClose}>
									<AiOutlineClose/>
								</button>
							</div>

							<div class="modal__body">
								<div class="flex flex-col items-stretch">
									<div
										class="w-32 h-32 rounded-full bg-white border border-black/10 oveflow-hidden bg-contain bg-center bg-no-repeat mx-auto mb-8"
										style={{backgroundImage: `url(${("assets/img/logo.svg")})`,}}>
									</div>
									<form class="form" method="post" onSubmit={handleSubmit}>
										<div className="form__group">
											<input
												className="form__input"
												required
												name="Email"
												type="Email"
												placeholder="Your email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
											></input>
										</div>
										<div className="form__group">
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
												className="form__helper text-right"
											>
												<a class="link" href="#/forgotPassword"> Forgot password? </a>
											</div>
										</div>
										<div
											className="form__group"
											hidden={!userState.loginError.showError}
										>
											{userState.loginError.errorMessage}
										</div>

										<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />

										
										<div class="form__group flex flex-col items-center">
											<button
												className="button button--primary min-w-[8rem]"
												type="submit"
												id="kayitol"
												value="Log in"
											>
												Login
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
		;
};

export default LoginForm;
