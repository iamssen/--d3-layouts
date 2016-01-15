System.register("app/main/main.scss!github:mobilexag/plugin-sass@0.1.0", [], function() { return { setters: [], execute: function() {} } });

System.register("app/d3/layouts/hierarchy.ts", ["github:mbostock/d3@3.5.12", "npm:angular2@2.0.0-beta.0/core", "npm:angular2@2.0.0-beta.0/http"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var d3, core_1, http_1;
    var HierarchyLayout;
    return {
        setters:[
            function (d3_1) {
                d3 = d3_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            HierarchyLayout = (function () {
                function HierarchyLayout(elementRef, http) {
                    this.elementRef = elementRef;
                    this.http = http;
                    this.WIDTH = 560;
                    this.HEIGHT = 2200;
                }
                HierarchyLayout.prototype.ngOnInit = function () {
                    var _this = this;
                    this.http
                        .get('app/d3/layouts/hierarchy.json')
                        .subscribe(function (r) {
                        //----------------------------------------------------------------
                        // Container and Data
                        //----------------------------------------------------------------
                        var div = d3.select(_this.elementRef.nativeElement)
                            .select('div')
                            .attr({
                            width: _this.WIDTH,
                            height: _this.HEIGHT
                        });
                        var root = JSON.parse(r.text());
                        //----------------------------------------------------------------
                        // Layout
                        //----------------------------------------------------------------
                        var hierarchy = d3.layout.hierarchy();
                        //----------------------------------------------------------------
                        // Nodes
                        //----------------------------------------------------------------
                        var nodes = hierarchy(root);
                        //----------------------------------------------------------------
                        // Rendering
                        //----------------------------------------------------------------
                        div
                            .selectAll('div')
                            .data(nodes)
                            .enter()
                            .append('div')
                            .text(function (d) { return d.name; })
                            .style('padding-left', function (d) { return (d.depth * 10 + "px"); });
                        //console.log(nodes);
                    });
                };
                HierarchyLayout = __decorate([
                    core_1.Component({
                        selector: 'd3-hierarchy',
                        providers: [http_1.HTTP_PROVIDERS]
                    }),
                    core_1.View({
                        template: "<div class=\"d3-layout-hierarchy\"></div>"
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _b) || Object])
                ], HierarchyLayout);
                return HierarchyLayout;
                var _a, _b;
            })();
            exports_1("HierarchyLayout", HierarchyLayout);
        }
    }
});

System.register("app/index/index.ts", ["npm:angular2@2.0.0-beta.0/core"], function(exports_1) {
    'use strict';
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var Index;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Index = (function () {
                function Index() {
                    console.log('???????');
                }
                Index = __decorate([
                    core_1.Component({
                        selector: 'content-index'
                    }),
                    core_1.View({
                        template: "<h1>Index</h1>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], Index);
                return Index;
            })();
            exports_1("Index", Index);
        }
    }
});

System.register("app/d3/layouts/cluster.scss!github:mobilexag/plugin-sass@0.1.0", [], function() { return { setters: [], execute: function() {} } });

System.register("app/d3/layouts/cluster.ts", ["github:mbostock/d3@3.5.12", "npm:angular2@2.0.0-beta.0/core", "npm:angular2@2.0.0-beta.0/http", "app/d3/layouts/cluster.scss!github:mobilexag/plugin-sass@0.1.0"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var d3, core_1, http_1;
    var ClusterLayout;
    return {
        setters:[
            function (d3_1) {
                d3 = d3_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            ClusterLayout = (function () {
                function ClusterLayout(elementRef, http) {
                    this.elementRef = elementRef;
                    this.http = http;
                    this.WIDTH = 560;
                    this.HEIGHT = 2200;
                }
                ClusterLayout.prototype.ngOnInit = function () {
                    var _this = this;
                    this.http
                        .get('app/d3/layouts/cluster.json')
                        .subscribe(function (r) {
                        //----------------------------------------------------------------
                        // Svg and Data
                        //----------------------------------------------------------------
                        var svg = d3.select(_this.elementRef.nativeElement)
                            .select('svg')
                            .attr({ width: _this.WIDTH, height: _this.HEIGHT })
                            .append('g')
                            .attr('transform', 'translate(40, 0)');
                        var root = JSON.parse(r.text());
                        //----------------------------------------------------------------
                        // Layout
                        //----------------------------------------------------------------
                        var cluster = d3.layout.cluster()
                            .size([_this.HEIGHT, _this.WIDTH - 160])
                            .children(function (node) {
                            if (node.depth < 2) {
                                return node.children;
                            }
                            else {
                                return null;
                            }
                        })
                            .sort(function (a, b) { return (a.name == b.name) ? 0 : (a.name > b.name) ? -1 : 1; });
                        // Node(=지점)의 위치
                        // Tree를 수평화 시킨다 (??? children을 다른 이름으로 바꿀 수 없을까 ???)
                        // nodes(root: T): T[]
                        var nodes = cluster.nodes(root);
                        //----------------------------------------------------------------
                        // Link
                        //----------------------------------------------------------------
                        // nodes.forEach(n => console.log(n));
                        // Link(=연결선)의 위치
                        // links(nodes: T[]): cluster.Link<T>[]
                        // cluster.Link<T>[] { source: T, target: T }
                        // source → from
                        // target → to
                        var links = cluster.links(nodes);
                        // d3.svg.diagonal() → 선을 그리는 svg path generator
                        // Diagonal → 대각 결합선
                        // d3.svg.line() 으로는 처리가 안된다
                        // projection(): (d: Node, i: number) => [number, number]
                        var diagonal = d3.svg.diagonal().projection(function (node) { return [node.y, node.x]; });
                        svg.selectAll('.link')
                            .data(links)
                            .enter()
                            .append('path')
                            .classed({ link: true })
                            .attr('d', diagonal);
                        //----------------------------------------------------------------
                        // Node
                        //----------------------------------------------------------------
                        var node = svg.selectAll('.node')
                            .data(nodes)
                            .enter()
                            .append('g')
                            .classed({ node: true })
                            .attr('transform', function (node) { return ("translate(" + node.y + ", " + node.x + ")"); });
                        node.append('circle')
                            .attr('r', 3);
                        node.append('text')
                            .attr('dx', function (d) { return d.children ? -8 : 8; })
                            .attr('dy', 3)
                            .style('text-anchor', function (d) { return d.children ? 'end' : 'start'; })
                            .text(function (d) { return d.name; });
                    });
                    // d3.select(self.frameElement).style('height', `${this.HEIGHT}px`);
                };
                ClusterLayout = __decorate([
                    core_1.Component({
                        selector: 'd3-cluster',
                        providers: [http_1.HTTP_PROVIDERS]
                    }),
                    core_1.View({
                        template: "<svg class=\"d3-layout-cluster\"></svg>"
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _b) || Object])
                ], ClusterLayout);
                return ClusterLayout;
                var _a, _b;
            })();
            exports_1("ClusterLayout", ClusterLayout);
        }
    }
});

System.register("app/d3/layouts/pack.scss!github:mobilexag/plugin-sass@0.1.0", [], function() { return { setters: [], execute: function() {} } });

System.register("app/d3/layouts/pack.ts", ["github:mbostock/d3@3.5.12", "npm:d3tip@0.4.2", "npm:angular2@2.0.0-beta.0/core", "npm:angular2@2.0.0-beta.0/http", "app/d3/layouts/pack.scss!github:mobilexag/plugin-sass@0.1.0"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var d3, d3tip_1, core_1, http_1;
    var PackLayout;
    return {
        setters:[
            function (d3_1) {
                d3 = d3_1;
            },
            function (d3tip_1_1) {
                d3tip_1 = d3tip_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            PackLayout = (function () {
                function PackLayout(elementRef, http) {
                    this.elementRef = elementRef;
                    this.http = http;
                    this.DIAMETER = 700;
                }
                PackLayout.prototype.ngOnInit = function () {
                    var _this = this;
                    this.http
                        .get('app/d3/layouts/pack.json')
                        .subscribe(function (r) {
                        //----------------------------------------------------------------
                        // Svg and Data
                        //----------------------------------------------------------------
                        var svg = d3.select(_this.elementRef.nativeElement)
                            .select('svg')
                            .attr({ width: _this.DIAMETER, height: _this.DIAMETER })
                            .append('g')
                            .attr('transform', "translate(2, 2)");
                        var root = JSON.parse(r.text());
                        //----------------------------------------------------------------
                        // Layout
                        //----------------------------------------------------------------
                        var pack = d3.layout.pack()
                            .size([_this.DIAMETER - 4, _this.DIAMETER - 4])
                            .value(function (d) { return d['size']; });
                        //----------------------------------------------------------------
                        // Node
                        //----------------------------------------------------------------
                        var nodes = pack.nodes(root);
                        var node = svg.selectAll('g')
                            .data(nodes)
                            .enter()
                            .append('g')
                            .classed('node', true)
                            .classed('leaf', function (d) { return !d.children; })
                            .attr('transform', function (d) { return ("translate(" + d.x + ", " + d.y + ")"); });
                        node.append('circle')
                            .attr('r', function (d) { return d.r; })
                            .filter(function (d) { return !d.children; })
                            .call(d3tip_1.default({
                            formatter: function (d) { return (d.name + "<br/>" + d.size + "<br/>" + d.depth); }
                        }));
                        // Leaf Node만 걸러내서 Text를 Print한다
                        node.filter(function (d) { return !d.children; })
                            .append('text')
                            .attr('dy', '.3em')
                            .style('font-size', function (d) { return d.r * 0.7; })
                            .text(function (d) { return d.name.substring(0, d.r / 3); });
                        //----------------------------------------------------------------
                        // Link
                        //----------------------------------------------------------------
                        var links = pack.links(nodes);
                        var diagonal = d3.svg.diagonal().projection(function (node) { return [node.x, node.y]; });
                        svg.selectAll('path')
                            .data(links)
                            .enter()
                            .append('path')
                            .classed('link', true)
                            .style('stroke-width', function (link) { return 5 - link.source.depth; })
                            .attr('d', diagonal);
                    });
                };
                PackLayout = __decorate([
                    core_1.Component({
                        selector: 'd3-pack',
                        providers: [http_1.HTTP_PROVIDERS]
                    }),
                    core_1.View({
                        template: "<svg class=\"d3-layout-pack\"></svg>"
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _b) || Object])
                ], PackLayout);
                return PackLayout;
                var _a, _b;
            })();
            exports_1("PackLayout", PackLayout);
        }
    }
});

System.register("app/d3/layouts/partition.scss!github:mobilexag/plugin-sass@0.1.0", [], function() { return { setters: [], execute: function() {} } });

System.register("app/d3/layouts/partition.ts", ["github:mbostock/d3@3.5.12", "npm:angular2@2.0.0-beta.0/core", "npm:angular2@2.0.0-beta.0/http", "app/d3/layouts/partition.scss!github:mobilexag/plugin-sass@0.1.0"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var d3, core_1, http_1;
    var PartitionLayout;
    return {
        setters:[
            function (d3_1) {
                d3 = d3_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            PartitionLayout = (function () {
                function PartitionLayout(elementRef, http) {
                    this.elementRef = elementRef;
                    this.http = http;
                    this.RADIUS = 300;
                }
                PartitionLayout.prototype.stash = function (d) {
                    d.x0 = d.x;
                    d.dx0 = d.dx;
                };
                PartitionLayout.prototype.arcTween = function (arc) {
                    return function (a) {
                        var i = d3.interpolate({ x: a.x0, dx: a.dx0 }, a);
                        return function (t) {
                            var b = i(t);
                            a.x0 = b.x;
                            a.dx0 = b.dx;
                            return arc(b);
                        };
                    };
                };
                PartitionLayout.prototype.ngOnInit = function () {
                    var _this = this;
                    this.http
                        .get('app/d3/layouts/partition.json')
                        .subscribe(function (r) {
                        //----------------------------------------------------------------
                        // Svg and Data
                        //----------------------------------------------------------------
                        var svg = d3.select(_this.elementRef.nativeElement)
                            .select('svg')
                            .attr({ width: _this.RADIUS * 2, height: _this.RADIUS * 2 })
                            .append('g')
                            .attr('transform', "translate(" + _this.RADIUS + ", " + _this.RADIUS + ")");
                        var root = JSON.parse(r.text());
                        //----------------------------------------------------------------
                        // Layout
                        //----------------------------------------------------------------
                        var partition = d3.layout.partition()
                            .sort(null)
                            .size([Math.PI * 2, _this.RADIUS])
                            .value(function (d) { return 1; });
                        var color = d3.scale.category20c();
                        //----------------------------------------------------------------
                        // Nodes
                        //----------------------------------------------------------------
                        var nodes = partition.nodes(root);
                        var arc = d3.svg.arc()
                            .startAngle(function (d) { return d['x']; })
                            .endAngle(function (d) { return d['x'] + d['dx']; })
                            .innerRadius(function (d) { return d['y']; })
                            .outerRadius(function (d) { return d['y'] + d['dy']; });
                        nodes.forEach(function (n) { return console.log("x=" + n.x + " y=" + n.y + " dx=" + n.dx + " dy=" + n.dy); });
                        var path = svg
                            .selectAll('path')
                            .data(nodes)
                            .enter()
                            .append('path')
                            .attr('display', function (d) { return d.depth ? null : 'none'; })
                            .attr('d', arc)
                            .style('fill', function (d) { return color((d.children ? d : d.parent).name); })
                            .style({
                            'stroke': '#000000',
                            'fill-rule': 'evenodd'
                        })
                            .each(_this.stash);
                        //----------------------------------------------------------------
                        // Links
                        //----------------------------------------------------------------
                        //let links = partition.links(nodes);
                        //let diagonal = d3.svg.diagonal().projection((node) => [node.x, node.y]);
                        //
                        //console.log(links);
                        //
                        //svg.selectAll('path')
                        //	.data(links)
                        //	.enter()
                        //	.append('path')
                        //	.classed('link', true)
                        //	//.style('stroke-width', (link) => 5 - link.source.depth)
                        //	.attr('d', diagonal)
                        //----------------------------------------------------------------
                        // option
                        //----------------------------------------------------------------
                        $('input[type=radio][name=mode]').on('change', function (e) {
                            var func = (e.target.value === 'count') ? function (d) { return 1; } : function (d) { return d.size; };
                            path.data(partition.value(func).nodes(root))
                                .transition()
                                .duration(1500)
                                .attrTween('d', _this.arcTween(arc));
                        });
                    });
                };
                PartitionLayout = __decorate([
                    core_1.Component({
                        selector: 'd3-partition',
                        providers: [http_1.HTTP_PROVIDERS]
                    }),
                    core_1.View({
                        template: "\n\t<div align=\"right\">\n\t\t<input type=\"radio\" name=\"mode\" checked=\"checked\" value=\"count\">Count\n\t\t<input type=\"radio\" name=\"mode\" value=\"size\">Size\n\t</div>\n\t<svg class=\"d3-layout-partition\"></svg>\n\t"
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _b) || Object])
                ], PartitionLayout);
                return PartitionLayout;
                var _a, _b;
            })();
            exports_1("PartitionLayout", PartitionLayout);
        }
    }
});

System.register("app/d3/layouts/pie.scss!github:mobilexag/plugin-sass@0.1.0", [], function() { return { setters: [], execute: function() {} } });

System.register("app/d3/layouts/pie.ts", ["github:mbostock/d3@3.5.12", "npm:d3tip@0.4.2", "npm:angular2@2.0.0-beta.0/core", "npm:angular2@2.0.0-beta.0/http", "app/d3/layouts/pie.scss!github:mobilexag/plugin-sass@0.1.0"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var d3, d3tip_1, core_1, http_1;
    var PieLayout;
    return {
        setters:[
            function (d3_1) {
                d3 = d3_1;
            },
            function (d3tip_1_1) {
                d3tip_1 = d3tip_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            PieLayout = (function () {
                function PieLayout(elementRef, http) {
                    this.elementRef = elementRef;
                    this.http = http;
                    this.RADIUS = 300;
                }
                PieLayout.prototype.stash = function (d) {
                    d.startAngle0 = d.startAngle;
                    d.endAngle0 = d.endAngle;
                };
                PieLayout.prototype.arcTween = function (arc) {
                    var _this = this;
                    return function (a) {
                        var i = d3.interpolate({ startAngle: a.startAngle0, endAngle: a.endAngle0 }, a);
                        console.log('arcTween →', a);
                        console.log(_this.data);
                        return function (t) {
                            var b = i(t);
                            a.startAngle0 = b.startAngle;
                            a.endAngle0 = b.endAngle;
                            return arc(b);
                        };
                    };
                };
                PieLayout.prototype.refresh = function () {
                    var oldData = this.data;
                    var newData = this.pie(this.getData());
                    this.path.data(newData)
                        .transition()
                        .duration(1500)
                        .attrTween('d', this.arcTween(this.arc));
                };
                PieLayout.prototype.getData = function () {
                    var datas = [];
                    var f = -1;
                    //let fmax:number = Math.floor(Math.random() * 6) + 3;
                    var fmax = 7;
                    while (++f < fmax) {
                        datas.push({
                            label: 'item' + f,
                            value: Math.floor(Math.random() * 1000000)
                        });
                    }
                    return datas;
                };
                PieLayout.prototype.ngOnInit = function () {
                    //----------------------------------------------------------------
                    // Svg and Data
                    //----------------------------------------------------------------
                    var svg = d3.select(this.elementRef.nativeElement)
                        .select('svg')
                        .attr({ width: this.RADIUS * 2, height: this.RADIUS * 2 })
                        .append('g')
                        .attr('transform', "translate(" + this.RADIUS + ", " + this.RADIUS + ")");
                    //----------------------------------------------------------------
                    // Layout
                    //----------------------------------------------------------------
                    this.pie = d3.layout.pie()
                        .sort(null)
                        .value(function (d, i) { return d.value; });
                    var color = d3.scale.category20();
                    //----------------------------------------------------------------
                    // Nodes
                    //----------------------------------------------------------------
                    this.data = this.pie(this.getData());
                    this.arc = d3.svg.arc()
                        .outerRadius(this.RADIUS - 10)
                        .innerRadius(0);
                    var labelArc = d3.svg.arc()
                        .outerRadius(this.RADIUS - 40)
                        .innerRadius(this.RADIUS - 40);
                    var g = svg.selectAll('g')
                        .data(this.data)
                        .enter()
                        .append('g')
                        .classed('arc', true)
                        .call(d3tip_1.default({
                        formatter: function (d) { return (d.data.label + " \u2192 " + d.data.value); }
                    }))
                        .each(this.stash);
                    console.log(this.data);
                    this.path = g.append('path')
                        .attr('d', this.arc)
                        .style('fill', function (d) { return color(d.data.label); });
                    g.append('text')
                        .attr('transform', function (d) { return ("translate(" + labelArc.centroid(d) + ")"); })
                        .attr('dy', '.35em')
                        .text(function (d) { return d.data.label; });
                    // TODO random으로 데이터 생성
                    // TODO interpolation 사용해서 데이터 바꾸기 테스트
                };
                PieLayout = __decorate([
                    core_1.Component({
                        selector: 'd3-pie',
                        providers: [http_1.HTTP_PROVIDERS]
                    }),
                    core_1.View({
                        template: "\n\t<div align=\"right\">\n\t\t<button (click)=\"refresh()\">Refresh</button>\n\t</div>\n\t<svg class=\"d3-layout-pie\"></svg>\n\t"
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _b) || Object])
                ], PieLayout);
                return PieLayout;
                var _a, _b;
            })();
            exports_1("PieLayout", PieLayout);
        }
    }
});

System.register("app/d3/layouts/force.scss!github:mobilexag/plugin-sass@0.1.0", [], function() { return { setters: [], execute: function() {} } });

System.register("app/d3/layouts/force.ts", ["github:mbostock/d3@3.5.12", "npm:angular2@2.0.0-beta.0/core", "npm:angular2@2.0.0-beta.0/http", "app/d3/layouts/force.scss!github:mobilexag/plugin-sass@0.1.0"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var d3, core_1, http_1;
    var ForceLayout;
    return {
        setters:[
            function (d3_1) {
                d3 = d3_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            ForceLayout = (function () {
                function ForceLayout(elementRef, http) {
                    this.elementRef = elementRef;
                    this.http = http;
                    this.WIDTH = 600;
                    this.HEIGHT = 500;
                }
                ForceLayout.prototype.ngOnInit = function () {
                    var _this = this;
                    this.http
                        .get('app/d3/layouts/force.json')
                        .subscribe(function (r) {
                        //----------------------------------------------------------------
                        // Svg and Data
                        //----------------------------------------------------------------
                        var svg = d3.select(_this.elementRef.nativeElement)
                            .select('svg')
                            .attr({
                            width: _this.WIDTH,
                            height: _this.HEIGHT
                        });
                        var root = JSON.parse(r.text());
                        var optionDatas = [
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
                        ];
                        //----------------------------------------------------------------
                        // Layout
                        // http://totech.hateblo.jp/entry/2014/11/23/120003
                        //----------------------------------------------------------------
                        var force = d3.layout.force()
                            .size([_this.WIDTH, _this.HEIGHT])
                            .linkDistance(optionDatas.find(function (i) { return i.name === 'linkDistance'; }).default)
                            .linkStrength(optionDatas.find(function (i) { return i.name === 'linkStrength'; }).default)
                            .friction(optionDatas.find(function (i) { return i.name === 'friction'; }).default)
                            .charge(optionDatas.find(function (i) { return i.name === 'charge'; }).default)
                            .chargeDistance(optionDatas.find(function (i) { return i.name === 'chargeDistance'; }).default)
                            .theta(optionDatas.find(function (i) { return i.name === 'theta'; }).default)
                            .gravity(optionDatas.find(function (i) { return i.name === 'gravity'; }).default)
                            .alpha(100000)
                            .on('tick', tick);
                        console.log('charge', force.charge()); // -30
                        console.log('linkStrength', force.linkStrength()); // 1
                        console.log('chargeDistance', force.chargeDistance()); // Infinity
                        console.log('linkDistance', force.linkDistance()); // 20
                        console.log('gravity', force.gravity()); // 0.1
                        console.log('alpha', force.alpha()); // undefined
                        console.log('theta', force.theta()); // 0.8
                        console.log('friction', force.friction()); // 0.9
                        //----------------------------------------------------------------
                        // Nodes
                        //----------------------------------------------------------------
                        var drag = force
                            .drag()
                            .on('dragstart', dragstart);
                        // Tree처럼 계층형 데이터가 아닌지라,
                        // link 정보를 자동으로 계산해주는 구조는 아니다
                        force.nodes(root.nodes)
                            .links(root.links)
                            .start();
                        console.log(force.nodes());
                        console.log(force.links());
                        var links = svg
                            .selectAll('line')
                            .data(root.links)
                            .enter()
                            .append('line')
                            .classed('link', true);
                        var nodes = svg
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
                                x1: function (d) { return d.source.x; },
                                y1: function (d) { return d.source.y; },
                                x2: function (d) { return d.target.x; },
                                y2: function (d) { return d.target.y; }
                            });
                            nodes.attr({
                                cx: function (d) { return d.x; },
                                cy: function (d) { return d.y; }
                            });
                        }
                        function dragstart(d) {
                            d.fixed = true;
                            d3.select(this).classed('fixed', true);
                            console.log('force.ts..dragstart()', d);
                        }
                        function dbclick(d) {
                            d.fixed = false;
                            d3.select(this).classed('fixed', false);
                            console.log('force.ts..dbclick()', d);
                        }
                        //----------------------------------------------------------------
                        // Options
                        //----------------------------------------------------------------
                        var options = d3.select(_this.elementRef.nativeElement)
                            .select('div');
                        var select = options
                            .selectAll('p')
                            .data(optionDatas)
                            .enter()
                            .append('p');
                        select
                            .append('select')
                            .on('change', function (o) {
                            force[o['name']](this.value);
                            force.start();
                        })
                            .selectAll('option')
                            .data(function (o) {
                            var values = o['values'];
                            return values.map(function (n) {
                                return { value: n, selected: o['default'] === n };
                            });
                        })
                            .enter()
                            .append('option')
                            .text(function (d) { return d['value'].toString(); })
                            .attr('value', function (d) { return d['value']; })
                            .property('selected', function (d) { return d.selected; });
                        select
                            .append('span')
                            .html(function (o) { return (" " + o['name']); });
                    });
                };
                ForceLayout = __decorate([
                    core_1.Component({
                        selector: 'd3-force',
                        providers: [http_1.HTTP_PROVIDERS]
                    }),
                    core_1.View({
                        template: "\n\t<div class=\"d3-layout-force\"></div>\n\t<svg class=\"d3-layout-force\"></svg>\n\t"
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _b) || Object])
                ], ForceLayout);
                return ForceLayout;
                var _a, _b;
            })();
            exports_1("ForceLayout", ForceLayout);
        }
    }
});

System.register("app/d3/d3-utils.ts", [], function(exports_1) {
    //----------------------------------------------------------------
    // select
    //----------------------------------------------------------------
    function parent() {
        return [this.parentNode];
    }
    exports_1("parent", parent);
    function children(tag) {
        return function () {
            var children = this.childNodes;
            if (!children || !children.length)
                return [];
            if (!tag)
                return children;
            var filtered = [];
            var f = -1;
            var fmax = children.length;
            while (++f < fmax) {
                var el = children[f];
                if (el.nodeName.toLowerCase() === tag.toLowerCase())
                    filtered.push(el);
            }
            return filtered;
        };
    }
    exports_1("children", children);
    function query(query) {
        return function () {
            return [];
        };
    }
    exports_1("query", query);
    //----------------------------------------------------------------
    // append
    //----------------------------------------------------------------
    function appendIfNotExists(tag) {
        return function (selection) {
            selection
                .filter(function (d, i, o) { return !d3.select(selection[o][i]).select(tag).node(); })
                .append(tag);
        };
    }
    exports_1("appendIfNotExists", appendIfNotExists);
    return {
        setters:[],
        execute: function() {
        }
    }
});

System.register("app/d3/core/selection-enter-exit.scss!github:mobilexag/plugin-sass@0.1.0", [], function() { return { setters: [], execute: function() {} } });

System.register("app/d3/core/selection-enter-exit.ts", ["npm:angular2@2.0.0-beta.0/core", "app/d3/d3-utils.ts", "app/d3/core/selection-enter-exit.scss!github:mobilexag/plugin-sass@0.1.0"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, utils;
    var SelectionEnterExit;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (utils_1) {
                utils = utils_1;
            },
            function (_1) {}],
        execute: function() {
            SelectionEnterExit = (function () {
                function SelectionEnterExit(elementRef) {
                    this.elementRef = elementRef;
                }
                SelectionEnterExit.prototype.createRandomData = function () {
                    var char = String.fromCharCode('A'.charCodeAt(0) + Math.floor(Math.random() * 24));
                    var d1 = [];
                    var f = -1;
                    var fmax = 2 + Math.floor(Math.random() * 7);
                    while (++f < fmax) {
                        var d = { label: char + ":" + (f + 1) };
                        if (Math.random() > 0.3) {
                            var d2 = [];
                            var s = -1;
                            var smax = 1 + Math.floor(Math.random() * 10);
                            while (++s < smax) {
                                d2.push({
                                    label: char + ":" + (f + 1) + ":" + (s + 1)
                                });
                            }
                            d.children = d2;
                        }
                        d1.push(d);
                    }
                    return d1;
                };
                SelectionEnterExit.prototype.multiply = function (char, count) {
                    if (count <= 0)
                        return '';
                    var result = [];
                    while (--count >= 0) {
                        result.push(char);
                    }
                    return result.join('');
                };
                SelectionEnterExit.prototype.refresh = function () {
                    var _this = this;
                    var data = this.createRandomData();
                    console.log('data.length →\n' + d3.layout.cluster()
                        .nodes({ children: data })
                        .slice(1)
                        .map(function (d) { return ("" + _this.multiply('..', d.depth - 1) + d.label); })
                        .join('\n'));
                    var ul = d3
                        .select(this.elementRef.nativeElement)
                        .select('ul');
                    //---------------------------------------------
                    // Depth1
                    //---------------------------------------------
                    var li = ul
                        .selectAll(utils.children('li'))
                        .data(data);
                    // Update 상태에서 기존에 잔존해 있는 Node들을 수정한다
                    li
                        .select('span') // text() 때문에 하위 Node들이 전부 사라져버리게 되는 것을 방지
                        .text(function (d) { return d.label; });
                    // Enter로 진입해서 모자란 Node들을 추가한다
                    li
                        .enter() // Update.enter() → Enter
                        .append('li') // Enter.append() → Selection
                        .append('span')
                        .text(function (d) { return d.label; });
                    // Update에서 나와서 데이터가 없는 것들을 제거한다
                    li
                        .exit() // Update.exit() → Selection
                        .remove();
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
                        .classed('highlight', false);
                    // 하위 children이 없는 경우 <ul>을 제거
                    li
                        .filter(function (d) { return !d.children; }) // 하위 데이터가 없는 것들만 필터링
                        .select('ul')
                        .remove();
                    // 하위 children이 있는 경우 <ul>을 준비 - appendIfNotExists()를 사용
                    var ul2 = li
                        .filter(function (d) { return d.children && d.children.length > 0; }) // 하위 데이터가 있는 것들만 필터링
                        .classed('highlight', true)
                        .call(utils.appendIfNotExists('ul')) // 하위의 <ul>을 체크해서 만들어줌
                        .select('ul');
                    // 아래부터는 동일
                    var li2 = ul2
                        .selectAll('li')
                        .data(function (d) { return d.children; });
                    li2
                        .text(function (d) { return d.label; });
                    li2
                        .enter()
                        .append('li')
                        .text(function (d) { return d.label; });
                    li2
                        .exit()
                        .remove();
                };
                SelectionEnterExit.prototype.ngOnInit = function () {
                    this.refresh();
                };
                SelectionEnterExit = __decorate([
                    core_1.Component({
                        selector: 'selection-enter-exit'
                    }),
                    core_1.View({
                        template: "\n\t<div align=\"right\"><button (click)=\"refresh()\">Referesh</button></div>\n\t<ul class=\"d3-selection-enter-exit\"></ul>\n\t",
                        directives: []
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], SelectionEnterExit);
                return SelectionEnterExit;
                var _a;
            })();
            exports_1("SelectionEnterExit", SelectionEnterExit);
        }
    }
});

System.register("app/d3/layouts/stack.scss!github:mobilexag/plugin-sass@0.1.0", [], function() { return { setters: [], execute: function() {} } });

System.register("app/d3/layouts/stack.ts", ["github:mbostock/d3@3.5.12", "npm:d3tip@0.4.2", "npm:angular2@2.0.0-beta.0/core", "npm:angular2@2.0.0-beta.0/http", "app/d3/layouts/stack.scss!github:mobilexag/plugin-sass@0.1.0"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var d3, d3tip_1, core_1, http_1;
    var StackLayout;
    return {
        setters:[
            function (d3_1) {
                d3 = d3_1;
            },
            function (d3tip_1_1) {
                d3tip_1 = d3tip_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            StackLayout = (function () {
                function StackLayout(elementRef, http) {
                    this.elementRef = elementRef;
                    this.http = http;
                    this.WIDTH = 960;
                    this.HEIGHT = 500;
                }
                StackLayout.prototype.ngOnInit = function () {
                    var _this = this;
                    this.http
                        .get('app/d3/layouts/stack.tsv')
                        .subscribe(function (r) {
                        var margin = { top: 20, right: 50, bottom: 30, left: 20 };
                        var width = _this.WIDTH - margin.left - margin.right;
                        var height = _this.HEIGHT - margin.top - margin.bottom;
                        //----------------------------------------------------------------
                        // Svg and Data
                        //----------------------------------------------------------------
                        var svg = d3.select(_this.elementRef.nativeElement)
                            .select('svg')
                            .attr({
                            width: _this.WIDTH,
                            height: _this.HEIGHT
                        })
                            .append('g')
                            .style('transform', "translate(" + margin.left + "px, " + margin.top + "px)");
                        var parseDate = d3.time.format('%m/%Y').parse;
                        var data = d3.dsv('\t', 'text/plain')
                            .parse(r.text())
                            .map(function (source) {
                            return {
                                date: parseDate(source['date']),
                                total: +source['total'],
                                disease: +source['disease'],
                                wounds: +source['wounds'],
                                other: +source['other']
                            };
                        });
                        //----------------------------------------------------------------
                        // Scale
                        //----------------------------------------------------------------
                        // Ordinal<Date, number>
                        var x = d3.scale.ordinal().rangeRoundBands([0, width]);
                        var y = d3.scale.linear().rangeRound([height, 0]);
                        //----------------------------------------------------------------
                        // Columns
                        // 방향이 Flex의 Stack column chart와 다르다
                        // Flex = column set [column a, column b, column c]
                        // D3 = series set [column a, column a, column a]
                        //----------------------------------------------------------------
                        var columnOrder = ['wounds', 'other', 'disease'];
                        var values = columnOrder.map(function (f) {
                            return data.map(function (d) {
                                return { x: d.date, y: d[f], title: f };
                            });
                        });
                        // values = {x, y, title}[][]
                        //console.log(JSON.stringify(values, null, 2));
                        var columns = d3.layout.stack()(values);
                        // columns = {x, y, y0, title}[][]
                        //console.log(JSON.stringify(columns, null, 2));
                        x.domain(columns[0].map(function (d) { return d['x']; }));
                        y.domain([0, d3.max(columns[columns.length - 1], function (d) { return d.y0 + d.y; })]).nice();
                        //----------------------------------------------------------------
                        // Drawing
                        //----------------------------------------------------------------
                        // column color scale
                        var color = d3.scale.category10();
                        // draw columns
                        svg.selectAll('g')
                            .data(columns)
                            .enter()
                            .append('g')
                            .classed('layer', true)
                            .style('fill', function (d, i) { return color(i); })
                            .selectAll('rect')
                            .data(function (d) { return d; })
                            .enter()
                            .append('rect')
                            .attr({
                            x: function (d) { return x(d.x); },
                            y: function (d) { return y(d.y + d.y0); },
                            width: x.rangeBand() - 1,
                            height: function (d) { return y(d.y0) - y(d.y + d.y0); }
                        })
                            .call(d3tip_1.default({
                            html: function (d) { return ("\n\t\t\t\t\t\t<table border=\"1\">\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<th>title</th>\n\t\t\t\t\t\t\t\t<th>y</th>\n\t\t\t\t\t\t\t\t<th>y0</th>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td>" + d.title + "</td>\n\t\t\t\t\t\t\t\t<td>" + d.y + "</td>\n\t\t\t\t\t\t\t\t<td>" + d.y0 + "</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t\t"); }
                        }));
                        // axis renderer
                        var xAxis = d3.svg.axis()
                            .scale(x)
                            .orient('bottom')
                            .tickFormat(d3.time.format('%b'));
                        var yAxis = d3.svg.axis()
                            .scale(y)
                            .orient('right');
                        // draw axis
                        svg.append('g')
                            .classed({
                            'axis': true,
                            'axis--x': true
                        })
                            .style('transform', "translate(0, " + height + "px)")
                            .call(xAxis);
                        svg.append('g')
                            .classed({
                            'axis': true,
                            'axis--y': true
                        })
                            .style('transform', "translate(" + width + "px, 0)")
                            .call(yAxis);
                    });
                };
                StackLayout = __decorate([
                    core_1.Component({
                        selector: 'd3-stack',
                        providers: [http_1.HTTP_PROVIDERS]
                    }),
                    core_1.View({
                        template: "\n\t<svg class=\"d3-layout-stack\"></svg>\n\t"
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _b) || Object])
                ], StackLayout);
                return StackLayout;
                var _a, _b;
            })();
            exports_1("StackLayout", StackLayout);
        }
    }
});

System.register("app/d3/layouts/treemap.scss!github:mobilexag/plugin-sass@0.1.0", [], function() { return { setters: [], execute: function() {} } });

System.register("app/d3/layouts/treemap.ts", ["github:mbostock/d3@3.5.12", "npm:angular2@2.0.0-beta.0/core", "npm:angular2@2.0.0-beta.0/http", "app/d3/layouts/treemap.scss!github:mobilexag/plugin-sass@0.1.0"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var d3, core_1, http_1;
    var TreemapLayout;
    return {
        setters:[
            function (d3_1) {
                d3 = d3_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            //interface Node extends d3.layout.cluster.Result {
            //	name?:string;
            //}
            //
            //interface Link<Node> extends d3.layout.cluster.Link<Node> {
            //}
            //
            //interface Cluster<Node> extends d3.layout.Cluster<Node> {
            //}
            TreemapLayout = (function () {
                function TreemapLayout(elementRef, http) {
                    this.elementRef = elementRef;
                    this.http = http;
                    this.WIDTH = 960;
                    this.HEIGHT = 500;
                }
                TreemapLayout.prototype.position = function (selection) {
                    selection.style({
                        left: function (d) { return (d.x + "px"); },
                        top: function (d) { return (d.y + "px"); },
                        width: function (d) { return (Math.max(0, d.dx - 1) + "px"); },
                        height: function (d) { return (Math.max(0, d.dy - 1) + "px"); }
                    });
                };
                TreemapLayout.prototype.ngOnInit = function () {
                    var _this = this;
                    this.http
                        .get('app/d3/layouts/treemap.json')
                        .subscribe(function (r) {
                        var margin = { top: 40, right: 10, bottom: 10, left: 10 };
                        var width = _this.WIDTH - margin.left - margin.right;
                        var height = _this.HEIGHT - margin.top - margin.bottom;
                        var color = d3.scale.category20c();
                        var treemap = d3.layout.treemap()
                            .size([width, height])
                            .sticky(true)
                            .value(function (d, i) { return d['size']; });
                        var div = d3.select(_this.elementRef.nativeElement)
                            .select('div')
                            .style({
                            position: 'relative',
                            width: _this.WIDTH + "px",
                            height: _this.HEIGHT + "px",
                            left: margin.left + "px",
                            top: margin.top + "px"
                        });
                        var root = JSON.parse(r.text());
                        var nodes = treemap.nodes(root);
                        var node = div
                            .selectAll('div')
                            .data(nodes)
                            .enter()
                            .append('div')
                            .attr('class', 'node')
                            .call(_this.position)
                            .style('background', function (d) { return d.children ? color(d.name) : null; })
                            .text(function (d) { return d.children ? null : d.name; });
                    });
                };
                TreemapLayout = __decorate([
                    core_1.Component({
                        selector: 'd3-treemap',
                        providers: [http_1.HTTP_PROVIDERS]
                    }),
                    core_1.View({
                        template: "<div class=\"d3-layout-treemap\"></div>"
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _b) || Object])
                ], TreemapLayout);
                return TreemapLayout;
                var _a, _b;
            })();
            exports_1("TreemapLayout", TreemapLayout);
        }
    }
});

System.register("app/d3/layouts/histogram.scss!github:mobilexag/plugin-sass@0.1.0", [], function() { return { setters: [], execute: function() {} } });

System.register("app/d3/layouts/histogram.ts", ["github:mbostock/d3@3.5.12", "npm:angular2@2.0.0-beta.0/core", "npm:angular2@2.0.0-beta.0/http", "app/d3/layouts/histogram.scss!github:mobilexag/plugin-sass@0.1.0"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var d3, core_1, http_1;
    var HistogramLayout;
    return {
        setters:[
            function (d3_1) {
                d3 = d3_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            HistogramLayout = (function () {
                function HistogramLayout(elementRef, http) {
                    this.elementRef = elementRef;
                    this.http = http;
                    this.WIDTH = 960;
                    this.HEIGHT = 450;
                }
                HistogramLayout.prototype.ngOnInit = function () {
                    var _this = this;
                    this.http
                        .get('app/d3/layouts/histogram.tsv')
                        .subscribe(function (r) {
                        var margin = { top: 30, right: 20, bottom: 30, left: 50 };
                        var width = _this.WIDTH - margin.left - margin.right;
                        var height = _this.HEIGHT - margin.top - margin.bottom;
                        var xScale = d3.scale.linear().range([0, width]).domain([1000, 3000]);
                        var yScale = d3.scale.linear().range([height, 0]);
                        var xAxis = d3.svg.axis().scale(xScale).orient('bottom').ticks(5);
                        var yAxis = d3.svg.axis().scale(yScale).orient('left').ticks(5);
                        var svg = d3.select(_this.elementRef.nativeElement)
                            .select('svg')
                            .attr({
                            width: _this.WIDTH,
                            height: _this.HEIGHT
                        })
                            .append('g')
                            .attr('transform', "translate(" + margin.left + ", " + margin.top + ")");
                        var data = d3.dsv('\t', 'text/plain')
                            .parse(r.text())
                            .map(function (source) {
                            return {
                                x: parseFloat(source['x']),
                                y: parseInt(source['y'])
                            };
                        });
                        var binwidth = parseInt($(':radio[name=binwidth]:checked').val());
                        var binRange = d3.range(xScale.domain()[0], xScale.domain()[1] + binwidth, binwidth);
                        console.log(binRange);
                        var histogram = d3.layout.histogram()
                            .bins(binRange);
                        var hist = histogram(data.map(function (d) { return d.x; }));
                        console.log(hist, d3.max(hist, function (d) { return d.y; }));
                        var xBinwidth = width / hist.length - 1;
                        yScale.domain([0, d3.max(hist, function (d) { return d.y; })]);
                        svg
                            .selectAll('rect')
                            .data(hist)
                            .enter()
                            .append('rect')
                            .attr({
                            class: 'bar',
                            width: function (d) { return xBinwidth; },
                            height: function (d) { return height - yScale(d.y) - 1; },
                            x: function (d) { return xScale(d.x); },
                            y: function (d) { return yScale(d.y); }
                        });
                        svg
                            .selectAll('text')
                            .data(hist)
                            .enter()
                            .append('text')
                            .text(function (d) { return d.y; })
                            .attr({
                            class: 'label',
                            x: function (d) { return xScale(d.x + binwidth / 2); },
                            y: function (d) { return yScale(d.y) + 14; },
                            'text-anchor': 'middle'
                        });
                        svg
                            .append('g')
                            .attr({
                            class: 'x axis',
                            transform: "translate(0, " + height + ")"
                        })
                            .call(xAxis);
                        var yAxisCanvas = svg
                            .append('g')
                            .attr('class', 'y axis')
                            .call(yAxis);
                        $(':radio[name=binwidth]').on('change', function (e) {
                            binwidth = parseInt(e.target.value);
                            //console.log(e.target.value, binwidth);
                            histogram = d3.layout.histogram()
                                .bins(d3.range(xScale.domain()[0], xScale.domain()[1] + binwidth, binwidth));
                            hist = histogram(data.map(function (d) { return d.x; }));
                            yScale.domain([0, d3.max(hist, function (d) { return d.y; })]);
                            xBinwidth = width / hist.length - 1;
                            var update = svg
                                .selectAll('rect.bar')
                                .data(hist.filter(function (d) { return height - yScale(d.y) > 0; }));
                            update
                                .enter()
                                .append('rect')
                                .attr({
                                class: 'bar',
                                width: function (d) { return xBinwidth; },
                                height: function (d) { return height - yScale(d.y) - 1; },
                                x: function (d) { return xScale(d.x); },
                                y: function (d) { return yScale(d.y); }
                            });
                            update
                                .attr({
                                width: function (d) { return xBinwidth; },
                                height: function (d) { return height - yScale(d.y) - 1; },
                                x: function (d) { return xScale(d.x); },
                                y: function (d) { return yScale(d.y); }
                            });
                            update
                                .exit()
                                .remove();
                            if (binwidth > 20) {
                                var update_1 = svg
                                    .selectAll('text.label')
                                    .data(hist);
                                update_1
                                    .enter()
                                    .append('text')
                                    .attr({
                                    class: 'label',
                                    x: function (d) { return xScale(d.x + binwidth / 2); },
                                    y: function (d) { return yScale(d.y) + 14; },
                                    'text-anchor': 'middle'
                                });
                                update_1
                                    .text(function (d) { return d.y; })
                                    .attr({
                                    class: 'label',
                                    x: function (d) { return xScale(d.x + binwidth / 2); },
                                    y: function (d) { return yScale(d.y) + 14; },
                                    'text-anchor': 'middle'
                                });
                                update_1
                                    .exit()
                                    .remove();
                            }
                            else {
                                svg
                                    .selectAll('text.label')
                                    .remove();
                            }
                            yAxisCanvas.call(yAxis);
                        });
                    });
                };
                HistogramLayout = __decorate([
                    core_1.Component({
                        selector: 'd3-histogram',
                        providers: [http_1.HTTP_PROVIDERS]
                    }),
                    core_1.View({
                        template: "\n\t<div align=\"right\">\n\t\t<input type=\"radio\" name=\"binwidth\" value=\"10\">10\n\t\t<input type=\"radio\" name=\"binwidth\" value=\"20\">20\n\t\t<input type=\"radio\" name=\"binwidth\" value=\"50\">50\n\t\t<input type=\"radio\" name=\"binwidth\" checked value=\"100\">100\n\t\t<input type=\"radio\" name=\"binwidth\" value=\"200\">200\n\t</div>\n\t<svg class=\"d3-layout-histogram\"></svg>\n\t"
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _b) || Object])
                ], HistogramLayout);
                return HistogramLayout;
                var _a, _b;
            })();
            exports_1("HistogramLayout", HistogramLayout);
        }
    }
});

System.register("app/d3/layouts/bundle.scss!github:mobilexag/plugin-sass@0.1.0", [], function() { return { setters: [], execute: function() {} } });

System.register("app/d3/layouts/bundle.ts", ["github:mbostock/d3@3.5.12", "npm:angular2@2.0.0-beta.0/core", "npm:angular2@2.0.0-beta.0/http", "app/d3/layouts/bundle.scss!github:mobilexag/plugin-sass@0.1.0"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var d3, core_1, http_1;
    var BundleLayout;
    return {
        setters:[
            function (d3_1) {
                d3 = d3_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            BundleLayout = (function () {
                function BundleLayout(elementRef, http) {
                    this.elementRef = elementRef;
                    this.http = http;
                    this.RADIUS = 400;
                    this.test1();
                }
                BundleLayout.prototype.test1 = function () {
                    var list = [
                        { name: 'a', related: ['b', 'c'] },
                        { name: 'b', related: ['c', 'f'] },
                        { name: 'c', related: ['e'] },
                        { name: 'd', related: ['f', 'a'] },
                        { name: 'e', related: ['a'] },
                        { name: 'f', related: ['c', 'd'] },
                    ];
                    var map = d3.map();
                    list.forEach(function (d) { return map.set(d.name, d); });
                    var links = [];
                    list.forEach(function (source) {
                        source.related.forEach(function (related) {
                            if (!map.has(related))
                                return;
                            var target = map.get(related);
                            source.parent = null;
                            target.parent = null;
                            links.push({ source: source, target: target });
                        });
                    });
                    links.forEach(function (link) {
                        console.log(link.source.name, link.target.name);
                    });
                    var result = d3.layout.bundle()(links);
                    console.log(result);
                };
                // [] → Tree
                BundleLayout.prototype.toTree = function (classes) {
                    var map = {};
                    function find(name, data) {
                        var node = map[name];
                        if (!node) {
                            node = data || { name: name, children: [] };
                            map[name] = node;
                            if (name.length && name.length > 0) {
                                var i = name.lastIndexOf('.');
                                node.parent = find(name.substring(0, i));
                                node.parent.children.push(node);
                                node.key = name.substring(i + 1);
                            }
                        }
                        return node;
                    }
                    classes.forEach(function (d) { return find(d.name, d); });
                    return map[''];
                };
                BundleLayout.prototype.toLink = function (nodes) {
                    var map = {};
                    nodes.forEach(function (d) { return map[d.name] = d; });
                    var imports = [];
                    nodes
                        .filter(function (d) { return Boolean(d.imports); })
                        .forEach(function (d) {
                        d.imports.forEach(function (i) {
                            imports.push({ source: map[d.name], target: map[i] });
                        });
                    });
                    return imports;
                };
                BundleLayout.prototype.ngOnInit = function () {
                    var _this = this;
                    this.http
                        .get('app/d3/layouts/bundle.json')
                        .subscribe(function (r) {
                        var diameter = _this.RADIUS * 2;
                        var radius = _this.RADIUS;
                        var innerRadius = _this.RADIUS - 120;
                        var cluster = d3.layout.cluster()
                            .size([360, innerRadius])
                            .sort(null)
                            .value(function (d) { return d.size; });
                        var bundle = d3.layout.bundle();
                        var line = d3.svg.line.radial()
                            .interpolate('bundle')
                            .tension(0.8)
                            .radius(function (d) { return d.y; })
                            .angle(function (d) { return d.x / 180 * Math.PI; });
                        var svg = d3
                            .select(_this.elementRef.nativeElement)
                            .select('svg')
                            .attr({
                            width: diameter,
                            height: diameter
                        })
                            .append('g')
                            .attr('transform', "translate(" + radius + ", " + radius + ")");
                        // {name, size, imports}
                        var data = JSON.parse(r.text());
                        // + cluster.Node {x, y}
                        var clusterNodes = cluster.nodes(_this.toTree(data));
                        // Node[] → cluster.Link<Node> {source: Node, target: Node}
                        var clusterLinks = _this.toLink(clusterNodes);
                        // Link<Node>[] → Node[][]
                        var bundleNodes = bundle(clusterLinks);
                        console.log(bundleNodes);
                        svg
                            .selectAll('path')
                            .data(bundleNodes)
                            .enter()
                            .append('path')
                            .style('stroke', function (d) { return d3.hsl(Math.random() * 360, 1, 0.6).toString(); })
                            .attr({
                            class: 'link',
                            d: line
                        });
                        svg
                            .selectAll('g')
                            .data(clusterNodes.filter(function (d) { return !d.children; }))
                            .enter()
                            .append('g')
                            .attr({
                            class: 'node',
                            transform: function (d) { return ("rotate(" + (d.x - 90) + ") translate(" + d.y + ")"); },
                        })
                            .append('text')
                            .text(function (d) { return d.key; })
                            .attr({
                            // text inner padding
                            dx: function (d) { return d.x < 180 ? 8 : -8; },
                            // vertical align middle
                            dy: '0.31em',
                            'text-anchor': function (d) { return d.x < 180 ? 'start' : 'end'; },
                            transform: function (d) { return d.x < 180 ? null : 'rotate(180)'; }
                        });
                    });
                };
                BundleLayout = __decorate([
                    core_1.Component({
                        selector: 'd3-bundle',
                        providers: [http_1.HTTP_PROVIDERS]
                    }),
                    core_1.View({
                        template: "<svg class=\"d3-layout-bundle\"></svg>"
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _b) || Object])
                ], BundleLayout);
                return BundleLayout;
                var _a, _b;
            })();
            exports_1("BundleLayout", BundleLayout);
        }
    }
});

System.register("app/d3/layouts/chord.scss!github:mobilexag/plugin-sass@0.1.0", [], function() { return { setters: [], execute: function() {} } });

System.register("app/d3/layouts/chord.ts", ["github:mbostock/d3@3.5.12", "npm:angular2@2.0.0-beta.0/core", "npm:angular2@2.0.0-beta.0/http", "app/d3/layouts/chord.scss!github:mobilexag/plugin-sass@0.1.0"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var d3, core_1, http_1;
    var ChordLayout;
    return {
        setters:[
            function (d3_1) {
                d3 = d3_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            //interface Node extends d3.layout.cluster.Result, d3.layout.bundle.Node {
            //	name: string;
            //	imports: d3.layout.bundle.Link[];
            //	size: number;
            //	parent: Node;
            //	key: string;
            //}
            ChordLayout = (function () {
                function ChordLayout(elementRef, http) {
                    this.elementRef = elementRef;
                    this.http = http;
                    this.RADIUS = 400;
                }
                ChordLayout.prototype.ngOnInit = function () {
                    var _this = this;
                    this.http
                        .get('app/d3/layouts/chord.json')
                        .subscribe(function (r) {
                        var outerRadius = _this.RADIUS;
                        var innerRadius = outerRadius - 100;
                        var fill = d3.scale.category20c();
                        var chord = d3.layout.chord()
                            .padding(0.04)
                            .sortSubgroups(d3.descending)
                            .sortChords(d3.descending);
                        var arc = d3.svg.arc()
                            .innerRadius(innerRadius)
                            .outerRadius(innerRadius + 20);
                        var svg = d3.select(_this.elementRef.nativeElement)
                            .select('svg')
                            .attr({
                            width: _this.RADIUS * 2,
                            height: _this.RADIUS * 2
                        })
                            .append('g')
                            .attr('transform', "translate(" + outerRadius + ", " + outerRadius + ")");
                        var imports = JSON.parse(r.text());
                        var indexByName = d3.map();
                        var nameByIndex = d3.map();
                        var matrix = [];
                        var n = 0;
                        function name(name) {
                            return name.substring(0, name.lastIndexOf('.')).substring(6);
                        }
                        imports.forEach(function (d) {
                            var nm = name(d.name);
                            if (!indexByName.has(nm)) {
                                nameByIndex.set(n.toString(), nm);
                                indexByName.set(nm, n++);
                            }
                        });
                        imports.forEach(function (d) {
                            var nm = name(d.name);
                            var source = indexByName.get(nm);
                            var row = matrix[source];
                            if (!row) {
                                row = matrix[source] = [];
                                var f = -1;
                                while (++f < n) {
                                    row[f] = 0;
                                }
                            }
                            d.imports.forEach(function (nm) { return row[indexByName.get(name(nm))]++; });
                        });
                        chord.matrix(matrix);
                        console.log('matrix', matrix);
                        console.log('groups', chord.groups());
                        console.log('chords', chord.chords());
                        // 외부 Arc
                        var chordGroups = chord.groups();
                        var g = svg
                            .selectAll('.group')
                            .data(chordGroups)
                            .enter()
                            .append('g')
                            .attr('class', 'group');
                        g
                            .append('path')
                            .style({
                            fill: function (d) { return fill(d.index); },
                            stroke: function (d) { return fill(d.index); }
                        })
                            .attr('d', arc);
                        g
                            .append('text')
                            .each(function (d) { return d.textAngle = (d.startAngle + d.endAngle) / 2; })
                            .attr({
                            dy: '0.35em',
                            transform: function (d) { return ("rotate(" + (d.textAngle * 180 / Math.PI - 90) + ") translate(" + (innerRadius + 26) + ")" + ((d.textAngle > Math.PI) ? 'rotate(180)' : '')); }
                        })
                            .style('text-anchor', function (d) { return (d.textAngle > Math.PI) ? 'end' : null; })
                            .text(function (d) { return nameByIndex.get(d.index); });
                        // 내부 Chord
                        var chordLinks = chord.chords();
                        svg
                            .selectAll('.chord')
                            .data(chordLinks)
                            .enter()
                            .append('path')
                            .attr('class', 'chord')
                            .style({
                            stroke: function (d) { return d3.rgb(fill(d.source.index)).darker(); },
                            fill: function (d) { return fill(d.source.index); }
                        })
                            .attr('d', d3.svg.chord().radius(innerRadius));
                    });
                };
                ChordLayout = __decorate([
                    core_1.Component({
                        selector: 'd3-chord',
                        providers: [http_1.HTTP_PROVIDERS]
                    }),
                    core_1.View({
                        template: "<svg class=\"d3-layout-chord\"></svg>"
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _b) || Object])
                ], ChordLayout);
                return ChordLayout;
                var _a, _b;
            })();
            exports_1("ChordLayout", ChordLayout);
        }
    }
});

System.register("app/d3/layouts/tree.scss!github:mobilexag/plugin-sass@0.1.0", [], function() { return { setters: [], execute: function() {} } });

System.register("app/d3/layouts/tree.ts", ["github:mbostock/d3@3.5.12", "npm:angular2@2.0.0-beta.0/core", "npm:angular2@2.0.0-beta.0/http", "app/d3/layouts/tree.scss!github:mobilexag/plugin-sass@0.1.0"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var d3, core_1, http_1;
    var TreeLayout;
    return {
        setters:[
            function (d3_1) {
                d3 = d3_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            TreeLayout = (function () {
                function TreeLayout(elementRef, http) {
                    this.elementRef = elementRef;
                    this.http = http;
                    this.WIDTH = 560;
                    this.HEIGHT = 2200;
                }
                TreeLayout.prototype.ngOnInit = function () {
                    var _this = this;
                    this.http
                        .get('app/d3/layouts/tree.json')
                        .subscribe(function (r) {
                        //----------------------------------------------------------------
                        // Svg and Data
                        //----------------------------------------------------------------
                        var svg = d3.select(_this.elementRef.nativeElement)
                            .select('svg')
                            .attr({ width: _this.WIDTH, height: _this.HEIGHT })
                            .append('g')
                            .attr('transform', 'translate(40, 0)');
                        var root = JSON.parse(r.text());
                        //----------------------------------------------------------------
                        // Layout
                        //----------------------------------------------------------------
                        var tree = d3.layout.tree()
                            .size([_this.HEIGHT, _this.WIDTH - 160])
                            .children(function (node) {
                            if (node.depth < 2) {
                                return node.children;
                            }
                            else {
                                return null;
                            }
                        })
                            .sort(function (a, b) { return (a.name == b.name) ? 0 : (a.name > b.name) ? -1 : 1; });
                        // Node(=지점)의 위치
                        // Tree를 수평화 시킨다 (??? children을 다른 이름으로 바꿀 수 없을까 ???)
                        // nodes(root: T): T[]
                        var nodes = tree.nodes(root);
                        //----------------------------------------------------------------
                        // Link
                        //----------------------------------------------------------------
                        // nodes.forEach(n => console.log(n));
                        // Link(=연결선)의 위치
                        // links(nodes: T[]): cluster.Link<T>[]
                        // cluster.Link<T>[] { source: T, target: T }
                        // source → from
                        // target → to
                        var links = tree.links(nodes);
                        // d3.svg.diagonal() → 선을 그리는 svg path generator
                        // Diagonal → 대각 결합선
                        // d3.svg.line() 으로는 처리가 안된다
                        // projection(): (d: Node, i: number) => [number, number]
                        var diagonal = d3.svg.diagonal().projection(function (node) { return [node.y, node.x]; });
                        svg.selectAll('.link')
                            .data(links)
                            .enter()
                            .append('path')
                            .classed({ link: true })
                            .attr('d', diagonal);
                        //----------------------------------------------------------------
                        // Node
                        //----------------------------------------------------------------
                        var node = svg.selectAll('.node')
                            .data(nodes)
                            .enter()
                            .append('g')
                            .classed({ node: true })
                            .attr('transform', function (node) { return ("translate(" + node.y + ", " + node.x + ")"); });
                        node.append('circle')
                            .attr('r', 3);
                        node.append('text')
                            .attr('dx', function (d) { return d.children ? -8 : 8; })
                            .attr('dy', 3)
                            .style('text-anchor', function (d) { return d.children ? 'end' : 'start'; })
                            .text(function (d) { return d.name; });
                    });
                    // d3.select(self.frameElement).style('height', `${this.HEIGHT}px`);
                };
                TreeLayout = __decorate([
                    core_1.Component({
                        selector: 'd3-tree',
                        providers: [http_1.HTTP_PROVIDERS]
                    }),
                    core_1.View({
                        template: "<svg class=\"d3-layout-tree\"></svg>"
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _b) || Object])
                ], TreeLayout);
                return TreeLayout;
                var _a, _b;
            })();
            exports_1("TreeLayout", TreeLayout);
        }
    }
});

System.register("app/d3/transition/basic.ts", ["github:mbostock/d3@3.5.12", "npm:angular2@2.0.0-beta.0/core", "npm:angular2@2.0.0-beta.0/http"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var d3, core_1, http_1;
    var TransitionBasic;
    return {
        setters:[
            function (d3_1) {
                d3 = d3_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            //import 'app/d3/layouts/bundle.scss!';
            TransitionBasic = (function () {
                function TransitionBasic(elementRef, http) {
                    this.elementRef = elementRef;
                    this.http = http;
                    this.WIDTH = 500;
                    this.HEIGHT = 400;
                }
                TransitionBasic.prototype.twizzle = function (selection, duration) {
                    //selection
                    //	.transition('twizzle')
                    //	.duration(duration)
                    //	.attrTween('transform', () => d3.interpolateString('rotate(0)', 'rotate(720)'))
                    //	.transition()
                    //	.duration(Math.random() * duration)
                    //	.each('end', () => selection.call(this.twizzle))
                };
                TransitionBasic.prototype.ngOnInit = function () {
                    var svg = d3
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
                        .attr('transform', "translate(" + this.WIDTH / 2 + ", " + this.HEIGHT / 2 + ")")
                        .append('path')
                        .attr('d', d3.svg.symbol().type('cross').size(50000))
                        .transition()
                        .duration(5000)
                        .tween('custom tween', function (d, i) {
                        console.log(d, i);
                        var opacity = d3.interpolateNumber(0, 1);
                        var rotate = d3.interpolateNumber(0, 720);
                        var selection = d3.select(this);
                        return function (t) {
                            selection.style('opacity', opacity(t));
                            selection.attr('transform', "rotate(" + rotate(t) + ")");
                        };
                    })
                        .each('start', function (d, i) { return console.log('start', d, i); })
                        .each('interrupt', function (d, i) { return console.log('interrupt', d, i); })
                        .each('end', function (d, i) { return console.log('end', d, i); })
                        .transition()
                        .duration(5000)
                        .styleTween('opacity', function () { return d3.interpolateNumber(1, 0); })
                        .attrTween('transform', function () { return d3.interpolateString('rotate(720)', 'rotate(0)'); });
                    //.call(this.twizzle)
                };
                TransitionBasic = __decorate([
                    core_1.Component({
                        selector: 'd3-transition-basic',
                        providers: [http_1.HTTP_PROVIDERS]
                    }),
                    core_1.View({
                        template: "<svg class=\"d3-transition-basic\"></svg>"
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _b) || Object])
                ], TransitionBasic);
                return TransitionBasic;
                var _a, _b;
            })();
            exports_1("TransitionBasic", TransitionBasic);
        }
    }
});

System.register("app/d3/transition/interpolate.scss!github:mobilexag/plugin-sass@0.1.0", [], function() { return { setters: [], execute: function() {} } });

System.register("app/d3/transition/interpolate.ts", ["github:mbostock/d3@3.5.12", "npm:angular2@2.0.0-beta.0/core", "npm:angular2@2.0.0-beta.0/http", "app/d3/transition/interpolate.scss!github:mobilexag/plugin-sass@0.1.0"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var d3, core_1, http_1;
    var TransitionInterpolate;
    return {
        setters:[
            function (d3_1) {
                d3 = d3_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            TransitionInterpolate = (function () {
                function TransitionInterpolate(elementRef) {
                    this.elementRef = elementRef;
                }
                TransitionInterpolate.prototype.ngOnInit = function () {
                    var fmax = 100;
                    var data = d3.range(fmax + 1).map(function (i) {
                        return { index: i };
                    });
                    var interpolate;
                    var columns = [];
                    var column;
                    column = 'interpolateString';
                    columns.push(column);
                    interpolate = d3.interpolateString('x(0)', 'x(1)');
                    for (var f = -1; ++f <= fmax;) {
                        data[f][column] = interpolate(f / fmax);
                    }
                    column = 'interpolateNumber';
                    columns.push(column);
                    interpolate = d3.interpolateNumber(0, 1);
                    for (var f = -1; ++f <= fmax;) {
                        data[f][column] = interpolate(f / fmax);
                    }
                    column = 'interpolateRound';
                    columns.push(column);
                    interpolate = d3.interpolateRound(0, 1);
                    for (var f = -1; ++f <= fmax;) {
                        data[f][column] = interpolate(f / fmax);
                    }
                    column = 'interpolateRgb';
                    columns.push(column);
                    interpolate = d3.interpolateRgb(d3.rgb(0, 0, 0), d3.rgb(255, 255, 255));
                    for (var f = -1; ++f <= fmax;) {
                        data[f][column] = interpolate(f / fmax);
                    }
                    column = 'interpolateArray';
                    columns.push(column);
                    interpolate = d3.interpolateArray([0, 0, 0], [1, 1, 1]);
                    for (var f = -1; ++f <= fmax;) {
                        data[f][column] = interpolate(f / fmax).toString();
                    }
                    column = 'interpolateObject';
                    columns.push(column);
                    interpolate = d3.interpolateObject({ a: 0, b: 0 }, { a: 1, b: 1 });
                    for (var f = -1; ++f <= fmax;) {
                        data[f][column] = JSON.stringify(interpolate(f / fmax));
                    }
                    function interpolateChar(a, b) {
                        var interpolate = d3.interpolateRound(a.charCodeAt(0), b.charCodeAt(0));
                        return function (t) { return String.fromCharCode(interpolate(t)); };
                    }
                    column = 'custom1';
                    columns.push(column);
                    interpolate = interpolateChar('a', 'z');
                    for (var f = -1; ++f <= fmax;) {
                        data[f][column] = interpolate(f / fmax);
                    }
                    function interpolateString(str) {
                        var interpolate = d3.interpolateNumber(0, str.length);
                        return function (t) {
                            var n = interpolate(t);
                            var f = Math.floor(n);
                            var newString = str.substr(0, f);
                            if (n - f > 0.5)
                                newString += '_';
                            return newString;
                        };
                    }
                    column = 'custom2';
                    columns.push(column);
                    interpolate = interpolateString('hello world!!!');
                    for (var f = -1; ++f <= fmax;) {
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
                    var table = d3
                        .select(this.elementRef.nativeElement)
                        .select('table');
                    table
                        .append('tr')
                        .selectAll('th')
                        .data(columns)
                        .enter()
                        .append('th')
                        .text(function (column) { return column; });
                    table
                        .selectAll('.tr')
                        .data(data)
                        .enter()
                        .append('tr')
                        .html(function (d) { return columns.map(function (column) { return ("<td>" + d[column] + "</td>"); }).join(''); });
                };
                TransitionInterpolate = __decorate([
                    core_1.Component({
                        selector: 'd3-transition-interpolate',
                        providers: [http_1.HTTP_PROVIDERS]
                    }),
                    core_1.View({
                        template: "<table class=\"d3-transition-interpolate\"></table>"
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], TransitionInterpolate);
                return TransitionInterpolate;
                var _a;
            })();
            exports_1("TransitionInterpolate", TransitionInterpolate);
        }
    }
});

System.register("app/d3/transition/pie.ts", ["github:mbostock/d3@3.5.12", "npm:angular2@2.0.0-beta.0/core"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var d3, core_1;
    var TransitionPie;
    return {
        setters:[
            function (d3_1) {
                d3 = d3_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            TransitionPie = (function () {
                function TransitionPie(elementRef) {
                    this.elementRef = elementRef;
                    this.RADIUS = 300;
                }
                TransitionPie.prototype.getData = function () {
                    return d3
                        .range((Math.random() * 10) + 5)
                        .map(function (i) {
                        return {
                            label: 'item' + i,
                            value: Math.floor(Math.random() * 100000)
                        };
                    });
                };
                TransitionPie.prototype.ngOnInit = function () {
                    var _this = this;
                    //----------------------------------------------------------------
                    // Svg and Data
                    //----------------------------------------------------------------
                    var g = d3.select(this.elementRef.nativeElement)
                        .select('svg')
                        .attr({ width: this.RADIUS * 2, height: this.RADIUS * 2 })
                        .append('g')
                        .attr('transform', "translate(" + this.RADIUS + ", " + this.RADIUS + ")");
                    //----------------------------------------------------------------
                    // Layout
                    //----------------------------------------------------------------
                    var pie = d3.layout.pie().value(function (d, i) { return d.value; });
                    var color = d3.scale.category20();
                    //----------------------------------------------------------------
                    // Nodes
                    //----------------------------------------------------------------
                    var DURATION = 1000;
                    var path;
                    var arc = d3.svg.arc()
                        .outerRadius(this.RADIUS - 20)
                        .innerRadius(this.RADIUS - 27);
                    function entry(g, source) {
                        var data = pie(source);
                        var path = g
                            .selectAll('.path')
                            .data(data)
                            .enter()
                            .append('path')
                            .attr('fill', function (d, i) { return color(i.toString()); });
                        path
                            .transition()
                            .duration(DURATION)
                            .tween('entry arc', function () {
                            var selection = d3.select(this);
                            return function (t) {
                                selection
                                    .attr('d', function (d, i) {
                                    var start = d.startAngle * t;
                                    var end = d.endAngle * t;
                                    return arc.startAngle(start).endAngle(end)(d, i);
                                });
                            };
                        });
                        return path;
                    }
                    function exit(path) {
                        path
                            .transition()
                            .duration(DURATION)
                            .tween('exit arc', function () {
                            var selection = d3.select(this);
                            return function (t) {
                                var r = 1 - t;
                                var a = (Math.PI * 2) - (Math.PI * 2 * r);
                                selection
                                    .attr('d', function (d, i) {
                                    var start = (d.startAngle * r) + a;
                                    var end = (d.endAngle * r) + a;
                                    return arc.startAngle(start).endAngle(end)(d, i);
                                });
                            };
                        })
                            .remove();
                    }
                    //----------------------------------------------------------------
                    // control
                    //----------------------------------------------------------------
                    path = entry(g, this.getData());
                    d3
                        .select(this.elementRef.nativeElement)
                        .select('#refresh')
                        .on('click', function () {
                        exit(path);
                        path = entry(g, _this.getData());
                    });
                };
                TransitionPie = __decorate([
                    core_1.Component({
                        selector: 'd3-transition-pie'
                    }),
                    core_1.View({
                        template: "\n\t<div align=\"right\">\n\t\t<button id=\"refresh\">REFRESH</button>\n\t</div>\n\t<svg class=\"d3-transition-pie\"></svg>\n\t"
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], TransitionPie);
                return TransitionPie;
                var _a;
            })();
            exports_1("TransitionPie", TransitionPie);
        }
    }
});

System.register("app/main/main.ts", ["npm:angular2@2.0.0-beta.0/core", "npm:angular2@2.0.0-beta.0/router", "app/main/main.scss!github:mobilexag/plugin-sass@0.1.0", "app/d3/layouts/hierarchy.ts", "app/index/index.ts", "app/d3/layouts/cluster.ts", "app/d3/layouts/pack.ts", "app/d3/layouts/partition.ts", "app/d3/layouts/pie.ts", "app/d3/layouts/force.ts", "app/d3/core/selection-enter-exit.ts", "app/d3/layouts/stack.ts", "app/d3/layouts/treemap.ts", "app/d3/layouts/histogram.ts", "app/d3/layouts/bundle.ts", "app/d3/layouts/chord.ts", "app/d3/layouts/tree.ts", "app/d3/transition/basic.ts", "app/d3/transition/interpolate.ts", "app/d3/transition/pie.ts"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, hierarchy_1, index_1, cluster_1, pack_1, partition_1, pie_1, force_1, selection_enter_exit_1, stack_1, treemap_1, histogram_1, bundle_1, chord_1, tree_1, basic_1, interpolate_1, pie_2;
    var config, Main;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (_1) {},
            function (hierarchy_1_1) {
                hierarchy_1 = hierarchy_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (cluster_1_1) {
                cluster_1 = cluster_1_1;
            },
            function (pack_1_1) {
                pack_1 = pack_1_1;
            },
            function (partition_1_1) {
                partition_1 = partition_1_1;
            },
            function (pie_1_1) {
                pie_1 = pie_1_1;
            },
            function (force_1_1) {
                force_1 = force_1_1;
            },
            function (selection_enter_exit_1_1) {
                selection_enter_exit_1 = selection_enter_exit_1_1;
            },
            function (stack_1_1) {
                stack_1 = stack_1_1;
            },
            function (treemap_1_1) {
                treemap_1 = treemap_1_1;
            },
            function (histogram_1_1) {
                histogram_1 = histogram_1_1;
            },
            function (bundle_1_1) {
                bundle_1 = bundle_1_1;
            },
            function (chord_1_1) {
                chord_1 = chord_1_1;
            },
            function (tree_1_1) {
                tree_1 = tree_1_1;
            },
            function (basic_1_1) {
                basic_1 = basic_1_1;
            },
            function (interpolate_1_1) {
                interpolate_1 = interpolate_1_1;
            },
            function (pie_2_1) {
                pie_2 = pie_2_1;
            }],
        execute: function() {
            config = [
                { path: '/', name: 'Index', component: index_1.Index },
                // selection
                { path: '/d3/core/selection-enter-exit', name: 'Selection Enter, Exit', component: selection_enter_exit_1.SelectionEnterExit },
                // hierarchy layouts
                { path: '/d3/layouts/hierarchy', name: 'Hierarchy Layout', component: hierarchy_1.HierarchyLayout },
                { path: '/d3/layouts/cluster', name: 'Cluster Layout', component: cluster_1.ClusterLayout },
                { path: '/d3/layouts/tree', name: 'Tree Layout', component: tree_1.TreeLayout },
                { path: '/d3/layouts/pack', name: 'Pack Layout', component: pack_1.PackLayout },
                { path: '/d3/layouts/partition', name: 'Partition Layout', component: partition_1.PartitionLayout },
                { path: '/d3/layouts/treemap', name: 'Treemap Layout', component: treemap_1.TreemapLayout },
                // other layouts
                { path: '/d3/layouts/pie', name: 'Pie Layout', component: pie_1.PieLayout },
                { path: '/d3/layouts/stack', name: 'Stack Layout', component: stack_1.StackLayout },
                { path: '/d3/layouts/histogram', name: 'Histogram Layout', component: histogram_1.HistogramLayout },
                { path: '/d3/layouts/bundle', name: 'Bundle Layout', component: bundle_1.BundleLayout },
                { path: '/d3/layouts/chord', name: 'Chord Layout', component: chord_1.ChordLayout },
                { path: '/d3/layouts/force', name: 'Force Layout', component: force_1.ForceLayout },
                // transition
                { path: '/d3/transition/basic', name: 'Transition Basic', component: basic_1.TransitionBasic },
                { path: '/d3/transition/interpolate', name: 'Transition Interpolate', component: interpolate_1.TransitionInterpolate },
                { path: '/d3/transition/pie', name: 'Transition Pie', component: pie_2.TransitionPie }
            ];
            Main = (function () {
                function Main(location) {
                    this.location = location;
                    this.routeConfig = config;
                }
                Main.prototype.isActive = function (path) {
                    return this.location.path() === path;
                };
                Main = __decorate([
                    core_1.Component({
                        selector: 'app-main',
                        providers: [
                            router_1.ROUTER_PROVIDERS,
                            core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy })
                        ]
                    }),
                    core_1.View({
                        templateUrl: 'app/main/main.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig(config), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Location !== 'undefined' && router_1.Location) === 'function' && _a) || Object])
                ], Main);
                return Main;
                var _a;
            })();
            exports_1("Main", Main);
        }
    }
});

System.register("app/boot.ts", ["npm:angular2@2.0.0-beta.0/platform/browser", "app/main/main.ts"], function(exports_1) {
    'use strict';
    var browser_1, main_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (main_1_1) {
                main_1 = main_1_1;
            }],
        execute: function() {
            //enableProdMode();
            browser_1.bootstrap(main_1.Main);
        }
    }
});

System.register('app/main/main.scss!github:mobilexag/plugin-sass@0.1.0', [], false, function() {});
System.register('app/d3/layouts/cluster.scss!github:mobilexag/plugin-sass@0.1.0', [], false, function() {});
System.register('app/d3/layouts/pack.scss!github:mobilexag/plugin-sass@0.1.0', [], false, function() {});
System.register('app/d3/layouts/partition.scss!github:mobilexag/plugin-sass@0.1.0', [], false, function() {});
System.register('app/d3/layouts/pie.scss!github:mobilexag/plugin-sass@0.1.0', [], false, function() {});
System.register('app/d3/layouts/force.scss!github:mobilexag/plugin-sass@0.1.0', [], false, function() {});
System.register('app/d3/core/selection-enter-exit.scss!github:mobilexag/plugin-sass@0.1.0', [], false, function() {});
System.register('app/d3/layouts/stack.scss!github:mobilexag/plugin-sass@0.1.0', [], false, function() {});
System.register('app/d3/layouts/treemap.scss!github:mobilexag/plugin-sass@0.1.0', [], false, function() {});
System.register('app/d3/layouts/histogram.scss!github:mobilexag/plugin-sass@0.1.0', [], false, function() {});
System.register('app/d3/layouts/bundle.scss!github:mobilexag/plugin-sass@0.1.0', [], false, function() {});
System.register('app/d3/layouts/chord.scss!github:mobilexag/plugin-sass@0.1.0', [], false, function() {});
System.register('app/d3/layouts/tree.scss!github:mobilexag/plugin-sass@0.1.0', [], false, function() {});
System.register('app/d3/transition/interpolate.scss!github:mobilexag/plugin-sass@0.1.0', [], false, function() {});
(function(c){var d=document,a='appendChild',i='styleSheet',s=d.createElement('style');s.type='text/css';d.getElementsByTagName('head')[0][a](s);s[i]?s[i].cssText=c:s[a](d.createTextNode(c));})
("table.d3-transition-interpolate{font-size:12px;border-collapse:collapse}table.d3-transition-interpolate th,table.d3-transition-interpolate td{border:1px solid #000000;padding:2px}table.d3-transition-interpolate th{background-color:rgba(0,0,0,0.07)}\nsvg.d3-layout-tree{background-color:#eeeeee}svg.d3-layout-tree .node{font:10px sans-serif}svg.d3-layout-tree .node circle{fill:#fff;stroke:steelblue;stroke-width:1px}svg.d3-layout-tree .link{fill:none;stroke:#ccc;stroke-width:1px}\nsvg.d3-layout-chord{font-size:10px}svg.d3-layout-chord .chord{fill-opacity:0.67}\nsvg.d3-layout-bundle .node{font-size:8px;font-family:\"Helvetica Neue\", Helvetica, Arial, sans-serif}svg.d3-layout-bundle .link{stroke:steelBlue;stroke-opacity:0.7;fill:none}\nsvg.d3-layout-histogram{font-size:10px;font-family:sans-serif}svg.d3-layout-histogram g.axis line,svg.d3-layout-histogram g.axis path{shape-rendering:crispEdges;stroke:#000000;fill:none}svg.d3-layout-histogram rect.bar{fill:steelblue;shape-rendering:crispEdges}svg.d3-layout-histogram text.label{fill:#ffffff}\ndiv.d3-layout-treemap{position:relative}div.d3-layout-treemap div.node{border:1px solid #ffffff;font-size:10px;font-family:sans-serif;overflow:hidden;position:absolute;text-indent:2px}\nsvg.d3-layout-stack g.axis text{font-size:10px;font-family:sans-serif}svg.d3-layout-stack g.axis line,svg.d3-layout-stack g.axis path{fill:none;stroke:#000000;shape-rendering:crispEdges}svg.d3-layout-stack g.axis--x path{display:none}\nul.d3-selection-enter-exit{font-size:0.8rem}ul.d3-selection-enter-exit li{color:#cccccc}ul.d3-selection-enter-exit li.highlight{color:#000000}ul.d3-selection-enter-exit li li{color:#888888}\nsvg.d3-layout-force{background-color:#eeeeee}svg.d3-layout-force line.link{stroke:#000;stroke-width:1px}svg.d3-layout-force circle.node{cursor:move;fill:#ccc;stroke:#000;stroke-width:1px}svg.d3-layout-force circle.node.fixed{fill:#ff0000}div.d3-layout-force{margin-bottom:20px}div.d3-layout-force p{font-size:0.9rem}div.d3-layout-force p select{width:70px}\nsvg.d3-layout-pie .arc text{text-anchor:middle;pointer-events:none}\nsvg.d3-layout-partition path.link{stroke:#000000;stroke-width:1px}\nsvg.d3-layout-pack g.node circle{fill:none;stroke:#000000;stroke-width:1px}svg.d3-layout-pack g.node text{text-anchor:middle;pointer-events:none}svg.d3-layout-pack g.node.leaf circle{fill:#eeeeee;fill-opacity:0.6}svg.d3-layout-pack path.link{fill:none;stroke:#000000;stroke-linecap:round;stroke-opacity:0.2;pointer-events:none}\nsvg.d3-layout-cluster{background-color:#eeeeee}svg.d3-layout-cluster .node{font:10px sans-serif}svg.d3-layout-cluster .node circle{fill:#fff;stroke:steelblue;stroke-width:1px}svg.d3-layout-cluster .link{fill:none;stroke:#ccc;stroke-width:1px}\nul.main-menu{padding-left:0}ul.main-menu li{display:inline;list-style-type:none;margin-right:4px;font-size:0.85rem}ul.main-menu li a{text-decoration:none}ul.main-menu li a.main-menu-active{text-decoration:underline}svg{border:1px solid #000000}\n");
//# sourceMappingURL=app.js.map