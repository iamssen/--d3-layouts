import * as d3 from 'd3';
import d3tip from 'd3tip';
import {Component, View, ElementRef, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
//import 'app/d3/layouts/bundle.scss!';

@Component({
	selector: 'd3-transition-basic',
	providers: [HTTP_PROVIDERS]
})
@View({
	template: `<svg class="d3-transition-basic"></svg>`
})
export class TransitionBasic implements OnInit {
	private WIDTH:number = 500;
	private HEIGHT:number = 400;

	constructor(private elementRef:ElementRef,
				private http:Http) {
	}

	twizzle(selection:d3.Selection, duration:number) {
		//selection
		//	.transition('twizzle')
		//	.duration(duration)
		//	.attrTween('transform', () => d3.interpolateString('rotate(0)', 'rotate(720)'))
		//	.transition()
		//	.duration(Math.random() * duration)
		//	.each('end', () => selection.call(this.twizzle))
	}

	ngOnInit() {
		let svg = d3
			.select(this.elementRef.nativeElement)
			.select('svg')
			.attr({
				width: this.WIDTH,
				height: this.HEIGHT
			});
		/*
		Transition<Datum>

		- transition(): Transition<Datum>
		- delay()
			- (): number
			- (delay: number): this
			- (delay: (d, i, o) => number): this
		- duration()
			- (): number
			- (duration: number): this
			- (duration: (d, i, o) => number): this
		- ease()
			- (): (t: number) => number
			- (value: string, ...args: any[]): this
			- (value: (t: number) => number): this
		- attrTween(name: string, tween: (d, i, attr: string) => (t: number) => Primitive): this
		- styleTween(name: string, tween: (d, i, attr: string) => (t: number) => Primitive, priority?: string): this
		- tween(name: string, factory: () => (t: number) => any): this
		- select()
		- selectAll()
		- filter()
		- each()
		- attr()
		- style()
		- text()
		- call()
		- empty()
		- node()
		- size()
		 */

		svg
			.append('g')
			.attr('transform', `translate(${this.WIDTH / 2}, ${this.HEIGHT / 2})`)
			.append('path')
			.attr('d', d3.svg.symbol().type('cross').size(50000))
			//---------------------------------------------
			// transition1
			//---------------------------------------------
			.transition()
			.duration(5000)
			.tween('custom tween', function (d, i) {
				console.log(d, i);
				let opacity = d3.interpolateNumber(0, 1);
				let rotate = d3.interpolateNumber(0, 720);
				let selection = d3.select(this);
				return (t:number) => {
					selection.style('opacity', opacity(t));
					selection.attr('transform', `rotate(${rotate(t)})`)
				}
			})
			//.styleTween('opacity', () => d3.interpolateNumber(0, 1))
			//.attrTween('transform', () => d3.interpolateString('rotate(0)', 'rotate(720)'))
			.each('start', (d, i) => console.log('start', d, i))
			.each('interrupt', (d, i) => console.log('interrupt', d, i))
			.each('end', (d, i) => console.log('end', d, i))
			//---------------------------------------------
			// transition2
			//---------------------------------------------
			.transition()
			.duration(5000)
			.styleTween('opacity', () => d3.interpolateNumber(1, 0))
			.attrTween('transform', () => d3.interpolateString('rotate(720)', 'rotate(0)'))

		//.call(this.twizzle)
	}
}