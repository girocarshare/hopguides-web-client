import React, { useContext, useEffect, useState, forwardRef, useRef } from "react";

import { HomeDataContext } from "../contexts/HomeDataContext";
var url = process.env.REACT_APP_URL || "http://localhost:8080/";

var num = 1;
const BasicTourData = (props) => {

    const [currencyList, setCurrencyList] = useState(["£", "€", "$"]);

    const { homeDataState, dispatch } = useContext(HomeDataContext);
    return (

        <div>

            <div className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">  <div className="form__group">
                <label class="form__label">Title*</label>
                <div class="flex flex-col gap-2">

                    <div class="flex flex-row gap-2 items-center">
                        <label class="form__label" style={{ marginRight: "18px" }}>English:</label>


                        <input

                            className={"form__input"}
                            placeholder='Title'
                            aria-describedby="basic-addon1"
                            id="name"
                            type="text"
                            onChange={(e) => props.setTitle(e.target.value)}
                            value={props.title}
                        />

                        <button

                            onClick={(e) => props.fetchData(props.title, 1)}
                            className="button button--primary"
                            id="sendMessageButton"
                            type="button"
                        >
                            Translate
                        </button>
                    </div>  </div>
            </div>
                <div class="flex flex-row gap-2 items-center">
                    <label class="form__label">Slovenian:</label>
                    <textarea
                        className={!props.errTitle ? "form__input text-sm" : "form__input text-sm !border !border-red-500"}
                        style={{ height: 80 }}
                        placeholder=''
                        aria-describedby="basic-addon1"
                        id="name"
                        type="text"
                        onChange={(e) => props.setTitleTransl(e.target.value)}
                        value={props.titleTransl}
                    />

                    <div className="paragraph-box2 grid dgrid-row place-items-center"
                        style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }}
                        hidden={!props.errTitle}>
                        {props.errTitle}
                    </div>
                </div>
            </div>
            <br />

            <div
                className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
                <div className="form__group">
                    <label class="form__label">Agreement title</label>
                    <div class="flex flex-col gap-2">

                        <div class="flex flex-row gap-2 items-center">

                            <label class="form__label" style={{ marginRight: "18px" }}>English:</label>
                            <textarea

                                className={!props.errAgreementTitle ? "form__input text-sm" : "form__input text-sm !border !border-red-500"}
                                style={{ height: 80 }}
                                placeholder='Agreement title'
                                aria-describedby="basic-addon1"
                                id="name"
                                type="text"
                                onChange={(e) => props.setAgreementTitle(e.target.value)}
                                value={props.agreementTitle}
                            />

                           
                                <button

                                    onClick={(e) => props.fetchData(props.agreementTitle, 2)}
                                    className="button button--primary"
                                    id="sendMessageButton"
                                    type="button"
                                >
                                    Translate
                                </button>

                        </div>
                        <div class="flex flex-row gap-2 items-center">

                            <label class="form__label">Slovenian:</label>
                            <textarea

                                className={!props.errAgreementTitle ? "form__input text-sm" : "form__input text-sm !border !border-red-500"}
                                style={{ height: 80 }}
                                placeholder='Agreement title in slovenian'
                                aria-describedby="basic-addon1"
                                id="name"
                                type="text"
                                onChange={(e) => props.setAgreementTitleTransl(e.target.value)}
                                value={props.agreementTitleTransl}
                            />
                            <div className="paragraph-box2 grid dgrid-row place-items-center"
                                style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }}
                                hidden={!props.errAgreementTitle}>
                                {props.errAgreementTitle}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
                <div className="form__group">

                    <label class="form__label">Agreement description</label>
                    <div class="flex flex-col gap-2">

                        <div class="flex flex-row gap-2 items-center">
                            <label class="form__label" style={{ marginRight: "18px" }}>English:</label>
                            <textarea

                                className={!props.errAgreementDescription ? "form__input text-sm" : "form__input text-sm !border !border-red-500"}
                                style={{ height: 80 }}
                                placeholder='Agreement description'
                                aria-describedby="basic-addon1"
                                id="name"
                                type="text"
                                onChange={(e) => props.setAgreementDesc(e.target.value)}
                                value={props.agreementDesc}
                            />

                             <button

                                onClick={(e) => props.fetchData(props.agreementDesc, 3)}
                                className="button button--primary"
                                id="sendMessageButton"
                                type="button"
                            >
                                Translate
                            </button>
                        </div>

                        <div class="flex flex-row gap-2 items-center">

                            <label class="form__label">Slovenian:</label>
                            <textarea

                                className={!props.errAgreementDescription ? "form__input text-sm" : "form__input text-sm !border !border-red-500"}
                                style={{ height: 80 }}
                                placeholder='Agreement description in slovenian'
                                aria-describedby="basic-addon1"
                                id="name"
                                type="text"
                                onChange={(e) => props.setAgreementDescTransl(e.target.value)}
                                value={props.agreementDescTransl}
                            />
                            <div className="paragraph-box2 grid dgrid-row place-items-center"
                                style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }}
                                hidden={!props.errAgreementDescription}>
                                {props.errAgreementDescription}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
											className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
											<div className="form__group">
													<div class="flex flex-col gap-2">
														<label class="form__label">Name of the place*</label>

														<input

															className={"form__input"}
															placeholder='Title'
															aria-describedby="basic-addon1"
															id="name"
															type="text"

                                                            onChange={(e) => props.setPlace(e.target.value)}
                                                            value={props.place}
														/>
														<button

															onClick={(e) => props.makeShortAndLongDesc(props.place)}
															className="button button--primary"
															id="sendMessageButton"
															type="button"
														>
															Generate short and long description
														</button>
													</div>
												
												<div class="form__group mt-4">
													<label class="form__label">Short description</label>
													<div class="flex flex-col gap-2">

														<div class="flex flex-row gap-2 items-center">
															<label class="form__label" style={{ marginRight: "18px" }}>English:</label>
															<textarea

																className={!props.errShortDescription ? "form__input h-32" : "form__input h-32 !border !border-red-500"}
																style={{ height: 80 }}
																placeholder='Short description'
																aria-describedby="basic-addon1"
																id="name"
																type="text"
																onChange={(e) => props.setShortInfo(e.target.value)}
																value={props.shortInfo}

															/>


														</div>

														<div class="flex flex-row gap-2 items-center">
															<label class="form__label" >Slovenian:</label>
															<textarea

																className={!props.errShortDescription ? "form__input h-32" : "form__input h-32 !border !border-red-500"}
																style={{ height: 80 }}
																placeholder='Short description in slovenian'
																aria-describedby="basic-addon1"
																id="name"
																type="text"
																onChange={(e) => props.setShortInfoTransl(e.target.value)}
																value={props.shortInfoTransl}

															/>


														</div>
													</div>
												</div>
											</div>









											<div className="form__group">
												<label class="form__label">Long description</label>
												<div class="flex flex-col gap-2">
													<div class="flex flex-row gap-2 items-center">
														<label class="form__label" style={{ marginRight: "18px" }}>English:</label>
														<textarea

															className={!props.errShortDescription ? "form__input h-32" : "form__input h-32 !border !border-red-500"}
															style={{ height: 80 }}
															placeholder='Long description'
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															onChange={(e) => props.setLongInfo(e.target.value)}
															value={props.longInfo}

														/>


													</div>

													<div class="flex flex-row gap-2 items-center">
														<label class="form__label" >Slovenian:</label>
														<textarea

															className={!props.errShortDescription ? "form__input h-32" : "form__input h-32 !border !border-red-500"}
															style={{ height: 80 }}
															placeholder='Long description in slovenian'
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															onChange={(e) => props.setLongInfoTransl(e.target.value)}
															value={props.longInfoTransl}

														/>


													</div>
												</div>

												<div className="paragraph-box2 grid dgrid-row place-items-center"
													style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }}
													hidden={!props.errLongDescription}>
													{props.errLongDescription}
												</div>
											</div>

										</div>

            
            <br />

            <div className="form__group">
                <label class="form__label">Price*</label>
                <div class="flex flex-row gap-2">
                    <input

                        className={"form__input grow "}
                        placeholder="Price"
                        aria-describedby="basic-addon1"
                        id="name"
                        type="text"

                        onChange={(e) => props.setPrice(e.target.value)}
                        value={props.price}
                    />
                    <select onChange={(e) => props.setCurrency(e.target.value)}
                        name="currency"
                        class="form__input shrink max-w-4 "
                    >
                        {currencyList.map(item =>
                            <option key={item} value={item}>{item}</option>
                        )};

                    </select>

                </div>
            </div>
            <br />

            <div className="form__group">
                <label class="form__label">Business partner*</label>
                <select onChange={(e) => props.setBusinessPartner(e.target.value)}
                    name="category"
                    class="form__input "
                >

                    <option key={"none"}></option>
                    {homeDataState.bpartners.bpartners.map(item =>
                        <option key={item.id}
                            value={item.id}>{item.name}</option>
                    )};

                </select>
            </div>
            <br />
            <div className="form__group">
                <label class="form__label">Tour duration*</label>
                <input

                    className={"form__input "}
                    placeholder="Tour duration"
                    aria-describedby="basic-addon1"
                    id="name"
                    type="text"

                    onChange={(e) => props.setDuration(e.target.value)}
                    value={props.duration}
                />
            </div>
            <br />
            <div className="form__group">
                <label class="form__label">Tour lenght (km)*</label>
                <input

                    className={"form__input "}
                    placeholder="Tour lenght (km)"
                    aria-describedby="basic-addon1"
                    id="name"
                    type="text"

                    onChange={(e) => props.setLength(e.target.value)}
                    value={props.length}
                />
            </div>
            <br />

            <div className="form__group">
                <label class="form__label">Highest point*</label>
                <input

                    className={"form__input "}
                    placeholder="Highest point"
                    aria-describedby="basic-addon1"
                    id="name"
                    type="text"

                    onChange={(e) => props.setHighestPoint(e.target.value)}
                    value={props.highestPoint}
                />
            </div>
            <br />
            <div>

                <label class="form__label">Text to speach audio*</label>

                <label class="button button--secondary button--small">
                    <span>Upload audio</span>
                    <input type={"file"} accept={".mp3"} onChange={props.addFile}
                        class="sr-only" />

                </label>

                {props.audioName &&


                    <label >{props.audioName}</label>}

            </div>
            <br />
            <div>
                <label class="form__label">Background tour image*</label>

                <label class="button button--secondary button--small">
                    <span>Upload image</span>
                    <input type={"file"} name="file" onChange={props.onFileChange}
                        class="sr-only" />
                </label>
            </div>

            <div>
                {props.fileData}
            </div>

            {props.imagePreview &&


                <img className="image__preview" src={props.imagePreview} alt={"image-"} />}
            <br />
            <div className="form__group">
                <div class="flex flex-row items-center gap-4 ">
                    <button

                        onClick={(e) => {
                            props.editTermsAndConditions(e)
                        }}
                        className="button button--primary"
                        id="sendMessageButton"
                        type="button"
                    >
                        Edit terms and conditions
                    </button>
                </div>
                <br />
                <br />
                {(!props.partner || props.point) &&
                    <div class="flex flex-row items-center gap-2" style={{ marginLeft: "200px" }}><button
                        onClick={(e) => {
                            props.addPartner(e)
                        }}
                        className="button button--primary"
                        id="sendMessageButton"
                        type="button"
                    >
                        Add partner
                    </button>

                        <button
                            onClick={(e) => {
                                props.addPoint(e)
                            }}
                            className="button button--primary"
                            id="sendMessageButton"
                            type="button"
                        >
                            Add point of interest
                        </button></div>}
            </div>

        </div>
    );
};
export default BasicTourData