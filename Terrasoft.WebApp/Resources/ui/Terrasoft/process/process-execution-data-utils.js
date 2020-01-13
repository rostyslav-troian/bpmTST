Ext.ns("Terrasoft.Core.Process");

/**
 * Process execution data item type.
 */
Terrasoft.Core.Process.ProcessExecutionDataItemType = {
	ElementExecutionData: 0,
	CompletionData: 1
};

/**
 * Provides helper methods to work with process execution data.
 */
Ext.define("Terrasoft.Core.Process.ExecutionDataUtils", {
	alternateClassName: "Terrasoft.ProcessExecutionDataUtils",
	singleton: true,
	_sessionStoragePrefix: "CompletedProcessElement.",
	_markElementAsCompleted: function(processElementUId) {
		window.sessionStorage.setItem(`${this._sessionStoragePrefix}${processElementUId}`, "1");
	},
	getIsElementCompleted: function(processElementUId) {
		return Boolean(window.sessionStorage.getItem(`${this._sessionStoragePrefix}${processElementUId}`));
	},
	getNextElementData: function(executionData, currentProcessUId, currentElementUId) {
		let isCurrentElementCompleted = false;
		let anotherProcessItems = [];
		let currentProcessItems = [];
		Terrasoft.each(executionData, function(item) {
			if (item.type === Terrasoft.Core.Process.ProcessExecutionDataItemType.CompletionData) {
				if (item.data.uId === currentElementUId) {
					isCurrentElementCompleted = true;
				}
				this._markElementAsCompleted(item.data.uId);
			} else if (!Ext.isDefined(item.type)) {
				let elementUIds = Object.keys(item).filter(key => item[key].procElUId === key);
				let items = elementUIds.map(key => item[key]);
				Terrasoft.each(items, function(innerItem) {
					let executionDataItem = {
						processId: item.processId,
						elementCaption: item.elementCaption,
						processCaption: item.processCaption
					};
					executionDataItem[innerItem.procElUId] = innerItem;
					if (innerItem.processId === currentProcessUId) {
						currentProcessItems.push(executionDataItem);
					} else {
						anotherProcessItems.push(executionDataItem);
					}
				}, this);
			}
		}, this);
		let currentProcessItem = currentProcessItems.pop() || null;
		const next = anotherProcessItems.pop() || currentProcessItem;
		return {
			nextPage: next,
			isCurrentElementCompleted: isCurrentElementCompleted,
			currentProcessPage: next === currentProcessItem ? null : currentProcessItem
		};
	}
});