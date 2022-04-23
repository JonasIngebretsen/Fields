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
		label.setAttribute('field-label', node.getAttribute('field') )
		label.setAttribute('for', node.id || '' )
		node.parentNode.parentNode.prepend( label )
	}
	
	
	/**
	* Create a icon for field
	* 
	* @Added v1.0.0
	*/
	icon( node ) {
		let iconName = node.getAttribute('icon')
		let iconAlign = node.getAttribute('icon-align') == 'left' ? 'left' : 'right'
		if ( ! iconName ) { return false }
		iconName = iconName.trim().toLowerCase()
		let icon = document.createElement('i')
		icon.innerText = iconName
		icon.setAttribute('field-icon', node.getAttribute('field') )
		icon.setAttribute('align', iconAlign )
		node.parentNode.prepend( icon )
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
	async observer( start = true, type = null ) {
		if ( ! type ) { return null }
		
		// Define observe list if it does not exist
		if ( ! window.Fields.observeList ) { 
			window.Fields.observeList = {}
		}
		
		if ( ! window.Fields.observeListeners ) { 
			window.Fields.observeListeners = {}
		}
		
		// If start is false: Stop & bail
		if ( ! start ) { 
			window.Fields.observeList[ type ].remove()
			window.Fields.observeListeners[ type ].remove()
			return true
		}
		
		// Add to list of node-types to be observed
		window.Fields.observeList[ type ] = type
		
		// window.Fields.observeList[ type ] = document.addEventListener('change', (e) => {
		// 	console.log(e.target)
		// 	if ( e.target.hasAttribute('field-container') || e.target.hasAttribute('field-wrap') || e.target.hasAttribute('field') ) {
		// 		this.update( e.target )
		// 	}
		// }, false)
		
		const callback = ( mutationsList, observer ) => {
			for( const mutation of mutationsList ) {
				if ( mutation.target.hasAttribute('field-container') || mutation.target.hasAttribute('field-wrap') || mutation.target.hasAttribute('field') ) {
					this.update( mutation.target )
				}
			}
		}
		
		const eventListener = (e) => {
			if ( e.target.type === this.config.type && e.target.hasAttribute('field') ) {
				this.update( e.target )
			}
		}
		
		// Create observe instance if it does not exist
		if ( ! window.Fields.observer  ) {
			window.Fields.observer = new MutationObserver( callback )
		}
		
		// Update all fields of this type
		this.updateAll()
		
		// Start observing for this type
		this.observe()
		
		// Add event listeners for this type
		document.addEventListener('change', eventListener, false)
		document.addEventListener('keydown', eventListener, false)
		document.addEventListener('keyup', eventListener, false)
		document.addEventListener('submit', eventListener, false)
	}
	
	
	/**
	* Start observing
	* 
	* @Added v1.0.0
	*/
	observe( start = true ) {
		if ( ! window.Fields.observer  ) { 
			return null
		}
		
		if ( ! start ) {
			return window.Fields.observer.disconnect()
		}
		
		window.Fields.observer.observe(document.body, { 
			attributes: true,
			characterData: true,
			childList: true,
			subtree: true,
			attributeOldValue: true,
			characterDataOldValue: true
		})
	}
	
	
	/**
	* Update all fields
	* 
	* @Added v1.0.0
	*/
	async updateAll() {
		const nodes = document.querySelectorAll('[field][type="' + this.config.type + '"]')
		for ( let i = 0; i < nodes.length; i++ ) {
			this.update( nodes[i] )
		}
	}
	
	
	/**
	* Update the current field
	* 
	* @Added v1.0.0
	*/
	async update(field) {
		
		performance.clearMarks();
		performance.clearMeasures();
		performance.mark('update-field-start')
		
		await this.observe( false )
		
		// let siblings = document.querySelectorAll('[field][name="'+ field.name +'"]:not([field="'+ field.getAttribute('field') +'"])')
		// for ( let i = 0; i < siblings.length; i++ ) {
		// 	this.update( siblings[i] )
		// }
		
		const UID = field.getAttribute('field-container') || field.getAttribute('field-wrap') || field.getAttribute('field')
		
		let fieldContainer = field.hasAttribute('field-container') ? field : field.closest('[field-container]')
		
		if( ! fieldContainer ) {
			// Force update of input to field.
			return false
		}
		
		let fieldWrap = fieldContainer.querySelector('[field-wrap]')
		let fieldIcon = fieldContainer.querySelector('[field-icon]')
		let fieldLabel = fieldContainer.querySelector('[field-label]')
		
		let attributes = []
		
		// Get all siblings
		// const siblingQuery = '[field-wrap="' + UID + '"], [field="' + UID + '"]'
		const siblingQuery = '[field-wrap][name="' + field.name + '"], [field][name="' + field.name + '"], [field-bind][name="' + field.name + '"]'
		let siblings = document.querySelectorAll( siblingQuery )
		
		// Make siblings unique
		siblings = [ ... new Set( siblings ) ]
		
		// Get new attributes
		for ( let i = 0; i < field.attributes.length; i++ ) {
			let attr = field.attributes[i]
			
			// Do not modify the following attributes
			if ( 
				attr.name == 'field-container' || 
				attr.name == 'field-wrap' || 
				attr.name == 'field' || 
				attr.name == 'id' || 
				attr.name == 'name' || 
				attr.name == 'for' || 
				attr.name == 'type' || 
				attr.name == 'style' 
				) { continue }
				
				attributes[ attr.name ] = attr.nodeValue;
			}
			
			// Sync all attributes
			for ( let i = 0; i < siblings.length; i++ ) {
				if ( siblings[i] === field ) { continue }
				
				for (const key in attributes) {
					if( siblings[i].getAttribute(key) == attributes[ key ] ) { continue }
					siblings[i].setAttribute( key, attributes[ key ] )
				}
				
				// Copy value if it is a text field
				if ( this.textTypes().includes(field.type) ) {
					siblings[i].value = field.value
				}
			}
			
			// Update icon from attributes
			if ( attributes['icon'] && fieldIcon ) {
				if ( fieldIcon.innerText !== attributes['icon'] ) {
					fieldIcon.innerHTML = attributes['icon'].trim().toLowerCase()
				}
				
				if ( attributes['icon-align'] && fieldIcon.getAttribute('align') !== attributes['icon-align'] ) {
					fieldIcon.setAttribute('align', attributes['icon-align'].trim().toLowerCase() )
				}
			}
			
			// Update Label from attributes
			if ( attributes['label'] && fieldLabel ) {
				if ( fieldLabel.innerText !== attributes['label'] ) {
					fieldLabel.innerHTML = attributes['label']
				}
			}
			
			setTimeout((e) => {
				this.observe( true )
			}, 1)
			
			performance.mark('update-field-end')
			performance.measure('update-field', 'update-field-start', 'update-field-end')
			console.table( 'Exec - Field update: ' + performance.getEntriesByType("measure")[0].duration.toFixed(2) + 'ms' );
		}
		
		
		/**
		* Returns all text types
		*
		* @Added v1.0.0
		*/
		textTypes() {
			return ['text', 'email', 'tel', 'url', 'search']
		}
		
		
	}