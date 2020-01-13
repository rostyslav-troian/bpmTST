/**
 */
Ext.define("Terrasoft.controls.FilterEdit.Filter.Input", {

	alternateClassName: "Terrasoft.FilterEdit.Filter.Input",

	filter: null,

	instance: null,

	type: null,

	renderTo: null,

	value: null,

	input: null,

	applyButton: null,

	applyButtonSrc: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZS" +
		"BJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaU" +
		"h6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC" +
		"1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm" +
		"9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly" +
		"9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2" +
		"VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZD" +
		"pFMUU3Q0JEREI2QThFMTExOEY5MzgxMkQ3RTk0QTU5QiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5MkVCNTRDQTdDRDAxMUUyOTRGRk" +
		"I4NEVGNkEzNkIxNyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5MkVCNTRDOTdDRDAxMUUyOTRGRkI4NEVGNkEzNkIxNyIgeG1wOkNyZW" +
		"F0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bX" +
		"AuaWlkOjA5NkMxNjlGNDM3QkUyMTFCNjM4Q0NBQzEzQTU4Mzg5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkUxRTdDQkREQjZBOEUxMT" +
		"E4RjkzODEyRDdFOTRBNTlCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj" +
		"8+GsX69wAAAFlJREFUeNrEk0sKACAIBfX+h37RQijR/BTkUpxZ6JMB0E3xT8EEuSsQqCVYgbJgg/UOIM0sbAnIkZiwJ9BDLmydUQ8fYS8H1l" +
		"a5GiRk4CiJ0VX+/8IbwRBgANeePuFy2+PsAAAAAElFTkSuQmCC",

	cancelButton: null,

	cancelButtonSrc: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZ" +
		"SBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2Voa" +
		"Uh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuM" +
		"C1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczL" +
		"m9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6L" +
		"y9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY" +
		"2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZ" +
		"DpFMUU3Q0JEREI2QThFMTExOEY5MzgxMkQ3RTk0QTU5QiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDRjM3QkI4QTdDRDAxMUUyOEJDM" +
		"jlGNUQ2QTJCMDRCNyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDRjM3QkI4OTdDRDAxMUUyOEJDMjlGNUQ2QTJCMDRCNyIgeG1wOkNyZ" +
		"WF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4b" +
		"XAuaWlkOjA5NkMxNjlGNDM3QkUyMTFCNjM4Q0NBQzEzQTU4Mzg5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkUxRTdDQkREQjZBOEUxM" +
		"TE4RjkzODEyRDdFOTRBNTlCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyI" +
		"j8+iOUPRQAAAGlJREFUeNrEU1EKQCEIS+/sKTy00UdQ4WbQg+dnbsNtJBHRXkbb43wr4O6lnxOjFaDabQJmJgg43yYGXpCJIPIYQTWeV2Rk2" +
		"sJKQGQqkFm4Flg9s2BpjZmFskaWNhJRFt7NTn7/jV2AAQAHiUpVoQIdeQAAAABJRU5ErkJggg==",

	buttonWidth: 34,

	constructor: function(config) {
		this.filter = config.filter;
		this.instance = this.filter.instance;
		this.type = (config.dataValueType) ? config.dataValueType : this.instance.dataValueType;
		this.value = config.value;
		this.renderTo = (config.renderTo) ? config.renderTo : this.filter.getRightEl();
		this.setValueCallBack = (config.setValue) ? config.setValue : this.filter.setValue;
		this.filter.filterEdit.on("clickOutside", this.onClickOutside, this);
		this.renderInput();
	},

	renderInput: function() {
		this.filter.beforeOpenInput = this.renderTo.getHTML();
		this.renderTo.setHTML("");
		var type = this.type;
		switch (type) {
			case Terrasoft.DataValueType.INTEGER:
				this.renderInteger();
				break;
			case Terrasoft.DataValueType.FLOAT:
			case Terrasoft.DataValueType.MONEY:
				this.renderFloat();
				break;
			case Terrasoft.DataValueType.GUID:
			case Terrasoft.DataValueType.TEXT:
			case Terrasoft.DataValueType.SHORT_TEXT:
			case Terrasoft.DataValueType.MEDIUM_TEXT:
			case Terrasoft.DataValueType.LONG_TEXT:
			case Terrasoft.DataValueType.MAXSIZE_TEXT:
				this.renderText();
				break;
			case Terrasoft.DataValueType.DATE_TIME:
			case Terrasoft.DataValueType.DATE:
				this.renderDate();
				break;
			case Terrasoft.DataValueType.TIME:
				this.renderTime();
				break;
			default:
				throw new Terrasoft.UnsupportedTypeException({
					message: Terrasoft.Resources.FilterEdit.DataValueTypeException
				});
		}
	},

	renderTime: function() {
		var self = this;
		this.input = Ext.create("Terrasoft.TimeEdit", {
			value: this.value,
			renderTo: this.renderTo,
			listeners: {
				enterkeypressed: function(event) {
					self.setValue(event.value);
				},
				keydown: function(element, event) {
					self.onKeyDown(element, event);
				}
			}
		});
		this.input.getEl().focus();
		this.renderApplyButton();
		this.renderCancelButton();
	},

	renderDate: function() {
		var self = this;
		this.input = Ext.create("Terrasoft.DateEdit", {
			value: this.value,
			renderTo: this.renderTo,
			listeners: {
				enterkeypressed: function(event) {
					self.setValue(event.value);
				},
				keydown: function(element, event) {
					self.onKeyDown(element, event);
				}
			}
		});
		this.input.getEl().focus();
		this.renderApplyButton();
		this.renderCancelButton();
	},

	renderText: function() {
		var self = this;
		this.input = Ext.create("Terrasoft.TextEdit", {
			value: this.value,
			renderTo: this.renderTo,
			listeners: {
				enterkeypressed: function(event) {
					self.setValue(event.value);
				},
				keydown: function(element, event) {
					self.onKeyDown(element, event);
				}
			}
		});
		this.input.getEl().focus();
		this.renderApplyButton();
		this.renderCancelButton();
	},

	renderInteger: function() {
		var self = this;
		this.input = Ext.create("Terrasoft.IntegerEdit", {
			value: this.value,
			renderTo: this.renderTo,
			listeners: {
				enterkeypressed: function(event) {
					self.setValue(event.value);
				},
				keydown: function(element, event) {
					self.onKeyDown(element, event);
				}
			}
		});
		this.input.getEl().focus();
		this.renderApplyButton();
		this.renderCancelButton();
	},

	renderFloat: function() {
		var self = this;
		this.input = Ext.create("Terrasoft.FloatEdit", {
			value: this.value,
			renderTo: this.renderTo,
			listeners: {
				enterkeypressed: function(event) {
					self.setValue(event.value);
				},
				keydown: function(element, event) {
					self.onKeyDown(element, event);
				}
			}
		});
		this.input.getEl().focus();
		this.renderApplyButton();
		this.renderCancelButton();
	},

	renderApplyButton: function() {
		var self = this;
		this.applyButton = Ext.create("Terrasoft.controls.Button", {
			width: this.buttonWidth,
			style: Terrasoft.controls.ButtonEnums.style.BLUE,
			renderTo: this.renderTo,
			iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
			imageConfig: {
				source: Terrasoft.ImageSources.URL,
				url: this.applyButtonSrc
			},
			listeners: {
				click: function() {
					self.setValue(self.input.value);
				}
			}
		});
	},

	renderCancelButton: function() {
		var self = this;
		this.cancelButton = Ext.create("Terrasoft.controls.Button", {
			width: this.buttonWidth,
			renderTo: this.renderTo,
			iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
			imageConfig: {
				source: Terrasoft.ImageSources.URL,
				url: this.cancelButtonSrc
			},
			listeners: {
				click: function() {
					self.close();
				}
			}
		});
	},

	onKeyDown: function(element, event) {
		var keyCode = event.keyCode;
		if (keyCode === 27) {
			this.close();
		}
	},

	onClickOutside: function() {
		this.setValue(this.input.value);
	},

	setValue: function(value) {
		this.setValueCallBack.call(this.filter, value);
		this.close();
		this.filter.filterEdit.beforeOpenInput = null;
	},

	close: function() {
		this.destroy();
		this.filter.filterEdit.beforeOpenInput = null;
		this.renderTo.setHTML(this.filter.beforeOpenInput);
		this.filter.macrosParameterDisplay(true);
		this.filter.muteRightExpressionEvent = false;
		this.filter.muteMacrosEvent = false;
		this.filter.muteMacrosParameterEvent = false;
	},

	destroy: function() {
		if (this.input) {
			this.input.destroy();
			this.input = null;
		}
		if (this.applyButton) {
			this.applyButton.destroy();
			this.applyButton = null;
		}
		this.filter.filterEdit.un("clickOutside", this.onClickOutside, this);
		if (this.cancelButton) {
			this.cancelButton.un("click", this.close, this);
			this.cancelButton.destroy();
			this.cancelButton = null;
		}
	}

});
