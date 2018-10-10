import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from '@components/containers/privateRouteAuth';
import Skeleton from '@/views/skeleton';

class App extends Component {
	render() {
		return (
			<Switch>
				><PrivateRoute component={props => <Skeleton {...props} />} />
			</Switch>
		);
	}
}

export default App;
