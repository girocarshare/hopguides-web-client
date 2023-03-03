import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useContext,
} from "react";
import { ReportContext } from "../contexts/ReportContext";
import { reportService } from "../services/ReportService";
import Axios from "axios";
import { deleteLocalStorage, authHeader } from "../helpers/auth-header";

import { useParams } from 'react-router-dom';

var url = process.env.REACT_APP_URL || "http://localhost:3000/";


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

      <div>
				{reportState.previousReports.reports.length > 0 &&
					<div>
						

            <table style={{ border: "1px solid gray", width: 1400, background: "white" }}>
								<thead>
									<tr>
										<th scope="col">Month</th>
										<th scope="col">Year</th>
										<th scope="col">Number of tours booked</th>
									</tr>
								</thead>
								{reportState.previousReports.reports.map((report) => (
								<tbody>
									<tr>
										<td>{report.month}</td>
										<td>{report.year}</td>
										<td>{report.count}</td>
									</tr>
								</tbody>
								))}
							</table>


						</div>
				}

				{reportState.previousReports.reports.length == 0 &&
					<div>


<table style={{ border: "1px solid gray", width: 1400, background: "white" }}>
							<caption>No data to display</caption>
							<thead>
								<tr>
									<th scope="col">Month</th>
									<th scope="col">Year</th>
									<th scope="col">Number of tours booked</th>
								</tr>
							</thead>

						</table>


					</div>
				}
			</div>
    </div>
  );
});

export default PreviousReport
