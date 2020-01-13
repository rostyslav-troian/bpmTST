(function(global) {
	global.click = element => {
		if (element instanceof Ext.dom.AbstractElement) {
			element = element.dom;
		}
		element.dispatchEvent(new Event("click"));
	};
	global.elementIsVisible = function(element) {
		if (element instanceof Ext.dom.AbstractElement) {
			element = element.dom;
		}
		return element && element.offsetWidth > 0 && element.offsetHeight > 0;
	};
	global.elementIsNotVisible = function(element) {
		return !global.elementIsVisible(element);
	};
	global.hasCls = function(element, className) {
		if (element instanceof Ext.dom.AbstractElement) {
			element = element.dom;
		}
		return element && element.classList.contains(className);
	};
	global.type = function(element, type, callback) {
		if (element instanceof Ext.dom.AbstractElement) {
			element = element.dom;
		}
		const commands = Array.from(type.matchAll(/\[[^\]]+\]/g));
		let newValue = element.value;
		const executeCommand = (command) => {
			switch (command[0].toUpperCase()) {
				case '[ENTER]': {
					if (element.value !== newValue) {
						element.value = newValue;
					}
					element.dispatchEvent(
						new KeyboardEvent('keydown', {
							code: 'Enter',
							key: 'Enter',
							keyCode: 13,
						})
					);
					break;
				}
				default: 
					throw new Terrasoft.InvalidOperationException(`Typing command ${command[0]} has not supported yet`)
			}
		}
		for (let i = 0; i < type.length; i++) {
			if (commands.some(x => x.index === i)) {
				const command = commands.find(x => x.index === i);
				executeCommand(command)
				i += command[0].length - 1;
			} else {
				for(const event of ["keydown", "keypress", "keyup"]) {
					element.dispatchEvent(
						new KeyboardEvent(event, {key: type[i]})
					);
				}
				newValue += type[i];
			}
		}
		Ext.callback(callback);
	};
})(this);
