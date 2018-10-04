import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const privateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props =>
				rest.auth ? <Component {...props} /> : <Redirect to="/auth" />
			}
		/>
	);
};

export default privateRoute;
