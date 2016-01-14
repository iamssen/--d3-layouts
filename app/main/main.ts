import {Component, View, provide} from 'angular2/core';
import {
	ROUTER_PROVIDERS,
	ROUTER_DIRECTIVES,
	RouteConfig,
	LocationStrategy,
	HashLocationStrategy,
	AsyncRoute,
	Router,
	Location
} from 'angular2/router';
import 'app/main/main.scss!';
import {HierarchyLayout} from "../d3/layouts/hierarchy";
import {RouteDefinition} from 'angular2/router';
import {Index} from "../index/index";
import {ClusterLayout} from "../d3/layouts/cluster";
import {PackLayout} from "../d3/layouts/pack";
import {PartitionLayout} from "../d3/layouts/partition";
import {PieLayout} from "../d3/layouts/pie";
import {ForceLayout} from '../d3/layouts/force';
import {SelectionEnterExit} from '../d3/core/selection-enter-exit';
import {StackLayout} from "../d3/layouts/stack";
import {TreemapLayout} from "../d3/layouts/treemap";
import {HistogramLayout} from "../d3/layouts/histogram";
import {BundleLayout} from "../d3/layouts/bundle";
import {ChordLayout} from "../d3/layouts/chord";
import {TreeLayout} from "../d3/layouts/tree";

let config:RouteDefinition[] = [
	{path: '/', name: 'Index', component: Index},
	// selection
	{path: '/d3/core/selection-enter-exit', name: 'Selection Enter, Exit', component: SelectionEnterExit},
	// hierarchy layouts
	{path: '/d3/layouts/hierarchy', name: 'Hierarchy Layout', component: HierarchyLayout},
	{path: '/d3/layouts/cluster', name: 'Cluster Layout', component: ClusterLayout},
	{path: '/d3/layouts/tree', name: 'Tree Layout', component: TreeLayout},
	{path: '/d3/layouts/pack', name: 'Pack Layout', component: PackLayout},
	{path: '/d3/layouts/partition', name: 'Partition Layout', component: PartitionLayout},
	{path: '/d3/layouts/treemap', name: 'Treemap Layout', component: TreemapLayout},
	// other layouts
	{path: '/d3/layouts/pie', name: 'Pie Layout', component: PieLayout},
	{path: '/d3/layouts/stack', name: 'Stack Layout', component: StackLayout},
	{path: '/d3/layouts/histogram', name: 'Histogram Layout', component: HistogramLayout},
	{path: '/d3/layouts/bundle', name: 'Bundle Layout', component: BundleLayout},
	{path: '/d3/layouts/chord', name: 'Chord Layout', component: ChordLayout},
	{path: '/d3/layouts/force', name: 'Force Layout', component: ForceLayout}
];

@Component({
	selector: 'app-main',
	providers: [
		ROUTER_PROVIDERS,
		provide(LocationStrategy, {useClass: HashLocationStrategy})
	]
})
@View({
	templateUrl: '/app/main/main.html',
	directives: [ROUTER_DIRECTIVES]
})
@RouteConfig(config)
export class Main {
	private routeConfig:RouteDefinition[];

	constructor(private location:Location) {
		this.routeConfig = config;
	}

	isActive(path:string):boolean {
		return this.location.path() === path;
	}
}