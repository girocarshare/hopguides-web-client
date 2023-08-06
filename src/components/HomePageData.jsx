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
    const [page, setPagee] = useState(0);

    const loadPage = async () => {
    
        console.log("page1")
        console.log(page)
            await homeDataService.getToursAndPointsData(dispatch, page);
            
    }


    const setPageData = async (data) => {
    
        console.log("page2")
        console.log(data)
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
             <HomeData 
            data = {homeDataState.toursWithPoints.toursWithPoints}
            tours = {homeDataState.toursWithPoints.toursWithPoints}
            setPage = {setPageData}/>
        </div>

    );
});

export default HomePageData
