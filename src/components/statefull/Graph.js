import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Graph as SomeGraph } from 'react-d3-graph';
import * as d3 from 'd3';
const myConfig = {
	automaticRearrangeAfterDropNode: false,
	collapsible: false,
	height: 400,
	highlightDegree: 1,
	highlightOpacity: 0.2,
	maxZoom: 8,
	minZoom: 0.1,
	panAndZoom: false,
	staticGraph: false,
	width: 800,
	d3: {
		alphaTarget: 0.05,
		gravity: -100,
		linkLength: 100,
		linkStrength: 1
	},
	node: {
		color: '#d3d3d3',
		fontColor: 'black',
		fontSize: 12,
		fontWeight: 'normal',
		highlightColor: 'red',
		highlightFontSize: 12,
		highlightFontWeight: 'bold',
		highlightStrokeColor: 'SAME',
		highlightStrokeWidth: 1.5,
		labelProperty: 'name',
		mouseCursor: 'pointer',
		opacity: 1,
		renderLabel: true,
		size: 450,
		strokeColor: 'none',
		strokeWidth: 1.5,
		svg: '',
		symbolType: 'circle'
	},
	link: {
		color: '#d3d3d3',
		opacity: 1,
		semanticStrokeWidth: false,
		strokeWidth: 4,
		highlightColor: 'blue'
	}
};

export class Graph extends Component {
	static propTypes = {
		nodes: PropTypes.array.isRequired,
		links: PropTypes.array.isRequired
	};
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		let nodes = [{ id: 'Node1' }, { id: 'Node2' }, { id: 'Node3' }];
		let links = [];
		nodes[0].id = 'GA ' + nodes[0].id;
		const someData = { nodes, links };
		// graph event callbacks
		const onClickGraph = function() {
			//		window.alert(`Clicked the graph background`);
		};

		const onClickNode = function(nodeId) {
			//		window.alert(`Clicked node ${nodeId}`);
		};

		const onMouseOverNode = function(nodeId, f) {
			console.log(nodeId);
			console.log(f);
			//		window.alert(`Mouse over node ${nodeId}`);
		};

		const onMouseOutNode = function(nodeId) {
			//		window.alert(`Mouse out node ${nodeId}`);
		};

		const onClickLink = function(source, target) {
			//		window.alert(`Clicked link between ${source} and ${target}`);
		};

		const onMouseOverLink = function(source, target) {
			//		window.alert(`Mouse over in link between ${source} and ${target}`);
		};

		const onMouseOutLink = function(source, target) {
			//		window.alert(`Mouse out link between ${source} and ${target}`);
		};
		return (
			<React.Fragment>
				<SomeGraph
					id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
					data={someData}
					config={myConfig}
					onClickNode={onClickNode}
					onClickGraph={onClickGraph}
					onClickLink={onClickLink}
					onMouseOverNode={onMouseOverNode}
					onMouseOutNode={onMouseOutNode}
					onMouseOverLink={onMouseOverLink}
					onMouseOutLink={onMouseOutLink}
				/>
				;
			</React.Fragment>
		);
	}
}

export default Graph;
