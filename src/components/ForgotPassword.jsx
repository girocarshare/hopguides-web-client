import React, { useContext, useEffect, useImperativeHandle, forwardRef, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";
import UserContextProvider from "../contexts/UserContext";
const ForgotPassword = () => {

	const { userState, dispatch } = useContext(UserContext);
	const [email, setEmail] = useState("");
	

	const handleSubmitNew = (e) => {

	
		e.preventDefault();

		let sendEmailRequest = {}

		sendEmailRequest = {
			email: email,

		}

		userService.forgotPassword(sendEmailRequest, dispatch);
	};


	return (
		<body style={{ height: "750px" }}>
			<div>

				<UserContextProvider>
					<div class="wrapper">


						<div style={{ display: "flex", justifyContent: "center", marginLeft: "338px", marginTop: "100px" }}>
							<form method="post" onSubmit={handleSubmitNew} style={{ width: "100%", marginRight: "338px" }} >


							<h1 class="paragraph-box" style={{ fontSize: 28 }} ><b>Reset password for email: </b></h1>

								<div className="form-group">
									<input className="form-control" type="email" style={{ height: "50px" }} required name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
								</div>

								<label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>

							
								<div
									className="form-group text-center"
									style={{ color: "green", fontSize: "0.8em" }}
									hidden={!userState.successForgotPassword}
								>
									Success
								</div>

								<div
									className="form-group text-center"
									style={{ color: "red", fontSize: "0.8em" }}
									hidden={!userState.errorForgotPassword}
								>
									Error
								</div>
						
								<div className="form-group">
									<input className="btn btn-primary btn-block" id="kayitol" type="submit" style={{ background: "#5e90f6" }} value="Send" />
								</div>



							</form>
						</div>


					</div>
				</UserContextProvider>
			</div>
		</body>
	);
};
export default ForgotPassword;



