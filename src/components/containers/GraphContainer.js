import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOpenContext } from '@redux/api/actions';

export class GraphContainer extends Component {
	static propTypes = {
		prop: PropTypes
	};

	render() {
		return <div />;
	}
}

const mapStateToProps = state => ({
	nodes: state.graph.currentNodes
		? state.graph.currentNodes
		: state.graph.defaultNodes,
	links: state.graph.currentLinks
		? state.graph.currentLinks
		: state.graph.defaultLinks
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	openContext: event => dispatch(getOpenContext(event))
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GraphContainer);
