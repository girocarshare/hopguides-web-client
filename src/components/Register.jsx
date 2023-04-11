import React, { useContext, useEffect, useImperativeHandle, forwardRef, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";
import UserContextProvider from "../contexts/UserContext";
import { YMaps, Map } from "react-yandex-maps";
import { authHeader } from "../helpers/auth-header";
import Axios from "axios";
const mapState = {
	center: [44, 21],
	zoom: 8,
	controls: [],
};
var url = process.env.REACT_APP_URL || "http://localhost:8080/";
const Register = () => {

	const { userState, dispatch } = useContext(UserContext);
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [support, setSuppoprt] = useState("");
	const [supportTransl, setSuppoprtTransl] = useState("");
	const [phone, setPhone] = useState("");
	const [phone2, setPhone2] = useState("");
	const [height, setHeight] = useState("");
	const [width, setWidth] = useState("");
	const [contactEmail, setContactEmail] = useState("");
	const [webURL, setWebURL] = useState("");
	const [address, setAddress] = useState("");
	const [errMessage, setErrMessage] = useState("");
	const statusRef = React.useRef();
	const progressRef = React.useRef();
	const [file, setFile] = useState(null);
	const [success, setSuccess] = useState(false);


	const fetchData = async (input, num) => {
		const response = await Axios.post(
			"https://api.openai.com/v1/completions",
			{
				prompt: `translate "${input}" to english, spanish, serbian and slovenian and make it as one json with lower case letters as keys`,
				model: 'text-davinci-002',
				max_tokens: 500,
				n: 1,
				stop: ".",
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer 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`,
				},
			}
		);

		if (num == 1) {

			setSuppoprtTransl(response.data.choices[0].text)
		}

		return response.data.choices[0].text;
	};

	const onFileChange = (event) => {
		setFile(event.target.files[0]);
	}

	const fileData = () => {
		if (file) {

			return (
				<div>
					<h2 style={{ marginTop: "20px" }}>File details</h2>
					<p>File name: {file.name}</p>
					<p>File type: {file.type}</p>
					<p>
						LAst modified:{" "}
						{file.lastModifiedDate.toDateString()}
					</p>
				</div>
			);
		}
	};

	const ProgressHandler = (e) => {
		var percent = (e.loaded / e.total) * 100;
		progressRef.current.value = Math.round(percent);
		statusRef.current.innerHTML = Math.round(percent) + "% uploaded...";

	};

	const SuccessHandler = (e) => {
		
		userService.sendRegistrationMail(true, dispatch);
	};

	const ErrorHandler = () => {

		statusRef.current.innerHTML = "Upload failed";
	};
	const AbortHandler = () => {

		statusRef.current.innerHTML = "Upload aborted";

	};
	const handleSubmitNew = (e) => {


		e.preventDefault();

/*
		var sendEmailRequest = {
			name: name,
			support: JSON.parse(support),
			dimensions: {
				height: height,
				width: width
			},
			contact: {
				phone: phone,
				phone2: phone2,
				email: contactEmail,
				webURL: webURL,
				location: {
					street: address,
				}
			},
		}

		if (file == null) {

			setErrMessage("Please pick a logo photo")
		} else {

			const formData = new FormData();

			formData.append('file', file);
			formData.append('request', JSON.stringify(sendEmailRequest));

			var xhr = new XMLHttpRequest();
			xhr.upload.addEventListener("progress", ProgressHandler, false);
			xhr.addEventListener("load", SuccessHandler, false);
			xhr.addEventListener("error", ErrorHandler, false);
			xhr.addEventListener("abort", AbortHandler, false);
			xhr.open('POST', `${url}api/users/sendRegistrationEmail`, true);
			xhr.onload = function () {
			};

			xhr.send(formData);


		}*/

		SuccessHandler()
	};


	return (
		<body style={{ height: "750px" }}>
			<div>

				<UserContextProvider>
					<div class="wrapper">


						<div style={{ display: "flex", justifyContent: "center", marginLeft: "338px", marginTop: "100px" }}>
							<form method="post" onSubmit={handleSubmitNew} style={{ width: "100%", marginRight: "338px" }} >


								<h1 class="paragraph-box" style={{ fontSize: 28 }} ><b>Send registration mail to new user</b></h1>

								<div className="form-group">
									<input className="form-control" type="email" style={{ height: "50px" }} required name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
								</div>

								<div className="form-group">
									<input className="form-control" type="text" style={{ height: "50px" }} required name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}></input>
								</div>

								<div className="form-group">
									<input className="form-control" type="text" style={{ height: "50px" }} required name="contactEmail" placeholder="Contact email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)}></input>
								</div>

								<div className="form-group">
									<input className="form-control" type="text" style={{ height: "50px" }} required name="name" placeholder="Primary phone" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
								</div>

								<div className="form-group">
									<input className="form-control" type="text" style={{ height: "50px" }} required name="name" placeholder="Secondary phone" value={phone2} onChange={(e) => setPhone2(e.target.value)}></input>
								</div>

								<div className="form-group">
									<input className="form-control" type="text" style={{ height: "50px" }} required name="name" placeholder="Website" value={webURL} onChange={(e) => setWebURL(e.target.value)}></input>
								</div>


								<div className="form-group">


									<div>
										<input

											className={"form-control"}
											placeholder="Support"
											aria-describedby="basic-addon1"
											id="name"
											type="text"
											style={{ backgroundColor: 'white', outline: 'none', height: "50px" }}

											onChange={(e) => setSuppoprt(e.target.value)}
											value={support}
										/>

										<br />
										<button
											style={{ background: "#0099ff", marginTop: "px", height: "35px" }}

											onClick={(e) => fetchData(support, 1)}
											className="btn btn-primary btn-xl"
											id="sendMessageButton"
											type="button"
										>
											Translate support
										</button>
										<br />
										<input
											aria-describedby="basic-addon1"
											id="name"
											placeholder='JSON FORMAT: { "language": "Text"}'
											type="text"
											onChange={(e) => setSuppoprtTransl(e.target.value)}
											value={supportTransl}
										/>
									</div>


								</div>

								<div className="form-group">
									<input className="form-control" type="text" style={{ height: "50px" }} required name="name" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)}></input>

								</div>

								<label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>

								<div style={{ marginTop: "15px" }}>
									<label><b>Logo</b></label>
									<br />   <br />
									<input type={"file"} name="file" onChange={onFileChange} />

								</div>

								{fileData()}

								<div className="form-group">
									<input className="form-control" type="text" style={{ height: "50px" }} required name="name" placeholder="Logo height" value={height} onChange={(e) => setHeight(e.target.value)}></input>

								</div>
								<div className="form-group">
									<input className="form-control" type="text" style={{ height: "50px" }} required name="name" placeholder="Logo width" value={width} onChange={(e) => setWidth(e.target.value)}></input>

								</div>

								<br />
								<br />
								<div
									className="form-group text-center"
									style={{ color: "green", fontSize: "0.8em" }}
									hidden={!success}
								>
									Success
								</div>

								<div
									className="form-group text-center"
									style={{ color: "red", fontSize: "0.8em" }}
									hidden={!userState.error}
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
export default Register;



