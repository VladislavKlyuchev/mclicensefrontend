import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import graph from './example.json';
import { Divider } from 'semantic-ui-react';

export class d3Graph extends Component {
	static propTypes = {};
	constructor(props) {
		super(props)
		this.state = {
			graphRef: React.createRef()
		}
	} 
	componentDidMount() {

		function getArrayFromTree(object) {
			let array = [];
		  array.push(object);
			if(object.children && object.children.length > 0) {
			  for(let i = 0 ;i < object.children.length; i++) {
				array = array.concat(getArrayFromTree(object.children[i]))
			}
		  }
		  return array
		}
		function findLinks(objectT) {
			let array = [];
			if(objectT.targets && objectT.targets.length > 0) {
			  objectT.targets.forEach(el => {
				const obj = { source: objectT.id, target: el}
			  array.push(obj)
			})
		  }
		  if(objectT.children && objectT.children.length > 0) {
			   objectT.children.forEach(el =>  {
				var tmpArray = findLinks(el);
			  array.push(tmpArray.flat());
			})
		  }
		  return array.flat()
		}
		
		function searchTree(element, matchingTitle){
			if(element.id == matchingTitle){
				 return element;
			}else if (element.children != null){
				 var i;
				 var result = null;
				 for(i=0; result == null && i < element.children.length; i++){
					  result = searchTree(element.children[i], matchingTitle);
				 }
				 return result;
			}
			return null;
		}
		function findTargets(objectT) {
			let array = [];
			if(objectT.targets && objectT.targets.length > 0) {
			  objectT.targets.forEach(el => {
			  array.push(el)
			})
		  }
		  if(objectT.children && objectT.children.length > 0) {
			   objectT.children.forEach(el =>  {
				var tmpArray = findTargets(el);
			  array.push(tmpArray.flat());
			})
		  }
		  return array.flat()
		}
		function unicueArray(array, newArray ) {
			let result = [];
			for(var i = 0; i < newArray.length ; i++ ) {
			  var is = false;
			  for(let k = 0; k < array.length; k++) {
				if(array[k].id === newArray[i].id)  {
				  is = true
			  }
			}
			if(!is) result.push(newArray[i]) 
		  }
		  return array.concat(result)
		}
		var exampleTree = {
			id: 'Vasya',
		  children: [
			  {
				id: 'Nastya',
			  children: [ 
				  {
					id: 'Pasha',
				  children: [
					  {
						id: 'Givi'
					},
					{
						id: 'Yes',
					  targets: ['Sonya']
					}
				  ]
				}
			  ]
			},
			
			{
				id: 'Sonya',
			  children: [
				  {
					id: 'Katya',
				  children: [
					  {
						id:'Vova'
					},
					{
						id: 'Pok'
					}
				  ]
				},
				{
					id: 'Fury',
				  children: [
					  {
						id: 'AAAA',
					  targets: ['Pasha']
					}
				  ]
				}
			  ]
			}
		  ]
		}
		
		
		
		
		
		
		
		
		
		
		function getInfo(object, global, current = []) {
			console.log('current ', current)
			const targets = findTargets(object)
		  const currentArray = unicueArray(current, getArrayFromTree(object))
		  console.log('currentArray ', currentArray)
		  if(currentArray.length > 100 ) return; 
		  const objNotFound = targets.filter(el => currentArray.some((obj) => obj.id == el) !== true);
		  console.log('ObjectNotFound ', objNotFound)
		  const objectsFromTargets = objNotFound.map(el => searchTree(global, el))
			let result
		  if(objectsFromTargets && objectsFromTargets.length > 0) {
					  for(let i = 0; i < objectsFromTargets.length; i++) {
						console.log(objectsFromTargets)
					result = unicueArray(currentArray, getInfo(objectsFromTargets[i], global, currentArray))
				}
		  } else {
			  result = currentArray
		  }
		  return result
		}
		
		const nodes = getInfo(exampleTree.children[1], exampleTree)
		const Targets = nodes.map(el => {
			return findLinks(el)
		}).flat()
		
		console.log('targets ', Targets)
		
		const allLinks = nodes.map(el =>  d3.hierarchy(el).links())
		const converter = allLinks.flat().map( el => {
			return {
			  source: el.source.data.id,
			  target: el.target.data.id  
			}
		})
		const links = converter.concat(Targets)











		graph.nodes[0].id = graph.nodes[0].id;
		const myWidth = this.state.graphRef.current.clientWidth

		var svg = d3.select('svg#graph'),
			width = myWidth,
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
			.data(links)
			.enter()
			.append('line')
			.attr('stroke-width', function(d) {
				return Math.sqrt(2);
			})
			.attr('stroke', e => '#000');

		var node = g
			.selectAll('circle.node')
			.data(nodes)
			.enter()
			.append('g')
			.attr('class', 'node')
			.on("mouseover", getViewNode)
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
			console.log( d3.hierarchy(nodes, (e) => e.children)    )
			d3.selectAll('line')
			.attr('stroke', e => '#ff0');
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
		return 	<svg id="graph"
		ref={this.state.graphRef}
		className="fullWidth"
							viewBox="0 0 900 600"
							height="600"
						/>
	}
}

export default d3Graph;
