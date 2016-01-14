import * as d3 from 'd3';
import d3tip from 'd3tip';
import {Component, View, ElementRef, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import 'app/d3/layouts/bundle.scss!';

interface Node extends d3.layout.cluster.Result, d3.layout.bundle.Node {
	name: string;
	imports: d3.layout.bundle.Link[];
	size: number;
	parent: Node;
	key: string;
}

@Component({
	selector: 'd3-bundle',
	providers: [HTTP_PROVIDERS]
})
@View({
	template: `<svg class="d3-layout-bundle"></svg>`
})
export class BundleLayout implements OnInit {
	private RADIUS:number = 400;

	constructor(private elementRef:ElementRef,
				private http:Http) {
		this.test1();
	}

	test1() {
		let list = [
			{name: 'a', related: ['b', 'c']},
			{name: 'b', related: ['c', 'f']},
			{name: 'c', related: ['e']},
			{name: 'd', related: ['f', 'a']},
			{name: 'e', related: ['a']},
			{name: 'f', related: ['c', 'd']},
		];

		let map = d3.map();
		list.forEach(d => map.set(d.name, d));

		let links = [];
		list.forEach(source => {
			source.related.forEach(related => {
				if (!map.has(related)) return;
				let target = map.get(related);
				source.parent = null;
				target.parent = null;
				links.push({source, target});
			})
		});

		links.forEach(link => {
			console.log(link.source.name, link.target.name);
		});

		let result = d3.layout.bundle()(links);
		console.log(result);
	}

	// [] → Tree
	toTree(classes:any[]):Node {
		let map:{[name:string]:Node} = {};

		function find(name:string, data?:Node):Node {
			let node:Node = map[name];

			if (!node) {
				node = data || {name: name, children: []};
				map[name] = node;

				if (name.length && name.length > 0) {
					let i:number = name.lastIndexOf('.');
					node.parent = find(name.substring(0, i));
					node.parent.children.push(node);
					node.key = name.substring(i + 1);
				}
			}

			return node;
		}

		classes.forEach((d:Node) => find(d.name, d));

		return map[''];
	}

	toLink(nodes:Node[]):d3.layout.bundle.Link<Node>[] {
		let map:{[name:string]:Node} = {};
		nodes.forEach(d => map[d.name] = d);

		let imports:d3.layout.bundle.Link<Node>[] = [];
		nodes
			.filter((d:Node) => Boolean(d.imports))
			.forEach((d:Node) => {
				d.imports.forEach(i => {
					imports.push({source: map[d.name], target: map[i]})
				});
			});

		return imports;
	}

	ngOnInit() {
		this.http
			.get('app/d3/layouts/bundle.json')
			.subscribe(r => {
				let diameter:number = this.RADIUS * 2;
				let radius:number = this.RADIUS;
				let innerRadius:number = this.RADIUS - 120;

				let cluster:d3.layout.Cluster<Node> = d3.layout.cluster<Node>()
					.size([360, innerRadius])
					.sort(null)
					.value((d:Node) => d.size);

				let bundle:d3.layout.Bundle<Node> = d3.layout.bundle<Node>();

				let line:d3.svg.Line = d3.svg.line.radial()
					.interpolate('bundle')
					.tension(0.8)
					.radius((d:Node) => d.y)
					.angle((d:Node) => d.x / 180 * Math.PI);

				let svg:d3.Selection = d3
					.select(this.elementRef.nativeElement)
					.select('svg')
					.attr({
						width: diameter,
						height: diameter
					})
					.append('g')
					.attr('transform', `translate(${radius}, ${radius})`);

				// {name, size, imports}
				let data:any[] = JSON.parse(r.text());
				// + cluster.Node {x, y}
				let clusterNodes:Node[] = cluster.nodes(this.toTree(data));
				// Node[] → cluster.Link<Node> {source: Node, target: Node}
				let clusterLinks:d3.layout.cluster.Link<Node>[] = this.toLink(clusterNodes);
				// Link<Node>[] → Node[][]
				let bundleNodes:Node[][] = bundle(clusterLinks);

				console.log(bundleNodes);

				svg
					.selectAll('path')
					.data(bundleNodes)
					.enter()
					.append('path')
					//.each(d => console.log(d))
					.style('stroke', d => d3.hsl(Math.random() * 360, 1, 0.6).toString())
					.attr({
						class: 'link',
						d: line
					});

				svg
				// append and rotate text container
					.selectAll('g')
					.data(clusterNodes.filter((d:Node) => !d.children))
					.enter()
					.append('g')
					.attr({
						class: 'node',
						transform: (d:Node) => `rotate(${d.x - 90}) translate(${d.y})`,
					})
					// append text
					.append('text')
					.text((d:Node) => d.key)
					//
					.attr({
						// text inner padding
						dx: (d:Node) => d.x < 180 ? 8 : -8,
						// vertical align middle
						dy: '0.31em',
						'text-anchor': (d:Node) => d.x < 180 ? 'start' : 'end',
						transform: (d:Node) => d.x < 180 ? null : 'rotate(180)'
					});
			});
	}
}