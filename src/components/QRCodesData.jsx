
import { useContext, React, useEffect, useState, forwardRef } from "react";
import { useParams } from 'react-router-dom';

import { HomeDataContext } from "../contexts/HomeDataContext";
import { homeDataService } from "../services/HomeDataService";
import { AiOutlineClose } from 'react-icons/ai';

var url = process.env.REACT_APP_URL || "http://localhost:8080/";

const QRCodesData = forwardRef((props, ref) => {
    const { homeDataState, dispatch } = useContext(HomeDataContext);
    const [number, setNumber] = useState(0);
    const [clicked, setClicked] = useState(false);

    let { tourId } = useParams()
    const someFetchActionCreator = () => {
        const getReportInfoHandler = async () => {
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
            await homeDataService.generateQrCode(dispatch, tourId, number);
        };

        getReportInfoHandler();
    }
    const createQrCode = (e) => {

        setClicked(true)
        someFetchActionCreatorCode()
        // dispatch({ type: homeDataConstants.SHOW_ADD_QR_CODE_MODAL });
    };
    const handleModalClose = () => {
        window.location = "/#/"
    };

    return (

        <div >
            <div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div class="modal-overlay"></div>

                <div class="fixed inset-0 z-10 overflow-y-auto">

                    <div class="modal-frame">

                        <div id="myModal" class="modal modal--3xl">

                            <div class="modal__header">
                                <h2 class="text-leading">
                                    Qr Codes
                                </h2>
                                <button class="button button--circle button--clear justify-self-end" type="button"
                                    onClick={handleModalClose}>
                                    <AiOutlineClose />
                                </button>
                            </div>

                            <div className="modal__body">


                                <div className="form__group">
                                    <label class="form__label">Insert the number of qr codes that needs to be generated</label>
                                    <div class="flex flex-row items-center gap-2">
                                        <input

                                            className={"form__input"}
                                            placeholder="Price"
                                            aria-describedby="basic-addon1"
                                            id="name"
                                            type="text"

                                            onChange={(e) => setNumber(e.target.value)}
                                            value={number}
                                        />

                                        <button


                                            onClick={(e) => {
                                                createQrCode(e)
                                            }}
                                            className="button button--primary"
                                            id="sendMessageButton"
                                            type="button"
                                        >
                                            Create new QR codes
                                        </button>
                                    </div>
                                </div>




                                <br />
                               
                                {clicked && homeDataState.generatedQrCodes.length == 0 &&
                                    < span > loading...</span>}
                                  
                            {homeDataState.generatedQrCodes.map((qrcode) => (
                                <tbody>
                                    <tr>
                                        <td ><img style={{ height: "200px", width: "200px" }} src={qrcode.qrcode}></img></td>
                                        <td>{qrcode.code}</td>

                                    </tr>
                                </tbody>
                            ))
                            }


                            <div className="table-frame">

                                <table>
                                    <thead>
                                        <tr>
                                            <th>Qr Code</th>
                                            <th className="whitespace-nowrap">Code</th>
                                            <th className="whitespace-nowrap">Qr code id</th>
                                            <th>Used</th>
                                        </tr>
                                    </thead>

                                    {homeDataState.qrCodes.map((qrcode) => (
                                        <tbody>
                                            <tr>
                                                <td ><img style={{ height: "200px", width: "200px" }} src={qrcode.qrcode}></img></td>
                                                <td>{qrcode.code}</td>

                                                <td>{qrcode.qrCodeId}</td>
                                                <td>{qrcode.used.toString()}</td>


                                            </tr>
                                        </tbody>
                                    ))
                                    }
                                </table>

                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>

            </div >
            )
});

export default QRCodesData;