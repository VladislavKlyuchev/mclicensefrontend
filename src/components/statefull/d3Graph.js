import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import graph from './example.json';
import getInfo from '@/functions/getInfo';
var go;
function test(
	svg,
	nodes,
	links,
	myWidth,
	openContext,
	tree,
	setCurrentDefault,
	current
) {
	svg.selectAll('*').remove();

	var width = myWidth,
		height = +svg.attr('height'),
		g = svg.append('g');
	svg
		.call(
			d3.zoom().on('zoom', function() {
				if (d3.event.transform.k < 5 && d3.event.transform.k > 0.3) {
					g.attr('transform', d3.event.transform);
				}
			})
		)
		.append('g');
	var simulation = d3
		.forceSimulation()
		.force(
			'link',
			d3
				.forceLink()
				.id(function(d) {
					return d.id;
				})
				.distance(250)
				.strength(2.5)
		)
		.force('charge', d3.forceManyBody([200, 500]).theta(0.6))
		.force('center', d3.forceCenter(width / 2, height / 2));

	var link = g
		.append('g')
		.attr('class', 'links')
		.selectAll('line')
		.data(links)
		.enter()
		.append('line')
		.attr('stroke-width', function(d) {
			return Math.sqrt(2);
		})
		.attr('stroke', e => '#424242');

	var node = g
		.selectAll('circle.node')
		.data(nodes)
		.enter()
		.append('g')
		.attr('class', 'node')
		.on('click', clickNode)
		.on('mouseover', getViewNode)
		.on('mouseout', getViewDefault)
		.call(
			d3
				.drag()
				.on('start', dragstarted)
				.on('drag', dragged)
				.on('end', dragended)
		);
	node
		.append('svg:circle')
		.attr('r', 15)
		.attr('fill', (d, i) => {
			if (i == 0) return '#00f';
			return '#f00';
		});
	node
		.append('text')
		.text(function(d, i) {
			return d.id;
		})
		.attr('x', function(d, i) {
			return 16;
		})
		.attr('y', function(d, i) {
			if (i > 0) {
				return 10;
			} else {
				return 8;
			}
		})
		.attr('font-family', 'typeface-roboto');

	simulation.nodes(nodes).on('tick', ticked);

	simulation.force('link').links(links);

	function ticked() {
		link
			.attr('x1', function(d) {
				return d.source.x;
			})
			.attr('y1', function(d) {
				return d.source.y;
			})
			.attr('x2', function(d) {
				return d.target.x;
			})
			.attr('y2', function(d) {
				return d.target.y;
			});
		node.attr('transform', function(d, i) {
			return 'translate(' + d.x + ',' + d.y + ')';
		});
	}
	function getViewNode(d) {
		setCurrentDefault(d);
		const nodes = getInfo(d, tree);
		d3.selectAll('circle').style('fill-opacity', e => {
			return nodes.some(el => el.id == e.id) ? '1' : '0.1';
		});
		d3.selectAll('line').attr('stroke', e => {
			return nodes.some(el => el.id == e.source.id) ? '#000' : '#ccc';
		});
		d3.selectAll('text').style('fill-opacity', e => {
			return nodes.some(el => el.id == e.id) ? '1' : '0.1';
		});
	}
	function getViewDefault(d) {
		d3.selectAll('circle').style('fill-opacity', e => {
			return '1';
		});
		d3.selectAll('line').attr('stroke', e => {
			return '#424242';
		});
		d3.selectAll('text').style('fill-opacity', e => {
			return '1';
		});
	}
	function clickNode(d) {
		openContext(d);
	}
	function dragstarted(d) {
		if (!d3.event.active) simulation.alphaTarget(0.3).restart();
		d.fx = d.x;
		d.fy = d.y;
	}

	function dragged(d) {
		d.fx = d3.event.x;
		d.fy = d3.event.y;
	}

	function dragended(d) {
		if (!d3.event.active) simulation.alphaTarget(0);
		d.fx = null;
		d.fy = null;
	}
}

export class d3Graph extends Component {
	static propTypes = {};
	constructor(props) {
		super(props);
		this.state = {
			graph: null,
			width: null,
			nodes: 0,
			links: 0
		};
	}
	componentDidMount() {
		const {
			data: { nodes, links },
			tree,
			openContext,
			setCurrent
		} = this.props;
		const myWidth = 700;
		const svg = d3.select(go);
		test(svg, nodes, links, myWidth, openContext, tree, setCurrent);
	}
	shouldComponentUpdate(nextProps, nextState) {
		if (
			nextProps.data.nodes.length == this.state.nodes &&
			nextProps.data.links.length == this.state.links
		) {
			return false;
		} else {
			return true;
		}
	}
	render() {
		if (go && go !== null) {
			const {
				data: { nodes, links },
				tree,
				openContext,
				setCurrent
			} = this.props;
			const myWidth = 700;
			const svg = d3.select(go);
			this.setState({ nodes: nodes.length, links: links.length });
			test(svg, nodes, links, myWidth, openContext, tree, setCurrent);
		}
		return (
			<svg
				id="graph"
				ref={node => (go = node)}
				className="fullWidth"
				viewBox="0 0 900 600"
				height="600"
			/>
		);
	}
}

export default d3Graph;
