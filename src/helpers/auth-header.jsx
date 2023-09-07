
export function authHeader() {

	
	return `${localStorage.getItem("accessToken")}`;
}

export function gettokens() {

	
	return `${localStorage.getItem("tokens")}`;
}


export function setAuthInLocalStorage(data) {

		localStorage.setItem("accessToken", data.userJwt);
		localStorage.setItem("language", data.lang);
		localStorage.setItem("tokens", data.tokens);


}


export function setTokens(data) {

	localStorage.setItem("tokens", data);


}




export function deleteLocalStorage() {

	localStorage.removeItem("accessToken");

}