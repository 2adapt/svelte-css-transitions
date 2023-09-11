let getDuration = function getDuration (el) {

	// Note: Safari's transitionDuration property will list out comma separated transition durations
	// for every single transition property. Let's grab the first one and call it a day.
	
	let style = getComputedStyle(el);
	let duration = Number(style.transitionDuration.replace(/,.*/, '').replace('s', ''));

	if (duration === 0) {
		duration = Number(style.animationDuration.replace('s', ''));
	}
	
	return duration * 1000;
}

function convertClassStringToArray(classList = '')	{
	
	if(classList == null) { 
		classList = '' 
	}

	return classList.split(' ').filter(Boolean);
}

function showEl(el) {

	//console.log(`[el: ${el.id}]   showEl 0 @ ${Date.now()}`)
	
	if (el.style.length === 1 && el.style.display === 'none') {
		el.removeAttribute('style');
	} 
	else {
		el.style.removeProperty('display');
	}
}

function hideEl(el) {

	//console.log(`[el: ${el.id}]   hideEl 0 @ ${Date.now()}`)
	
	el.style.display = 'none';
}

function createStagesObj (el, show) {

	let { dataset } = el;

	// this function is executed when the show variable changes; so if the current value
	// is true, it means it has changed from false to true, that the direction is 'Enter'

	let direction = show ? 'Enter' : 'Leave';
	let classesDuring   = convertClassStringToArray(dataset[`transition${direction}`]);
	let classesStart    = convertClassStringToArray(dataset[`transition${direction}Start`]);
	let classesEnd      = convertClassStringToArray(dataset[`transition${direction}End`]);
	let classesOriginal = convertClassStringToArray(el.getAttribute('class'));
	//map.set(el, direction);

	////debugger;

	//let classesPrepare  = convertClassStringToArray(dataset[`transition${direction}Prepare`]);
	// TO BE REMOVED: everything related to "prepare"
	if (dataset[`transition${direction}Prepare`]) { debugger }

	//console.log(`[el: ${el.id}] createStagesObj @ ${Date.now()}`)
	//console.log(`  classesOriginal: ${classesOriginal}`)

	//const originalClasses = el.__x_original_classes || [];
	let stages = {
		start: function start() {
			//console.log(`[el: ${el.id}]   stages.start @ ${Date.now()}`)
			//console.log(`  add(${classesStart})`)
			/////console.log(`  remove(${classesPrepare})`)
			
			///el.classList.remove(...classesPrepare);
			el.classList.add(...classesStart);
		},

		during: function during () {
			//console.log(`[el: ${el.id}]   stages.during @ ${Date.now()}`)
			//console.log(`  add(${classesDuring})`)

			el.classList.add(...classesDuring);
		},

		end: function end () {
			//console.log(`[el: ${el.id}]   stages.end @ ${Date.now()}`)
			//console.log(`  remove(${classesStart.filter(c => !classesOriginal.includes(c))})`)
			//console.log(`  add(${classesEnd})`)

			// don't remove classes that were present when the transition started

			el.classList.remove(...classesStart.filter(c => !classesOriginal.includes(c)));
			el.classList.add(...classesEnd);
		},

		cleanup: function cleanup () {

			if (!el.isConnected) { debugger; return }
			
			//console.log(`[el: ${el.id}]   stages.cleanup @ ${Date.now()}`)
			//console.log(`  remove(${classesDuring.filter(c => !classesOriginal.includes(c))}): `)
			//console.log(`  remove(${classesEnd.filter(c => !classesOriginal.includes(c))})`)

			// don't remove classes that were present when the transition started

			el.classList.remove(...classesDuring.filter(c => !classesOriginal.includes(c)));
			el.classList.remove(...classesEnd.filter(c => !classesOriginal.includes(c)));
		},

		// TO BE DELETED?
		executeEnterSequence() {

			stages.start();
			stages.during();

			requestAnimationFrame(() => {

				//console.log(`[el: ${el.id}]   executeEnterSequence: requestAnimationFrame 0 @ ${Date.now()}`)
				//debugger;
				showEl(el);	

				requestAnimationFrame(() => {

					let duration = getDuration(el);
					//debugger;
					//console.log(`[el: ${el.id}]   executeEnterSequence: requestAnimationFrame 1 @ ${Date.now()}`)
					//console.log(`  duration: ${duration}`)
					stages.end(); // Assign current transition to el in case we need to force it.

					setTimeout(() => {

						//debugger;
						//console.log(`[el: ${el.id}]   executeEnterSequence: setTimeout @ ${Date.now()}`)

						//if (el.isConnected && map.get(el) === 'Enter') {
						if (el.isConnected) {
							stages.cleanup();
						}
					}, duration);
				});
			});
		},

		// TO BE DELETED?
		executeLeaveSequence() {

			stages.start();
			stages.during();

			requestAnimationFrame(() => {

				let duration = getDuration(el);
				//debugger;
				//console.log(`[el: ${el.id}]   executeLeaveSequence: requestAnimationFrame 0 @ ${Date.now()}`)
				//console.log(`  duration: ${duration}`)

				stages.end(); // Assign current transition to el in case we need to force it.

				setTimeout(() => {

					//debugger;
					//console.log(`[el: ${el.id}]   executeLeaveSequence: setTimeout @ ${Date.now()}`)

					//if (map.get(el) === 'Leave') {
					hideEl(el);
					//}

					if (el.isConnected) {
						stages.cleanup();
					}
				}, duration);
			});

		}
	};
	
	return stages;
}

export { 
	getDuration,
	convertClassStringToArray,
	showEl,
	hideEl,
	createStagesObj
}
