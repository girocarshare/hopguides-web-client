import React, { createContext, useReducer } from "react";
import { homeDataReducer } from "../reducers/HomeDataReducer";

export const HomeDataContext = createContext();

const HomeDataContextProvider = (props) => {

	const [homeDataState, dispatch] = useReducer(homeDataReducer, {

	
		report: {
			pointId: "",
			monthlyUsedCoupons: 0,
			name: "",
			bpartnerName : "",
			bpartnerEmail: "",
			bpratnerPhone: "",
			showModal: false,
		},

		showModal: false,
		
		showEditMenuModal: false,
		showEditLogoModal: false,
		showEditLockCodeModal: false,

		termsAndConsitions: "",
		
		showAddPartnerModal: {
			show: false,
			id: "",
			bpartnerId: ""
		},

		id: "",
	

		toursWithPoints: {
			toursWithPoints: [],
			success: false,
			failure: false,
		},

		previousReports: {
			reports: [],
			id: "",
			showModal: false,
		},


		modalData: {
			success: false,
			failure: false,
			text: "",
		},

		
		updateTourData: {
			show: false,
			tour: null,
		},

		updatePointData: {
			show: false,
			point: null,
		},
		bpartners: {
			bpartners: [],
		},
		confirmed: false,
		notConfirmed: false,
		
		termsAndConditionsModal: {
			show: false,
			text: "${title} global terms of service, effective as of 1.3.2023\n"+
			`1. General
			1.1. These Terms of Service constitute the agreement ("Agreement") between you ("You", "User" or "Rider") and GoGiro digital d.o.o. or our affiliates ("GoGiro", "We", "Us" or "Our"), regarding Your use of (i) any human-powered and electrically assisted vehicle made available in the App, such as e-scooters and e-bikes (together, "E-Vehicles"); (ii) Our mobile application for accessing and using E-vehicles (“App”); and (iii) other related services such as charging, maintenance, pick-up and similar services ("Related Services") made available by Us (E-Vehicles, App and Related Services are collectively the "Services").
			1.2. If you need to contact us: 1.2.1 Our address is: [Verovškova 55, 1000 Ljubljana, Slovenia ]. 1.2.3 Online: You can contact our customer support team via the chat function in the App.
			1.3. The following documents are binding and incorporated by reference into this Agreement: 1.3.1. the rules for operating the E-Vehicles as set out in Annex A to this Agreement ("Riding Rules"); 1.3.2. the safety guidelines related to the use of E-Vehicles displayed in the App, and as the case may be, in the App safety toolkit (“Safety Toolkit”); 1.3.3. the applicable fee schedule as displayed in the App (“Fee Schedule”), any other price information, rules displayed in the App related to Basic Pass and Pre-Paid Pass (defined in 4.1), any applicable Promo Code terms and any instructions, manuals (including, if applicable, the User Manual of the E-Vehicle), and any other guidelines displayed in the App; and 1.3.4 other business and product terms referred to in this Agreement, including service descriptions, policies and notices, including Our Privacy Policy for Passengers ("Privacy Policy") that is made available in the App or at: https://hi.gogiro.app/docs/pp  and shall apply respectively (mutatis mutandis) to the processing of Your personal data in connection with the use of the Services; 1.3.5. supplemental country or city-specific ("Service Area") terms applicable in the area where the ride is taken.
			1.4. As Our Services evolve, We reserve the right to make changes to this Agreement at any time, by posting the amended Agreement or its supplemental terms on Our website or the App and notifying You thereof through the email address provided during Your registration. Your continued use of the Services after such posting constitutes Your consent to be bound by the Agreement as amended.
			
			2. Use of the App
			
			2.1. GoGiro digital d.o.o. provides its transportation services through the GoGiro App, which is available in multiple languages and can be customized in your profile settings. By using the App, you can locate E-Vehicles based on your current location. In order to provide you with our Services, we may collect your device's location data via the App. Service availability may be restricted based on your device's location, which will be indicated in the App interface. Please note that our Services may not be available in all jurisdictions due to regulatory restrictions and changes.
			2.2. To use our Services, you must install the GoGiro App and create a user account ("Account"). During the App installation, your mobile number will be linked to your Account and added to our database.
			2.3. We regularly update the GoGiro App to ensure the best possible user experience. The App requires an internet connection to function and can be accessed on both Android and Apple devices with the latest software updates. While there are no specific technical requirements for the internet connection, the quality of the service may be affected by the internet speed.
			2.4. We strive to promptly address any issues with the GoGiro App, but occasional technical errors may occur that limit its functionality. We cannot guarantee that the App will function flawlessly at all times, and we accept no liability for any losses resulting from the App's non-functionality or improper use.
			2.5. Provided that you comply with this Agreement, we grant you a limited, non-exclusive, revocable, non-transferable license to access and use the GoGiro App solely for the purpose of using our Services on your personal device.
			2.6. Our Services are designed, delivered, and supported in compliance with industry standards and best practices. For instance, we comply with the Payment Card Industry Data Security Standard when processing credit card data.
			
			3. User Eligibility and Accounts
			
			3.1. In order to use the Services, you must: 3.1.1. Create an Account; 3.1.2. Register a valid credit or debit card or other accepted payment method on the App ("Designated Payment Method"); 3.1.3. Meet the minimum age requirement of 18 years old to ride E-Vehicles in your Service Area as defined by Local Laws, and possess a valid driver's license if required to operate the E-Vehicle in your Service Area; 3.1.4. Possess the necessary physical fitness, skills, and expertise to safely operate and ride E-Vehicles.
			3.2. By creating and using Your Account, You agree to:
			3.2.1. Use only Your real name and accurate personal and payment information when setting up Your Account, and to keep such information up-to-date at all times; 
			3.2.2. Provide proof of identity if requested, such as a driver's license or government identification document, to obtain or maintain access to the Services; 
			3.2.3. Maintain the security and control of Your Account, including Your user name and password, and take full responsibility for all actions taken under Your Account, including the activation, use, deactivation, and proper parking of E-Vehicles according to this Agreement and in the designated parking area, unless You report any misuse of Your Account pursuant to Section 3.2.4; 
			3.2.4. Notify Us immediately if You become aware of any unauthorized access to or use of Your Account or any other situation that may cause loss of control of Your Account; 
			3.2.5. Agree that We have the right to suspend or disable Your Account if necessary to ensure the lawful use of the App, to prevent fraud, for risk assessment, investigation and customer support purposes, to ensure Your compliance with this Agreement, to comply with an applicable law or court order, or for any other reasons set forth in this Agreement; 
			3.2.6. Agree to receive text (SMS), push notifications, and email messages from Us regarding the Services.When you unlock the E-Vehicle using the app, you agree to rent it on a pay-as-you-go basis ("Basic Pass") or through a pre-paid package ("Pre-Paid Pass") in accordance with the terms of this Agreement and the Fee Schedule applicable during the rental period.
			
			4. Use of E-Vehicles
			Every time you unlock the E-Vehicle and start your ride, you confirm that you have read and understood: (a) all traffic laws and regulations applicable to your ride, (b) the Riding Rules in Annex A, (c) the Safety Toolkit, (d) the applicable terms and conditions for your Service Area, and (e) the eligibility conditions listed in Sections 3.1.
			When you unlock the E-Vehicle, you agree to: (a) keep the E-Vehicle and any attached equipment in the same condition in which you rented it, without dismantling, modifying, repairing, vandalizing or defacing it in any way, (b) use the E-Vehicle in accordance with this Agreement, including the Riding Rules, Safety Toolkit, instructions, manuals and guidelines displayed in the app, and the terms and conditions for your Service Area, (c) not allow anyone else to use the E-Vehicle you unlocked, (d) take full responsibility for the care of the E-Vehicle during the rental period and return it to a Permitted Parking Area according to Local Laws, the type of E-Vehicle, and the parking instructions specified in the app. If the E-Vehicle is returned damaged or in a state of disrepair, you will be charged a fee equal to the cost of repair pursuant to Section 5.6.2.
			If the E-Vehicle runs out of charging power during your ride, you must end the ride and park the E-Vehicle in the Permitted Parking Area in compliance with the instructions of the app and the terms of this Agreement.
			You must report any accidents, crashes, damage, personal injury, stolen or lost E-Vehicles to us in accordance with Section 10.1 as soon as they occur. If the incident involves personal injury, property damage, or a stolen E-Vehicle, you must also file a report with the local police department within 24 hours.
			In certain Service Areas, we may allow you ("Host") to unlock multiple E-Vehicles with your account at the same time for use by guest riders ("Guests") to participate in a group ride ("Group Ride"). The Group Ride feature will be displayed in the app subject to availability. By using the Group Ride feature, the Host agrees to: (a) make their mobile device available for each Guest to read and comply with all provisions of this Agreement, our Privacy Policy, Riding Rules, and Safety Toolkit, (b) ensure that all Guests are at least 18 years old and meet the eligibility conditions listed in Section 3.1.4 and 3.1.5, (c) authorize us to charge the Elected Payment Method linked to the Host's account for all fees and charges associated with services provided during the Group Ride, (d) take full responsibility and liability for any damage, loss, or injury caused by the Guests while using the services, (e) assume full liability for and pay all fines, fees, penalties, and/or any other charges resulting from the use of any of the E-Vehicles unlocked during the Group Ride, or as a result of Guests parking an E-Vehicle improperly or violating any law, rule, regulation, or ordinance while using the services.
			
			
			
			
			Payment and Fees
			5.1. You can access our Services using either a Basic Pass or a Pre-Paid Pass, if available. You'll be charged fees based on the type of E-Vehicle you use, in line with our Fee Schedule. Each usage of the E-Vehicle starts when you click "Unlock" and ends when you click "Finish your ride" (or a similar button on the App). We may charge you additional fees, which could include taxes and other local government charges.
			
			
			
			
			
			
			5.2. We may provide promotional coupons or codes, subject to additional terms specified on a per-promotional-code basis ("Promo Codes"). We reserve the right to modify or cancel Promo Codes at any time, at our sole discretion. We may suspend or cancel Promo Code(s) and your use of the App if we believe that the use or redemption of the Promo Code(s) was in error, fraudulent, illegal or violated the applicable Promo Code terms or this Agreement.
			5.3. When an E-Vehicle is unlocked using your Account, the following applies:
			5.3.1. If the E-Vehicle is parked outside the Permitted Parking Area, we may charge you a pick-up fee of up to EUR 80 at our discretion. This fee covers our costs for pick-up and associated losses.
			5.3.2. If the E-Vehicle appears to be damaged beyond normal wear and tear, is in a state of disrepair or has been vandalized, we may charge you a fee equal to the cost of repair or replacement of the E-Vehicle and equipment at our discretion.
			5.3.3. If the E-Vehicle is abandoned without notice, you'll be responsible for all fees until it's recovered, plus a search fee of up to EUR 80 and a maximum ride fee specified in the App, depending on how long it takes to recover the E-Vehicle. This fee covers our costs and associated losses.
			5.3.4. If the E-Vehicle is not recovered or returned (i.e. the ride is finished and the E-Vehicle parked) within 48 hours, we may consider the E-Vehicle lost or stolen, charge you up to EUR 400 per E-Vehicle, and file a police report against you at our discretion.
			5.4. You must comply with all local laws, traffic rules, and parking regulations when using our Services. You'll be responsible for any fines, impound
			
			
			6. Liability
			6.1. By using the Services, E-Vehicles, and related equipment, you acknowledge that you are solely responsible for any consequences, claims, demands, causes of action, losses, liabilities, damages, injuries, fees, costs and expenses, penalties, legal fees, or disbursements of any kind, whether foreseeable or unforeseeable, and whether known or unknown, that may arise from your use of the Services. You understand and acknowledge that riding E-Vehicles involves various risks, both obvious and not-so-obvious, that may result in injury or death to you or others and may cause damage to property. You also acknowledge that wearing protective equipment, complying with the Riding Rules, and following this Agreement are essential to reduce the risk of injury and damage to others.
			6.2. You are responsible for any and all consequences, claims, demands, causes of action, losses, liabilities, damages, injuries, fees, costs and expenses, penalties, legal fees, judgments, suits or disbursements of any kind, whether foreseeable or unforeseeable, and whether known or unknown, that result from your use of the Services and cause injury or damage to another person or property. If your conduct leads to third-party claims against us, you are solely responsible for all losses incurred by us in paying those third-party claims, and you agree to indemnify us.
			6.3. We reserve the right to provide liability insurance to insure any liability that you incur for injury to a third party or accidental damage to a third party's physical property caused by your use of the E-Vehicle. However, if you are ineligible for the insurance, you understand and acknowledge that you will assume liability for any costs incurred by a third party as a result of your actions, including ambulance transport services, hospital stays, and medical treatment.
			6.4. The Services, E-Vehicles, and related equipment are provided "AS IS" and "AS AVAILABLE." We exclude and disclaim all guarantees, conditions, warranties, or terms of any kind, whether express or implied or imposed by any applicable law, to the fullest extent permitted by law. We do not represent, warrant or guarantee that any of the Services, E-Vehicles, or related equipment, will be in good repair or in an error-free state, or that delays, omissions, interruptions or inaccuracies will not occur in relation to any of the Services, E-Vehicles, or related equipment. We disclaim and make no representations, warranties, endorsements, or promises, express or implied, about the accuracy, completeness, correctness, adequacy, usefulness, timeliness, or reliability of the information (including any instructions in the App) on the Services or whether any defects or errors in the Services will be repaired or corrected, whether the Services will be available at any particular time or Service Area, or whether your use of the Services is lawful in any Service Area.
			6.5. All implied conditions and warranties of any type in relation to the Services are excluded to the maximum extent allowed by law. However, nothing in this Agreement excludes, restricts, or modifies any guarantee, warranty, term or condition, right, or remedy implied or imposed by any applicable law which cannot lawfully be excluded, restricted or modified.
			6.6. If any Non-Excludable Provision is implied or imposed by any applicable law, and we are not able to limit your remedy for a breach of the Non-Excludable Provision, then our liability for breach of the Non-Excludable Provision is limited exclusively (so far as the law permits) to our option to: 6.6.1. in the case of goods, the replacement of the goods or the supply of equivalent goods, the repair of the goods, the payment of the cost of replacing the
			
			
			
			
			...authority, or any other cause or event beyond the control of the party affected. The non-performing party shall notify the other party as soon as practicable after the occurrence of such event, and shall use its reasonable best efforts to correct or remedy the cause of non-performance as soon as possible.
			6.9. You agree to defend, indemnify, and hold Us and our affiliates, directors, officers, employees, and agents harmless from and against any claims, actions, suits, demands, damages, liabilities, costs, and expenses (including reasonable legal fees and expenses) arising out of or related to: (i) Your use of the Services, E-Vehicles or related equipment; (ii) Your breach of this Agreement; or (iii) Your violation of any law or the rights of any third party.
			6.10. This section shall survive any termination or expiration of this Agreement.
			
			
			7. Your Content
			7.1. By using the Services, you confirm that any text, images, or other information you provide to us ("Your Content") will comply with the Rules of Acceptable Use set out below in Section 8.
			7.2. You retain ownership of Your Content, and any third party whose content you include in Your Content also retains ownership. However, you grant us a worldwide, non-exclusive, royalty-free, and perpetual license to use, copy, reproduce, distribute, adapt, re-format, modify, publish, translate, license, sublicense, and exploit Your Content anywhere and in any form for the purpose of providing the Services (including, where applicable, allowing other users to view Your Content).
			7.3. We have the right to monitor Your Content and to reject, refuse, or remove any of Your Content if we believe it violates the Rules of Acceptable Use.
			Rules of Acceptable Use
			8.1. In addition to other requirements in this Agreement, this section outlines specific rules that apply to your use of the Services ("Rules of Acceptable Use").
			8.2. When using the Services, you must not: 
			8.2.1. circumvent, disable, or otherwise interfere with any security features of the Services; 
			8.2.2. permit another person to use the Services on your behalf; 
			8.2.3. use the Services if we have suspended or banned you from using them; 
			8.2.4. engage in illegal or unlawful conduct or conduct that causes harm to any person or property; 
			8.2.5. modify, interfere with, intercept, disrupt, or hack the Services; 
			8.2.6. knowingly introduce viruses, Trojans, worms, logic bombs, or other material that could harm the Services or any user of the Services; 
			8.2.7. collect data from the Services other than in accordance with this Agreement; 
			8.2.8. contribute any of Your Content that contains nudity, violence, or is abusive, threatening, obscene, misleading, untrue, or offensive; 
			8.2.9. contribute any of Your Content that you do not own or have the right to use, or that infringes the copyright, trademark, or other rights of third parties; 
			8.2.10. use Your Content in violation of any licensing terms specified by the owner; 
			8.2.11. contribute any information or commentary about another person without that person's permission; 
			8.2.12. harass, upset, embarrass, alarm, or annoy any other person, or threaten, abuse, invade another's privacy or cause needless anxiety; 
			8.2.13. use any automated system, including robots, spiders, or offline readers, to access the Services in a manner that sends more request messages than a human can reasonably produce in the same time period; or 
			8.2.14. engage in any other action that we deem inappropriate for use of the Services.
			8.3. Failure to comply with the Rules of Acceptable Use constitutes a material breach of this Agreement and may result in: 
			8.3.1. immediate temporary or permanent withdrawal of your right to use the Services and/or any other Bolt app or service; 
			8.3.2. immediate temporary or permanent removal of any of Your Content; 
			
			
			9. Governing law
			9.1. The laws of the Republic of Slovenia shall govern and construe this Agreement.
			9.2. Your responsibilities may also be subject to the Local Laws of the Service Area, such as traffic and parking laws and regulations applicable in the Service Area, and you agree to comply with these laws.
			9.3. If you are a consumer and your habitual residence is in the EU, you are entitled to the protection provided by mandatory provisions of the law of your country of residence. We and you agree to the non-exclusive jurisdiction of the courts of Slovenia, which means that you may bring a claim to enforce your consumer protection rights in Slovenia or in the EU country where you reside.
			
			
			Miscellaneous
			10.1. We may assign or transfer any of Our rights or obligations under this Agreement without Your prior written consent.
			10.2. You may not assign or transfer any of Your rights or obligations under this Agreement without Our prior written consent.
			10.3. If any provision of this Agreement is found to be invalid or unenforceable by a court of law, such invalidity or unenforceability will not affect the remainder of the Agreement which will continue in full force and effect.
			10.4. Any waiver of any provision of this Agreement will be effective only if in writing and signed by Us.
			10.5. Nothing in this Agreement creates a partnership or joint venture between You and Us, and You may not act as an agent of Us.
			10.6. This Agreement constitutes the entire agreement between You and Us and supersedes all prior agreements, understandings, negotiations and discussions, whether oral or written, between You and Us relating to the subject matter of this Agreement.
			10.7. We may amend this Agreement from time to time by posting a revised version on the App. The revised version will be effective at the time We post it. If You do not agree to the revised Agreement, Your sole recourse is to discontinue using the App. Your continued use of the App after the revised Agreement has been posted constitutes Your acceptance of the revised Agreement.
			10.8. No person who is not a party to this Agreement shall have any right to enforce any term of this Agreement.
			`,
		
		},
	});

	return <HomeDataContext.Provider value={{ homeDataState, dispatch }}>{props.children}</HomeDataContext.Provider>;
};

export default HomeDataContextProvider;
