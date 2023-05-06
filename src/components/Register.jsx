import React, {useContext, useEffect, useImperativeHandle, forwardRef, useState} from "react";
import {UserContext} from "../contexts/UserContext";
import {userService} from "../services/UserService";
import UserContextProvider from "../contexts/UserContext";
import {YMaps, Map} from "react-yandex-maps";
import {authHeader} from "../helpers/auth-header";
import Axios from "axios";
import {AiOutlineClose} from 'react-icons/ai';

const mapState = {
	center: [44, 21],
	zoom: 8,
	controls: [],
};
var url = process.env.REACT_APP_URL || "http://localhost:8080/";
const Register = () => {

	const {userState, dispatch} = useContext(UserContext);
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
	const [imagePreview, setImagePreview] = useState(null);



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

	function isJsonString(str) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}

	const onFileChange = (event) => {
		setFile(event.target.files[0]);
		setImagePreview(URL.createObjectURL(event.target.files[0]));
	}

	const fileData = () => {
		if (file) {

			return (
				<div>
					<h2 style={{marginTop: "20px"}}>File details</h2>
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
	if(!isJsonString(supportTransl)){
				setErrMessage("Please insert the proper JSON format of support field. Pay attention on enter and quotes(\")")
			}
		
                var sendEmailRequest = {
                    name: name,
                    support: JSON.parse(supportTransl),
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
                    xhr.addEventListener("load", SuccessHandler, false);
                    xhr.addEventListener("error", ErrorHandler, false);
                    xhr.addEventListener("abort", AbortHandler, false);
                    xhr.open('POST', `${url}api/users/sendRegistrationEmail`, true);
                    xhr.onload = function () {
                    };

                    xhr.send(formData);


                }
	};

	const handleClose = () => {
		window.location = "#/"
	};


	return (
		<UserContextProvider>
			<div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">

				<div class="modal-overlay"></div>

				<div class="fixed inset-0 z-10 overflow-y-auto">

					<div class="modal-frame">

						<div id="myModal" class="modal modal--md">

							<div class="modal__header">
								<h2 class="text-leading">
									Send registration mail to new
									user
								</h2>
								<button class="button button--circle button--clear justify-self-end" type="button"
										onClick={handleClose}>
									<AiOutlineClose/>
								</button>
							</div>

							<div class="modal__body">
								<form class="form" method="post" onSubmit={handleSubmitNew}
									  style={{width: "100%", marginRight: "338px"}}>

									<div className="form__group">
										<input className="form__input" type="email" required
											   name="email" placeholder="Email" value={email}
											   onChange={(e) => setEmail(e.target.value)}></input>
									</div>

									<div className="form__group">
										<input className="form__input" type="text" required
											   name="name" placeholder="Name" value={name}
											   onChange={(e) => setName(e.target.value)}></input>
									</div>

									<div className="form__group">
										<input className="form__input" type="text" required
											   name="contactEmail" placeholder="Contact email" value={contactEmail}
											   onChange={(e) => setContactEmail(e.target.value)}></input>
									</div>

									<div className="form__group">
										<input className="form__input" type="text" required
											   name="name" placeholder="Primary phone" value={phone}
											   onChange={(e) => setPhone(e.target.value)}></input>
									</div>

									<div className="form__group">
										<input className="form__input" type="text" required
											   name="name" placeholder="Secondary phone" value={phone2}
											   onChange={(e) => setPhone2(e.target.value)}></input>
									</div>


									<div className="form__group">
										<input className="form__input" type="text" required
											   name="name" placeholder="Address" value={address}
											   onChange={(e) => setAddress(e.target.value)}></input>

									</div>

									<div className="form__group">
										<input className="form__input" type="text" required
											   name="name" placeholder="Website" value={webURL}
											   onChange={(e) => setWebURL(e.target.value)}></input>
									</div>

									<div className="form__group">


										<div class="bg-black/[3%] rounded-xl p-4 flex flex-col gap-2">
											<div class="flex flex-row items-center gap-2">
												<input

													className={"form__input"}
													placeholder="Support"
													aria-describedby="basic-addon1"
													id="name"
													type="text"

													onChange={(e) => setSuppoprt(e.target.value)}
													value={support}
												/>
												<button

													onClick={(e) => fetchData(support, 1)}
													className="button button--primary button--small"
													id="sendMessageButton"
													type="button"
												>
													Translate
												</button>
											</div>


											<input class="form__input mt-2 text-sm"
												   aria-describedby="basic-addon1"
												   id="name"
												   required
												   placeholder='JSON FORMAT: { "language": "Text"}'
												   type="text"
												   onChange={(e) => setSuppoprtTransl(e.target.value)}
												   value={supportTransl}
											/>
										</div>


									</div>
									<div class="form__group">
										<div class="bg-black/[3%] rounded-xl p-4 flex flex-col gap-2">
											<label class="form__label">Logo</label>
											<div class="flex items-center gap-x-3">
											
												<label for="file-upload"
													   class="button button--secondary button--small">
													<span>Choose a file</span>
													<input id="file-upload" name="file" type="file" class="sr-only"
														   onChange={onFileChange}/>
												</label>


												
											</div>
											<div>
												{imagePreview &&
													<img className="preview" src={imagePreview}
														alt={"image-"} />}
											</div>

											{fileData()}
											<div class="flex flex-row items-center gap-4">
												<input className="form__input" type="number" required
													   name="name" placeholder="Logo height" value={height}
													   onChange={(e) => setHeight(e.target.value)}></input>
												<input className="form__input" type="number" required
													   name="name" placeholder="Logo width" value={width}
													   onChange={(e) => setWidth(e.target.value)}></input>
											</div>
										</div>
									</div>
									<div
										className="form__group"
										hidden={!success}
									>
										Success
									</div>

									<div
										className="form__group"
										hidden={!userState.error}
									>
										Error
									</div>

											

											<div className="paragraph-box2 grid dgrid-row place-items-center"
                                            style={{ color: "red", fontSize: "0.8em", marginBottom: "30px" }}
                                            hidden={!errMessage}>
                                            {errMessage}
                                        </div>


									<div className="button-p grid dgrid-row place-items-center">
									<div className="form__group">
										<input className="button button--primary min-w-[8rem]" id="kayitol"
											   type="submit"
											   value="Send"/>
									</div>
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
export default Register;



