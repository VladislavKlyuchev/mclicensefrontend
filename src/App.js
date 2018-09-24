import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Example from '@components/containers/example';
import './App.css';

class App extends Component {
	render() {
		return (
			<Switch>
				<Route exact component={Example} />
			</Switch>
		);
	}
}

export default App;
