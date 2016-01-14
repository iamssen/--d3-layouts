import * as d3 from 'd3';
import {Component, View, ElementRef, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import 'app/d3/layouts/treemap.scss!';

//interface Node extends d3.layout.cluster.Result {
//	name?:string;
//}
//
//interface Link<Node> extends d3.layout.cluster.Link<Node> {
//}
//
//interface Cluster<Node> extends d3.layout.Cluster<Node> {
//}

@Component({
	selector: 'd3-treemap',
	providers: [HTTP_PROVIDERS]
})
@View({
	template: `<div class="d3-layout-treemap"></div>`
})
export class TreemapLayout implements OnInit {
	private WIDTH:number = 960;
	private HEIGHT:number = 500;

	constructor(private elementRef:ElementRef,
				private http:Http) {
	}

	position(selection) {
		selection.style({
			left: d => `${d.x}px`,
			top: d => `${d.y}px`,
			width: d => `${Math.max(0, d.dx - 1)}px`,
			height: d => `${Math.max(0, d.dy - 1)}px`
		})
	}

	ngOnInit() {
		this.http
			.get('app/d3/layouts/treemap.json')
			.subscribe(r => {
				let margin = {top: 40, right: 10, bottom: 10, left: 10};
				let width:number = this.WIDTH - margin.left - margin.right;
				let height:number = this.HEIGHT - margin.top - margin.bottom;

				let color = d3.scale.category20c();

				let treemap = d3.layout.treemap()
					.size([width, height])
					.sticky(true)
					.value((d, i) => d['size'])

				let div = d3.select(this.elementRef.nativeElement)
					.select('div')
					.style({
						position: 'relative',
						width: `${this.WIDTH}px`,
						height: `${this.HEIGHT}px`,
						left: `${margin.left}px`,
						top: `${margin.top}px`
					})

				let root = JSON.parse(r.text())
				let nodes = treemap.nodes(root)

				let node = div
					.selectAll('div')
					.data(nodes)
					.enter()
					.append('div')
					.attr('class', 'node')
					.call(this.position)
					.style('background', d => d.children ? color(d.name) : null)
					.text(d => d.children ? null : d.name)

				
			})
	}
}