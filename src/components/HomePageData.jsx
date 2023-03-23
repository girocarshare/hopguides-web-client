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
    const [users, setUsers] = useState([]);
    const [tours, setTours] = useState([]);

    const [role, setRole] = useState(false);
    const [admin, setAdmin] = useState(false);
    const someFetchActionCreator = () => {
        const getDocumentsInfoHandler = async () => {
           // await homeDataService.getData(dispatch);
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

             <HomeData 
            data = {homeDataState.toursWithPoints.toursWithPoints}
            tours = {tours}/>
        </div>

    );
});

export default HomePageData
