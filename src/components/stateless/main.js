import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Graph from '../statefull/Graph';
import Users from '../../views/users';

const main = () => {
	return (
		<Switch>
			<Route exact path="/" component={Users} />
			<Route path="/groups" render={() => <h1>other</h1>} />
			<Route path="/other" render={() => <h1>other</h1>} />
		</Switch>
	);
};

export default main;
