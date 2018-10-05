import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOpenContext } from '@redux/api/actions';
import Graph from '@components/statefull/Graph';
export class GraphContainer extends Component {
	static propTypes = {
		prop: PropTypes
	};

	render() {
		const nodes = [{ id: 'Node1' }, { id: 'Node2' }, { id: 'Node3' }];
		const links = [
			{ source: 'Node1', target: 'Node2' },
			{ source: 'Node2', target: 'Node3' }
		];
		return <Graph {...this.props ...th} />;
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
