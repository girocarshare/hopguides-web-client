import React from "react";
import { Route, Redirect } from "react-router-dom";
export const ProtectedRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				/*if (hasRoles(rest.roles) === true) {
					return <Component {...props} />;
				} else {
					return (
						<Redirect
							to={{
								pathname: rest.redirectTo,
								state: {
									from: props.location,
								},
							}}
						/>
					);
				}*/
			}}
		/>
	);
};
