import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useContext,
} from "react";
import MaterialTable from "material-table";
import { ReportContext } from "../contexts/ReportContext";
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
import { reportService } from "../services/ReportService";
import Axios from "axios";
import { deleteLocalStorage, authHeader } from "../helpers/auth-header";

import { useParams } from 'react-router-dom';

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
const PreviousReport = forwardRef((props, ref) => {

  let { id } = useParams()
  const { reportState, dispatch } = useContext(ReportContext);

  const [role, setRole] = useState(false);
  const [admin, setAdmin] = useState(false);
  const someFetchActionCreator = () => {
    const getDocumentsInfoHandler = async () => {
      await reportService.getReports(dispatch, id);


    };
    getDocumentsInfoHandler();
  };




  useEffect(() => {



    var token = authHeader()
    if (token == "null") {
      window.location = "#/unauthorized";
    } else {

      Axios.get(`${url}api/users/getRole`, { headers: { Authorization: token } }, { validateStatus: () => true },
      )
        .then((res) => {
          if (res.status === 200) {
            if ("BPARTNER" == res.data) {

              setRole(true)
            }

            if ("ADMIN" == res.data || "PROVIDER" == res.data) {

              setRole(true)
              setAdmin(true)
            }
          }
        })
        .catch((err) => {

        })

      }
      someFetchActionCreator();
    }, [dispatch]);

  return (

    <div class="login-page">
      <h1 class="paragraph-box">Previous monthly reports</h1>
      <MaterialTable
        stickyHeader

        style={{
          tableLayout: "fixed",
          marginLeft: 38,
          marginRight: 38,
        }}
        icons={tableIcons}
        columns={[
          { title: "Month", field: "month" },
          {
            title: "Year",
            field: "year",
          },
          { title: "Number of coupons used", field: "count" },

        ]}
        actions={[

        ]}
        options={{
        }}
        localization={{

        }}
        data={reportState.previousReports.reports}
        title=""
      />
    </div>
  );
});

export default PreviousReport
