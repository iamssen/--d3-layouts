//----------------------------------------------------------------
// select
//----------------------------------------------------------------
export function parent() {
	return [this.parentNode];
}

export function children(tag?:string) {
	return function () {
		let children:Element[] = this.childNodes;
		if (!children || !children.length) return [];
		if (!tag) return children;

		let filtered:Element[] = [];
		let f:number = -1;
		let fmax:number = children.length;
		while (++f < fmax) {
			let el:Element = children[f];
			if (el.nodeName.toLowerCase() === tag.toLowerCase()) filtered.push(el);
		}
		return filtered;
	}
}

export function query(query:string) {
	return function () {
		return [];
	}
}

//----------------------------------------------------------------
// append
//----------------------------------------------------------------
export function appendIfNotExists(tag:string) {
	return (selection:d3.Selection) => {
		selection
			.filter((d, i, o) => !d3.select(selection[o][i]).select(tag).node())
			.append(tag)
	}
}