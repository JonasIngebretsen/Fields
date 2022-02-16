/**
 * Import Components
 */
import { ComponentText } from './components/Text.component.js'
import { ComponentSearch } from './components/Search.component.js'
import { ComponentNumber } from './components/Number.component.js'
import { ComponentPassword } from './components/Password.component.js'
import { ComponentButton } from './components/Button.component.js'
import { ComponentRadio } from './components/Radio.component.js'
import { ComponentCheckbox } from './components/Checkbox.component.js'
import { ComponentSelect } from './components/Select.component.js'
import { ComponentFile } from './components/File.component.js'
import { ComponentColor } from './components/Color.component.js'
import { ComponentDate } from './components/Date.component.js'
import { ComponentURL } from './components/URL.component.js'
import { ComponentEmail } from './components/Email.component.js'
import { ComponentTel } from './components/Tel.component.js'
import { ComponentRange } from './components/Range.component.js'
import { ComponentTextarea } from './components/Textarea.component.js'


/**
 * Main Class for Fields
 * @Added v1.0.0
 */
class Fields {

	constructor( args ) {
		this.Initialize( args )
	}


	/**
	 * Initialize system
	 *
	 * Can only run once.
	 * @Added v1.0.0
	 */
	Initialize( args ) {

		if ( ! window.Fields ) { window.Fields = this }

		if ( this.config('initialized') ) { return false }

		// 1. Define arguments & options
		this.setConfig( args )

		// 2. Load helper classes
		this.loadHelpers()

		// 2. Load all components
		this.loadComponents()

		// 3. Initialize each component
		this.runComponents()

		console.log('Fields: ' + 'initialized')

		return true
	}


	/**
	 * Set config arguments
	 * @Added v1.0.0
	 */
	setConfig( args = {} ) {

		window.Fields.configData = args
		window.Fields.configData.version = '1.0.0'
		window.Fields.configData.author = 'Jonas B. Ingebretsen'
		window.Fields.configData.name = 'Fields'
		window.Fields.configData.initialized = true
	}


	/**
	 * Fetches arguments & options
	 * @Added v1.0.0
	 */
	config( key = null ) {
		if ( ! window.Fields || ! window.Fields.configData ) { return null }
		return key ? window.Fields.configData[ key ] : window.Fields.configData 
	}


	/**
	 * Load all helper classes
	 * @Added v1.0.0
	 */
	loadHelpers() {
		this.Helpers = {}

	}


	/**
	 * Load all components
	 * @Added v1.0.0
	 */
	loadComponents() {
		this.Components = {}
		this.Components.Text = new ComponentText()
		this.Components.Search = new ComponentSearch()
		this.Components.Number = new ComponentNumber()
		this.Components.Password = new ComponentPassword()
		this.Components.Button = new ComponentButton()
		this.Components.Radio = new ComponentRadio()
		this.Components.Checkbox = new ComponentCheckbox()
		this.Components.Select = new ComponentSelect()
		this.Components.File = new ComponentFile()
		this.Components.Color = new ComponentColor()
		this.Components.Date = new ComponentDate()
		this.Components.URL = new ComponentURL()
		this.Components.Email = new ComponentEmail()
		this.Components.Tel = new ComponentTel()
		this.Components.Range = new ComponentRange()
		this.Components.Textarea = new ComponentTextarea()
	}

	/**
	 * Runs / Executes all components
	 * @Added v1.0.0
	 */
	runComponents() {

		this.Components.Text.initialize()
		
	}


}

// Run Fields
new Fields()