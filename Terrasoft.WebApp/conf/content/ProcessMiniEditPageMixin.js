Terrasoft.configuration.Structures["ProcessMiniEditPageMixin"] = {innerHierarchyStack: ["ProcessMiniEditPageMixin"]};
define("ProcessMiniEditPageMixin", ["ProcessMiniEditPageModule"], function() {

	/**
	 * Implements work with minipage in process properties page.
	 */
	Ext.define("Terrasoft.configuration.mixins.ProcessMiniEditPageMixin", {
		alternateClassName: "Terrasoft.ProcessMiniEditPageMixin",

		// region Methods: Private

		/**
		 * @private
		 */
		_setActiveItemIdValue: function(id) {
			const activeItemIdPropertyName = this.getActiveItemId();
			var parentModule = this.get("ParentModule");
			if (!parentModule && !Terrasoft.isDebug) {
				return;
			}
			parentModule.set(activeItemIdPropertyName, id);
		},

		// endregion

		// region Methods: Protected

		/**
		 * Opens item edit page by item click.
		 * @protected
		 */
		onLoadMinEditPageClick: function() {
			var id = this.getKeyValue();
			var renderTo = this.getRenderTo(id);
			this.hideItemView(id);
			var maskId = Terrasoft.Mask.show({
				selector: "#" + renderTo,
				timeout: 100,
				clearMasks: true
			});
			var pageId = this.getProcessMiniEditPageId();
			this.subscribeProcessMiniEditPageMixinMessages();
			var pageSchemaName = this.getProcessMiniEditPageName();
			var config = {
				id: pageId,
				renderTo: renderTo,
				instanceConfig: {
					schemaName: pageSchemaName,
					maskId: maskId
				}
			};
			this.sandbox.loadModule("ProcessMiniEditPageModule", config);
			this.disableAddButton();
		},

		/**
		 * Subscribes messages.
		 * @protected
		 */
		subscribeProcessMiniEditPageMixinMessages: function() {
			var pageId = this.getProcessMiniEditPageId();
			var sandbox = this.sandbox;
			sandbox.subscribe("GetItemEditInfo", this.getItemEditInfo, this, [pageId]);
			sandbox.subscribe("SaveItemInfo", this.saveItemInfo, this, [pageId]);
			sandbox.subscribe("DiscardItemInfoChanges", this.discardItemInfoChanges, this, [pageId]);
		},

		/**
		 * Hides item view.
		 * @protected
		 * @param {String} [id] Identifier of item.
		 */
		hideItemView: function(id) {
			this.closeActiveEditPage();
			this.set("Visible", false);
			if (id) {
				this._setActiveItemIdValue(id);
			}
			var pageId = this.getProcessMiniEditPageId();
			this.sandbox.unloadModule(pageId);
		},

		/**
		 * Closes opened mini edit page.
		 * @protected
		 * @param {String} activeViewModelId Opened edit page view model Id.
		 */
		closeOpenedEditPage: function(activeViewModelId) {
			var activeViewModel = this.parentCollection.find(activeViewModelId);
			if (activeViewModel) {
				activeViewModel.set("Visible", true);
			}
		},

		/**
		 * Returns item.
		 * @protected
		 * @return {Object} Item.
		 */
		getItemEditInfo: function() {
			var columns = this.columns;
			var itemInfo = {};
			Terrasoft.each(columns, function(columnValue, columnName) {
				itemInfo[columnName] = this.get(columnName);
			}, this);
			itemInfo.ParentCollection = this.parentCollection;
			itemInfo.uId = this.get("uId");
			return itemInfo;
		},

		/**
		 * Discards item changes.
		 * @protected
		 */
		discardItemInfoChanges: function() {
			var pageId = this.getProcessMiniEditPageId();
			this.set("Visible", true);
			this._setActiveItemIdValue(null);
			if (this.get("IsNew")) {
				this.parentCollection.removeByKey(this.getKeyValue());
			}
			this.sandbox.unloadModule(pageId);
			this.enableAddButton();
		},

		/**
		 * Saves item.
		 * @protected
		 * @param {Object} itemInfo Item.
		 */
		saveItemInfo: function(itemInfo) {
			var pageId = this.getProcessMiniEditPageId();
			this.set("IsNew", false);
			var columns = this.columns;
			Terrasoft.each(columns, function(columnValue, columnName) {
				if (itemInfo.hasOwnProperty(columnName)) {
					this.set(columnName, itemInfo[columnName]);
				}
			}, this);
			this._setActiveItemIdValue(null);
			this.sandbox.unloadModule(pageId);
			this.set("Visible", true);
			this.enableAddButton();
		},

		/**
		 * Enables add button.
		 * @protected
		 */
		enableAddButton: function() {
			this.fireEvent("change", {
				propertyName: this.getAddButtonEnabledProperyName(),
				propertyValue: true
			});
		},

		/**
		 * Disables add button.
		 * @protected
		 */
		disableAddButton: function() {
			this.fireEvent("change", {
				propertyName: this.getAddButtonEnabledProperyName(),
				propertyValue: false
			});
		},

		/**
		 * Returns add button enabled property name.
		 * @protected
		 * @return {String} Enabled property name.
		 */
		getAddButtonEnabledProperyName: function() {
			return "IsAddButtonEnabled";
		},

		/**
		 * Returns mini edit page schema name.
		 * @protected
		 * @return {String} Schema name.
		 */
		getProcessMiniEditPageName: function() {
			return "BaseProcessMiniEditPage";
		},

		/**
		 * Returns name of active item identifier property.
		 * @protected
		 * @return {String} Id property value.
		 */
		getActiveItemId: function() {
			return "ActiveItemId";
		},

		/**
		 * Returns value of key property.
		 * @protected
		 * @return {String} key property value.
		 */
		getKeyValue: function() {
			return this.get("Id");
		},

		/**
		 * Returns page identifier.
		 * @protected
		 * @return {String} Page identifier.
		 */
		getProcessMiniEditPageId: function() {
			return this.sandbox.id + "itemedit";
		},

		/**
		 * Returns renderTo container identifier.
		 * @protected
		 * @param {String} id Item identifier.
		 */
		getRenderTo: function(id) {
			var renderTo = this.get("RenderTo");
			if (!renderTo) {
				renderTo = "item-edit-" + id + "-" + this.sandbox.id;
			}
			return renderTo;
		},

		/**
		 * Changes position of selected item in collection.
		 * @protected
		 */
		onMoveUpClick: function() {
			this.closeActiveEditPage();
			var parentCollection = this.parentCollection;
			var currentIndex = parentCollection.indexOf(this);
			parentCollection.removeByIndex(currentIndex);
			var newIndex = currentIndex - 1;
			parentCollection.add(this.get("Id"), this, newIndex);
		},

		/**
		 * Changes position of selected item in collection.
		 * @protected
		 */
		onMoveDownClick: function() {
			this.closeActiveEditPage();
			var parentCollection = this.parentCollection;
			var currentIndex = parentCollection.indexOf(this);
			parentCollection.removeByIndex(currentIndex);
			var newIndex = currentIndex + 1;
			parentCollection.add(this.get("Id"), this, newIndex);
		},

		/**
		 * Deletes selected item from parent collection.
		 * @protected
		 * @param {String} tag Tag of menu item.
		 */
		onItemDeleteClick: function(tag) {
			this.closeActiveEditPage();
			this.parentCollection.removeByKey(tag);
		},

		/**
		 * Prepares availability for tools button menu items.
		 */
		prepareToolsButtonMenu: function() {
			var collection = this.parentCollection;
			var index = collection.indexOf(this);
			this.set("MoveUpEnabled", index > 0);
			this.set("MoveDownEnabled", index < collection.getCount() - 1);
		},

		/**
		 * Closes active opened edit page.
		 * @protected
		 */
		closeActiveEditPage: function() {
			var parentModule = this.get("ParentModule");
			if (!parentModule && !Terrasoft.isDebug) {
				return;
			}
			const activeItemIdPropertyName = this.getActiveItemId();
			const openedItemId = parentModule.get(activeItemIdPropertyName);
			this.closeOpenedEditPage(openedItemId);
			this.enableAddButton();
		}

		// endregion

	});
});


