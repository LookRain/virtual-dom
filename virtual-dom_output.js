'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

/*
  function to create a real DOM node
*/

function createElement(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }

  var $el = document.createElement(node.type);

  node.children.map(createElement).forEach($el.appendChild.bind($el));
  return $el;

  // return document.createElement(node.type)
}

/*
  function to handle diffing between old and new virtual DOM tree
  and update of DOM  
*/
function updateElement($parent, newNode, oldNode) {
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  /*
    if the newNode is completely new, there is no old node
  */
  if (!oldNode) {
    $parent.appendChild(createElement(newNode));
  } else if (!newNode) {
    $parent.removeChild($parent.childNodes[index]);
  } else if (changed(newNode, oldNode)) {
    $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
  } else if (newNode.type) {
    var newLength = newNode.children.length;
    var oldLength = oldNode.children.length;
    for (var i = 0; i < newLength || i < oldLength; i++) {
      updateElement($parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
    }
  }
}

function changed(node1, node2) {
  return (typeof node1 === 'undefined' ? 'undefined' : _typeof(node1)) !== (typeof node2 === 'undefined' ? 'undefined' : _typeof(node2)) || typeof node1 === 'string' && node1 !== node2 || node1.type !== node2.type;
}

var a = h(
  'ul',
  null,
  h(
    'li',
    null,
    'item 1'
  ),
  h(
    'li',
    null,
    'item 2'
  )
);

var b = h(
  'ul',
  null,
  h(
    'li',
    null,
    'item 1'
  ),
  h(
    'li',
    null,
    'hello!'
  )
);

var $root = document.getElementById('root');
var $reload = document.getElementById('reload');

updateElement($root, a);
$reload.addEventListener('click', function () {
  updateElement($root, b, a);
});
