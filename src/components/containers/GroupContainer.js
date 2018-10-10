import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Groups from '@components/statefull/Group';
export class GroupContainer extends Component {
	static propTypes = {};

	render() {
		return <Groups {...this.props} />;
	}
}

const mapStateToProps = state => ({
	groups: [].concat(state.graph.groups),
	current: Object.assign({}, state.graph.current)
});

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GroupContainer);
