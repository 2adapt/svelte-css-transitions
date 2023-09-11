import { getDuration, showEl, hideEl, createStagesObj } from './utils.js';

// function enter(el, stages) {

// 	stages.start();
// 	stages.during();

// 	requestAnimationFrame(() => {

// 		//console.log(`[el: ${el.id}]   enter: requestAnimationFrame 0 @ ${Date.now()}`)
// 		//debugger;
// 		showEl(el);	

// 		requestAnimationFrame(() => {

// 			let duration = getDuration(el);
// 			//debugger;
// 			//console.log(`[el: ${el.id}]   enter: requestAnimationFrame 1 @ ${Date.now()}`)
// 			//console.log(`  duration: ${duration}`)
// 			stages.end(); // Assign current transition to el in case we need to force it.

// 			setTimeout(() => {

// 				//debugger;
// 				//console.log(`[el: ${el.id}]   enter: setTimeout @ ${Date.now()}`)

// 				//if (el.isConnected && map.get(el) === 'Enter') {
// 				stages.cleanup();

// 			}, duration);
// 		});
// 	});
// };

function enter2(el, options) {

	let _show = (typeof options === 'object' ? options.show : options);
	let _onTransitionEnd = (typeof options === 'object' && typeof options.onTransitionEnd === 'function' ? options.onTransitionEnd : null);

	// advantages of using our onTransitionEnd
	// 1) the native 'transitionend' event will fire once per each transitionted css property (opacity, transform, etc)
	// 2) does not seem to be reliable: sometimes it simply does not fire

	let stages = createStagesObj(el, _show);

	stages.start();
	stages.during();

	requestAnimationFrame(() => {

		//console.log(`[el: ${el.id}]   enter: requestAnimationFrame 0 @ ${Date.now()}`)
		//debugger;
		showEl(el);	

		requestAnimationFrame(() => {

			let duration = getDuration(el);
			// console.log({ duration })
			//debugger;
			//console.log(`[el: ${el.id}]   enter: requestAnimationFrame 1 @ ${Date.now()}`)
			//console.log(`  duration: ${duration}`)
			stages.end(); // Assign current transition to el in case we need to force it.

			setTimeout(() => {

				//debugger;
				//console.log(`[el: ${el.id}]   enter: setTimeout @ ${Date.now()}`)

				//if (el.isConnected && map.get(el) === 'Enter') {
				stages.cleanup();

				if (_onTransitionEnd) { _onTransitionEnd('enter') }

			}, duration);
		});
	});
};

// function exit(el, stages) {

// 	stages.start();
// 	stages.during();

// 	requestAnimationFrame(() => {

// 		let duration = getDuration(el);
// 		//debugger;
// 		//console.log(`[el: ${el.id}]   exit: requestAnimationFrame 0 @ ${Date.now()}`)
// 		//console.log(`  duration: ${duration}`)

// 		stages.end(); // Assign current transition to el in case we need to force it.

// 		setTimeout(() => {

// 			//debugger;
// 			//console.log(`[el: ${el.id}]   exit: setTimeout @ ${Date.now()}`)

// 			//if (map.get(el) === 'Leave') {
// 			hideEl(el);
// 			//}

// 			stages.cleanup();

// 		}, duration);
// 	});

// };

function exit2(el, options) {

	let _show = (typeof options === 'object' ? options.show : options);
	let _onTransitionEnd = (typeof options === 'object' && typeof options.onTransitionEnd === 'function' ? options.onTransitionEnd : null);

	let stages = createStagesObj(el, _show);

	stages.start();
	stages.during();

	requestAnimationFrame(() => {

		let duration = getDuration(el);
		//debugger;
		//console.log(`[el: ${el.id}]   exit: requestAnimationFrame 0 @ ${Date.now()}`)
		//console.log(`  duration: ${duration}`)

		stages.end(); // Assign current transition to el in case we need to force it.

		setTimeout(() => {

			//debugger;
			//console.log(`[el: ${el.id}]   exit: setTimeout @ ${Date.now()}`)

			//if (map.get(el) === 'Leave') {
			hideEl(el);
			//}

			stages.cleanup();

			if (_onTransitionEnd) { _onTransitionEnd('leave') }

		}, duration);
	});

};

export {
	// enter,
	enter2,
	// exit,
	exit2
}
