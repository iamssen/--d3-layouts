import * as d3 from 'd3';
import d3tip from 'd3tip';
import {Component, View, ElementRef, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import 'app/d3/layouts/force.scss!';

@Component({
	selector: 'd3-force',
	providers: [HTTP_PROVIDERS]
})
@View({
	template: `
	<div class="d3-layout-force"></div>
	<svg class="d3-layout-force"></svg>
	`
})
export class ForceLayout implements OnInit {
	private WIDTH:number = 600;
	private HEIGHT:number = 500;

	constructor(private elementRef:ElementRef,
				private http:Http) {
	}

	ngOnInit() {
		this.http
			.get('app/d3/layouts/force.json')
			.subscribe(r => {
				//----------------------------------------------------------------
				// Svg and Data
				//----------------------------------------------------------------
				let svg:d3.Selection = d3.select(this.elementRef.nativeElement)
					.select('svg')
					.attr({
						width: this.WIDTH,
						height: this.HEIGHT
					});

				let root:any = JSON.parse(r.text());

				let optionDatas = [
					{
						name: 'linkDistance',
						values: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200],
						default: 20
					},
					{
						name: 'linkStrength',
						values: [0, 0.5, 1, 1.5, 2],
						default: 1
					},
					{
						name: 'friction',
						values: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1.1],
						default: 0.9
					},
					{
						name: 'charge',
						values: [30, 0, -30, -80, -100, -130, -150, -180, -250],
						default: -130
					},
					{
						name: 'chargeDistance',
						values: [Infinity, 10, 100, 1000, 10000],
						default: Infinity
					},
					{
						name: 'theta',
						values: [0, 0.3, 0.5, 0.8, 1, 1.2, 1.5, 2],
						default: 0.8
					},
					{
						name: 'gravity',
						values: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 0.9, 1, 2, 3, 4],
						default: 0.1
					}
				]

				//----------------------------------------------------------------
				// Layout
				// http://totech.hateblo.jp/entry/2014/11/23/120003
				//----------------------------------------------------------------
				let force:d3.layout.Force<d3.layout.force.Node> = d3.layout.force()
					.size([this.WIDTH, this.HEIGHT])
					// (20) 링크 거리
					// 밀어내는 힘에 비해 거리가 짧으면 링크가 꺽여버리면서 보기 흉해진다
					.linkDistance(optionDatas.find(i => i.name === 'linkDistance').default)
					// (1) 링크 강도, 뭉치는 힘이 된다
					// 높을수록 거리는 더 짧아지고, 더 빠르게 뭉친다
					.linkStrength(optionDatas.find(i => i.name === 'linkStrength').default)
					// (0.9) 속도가 되는듯
					// 높을수록 좀 더 빠릿하게 뭉친고, 낮을수록 좀 더 느물느물 움직인다
					// 1 이상이 되면 움직임이 괴랄해진다 (날라가버린다)
					.friction(optionDatas.find(i => i.name === 'friction').default)
					// (30) 노드들 간에 당기는 힘
					// 노드들끼리 밀어내게 하기 위해 -값이 필요하다
					.charge(optionDatas.find(i => i.name === 'charge').default)
					// (Infinity) 거리가 된다 (뭉치는 힘)
					// 높을수록 밀어내고, 낮을수록 당긴다
					.chargeDistance(optionDatas.find(i => i.name === 'chargeDistance').default)
					// (0.8) 일정 거리가 되면 덩어리로 판단해서 움직임을 멈춘다
					// 너무 높거나, 낮으면 덩어리 계산 때문이 과해져서 인지 떨리는듯
					.theta(optionDatas.find(i => i.name === 'theta').default)
					// (0.1) 노드들 간에 당기는 힘이 된다 (charge랑 무슨 차이가 있는지...)
					// 음수가 되면 문제가 있다 (중력이 역방향으로 되어서인지 화면 밖으로 날라가버린다)
					.gravity(optionDatas.find(i => i.name === 'gravity').default)
					// (undefined) ??? 값을 바꿔도 영향이 없다
					.alpha(100000)
					.on('tick', tick);

				console.log('charge', force.charge()) // -30
				console.log('linkStrength', force.linkStrength()) // 1
				console.log('chargeDistance', force.chargeDistance()) // Infinity
				console.log('linkDistance', force.linkDistance()) // 20
				console.log('gravity', force.gravity()) // 0.1
				console.log('alpha', force.alpha()) // undefined
				console.log('theta', force.theta()) // 0.8
				console.log('friction', force.friction()) // 0.9

				//----------------------------------------------------------------
				// Nodes
				//----------------------------------------------------------------
				let drag:d3.behavior.Drag = force
					.drag()
					.on('dragstart', dragstart);

				// Tree처럼 계층형 데이터가 아닌지라,
				// link 정보를 자동으로 계산해주는 구조는 아니다
				force.nodes(root.nodes)
					.links(root.links)
					.start();

				console.log(force.nodes());
				console.log(force.links());

				let links:d3.Selection = svg
					.selectAll('line')
					.data(root.links)
					.enter()
					.append('line')
					.classed('link', true);

				let nodes:d3.Selection = svg
					.selectAll('circle')
					.data(root.nodes)
					.enter()
					.append('circle')
					.classed('node', true)
					.attr('r', 12)
					.on('dbclick', dbclick)
					.call(drag);

				//----------------------------------------------------------------
				// Listeners
				//----------------------------------------------------------------
				function tick() {
					links.attr({
						x1: (d:d3.layout.force.Link) => d.source.x,
						y1: (d:d3.layout.force.Link) => d.source.y,
						x2: (d:d3.layout.force.Link) => d.target.x,
						y2: (d:d3.layout.force.Link) => d.target.y
					})

					nodes.attr({
						cx: (d:d3.layout.force.Node) => d.x,
						cy: (d:d3.layout.force.Node) => d.y
					})
				}

				function dragstart(d:d3.layout.force.Node) {
					d.fixed = true;
					d3.select(this).classed('fixed', true);
					console.log('force.ts..dragstart()', d);
				}

				function dbclick(d:d3.layout.force.Node) {
					d.fixed = false;
					d3.select(this).classed('fixed', false);
					console.log('force.ts..dbclick()', d);
				}

				//----------------------------------------------------------------
				// Options
				//----------------------------------------------------------------
				let options:d3.Selection = d3.select(this.elementRef.nativeElement)
					.select('div')

				let select:d3.Selection = options
					.selectAll('p')
					.data(optionDatas)
					.enter()
					.append('p')

				select
					.append('select')
					.on('change', function (o) {
						force[o['name']](this.value);
						force.start();
					})
					.selectAll('option')
					.data(o => {
						let values:number[] = o['values'];
						return values.map(n => {
							return {value: n, selected: o['default'] === n}
						});
					})
					.enter()
					.append('option')
					.text(d => d['value'].toString())
					.attr('value', d => d['value'])
					.property('selected', d => d.selected)

				select
					.append('span')
					.html(o => ` ${o['name']}`)
			})
	}
}