import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Example from '@components/stateless/example';
import { setUser } from '@redux/api/actions';

export class example extends Component {
	static propTypes = {
		prop: PropTypes
	};

	render() {
		return <Example {...this.props} />;
	}
}

const mapStateToProps = state => ({
	user: state.api.user
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	onClick: event => dispatch(setUser({ name: 'Volodya' }))
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(example);
