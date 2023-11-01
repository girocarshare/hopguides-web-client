import React, { useContext, useEffect, useState, forwardRef, useRef } from "react";
import { homeDataService } from "../services/HomeDataService";
import { HomeDataContext } from "../contexts/HomeDataContext";
import { homeDataConstants } from "../constants/HomeDataConstants";
import TimePicker from 'react-time-picker';
import { AiOutlineClose } from 'react-icons/ai';
import Axios from "axios";

var url = process.env.REACT_APP_URL || "http://localhost:8080/";

var num = 1;
const AddPartnerOrPointForm = (props) => {



    return (

        <div>
            {(props.partner || props.point) &&
                <div class="relative z-50" aria-labelledby="modal-title" role="dialog"
                    aria-modal="true">

                    <div class="modal-overlay"></div>
                    <div class="fixed inset-0 z-10 overflow-y-auto">

                        <div class="modal-frame">

                            <div id="myModal" class="modal modal--2xl">

                                <div class="modal__header">
                                    <h2 class="text-leading">
                                        New partner "or" POI
                                    </h2>
                                    <button
                                        class="button button--circle button--clear justify-self-end"
                                        type="button"
                                        onClick={props.handleClosePoi}>
                                        <AiOutlineClose />
                                    </button>
                                </div>

                                <div class="modal__body">
                                    <div class="form">
                                        <div
                                            className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
                                            <div className="form__group">
                                                <label class="form__label">Name
                                                    *</label>
                                                <div class="flex flex-col gap-2">
                                                    <div class="flex flex-row gap-2 items-center">
                                                        <label class="form__label" style={{ marginRight: "18px" }}>English:</label>
                                                        <input

                                                            className={"form__input"}
                                                            placeholder="Name"
                                                            aria-describedby="basic-addon1"
                                                            id="name"
                                                            type="text"

                                                            onChange={(e) => props.setTitlePoint(e.target.value)}
                                                            value={props.titlePoint}

                                                        />



                                                        <button


                                                            onClick={(e) => props.fetchData(props.titlePoint, 4)}
                                                            className="button button--primary"
                                                            id="sendMessageButton"
                                                            type="button"
                                                        >
                                                            Translate
                                                        </button>
                                                    </div>
                                                    <div class="flex flex-row gap-2 items-center">
                                                        <label class="form__label">Slovenian:</label>
                                                        <input
                                                            className={"form__input"}
                                                            aria-describedby="basic-addon1"
                                                            id="name"
                                                             placeholder="Name in slovenian"
                                                            type="text"
                                                            onChange={(e) => props.setTitlePointTransl(e.target.value)}
                                                            value={props.titlePointTransl}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div
                                            className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
                                            <div className="form__group">
                                                <label class="form__label">Short
                                                    description* </label>
                                                <div class="flex flex-col gap-2">
                                                    <div class="flex flex-row gap-2 items-center">
                                                        <label class="form__label" style={{ marginRight: "18px" }}>English:</label>
                                                        <textarea
                                                            className={"form__input text-sm h-32"}
                                                            type="textarea" required name="message"
                                                            placeholder='Short description'
                                                            onChange={(e) => props.setShortInfoPoint(e.target.value)}
                                                            value={props.shortInfoPoint}
                                                        />
                                                        <button

                                                            onClick={(e) => props.fetchData(props.shortInfoPoint, 5)}
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
                                                            className={!props.errShortDescriptionPoint ? "form__input text-sm h-32" : "form__input text-sm h-32 !border !border-red-500"}
                                                            placeholder="Short description"
                                                            aria-describedby="basic-addon1"
                                                            id="name"
                                                            type="textarea"
                                                            onChange={(e) => props.setShortInfoPointTransl(e.target.value)}
                                                            value={props.shortInfoPointTransl}
                                                        />
                                                        <div className="paragraph-box2 grid dgrid-row place-items-center"
                                                            style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }}
                                                            hidden={!props.errShortDescriptionPoint}>
                                                            {props.errShortDescriptionPoint}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
                                            <div className="form__group">
                                                <label class="form__label">Long
                                                    description*</label>
                                                <div class="flex flex-col gap-2">
                                                    <div class="flex flex-row gap-2 items-center">
                                                        <label class="form__label" style={{ marginRight: "18px" }}>English:</label>
                                                        <textarea className="form__input h-32" type="textarea" required
                                                            name="message"
                                                            placeholder='Long description'
                                                            value={props.longInfoPoint}
                                                            onChange={(e) => props.setLongInfoPoint(e.target.value)}></textarea>
                                                        <button

                                                            onClick={(e) => props.fetchData(props.longInfoPoint, 6)}
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
                                                            className={!props.errLongDescriptionPoint ? "form__input text-sm h-32" : "form__input text-sm h-32 !border !border-red-500"}
                                                            placeholder="Long description"
                                                            aria-describedby="basic-addon1"
                                                            id="name"
                                                            type="textarea"
                                                            onChange={(e) => props.setLongInfoPointTransl(e.target.value)}
                                                            value={props.longInfoPointTransl}
                                                        />
                                                        <div className="paragraph-box2 grid dgrid-row place-items-center"
                                                            style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }}
                                                            hidden={!props.errLongDescriptionPoint}>
                                                            {props.errLongDescriptionPoint}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {props.partner &&

                                            <div
                                                className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
                                                <div className="form__group">
                                                    <label class="form__label">Voucher
                                                        description*</label>
                                                    <div class="flex flex-col gap-2">
                                                        <div class="flex flex-row gap-2 items-center">
                                                            <label class="form__label" style={{ marginRight: "18px" }}>English:</label>

                                                            <textarea className={"form__input text-sm h-32"}
                                                                type="textarea" required
                                                                name="message"
                                                                placeholder='Voucher description'
                                                                value={props.voucherDesc}
                                                                onChange={(e) => props.setVoucherDesc(e.target.value)}></textarea>
                                                            <button

                                                                onClick={(e) => props.fetchData(props.voucherDesc, 7)}
                                                                className="button button--primary"
                                                                id="sendMessageButton"
                                                                type="button"
                                                            >
                                                                Translate
                                                            </button>

                                                        </div><div class="flex flex-row gap-2 items-center">
                                                            <label class="form__label">Slovenian:</label>
                                                            <textarea

                                                                className={!props.errVoucherDescriptionPoint ? "form__input text-sm h-32" : "form__input text-sm h-32 !border !border-red-500"}
                                                                placeholder='Voucher description translated'
                                                                aria-describedby="basic-addon1"
                                                                id="name"
                                                                type="text"

                                                                onChange={(e) => props.setVoucherDescTransl(e.target.value)}
                                                                value={props.voucherDescTransl}
                                                            />
                                                            <div className="paragraph-box2 grid dgrid-row place-items-center"
                                                                style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }}
                                                                hidden={!props.errVoucherDescriptionPoint}>
                                                                {props.errVoucherDescriptionPoint}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        }

                                        <div className="form__group">
                                            <label class="form__label">Category*</label>
                                            <select
                                                onChange={(e) => props.setCategory(e.target.value)}
                                                name="category" class="form__input"
                                            >
                                                {props.categories.map(item =>
                                                    <option key={item}
                                                        value={item}>{item}</option>
                                                )};

                                            </select>
                                        </div>

                                        {props.partner && <div className="form__group">
                                            <label class="form__label">Price*</label>
                                            <div
                                                class="flex flex-row items-center gap-2">
                                                <input

                                                    className={"form__input"}
                                                    placeholder="Price"
                                                    aria-describedby="basic-addon1"
                                                    id="name"
                                                    type="number"

                                                    onChange={(e) => props.setPointPrice(e.target.value)}
                                                    value={props.pointPrice}
                                                />

                                                <select
                                                    onChange={(e) => props.setCurrency(e.target.value)}
                                                    name="currency" class="form__input"
                                                >
                                                    {props.currencyList.map(item =>
                                                        <option key={item}
                                                            value={item}>{item}</option>
                                                    )};

                                                </select>
                                            </div>
                                        </div>}
                                        {props.partner && <div className="form__group">

                                            <label class="form__label">Offer
                                                name*</label>
                                            <input

                                                className={"form__input"}
                                                placeholder="Offer name"
                                                aria-describedby="basic-addon1"
                                                id="name"
                                                type="text"

                                                onChange={(e) => props.setOfferName(e.target.value)}
                                                value={props.offerName}
                                            />
                                        </div>}

                                        <div
                                            className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
                                            <div className="form__group">

                                                <label class="form__label">Address
                                                    *</label>
                                                <input

                                                    className={"form__input"}
                                                    placeholder="Longitude"
                                                    aria-describedby="basic-addon1"
                                                    id="name"
                                                    type="number"

                                                    onChange={(e) => props.setLongitude(e.target.value)}
                                                    value={props.longitude}
                                                />
                                            </div>
                                            <input

                                                className={"form__input"}
                                                placeholder="Latitude"
                                                aria-describedby="basic-addon1"
                                                id="name"
                                                type="number"

                                                onChange={(e) => props.setLatitude(e.target.value)}
                                                value={props.latitude}
                                            />
                                        </div>

                                        {props.partner &&
                                            <div
                                                className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
                                                <div className="form__group divide-y">
                                                    <label class="form__label">Working
                                                        hours*</label>

                                                    <div class="form pt-6">

                                                        <div className="form__group">
                                                            <label
                                                                class="form__label">Monday</label>
                                                            <div
                                                                class="flex flex-row items-center justify-between gap-2">

                                                                <label
                                                                    class="form__group--checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={props.mondayclosed}
                                                                        onChange={(e) => props.setMondayClosed(!props.mondayclosed)}
                                                                    />
                                                                    <span>
                                                                        Closed
                                                                    </span>
                                                                </label>
                                                                {!props.mondayclosed &&
                                                                    <div>
                                                                        <TimePicker
                                                                            disableClock={true}
                                                                            onChange={(newValue) => {
                                                                                props.setMondayFrom(newValue);
                                                                            }}
                                                                            value={props.mondayFrom} />
                                                                        <TimePicker
                                                                            disableClock={true}
                                                                            onChange={(newValue) => {
                                                                                props.setMondayTo(newValue);
                                                                            }}
                                                                            value={props.mondayTo} />
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>

                                                        <div className="form__group">
                                                            <label
                                                                class="form__label">Tuesday</label>
                                                            <div
                                                                class="flex flex-row items-center justify-between gap-2">
                                                                <label
                                                                    class="form__group--checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={props.tuesdayclosed}
                                                                        onChange={(e) => props.setTuesdayClosed(!props.tuesdayclosed)}
                                                                    />
                                                                    <span>
                                                                        Closed
                                                                    </span>
                                                                </label>
                                                                {!props.tuesdayclosed &&
                                                                    <div>
                                                                        <TimePicker
                                                                            disableClock={true}
                                                                            onChange={(newValue) => {
                                                                                props.setTuesdayFrom(newValue);
                                                                            }}
                                                                            value={props.tuesdayFrom} />
                                                                        <TimePicker
                                                                            disableClock={true}
                                                                            onChange={(newValue) => {
                                                                                props.setTuesdayTo(newValue);
                                                                            }}
                                                                            value={props.tuesdayTo} />
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>

                                                        <div className="form__group">
                                                            <label
                                                                class="form__label">Wednesday</label>
                                                            <div
                                                                class="flex flex-row items-center justify-between gap-2">
                                                                <label
                                                                    class="form__group--checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={props.wednesdayclosed}
                                                                        onChange={(e) => props.setWednesdayClosed(!props.wednesdayclosed)}
                                                                    />
                                                                    <span>
                                                                        Closed
                                                                    </span>
                                                                </label>
                                                                {!props.wednesdayclosed &&
                                                                    <div>

                                                                        <TimePicker
                                                                            disableClock={true}
                                                                            onChange={(newValue) => {
                                                                                props.setWednesdayFrom(newValue);
                                                                            }}
                                                                            value={props.wednesdayFrom} />
                                                                        <TimePicker
                                                                            disableClock={true}
                                                                            onChange={(newValue) => {
                                                                                props.setWednesdayTo(newValue);
                                                                            }}
                                                                            value={props.wednesdayTo} />
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>

                                                        <div className="form__group">
                                                            <label
                                                                class="form__label">Thursday</label>
                                                            <div
                                                                class="flex flex-row items-center justify-between gap-2">
                                                                <label
                                                                    class="form__group--checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={props.thursdayclosed}
                                                                        onChange={(e) => props.setThursdayClosed(!props.thursdayclosed)}
                                                                    />
                                                                    <span>
                                                                        Closed
                                                                    </span>
                                                                </label>
                                                                {!props.thursdayclosed &&
                                                                    <div>
                                                                        <TimePicker
                                                                            disableClock={true}
                                                                            onChange={(newValue) => {
                                                                                props.setThursdayFrom(newValue);
                                                                            }}
                                                                            value={props.thursdayFrom} />
                                                                        <TimePicker
                                                                            disableClock={true}
                                                                            onChange={(newValue) => {
                                                                                props.setThursdayTo(newValue);
                                                                            }}
                                                                            value={props.thursdayTo} />
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>

                                                        <div className="form__group">
                                                            <label
                                                                class="form__label">Friday</label>
                                                            <div
                                                                class="flex flex-row items-center justify-between gap-2">
                                                                <label
                                                                    class="form__group--checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={props.fridayclosed}
                                                                        onChange={(e) => props.setFridayClosed(!props.fridayclosed)}
                                                                    />
                                                                    <span>
                                                                        Closed
                                                                    </span>
                                                                </label>
                                                                {!props.fridayclosed &&
                                                                    <div>
                                                                        <TimePicker
                                                                            disableClock={true}
                                                                            onChange={(newValue) => {
                                                                                props.setFridayFrom(newValue);
                                                                            }}
                                                                            value={props.fridayFrom} />
                                                                        <TimePicker
                                                                            disableClock={true}
                                                                            onChange={(newValue) => {
                                                                                props.setFridayTo(newValue);
                                                                            }}
                                                                            value={props.fridayTo} />
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>

                                                        <div className="form__group">
                                                            <label
                                                                class="form__label">Saturday</label>
                                                            <div
                                                                class="flex flex-row items-center justify-between gap-2">
                                                                <label
                                                                    class="form__group--checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={props.saturdayclosed}
                                                                        onChange={(e) => props.setSaturdayClosed(!props.saturdayclosed)}
                                                                    />
                                                                    <span>
                                                                        Closed
                                                                    </span>
                                                                </label>
                                                                {!props.saturdayclosed &&
                                                                    <div>
                                                                        <TimePicker
                                                                            disableClock={true}
                                                                            onChange={(newValue) => {
                                                                                props.setSaturdayFrom(newValue);
                                                                            }}
                                                                            value={props.saturdayFrom} />
                                                                        <TimePicker
                                                                            disableClock={true}
                                                                            onChange={(newValue) => {
                                                                                props.setSaturdayTo(newValue);
                                                                            }}
                                                                            value={props.saturdayTo} />
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>

                                                        <div className="form__group">
                                                            <label
                                                                class="form__label">Sunday</label>
                                                            <div
                                                                class="flex flex-row items-center justify-between gap-2">
                                                                <label
                                                                    class="form__group--checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={props.sundayclosed}
                                                                        onChange={(e) => props.setSundayClosed(!props.sundayclosed)}
                                                                    />
                                                                    <span>
                                                                        Closed
                                                                    </span>
                                                                </label>
                                                                {!props.sundayclosed &&
                                                                    <div>
                                                                        <TimePicker
                                                                            disableClock={true}
                                                                            onChange={(newValue) => {
                                                                                props.setSundayFrom(newValue);
                                                                            }}
                                                                            value={props.sundayFrom} />
                                                                        <TimePicker
                                                                            disableClock={true}
                                                                            onChange={(newValue) => {
                                                                                props.setSundayTo(newValue);
                                                                            }}
                                                                            value={props.sundayTo} />
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                        <div className="form__group">
                                            <label class="form__label">Text to speach
                                                audio*</label>

                                            <label
                                                class="button button--secondary button--small">
                                                <span>Upload audio</span>
                                                <input type={"file"} accept={".mp3"}
                                                    onChange={props.addFile2}
                                                    class="sr-only" />
                                            </label>
                                            {props.audioNamePoint &&


                                                <label >{props.audioNamePoint}</label>}
                                        </div>

                                        <div className="form__group">
                                            <label class="form__label">Image
                                                gallery*</label>

                                            <label
                                                class="button button--secondary button--small">
                                                <span>Upload image gallery</span>
                                                <input type={"file"} multiple accept="image/*"
                                                    onChange={props.selectFiles}
                                                    class="sr-only" />
                                            </label>
                                            
                                            {props.imagePreviews && (
                                                <div>
                                                    {props.imagePreviews.map((img, i) => {
                                                        return (
                                                            <div>
                                                                <br />
                                                                <img className="preview"
                                                                    src={img}
                                                                    alt={"image-" + i}
                                                                    key={i} />
                                                                <br />
                                                               
                                                               
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}


                                        </div>

                                        <div className="form__group">
                                            <label class="form__label">Video*</label>

                                            <label
                                                class="button button--secondary button--small">
                                                <span>Upload video</span>
                                                <input type={"file"}  	accept={".mp4"}
                                                    onChange={props.selectVideo}
                                                    class="sr-only" />
                                            </label>
                                            {props.videoPreview && <video className="image__preview" controls src={props.videoPreview}
												alt={"video-"} />}
                                           {props.videoSizeError && <div style={{ color: "red", marginTop: "10px" }}>{props.videoSizeError}</div>}


                                        </div>


                                        {props.titlePoint.length == 0 &&
                                            <div className="paragraph-box2" style={{
                                                color: "red",
                                                fontSize: "0.8em",
                                                marginTop: "30px"
                                            }} hidden={!props.errMessagePhoto}>
                                                {props.errMessagePhoto}
                                            </div>}

                                        {props.partner &&
                                            <div
                                                className="bg-black/[3%] flex flex-col gap-2 p-4 rounded-xl">
                                                <div className="form__group">
                                                    <label class="form__label">Contact
                                                        information about
                                                        partner*</label>
                                                    <div className="form__group">
                                                        <label class="form__label">Responsible
                                                            person
                                                            name*</label>
                                                        <div>
                                                            <div class="form__group">
                                                                <input

                                                                    className={"form__input"}
                                                                    placeholder="Responsible person name"
                                                                    aria-describedby="basic-addon1"
                                                                    id="name"
                                                                    type="text"

                                                                    onChange={(e) => props.setResponsiblePerson(e.target.value)}
                                                                    value={props.responsiblePerson}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                                <div className="form__group">
                                                    <label
                                                        class="form__label">Phone*</label>
                                                    <input
                                                        className={"form__input"}
                                                        placeholder="Phone"
                                                        aria-describedby="basic-addon1"
                                                        id="name"
                                                        type="text"

                                                        onChange={(e) => props.setPhone(e.target.value)}
                                                        value={props.phone}
                                                    />
                                                </div>

                                                <div className="form__group">
                                                    <label
                                                        class="form__label">Email*</label>
                                                    <input

                                                        className={"form__input"}
                                                        placeholder="Email"
                                                        aria-describedby="basic-addon1"
                                                        id="name"
                                                        type="email"

                                                        onChange={(e) => props.setEmail(e.target.value)}
                                                        value={props.email}
                                                    />
                                                </div>

                                                <div className="form__group">
                                                    <label class="form__label">Web
                                                        page*</label>
                                                    <input

                                                        className={"form__input"}
                                                        placeholder="Web page"
                                                        aria-describedby="basic-addon1"
                                                        id="name"
                                                        type="text"

                                                        onChange={(e) => props.setWebUrl(e.target.value)}
                                                        value={props.webURL}
                                                    />
                                                </div>
                                            </div>
                                        }

                                        <div className="paragraph-box2 grid dgrid-row place-items-center"
                                            style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }}
                                            hidden={!props.errMessagePartner}>
                                            {props.errMessagePartner}
                                        </div>
                                        <div className="form__group grid dgrid-row place-items-center">
                                            <button
                                                onClick={(e) => {
                                                    props.handleAdd(e)
                                                }}
                                                className="button button--primary"
                                                id="sendMessageButton"
                                                type="button"
                                            >
                                                Add
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>


    );
};
export default AddPartnerOrPointForm