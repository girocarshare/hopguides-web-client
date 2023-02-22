import React, { useContext, useEffect, useImperativeHandle, forwardRef, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";
import UserContextProvider from "../contexts/UserContext";
import Select from "react-dropdown-select";
import { VscLibrary } from 'react-icons/vsc';
import { MdOutlineDashboard } from 'react-icons/md';
import { BiCollection } from 'react-icons/bi';
import { BsBuilding } from "react-icons/bs";
import { GiPerson } from "react-icons/gi";
import { AiOutlineUserAdd, AiOutlineMail } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
const SetPassword = () => {

	const { userState, dispatch } = useContext(UserContext);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errMessage, setErrMessage] = useState("");
	let { email } = useParams()

	const handleSubmitNew = (e) => {



		if(password != confirmPassword){

			setErrMessage("Passwords do not match")
		}else if(password == "" || confirmPassword == ""){
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
					<div class="wrapper">


						<div style={{ display: "flex", justifyContent: "center", marginLeft: "338px", marginTop: "100px" }}>
							<form method="post" onSubmit={handleSubmitNew} style={{ width: "100%", marginRight: "338px" }} >


							<h1 class="paragraph-box" style={{ fontSize: 28 }} ><b>Set up password</b></h1>

								<div className="form-group">
									<input className="form-control" type="password" style={{ height: "50px" }} required name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
								</div>

								<div className="form-group">
									<input className="form-control" type="password" style={{ height: "50px" }} required name="confirmPassword" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
								</div>

							



								<label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>

								<div className="form-group text-center" style={{ color: "red", fontSize: "0.8em", marginTop: "30px", marginRight: "40px" }} hidden={!errMessage}>
								{errMessage}
								</div>
								<div
									className="form-group text-center"
									style={{ color: "green", fontSize: "0.8em" }}
									hidden={!userState.successPassword}
								>
									Success
								</div>

								<div
									className="form-group text-center"
									style={{ color: "red", fontSize: "0.8em" }}
									hidden={!userState.errorPassword}
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
export default SetPassword;



