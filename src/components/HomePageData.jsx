import React, {
    useEffect,
    useState,
    useImperativeHandle,
    forwardRef,
    useContext,
    useRef
} from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { HomeDataContext } from "../contexts/HomeDataContext";
import HomeData from "./HomeData";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { homeDataService } from "../services/HomeDataService";
import { Button } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import GetAppIcon from '@material-ui/icons/GetApp';
import { useParams } from 'react-router-dom';
import { homeDataConstants } from "../constants/HomeDataConstants";
import { reportConstants } from "../constants/ReportConstants";
import EditIcon from '@mui/icons-material/Edit';
import LaunchIcon from '@mui/icons-material/Launch';
import Axios from "axios";
import { deleteLocalStorage, authHeader } from "../helpers/auth-header";


var url = process.env.REACT_APP_URL || "http://localhost:3000/";
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
const HomePageData = forwardRef((props, ref) => {

    const { homeDataState, dispatch } = useContext(HomeDataContext);
    const [users, setUsers] = useState([]);
    const [tours, setTours] = useState([]);

    const [role, setRole] = useState(false);
    const [admin, setAdmin] = useState(false);
    const someFetchActionCreator = () => {
        const getDocumentsInfoHandler = async () => {
            await homeDataService.getData(dispatch);
            await homeDataService.getToursAndPointsData(dispatch);


        };


        getDocumentsInfoHandler();
    };


    useEffect(() => {

      

     
        someFetchActionCreator();
      
    }, [dispatch]);


    if(homeDataState.tours.tours == null) return (<span>loading...</span>);
    return (

        <div>

             <HomeData 
            data = {homeDataState.tours.tours}
            tours = {tours}/>
        </div>

    );
});

export default HomePageData
