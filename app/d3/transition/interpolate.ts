import * as d3 from 'd3';
import d3tip from 'd3tip';
import {Component, View, ElementRef, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import 'app/d3/transition/interpolate.scss!';

@Component({
	selector: 'd3-transition-interpolate',
	providers: [HTTP_PROVIDERS]
})
@View({
	template: `<table class="d3-transition-interpolate"></table>`
})
export class TransitionInterpolate implements OnInit {
	constructor(private elementRef:ElementRef) {
	}
	
	ngOnInit() {
		const fmax:number = 100;
		let data:any[] = d3.range(fmax + 1).map(i => {
			return {index: i};
		});

		let interpolate:(t:number) => any;
		let columns:string[] = [];
		let column:string;

		column = 'interpolateString';
		columns.push(column);
		interpolate = d3.interpolateString('x(0)', 'x(1)');
		for (let f:number = -1; ++f <= fmax;) {
			data[f][column] = interpolate(f / fmax);
		}

		column = 'interpolateNumber';
		columns.push(column);
		interpolate = d3.interpolateNumber(0, 1);
		for (let f:number = -1; ++f <= fmax;) {
			data[f][column] = interpolate(f / fmax);
		}

		column = 'interpolateRound';
		columns.push(column);
		interpolate = d3.interpolateRound(0, 1);
		for (let f:number = -1; ++f <= fmax;) {
			data[f][column] = interpolate(f / fmax);
		}

		column = 'interpolateRgb';
		columns.push(column);
		interpolate = d3.interpolateRgb(d3.rgb(0, 0, 0), d3.rgb(255, 255, 255));
		for (let f:number = -1; ++f <= fmax;) {
			data[f][column] = interpolate(f / fmax);
		}

		column = 'interpolateArray';
		columns.push(column);
		interpolate = d3.interpolateArray([0, 0, 0], [1, 1, 1]);
		for (let f:number = -1; ++f <= fmax;) {
			data[f][column] = interpolate(f / fmax).toString();
		}

		column = 'interpolateObject';
		columns.push(column);
		interpolate = d3.interpolateObject({a: 0, b: 0}, {a: 1, b: 1});
		for (let f:number = -1; ++f <= fmax;) {
			data[f][column] = JSON.stringify(interpolate(f / fmax));
		}

		function interpolateChar(a:string, b:string):(t:number) => string {
			let interpolate = d3.interpolateRound(a.charCodeAt(0), b.charCodeAt(0));
			return (t:number) => String.fromCharCode(interpolate(t));
		}

		column = 'custom1';
		columns.push(column);
		interpolate = interpolateChar('a', 'z');
		for (let f:number = -1; ++f <= fmax;) {
			data[f][column] = interpolate(f / fmax);
		}

		function interpolateString(str:string):(t:number) => string {
			let interpolate = d3.interpolateNumber(0, str.length);
			return (t:number) => {
				let n:number = interpolate(t);
				let f:number = Math.floor(n);
				let newString:string = str.substr(0, f);
				if (n - f > 0.5) newString += '_';
				return newString;
			}
		}

		column = 'custom2';
		columns.push(column);
		interpolate = interpolateString('hello world!!!');
		for (let f:number = -1; ++f <= fmax;) {
			data[f][column] = interpolate(f / fmax);
		}

		//----------------------------------------------------------------
		// 뭔가 에러가 있다... 숫자 interpolation이 제대로 안됨
		//----------------------------------------------------------------
		//column = 'interpolateTransform';
		//columns.push(column);
		//interpolate = d3.interpolateTransform('rotate(0)', 'rotate(180)translate(100, 100)');
		//for (let f:number = -1; ++f <= fmax;) {
		//	data[f][column] = interpolate(f / fmax);
		//}

		let table = d3
			.select(this.elementRef.nativeElement)
			.select('table')

		table
			.append('tr')
			.selectAll('th')
			.data(columns)
			.enter()
			.append('th')
			.text(column => column)

		table
			.selectAll('.tr')
			.data(data)
			.enter()
			.append('tr')
			.html(d => columns.map(column => `<td>${d[column]}</td>`).join(''));
	}
}