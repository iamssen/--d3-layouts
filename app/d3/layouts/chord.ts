import * as d3 from 'd3';
import d3tip from 'd3tip';
import {Component, View, ElementRef, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import 'app/d3/layouts/chord.scss!';

//interface Node extends d3.layout.cluster.Result, d3.layout.bundle.Node {
//	name: string;
//	imports: d3.layout.bundle.Link[];
//	size: number;
//	parent: Node;
//	key: string;
//}

@Component({
	selector: 'd3-chord',
	providers: [HTTP_PROVIDERS]
})
@View({
	template: `<svg class="d3-layout-chord"></svg>`
})
export class ChordLayout implements OnInit {
	private RADIUS:number = 400;

	constructor(private elementRef:ElementRef,
				private http:Http) {
	}

	ngOnInit() {
		this.http
			.get('app/d3/layouts/chord.json')
			.subscribe(r => {
				let outerRadius:number = this.RADIUS;
				let innerRadius:number = outerRadius - 100;

				let fill:d3.scale.Ordinal<string, string> = d3.scale.category20c();

				let chord:d3.layout.Chord = d3.layout.chord()
					.padding(0.04)
					.sortSubgroups(d3.descending)
					.sortChords(d3.descending)

				let arc:d3.svg.Arc = d3.svg.arc()
					.innerRadius(innerRadius)
					.outerRadius(innerRadius + 20)

				let svg:d3.Selection = d3.select(this.elementRef.nativeElement)
					.select('svg')
					.attr({
						width: this.RADIUS * 2,
						height: this.RADIUS * 2
					})
					.append('g')
					.attr('transform', `translate(${outerRadius}, ${outerRadius})`);


				let imports:any[] = JSON.parse(r.text());


				let indexByName:d3.Map<string> = d3.map();
				let nameByIndex:d3.Map<number> = d3.map();
				let matrix:number[][] = [];
				let n:number = 0;

				function name(name:string):string {
					return name.substring(0, name.lastIndexOf('.')).substring(6);
				}

				imports.forEach((d:any) => {
					let nm:string = name(d.name);
					if (!indexByName.has(nm)) {
						nameByIndex.set(n.toString(), nm);
						indexByName.set(nm, n++);
					}
				});

				imports.forEach((d:any) => {
					let nm:string = name(d.name);
					let source:string = indexByName.get(nm);
					let row = matrix[source];
					if (!row) {
						row = matrix[source] = [];

						let f:number = -1;
						while (++f < n) {
							row[f] = 0;
						}
					}
					d.imports.forEach(nm => row[indexByName.get(name(nm))]++);
				});

				chord.matrix(matrix);

				console.log('matrix', matrix);
				console.log('groups', chord.groups());
				console.log('chords', chord.chords());

				// 외부 Arc
				let chordGroups:d3.layout.chord.Group[] = chord.groups();

				let g:d3.Selection = svg
					.selectAll('.group')
					.data(chordGroups)
					.enter()
					.append('g')
					.attr('class', 'group')

				g
					.append('path')
					.style({
						fill: d => fill(d.index),
						stroke: d => fill(d.index)
					})
					.attr('d', arc)

				g
					.append('text')
					.each((d:any) => d.textAngle = (d.startAngle + d.endAngle) / 2)
					.attr({
						dy: '0.35em',
						transform: d => `rotate(${d.textAngle * 180 / Math.PI - 90}) translate(${innerRadius + 26})${(d.textAngle > Math.PI) ? 'rotate(180)' : ''}`
					})
					.style('text-anchor', d => (d.textAngle > Math.PI) ? 'end' : null)
					.text(d => nameByIndex.get(d.index))

				// 내부 Chord
				let chordLinks:d3.layout.chord.Link[] = chord.chords();

				svg
					.selectAll('.chord')
					.data(chordLinks)
					.enter()
					.append('path')
					.attr('class', 'chord')
					.style({
						stroke: d => d3.rgb(fill(d.source.index)).darker(),
						fill: d => fill(d.source.index)
					})
					.attr('d', d3.svg.chord().radius(innerRadius))
			})
	}
}