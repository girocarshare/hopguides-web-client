import React from "react";




const PageNotFound = () => {
	
	return (
		<React.Fragment>
			<section className="login-clean">
				<div className="illustration" style={{ fontSize: "150px" }}>
					<i className="icon ion-ios-navigate"></i>
				</div>

				<div className="text-center" style={{ fontSize: "6em", color: "#F4476B" }}>
					<b>404</b>
				</div>
				<div className="text-center mt-5" style={{ fontSize: "3em" }}>
					Oops... <br />
					Page not found <br/>

				</div>		
			
			</section>
		</React.Fragment>
	);
};

export default PageNotFound;
