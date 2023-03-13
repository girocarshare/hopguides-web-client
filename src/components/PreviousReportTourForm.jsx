
import React, {
	useContext, useEffect, useState,
	forwardRef,
} from "react";

const PreviousReportTourForm = (props) => {

	return (
		<React.Fragment>

			<div>
				{props.homeDataState.previousReports.reports.length > 0 &&
					<div>
						

							<table>
								<thead>
									<tr>
										<th scope="col">Month</th>
										<th scope="col">Year</th>
										<th scope="col">Number of tours booked</th>
									</tr>
								</thead>
								{props.homeDataState.previousReports.reports.map((report) => (
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

				{props.homeDataState.previousReports.reports.length == 0 &&
					<div>


						<table>
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
		</React.Fragment>
	);
};

export default PreviousReportTourForm;
