import React, { useContext, useEffect, useImperativeHandle, forwardRef, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";
import UserContextProvider from "../contexts/UserContext";
import { YMaps, Map } from "react-yandex-maps";
const mapState = {
	center: [44, 21],
	zoom: 8,
	controls: [],
};
const Register = () => {

	const { userState, dispatch } = useContext(UserContext);
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [phone2, setPhone2] = useState("");
	const [contactEmail, setContactEmail] = useState("");
	const [webURL, setWebURL] = useState("");

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

	const handleLogout = (event) => {

		window.location = "#/login";
	}


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


				let sendEmailRequest = {}

				sendEmailRequest = {
					email: email,
					contactEmail: contactEmail,
					phone: phone,
					phone2: phone2,
					webURL: webURL,
					name: name,
					location: { street: street, country: country, city: city, latitude: latitude, longitude: longitude },
				}


				userService.sendRegistrationMail(sendEmailRequest, dispatch);





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



