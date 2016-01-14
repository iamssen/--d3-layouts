import * as d3 from 'd3';
import d3tip from 'd3tip';
import {Component, View, ElementRef, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import 'app/d3/layouts/pie.scss!';

interface Node {
	label:string;
	value:number;

	startAngle?:number;
	endAngle?:number;

	startAngle0?:number;
	endAngle0?:number;
}

@Component({
	selector: 'd3-pie',
	providers: [HTTP_PROVIDERS]
})
@View({
	template: `
	<div align="right">
		<button (click)="refresh()">Refresh</button>
	</div>
	<svg class="d3-layout-pie"></svg>
	`
})
export class PieLayout implements OnInit {
	private data:Node[];
	private pie;
	private arc;
	private path;
	private RADIUS:number = 300;

	constructor(private elementRef:ElementRef,
				private http:Http) {
	}

	stash(d:Node) {
		d.startAngle0 = d.startAngle;
		d.endAngle0 = d.endAngle;
	}

	arcTween(arc) {
		return (a) => {
			let i = d3.interpolate({startAngle: a.startAngle0, endAngle: a.endAngle0}, a);
			console.log('arcTween →', a);
			console.log(this.data)
			return (t) => {
				var b = i(t);
				a.startAngle0 = b.startAngle;
				a.endAngle0 = b.endAngle;
				return arc(b);
			};
		}
	}

	refresh() {
		let oldData:Node[] = this.data;
		let newData:Node[] = this.pie(this.getData());

		this.path.data(newData)
			.transition()
			.duration(1500)
			.attrTween('d', this.arcTween(this.arc))
	}

	getData():Node[] {
		let datas:Node[] = [];
		let f:number = -1;
		//let fmax:number = Math.floor(Math.random() * 6) + 3;
		let fmax:number = 7;
		while (++f < fmax) {
			datas.push({
				label: 'item' + f,
				value: Math.floor(Math.random() * 1000000)
			});
		}
		return datas;
	}

	ngOnInit() {
		//----------------------------------------------------------------
		// Svg and Data
		//----------------------------------------------------------------
		let svg = d3.select(this.elementRef.nativeElement)
			.select('svg')
			.attr({width: this.RADIUS * 2, height: this.RADIUS * 2})
			.append('g')
			.attr('transform', `translate(${this.RADIUS}, ${this.RADIUS})`);

		//----------------------------------------------------------------
		// Layout
		//----------------------------------------------------------------
		this.pie = d3.layout.pie<Node>()
			.sort(null)
			.value((d:any, i:number) => d.value);

		let color = d3.scale.category20();

		//----------------------------------------------------------------
		// Nodes
		//----------------------------------------------------------------
		this.data = this.pie(this.getData());

		this.arc = d3.svg.arc()
			.outerRadius(this.RADIUS - 10)
			.innerRadius(0);

		let labelArc = d3.svg.arc()
			.outerRadius(this.RADIUS - 40)
			.innerRadius(this.RADIUS - 40);

		let g = svg.selectAll('g')
			.data(this.data)
			.enter()
			.append('g')
			.classed('arc', true)
			.call(d3tip({
				formatter: (d) => `${d.data.label} → ${d.data.value}`
			}))
			.each(this.stash)

		console.log(this.data)

		this.path = g.append('path')
			.attr('d', this.arc)
			.style('fill', d => color(d.data.label));

		g.append('text')
			.attr('transform', d => `translate(${labelArc.centroid(d)})`)
			.attr('dy', '.35em')
			.text(d => d.data.label);

		// TODO random으로 데이터 생성
		// TODO interpolation 사용해서 데이터 바꾸기 테스트
	}
}