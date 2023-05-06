import React, { useContext, useEffect, useImperativeHandle, forwardRef, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";
import UserContextProvider from "../contexts/UserContext";
import { useParams } from 'react-router-dom';
const SetPassword = () => {

	const { userState, dispatch } = useContext(UserContext);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errMessage, setErrMessage] = useState("");
	let { email } = useParams()

	const handleSubmitNew = (e) => {


		

		if (password != confirmPassword) {

			setErrMessage("Passwords do not match")
		} else if (password == "" || confirmPassword == "") {
			setErrMessage("Please fill all fields")
		}

		e.preventDefault();

		let sendEmailRequest = {}

		sendEmailRequest = {
			email: email,
			password: password,
			confirmPassword: confirmPassword,


		}

		userService.sendSetPassword(sendEmailRequest, dispatch);
	};


	return (
		<body style={{ height: "750px" }}>
			<div>

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

									</div>

									<div class="modal__body">
										<form class="form" method="post" onSubmit={handleSubmitNew}>
											<div className="form__group">
												<label class="form__label">Set up password</label>
									

												<div className="form-group">
													<input className="form__input" type="password" style={{ height: "50px" }} required name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
												</div>

<br/>
												<div className="form-group">
													<input className="form__input" type="password" style={{ height: "50px" }} required name="confirmPassword" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
												</div>


											</div>
											<div
												className="form-group text-center"
												style={{ color: "green", fontSize: "0.8em" }}
												hidden={!userState.successPassword}
											>
												Success
											</div>

											<div
												className="form__group"
												hidden={!userState.errorPassword}
											>
												Error
											</div>
											<div className="form-group text-center" style={{ color: "red", fontSize: "0.8em", marginTop: "30px", marginRight: "40px" }} hidden={!errMessage}>
						{errMessage}
					</div>
											<div className="button-p grid dgrid-row place-items-center">
												<input className="button button--primary min-w-[8rem]" id="kayitol" type="submit"
													value="Send" />
											</div>


										</form>
									</div>
								</div>

							</div>

						</div>


					</div>


				</UserContextProvider>
			</div>
		</body>
	);


};
export default SetPassword;



