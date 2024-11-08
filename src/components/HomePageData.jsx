import React, {
    useEffect,
    useState,
    useImperativeHandle,
    forwardRef,
    useContext,
    useRef
} from "react";
import { HomeDataContext } from "../contexts/HomeDataContext";
import HomeData2 from "./HomeData2";
import { homeDataService } from "../services/HomeDataService";


const HomePageData = forwardRef((props, ref) => {

    const { homeDataState, dispatch } = useContext(HomeDataContext);
    const [page, setPagee] = useState(0);

    const loadPage = async () => {
    
            await homeDataService.getToursAndPointsData(dispatch, page);
            
    }


    const setPageData = async (data) => {
    
       await homeDataService.getToursAndPointsData(dispatch, data);

}
    const someFetchActionCreator = () => {
        const getDocumentsInfoHandler = async () => {
            await loadPage()
        };

        getDocumentsInfoHandler();
    };


    useEffect(() => {

        someFetchActionCreator();
      
    }, [dispatch]);


    if(homeDataState.toursWithPoints.toursWithPoints == null) return (<span>loading...</span>);
    return (

        <div>
             <HomeData2 
            data = {homeDataState.toursWithPoints.toursWithPoints}
            tours = {homeDataState.toursWithPoints.toursWithPoints}
            setPage = {setPageData}/>
        </div>

    );
});

export default HomePageData
