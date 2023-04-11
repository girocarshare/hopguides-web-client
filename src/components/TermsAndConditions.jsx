
import { useContext, React, useEffect, useState , forwardRef} from "react";
import { useParams } from 'react-router-dom';
import { homeDataService } from "../services/HomeDataService";
import { HomeDataContext } from "../contexts/HomeDataContext";
import { homeDataConstants } from "../constants/HomeDataConstants";
import { deleteLocalStorage, authHeader } from "../helpers/auth-header";
import Axios from "axios";



const Report = forwardRef(( props, ref ) => {
	const { homeDataState, dispatch } = useContext(HomeDataContext);

    let { id } = useParams()
    const someFetchActionCreator = () => {
        const getReportInfoHandler = async () => {
            await homeDataService.getTermsAndConditions(dispatch, id);
        };
       
      


        getReportInfoHandler();
    }


    useEffect(() => {

          someFetchActionCreator();
        }, [dispatch]);
    
   

    return (
        <div class="login-page">
           

            <div class="hotelcontact-box" >
                
                <p>{homeDataState.termsAndConsitions}</p>

            </div>


        </div>
)});

export default Report;