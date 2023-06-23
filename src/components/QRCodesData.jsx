
import { useContext, React, useEffect, useState, forwardRef } from "react";
import { useParams } from 'react-router-dom';

import { HomeDataContext } from "../contexts/HomeDataContext";
import { homeDataService } from "../services/HomeDataService";
import { AiOutlineClose } from 'react-icons/ai';
import {
    clipEvenOdd,
    drawEllipse,
    endPath,
    PDFDocument,
    popGraphicsState,
    pushGraphicsState,
    rgb
} from 'pdf-lib';
import JSZip from 'jszip';

var url = process.env.REACT_APP_URL || "http://localhost:8080/";

const QRCodesData = forwardRef((props, ref) => {
    const { homeDataState, dispatch } = useContext(HomeDataContext);
    const [number, setNumber] = useState(0);
    const [clicked, setClicked] = useState(false);

    const [colorList, setColorList] = useState(["GREEN", "RED", "PURPLE"]);
    const [color, setColor] = useState(colorList[0]);
    const [pdfBytesGreen, setPdfBytesGreen] = useState(null);
    const [pdfBytesRed, setPdfBytesRed] = useState(null);
    const [pdfBytesPurple, setPdfBytesPurple] = useState(null);
    const [editedPdfBytes, setEditedPdfBytes] = useState(null);
    const [editedPdfBytesArray, setEditedPdfBytesArray] = useState([]);
    const [formValue, setFormValue] = useState('');

    let { tourId } = useParams()
    const someFetchActionCreator = () => {
        const getReportInfoHandler = async () => {
            await homeDataService.getQrCodes(dispatch, tourId);
        };


        getReportInfoHandler();
    }


    useEffect(async () => {
       
        window.scrollTo(0, 0);
        someFetchActionCreator()
        const loadPdf = async () => {
            const response = await fetch('/assets/img/Hopguides-qr-card-GREEN.pdf');
            const existingPdfBytes = await response.arrayBuffer();
            setPdfBytesGreen(existingPdfBytes);
            const responseRed = await fetch('/assets/img/Hopguides-qr-card-ORANGE.pdf');
            const existingPdfBytesRed = await responseRed.arrayBuffer();
            setPdfBytesRed(existingPdfBytesRed);
            const responsePurple = await fetch('/assets/img/Hopguides-qr-card-PURPLE.pdf');
            const existingPdfBytesPurple = await responsePurple.arrayBuffer();
            setPdfBytesPurple(existingPdfBytesPurple);
        };

        loadPdf();

    }, [dispatch]);

   
 
    const handlePdfEdit = async () => {
        // Load the existing PDF document
        console.log(color)
        var array = []
        var pdfBytes = null;
        if(color == "GREEN"){
            pdfBytes = pdfBytesGreen
        }else if(color == "RED"){

            pdfBytes = pdfBytesRed
        }else{

            pdfBytes = pdfBytesPurple
        }
        for (var qrcode of homeDataState.generatedQrCodes) {
            const existingPdfDoc = await PDFDocument.load(pdfBytes);

            // Get the first page of the document
            const page = existingPdfDoc.getPage(0);

            // Set font and font size
            const font = await existingPdfDoc.embedFont('Helvetica');
            const fontSize = 12;

            // Set text color
            const textColor = rgb(1, 1, 1);


       


            const pngImageBytes = await fetch(qrcode.qrcode, {
           
               }).then((res) => res.arrayBuffer())

              

              console.log(pngImageBytes)

            const radius = 30;
            const jpgImage = await existingPdfDoc.embedPng(pngImageBytes)

            const imageWidth = jpgImage.width;
            const imageHeight = jpgImage.height;
            page.drawImage(jpgImage, {
                x: 94.7, y: 35, width: 50,
                height: 50,
                clip: { x: radius, y: radius, width: imageWidth - radius * 2, height: imageHeight - radius * 2 },
                operators: {
                    // Apply rounded corners
                    pushGraphicsState: [],
                    beginNewSubpath: [radius, 0],
                    appendBezierCurve: [radius, 0, radius, radius, radius, radius],
                    appendLineSegment: [imageWidth - radius, 0],
                    appendBezierCurve: [imageWidth - radius, 0, imageWidth, 0, imageWidth, radius],
                    appendLineSegment: [imageWidth, imageHeight - radius],
                    appendBezierCurve: [imageWidth, imageHeight - radius, imageWidth, imageHeight, imageWidth - radius, imageHeight],
                    appendLineSegment: [radius, imageHeight],
                    appendBezierCurve: [radius, imageHeight, 0, imageHeight, 0, imageHeight - radius],
                    appendLineSegment: [0, radius],
                    appendBezierCurve: [0, radius, 0, 0, radius, 0],
                    closePath: [],
                    endPath: [true],
                    clip: [],
                },
            });

            var number = qrcode.code.toString();
            number.split("")

            var code = ""
            for (var letter of number) {
                code += letter
                code += " "
            }

            page.drawText(code, { x: 97.5, y: 25, size: 6, font, fontSize, color: textColor });

            // Save the modified PDF document
            const modifiedPdfBytes = await existingPdfDoc.save();
            setEditedPdfBytes(modifiedPdfBytes);
            array.push({ name: qrcode.code + '.pdf', content: modifiedPdfBytes })
            // var array = [...editedPdfBytesArray, { name: qrcode.code + '.pdf', content: modifiedPdfBytes }]
            // console.log(array)
            //setEditedPdfBytesArray(array)
        }

        handleDownloadAll(array)
    };


    const handleDownloadAll = async (array) => {


        // Create a folder to organize the PDF files
        const folderName = 'pdf-files';
        const zip = new JSZip();

        console.log(array)
        // Add PDF files to the zip folder

        array.forEach((pdfFile) => {
            zip.file(`${folderName}/${pdfFile.name}`, pdfFile.content);
        });

        // Generate the zip file
        const content = await zip.generateAsync({ type: 'blob' });

        // Download the zip file
        const url = URL.createObjectURL(content);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${folderName}.zip`;
        link.click();
    };


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

    const setColorr = (color) => {
       console.log(color)
       setColor(color)
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

                                    <label class="form__label">Insert the number and pick the color of qr codes that needs to be generated </label>
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
                                        <select onChange={(e) => setColorr(e.target.value)}
                                            name="color"
                                            class="form__input shrink max-w-4 "
                                        >
                                            {colorList.map(item =>
                                                <option key={item} value={item}>{item}</option>
                                            )};

                                        </select>
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

                                    <div class="flex flex-row items-center gap-2">

                                        {homeDataState.generatedQrCodes.length != 0 && <button
                                            onClick={(e) => {
                                                handlePdfEdit(e)
                                            }}
                                            className="button button--primary"
                                            id="sendMessageButton"
                                            type="button"
                                        >
                                            Download qr codes
                                        </button>}
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