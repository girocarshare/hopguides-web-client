import React, {
    useEffect,
    useState,
    useImperativeHandle,
    forwardRef,
    useContext,
    useRef
} from "react";
import { HomeDataContext } from "../contexts/HomeDataContext";
import UpdateTours from "./UpdateTours";
import { homeDataService } from "../services/HomeDataService";


const HomePageData = forwardRef((props, ref) => {

    const { homeDataState, dispatch } = useContext(HomeDataContext);
    const [tours, setTours] = useState([]);
    const someFetchActionCreator = () => {
        const getDocumentsInfoHandler = async () => {
            await loadPage()
        };

        getDocumentsInfoHandler();
    };

    const loadPage = async () => {
    
        await homeDataService.getUpdatedToursAndPointsData(dispatch, 0);
        
}


const setPageData = async (data) => {

   await homeDataService.getUpdatedToursAndPointsData(dispatch, data);

}


    useEffect(() => {

        someFetchActionCreator();
      
    }, [dispatch]);


    if(homeDataState.toursWithPoints.toursWithPoints == null) return (<span>loading...</span>);
    return (

        <div>
             <UpdateTours 
            data = {homeDataState.toursWithPoints.toursWithPoints}
            tours = {homeDataState.toursWithPoints.toursWithPoints}
            setPage = {setPageData}/>
        </div>

    );
});

export default HomePageData
