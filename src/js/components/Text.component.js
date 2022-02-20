import { Field } from '../classes/Field.class.js'

/**
 * Component class for: Text
 */
export class ComponentText extends Field {

	/**
	 * Constructor
	 * 
	 * @Added v1.0.0
	 */
	constructor() { 
		super({
			'type' 		: 'text',
			'transform' : true,
			'bind' 		: true,
			'listen' 	: true,
		})
	}


	/**
	 * Initialize this component
	 * 
	 * @Added v1.0.0
	 */
	initialize() {
		this.transform()
		this.observer( true )
	}


	/**
	 * Transform this type of field
	 * 
	 * @Added v1.0.0
	 */
	transform() {
		let query = '[type="'+ this.config.type +'"]'
		let nodes = document.querySelectorAll( query )

		for ( let i = 0; i < nodes.length; i++ ) {
			let node = nodes[i]

			super.wrap( node )
			super.label( node )
			super.icon( node )
			this.template( node )
		}
	}


	/**
	 * Observe for this type of field
	 * 
	 * @Added v1.0.0
	 */
	observer( start = true ) {

	}


	/**
	 * Create a template for this type
	 * 
	 * @Added v1.0.0
	 */
	template( node ) {
		
	}


	/**
	 * Listeners for this type
	 * 
	 * @Added v1.0.0
	 */
	listeners() {

	}


}