Terrasoft.controls.Button.prototype.init = function() {
	this.mixins.fileUpload.constructor.call(this);
	this.mixins.groupable.constructor.call(this);
	this.superclass.init.apply(this, arguments);
	this.addEvents(
		"click"
	);
	this.initMenu();
};