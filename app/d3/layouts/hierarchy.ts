import * as d3 from 'd3';
import {Component, View, ElementRef, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';

interface Result extends d3.layout.hierarchy.Result {
	name: string;
}
interface Hierarchy<T> extends d3.layout.Hierarchy<T> {
}


@Component({
	selector: 'd3-hierarchy',
	providers: [HTTP_PROVIDERS]
})
@View({
	template: `<div class="d3-layout-hierarchy"></div>`
})
export class HierarchyLayout implements OnInit {
	private WIDTH:number = 560;
	private HEIGHT:number = 2200;

	constructor(private elementRef:ElementRef,
				private http:Http) {
	}

	ngOnInit() {
		this.http
			.get('app/d3/layouts/hierarchy.json')
			.subscribe(r => {
				//----------------------------------------------------------------
				// Container and Data
				//----------------------------------------------------------------
				let div:d3.Selection = d3.select(this.elementRef.nativeElement)
					.select('div')
					.attr({
						width: this.WIDTH,
						height: this.HEIGHT
					});

				let root = JSON.parse(r.text());

				//----------------------------------------------------------------
				// Layout
				//----------------------------------------------------------------
				let hierarchy:Hierarchy = d3.layout.hierarchy<Result>();

				//----------------------------------------------------------------
				// Nodes
				//----------------------------------------------------------------
				let nodes:Result[] = hierarchy(root);

				//----------------------------------------------------------------
				// Rendering
				//----------------------------------------------------------------
				div
					.selectAll('div')
					.data(nodes)
					.enter()
					.append('div')
					.text(d => d.name)
					.style('padding-left', d => `${d.depth * 10}px`)

				//console.log(nodes);
			})
	}
}