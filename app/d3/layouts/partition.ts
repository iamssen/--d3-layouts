import * as d3 from 'd3';
import d3tip from 'd3tip';
import {Component, View, ElementRef, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import 'app/d3/layouts/partition.scss!';

interface Node {
	children?: Node[];
	name:string;
	value:number;
	depth: number;
	size:number;
	// radian 시작점
	x:number;
	// radian 시작점 에서의 추가량
	dx:number;
	x0:number;
	dx0:number;
	// radius 시작점
	y:number;
	// radius 시작점 에서의 추가량
	dy:number;
}

interface Link<Node> {
	source:Node;
	target:Node;
}

interface Partition<Node> {
	sort(value:any):Partition<Node>;
	size(xy:[number, number]):Partition<Node>;
	value(value:(d:Node) => number):Partition<Node>;
	nodes(source:Object):Node[];
	links(nodes:Node[]):Link<Node>[];
}

declare module d3 {
	module layout {
		function partition():Partition<Node>;
	}
}

@Component({
	selector: 'd3-partition',
	providers: [HTTP_PROVIDERS]
})
@View({
	template: `
	<div align="right">
		<input type="radio" name="mode" checked="checked" value="count">Count
		<input type="radio" name="mode" value="size">Size
	</div>
	<svg class="d3-layout-partition"></svg>
	`
})
export class PartitionLayout implements OnInit {
	private RADIUS:number = 300;

	constructor(private elementRef:ElementRef,
				private http:Http) {
	}

	stash(d) {
		d.x0 = d.x;
		d.dx0 = d.dx;
	}


	arcTween(arc) {
		interface X {
			x:number;
			dx:number;
		}

		return (a:Node) => {
			let i = d3.interpolate({x: a.x0, dx: a.dx0}, a);
			return (t) => {
				var b:X = i(t) as X;
				a.x0 = b.x;
				a.dx0 = b.dx;
				return arc(b);
			};
		}
	}

	ngOnInit() {
		this.http
			.get('app/d3/layouts/partition.json')
			.subscribe(r => {
				//----------------------------------------------------------------
				// Svg and Data
				//----------------------------------------------------------------
				let svg = d3.select(this.elementRef.nativeElement)
					.select('svg')
					.attr({width: this.RADIUS * 2, height: this.RADIUS * 2})
					.append('g')
					.attr('transform', `translate(${this.RADIUS}, ${this.RADIUS})`);

				let root = JSON.parse(r.text());

				//----------------------------------------------------------------
				// Layout
				//----------------------------------------------------------------
				let partition:Partition<Node> = d3.layout.partition()
					// sort 자체가 달라지면 데이터의 정렬에 문제가 생기기 때문에 interpolation을 구현하기 어려운게 아닐까 싶다.
					// 그래서 sort 자체를 죽여놓고 시작해야 하는듯
					.sort(null)
					// 사이즈가 RADIUS * RADIUS 가 되어야만 정상적인 사이즈가 되는건 왜지?
					// [radian, radius]
					//.size([Math.PI * 2, this.RADIUS * this.RADIUS])
					.size([Math.PI * 2, this.RADIUS])
					// 기본값 Count → 아이템 하나를 1로 센다 (갯수로 셈)
					.value((d:Node) => 1);

				let color = d3.scale.category20c();

				//----------------------------------------------------------------
				// Nodes
				//----------------------------------------------------------------
				let nodes:Node[] = partition.nodes(root);

				let arc:(d) => string = d3.svg.arc()
					// radian
					.startAngle(d => d['x'])
					.endAngle(d => d['x'] + d['dx'])
					// radius
					//.innerRadius(d => Math.sqrt(d.y))
					//.outerRadius(d => Math.sqrt(d.y + d.dy))
					.innerRadius(d => d['y'])
					.outerRadius(d => d['y'] + d['dy'])

				nodes.forEach(n => console.log(`x=${n.x} y=${n.y} dx=${n.dx} dy=${n.dy}`))

				let path = svg
					.selectAll('path')
					.data(nodes)
					.enter()
					.append('path')
					.attr('display', d => d.depth ? null : 'none')
					.attr('d', arc)
					.style('fill', d => color((d.children ? d : d.parent).name))
					.style({
						'stroke': '#000000',
						'fill-rule': 'evenodd'
					})
					.each(this.stash);

				//----------------------------------------------------------------
				// Links
				//----------------------------------------------------------------
				//let links = partition.links(nodes);
				//let diagonal = d3.svg.diagonal().projection((node) => [node.x, node.y]);
				//
				//console.log(links);
				//
				//svg.selectAll('path')
				//	.data(links)
				//	.enter()
				//	.append('path')
				//	.classed('link', true)
				//	//.style('stroke-width', (link) => 5 - link.source.depth)
				//	.attr('d', diagonal)

				//----------------------------------------------------------------
				// option
				//----------------------------------------------------------------
				$('input[type=radio][name=mode]').on('change', (e) => {
					let func:(d:Node) => number = (e.target.value === 'count') ? (d:Node) => 1 : (d:Node) => d.size;

					path.data(partition.value(func).nodes(root))
						.transition()
						.duration(1500)
						.attrTween('d', this.arcTween(arc));
				});
			})
	}
}