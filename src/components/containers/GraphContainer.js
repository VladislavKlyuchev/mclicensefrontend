import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openDialog } from '@redux/api/actions';
import { setCurrent } from '@redux/graph/actions';
import Graph from '@components/statefull/d3Graph';
import { converterToGraph } from '@redux/graph/selectors';
export class GraphContainer extends Component {
	static propTypes = {};

	render() {
		return <Graph {...this.props} />;
	}
}

const mapStateToProps = state => ({
	data: Object.assign({}, converterToGraph(state)),
	tree: Object.assign({}, state.graph.defaultTree)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	openContext: event => dispatch(openDialog(event)),
	setCurrent: event => dispatch(setCurrent(event))
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GraphContainer);
