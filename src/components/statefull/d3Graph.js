import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import graph from './example.json';
import { Divider } from 'semantic-ui-react';

export class d3Graph extends Component {
	static propTypes = {};
	componentDidMount() {
		graph.nodes[0].id = graph.nodes[0].id;

		var svg = d3.select('svg#test'),
			width = +svg.attr('width'),
			height = +svg.attr('height'),
			g = svg.append('g');
		svg
			.call(
				d3.zoom().on('zoom', function() {
					console.log(d3.event.transform.k);
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
					.distance(100)
					.strength(0.5)
			)
			.force('charge', d3.forceManyBody([100, 500]))
			.force('center', d3.forceCenter(width / 2, height / 2));

		var link = g
			.append('g')
			.attr('class', 'links')
			.selectAll('line')
			.data(graph.links)
			.enter()
			.append('line')
			.attr('stroke-width', function(d) {
				return Math.sqrt(2);
			})
			.attr('stroke', e => '#000');

		var node = g
			.selectAll('circle.node')
			.data(graph.nodes)
			.enter()
			.append('g')
			.attr('class', 'node')
			.call(
				d3
					.drag()
					.on('start', dragstarted)
					.on('drag', dragged)
					.on('end', dragended)
			);
		node
			.append('svg:circle')
			.attr('cx', function(d) {
				return d.x;
			})
			.attr('cy', function(d) {
				return d.y;
			})
			.attr('r', 8)
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
				return 10;
			})
			.attr('y', function(d, i) {
				if (i > 0) {
					return 10;
				} else {
					return 8;
				}
			})
			.attr('font-family', 'Bree Serif');

		simulation.nodes(graph.nodes).on('tick', ticked);

		simulation.force('link').links(graph.links);

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
	render() {
		return <div />;
	}
}

export default d3Graph;
