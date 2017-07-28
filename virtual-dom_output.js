"use strict";

/** @jsx h */

/*
	helper function to create a virtual DOM tree like this:
	{ type: ‘ul’, props: { ‘class’: ‘list’ }, children: [
  { type: ‘li’, props: {}, children: [‘item 1’] },
  { type: ‘li’, props: {}, children: [‘item 2’] }
	] }

*/
function h(type, props) {
	for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
		children[_key - 2] = arguments[_key];
	}

	return { type: type, props: props, children: children };
}
/*
	Using this helper function we can write DOM tree representation like this:
	h('ul', {'class': 'list'},
		h('li', {}, 'item 1'),
		h('li', {}, 'item 2')
	)
*/

var a = h(
	"ul",
	{ "class": "list" },
	h(
		"li",
		null,
		"item 1"
	),
	h(
		"li",
		null,
		"item 2"
	)
);

console.log(a);
