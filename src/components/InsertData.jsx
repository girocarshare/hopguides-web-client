
import React, { useContext, useEffect, useState, forwardRef, useRef } from "react";
import { homeDataService } from "../services/HomeDataService";
import { HomeDataContext } from "../contexts/HomeDataContext";
import { homeDataConstants } from "../constants/HomeDataConstants";
import TimePicker from 'react-time-picker';
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
  const [currency, setCurrency] = useState("");
  const [currencyList, setCurrencyList] = useState(["£", "€", "$"]);
  const [price, setPrice] = useState("");

  const [titlePoint, setTitlePoint] = useState("");
  const [shortInfoPoint, setShortInfoPoint] = useState("");
  const [longInfoPoint, setLongInfoPoint] = useState("");
  const [pointPrice, setPointPrice] = useState("");
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
  const [partner, setPartner] = useState(false);
  const [point, setPoint] = useState(false);

  const [mondayclosed, setMondayClosed] = useState(false);
  const [tuesdayclosed, setTuesdayClosed] = useState(false);
  const [wednesdayclosed, setWednesdayClosed] = useState(false);
  const [thursdayclosed, setThursdayClosed] = useState(false);
  const [fridayclosed, setFridayClosed] = useState(false);
  const [saturdayclosed, setSaturdayClosed] = useState(false);
  const [sundayclosed, setSundayClosed] = useState(false);

  const [errMessagePartner, setErrMessagePartner] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [errMessagePhoto, setErrMessagePhoto] = useState("");
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
  const [category, setCategory] = useState(categories[0]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [progressInfos, setProgressInfos] = useState({ val: [] });
  const [message, setMessage] = useState([]);
  const [imageInfos, setImageInfos] = useState([]);
  const progressInfosRef = useRef(null);

  const { homeDataState, dispatch } = useContext(HomeDataContext);

  const [termsAndConditions, setTermsAndConditions] = useState(homeDataState.termsAndConditionsModal.text);
  const someFetchActionCreator = () => {
    const getDocumentsInfoHandler = async () => {
      await homeDataService.getBPartners(dispatch);


    };
    getDocumentsInfoHandler();
  };

  useEffect(() => {
    someFetchActionCreator();
  }, [dispatch]);

  const selectFiles = (event) => {
    let images = [];

    if (titlePoint == "") {
      setErrMessagePhoto("Please first insert partners name")
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
    if (title == "" || audio == null || shortInfo == "" || longInfo == "" || price == "" || hotelId == "" || duration == "" || length == "" || highestPoint == "") {

      setErrMessage("Please fill in the fileds marked with *")
    } else {



      var tour = {
        title: JSON.parse(title) ,
        shortInfo: JSON.parse(shortInfo),
        longInfo: JSON.parse(longInfo),
        price: price,
        points: points,
        duration: duration,
        length: length,
        highestPoint: highestPoint,
        bpartnerId: hotelId,
        termsAndConditions: termsAndConditions,
        currency: currency


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


  const addPartner = () => {
    setPartner(true)
    setPoint(false)

  };



  const addPoint = () => {
    setPartner(false)
    setPoint(true)

  };

  const editTermsAndConditions = () => {

    dispatch({ type: homeDataConstants.SHOW_TERMS_AND_CONDITIONS_MODAL });

  };


  const handleAdd = (e) => {

    if (partner && (titlePoint == "" || shortInfoPoint == "" || longInfoPoint == "" || category == "" || price == "" || offerName == "" || responsiblePerson == "" || phone == "" || email == "" || webURL == "" || addressInput.current.value == "" || audio2 == null || selectedFiles.length == 0 || (!mondayclosed && (mondayFrom == "" || mondayTo == "")) || (!tuesdayclosed && (tuesdayFrom == "" || tuesdayTo == "")) || (!wednesdayclosed && (wednesdayFrom == "" || wednesdayTo == "")) || (!thursdayclosed && (thursdayFrom == "" || thursdayTo == "")) || (!fridayclosed && (fridayFrom == "" || fridayTo == "")) || (!saturdayclosed && (saturdayFrom == "" || saturdayTo == "")) || (!sundayclosed && (sundayFrom == "" || sundayTo == "")))) {

      setErrMessagePartner("Please insert mandatory fields for partner (marked with *)")
    } else if (point && (titlePoint == "" || shortInfoPoint == "" || longInfoPoint == "" || category == "" || addressInput.current.value == "" || audio2 == null || selectedFiles.length == 0)) {
      setErrMessagePartner("Please insert mandatory fields for point of interest (marked with *)")
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
            title: JSON.parse(titlePoint),
            shortInfo: JSON.parse(shortInfoPoint),
            longInfo: JSON.parse(longInfoPoint),
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

    homeDataService.insertData(true, dispatch);

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
    setFiles([])
    setAudios([])
    setSelectedFiles([])
    setAudio2(null)
    setTitle("")
    setLongInfo("")
    setShortInfo("")
    setPrice("")
    setDuration("")
    setHighestPoint("")
    setLength("")

    //dispatch({ type: homeDataConstants.UPDATE_MENU_PHOTO_SUCCESS });
  };
  const ErrorHandler = () => {

    //statusRef.current.innerHTML = "Upload failed";

    //dispatch({ type: homeDataConstants.UPDATE_MENU_PHOTO_FAILURE });
    homeDataService.insertData(false, dispatch);
  };
  const AbortHandler = () => {

    //statusRef.current.innerHTML = "Upload aborted";

    homeDataService.insertData(false, dispatch);
  };

  return (






    <div className="containerModal"  >

      <div >

        {homeDataState.termsAndConditionsModal.show && <div >
          <TermsAndConditionsModal
          title= {title}
            termsAndConditions={termsAndConditions}
            setTermsAndConditions={setTermsAndConditions}
          /></div>}
        <form id="contactForm" >

          <h1 class="paragraph-box" style={{ fontSize: 28 }} ><b>Add new tour</b></h1>
        
          <table style={{ marginBottom: "4rem" }}>
            <td width="1000rem"  >

              <div className="control-group">

                <div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
                  <label><b>Title*</b></label>
                  <div class="row" >
                    <div class="form-group col-lg-10">
                      <input

                        className={"form-control"}
                        placeholder="Title"
                        aria-describedby="basic-addon1"
                        id="name"
                        type="text"
                        style={{ backgroundColor: 'white', outline: 'none', width: "1000px", height: "50px" }}

                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="control-group">
                <div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
                  <label><b>Short description*</b></label>
                  <div class="row" >
                    <div class="form-group col-lg-10">
                      <textarea className="form-control" style={{ height: "100px", width: "1000px" }} type="textarea" required name="message" placeholder="Short description" value={shortInfo} onChange={(e) => setShortInfo(e.target.value)}></textarea>

                    </div>
                  </div>
                </div>
              </div>

              <div className="control-group">
                <div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
                  <label><b>Long description*</b></label>
                  <div class="row" >
                    <div class="form-group col-lg-10">
                      <textarea className="form-control" style={{ height: "200px", width: "1000px" }} type="textarea" required name="message" placeholder="Long description" value={longInfo} onChange={(e) => setLongInfo(e.target.value)}></textarea>

                    </div>
                  </div>
                </div>
              </div>


              <div className="control-group">
                <div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
                  <label><b>Price*</b></label>
                  <div class="row" >
                    <div class="form-group col-lg-10">
                      <div class="button-login">
                        <input

                          className={"form-control"}
                          placeholder="Price"
                          aria-describedby="basic-addon1"
                          id="name"
                          type="text"
                          style={{ backgroundColor: 'white', outline: 'none', width: "800px", height: "50px" }}

                          onChange={(e) => setPrice(e.target.value)}
                          value={price}
                        />
                        <select onChange={(e) => setCurrency(e.target.value)} name="currency" class="custom-select" style={{ height: "50px", width: "200px" }}>
                          {currencyList.map(item =>
                            <option key={item} value={item} >{item}</option>
                          )};

                        </select>

                      </div>

                    </div>
                  </div>
                </div>
              </div>


              <div className="control-group">
                <div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
                  <label><b>Business partner*</b></label>
                  <div class="row" >
                    <div class="form-group col-lg-10">

                      <select onChange={(e) => setHotelId(e.target.value)} name="category" class="custom-select" style={{ height: "50px", width: "1000px" }}>

                        <option key={"none"} > </option>
                        {homeDataState.bpartners.bpartners.map(item =>
                          <option key={item.id} value={item.id} >{item.name}</option>
                        )};

                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="control-group">
                <div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
                  <label><b>Tour duration*</b></label>
                  <div class="row" >
                    <div class="form-group col-lg-10">
                      <input

                        className={"form-control"}
                        placeholder="Tour duration"
                        aria-describedby="basic-addon1"
                        id="name"
                        type="text"
                        style={{ backgroundColor: 'white', outline: 'none', width: "1000px", height: "50px" }}

                        onChange={(e) => setDuration(e.target.value)}
                        value={duration}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="control-group">
                <div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
                  <label><b>Tour lenght (km)*</b></label>
                  <div class="row" >
                    <div class="form-group col-lg-10">
                      <input

                        className={"form-control"}
                        placeholder="Tour lenght (km)"
                        aria-describedby="basic-addon1"
                        id="name"
                        type="text"
                        style={{ backgroundColor: 'white', outline: 'none', width: "1000px", height: "50px" }}

                        onChange={(e) => setLength(e.target.value)}
                        value={length}
                      />
                    </div>
                  </div>
                </div>
              </div>


              <div className="control-group">
                <div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
                  <label><b>Highest point*</b></label>
                  <div class="row" >
                    <div class="form-group col-lg-10">
                      <input

                        className={"form-control"}
                        placeholder="Highest point"
                        aria-describedby="basic-addon1"
                        id="name"
                        type="text"
                        style={{ backgroundColor: 'white', outline: 'none', width: "1000px", height: "50px" }}

                        onChange={(e) => setHighestPoint(e.target.value)}
                        value={highestPoint}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "15px" }}>

                <label><b>Text to speach audio*</b></label>
                <br />   <br />
                <input type={"file"} accept={".mp3"} onChange={addFile} />
              </div>
              <div style={{ marginTop: "15px" }}>
                <label><b>Background tour image</b></label>
                <br />   <br />
                <input type={"file"} name="file" onChange={onFileChange} />

              </div>

              {fileData()}

              {imagePreview && <img className="preview" src={imagePreview} alt={"image-"} />}


              <br />
              <div className="form-group text-center">
                <button
                  style={{ background: "#f0f0f0", marginTop: "px", marginRight: "55px", border: "1px solid black", padding: "5px 15px", height: "35px" }}

                  onClick={(e) => { editTermsAndConditions(e) }}
                  className="btn btn-primary btn-xl"
                  id="sendMessageButton"
                  type="button"
                >
                  Edit terms and conditions
                </button>
              </div>



              <div className="button-tc">
                <button
                  style={{ background: "#0099ff", marginTop: "px", marginRight: "55px", padding: "5px 15px", height: "35px" }}
                  onClick={(e) => { addPartner(e) }}
                  className="btn btn-primary btn-xl"
                  id="sendMessageButton"
                  type="button"
                >
                  Add partner
                </button>

                <button
                  style={{ background: "#0099ff", marginTop: "px", marginRight: "55px", padding: "5px 15px", height: "35px" }}
                  onClick={(e) => { addPoint(e) }}
                  className="btn btn-primary btn-xl"
                  id="sendMessageButton"
                  type="button"
                >
                  Add point of interest
                </button>
              </div>









              <div>
                {(partner || point) &&
                  <div><div className="control-group">
                    <div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
                      <label><b>Name *</b></label>
                      <div class="row" >
                        <div class="form-group col-lg-10">
                          <input

                            className={"form-control"}
                            placeholder="Name"
                            aria-describedby="basic-addon1"
                            id="name"
                            type="text"
                            style={{ backgroundColor: 'white', outline: 'none', width: "1000px", height: "50px" }}

                            onChange={(e) => setTitlePoint(e.target.value)}
                            value={titlePoint}
                          />

                        </div>
                      </div>
                    </div>
                  </div>

                    <div className="control-group">
                      <div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
                        <label><b>Short description* </b></label>
                        <div class="row" >
                          <div class="form-group col-lg-10">
                            <textarea className="form-control" style={{ height: "100px", width: "1000px" }} type="textarea" required name="message" placeholder="Short description" value={shortInfoPoint} onChange={(e) => setShortInfoPoint(e.target.value)}></textarea>

                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="control-group">
                      <div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
                        <label><b>Long description*</b></label>
                        <div class="row" >
                          <div class="form-group col-lg-10">
                            <textarea className="form-control" style={{ height: "200px", width: "1000px" }} type="textarea" required name="message" placeholder="Long description" value={longInfoPoint} onChange={(e) => setLongInfoPoint(e.target.value)}></textarea>

                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="control-group">
                      <div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
                        <label><b>Category*</b></label>
                        <div class="row" >
                          <div class="form-group col-lg-10">

                            <select onChange={(e) => setCategory(e.target.value)} name="category" class="custom-select" style={{ height: "50px", width: "1000px" }}>
                              {categories.map(item =>
                                <option key={item} value={item} >{item}</option>
                              )};

                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {partner && <div className="control-group">
                      <div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
                        <label><b>Price*</b></label>
                        <div class="row" >
                          <div class="form-group col-lg-10">
                          <div class="button-login">
                            <input

                              className={"form-control"}
                              placeholder="Price"
                              aria-describedby="basic-addon1"
                              id="name"
                              type="text"
                              style={{ backgroundColor: 'white', outline: 'none', width: "800px", height: "50px" }}

                              onChange={(e) => setPointPrice(e.target.value)}
                              value={pointPrice}
                            />

                            <select onChange={(e) => setCurrency(e.target.value)} name="currency" class="custom-select" style={{ height: "50px", width: "200px" }}>
                              {currencyList.map(item =>
                                <option key={item} value={item} >{item}</option>
                              )};

                            </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>}
                    {partner && <div className="control-group">
                      <div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
                        <label><b>Offer name*</b></label>
                        <div class="row" >
                          <div class="form-group col-lg-10">
                            <input

                              className={"form-control"}
                              placeholder="Offer name"
                              aria-describedby="basic-addon1"
                              id="name"
                              type="text"
                              style={{ backgroundColor: 'white', outline: 'none', width: "1000px", height: "50px" }}

                              onChange={(e) => setOfferName(e.target.value)}
                              value={offerName}
                            />
                          </div>
                        </div>
                      </div>
                    </div>}

                    <div >

                      <label><b>Address *</b></label>
                      <div >

                        <input id="suggest" ref={addressInput} placeholder="Address" style={{ width: "1000px", height: "50px" }} />

                        <YMaps
                          query={{
                            load: "package.full",
                            apikey: "b0ea2fa3-aba0-4e44-a38e-4e890158ece2",
                            lang: "en_RU",
                          }}
                        >
                          <Map
                            style={{ display: "none", width: "100px", marginLeft: "100px" }}
                            state={mapState}
                            onLoad={onYmapsLoad}
                            instanceRef={(map) => (map = map)}
                            modules={["coordSystem.geo", "geocode", "util.bounds"]}
                          ></Map>
                        </YMaps>
                      </div>
                    </div>

                    {partner &&
                      <div><h6><b>Working hours *</b></h6>
                        <br />

                        <div className="control-group">
                          <div className="form-group controls mb-0 pb-2" style={{ opacity: 1, marginLeft: "300px" }}>
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
                                <TimePicker disableClock={true} onChange={(newValue) => {
                                  setMondayFrom(newValue);
                                }} value={mondayFrom} />
                              </span>  <span >
                                <TimePicker disableClock={true} onChange={(newValue) => {
                                  setMondayTo(newValue);
                                }} value={mondayTo} /></span>


                            </div>}
                          </div>
                        </div>

                        <div className="control-group">
                          <div className="form-group controls mb-0 pb-2" style={{ opacity: 1, marginLeft: "300px" }}>
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
                                <TimePicker disableClock={true} onChange={(newValue) => {
                                  setTuesdayFrom(newValue);
                                }} value={tuesdayFrom} />
                              </span>  <span >
                                <TimePicker disableClock={true} onChange={(newValue) => {
                                  setTuesdayTo(newValue);
                                }} value={tuesdayTo} /></span>
                            </div>}
                          </div>
                        </div>

                        <div className="control-group">
                          <div className="form-group controls mb-0 pb-2" style={{ opacity: 1, marginLeft: "300px" }}>
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
                                <TimePicker disableClock={true} onChange={(newValue) => {
                                  setWednesdayFrom(newValue);
                                }} value={wednesdayFrom} />
                              </span>  <span >
                                <TimePicker disableClock={true} onChange={(newValue) => {
                                  setWednesdayTo(newValue);
                                }} value={wednesdayTo} /></span>


                            </div>}
                          </div>
                        </div>

                        <div className="control-group">
                          <div className="form-group controls mb-0 pb-2" style={{ opacity: 1, marginLeft: "300px" }}>
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
                                <TimePicker disableClock={true} onChange={(newValue) => {
                                  setThursdayFrom(newValue);
                                }} value={thursdayFrom} />
                              </span>  <span >
                                <TimePicker disableClock={true} onChange={(newValue) => {
                                  setThursdayTo(newValue);
                                }} value={thursdayTo} /></span>


                            </div>}
                          </div>
                        </div>

                        <div className="control-group">
                          <div className="form-group controls mb-0 pb-2" style={{ opacity: 1, marginLeft: "300px" }}>
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
                                <TimePicker disableClock={true} onChange={(newValue) => {
                                  setFridayFrom(newValue);
                                }} value={fridayFrom} />
                              </span>  <span >
                                <TimePicker disableClock={true} onChange={(newValue) => {
                                  setFridayTo(newValue);
                                }} value={fridayTo} /></span>


                            </div>}
                          </div>
                        </div>

                        <div className="control-group">
                          <div className="form-group controls mb-0 pb-2" style={{ opacity: 1, marginLeft: "300px" }}>
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
                                <TimePicker disableClock={true} onChange={(newValue) => {
                                  setSaturdayFrom(newValue);
                                }} value={saturdayFrom} />
                              </span>  <span >
                                <TimePicker disableClock={true} onChange={(newValue) => {
                                  setSaturdayTo(newValue);
                                }} value={saturdayTo} /></span>

                            </div>}
                          </div>
                        </div>

                        <div className="control-group">
                          <div className="form-group controls mb-0 pb-2" style={{ opacity: 1, marginLeft: "300px" }}>
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
                                <TimePicker disableClock={true} onChange={(newValue) => {
                                  setSundayFrom(newValue);
                                }} value={sundayFrom} />
                              </span>  <span >
                                <TimePicker disableClock={true} onChange={(newValue) => {
                                  setSundayTo(newValue);
                                }} value={sundayTo} /></span>

                            </div>}
                          </div>
                        </div>

                      </div>}

                    <div style={{ marginTop: "15px" }}>

                      <label><b>Text to speach audio*</b></label>
                      <br /><br />
                      <input type={"file"} accept={".mp3"} onChange={addFile2} />
                    </div>

                    <br />
                    <div>

                      <label><b>Image gallery*</b></label>
                      <br /><br />
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
                              <div>
                                <br />
                                <img className="preview" src={img} alt={"image-" + i} key={i} />
                              </div>
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
                          <br />
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



                    {titlePoint.length == 0 && <div className="paragraph-box2" style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }} hidden={!errMessagePhoto}>
                      {errMessagePhoto}
                    </div>}

                    <br />

                    {partner &&
                      <div><h6><b>Contact information about partner*</b></h6>
                        <br />
                        <div className="control-group">
                          <div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
                            <label><b>Responsible person name*</b></label>
                            <div class="row" >
                              <div class="form-group col-lg-10">
                                <input

                                  className={"form-control"}
                                  placeholder="Responsible person name"
                                  aria-describedby="basic-addon1"
                                  id="name"
                                  type="text"
                                  style={{ backgroundColor: 'white', outline: 'none', width: "1000px", height: "50px" }}

                                  onChange={(e) => setResponsiblePerson(e.target.value)}
                                  value={responsiblePerson}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="control-group">
                          <div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
                            <label><b>Phone*</b></label>
                            <div class="row" >
                              <div class="form-group col-lg-10">
                                <input

                                  className={"form-control"}
                                  placeholder="Phone"
                                  aria-describedby="basic-addon1"
                                  id="name"
                                  type="text"
                                  style={{ backgroundColor: 'white', outline: 'none', width: "1000px", height: "50px" }}

                                  onChange={(e) => setPhone(e.target.value)}
                                  value={phone}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="control-group">
                          <div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
                            <label><b>Email*</b></label>
                            <div class="row" >
                              <div class="form-group col-lg-10">
                                <input

                                  className={"form-control"}
                                  placeholder="Email"
                                  aria-describedby="basic-addon1"
                                  id="name"
                                  type="email"
                                  style={{ backgroundColor: 'white', outline: 'none', width: "1000px", height: "50px" }}

                                  onChange={(e) => setEmail(e.target.value)}
                                  value={email}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="control-group">
                          <div className="form-group controls mb-0 pb-2" style={{ opacity: 1 }}>
                            <label><b>Web page*</b></label>
                            <div class="row" >
                              <div class="form-group col-lg-10">
                                <input

                                  className={"form-control"}
                                  placeholder="Web page"
                                  aria-describedby="basic-addon1"
                                  id="name"
                                  type="text"
                                  style={{ backgroundColor: 'white', outline: 'none', width: "1000px", height: "50px" }}

                                  onChange={(e) => setWebUrl(e.target.value)}
                                  value={webURL}
                                />
                              </div>
                            </div>
                          </div>
                        </div>


                      </div>}


                    <div className="button-p">
                      <button
                        style={{ background: "#0099ff", marginTop: "px", marginRight: "55px", padding: "5px 15px", height: "35px" }}

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
        <div className="paragraph-box2" style={{ color: "red", fontSize: "0.8em", marginTop: "30px" }} hidden={!errMessagePartner}>
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
      <div className="paragraph-box2" style={{ color: "red", fontSize: "0.8em", marginTop: "30px", marginRight: "40px" }} hidden={!errMessage}>
        {errMessage}
      </div>
      <div className="button-p">
        <button
          style={{ background: "#0099ff", marginTop: "px", marginRight: "55px", padding: "5px 15px", height: "35px" }}

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
