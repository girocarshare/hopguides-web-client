import { reportConstants } from "../constants/ReportConstants";


function convertMonth(month){
	if(month == 1){

		return "January"

	}else if(month == 2){

		return "February"
	}else if(month == 3){
		
		return "March"
	}else if(month == 4){

		return "April"
		
	}else if(month == 5){
		
		return "May"
	}else if(month == 6){
		
		return "June"
	}else if(month == 7){
		
		return "July"
	}else if(month == 8){
		
		return "August"
	}else if(month == 9){
		
		return "September"
	}else if(month == 10){
		
		return "October"
	}else if(month == 11){
		
		return "November"
	}else if(month == 12){
		
		return "December"
	}

}
export const reportReducer = (state, action) => {

	switch (action.type) {


		case reportConstants.REPORT_GET_SUCCESS:

		var data= {
			bpartnerEmail:"danijel.omerzel@visitljubljana.si",
			bpartnerName:"Tourism Ljubljana",
			bpratnerPhone : "0038641386295",
			bpratnerPhone2 : "/",
			monthlyUsedCoupons : 2,
			name : "Klobasarna",
			offerName: "Some offer name",
			pointId :"0c4d2a86-9083-42ee-ad4f-4c3665ff0823"
		}

		/***********************************
		 * *********************************
		 * *********************************
		 */
		

			return {
				...state,
				report: {
					pointId: data.pointId,
					monthlyUsedCoupons: data.monthlyUsedCoupons,
					name: data.name,
					bpartnerName : data.bpartnerName,
					bpartnerEmail: data.bpartnerEmail,
					bpratnerPhone: data.bpratnerPhone,
					bpratnerPhone2: data.bpratnerPhone2,
					offerName: data.offerName,
					menu: data.menu
				},

			};


		case reportConstants.REPORT_GET_FAILURE:

		
		window.location.href = "/#/404"
			return {
				...state,
				report: {
					pointId: "",
					monthlyUsedCoupons: "",
					name: "",
				},

			};

		case reportConstants.SHOW_ADD_MENU_MODAL:

			return {
				...state,
				report: {
					pointId: "",
					monthlyUsedCoupons: "",
					name: "",
					showModal: true
				},
				id: action.data
			};

		case reportConstants.HIDE_ADD_MENU_MODAL:

			return {
				...state,
				report: {
					pointId: "",
					monthlyUsedCoupons: "",
					name: "",
					showModal: false
				},
			};

		
		case reportConstants.PREVIOUS_REPORT_GET_SUCCESS:


		var array =[]
		var item = {
			from: "32019",
			count: 2
		}
		var item2 = {
			from: "02022",
			count: 5
		}

		array.push(item)
		array.push(item2)

			var arrReports = []
			for (var report of array/*action.data*/) {
				if (report.from.length == 5) {
					var monthNum = report.from.charAt(0)
					monthNum = parseInt(monthNum) + 1
					var month = convertMonth(monthNum)
					var year = report.from.substring(1, 5)
					var count = report.count
					var obj = { count, month, year }
					arrReports.push(obj)
				} else {
					var monthNum = report.from.substring(0, 1) 
					monthNum = parseInt(monthNum) + 1
					var month = convertMonth(monthNum)
					var year = report.from.substring(2, 6)
					var count = report.count
					var obj = { count, month, year }
					arrReports.push(obj)
				}
			}

			return {
				...state,
				previousReports: {
					reports: arrReports
				},
			};

		case reportConstants.PREVIOUS_REPORT_GET_FAILURE:

			return {
				...state,
				previousReports: {
					reports: []
				},
			};
		default:
			return state;
	}
};
