# D3 Tooltip

## Sample
[Web Site](http://iamssen.github.io/d3tip/) ← [Source Code](https://github.com/iamssen/d3tip/tree/gh-pages)

## With npmcdn
```
<link rel="stylesheet" href="https://npmcdn.com/d3tip/dist/d3tip.css">
<script src="https://npmcdn.com/d3tip"></script>
<script>
  d3.select('#button')
    .datum('HELLO WORLD')
    .call(d3tip({
      html: d => d.toString()
    })
</script>
```

## With jspm
```
import * as d3 from 'd3';
import d3tip from 'd3tip';
import 'd3tip/dist/d3tip.css!';

d3.select('#button')
  .datum('HELLO WORLD')
  .call(d3tip({
    html: d => d.toString()
  }))
```

## Options
- `html: string|(d?:Datum, i?:number, o?:number) => string`
- `classed?: string[]|(d?:Datum, i?:number, o?:number) => string[]`
- `distance?: number`
- `target?: string = 'pointer|element'`
- `position?: string|(d?:Datum, i?:number, o?:number) => string = 'left|right|top|bottom|topLeft|topRight|bottomLeft|bottomRight'`