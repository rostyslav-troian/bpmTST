Ext.onReady(main);

function main() {
	var viewPage = Terrasoft.viewPage;
	viewPage.tpl.append(Ext.getBody());
	var selectors = viewPage.selectors;
	for (propertyName in selectors) {
		if (!selectors.hasOwnProperty(propertyName)) {
			continue;
		}
		var selctor = selectors[propertyName];
		viewPage[propertyName] = Ext.get(Ext.DomQuery.selectNode(selctor));
	}
}