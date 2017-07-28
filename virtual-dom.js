/*
	helper function to create a virtual DOM tree like this:
	{ type: ‘ul’, props: { ‘class’: ‘list’ }, children: [
  { type: ‘li’, props: {}, children: [‘item 1’] },
  { type: ‘li’, props: {}, children: [‘item 2’] }
	] }

*/
function h(type, props, ...children) {
	return { type, props, children }
}
/*
	Using this helper function we can write DOM tree representation like this:
	h('ul', {'class': 'list'},
		h('li', {}, 'item 1'),
		h('li', {}, 'item 2')
	)
*/