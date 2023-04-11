
import { useContext, React, useEffect, useState, useRef, useCallback } from "react";
import { useParams } from 'react-router-dom';
import { ReportContext } from "../contexts/ReportContext";
import { reportService } from "../services/ReportService";
import { reportConstants } from "../constants/ReportConstants";
import { deleteLocalStorage, authHeader } from "../helpers/auth-header";
import Axios from "axios";
import ReactToPrint from 'react-to-print';
import Report from './Report';
var url = process.env.REACT_APP_URL || "http://localhost:8080/";

const ReportPrint = () => {

    const componentRef = useRef();
    const { reportState, dispatch } = useContext(ReportContext);

    
    let { id } = useParams()
    const someFetchActionCreator = () => {
        const getReportInfoHandler = async () => {
            await reportService.getReport(dispatch, id);
        };


        getReportInfoHandler();
    }


    useEffect(() => {

       
       /* var token = authHeader()
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

*/
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
        <div class="login-page">

            <div >


            <div class='parent'>

               {/* {!role && */}
               <div >
                    <button
                        type="button"
                        onClick={handleLogin}
                        class="child float-left-child"
                        style={{marginLeft: "30px "}}
                    >
                        Log in
                    </button>
                </div>
                {/*}*/}

                  {/* {role && */}<div>
                    <button
                        type="button"
                        onClick={handleLogout}
                        class='child float-left-child'
                        style={{marginLeft: "30px "}}
                    >
                        Log out
                    </button>

                </div> 
                {/*}*/}


                <ReactToPrint
                    trigger={() => <div class=" button-login"> <button class='child float-left-child'>Print out page</button></div>}
                    content={() => componentRef.current}
                />
                </div>
                <Report ref={componentRef} />
            </div>

        </div>



    );
};

export default ReportPrint;
