import * as d3 from 'd3';
import d3tip from 'd3tip';
import {Component, View, ElementRef, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import 'app/d3/layouts/histogram.scss!';

interface Row {
	x: number;
	y: number;
}

@Component({
	selector: 'd3-histogram',
	providers: [HTTP_PROVIDERS]
})
@View({
	template: `
	<div align="right">
		<input type="radio" name="binwidth" value="10">10
		<input type="radio" name="binwidth" value="20">20
		<input type="radio" name="binwidth" value="50">50
		<input type="radio" name="binwidth" checked value="100">100
		<input type="radio" name="binwidth" value="200">200
	</div>
	<svg class="d3-layout-histogram"></svg>
	`
})
export class HistogramLayout implements OnInit {
	private WIDTH:number = 960;
	private HEIGHT:number = 450;

	constructor(private elementRef:ElementRef,
				private http:Http) {
	}

	ngOnInit() {
		this.http
			.get('app/d3/layouts/histogram.tsv')
			.subscribe(r => {
				const margin = {top: 30, right: 20, bottom: 30, left: 50};
				const width:number = this.WIDTH - margin.left - margin.right;
				const height:number = this.HEIGHT - margin.top - margin.bottom;

				let xScale:d3.scale.Linear = d3.scale.linear().range([0, width]).domain([1000, 3000]);
				let yScale:d3.scale.Linear = d3.scale.linear().range([height, 0]);
				let xAxis:d3.svg.Axis = d3.svg.axis().scale(xScale).orient('bottom').ticks(5);
				let yAxis:d3.svg.Axis = d3.svg.axis().scale(yScale).orient('left').ticks(5);

				let svg:d3.Selection = d3.select(this.elementRef.nativeElement)
					.select('svg')
					.attr({
						width: this.WIDTH,
						height: this.HEIGHT
					})
					.append('g')
					.attr('transform', `translate(${margin.left}, ${margin.top})`)

				let data:Row[] = d3.dsv('\t', 'text/plain')
					.parse(r.text())
					.map(source => {
						return {
							x: parseFloat(source['x']),
							y: parseInt(source['y'])
						}
					});

				let binwidth:number = parseInt($(':radio[name=binwidth]:checked').val());
				let binRange:number[] = d3.range(xScale.domain()[0], xScale.domain()[1] + binwidth, binwidth);
				console.log(binRange);
				let histogram:d3.layout.Histogram = d3.layout.histogram()
					.bins(binRange);

				let hist:d3.layout.histogram.Bin[] = histogram(data.map(d => d.x))
				console.log(hist, d3.max(hist, d => d.y))
				let xBinwidth:number = width / hist.length - 1;
				yScale.domain([0, d3.max(hist, d => d.y)]);

				svg
					.selectAll('rect')
					.data(hist)
					.enter()
					.append('rect')
					.attr({
						class: 'bar',
						width: d => xBinwidth,
						height: d => height - yScale(d.y) - 1,
						x: d => xScale(d.x),
						y: d => yScale(d.y)
					})

				svg
					.selectAll('text')
					.data(hist)
					.enter()
					.append('text')
					.text(d => d.y)
					.attr({
						class: 'label',
						x: d => xScale(d.x + binwidth / 2),
						y: d => yScale(d.y) + 14,
						'text-anchor': 'middle'
					})

				svg
					.append('g')
					.attr({
						class: 'x axis',
						transform: `translate(0, ${height})`
					})
					.call(xAxis)

				let yAxisCanvas:d3.Selection = svg
					.append('g')
					.attr('class', 'y axis')
					.call(yAxis)

				$(':radio[name=binwidth]').on('change', (e) => {
					binwidth = parseInt(e.target.value);
					//console.log(e.target.value, binwidth);

					histogram = d3.layout.histogram()
						.bins(d3.range(xScale.domain()[0], xScale.domain()[1] + binwidth, binwidth))

					hist = histogram(data.map(d => d.x))

					yScale.domain([0, d3.max(hist, d => d.y)])
					xBinwidth = width / hist.length - 1;

					let update:d3.selection.Update = svg
						.selectAll('rect.bar')
						.data(hist.filter(d => height - yScale(d.y) > 0))

					update
						.enter()
						.append('rect')
						.attr({
							class: 'bar',
							width: d => xBinwidth,
							height: d => height - yScale(d.y) - 1,
							x: d => xScale(d.x),
							y: d => yScale(d.y)
						})

					update
						.attr({
							width: d => xBinwidth,
							height: d => height - yScale(d.y) - 1,
							x: d => xScale(d.x),
							y: d => yScale(d.y)
						})

					update
						.exit()
						.remove()

					if (binwidth > 20) {
						let update = svg
							.selectAll('text.label')
							.data(hist)

						update
							.enter()
							.append('text')
							.attr({
								class: 'label',
								x: d => xScale(d.x + binwidth / 2),
								y: d => yScale(d.y) + 14,
								'text-anchor': 'middle'
							})

						update
							.text(d => d.y)
							.attr({
								class: 'label',
								x: d => xScale(d.x + binwidth / 2),
								y: d => yScale(d.y) + 14,
								'text-anchor': 'middle'
							})

						update
							.exit()
							.remove()
					} else {
						svg
							.selectAll('text.label')
							.remove()
					}

					yAxisCanvas.call(yAxis)
				})
			})
	}
}