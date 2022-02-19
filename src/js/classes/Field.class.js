/**
 * Class for Field
 */
export class Field {

	constructor( args = {} ) { this.config = args }


	/**
	 * Wrap element in wrapper nodes
	 *
	 * @Added v1.0.0
	 */
	wrap( node, template = null ) {

		node.addEventListener('click', (e) => {
			console.log('Clicked element!')
		})

		let UID = this.generateUID( node )
		let parent = node.parentNode
		let container = document.createElement('div')
		let wrapper = document.createElement('div')

		wrapper.appendChild(node)
		container.appendChild(wrapper)
		parent.appendChild(container)

		node.setAttribute('field', UID)
		wrapper.setAttribute('field-wrap', UID)

		wrapper.setAttribute('type', node.type)
		wrapper.setAttribute('name', node.name)
		wrapper.setAttribute('id', node.id)

		container.setAttribute('field-container', UID)
		container.setAttribute('type', node.type)
	}

	
	/**
	 * Create a label for field
	 * 
	 * @Added v1.0.0
	 */
	label( node ) {
		let label = document.createElement('label')
		label.innerText = node.getAttribute('label')
		label.setAttribute('label', node.getAttribute('field') )
		label.setAttribute('for', node.id || '' )
		node.parentNode.parentNode.prepend( label )
	}


	/**
	 * Generate ID from node attributes
	 *
	 * @Added v1.0.0
	 */
	generateUID( node ) {
		let name = node.name || ''
		let id = node.id || ''
		let type = node.type || ''
		let length = node.outerHTML.length || ''

		let UID = name +'-'+ id +'-'+ type +'-'+ length
		UID = UID.normalize('NFKD').toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/[-\s]+/g, '-');
		UID = 'field-' + UID
		return UID
	}


	/**
	 * Get ID of node
	 *
	 * @Added v1.0.0
	 */
	getID( node ) {
		if ( node.parentNode.hasAttribute('field-wrap') ) { node = node.parentNode }
		return node.getAttribute('field') || node.getAttribute('field-wrap')
	}

	
	/**
	 * Observe for this type of field
	 * 
	 * @Added v1.0.0
	 */
	observer( start = true ) {

	}


}