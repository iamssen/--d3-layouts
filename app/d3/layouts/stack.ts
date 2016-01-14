import * as d3 from 'd3';
import d3tip from 'd3tip';
import {Component, View, ElementRef, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import 'app/d3/layouts/stack.scss!';

interface Row {
	date:Date;
	total:number;
	disease:number;
	wounds:number;
	other:number;
}

@Component({
	selector: 'd3-stack',
	providers: [HTTP_PROVIDERS]
})
@View({
	template: `
	<svg class="d3-layout-stack"></svg>
	`
})
export class StackLayout implements OnInit {
	private WIDTH:number = 960;
	private HEIGHT:number = 500;

	constructor(private elementRef:ElementRef,
				private http:Http) {
	}

	ngOnInit() {
		this.http
			.get('app/d3/layouts/stack.tsv')
			.subscribe(r => {
				let margin = {top: 20, right: 50, bottom: 30, left: 20};
				let width:number = this.WIDTH - margin.left - margin.right;
				let height:number = this.HEIGHT - margin.top - margin.bottom;

				//----------------------------------------------------------------
				// Svg and Data
				//----------------------------------------------------------------
				let svg:d3.Selection = d3.select(this.elementRef.nativeElement)
					.select('svg')
					.attr({
						width: this.WIDTH,
						height: this.HEIGHT
					})
					.append('g')
					.style('transform', `translate(${margin.left}px, ${margin.top}px)`)

				let parseDate:(input:string) => Date = d3.time.format('%m/%Y').parse;
				let data:Row[] = d3.dsv('\t', 'text/plain')
					.parse(r.text())
					.map(source => {
						return {
							date: parseDate(source['date']),
							total: +source['total'],
							disease: +source['disease'],
							wounds: +source['wounds'],
							other: +source['other']
						}
					});

				//----------------------------------------------------------------
				// Scale
				//----------------------------------------------------------------
				// Ordinal<Date, number>
				let x = d3.scale.ordinal().rangeRoundBands([0, width]);
				let y:d3.scale.Linear = d3.scale.linear().rangeRound([height, 0]);

				//----------------------------------------------------------------
				// Columns
				// 방향이 Flex의 Stack column chart와 다르다
				// Flex = column set [column a, column b, column c]
				// D3 = series set [column a, column a, column a]
				//----------------------------------------------------------------
				const columnOrder:string[] = ['wounds', 'other', 'disease'];

				let values:{x:Date, y:number, title:string}[][] = columnOrder.map(f => {
					return data.map(d => {
						return {x: d.date, y: d[f], title: f};
					});
				});
				// values = {x, y, title}[][]
				//console.log(JSON.stringify(values, null, 2));

				let columns = d3.layout.stack()(values);
				// columns = {x, y, y0, title}[][]
				//console.log(JSON.stringify(columns, null, 2));

				x.domain(columns[0].map(d => d['x']));
				y.domain([0, d3.max(columns[columns.length - 1], d => d.y0 + d.y)]).nice();

				//----------------------------------------------------------------
				// Drawing
				//----------------------------------------------------------------
				// column color scale
				let color:d3.scale.Ordinal<string, string> = d3.scale.category10();

				// draw columns
				svg.selectAll('g')
					.data(columns)
					.enter()
					.append('g')
					.classed('layer', true)
					.style('fill', (d, i) => color(i))
					.selectAll('rect')
					.data(d => d)
					.enter()
					.append('rect')
					.attr({
						x: d => x(d.x),
						y: d => y(d.y + d.y0),
						width: x.rangeBand() - 1,
						height: d => y(d.y0) - y(d.y + d.y0)
					})
					.call(d3tip({
						html: d => `
						<table border="1">
							<tr>
								<th>title</th>
								<th>y</th>
								<th>y0</th>
							</tr>
							<tr>
								<td>${d.title}</td>
								<td>${d.y}</td>
								<td>${d.y0}</td>
							</tr>
						</table>
						`
					}))

				// axis renderer
				let xAxis:d3.svg.Axis = d3.svg.axis()
					.scale(x)
					.orient('bottom')
					.tickFormat(d3.time.format('%b'));

				let yAxis:d3.svg.Axis = d3.svg.axis()
					.scale(y)
					.orient('right')

				// draw axis
				svg.append('g')
					.classed({
						'axis': true,
						'axis--x': true
					})
					.style('transform', `translate(0, ${height}px)`)
					.call(xAxis)

				svg.append('g')
					.classed({
						'axis': true,
						'axis--y': true
					})
					.style('transform', `translate(${width}px, 0)`)
					.call(yAxis)
			})
	}
}