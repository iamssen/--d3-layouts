import * as d3 from 'd3';
import d3tip from 'd3tip';
import {Component, View, ElementRef, OnInit} from 'angular2/core';

@Component({
	selector: 'd3-transition-pie'
})
@View({
	template: `
	<div align="right">
		<button id="refresh">REFRESH</button>
	</div>
	<svg class="d3-transition-pie"></svg>
	`
})
export class TransitionPie implements OnInit {
	private RADIUS:number = 300;

	constructor(private elementRef:ElementRef) {
	}

	getData():any[] {
		return d3
			.range((Math.random() * 10) + 5)
			.map(i => {
				return {
					label: 'item' + i,
					value: Math.floor(Math.random() * 100000)
				}
			});
	}

	ngOnInit() {
		//----------------------------------------------------------------
		// Svg and Data
		//----------------------------------------------------------------
		let g = d3.select(this.elementRef.nativeElement)
			.select('svg')
			.attr({width: this.RADIUS * 2, height: this.RADIUS * 2})
			.append('g')
			.attr('transform', `translate(${this.RADIUS}, ${this.RADIUS})`);

		//----------------------------------------------------------------
		// Layout
		//----------------------------------------------------------------
		let pie:d3.layout.Pie = d3.layout.pie().value((d:any, i:number) => d.value);

		let color:d3.scale.Ordinal<string, string> = d3.scale.category20();

		//----------------------------------------------------------------
		// Nodes
		//----------------------------------------------------------------
		const DURATION:number = 1000;
		let path;

		let arc = d3.svg.arc()
			.outerRadius(this.RADIUS - 20)
			.innerRadius(this.RADIUS - 27);

		function entry(g:d3.Selection, source:any[]):d3.Selection {
			let data:any[] = pie(source);

			let path:d3.Selection = g
				.selectAll('.path')
				.data(data)
				.enter()
				.append('path')
				.attr('fill', (d, i) => color(i.toString()));

			path
				.transition()
				.duration(DURATION)
				.tween('entry arc', function () {
					let selection = d3.select(this);
					return (t:number) => {
						selection
							.attr('d', (d, i) => {
								let start = d.startAngle * t;
								let end = d.endAngle * t;
								return arc.startAngle(start).endAngle(end)(d, i);
							})
					}
				});

			return path;
		}

		function exit(path:d3.Selection) {
			path
				.transition()
				.duration(DURATION)
				.tween('exit arc', function () {
					let selection = d3.select(this);
					return (t:number) => {
						let r = 1 - t;
						let a = (Math.PI * 2) - (Math.PI * 2 * r);
						selection
							.attr('d', (d, i) => {
								let start = (d.startAngle * r) + a;
								let end = (d.endAngle * r) + a;
								return arc.startAngle(start).endAngle(end)(d, i);
							})
					}
				})
				.remove();
		}

		//----------------------------------------------------------------
		// control
		//----------------------------------------------------------------
		path = entry(g, this.getData());

		d3
			.select(this.elementRef.nativeElement)
			.select('#refresh')
			.on('click', () => {
				exit(path);
				path = entry(g, this.getData());
			});
	}
}