import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { auth } from '@redux/api/actions';
import AuthForm from '@components/statefull/authForm';

export class authFormContainer extends Component {
	static propTypes = {
		dispatch: PropTypes.func.isRequired
	};

	submit = e => this.props.dispatch(auth(e));

	render() {
		return <AuthForm {...this.state} submit={this.submit} />;
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
	dispatch;
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(authFormContainer);
