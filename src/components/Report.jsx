import { useContext, React, useEffect, useState, forwardRef } from "react";
import { useParams } from 'react-router-dom';
import { ReportContext } from "../contexts/ReportContext";
import { reportService } from "../services/ReportService";
import { reportConstants } from "../constants/ReportConstants";
import { deleteLocalStorage, authHeader } from "../helpers/auth-header";
import Axios from "axios";

var url = process.env.REACT_APP_URL || "http://localhost:8080/";

const Report = forwardRef((props, ref) => {
	const { reportState, dispatch } = useContext(ReportContext);

	const [role, setRole] = useState(false);
	const [admin, setAdmin] = useState(false);
	let { id } = useParams()
	const someFetchActionCreator = () => {
		const getReportInfoHandler = async () => {
			await reportService.getReport(dispatch, id);
		};


		getReportInfoHandler();
	}


	useEffect(() => {
		window.scrollTo(0, 0);
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


		someFetchActionCreator()
	}, [dispatch]);


	const handleShowModal = () => {
		dispatch({ type: reportConstants.SHOW_ADD_MENU_MODAL });
	};

	const handleLogin = () => {
		window.location.href = "#/login"
	};


	const handleLogout = () => {
		deleteLocalStorage();
		window.location = "#/login";
	};


	function BoldText({ children }) {
		return (
			<span style={{ fontWeight: 'bold' }}>{children}</span>
		);
	}

	function ColorText({ children }) {
		return (
			<span style={{ color: 'green' }}>{children}</span>
		);
	}

	function ColorTextRed({ children }) {
		return (
			<span style={{ color: 'red' }}>{children}</span>
		);
	}

	return (

		<div ref={ref}>

			<div class="grid grid-cols-12 mb-12 items-start justif-start gap-8">

				<div class="col-span-12 lg:col-span-3">
					&nbsp;
				</div>
				<div class="flex flex-col items-center justify-center gap-8 col-span-12 lg:col-span-6">
					<div
						class="w-48 h-48 rounded-full bg-white border border-black/10 oveflow-hidden bg-contain bg-center bg-no-repeat"
						style={{ backgroundImage: `url(${("assets/img/turizem-lj.jpg")})`, }}>
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

			<div class="box">
				<div class="box__content">


					<div class="flex flex-col md:flex-row gap-6">
						<div>
							<div class="box__header">
								<div class="flex-grow text-heading6">
									{reportState.report.name}
								</div>
								<a class="button button--secondary button--small"
									href={"http://localhost:3000/#/previousReports/" + id}>All reports</a>
							</div>
							<div class="text-base">
								This is <b>{reportState.report.bpartnerName}</b> tourist package with digital
								tour guide GoGiro. You are included
								in <b>{reportState.report.name}</b> package <b>{reportState.report.offerName}</b>. When
								the
								guest shows you a non used QR code this is valid confirmation that tourist has bought
								a <b>{reportState.report.name}</b> package.
							</div>
						</div>
						<div class="box__count md:order-first">
							<div class="form__label form__label--uppercase text-center">
								Monthly usage:
							</div>
							<div class="box__count__number">
								{reportState.report.monthlyUsedCoupons || 0}
							</div>
						</div>
					</div>

				</div>
			</div>


			<div class="box">
				<div class="box__content">

					<div class="box__header">
						<div class="form__label form__label--uppercase">
							Instructions
						</div>
					</div>

					<div class="bullets">
						<div class="bullet">
							<div class="bullet__number">
								1.
							</div>
							<div class="bullet__content">
								Using the camera on your phone please scan the users/customer QR
								code
							</div>
						</div>
						<div class="bullet">
							<div class="bullet__number">
								2.
							</div>
							<div class="bullet__content">
								After scanning the QR code, please check the provided feedback on your
								phone.
							</div>
						</div>
					</div>

					<div class="flex flex-col md:flex-row gap-4 items-stretch">
						<div class="bg-green-200 bg-opacity-40 rounded-lg p-4 flex flex-col gap-4 items-center">
							<div class="text-sm">
								If the QR code is <ColorText>VALID</ColorText> please serve the customer<BoldText> »home
									made« Sirove Štruklje </BoldText>as included in the tour.
							</div>
							<div class="bg-white rounded-lg overflow-hidden shadow shadow-green-500/20">
								{

									<img class="w-full h-auto max-w-[20rem]" alt="" src="/assets/img/voucher_valid.png" />

								}
							</div>
						</div>
						<div class="bg-red-200 bg-opacity-40 rounded-lg p-4 flex flex-col gap-4 items-center">
							<div class="text-sm">
								If the QR code is <ColorTextRed>NOT VALID</ColorTextRed> the user has not paid for the
								experience or
								has already used the said QR code
							</div>
							<div class="bg-white rounded-lg overflow-hidden shadow shadow-red-500/10">
								{

									<img class="w-full h-auto max-w-[20rem]" alt="" src="/assets/img/voucher_invalid.png" />

								}
							</div>
						</div>
					</div>

				</div>
			</div>

			<div class="box">
				<div class="box__content">


					<div class="flex flex-col md:flex-row gap-4 items-start md:items-center">
						<div class="flex-grow">
							<div class="form__label form__label--uppercase">
								Offer name:
							</div>
							<div class="text-heading6">
								{reportState.report.offerName}
							</div>
						</div>
						<div>
							{/*{admin && */}
							<button
								type="button"
								onClick={handleShowModal}
								class="button button--primary button--small"
							>
								Update menu image
							</button>
							{/*} */}
						</div>
					</div>

					<br />

					<div>
						{
							reportState.report.menu ? (
								<img alt="" src={reportState.report.menu}></img>
							) : (
								null
							)
						}
					</div>
				</div>
			</div>
		</div>
	)
});

export default Report;