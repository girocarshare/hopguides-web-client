import React from "react";

const UnauthorizedPage = () => {

	return (
		<React.Fragment>
			<section className="login-clean">
			<div class="image-div" style={{marginTop: "70px"}}>
							{/*<img src={process.env.PUBLIC_URL + 'assets/img/logo.png'}  alt="SteriPro" style={{ maxWidth: "100px", width: "100%" }}></img>*/}
						</div>

				<div className="text-center" style={{ fontSize: "6em", color: "#3861b3" }}>
					<b>401</b>
				</div>
				<div className="text-center mt-5" style={{ fontSize: "3em" }}>
					Oops... <br />
					Unauthorized
				</div>
				<div className="text-center mt-5" style={{ fontSize: "1em" }}>
				Try logging in <a href="#/login"> here </a> <br />
					
					
				</div>
			</section>
		</React.Fragment>
	);
};

export default UnauthorizedPage;
