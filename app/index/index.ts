'use strict';
import {Component, View, Inject} from 'angular2/core';

@Component({
	selector: 'content-index'
})
@View({
	template: `<h1>Index</h1>`
})
export class Index {
	constructor() {
		console.log('???????');
	}
}