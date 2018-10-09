import getInfo from '@/functions/getInfo';
import { findLinks } from '@/functions/findLinks';
import * as d3 from 'd3';

export function converterToGraph(state) {
	const tree = state.graph.defaultTree;
	const nodes = getInfo(tree);
	const targets = nodes
		.map(el => {
			return findLinks(el);
		})
		.flat();
	const allLinks = nodes.map(el => d3.hierarchy(el).links());
	const converter = allLinks.flat().map(el => {
		return {
			source: el.source.data.id,
			target: el.target.data.id
		};
	});

	const links = converter.concat(targets);
	return { nodes, links };
}

export function getUsers(state) {
	const tree = state.graph.defaultTree;
	const nodes = getInfo(tree);
	return nodes;
}
