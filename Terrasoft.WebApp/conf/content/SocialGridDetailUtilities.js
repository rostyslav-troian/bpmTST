Terrasoft.configuration.Structures["SocialGridDetailUtilities"] = {innerHierarchyStack: ["SocialGridDetailUtilities"]};
define("SocialGridDetailUtilities", [], function() {
	Ext.define("Terrasoft.configuration.mixins.SocialGridDetailUtilities", {
		alternateClassName: "Terrasoft.SocialGridDetailUtilities",

		/**
		 * ############## ######### ######### ###### ########## ## ###. #####.
		 * @private
		 */
		initSocialDetail: function() {
			this.set("CanAdd", false);
		},

		/**
		 * ########## ####### ######## ###### ## ########## #####.
		 * @protected
		 * @param {Object} socialNetworkData ###### ## ########## #####.
		 */
		onSocialNetworkDataLoaded: function(socialNetworkData) {
			this.createSocialEntityDataRows({
				socialNetworkData: socialNetworkData,
				callback: this.addSocialEntityDataRows,
				scope: this
			});
		},

		/**
		 * ######### # ###### ###### ###### ########### ###### ## ###. ####.
		 * @private
		 * @param {Object} socialEntityDataRows ######### ######## ###### ## ###. #### ###
		 * ########## ##### ####### ############## ####### ######.
		 */
		addSocialEntityDataRows: function(socialEntityDataRows) {
			if (!socialEntityDataRows) {
				return;
			}
			socialEntityDataRows.each(this.addSocialEntityDataRow, this);
		},

		/**
		 * ######### # ###### ###### ###### ########### ###### ## ###. ####.
		 * @private
		 * @param {Object} socialEntityDataRow ###### ###### ## ###. #### ###
		 * ########## ##### ###### ############## ####### ######.
		 */
		addSocialEntityDataRow: function(socialEntityDataRow) {
			var id = Terrasoft.generateGUID();
			var typeColumnValue = null;
			var callback = function(row) {
				this.setSocialEntityDataRow({
					row: row,
					socialEntityDataRow: socialEntityDataRow,
					callback: this.addSocialNewRowToCollection,
					scope: this
				});
			};
			this.createNewRow(id, typeColumnValue, callback);
		},

		/**
		 * ######### ############### #### ###### ############## ####### ###### ####### ## ###. ####.
		 * @private
		 * @param {Object} config.row ###### ############## ####### ######.
		 * @param {Object} config.socialEntityDataRow ###### ########## ###### ### ########## ###### ####### ######.
		 * @param {Object} config.callback ####### ######### ###### ### ########## ######### ########### ###### #######.
		 * @param {Object} config.scope ######## ########## ####### ######### ######.
		 */
		setSocialEntityDataRow: function(config) {
			var row = config.row;
			var socialEntityDataRow = config.socialEntityDataRow;
			var columns = this.entitySchema.columns;
			this.Terrasoft.each(columns, function(column, columnName) {
				if (!this.Ext.isEmpty(socialEntityDataRow[columnName])) {
					row.set(columnName, socialEntityDataRow[columnName]);
				}
			}, this);
			var callback = config.callback;
			if (Ext.isFunction(callback)) {
				callback.call(config.scope || this, row);
			}
		},

		/**
		 * ######### ##### ############# ###### # #########,
		 * ## ## ############# ## ### ###### # ## ###### ######## #######.
		 * @inheritdoc Terrasoft.ConfigurationGridUtilities#addNewRowToCollection
		 * @overridden
		 */
		addSocialNewRowToCollection: function(newRow) {
			var id = newRow.get("Id");
			var collection = this.Ext.create("Terrasoft.BaseViewModelCollection");
			collection.add(id, newRow);
			this.initIsGridEmpty(collection);
			this.addItemsToGridData(collection, {
				mode: "bottom"
			});
		},

		/**
		 * ########## ######### ######## ###### ## ###. ##### ### ########## ####### # ###### ######.
		 * @protected
		 * @virtual
		 * @param {Object} config.socialNetworkData ###### ## ########## #####.
		 * @param {Object} config.callback ####### ######### ######.
		 * @param {Object} config.scope ######## ########## ####### ######### ######.
		 */
		createSocialEntityDataRows: Terrasoft.emptyFn,

		/**
		 * ########## ####### "##### ########## ######".
		 * #### ########## ###### #######, ############# ######### ###### ######### # ######## #########.
		 * #### ########## ###### ## #######, ######### ########## ##### # ######### # ############ #########.
		 * @protected
		 * @param {Object} response ######## ##### # ########### ##########.
		 */
		onSaved: function(response) {
			var message = response.ResponseStatus && response.ResponseStatus.Message;
			if (response.success && !message) {
				var collection = this.get("Collection");
				collection.each(function(item) {
					item.isNew = false;
					item.changedValues = null;
				}, this);
				this.publishSaveResponse(response);
			} else {
				this.publishSaveResponse({
					success: false,
					message: message
				});
			}
		},

		/**
		 * ######### ######### ######. ########### ### ####### ## ###### ######### ########, ####### ########
		 * ######.
		 * @protected
		 * @return {Boolean} True #### ########## ###### #######, ### ### ######### ### ##########.
		 */
		save: function() {
			var queries = this.getChangeItemsQueries();
			if (this.Ext.isEmpty(queries)) {
				this.publishSaveResponse({success: true});
				return true;
			}
			var batchQuery = this.Ext.create("Terrasoft.BatchQuery");
			this.Terrasoft.each(queries, function(query) {
				batchQuery.add(query);
			}, this);
			batchQuery.execute(this.onSaved, this);
			return true;
		},

		/**
		 * ######### ###### ######## ## #########/##########/######## ####### #######.
		 * @protected
		 * @return {Array} ###### ######## ## #########/##########/######## ####### #######.
		 */
		getChangeItemsQueries: function() {
			var queries = [];
			var selectedItems = this.getSelectedItems();
			var collection = this.get("Collection");
			collection.each(function(item) {
				var itemId = item.get(item.primaryColumnName);
				var selected = this.Terrasoft.contains(selectedItems, itemId);
				if (selected) {
					if (item.isChanged() && item.validate()) {
						queries.push(item.getSaveQuery());
					}
				} else {
					if (!item.isNew) {
						var deleteQuery = item.getDeleteQuery();
						deleteQuery.enablePrimaryColumnFilter(itemId);
						queries.push(deleteQuery);
					}
				}
			}, this);
			return queries;
		},

		/**
		 * ######### ######### # ###, ### ###### #########.
		 * @protected
		 * @param {Object} config ######### #########.
		 */
		publishSaveResponse: function(config) {
			this.sandbox.publish("DetailSaved", config, [this.sandbox.id]);
		},

		/**
		 * ######### ######### ######.
		 * @protected
		 * @virtual
		 * @return {Boolean} #### ###### ###### ######### ########## true.
		 */
		validateDetail: function() {
			var invalidItems = this.getInvalidItems();
			var resultObject = {
				success: (invalidItems.length === 0)
			};
			if (!resultObject.success) {
				resultObject.message = this.get("Resources.Strings.InvalidAnniversaryMessage");
			}
			this.sandbox.publish("DetailValidated", resultObject, [this.sandbox.id]);
			return true;
		},

		/**
		 * ########## ###### #########, ####### ## ###### #########.
		 * @protected
		 * @return {Array} ###### #########, ####### ## ###### #########.
		 */
		getInvalidItems: function() {
			var collection = this.get("Collection");
			var invalidItems = [];
			var selectedItems = this.getSelectedItems();
			var validationResult;
			collection.each(function(item) {
				var itemId = item.get(item.primaryColumnName);
				var selected = this.Terrasoft.contains(selectedItems, itemId);
				if (!selected) {
					return;
				}
				validationResult = this.getItemValidationResult(item);
				if (!validationResult.success) {
					invalidItems.push(validationResult);
					return false;
				}
			}, this);
			return invalidItems;
		},

		/**
		 * ########## ######### ######### ########.
		 * @private
		 * @param {Terrasoft.BaseCommunicationViewModel} item ########### #######.
		 * @return {Object} ######### ######### ########.
		 */
		getItemValidationResult: function(item) {
			var validationResult = {
				success: true
			};
			if (item.isChanged() && !item.validate()) {
				var attributes = item.validationInfo.attributes;
				this.Terrasoft.each(attributes, function(attribute, attributeName) {
					if (!attribute.isValid) {
						var invalidColumn = item.columns[attributeName];
						validationResult = {
							success: false,
							invalidColumn: invalidColumn,
							item: item
						};
						return false;
					}
				}, this);
			}
			return validationResult;
		},

		/**
		 * ######## ###### # ####### # ###### ############## ######.
		 * @protected
		 * @param {Terrasoft.Collection} items ######### #######.
		 */
		selectRows: function(items) {
			var selectedRows = [].concat(this.getSelectedItems() || []);
			items.each(function(item) {
				var id = item.get(item.primaryColumnName);
				selectedRows.push(id);
			}, this);
			this.set("SelectedRows", selectedRows);
		}
	});
});


