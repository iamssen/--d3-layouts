import * as d3 from 'd3';
import d3tip from 'd3tip';
import {Component, View, ElementRef, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import 'app/d3/layouts/pack.scss!';

interface Node extends d3.layout.pack.Node {
	name?:string;
	size?:number;
}

interface Link<Node> extends d3.layout.pack.Link<Node> {
}

interface Pack<Node> extends d3.layout.Pack<Node> {
}

@Component({
	selector: 'd3-pack',
	providers: [HTTP_PROVIDERS]
})
@View({
	template: `<svg class="d3-layout-pack"></svg>`
})
export class PackLayout implements OnInit {
	private DIAMETER:number = 700;

	constructor(private elementRef:ElementRef,
				private http:Http) {
	}

	ngOnInit() {
		this.http
			.get('app/d3/layouts/pack.json')
			.subscribe(r => {
				//----------------------------------------------------------------
				// Svg and Data
				//----------------------------------------------------------------
				let svg = d3.select(this.elementRef.nativeElement)
					.select('svg')
					.attr({width: this.DIAMETER, height: this.DIAMETER})
					.append('g')
					.attr('transform', `translate(2, 2)`);

				let root = JSON.parse(r.text());

				//----------------------------------------------------------------
				// Layout
				//----------------------------------------------------------------
				let pack:Pack<Node> = d3.layout.pack()
					.size([this.DIAMETER - 4, this.DIAMETER - 4])
					.value((d) => d['size'])

				//----------------------------------------------------------------
				// Node
				//----------------------------------------------------------------
				let nodes:Node[] = pack.nodes(root);

				let node:d3.Selection<Node> = svg.selectAll('g')
					.data(nodes)
					.enter()
					.append('g')
					.classed('node', true)
					.classed('leaf', (d:Node) => !d.children)
					.attr('transform', (d:Node) => `translate(${d.x}, ${d.y})`)

				node.append('circle')
					.attr('r', (d:Node) => d.r)
					.filter((d:Node) => !d.children)
					.call(d3tip({
						formatter: (d:Node) => `${d.name}<br/>${d.size}<br/>${d.depth}`
					}))

				// Leaf Node만 걸러내서 Text를 Print한다
				node.filter((d:Node) => !d.children)
					.append('text')
					.attr('dy', '.3em')
					.style('font-size', (d:Node) => d.r * 0.7)
					.text((d:Node) => d.name.substring(0, d.r / 3))

				//----------------------------------------------------------------
				// Link
				//----------------------------------------------------------------
				let links:Link<Node>[] = pack.links(nodes);
				let diagonal = d3.svg.diagonal().projection((node:Node) => [node.x, node.y]);

				svg.selectAll('path')
					.data(links)
					.enter()
					.append('path')
					.classed('link', true)
					.style('stroke-width', (link:Link<Node>) => 5 - link.source.depth)
					.attr('d', diagonal)
			});
	}
}