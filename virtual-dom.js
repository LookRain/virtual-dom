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

/*
  function to handle diffing between old and new virtual DOM tree
  and update of DOM  
*/
  function updateElement($parent, newNode, oldNode, index = 0) {
    /*
      if the newNode is completely new, there is no old node
    */
    if (!oldNode) {
      $parent.appendChild(createElement(newNode))
    } else if (!newNode) {
      $parent.removeChild(
        $parent.childNodes[index])
    } else if (changed(newNode, oldNode)) {
      $parent.replaceChild(createElement(newNode), $parent.childNodes[index])
    } else if (newNode.type) {
      const newLength = newNode.children.length
      const oldLength = oldNode.children.length
      for (let i = 0; i < newLength || i < oldLength; i++) {
        updateElement(
          $parent.childNodes[index],
          newNode.children[i],
          oldNode.children[i],
          i
          )
      }
    }
  }

  function changed(node1, node2) {
    return typeof node1 !== typeof node2 ||
      typeof node1 === 'string' && node1 !== node2 ||
      node1.type !== node2.type
  }

const a = (
  <ul>
    <li>item 1</li>
    <li>item 2</li>
  </ul>
);

const b = (
  <ul>
    <li>item 1</li>
    <li>hello!</li>
  </ul>
);

const $root = document.getElementById('root');
const $reload = document.getElementById('reload');

updateElement($root, a);
$reload.addEventListener('click', () => {
  updateElement($root, b, a);
});
