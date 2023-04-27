



import { useContext, React, useEffect, useState, forwardRef } from "react";
import { useParams } from 'react-router-dom';

import { HomeDataContext } from "../contexts/HomeDataContext";
import { homeDataService } from "../services/HomeDataService";

var url = process.env.REACT_APP_URL || "http://localhost:8080/";

const QRCodesData = forwardRef((props, ref) => {
    const { homeDataState, dispatch } = useContext(HomeDataContext);

    let { tourId } = useParams()
    const someFetchActionCreator = () => {
        const getReportInfoHandler = async () => {
            console.log(tourId)
            await homeDataService.getQrCodes(dispatch, tourId);
        };


        getReportInfoHandler();
    }


    useEffect(() => {
        window.scrollTo(0, 0);

        someFetchActionCreator()
    }, [dispatch]);

    const someFetchActionCreatorCode = () => {
        const getReportInfoHandler = async () => {
            await homeDataService.generateQrCode(dispatch, tourId);
        };

        getReportInfoHandler();
    }
    const createQrCode = (e) => {

        someFetchActionCreatorCode()
        // dispatch({ type: homeDataConstants.SHOW_ADD_QR_CODE_MODAL });
    };

    return (

        <div class="login-page" >


            <h4 class="paragraph-box" style={{ fontSize: 20 }} >QR CODES</h4>

            <div class="button-login">

                <button
                    type="button" style={{ background: "#0099ff", marginTop: "px", marginRight: "55px", padding: "5px 15px", height: "35px" }}
                    onClick={(e) => createQrCode(e)}
                    class="btn btn-primary btn-lg"
                >
                    Create new QR code
                </button>
            </div>

            {homeDataState.qr &&
            <div className="row mt-5">
                

                    <div class="home-box">


                        <div>
                            <img src={homeDataState.qr} style={{ height: "200px" , width: "200px"}} ></img>
                            <h1 style={{ fontSize: 20 }}><b>{homeDataState.qrCode.qrCodeId} </b></h1>
                            <h1 style={{ fontSize: 20 }}><b>{homeDataState.qrCode.code} </b></h1>

                        </div>

                    </div>
                

            </div>
}
            <div class="contact-box">
                {
                    <table style={{ border: "1px solid gray", width: 1400, background: "white" }}>
                        <thead>


                            <tr>
                                <th style={{ border: "1px solid gray" }}>Qr Code</th>
                                <th style={{ border: "1px solid gray" }}>Code</th>
                                <th style={{ border: "1px solid gray" }}>Qr code id</th>
                                <th style={{ border: "1px solid gray" }}>Used</th>
                            </tr>
                        </thead>

                        {homeDataState.qrCodes.map((qrcode) => (
                            <tbody>
                                <tr >
                                    <td style={{ border: "1px solid gray" }}><img src={qrcode.qrcode}></img></td>
                                    <td style={{ border: "1px solid gray" }}>{qrcode.code}</td>
                                    <td style={{ border: "1px solid gray" }}>{qrcode.qrCodeId}</td>
                                    <td style={{ border: "1px solid gray" }}>{qrcode.used.toString()}</td>

                                </tr>
                            </tbody>))
                        }
                    </table>
                }
            </div>


        </div>
    )
});

export default QRCodesData;