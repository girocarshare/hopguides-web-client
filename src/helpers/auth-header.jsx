

export function authHeader() {

	
	return `${localStorage.getItem("accessToken")}`;
}



export function setAuthInLocalStorage(data) {

		localStorage.setItem("accessToken", data.userJwt);
		localStorage.setItem("language", data.lang);


}



export function deleteLocalStorage() {

	localStorage.removeItem("accessToken");

}