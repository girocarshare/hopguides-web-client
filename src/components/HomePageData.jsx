import React, {
    useEffect,
    useState,
    useImperativeHandle,
    forwardRef,
    useContext,
    useRef
} from "react";
import { HomeDataContext } from "../contexts/HomeDataContext";
import HomeData from "./HomeData";
import { homeDataService } from "../services/HomeDataService";


const HomePageData = forwardRef((props, ref) => {

    const { homeDataState, dispatch } = useContext(HomeDataContext);
    const [tours, setTours] = useState([]);
    const someFetchActionCreator = () => {
        const getDocumentsInfoHandler = async () => {
            await homeDataService.getToursAndPointsData(dispatch);
        };

        getDocumentsInfoHandler();
    };


    useEffect(() => {

        someFetchActionCreator();
      
    }, [dispatch]);


    if(homeDataState.toursWithPoints.toursWithPoints == null) return (<span>loading...</span>);
    return (

        <div>
<button class="bg-red-500 ..."> DUGMEE</button>
             <HomeData 
            data = {homeDataState.toursWithPoints.toursWithPoints}
            tours = {tours}/>
        </div>

    );
});

export default HomePageData
