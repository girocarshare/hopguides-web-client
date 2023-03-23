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
	const [height, setHeight] = useState("");
	const [width, setWidth] = useState("");
	const [support, setSuppoprt] = useState("");
	const [phone, setPhone] = useState("");
	const [phone2, setPhone2] = useState("");
	const [contactEmail, setContactEmail] = useState("");
	const [webURL, setWebURL] = useState("");
	const [errMessage, setErrMessage] = useState("");
	const uploadRef = React.useRef();
	const statusRef = React.useRef();
	const progressRef = React.useRef();
	const [file, setFile] = useState(null);

	const addressInput = React.createRef(null);
	const [ymaps, setYmaps] = useState(null);

	const onYmapsLoad = (ymaps) => {
		setYmaps(ymaps)
		new ymaps.SuggestView(addressInput.current, {
			provider: {
				suggest: (request, options) => ymaps.suggest(request),
			},
		});
	};

	
	const onFileChange = (event) => {
		var _URL = window.URL || window.webkitURL;
		setFile(event.target.files[0]);

		var imgg = new Image();
        var objectUrl = _URL.createObjectURL(file);
        imgg.onload = function () {
            alert(this.width + " " + this.height);
			setWidth(this.width)
			setHeight(this.height)
            _URL.revokeObjectURL(objectUrl);
        };
        imgg.src = objectUrl;

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

	const handleLogout = (event) => {

		window.location = "#/login";
	}

	const ProgressHandler = (e) => {
		var percent = (e.loaded / e.total) * 100;
		progressRef.current.value = Math.round(percent);
		statusRef.current.innerHTML = Math.round(percent) + "% uploaded...";

	};

	const SuccessHandler = (e) => {

		statusRef.current.innerHTML = "Success";
		progressRef.current.value = 100;
		//reportService.addMenu(true, dispatch);

		//dispatch({ type: homeDataConstants.UPDATE_MENU_PHOTO_SUCCESS });
	};
	const ErrorHandler = () => {

		statusRef.current.innerHTML = "Upload failed";

		//dispatch({ type: homeDataConstants.UPDATE_MENU_PHOTO_FAILURE });
		//reportService.addMenu(false, dispatch);
	};
	const AbortHandler = () => {

		statusRef.current.innerHTML = "Upload aborted";

		//reportService.addMenu(false, dispatch);
	};
	const handleSubmitNew = (e) => {


		e.preventDefault();


		let street;
		let city;
		let country;
		let latitude;
		let longitude;
		let found = true;
		ymaps.geocode(addressInput.current.value, {
			results: 1,
		})
			.then(function (res) {

				if (typeof res.geoObjects.get(0) === "undefined") found = false;
				else {
					var firstGeoObject = res.geoObjects.get(0),
						coords = firstGeoObject.geometry.getCoordinates();

					console.log(firstGeoObject)
					latitude = coords[0];
					longitude = coords[1];
					country = firstGeoObject.getCountry();
					street = firstGeoObject.getThoroughfare();
					city = firstGeoObject.getLocalities().join(", ");
				}
			})
			.then((res) => {

console.log(height + width)
				var sendEmailRequest = {
					name: name,
					support: JSON.parse(support),
					dimensions: {height: height, width:width},
					contact: {
						phone: phone,
						phone2: phone2,
						email: contactEmail,
						webURL: webURL,
					location: {
						street: street,
						 country: country, 
						 city: city, 
						 latitude: latitude,
						  longitude: longitude 
					}},
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
					//************************************** */
					xhr.open('POST', `${url}api/users/sendRegistrationEmail`, true);
					//xhr.setRequestHeader("Authorization", props.token);
					xhr.onload = function () {
						// do something to response
					};
		
					console.log(formData)

					xhr.send(formData);
		
		
				}


			});




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
									<input className="form-control" type="text" style={{ height: "50px" }} required name="name" placeholder="Support description" value={support} onChange={(e) => setSuppoprt(e.target.value)}></input>
								</div>

								<div className="form-group">
									<input className="form-control" style={{ height: "50px" }} id="suggest" ref={addressInput} placeholder="Address" />

									<YMaps
										query={{
											load: "package.full",
											apikey: "b0ea2fa3-aba0-4e44-a38e-4e890158ece2",
											lang: "en_RU",
										}}
									>
										<Map
											style={{ display: "none" }}
											state={mapState}
											onLoad={onYmapsLoad}
											instanceRef={(map) => (map = map)}
											modules={["coordSystem.geo", "geocode", "util.bounds"]}
										></Map>
									</YMaps>
								</div>

								<label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>

								<div style={{ marginTop: "15px" }}>
									<label><b>Logo</b></label>
									<br />   <br />
									<input type={"file"} name="file" onChange={onFileChange} />

								</div>

								{fileData()}

								<br/>
								<br/>
								<div
									className="form-group text-center"
									style={{ color: "green", fontSize: "0.8em" }}
									hidden={!userState.success}
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



