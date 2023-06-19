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
    const [pager, setPager] = useState({});

    const [currPage, setCurrPage] = useState(1); // storing current page number
    const [prevPage, setPrevPage] = useState(0); // storing prev page number
    const [wasLastList, setWasLastList] = useState(false); // setting a flag to know the last list

	const listInnerRef = useRef();


    const loadPage = async () => {
    
            await homeDataService.getToursAndPointsData(dispatch, page);
            
    }


    const setPageData = async (data) => {
    
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
      
    }, [dispatch, , listInnerRef.current]);


    if(homeDataState.toursWithPoints.toursWithPoints == null) return (<span>loading...</span>);
    return (

        <div>
             <HomeData 
            data = {homeDataState.toursWithPoints.toursWithPoints}
            tours = {homeDataState.toursWithPoints.toursWithPoints}
            page={page}
            setPage = {setPageData}
            listInnerRef = {listInnerRef}
            setPagee = {setPagee}/>
        </div>

    );
});

export default HomePageData
