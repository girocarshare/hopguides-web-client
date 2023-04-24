import React, {useContext, useEffect, useImperativeHandle, forwardRef, useState} from "react";
import {UserContext} from "../contexts/UserContext";
import {userService} from "../services/UserService";
import UserContextProvider from "../contexts/UserContext";
import {AiOutlineClose} from 'react-icons/ai';

const ForgotPassword = () => {

	const {userState, dispatch} = useContext(UserContext);
	const [email, setEmail] = useState("");


	const handleSubmitNew = (e) => {


		e.preventDefault();

		let sendEmailRequest = {}

		sendEmailRequest = {
			email: email,

		}

		userService.forgotPassword(sendEmailRequest, dispatch);
	};

	const handleClose = () => {
		window.location = "#/login"
		//dispatch({type: useContext.HIDE_SUCCESS_FAILURE_MODAL});
	};


	return (
		<UserContextProvider>
			<div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">

				<div class="modal-overlay"></div>

				<div class="fixed inset-0 z-10 overflow-y-auto">

					<div class="modal-frame">

						<div id="myModal" class="modal modal--sm">

							<div class="modal__header">
								<h2 class="text-leading">
									Forgot password
								</h2>
								<button class="button button--circle button--clear justify-self-end" type="button"
										onClick={handleClose}>
									<AiOutlineClose/>
								</button>
							</div>

							<div class="modal__body">
								<form class="form" method="post" onSubmit={handleSubmitNew}>
									<div className="form__group">
										<label class="form__label">Reset password for email:</label>
										<input className="form__input" type="email" style={{height: "50px"}} required
											   name="email" placeholder="Email" value={email}
											   onChange={(e) => setEmail(e.target.value)}></input>
									</div>
									<div
										className="form-group text-center"
										style={{color: "green", fontSize: "0.8em"}}
										hidden={!userState.successForgotPassword}
									>
										Success
									</div>

									<div
										className="form__group"
										hidden={!userState.errorForgotPassword}
									>
										Error
									</div>

									<div className="form__group">
										<input className="button button--primary min-w-[8rem]" id="kayitol" type="submit"
											   value="Send"/>
									</div>


								</form>
							</div>
						</div>

					</div>

				</div>


			</div>
		</UserContextProvider>
	);
};
export default ForgotPassword;



