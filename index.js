import { showEl, hideEl, createStagesObj } from './utils.js';
// import { enter, exit } from './execute-stages.js';
import { enter2, exit2 } from './execute-stages.js';

// TODO: check if map exists in window; allow  a new data attribute to specify options (use Map or no, to allow resersible transitions)
// TODO: clear the el from map after the transitions finishes (use destroy)
// should we have a Map inside the function?
// TODO: api similar to vue/react: given a data-css-transition-name, we will automatically add suffixes
// TODO: emit events: enter-start, enter-end, leave-start, leave-end (might be useful to activate some plugin only after the element is actually shown, example: load a dynamic module and create a map)
let map = new Map();

function cssTransition(el, optionsOnMount) {
	// the node has been mounted in the DOM
	
	// initialize

	let _show = (typeof optionsOnMount === 'object' ? optionsOnMount.show : optionsOnMount);

	if (_show) {
		showEl(el);
	}
	else {
		hideEl(el);
	}
	
	function update(options, arg1) {

		let _show = (typeof options === 'object' ? options.show : options);

		//debugger;
		// save the most recent update to "show"; will be checked later to allow 
		// revertible transitions

		// let stages = createStagesObj(el, _show);
		
		if (_show) {
			// enter(el, stages);
			enter2(el, options);
		}
		else {
			// exit(el, stages);
			exit2(el, options);
		}
	}
	
	// function destroy(arg0) {
	// 	// the node has been removed from the DOM
	// 	console.log(`[el: ${el.id}] destroy @ ${Date.now()}`)
	// }
			
	let out = { update };
	
	return out;
}
	

export {
	cssTransition
}
