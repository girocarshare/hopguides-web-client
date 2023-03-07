
import React, { useContext, useEffect, useState, forwardRef, useRef } from "react";
import { homeDataService } from "../services/HomeDataService";
import { HomeDataContext } from "../contexts/HomeDataContext";
import { Modal } from "react-bootstrap";
import { homeDataConstants } from "../constants/HomeDataConstants";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { YMaps, Map } from "react-yandex-maps";
import TermsAndConditionsModal from "./TermsAndConditionsModal";

const mapState = {
  center: [44, 21],
  zoom: 8,
  controls: [],
};
var url = process.env.REACT_APP_URL || "http://localhost:3000/";


const InsertData = (props) => {


  const addressInput = React.createRef(null);


  const [title, setTitle] = useState("");
  const [shortInfo, setShortInfo] = useState("");
  const [longInfo, setLongInfo] = useState("");
  const [price, setPrice] = useState("_€ incl tax");

  const [titlePoint, setTitlePoint] = useState("");
  const [shortInfoPoint, setShortInfoPoint] = useState("");
  const [longInfoPoint, setLongInfoPoint] = useState("");
  const [pointPrice, setPointPrice] = useState("_€ incl tax");
  const [offerName, setOfferName] = useState("");
  const [duration, setDuration] = useState("");
  const [length, setLength] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [highestPoint, setHighestPoint] = useState("");

  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [hotelId, setHotelId] = useState("");
  const [ymaps, setYmaps] = useState(null);
  const [email, setEmail] = useState("");
  const [responsiblePerson, setResponsiblePerson] = useState("");
  const [webURL, setWebUrl] = useState("");


  const [mondayFrom, setMondayFrom] = useState("");
  const [mondayTo, setMondayTo] = useState("");
  const [tuesdayFrom, setTuesdayFrom] = useState("");
  const [tuesdayTo, setTuesdayTo] = useState("");
  const [wednesdayFrom, setWednesdayFrom] = useState("");
  const [wednesdayTo, setWednesdayTo] = useState("");
  const [thursdayFrom, setThursdayFrom] = useState("");
  const [thursdayTo, setThursdayTo] = useState("");
  const [fridayFrom, setFridayFrom] = useState("");
  const [fridayTo, setFridayTo] = useState("");
  const [saturdayFrom, setSaturdayFrom] = useState("");
  const [saturdayTo, setSaturdayTo] = useState("");
  const [sundayFrom, setSundayFrom] = useState("");
  const [sundayTo, setSundayTo] = useState("");

  const [mondayclosed, setMondayClosed] = useState(false);
  const [tuesdayclosed, setTuesdayClosed] = useState(false);
  const [wednesdayclosed, setWednesdayClosed] = useState(false);
  const [thursdayclosed, setThursdayClosed] = useState(false);
  const [fridayclosed, setFridayClosed] = useState(false);
  const [saturdayclosed, setSaturdayClosed] = useState(false);
  const [sundayclosed, setSundayClosed] = useState(false);


  const [errMessagePartner, setErrMessagePartner] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [points, setPoints] = useState([]);
  const [add, setAdd] = useState(false);
  const [file, setFile] = useState(null);
  const [audio, setAudio] = useState();
  const [audio2, setAudio2] = useState();
  const [audios, setAudios] = useState([]);
  const uploadRef = React.useRef();
  const statusRef = React.useRef();
  const progressRef = React.useRef();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [categories, setCategories] = useState(["HISTORY", "DRINKS", "NATURE", "EATS", "BRIDGE", "MUSEUMS", "EXPERIENCE"]);
  const [category, setCategory] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);
  const [progressInfos, setProgressInfos] = useState({ val: [] });
  const [message, setMessage] = useState([]);
  const [imageInfos, setImageInfos] = useState([]);
  const progressInfosRef = useRef(null);
  
  const { homeDataState, dispatch } = useContext(HomeDataContext);


	const [termsAndConditions, setTermsAndConditions] = useState(homeDataState.termsAndConditionsModal.text);

  const selectFiles = (event) => {
    let images = [];

    if (titlePoint == "") {
      setErrMessagePartner("Please first insert partners name")
    } else {
      var fs = []
      for (let i = 0; i < event.target.files.length; i++) {
        images.push(URL.createObjectURL(event.target.files[i]));
        var new_file = new File([event.target.files[i]], 'partner' + titlePoint + "---" + [event.target.files[i].name]);
        fs.push(new_file)

      }

      setSelectedFiles(selectedFiles.concat(fs))
      setImagePreviews(images);
      setProgressInfos({ val: [] });
      setMessage([]);
    }
  };

  const uploadImages = () => {
    const files = Array.from(selectedFiles);

    let _progressInfos = files.map((file) => ({
      percentage: 0,
      fileName: "partner" + file.name,
    }));

    progressInfosRef.current = {
      val: _progressInfos,
    };

    /*const uploadPromises = files.map((file, i) => upload(i, file));

    Promise.all(uploadPromises)
      .then(() => UploadService.getFiles())
      .then((files) => {
        setImageInfos(files.data);
      });
*/
    setMessage([]);

  };
  const onYmapsLoad = (ymaps) => {
    setYmaps(ymaps)
    new ymaps.SuggestView(addressInput.current, {
      provider: {
        suggest: (request, options) => ymaps.suggest(request),
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (file == null || title == "") {

      setErrMessage("Please fill in the tour title field")
    } else {


      var tour = {
        title: { en: title },
        shortInfo: { en: shortInfo },
        longInfo: { en: longInfo },
        price: price,
        points: points,
        duration: duration,
        length: length,
        highestPoint: highestPoint,
        bpartnerId: hotelId,
        termsAndConditions: termsAndConditions


      }

      const formData = new FormData();

      formData.append('file', file);
      formData.append('file', audio);
      formData.append('file', audio2);
      for (var f of files) {

        formData.append('file', f);
      }
      for (var a of audios) {

        formData.append('file', a);
      }
      //formData.append('audio', audio);
      formData.append('tour', JSON.stringify(tour));

      var xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", ProgressHandler, false);
      xhr.addEventListener("load", SuccessHandler, false);
      xhr.addEventListener("error", ErrorHandler, false);
      xhr.addEventListener("abort", AbortHandler, false);
      //************************************** */
      xhr.open('POST', `${url}api/pnl/tour/addFull`, true);
      //xhr.setRequestHeader("Authorization", props.token);
      xhr.onload = function () {
        // do something to response
      };

      xhr.send(formData);

      // homeDataService.addTour(tour, dispatch);

    }
  };


  const addPoint = () => {
    setAdd(true)

  };

  const editTermsAndConditions = () => {

    dispatch({ type: homeDataConstants.SHOW_TERMS_AND_CONDITIONS_MODAL });

  };


  const handleAdd = (e) => {

    if (titlePoint == "" || addressInput.current.value == "" || (!mondayclosed && (mondayFrom == "" || mondayTo == "")) || (!tuesdayclosed && (tuesdayFrom == "" || tuesdayTo == "")) || (!wednesdayclosed && (wednesdayFrom == "" || wednesdayTo == "")) || (!thursdayclosed && (thursdayFrom == "" || thursdayTo == "")) || (!fridayclosed && (fridayFrom == "" || fridayTo == "")) || (!saturdayclosed && (saturdayFrom == "" || saturdayTo == "")) || (!sundayclosed && (sundayFrom == "" || sundayTo == ""))) {

      setErrMessagePartner("Please insert mandatory fields for partner (marked with *)")
    } else {

      setAdd(false)
      setErrMessagePartner("")

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

          var point = {
            title: { en: titlePoint },
            shortInfo: { en: shortInfoPoint },
            longInfo: { en: longInfoPoint },
            price: pointPrice,
            offerName: offerName,
            contact: { phone: phone, email: email, webURL: webURL, name: responsiblePerson },
            location: { street: street, country: country, city: city, latitude: latitude, longitude: longitude },
            workingHours: { monday: { from: mondayFrom, to: mondayTo }, tuesday: { from: tuesdayFrom, to: tuesdayTo }, wednesday: { from: wednesdayFrom, to: wednesdayTo }, thursday: { from: thursdayFrom, to: thursdayTo }, friday: { from: fridayFrom, to: fridayTo }, saturday: { from: saturdayFrom, to: saturdayTo }, sunday: { from: sundayFrom, to: sundayTo } },

            category: category
          }

          const newData = [point, ...points];

          setPoints(newData)
          setTitlePoint("")
          setShortInfoPoint("")
          setLongInfoPoint("")
          setPointPrice("")
          setPhone("")
          setEmail("")
          setResponsiblePerson("")
          setMondayClosed(false)
          setTuesdayClosed(false)
          setWednesdayClosed(false)
          setThursdayClosed(false)
          setFridayClosed(false)
          setSaturdayClosed(false)
          setSundayClosed(false)
          setOfferName("")
          setCategory("")
          setWebUrl("")
          setLocation("")

          setFiles(files.concat(selectedFiles))
          setAudios(audios.concat(audio2))

          setSelectedFiles([])
          setAudio2(null)


        });

    }
  }


  const addFile = (e) => {
    if (e.target.files[0]) {

      var new_file = new File([e.target.files[0]], 'audio1' + titlePoint + "---" + [e.target.files[0].name]);
      setAudio(new_file);

    }
  };

  const addFile2 = (e) => {
    if (e.target.files[0]) {

      var new_file = new File([e.target.files[0]], 'audio2' + titlePoint + "---" + [e.target.files[0].name]);
      setAudio2(new_file);
    }
  };

  const onFileChange = (event) => {

    var new_file = new File([event.target.files[0]], 'image' + "---" + [event.target.files[0].name]);
    setFile(new_file);
    setImagePreview(URL.createObjectURL(event.target.files[0]));
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

    statusRef.current.innerHTML = "Success";
    progressRef.current.value = 100;
    //reportService.addMenu(true, dispatch);

    dispatch({ type: homeDataConstants.UPDATE_MENU_PHOTO_SUCCESS });
  };
  const ErrorHandler = () => {

    statusRef.current.innerHTML = "Upload failed";

    dispatch({ type: homeDataConstants.UPDATE_MENU_PHOTO_FAILURE });
    //reportService.addMenu(false, dispatch);
  };
  const AbortHandler = () => {

    statusRef.current.innerHTML = "Upload aborted";

    //reportService.addMenu(false, dispatch);
  };

  return (






    <div className="containerModal"  >

      <div >

        <TermsAndConditionsModal 
              termsAndConditions = {termsAndConditions}
              setTermsAndConditions = {setTermsAndConditions}
              />
        <form id="contactForm" >



          <table style={{ marginLeft: "4rem", marginBottom: "4rem" }}>
            <td width="1000rem"  >
              <div className="control-group">
                <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
                  <label><b>Title</b></label>
                  <div class="row" >
                    <div class="form-group col-lg-10">
                      <input

                        className={"form-control"}
                        placeholder="Title"
                        aria-describedby="basic-addon1"
                        id="name"
                        type="text"
                        style={{ backgroundColor: 'white', outline: 'none', width: "1000px" }}

                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="control-group">
                <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
                  <label><b>Short description</b></label>
                  <div class="row" >
                    <div class="form-group col-lg-10">
                      <textarea className="form-control" style={{ height: "100px", width: "1000px" }} type="textarea" required name="message" placeholder="Short description" value={shortInfo} onChange={(e) => setShortInfo(e.target.value)}></textarea>

                    </div>
                  </div>
                </div>
              </div>

              <div className="control-group">
                <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
                  <label><b>Long description</b></label>
                  <div class="row" >
                    <div class="form-group col-lg-10">
                      <textarea className="form-control" style={{ height: "200px", width: "1000px" }} type="textarea" required name="message" placeholder="Long description" value={longInfo} onChange={(e) => setLongInfo(e.target.value)}></textarea>

                    </div>
                  </div>
                </div>
              </div>

              <div className="control-group">
                <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
                  <label><b>Price</b></label>
                  <div class="row" >
                    <div class="form-group col-lg-10">
                      <input

                        className={"form-control"}
                        placeholder="Price"
                        aria-describedby="basic-addon1"
                        id="name"
                        type="text"
                        style={{ backgroundColor: 'white', outline: 'none', width: "1000px" }}

                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="control-group">
                <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
                  <label><b>Business partner id</b></label>
                  <div class="row" >
                    <div class="form-group col-lg-10">
                      <input

                        className={"form-control"}
                        placeholder="Business partner id"
                        aria-describedby="basic-addon1"
                        id="name"
                        type="text"
                        style={{ backgroundColor: 'white', outline: 'none', width: "1000px" }}

                        onChange={(e) => setHotelId(e.target.value)}
                        value={hotelId}
                      />
                    </div>
                  </div>
                </div>
              </div>


              <div className="control-group">
                <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
                  <label><b>Tour duration</b></label>
                  <div class="row" >
                    <div class="form-group col-lg-10">
                      <input

                        className={"form-control"}
                        placeholder="Tour duration"
                        aria-describedby="basic-addon1"
                        id="name"
                        type="text"
                        style={{ backgroundColor: 'white', outline: 'none', width: "1000px" }}

                        onChange={(e) => setDuration(e.target.value)}
                        value={duration}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="control-group">
                <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
                  <label><b>Tour lenght (km)</b></label>
                  <div class="row" >
                    <div class="form-group col-lg-10">
                      <input

                        className={"form-control"}
                        placeholder="Tour lenght (km)"
                        aria-describedby="basic-addon1"
                        id="name"
                        type="text"
                        style={{ backgroundColor: 'white', outline: 'none', width: "1000px" }}

                        onChange={(e) => setLength(e.target.value)}
                        value={length}
                      />
                    </div>
                  </div>
                </div>
              </div>


              <div className="control-group">
                <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
                  <label><b>Highest point</b></label>
                  <div class="row" >
                    <div class="form-group col-lg-10">
                      <input

                        className={"form-control"}
                        placeholder="Highest point"
                        aria-describedby="basic-addon1"
                        id="name"
                        type="text"
                        style={{ backgroundColor: 'white', outline: 'none', width: "1000px" }}

                        onChange={(e) => setHighestPoint(e.target.value)}
                        value={highestPoint}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "15px" }}>

                <label><b>Mp3</b></label>
                <input type={"file"} accept={".mp3"} onChange={addFile} />
              </div>
              <div style={{ marginTop: "15px" }}>
                <label><b>Background tour image</b></label>
                <input type="file" name="file" onChange={onFileChange} />

              </div>

              {fileData()}

              <img className="preview" src={imagePreview} alt={"image-"} />


              <div className="form-group text-center">
                <button
                  style={{ background: "#1977cc", marginTop: "15px", marginRight: "55px" }}

                  onClick={(e) => { editTermsAndConditions(e) }}
                  className="btn btn-primary btn-xl"
                  id="sendMessageButton"
                  type="button"
                >
                  Edit terms and conditions
                </button>
              </div>


              <div className="form-group text-center" style={{ color: "red", fontSize: "0.8em", marginTop: "30px", marginRight: "40px" }} hidden={!errMessage}>
                {errMessage}
              </div>


              <div className="form-group text-center">
                <button
                  style={{ background: "#1977cc", marginTop: "15px", marginRight: "55px" }}

                  onClick={(e) => { addPoint(e) }}
                  className="btn btn-primary btn-xl"
                  id="sendMessageButton"
                  type="button"
                >
                  Add partner
                </button>
              </div>









              <div>
                {add &&
                  <div><div className="control-group">
                    <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
                      <label><b>Partner's name *</b></label>
                      <div class="row" >
                        <div class="form-group col-lg-10">
                          <input

                            className={"form-control"}
                            placeholder="Partner's name"
                            aria-describedby="basic-addon1"
                            id="name"
                            type="text"
                            style={{ backgroundColor: 'white', outline: 'none', width: "1000px" }}

                            onChange={(e) => setTitlePoint(e.target.value)}
                            value={titlePoint}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                    <div className="control-group">
                      <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
                        <label><b>Short description </b></label>
                        <div class="row" >
                          <div class="form-group col-lg-10">
                            <textarea className="form-control" style={{ height: "100px", width: "1000px" }} type="textarea" required name="message" placeholder="Short description" value={shortInfoPoint} onChange={(e) => setShortInfoPoint(e.target.value)}></textarea>

                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="control-group">
                      <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
                        <label><b>Long description</b></label>
                        <div class="row" >
                          <div class="form-group col-lg-10">
                            <textarea className="form-control" style={{ height: "200px", width: "1000px" }} type="textarea" required name="message" placeholder="Long description" value={longInfoPoint} onChange={(e) => setLongInfoPoint(e.target.value)}></textarea>

                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="control-group">
                      <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
                        <label><b>Category</b></label>
                        <div class="row" >
                          <div class="form-group col-lg-10">

                            <select onChange={(e) => setCategory(e.target.value)} name="category" class="custom-select" style={{ width: "360px" }}>
                              {categories.map(item =>
                                <option key={item} value={item} >{item}</option>
                              )};

                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="control-group">
                      <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
                        <label><b>Price</b></label>
                        <div class="row" >
                          <div class="form-group col-lg-10">
                            <input

                              className={"form-control"}
                              placeholder="Price"
                              aria-describedby="basic-addon1"
                              id="name"
                              type="text"
                              style={{ backgroundColor: 'white', outline: 'none', width: "1000px" }}

                              onChange={(e) => setPointPrice(e.target.value)}
                              value={pointPrice}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="control-group">
                      <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
                        <label><b>Offer name</b></label>
                        <div class="row" >
                          <div class="form-group col-lg-10">
                            <input

                              className={"form-control"}
                              placeholder="Offer name"
                              aria-describedby="basic-addon1"
                              id="name"
                              type="text"
                              style={{ backgroundColor: 'white', outline: 'none', width: "1000px" }}

                              onChange={(e) => setOfferName(e.target.value)}
                              value={offerName}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="control-group">
                      <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
                        <label><b>Address *</b></label>
                        <div class="row" >
                          <div class="form-group col-lg-10">
                            <input className="form-control" id="suggest" ref={addressInput} placeholder="Address" style={{ width: "1000px" }} />

                            <YMaps
                              query={{
                                load: "package.full",
                                apikey: "b0ea2fa3-aba0-4e44-a38e-4e890158ece2",
                                lang: "en_RU",
                              }}
                            >
                              <Map
                                style={{ display: "none", width: "1000px" }}
                                state={mapState}
                                onLoad={onYmapsLoad}
                                instanceRef={(map) => (map = map)}
                                modules={["coordSystem.geo", "geocode", "util.bounds"]}
                              ></Map>
                            </YMaps>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h6><b>Working hours *</b></h6>
                    <br />

                    <div className="control-group">
                      <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1, marginLeft: "300px" }}>
                        <label><b>Monday</b></label>

                        <br />
                        <label>
                          <input
                            type="checkbox"
                            checked={mondayclosed}
                            onChange={(e) => setMondayClosed(!mondayclosed)}
                          />
                          closed
                        </label>
                        {!mondayclosed && <div class="row"  >

                          <span style={{ marginLeft: "20px", marginRight: "30px" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimePicker
                                label="From"
                                value={mondayFrom}
                                onChange={(newValue) => {
                                  setMondayFrom(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} size="small" sx={{ width: '170px' }}
                                  error={false} />}
                              />
                            </LocalizationProvider>
                          </span>
                          <span >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimePicker
                                label="To"
                                value={mondayTo}
                                onChange={(newValue) => {
                                  setMondayTo(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} size="small" sx={{ width: '170px' }} error={false} />}
                              />
                            </LocalizationProvider></span>
                        </div>}
                      </div>
                    </div>

                    <div className="control-group">
                      <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1, marginLeft: "300px" }}>
                        <label><b>Tuesday</b></label>
                        <br />
                        <label>
                          <input
                            type="checkbox"
                            checked={tuesdayclosed}
                            onChange={(e) => setTuesdayClosed(!tuesdayclosed)}
                          />
                          closed
                        </label>
                        {!tuesdayclosed && <div class="row" >


                          <span style={{ marginLeft: "20px", marginRight: "30px" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimePicker
                                label="From"
                                value={tuesdayFrom}
                                onChange={(newValue) => {
                                  setTuesdayFrom(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} size="small" sx={{ width: '170px' }} error={false} />}
                              />
                            </LocalizationProvider>
                          </span>
                          <span >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimePicker
                                label="To"
                                value={tuesdayTo}
                                onChange={(newValue) => {
                                  setTuesdayTo(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} size="small" sx={{ width: '170px' }} error={false} />}
                              />
                            </LocalizationProvider></span>
                        </div>}
                      </div>
                    </div>

                    <div className="control-group">
                      <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1, marginLeft: "300px" }}>
                        <label><b>Wednesday</b></label>
                        <br />
                        <label>
                          <input
                            type="checkbox"
                            checked={wednesdayclosed}
                            onChange={(e) => setWednesdayClosed(!wednesdayclosed)}
                          />
                          closed
                        </label>
                        {!wednesdayclosed && <div class="row" >


                          <span style={{ marginLeft: "20px", marginRight: "30px" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimePicker
                                label="From"
                                value={wednesdayFrom}
                                onChange={(newValue) => {
                                  setWednesdayFrom(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} size="small" sx={{ width: '170px' }} error={false} />}
                              />
                            </LocalizationProvider>
                          </span>
                          <span >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimePicker
                                label="To"
                                value={wednesdayTo}
                                onChange={(newValue) => {
                                  setWednesdayTo(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} size="small" sx={{ width: '170px' }} error={false} />}
                              />
                            </LocalizationProvider></span>
                        </div>}
                      </div>
                    </div>

                    <div className="control-group">
                      <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1, marginLeft: "300px" }}>
                        <label><b>Thursday</b></label>
                        <br />
                        <label>
                          <input
                            type="checkbox"
                            checked={thursdayclosed}
                            onChange={(e) => setThursdayClosed(!thursdayclosed)}
                          />
                          closed
                        </label>
                        {!thursdayclosed && <div class="row" >


                          <span style={{ marginLeft: "20px", marginRight: "30px" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimePicker
                                label="From"
                                value={thursdayFrom}
                                onChange={(newValue) => {
                                  setThursdayFrom(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} size="small" sx={{ width: '170px' }} error={false} />}
                              />
                            </LocalizationProvider>
                          </span>
                          <span >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimePicker
                                label="To"
                                value={thursdayTo}
                                onChange={(newValue) => {
                                  setThursdayTo(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} size="small" sx={{ width: '170px' }} error={false} />}
                              />
                            </LocalizationProvider></span>
                        </div>}
                      </div>
                    </div>

                    <div className="control-group">
                      <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1, marginLeft: "300px" }}>
                        <label><b>Friday</b></label>
                        <br />
                        <label>
                          <input
                            type="checkbox"
                            checked={fridayclosed}
                            onChange={(e) => setFridayClosed(!fridayclosed)}
                          />
                          closed
                        </label>
                        {!fridayclosed && <div class="row" >

                          <span style={{ marginLeft: "20px", marginRight: "30px" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimePicker
                                label="From"
                                value={fridayFrom}
                                onChange={(newValue) => {
                                  setFridayFrom(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} size="small" sx={{ width: '170px' }} error={false} />}
                              />
                            </LocalizationProvider>
                          </span>
                          <span >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimePicker
                                label="To"
                                value={fridayTo}
                                onChange={(newValue) => {
                                  setFridayTo(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} size="small" sx={{ width: '170px' }} error={false} />}
                              />
                            </LocalizationProvider></span>
                        </div>}
                      </div>
                    </div>

                    <div className="control-group">
                      <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1, marginLeft: "300px" }}>
                        <label><b>Saturday</b></label>
                        <br />
                        <label>
                          <input
                            type="checkbox"
                            checked={saturdayclosed}
                            onChange={(e) => setSaturdayClosed(!saturdayclosed)}
                          />
                          closed
                        </label>
                        {!saturdayclosed && <div class="row" >


                          <span style={{ marginLeft: "20px", marginRight: "30px" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimePicker
                                label="From"
                                value={saturdayFrom}
                                onChange={(newValue) => {
                                  setSaturdayFrom(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} size="small" sx={{ width: '170px' }} error={false} />}
                              />
                            </LocalizationProvider>
                          </span>
                          <span >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimePicker
                                label="To"
                                value={saturdayTo}
                                onChange={(newValue) => {
                                  setSaturdayTo(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} size="small" sx={{ width: '170px' }} error={false} />}
                              />
                            </LocalizationProvider></span>
                        </div>}
                      </div>
                    </div>

                    <div className="control-group">
                      <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1, marginLeft: "300px" }}>
                        <label><b>Sunday</b></label>
                        <br />
                        <label>
                          <input
                            type="checkbox"
                            checked={sundayclosed}
                            onChange={(e) => setSundayClosed(!sundayclosed)}
                          />
                          closed
                        </label>
                        {!sundayclosed && <div class="row" >


                          <span style={{ marginLeft: "20px", marginRight: "30px" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimePicker
                                label="From"
                                value={sundayFrom}
                                onChange={(newValue) => {
                                  setSundayFrom(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} size="small" sx={{ width: '170px' }} error={false} />}
                              />
                            </LocalizationProvider>
                          </span>
                          <span >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimePicker
                                label="To"
                                value={sundayTo}
                                onChange={(newValue) => {
                                  setSundayTo(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} size="small" sx={{ width: '170px' }} error={false} />}
                              />
                            </LocalizationProvider></span>
                        </div>}
                      </div>
                    </div>

                    <div style={{ marginTop: "15px" }}>

                      <label><b>Mp3</b></label>
                      <input type={"file"} accept={".mp3"} onChange={addFile2} />
                    </div>

                    <div>
                      <div className="row">
                        <div className="col-8">
                          <label className="btn btn-default p-0">
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={selectFiles}
                            />
                          </label>
                        </div>

                        <div className="col-4">
                          <button
                            className="btn btn-success btn-sm"
                            disabled={!selectedFiles}
                            onClick={uploadImages}
                          >
                            Upload
                          </button>
                        </div>
                      </div>

                      {progressInfos &&
                        progressInfos.val.length > 0 &&
                        progressInfos.val.map((progressInfo, index) => (
                          <div className="mb-2" key={index}>
                            <span>{progressInfo.fileName}</span>
                            <div className="progress">
                              <div
                                className="progress-bar progress-bar-info"
                                role="progressbar"
                                aria-valuenow={progressInfo.percentage}
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: progressInfo.percentage + "%" }}
                              >
                                {progressInfo.percentage}%
                              </div>
                            </div>
                          </div>
                        ))}

                      {imagePreviews && (
                        <div>
                          {imagePreviews.map((img, i) => {
                            return (
                              <img className="preview" src={img} alt={"image-" + i} key={i} />
                            );
                          })}
                        </div>
                      )}

                      {message.length > 0 && (
                        <div className="alert alert-secondary mt-2" role="alert">
                          <ul>
                            {message.map((item, i) => {
                              return <li key={i}>{item}</li>;
                            })}
                          </ul>
                        </div>
                      )}

                      {imageInfos.length > 0 && (
                        <div className="card mt-3">
                          <div className="card-header">List of Images</div>
                          <ul className="list-group list-group-flush">
                            {imageInfos &&
                              imageInfos.map((img, index) => (
                                <li className="list-group-item" key={index}>
                                  <p>
                                    <a href={img.url}>{img.name}</a>
                                  </p>
                                  <img src={img.url} alt={img.name} height="80px" />
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </div>





                    <br />

                    <h6><b>Contact information about partner</b></h6>
                    <br />
                    <div className="control-group">
                      <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
                        <label><b>Responsible person name</b></label>
                        <div class="row" >
                          <div class="form-group col-lg-10">
                            <input

                              className={"form-control"}
                              placeholder="Responsible person name"
                              aria-describedby="basic-addon1"
                              id="name"
                              type="text"
                              style={{ backgroundColor: 'white', outline: 'none', width: "1000px" }}

                              onChange={(e) => setResponsiblePerson(e.target.value)}
                              value={responsiblePerson}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="control-group">
                      <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
                        <label><b>Phone</b></label>
                        <div class="row" >
                          <div class="form-group col-lg-10">
                            <input

                              className={"form-control"}
                              placeholder="Phone"
                              aria-describedby="basic-addon1"
                              id="name"
                              type="text"
                              style={{ backgroundColor: 'white', outline: 'none', width: "1000px" }}

                              onChange={(e) => setPhone(e.target.value)}
                              value={phone}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="control-group">
                      <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
                        <label><b>Email</b></label>
                        <div class="row" >
                          <div class="form-group col-lg-10">
                            <input

                              className={"form-control"}
                              placeholder="Email"
                              aria-describedby="basic-addon1"
                              id="name"
                              type="email"
                              style={{ backgroundColor: 'white', outline: 'none', width: "1000px" }}

                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="control-group">
                      <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
                        <label><b>Web page</b></label>
                        <div class="row" >
                          <div class="form-group col-lg-10">
                            <input

                              className={"form-control"}
                              placeholder="Web page"
                              aria-describedby="basic-addon1"
                              id="name"
                              type="text"
                              style={{ backgroundColor: 'white', outline: 'none', width: "1000px" }}

                              onChange={(e) => setWebUrl(e.target.value)}
                              value={webURL}
                            />
                          </div>
                        </div>
                      </div>
                    </div>




                    <div className="form-group text-center">
                      <button
                        style={{ background: "#1977cc", marginTop: "15px", marginRight: "55px" }}

                        onClick={(e) => { handleAdd(e) }}
                        className="btn btn-primary btn-xl"
                        id="sendMessageButton"
                        type="button"
                      >
                        Add
                      </button>
                    </div>

                  </div>
                }</div></td>

          </table>
        </form>
        <div className="form-group text-center" style={{ color: "red", fontSize: "0.8em", marginTop: "30px", marginRight: "40px" }} hidden={!errMessagePartner}>
          {errMessagePartner}
        </div>
      </div>

      {
        points.length > 0 &&
        <div>
          {

            <table style={{ border: "1px solid gray" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid gray" }}>Title</th>
                  <th style={{ border: "1px solid gray" }}>Short description</th>
                  <th style={{ border: "1px solid gray" }}>Long description</th>
                  <th style={{ border: "1px solid gray" }}>Responsible person</th>
                  <th style={{ border: "1px solid gray" }}>Email</th>
                  <th style={{ border: "1px solid gray" }}>Phone</th>
                  <th style={{ border: "1px solid gray" }}>Web page</th>
                  <th style={{ border: "1px solid gray" }}>Location</th>
                </tr>
              </thead>

              {points.map((point) => (
                <tbody>
                  <tr>
                    <td style={{ border: "1px solid gray" }}>{point.title.en}</td>
                    <td style={{ border: "1px solid gray" }}>{point.shortInfo.en}</td>
                    <td style={{ border: "1px solid gray" }}>{point.longInfo.en}</td>
                    <td style={{ border: "1px solid gray" }}>{point.contact.name}</td>
                    <td style={{ border: "1px solid gray" }}>{point.contact.email}</td>
                    <td style={{ border: "1px solid gray" }}>{point.contact.phone}</td>
                    <td style={{ border: "1px solid gray" }}>{point.contact.webURL}</td>
                    <td style={{ border: "1px solid gray" }}>{`${point.location.street}  ${point.location.city} ${point.location.country} ${point.location.latitute}  ${point.location.longitude}`}</td>

                  </tr>
                </tbody>))
              }
            </table>
          }
        </div>
      }



      <div className="form-group text-center" style={{ color: "red", fontSize: "0.8em", marginTop: "30px", marginRight: "40px" }} hidden={!errMessage}>
        {errMessage}
      </div>
      <div className="form-group text-center">
        <button
          style={{ background: "#1977cc", marginTop: "15px" }}

          onClick={(e) => { handleSubmit(e) }}
          className="btn btn-primary btn-xl"
          id="sendMessageButton"
          type="button"
        >
          Add tour
        </button>
      </div>

      <br />





    </div >


  );
};
export default InsertData
