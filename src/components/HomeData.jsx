import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useContext,
  useRef
} from "react";
import { HomeDataContext } from "../contexts/HomeDataContext";
import { homeDataService } from "../services/HomeDataService";
import { homeDataConstants } from "../constants/HomeDataConstants";
import { MdOutlineModeEditOutline, MdLaunch } from 'react-icons/md';
import Axios from "axios";
import { deleteLocalStorage, authHeader } from "../helpers/auth-header";
import AddNewTourForm from "./AddNewTourForm";

var url = process.env.REACT_APP_URL || "http://localhost:8080/";


const HomeData = forwardRef((props, ref) => {

  const { homeDataState, dispatch } = useContext(HomeDataContext);
  const [users, setUsers] = useState([]);
  const [tours, setTours] = useState(props.data);
  const [tourPrice, setTourPrice] = useState("");
  const [rowId, setRowId] = useState("");
  const [rowIdTour, setRowIdTour] = useState("");
  const [role, setRole] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [adminOnly, setAdminOnly] = useState(false);
  const [updateField, setUpdateField] = useState("Update");
  const [updatePartner, setUpdatePartner] = useState("Update");
  const [editTourPrice, setEditTourPrice] = useState(false);
  const [editResponsiblePerson, setEditResponsiblePerson] = useState(false);
  const [responsiblePerson, setResponsiblePerson] = useState("");
  const [editContactEmail, setEditContactEmail] = useState(false);
  const [contactEmail, setContactEmail] = useState("");
  const [editContactPhone, setEditContactPhone] = useState(false);
  const [contactPhone, setContactPhone] = useState("");
  const [editPartner, setEditPartner] = useState(false);
  const [partnerPrice, setPartnerPrice] = useState("");
  const [editOfferName, setEditOfferName] = useState(false);
  const [offerName, setOfferName] = useState("");
  const someFetchActionCreator = () => {
    const getDocumentsInfoHandler = async () => {
      await homeDataService.getData(dispatch);
      await homeDataService.getToursAndPointsData(dispatch);


    };


    getDocumentsInfoHandler();
  };



  const handleLogout = () => {
    deleteLocalStorage();
    window.location = "#/login";
  };
  useEffect(() => {
    var token = authHeader()
    if (token == "null") {
      window.location = "#/unauthorized";
    } else {

      Axios.get(`${url}api/users/getRole`, { headers: { Authorization: token } }, { validateStatus: () => true },
      )
        .then((res) => {
          if (res.status === 200) {
            if ("BPARTNER" == res.data) {

              setRole(true)
            }

            if ("PROVIDER" == res.data) {

              setRole(true)
              setAdmin(true)
            }

            if ("ADMIN" == res.data) {

              setAdminOnly(true)
              setAdmin(true)
            }
          }
        })
        .catch((err) => {

        })
    }
    setTours(homeDataState.toursWithPoints.toursWithPoints)
    var contactUser = {
      name: "Danijel Omrzel",
      email: "danijel.omrzel@visitlljubljana.si",
      number: "0038641386295"
    }
    var arr = []
    arr.push(contactUser)
    setUsers(arr)
  }, [dispatch]);

  const getHistory = (e, data) => {
    console.log(data)
    const getDocumentsInfoHandlerr = async () => {
      await homeDataService.getPreviousMonthsData(dispatch, data);
    };

    getDocumentsInfoHandlerr();
  };



  const getQrCode = (e, data) => {
    homeDataService.getQrCode(dispatch, data);
  };



  const visitWebsite = (e, data) => {

    window.location = "#/report/" + data;
  };


  const updateMenu = (e, data) => {

    dispatch({ type: homeDataConstants.SHOW_ADD_MENU_MODAL, data });
  };


  const addNew = (e) => {

    dispatch({ type: homeDataConstants.SHOW_ADD_MODAL });
  };
  const addNewPartner = (e, id) => {

    console.log(id)
    dispatch({ type: homeDataConstants.SHOW_ADD_PARTNER_MODAL, id: id });
  };


  const onUpdatePoint = (oldData, newData) => {

    const getUpdateHandlerr = async () => {
      return await homeDataService.updatePoint(dispatch, oldData);
    };

    return getUpdateHandlerr();

  };
  const onUpdate = async (oldData, newData) => {

    const getUpdateHandlerr = async () => {
      return await homeDataService.updateTour(dispatch, oldData);
    };


    return await getUpdateHandlerr();


  };
  const handleLogin = () => {
    window.location.href = "#/login"
  };


  const handleRegister = () => {
    window.location.href = "#/register"
  };



  const updateTourPrice = (e, tour) => {


    if (updateField == "Update") {
      setEditTourPrice(true)
      setRowIdTour(tour.tourId)
      setUpdateField("Finish")
      setTourPrice(tour.price)
    } else {
      setEditTourPrice(false)
      setRowIdTour("")
      setUpdateField("Update")
      if (tourPrice == "") {
        setTourPrice(`${tour.price} ${tour.currency} incl tax`)
      } else {

        setTourPrice(`${tourPrice} ${tour.currency} incl tax`)
      }
      var data = {
        noOfRidesAMonth: tour.noOfRidesAMonth,
        tourId: tour.tourId,
        tourName: tour.tourName,
        price: tourPrice,

      }

      onUpdate(data, "")
    }
  };




  const updatePartnerPrice = (e, point, tour) => {



    if (updatePartner == "Update") {
      setEditPartner(true)
      setRowId(point.point.id)
      setUpdatePartner("Finish")
      if (responsiblePerson == "") {
        setResponsiblePerson(`${point.point.contact.name}`)
      }

      if (contactEmail == "") {
        setContactEmail(`${point.point.contact.email}`)
      }

      if (contactPhone == "") {
        setContactPhone(`${point.point.contact.phone}`)
      }


      setPartnerPrice(point.point.price)



      if (offerName == "") {
        setOfferName(`${point.point.offerName}`)
      }

    } else {
      setEditPartner(false)
      setUpdatePartner("Update")
      setRowId("")
      if (partnerPrice == "") {
        setPartnerPrice(`${point.point.price} ${tour.currency} incl tax`)
      } else {

        setPartnerPrice(`${partnerPrice} ${tour.currency} incl tax`)
      }
      console.log(point)
      var data = {
        point: {
          bpartnerId: point.point.bpartnerId,
          contact: { phone: contactPhone, name: responsiblePerson, email: contactEmail, webURL: point.point.contact.webURL },
          id: point.point.id,
          location: point.point.location,
          longInfo: point.point.longInfo,
          offerName: offerName,
          price: partnerPrice,
          shortInfo: point.point.shortInfo,
          title: point.point.title,
          workingHours: point.point.workingHours,
        }
      }

      console.log(data)
      onUpdatePoint(data, "")
    }
  };


  return (

    <div class="login-page" >

      {homeDataState.showModal && <div >
        <AddNewTourForm />
      </div>}
      {role &&
        <div class="button-login">

          <button
            type="button"
            style={{ background: "#0099ff", marginTop: "px", marginRight: "55px", padding: "5px 15px", height: "35px" }}
            onClick={handleLogin}
            class="btn btn-primary btn-lg"
          >
            Log in
          </button>
        </div>
      }

      {!role &&
        <div class=" button-login">
          <button
            type="button"
            style={{ background: "#0099ff", marginTop: "px", marginRight: "55px", padding: "5px 15px", height: "35px" }}
            onClick={handleLogout}
            class="btn btn-primary btn-lg"
          >
            Log out
          </button>
        </div>
      }
      <br />
      {adminOnly &&
        <div class="button-login">

          <button
            type="button" style={{ background: "#0099ff", marginTop: "px", marginRight: "55px", padding: "5px 15px", height: "35px" }}
            onClick={handleRegister}
            class="btn btn-primary btn-lg"
          >
            Register new user
          </button>
        </div>
      }





      <h1 class="paragraph-box" style={{ fontSize: 28 }} ><b>Tourism Ljubljana</b></h1>
      <div class="contact-box">

        <table style={{ border: "1px solid gray", width: 1400, background: "white" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid gray" }}> </th>
              <th style={{ border: "1px solid gray" }}>Name</th>
              <th style={{ border: "1px solid gray" }}>Email</th>
              <th style={{ border: "1px solid gray" }}>Number</th>
            </tr>
          </thead>

          {users.map((point) => (
            <tbody>
              <tr>
                <td style={{ border: "1px solid gray" }}>{point.name}</td>
                <td style={{ border: "1px solid gray" }}>{point.email}</td>
                <td style={{ border: "1px solid gray" }}>{point.number}</td>

              </tr>
            </tbody>))
          }
        </table>

      </div>
      <h4 class="paragraph-box" style={{ fontSize: 20 }} >Tours</h4>


      <div class="contact-box">
        {
          <table style={{ border: "1px solid gray", width: 1400, background: "white" }}>
            <thead>


              <tr>
                <th style={{ border: "1px solid gray" }}>Name</th>
                <th style={{ border: "1px solid gray" }}>Price</th>
                <th style={{ border: "1px solid gray" }}>Number of executed tours for current month</th>
                <th style={{ border: "1px solid gray" }}>Get monthly report</th>
                <th style={{ border: "1px solid gray" }}>Update</th>
              </tr>
            </thead>

            {homeDataState.toursWithPoints.toursWithPoints.map((tour) => (
              <tbody>
                <tr >
                  <td style={{ border: "1px solid gray" }} id={tour.tourId} onClick={(e) => {

                    const element = document.getElementById(tour.tourId);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }



                  }}>{tour.title}</td>
                  <td style={{ border: "1px solid gray" }}>
                    <input
                      readOnly={!editTourPrice || rowIdTour != tour.tourId}
                      placeholder={editTourPrice === true ? `${tour.price}` : "Insert price"}
                      aria-describedby="basic-addon1"
                      id="name"
                      type="text"
                      style={{ backgroundColor: editTourPrice === true && rowIdTour == tour.tourId ? '#DCDCDC' : 'white', outline: 'none' }}
                      onChange={(e) => setTourPrice(e.target.value)}
                      value={tourPrice === "" ? `${tour.price} ${tour.currency} incl tax` : tourPrice}
                    />
                  </td>
                  <td style={{ border: "1px solid gray" }}>{tour.noOfRidesAMonth}</td>
                  <td style={{ border: "1px solid gray" }}><button onClick={(e) => getHistory(e, tour.tourId)} >Get report</button></td>
                  <td style={{ border: "1px solid gray" }}><button onClick={(e) => updateTourPrice(e, tour)} >{updateField}</button></td>

                </tr>
              </tbody>))
            }
          </table>
        }
      </div>

      {homeDataState.toursWithPoints.toursWithPoints.map((tour, i) =>

        <div style={{ marginTop: "100px" }} id={tour.tourId}>

          <div class="contact-box">
            {
              <table style={{ border: "1px solid gray", width: 1400, background: "white" }}>
                <thead>
                  <tr>
                    {admin && <button
                      style={{ background: "#0099ff", marginTop: "px", marginRight: "55px", padding: "5px 15px", height: "35px" }}
                      color="primary"
                      variant="contained"
                      onClick={(e) => addNewPartner(e, tour.tourId)}
                    >
                      Add partner
                    </button>}
                  </tr>

                  <tr>
                    <th style={{ border: "1px solid gray" }}>Visit website</th>
                    <th style={{ border: "1px solid gray" }}>Partners</th>
                    <th style={{ border: "1px solid gray" }}>Responsible person</th>
                    <th style={{ border: "1px solid gray" }}>Contact email</th>
                    <th style={{ border: "1px solid gray" }}>Contact phone</th>
                    <th style={{ border: "1px solid gray" }}>Price</th>
                    <th style={{ border: "1px solid gray" }}>Offer name</th>
                    <th style={{ border: "1px solid gray" }}>Coupons realized by partner in current month </th>
                    <th style={{ border: "1px solid gray" }}>Update menu photo</th>
                    <th style={{ border: "1px solid gray" }}>Generate QR code</th>
                    <th style={{ border: "1px solid gray" }}>Update</th>
                  </tr>
                </thead>

                {tour.points.map((points) => (
                  <tbody>
                    <tr >
                      <td style={{ border: "1px solid gray" }}><button
                        color="inherit"
                        onClick={(event) => {

                          visitWebsite(event, points.point.id)
                        }}
                      >
                        <MdLaunch />

                      </button></td>
                      <td style={{ border: "1px solid gray" }}>{points.point.name}</td>
                      <td style={{ border: "1px solid gray" }}>
                        <input
                          readOnly={!editPartner || rowId != points.point.id}
                          placeholder={editPartner === true ? points.point.contact.name : "Responsible person"}
                          aria-describedby="basic-addon1"
                          id="name"
                          type="text"
                          style={{ backgroundColor: editPartner === true && rowId == points.point.id ? '#DCDCDC' : 'white', outline: 'none' }}
                          onChange={(e) => setResponsiblePerson(e.target.value)}
                          value={responsiblePerson === "" ? `${points.point.contact.name} ` : responsiblePerson}
                        />
                      </td>
                      <td style={{ border: "1px solid gray" }}>
                        <input
                          readOnly={!editPartner || rowId != points.point.id}
                          placeholder={editPartner === true ? points.point.contact.email : "Contact email"}
                          aria-describedby="basic-addon1"
                          id="name"
                          type="text"
                          style={{ backgroundColor: editPartner === true && rowId == points.point.id ? '#DCDCDC' : 'white', outline: 'none' }}
                          onChange={(e) => setContactEmail(e.target.value)}

                          value={contactEmail === "" ? `${points.point.contact.email} ` : contactEmail}
                        />
                      </td>
                      <td style={{ border: "1px solid gray" }}>
                        <input
                          readOnly={!editPartner || rowId != points.point.id}
                          placeholder={editPartner === true ? points.point.contact.phone : "Contact phone"}
                          aria-describedby="basic-addon1"
                          id="name"
                          type="text"
                          style={{ backgroundColor: editPartner === true && rowId == points.point.id ? '#DCDCDC' : 'white', outline: 'none' }}
                          onChange={(e) => setContactPhone(e.target.value)}
                          value={contactPhone === "" ? `${points.point.contact.phone} ` : contactPhone}
                        />
                      </td>
                      <td style={{ border: "1px solid gray" }}>
                        <input
                          readOnly={!editPartner || rowId != points.point.id}
                          placeholder={editPartner === true ? points.point.price : "Price"}
                          aria-describedby="basic-addon1"
                          id="name"
                          type="text"
                          style={{ backgroundColor: editPartner === true && rowId == points.point.id ? '#DCDCDC' : 'white', outline: 'none' }}
                          onChange={(e) => setPartnerPrice(e.target.value)}
                          value={partnerPrice === "" ? `${points.point.price} ${tour.currency} incl tax` : partnerPrice}
                        />
                      </td>
                      <td style={{ border: "1px solid gray" }}>
                        <input
                          readOnly={!editPartner || rowId != points.point.id}
                          placeholder={editPartner === true ? points.point.offerName : "Offer name"}
                          aria-describedby="basic-addon1"
                          id="name"
                          type="text"
                          style={{ backgroundColor: editPartner === true && rowId == points.point.id ? '#DCDCDC' : 'white', outline: 'none' }}
                          onChange={(e) => setOfferName(e.target.value)}
                          value={offerName === "" ? `${points.point.offerName} ` : offerName}
                        />
                      </td>

                      <td style={{ border: "1px solid gray" }}>{points.monthlyUsed}</td>

                      <td style={{ border: "1px solid gray" }}>  <button
                        color="inherit"
                        onClick={(event) => {
                          updateMenu(event, points.point.id)
                        }}
                      >

                        <MdOutlineModeEditOutline />
                      </button></td>
                      <td style={{ border: "1px solid gray" }}>
                        <button
                          color="inherit"
                          onClick={(event) => {
                            getQrCode(event, points.point.id)
                          }}
                        >
                          Get QR code
                        </button></td>
                      <td style={{ border: "1px solid gray" }}><button onClick={(e) => updatePartnerPrice(e, points, tour)} >{updatePartner}</button></td>

                    </tr>
                  </tbody>))}
              </table>
            }
          </div>



        </div>
      )}

      <div style={{ marginTop: "100px" }} ><p> <br /><br />     </p></div>
    </div>

  );
});

export default HomeData
