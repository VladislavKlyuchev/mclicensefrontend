import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PrivateRoute from '@components/stateless/privateRoute';

export class privateRouteAuth extends Component {
	static propTypes = {
		auth: PropTypes.bool.isRequired
	};
	render() {
		return <PrivateRoute {...this.props} />;
	}
}

const mapStateToProps = state => ({
	auth: state.api.auth
});

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(privateRouteAuth);
