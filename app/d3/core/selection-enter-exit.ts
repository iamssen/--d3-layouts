import {Component, View, ElementRef, OnInit} from 'angular2/core';
import * as utils from 'app/d3/d3-utils';
import 'app/d3/core/selection-enter-exit.scss!';

interface Data {
	label:string;
	children?:Data[];
}

@Component({
	selector: 'selection-enter-exit'
})
@View({
	template: `
	<div align="right"><button (click)="refresh()">Referesh</button></div>
	<ul class="d3-selection-enter-exit"></ul>
	`,
	directives: []
})
export class SelectionEnterExit implements OnInit {
	constructor(private elementRef:ElementRef) {
	}

	createRandomData():Data[] {
		let char:string = String.fromCharCode('A'.charCodeAt(0) + Math.floor(Math.random() * 24));
		let d1:Data[] = [];
		let f:number = -1;
		let fmax:number = 2 + Math.floor(Math.random() * 7);
		while (++f < fmax) {
			let d:Data = {label: `${char}:${f + 1}`};
			if (Math.random() > 0.3) {
				let d2:Data[] = [];
				let s:number = -1;
				let smax:number = 1 + Math.floor(Math.random() * 10);
				while (++s < smax) {
					d2.push({
						label: `${char}:${f + 1}:${s + 1}`
					});
				}
				d.children = d2;
			}
			d1.push(d);
		}

		return d1;
	}

	multiply(char:string, count:number):string {
		if (count <= 0) return '';
		let result:string[] = [];
		while (--count >= 0) {
			result.push(char);
		}
		return result.join('');
	}

	refresh() {
		let data:Data[] = this.createRandomData();

		console.log('data.length →\n' + d3.layout.cluster()
				.nodes({children: data})
				.slice(1)
				.map((d:{depth:number, label:string}) => `${this.multiply('..', d.depth - 1)}${d.label}`)
				.join('\n')
		);

		let ul:d3.Selection = d3
			.select(this.elementRef.nativeElement)
			.select('ul')

		//---------------------------------------------
		// Depth1
		//---------------------------------------------
		let li:d3.selection.Update<Data> = ul
			.selectAll(utils.children('li'))
			.data(data)

		// Update 상태에서 기존에 잔존해 있는 Node들을 수정한다
		li
			.select('span') // text() 때문에 하위 Node들이 전부 사라져버리게 되는 것을 방지
			.text(d => d.label)

		// Enter로 진입해서 모자란 Node들을 추가한다
		li
			.enter() // Update.enter() → Enter
			.append('li') // Enter.append() → Selection
			.append('span')
			.text(d => d.label)

		// Update에서 나와서 데이터가 없는 것들을 제거한다
		li
			.exit() // Update.exit() → Selection
			.remove()


		//---------------------------------------------
		// Depth2
		//---------------------------------------------
		// 위에서 Depth1이 정리된 상태이기 때문에 <li>에 enter(), exit()는 필요없다
		// data() → 이미 존재하는 <element>들
		// exit() → 데이터가 대입되지 않은 남는 <element>들
		// enter() → 데이터가 있지만 <element>가 없는 가상 <element>들
		li = ul
			.selectAll(utils.children('li'))
			.data(data)
			.classed('highlight', false)

		// 하위 children이 없는 경우 <ul>을 제거
		li
			.filter(d => !d.children) // 하위 데이터가 없는 것들만 필터링
			.select('ul')
			.remove()

		// 하위 children이 있는 경우 <ul>을 준비 - appendIfNotExists()를 사용
		let ul2:d3.selection.Update<Data> = li
			.filter(d => d.children && d.children.length > 0) // 하위 데이터가 있는 것들만 필터링
			.classed('highlight', true)
			.call(utils.appendIfNotExists('ul')) // 하위의 <ul>을 체크해서 만들어줌
			.select('ul')

		// 아래부터는 동일
		let li2 = ul2
			.selectAll('li')
			.data(d => d.children)

		li2
			.text(d => d.label)

		li2
			.enter()
			.append('li')
			.text(d => d.label)

		li2
			.exit()
			.remove()
	}
	
	ngOnInit() {
		this.refresh();
	}
}