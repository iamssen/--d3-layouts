import * as d3 from 'd3';
import {Component, View, ElementRef, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import 'app/d3/layouts/cluster.scss!';

interface Node extends d3.layout.cluster.Result {
	name?:string;
}

interface Link<Node> extends d3.layout.cluster.Link<Node> {
}

interface Cluster<Node> extends d3.layout.Cluster<Node> {
}

@Component({
	selector: 'd3-cluster',
	providers: [HTTP_PROVIDERS]
})
@View({
	template: `<svg class="d3-layout-cluster"></svg>`
})
export class ClusterLayout implements OnInit {
	private WIDTH:number = 560;
	private HEIGHT:number = 2200;

	constructor(private elementRef:ElementRef,
				private http:Http) {
	}

	ngOnInit() {
		this.http
			.get('app/d3/layouts/cluster.json')
			.subscribe(r => {
				//----------------------------------------------------------------
				// Svg and Data
				//----------------------------------------------------------------
				let svg = d3.select(this.elementRef.nativeElement)
					.select('svg')
					.attr({width: this.WIDTH, height: this.HEIGHT})
					.append('g')
					.attr('transform', 'translate(40, 0)');

				let root = JSON.parse(r.text());

				//----------------------------------------------------------------
				// Layout
				//----------------------------------------------------------------
				let cluster:Cluster<Node> = d3.layout.cluster<Node>()
					// ??? Node에 value라는 숫자형 데이터를 추가한다
					// 어따 쓰는건지는 잘 모르겠다
					//.value((node:Node) => 3)
					// cluster layout의 물리적인 size를 지정한다
					.size([this.HEIGHT, this.WIDTH - 160])
					// 기본은 `node => node.children`
					// 하위 리스트가 `children`이 아닐때 사용 가능하다
					// 하위의 오픈을 조절할 수 있다
					// 하위 Children의 닫기 기능을 만들때 유용할 듯...
					.children((node:Node) => {
						if (node.depth < 2) {
							return node.children;
						} else {
							return null;
						}
					})
					// 뭔가 Node들을 분해시키는데... 뭔지 잘 모르겠다
					// 기본값 = a.parent == b.parent ? 1 : 2
					//.separation((a:Node, b:Node) => {
					//	return (a.parent == b.parent ? 1 : 2) / a.depth;
					//})
					// Node의 사이즈를 지정한다
					// [width, height] 인듯...
					//.nodeSize([40, 30])
					// Node Sorting
					.sort((a:Node, b:Node) => (a.name == b.name) ? 0 : (a.name > b.name) ? -1 : 1)

				// Node(=지점)의 위치
				// Tree를 수평화 시킨다 (??? children을 다른 이름으로 바꿀 수 없을까 ???)
				// nodes(root: T): T[]
				let nodes:Node[] = cluster.nodes(root);

				//----------------------------------------------------------------
				// Link
				//----------------------------------------------------------------
				// nodes.forEach(n => console.log(n));
				// Link(=연결선)의 위치
				// links(nodes: T[]): cluster.Link<T>[]
				// cluster.Link<T>[] { source: T, target: T }
				// source → from
				// target → to
				let links:Link<Node>[] = cluster.links(nodes);

				// d3.svg.diagonal() → 선을 그리는 svg path generator
				// Diagonal → 대각 결합선
				// d3.svg.line() 으로는 처리가 안된다
				// projection(): (d: Node, i: number) => [number, number]
				let diagonal = d3.svg.diagonal().projection((node:Node) => [node.y, node.x]);

				svg.selectAll('.link')
					.data(links)
					.enter()
					.append('path')
					.classed({link: true})
					.attr('d', diagonal);

				//----------------------------------------------------------------
				// Node
				//----------------------------------------------------------------
				let node:d3.Selection<Node> = svg.selectAll('.node')
					.data(nodes)
					.enter()
					.append('g')
					.classed({node: true})
					.attr('transform', (node:Node) => `translate(${node.y}, ${node.x})`);

				node.append('circle')
					.attr('r', 3);

				node.append('text')
					.attr('dx', (d:Node) => d.children ? -8 : 8)
					.attr('dy', 3)
					.style('text-anchor', (d:Node) => d.children ? 'end' : 'start')
					.text((d:Node) => d.name);
			});

		// d3.select(self.frameElement).style('height', `${this.HEIGHT}px`);
	}
}