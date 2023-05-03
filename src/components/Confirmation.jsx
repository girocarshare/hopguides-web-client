
import { useContext, React, useEffect, useState , forwardRef} from "react";
import { useParams } from 'react-router-dom';

import { HomeDataContext } from "../contexts/HomeDataContext";
import { homeDataService } from "../services/HomeDataService";
import Axios from "axios";

var url = process.env.REACT_APP_URL || "http://localhost:8080/";

const Confirmation = forwardRef(( props, ref ) => {
    const { homeDataState, dispatch } = useContext(HomeDataContext);

    let { bookingId, pointId } = useParams()
    const someFetchActionCreator = () => {
        const getReportInfoHandler = async () => {
            await homeDataService.confirm(dispatch, bookingId, pointId);
        };


        getReportInfoHandler();
    }


    useEffect(() => {
        window.scrollTo(0, 0);
       
        someFetchActionCreator()
    }, [dispatch]);


   

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
        <div class = "grid h-screen place-items-center" >
           


           {homeDataState.confirmed && <div>
                {

                    <img alt="" src="/assets/img/voucher_valid.png" />

                }
            </div>}

          

            {homeDataState.notConfirmed && <div >
                {

                    <img alt="" src="/assets/img/voucher_invalid.png" />

                }
            </div>}

          
        </div>
)});

export default Confirmation;