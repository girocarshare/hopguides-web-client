
import { useContext, React, useEffect, useState , forwardRef} from "react";
import { useParams } from 'react-router-dom';
import { ReportContext } from "../contexts/ReportContext";
import { reportService } from "../services/ReportService";
import { reportConstants } from "../constants/ReportConstants";
import { deleteLocalStorage, authHeader } from "../helpers/auth-header";
import Axios from "axios";

var url = process.env.REACT_APP_URL || "http://localhost:8080/";

const Report = forwardRef(( props, ref ) => {
    const { reportState, dispatch } = useContext(ReportContext);

    const [role, setRole] = useState(false);
    const [admin, setAdmin] = useState(false);
    let { id } = useParams()
    const someFetchActionCreator = () => {
        const getReportInfoHandler = async () => {
            await reportService.getReport(dispatch, id);
            await reportService.getMenu(dispatch, id);
        };


        getReportInfoHandler();
    }


    useEffect(() => {
        window.scrollTo(0, 0);
        var token = authHeader()
        if (token == "null") {
            // window.location = "#/unauthorized";
        } else {

            Axios.get(`${url}api/users/getRole`, { headers: { Authorization: token } }, { validateStatus: () => true },
            )
                .then((res) => {
                    if (res.status === 200) {
                        if ("BPARTNER" == res.data) {

                            setRole(true)
                        }

                        if ("ADMIN" == res.data || "PROVIDER" == res.data) {

                            setRole(true)
                            setAdmin(true)
                        }
                    }
                })
                .catch((err) => {

                })
        }


        someFetchActionCreator()
    }, [dispatch]);


    const handleShowModal = () => {
        dispatch({ type: reportConstants.SHOW_ADD_MENU_MODAL });
    };

    const handleLogin = () => {
        window.location.href = "#/login"
    };


    const handleLogout = () => {
        deleteLocalStorage();
        window.location = "#/login";
    };


    function BoldText({ children }) {
        return (
            <span style={{ fontWeight: 'bold' }}>{children}</span>
        );
    }

    function ColorText({ children }) {
        return (
            <span style={{ color: 'green' }}>{children}</span>
        );
    }

    function ColorTextRed({ children }) {
        return (
            <span style={{ color: 'red' }}>{children}</span>
        );
    }

    return (
        <div class="login-page" ref={ref}>
           

            <div class="hotelcontact-box" >
                <p style={{ fontWeight: "bold" }}>Provider name:  {reportState.report.bpartnerName} </p>

                <p style={{ fontWeight: "bold" }}> Contact: </p><p>Email: {reportState.report.bpartnerEmail} </p><p> Primary phone: {reportState.report.bpratnerPhone}</p><p> Secondary phone: {reportState.report.bpratnerPhone2}</p>


            </div>


            <div class="home-box">

                <p class="paragraph-box2">This is <b>{reportState.report.bpartnerName}</b> tourist package with digital tour guide GoGiro. You are included in <b>{reportState.report.name}</b> package <b>{reportState.report.offerName}</b>.  When the guest shows you a non used QR code this is valid confirmation that tourist has bought a <b>{reportState.report.name}</b> package
                </p><br />

                <h3><b>Tour name</b>:  {reportState.report.name}</h3>
                <h3><b>Monthly usage</b>:  {reportState.report.monthlyUsedCoupons || 0}</h3>
                <a class="abutton" href={"http://localhost:3000/#/previousReports/" + id}>Get previous reports</a>
            </div>



            <h4 class="header2">Instructions</h4>
            <p class="paragraph-box2">1.  Using the camera on your phone please scan the users/customer QR code    </p><br />
            <p class="paragraph-box2" >2. After scanning the QR code, please check the provided feedback on your phone. </p><br />
            <ul class="ul-box2">
                <li>If the QR code is <ColorText>VALID</ColorText> please serve the customer<BoldText> »home made« Sirove Štruklje </BoldText>as included in the tour.
                </li>
            </ul>

            <div class="image-box">
                {

                    <img alt="" src="/assets/img/Screenshot_2.png" />

                }
            </div>

            <ul class="ul-box2">
                <li>If the QR code is <ColorTextRed>NOT VALID</ColorTextRed>  the user has not paid for the experience or has already used the said QR code

                </li>
            </ul>

            <div class="image-box">
                {

                    <img alt="" src="/assets/img/Screenshot_1.png" />

                }
            </div>

            <h4 class="header2">   </h4>
            <div class="paragraph-box" >


                <h1 style={{ fontSize: 28 }} ><b>Offer name</b>:  {reportState.report.offerName}</h1>

            </div>

           {admin && 
           <div class=" button-p">
                <button
                    type="button"
                    style= {{color: "black" }}
                    onClick={handleShowModal}
                    class="btn btn-primary btn-lg"
                >
                    Update menu image
                </button>
            </div>
            }


            <div class="menu-box">
                {
                    reportState.image ? (
                        <img alt="" src={reportState.image}/>//src = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"/>//src={reportState.image} />
                    ) : (
                        null
                    )
                }
            </div>
        </div>
)});

export default Report;