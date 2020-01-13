Terrasoft.controls.Component.prototype.getId = function() {
	return this.id;
};

// The (Ext.dom.Element) methods on selectors must be deleted (destroy)
Terrasoft.controls.Component.prototype.reRender = function(index, container) {
	if (!Ext.isEmpty(index) || !Ext.isEmpty(container)) {
		this.deprecatedReRender(index, container);
		return;
	}
	this.rendering = true;
	this.fireEvent("beforeRerender", this);
	var wrapEl = this.getWrapEl();
	if (Ext.isEmpty(wrapEl)) {
		this.ownerCt.reRender();
		return;
	}
	var parent = wrapEl.parent();
	this.removeElementsBySelectors();
	var html = this.generateHtml();
	var domNode = Ext.DomHelper.append(parent, html);
	this.wrapEl = wrapEl = Ext.get(domNode);
	this.fireEvent("afterrerender", this, wrapEl);
};