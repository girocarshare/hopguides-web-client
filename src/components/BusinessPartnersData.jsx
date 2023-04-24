import React, {
	useEffect,
	useState,
	useImperativeHandle,
	forwardRef,
	useContext,
	useRef
} from "react";
import {BusinessPartnersContext} from "../contexts/BusinessPartnersContext";
import {businessPartnersService} from "../services/BusinessPartnersService";
import {businessPartnersConstants} from "../constants/BusinessPartnersConstants";
import {AiOutlineClose} from 'react-icons/ai';

const BusinessPartnersData = forwardRef((props, ref) => {

	const {businessPartnersState, dispatch} = useContext(BusinessPartnersContext);

	const someFetchActionCreator = () => {
		const getDocumentsInfoHandler = async () => {
			await businessPartnersService.getBPartners(dispatch);
		};

		getDocumentsInfoHandler();
	};


	useEffect(() => {

		someFetchActionCreator();

	}, [dispatch]);


	const update = (e, bpartner) => {

		dispatch({type: businessPartnersConstants.UPDATE_BPARTNER_DATA_MODAL_SHOW, bpartner});


	};

	const deleteBPartner = async (e, bpartner) => {

		await businessPartnersService.deleteBPartner(dispatch, bpartner);


	};


	const handleModalClose = () => {
		window.location = "#/"
	};

	return (

		<div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">

			<div class="modal-overlay"></div>

			<div class="fixed inset-0 z-10 overflow-y-auto">

				<div class="modal-frame">

					<div id="myModal" class="modal">

						<div class="modal__header">
							<h2 class="text-leading">
								Business partners
							</h2>
							<button class="button button--circle button--clear justify-self-end" type="button"
									onClick={handleModalClose}>
								<AiOutlineClose/>
							</button>
						</div>

						<div class="modal__body">
							<div class="table-frame">
								{
									<table>
										<thead>


										<tr>
											<th>Logo</th>
											<th>Logo dimensions</th>
											<th>Name</th>
											<th>Primary phone</th>
											<th>Secondary phone</th>
											<th>Email</th>
											<th>Address</th>
											<th>Website</th>
											<th>Lock code</th>
											<th>Support text</th>
											<th>Options</th>
										</tr>
										</thead>

										{businessPartnersState.bpartners.bpartners.map((bpartner) => (
											<tbody>
											<tr>
												<td>
													<img class="h-12 !w-auto !max-w-none" src={bpartner.logo}></img>

												</td>
												<td>{bpartner.dimensions.height} x {bpartner.dimensions.width}</td>
												<td>{bpartner.name}</td>
												<td>{bpartner.contact.phone}</td>
												<td>{bpartner.contact.phone2}</td>
												<td>{bpartner.contact.email}</td>
												<td>{bpartner.contact.location.street}</td>
												<td>{bpartner.contact.webURL}</td>
												<td>{bpartner.lockCode}</td>
												<td>{bpartner.support.english}</td>
												<td>
													<div class="flex flex-row items-center gap-2">
														<button class="button button--secondary button--small"
																onClick={(e) => update(e, bpartner)}>Update
														</button>
														<button class="button button--secondary button--small"
																onClick={(e) => deleteBPartner(e, bpartner.id)}>Delete
														</button>
													</div>
												</td>

											</tr>
											</tbody>))
										}
									</table>
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	);
});

export default BusinessPartnersData
