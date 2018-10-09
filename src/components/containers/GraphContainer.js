import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openDialog } from '@redux/api/actions';
import Graph from '@components/statefull/d3Graph';
import { converterToGraph } from '@redux/graph/selectors';
export class GraphContainer extends Component {
	static propTypes = {};

	render() {
		return <Graph {...this.props} />;
	}
}

const mapStateToProps = state => ({
	data: converterToGraph(state),
	tree: state.graph.defaultTree
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	openContext: event => dispatch(openDialog(event))
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GraphContainer);
