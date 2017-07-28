/** @jsx h */

/*
	helper function to create a virtual DOM tree like this:
	{ type: ‘ul’, props: { ‘class’: ‘list’ }, children: [
  { type: ‘li’, props: {}, children: [‘item 1’] },
  { type: ‘li’, props: {}, children: [‘item 2’] }
	] }

*/
function h (type, props, ...children) {
	return { type, props, children }
}
/*
	Using this helper function we can write DOM tree representation like this:
	h('ul', {'class': 'list'},
		h('li', {}, 'item 1'),
		h('li', {}, 'item 2')
	)
*/


/*
  function to create a real DOM node
*/

function createElement (node) {
  if (typeof node === 'string') {
    return document.createTextNode(node)
  }

  const $el = document.createElement(node.type)
  
  node.children.map(createElement).forEach($el.appendChild.bind($el))
  return $el

  // return document.createElement(node.type)
}

const a = (
  <ul class="list">
    <li>item 1</li>
    <li>item 2</li>
  </ul>
);

const $root = document.getElementById('root');
$root.appendChild(createElement(a));
console.log($root);