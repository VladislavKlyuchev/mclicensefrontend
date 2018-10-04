import React, { Component } from 'react';
import Skeleton from '@/views/skeleton';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from '@components/containers/privateRouteAuth';
import Auth from '@/views/auth';

class App extends Component {
	render() {
		return (
			<Switch>
				<Route exact path="/auth" component={Auth} />
				<PrivateRoute component={props => <Skeleton {...props} />} />
			</Switch>
		);
	}
}

export default App;
