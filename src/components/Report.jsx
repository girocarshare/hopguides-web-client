import {useContext, React, useEffect, useState, forwardRef} from "react";
import {useParams} from 'react-router-dom';
import {ReportContext} from "../contexts/ReportContext";
import {reportService} from "../services/ReportService";
import {reportConstants} from "../constants/ReportConstants";
import {deleteLocalStorage, authHeader} from "../helpers/auth-header";
import Axios from "axios";

var url = process.env.REACT_APP_URL || "http://localhost:8080/";

const Report = forwardRef((props, ref) => {
	const {reportState, dispatch} = useContext(ReportContext);

	const [role, setRole] = useState(false);
	const [admin, setAdmin] = useState(false);
	let {id} = useParams()
	const someFetchActionCreator = () => {
		const getReportInfoHandler = async () => {
			await reportService.getReport(dispatch, id);
		};


		getReportInfoHandler();
	}


	useEffect(() => {
		window.scrollTo(0, 0);
		/*var token = authHeader()
        if (token == "null") {
            // window.location = "#/unauthorized";
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

*/
		someFetchActionCreator()
	}, [dispatch]);


	const handleShowModal = () => {
		dispatch({type: reportConstants.SHOW_ADD_MENU_MODAL});
	};

	const handleLogin = () => {
		window.location.href = "#/login"
	};


	const handleLogout = () => {
		deleteLocalStorage();
		window.location = "#/login";
	};


	function BoldText({children}) {
		return (
			<span style={{fontWeight: 'bold'}}>{children}</span>
		);
	}

	function ColorText({children}) {
		return (
			<span style={{color: 'green'}}>{children}</span>
		);
	}

	function ColorTextRed({children}) {
		return (
			<span style={{color: 'red'}}>{children}</span>
		);
	}

	return (

		<div ref={ref}>

			<div class="grid grid-cols-12 mb-12 lg:mb-16 items-start justif-start gap-8">

				<div class="col-span-12 lg:col-span-3">
					&nbsp;
				</div>
				<div class="flex flex-col items-center justify-center gap-8 col-span-12 lg:col-span-6">
					<div
						class="w-48 h-48 rounded-full bg-white border border-black/10 oveflow-hidden bg-contain bg-center bg-no-repeat"
						style={{backgroundImage: `url(${("assets/img/turizem-lj.jpg")})`,}}>
					</div>
					<h1 class=" text-heading4 text-center">
						{reportState.report.bpartnerName}
					</h1>
				</div>

				{/*Contact*/}
				<div
					class="fixed z-20 left-0 bottom-0 right-0 col-span-12 lg:col-span-3 lg:relative flex flex-col items-center justify-center bg-white/80 backdrop-blur border-t lg:border-none border-black/10 drop-shadow-[0_-2px_6px_rgba(0,0,0,0.15)] lg:drop-shadow-none">
					<div
						class="flex flex-row lg:flex-col items-center lg:items-start gap-0 lg:gap-4 p-3 lg:p-6 lg:rounded-2xl lg:border lg:border-black/
						10 lg:shadow-2xl lg:shadow-black/10 w-full">
						<div class="label label--primary -rotate-90 lg:rotate-0 -ml-7 lg:ml-0">
							Contact
						</div>
						<div class="flex flex-col gap-1 lg:gap-2 w-full overflow-hidden -ml-2 lg:ml-0">
							<div class="text-sm lg:text-xl font-bold text-black">
								Danijel Omerzel
							</div>
							<div class="flex flex-col gap-1 lg:gap-2 text-xs lg:text-sm">
								<a class="link"
								   href="mailto:'{reportState.report.bpartnerEmail}'">{reportState.report.bpartnerEmail}</a>
								<div>{reportState.report.bpratnerPhone}</div>
								<div>{reportState.report.bpratnerPhone2}</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="home-box">

				<p class="paragraph-box2">This is <b>{reportState.report.bpartnerName}</b> tourist package with digital
					tour guide GoGiro. You are included
					in <b>{reportState.report.name}</b> package <b>{reportState.report.offerName}</b>. When the guest
					shows you a non used QR code this is valid confirmation that tourist has bought
					a <b>{reportState.report.name}</b> package
				</p><br/>

				<h3><b>Tour name</b>: {reportState.report.name}</h3>
				<h3><b>Monthly usage</b>: {reportState.report.monthlyUsedCoupons || 0}</h3>
				<a class="button button--secondary button--small"
				   href={"http://localhost:3000/#/previousReports/" + id}>Get previous reports</a>
			</div>


			<h4 class="header2">Instructions</h4>
			<p class="paragraph-box2">1. Using the camera on your phone please scan the users/customer QR code </p><br/>
			<p class="paragraph-box2">2. After scanning the QR code, please check the provided feedback on your
				phone. </p><br/>
			<ul class="ul-box2">
				<li>If the QR code is <ColorText>VALID</ColorText> please serve the customer<BoldText> »home made«
					Sirove Štruklje </BoldText>as included in the tour.
				</li>
			</ul>

			<div class="image-box">
				{

					<img alt="" src="/assets/img/Screenshot_2.png"/>

				}
			</div>

			<ul class="ul-box2">
				<li>If the QR code is <ColorTextRed>NOT VALID</ColorTextRed> the user has not paid for the experience or
					has already used the said QR code

				</li>
			</ul>

			<div class="image-box">
				{

					<img alt="" src="/assets/img/Screenshot_1.png"/>

				}
			</div>

			<h4 class="header2"></h4>
			<div class="paragraph-box">


				<h1 style={{fontSize: 28}}><b>Offer name</b>: {reportState.report.offerName}</h1>

			</div>

			{/*{admin && */}
			<div class=" button-p">
				<button
					type="button"
					style={{color: "black"}}
					onClick={handleShowModal}
					class="button button--secondary button--small"
				>
					Update menu image
				</button>
			</div>
			{/*} */}


			<div class="menu-box">
				{
					reportState.report.menu ? (
						<img alt="" src={reportState.report.menu}></img>
					) : (
						null
					)
				}
			</div>
		</div>
	)
});

export default Report;