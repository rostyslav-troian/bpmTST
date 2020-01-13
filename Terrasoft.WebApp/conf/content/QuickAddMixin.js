Terrasoft.configuration.Structures["QuickAddMixin"] = {innerHierarchyStack: ["QuickAddMixin"]};
define("QuickAddMixin", ["QuickAddMixinResources"], function(resources) {

	Ext.define("Terrasoft.configuration.mixins.QuickAddMixin", {
		alternateClassName: "Terrasoft.QuickAddMixin",

		quickAddMixinMessages: {
			/**
			 * @message InitQuickAddMenuItems
			 * ######## ######## ####### #### ###### ######## ########## ##########.
			 */
			"InitQuickAddMenuItems": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * @message OnQuickAddRecord
			 * ######## # ####### ###### #### ###### ######## ########## ########## ## #######.
			 */
			"OnQuickAddRecord": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},

		/**
		 * ######## ####### ########### #### ##########.
		 * @return {Boolean}
		 */
		getAddButtonMenuVisible: function() {
			return false;
		},

		sendSaveCardModuleResponse: Terrasoft.emptyFn,

		/**
		 * ######## ####### ########### #### ######## ########## ###########.
		 * @return {Boolean}
		 */
		getQuickAddButtonVisible: function() {
			var collection = this.get("QuickAddMenuItems");
			return (!this.Ext.isEmpty(collection) && !collection.isEmpty());
		},

		/**
		 * ######### ####### ###### # ######## ####### ######## ########## ######.
		 * @protected
		 * @param {Object} typeColumnValue ######## ####### #### ########.
		 */
		onQuickAddRecord: function(typeColumnValue) {
			var args = {
				flag: "QuickAdd",
				typeColumnValue: typeColumnValue,
				isSilent: true,
				messageTags: [this.sandbox.id],
				callback: this.openQuickActivityPage
			};
			this.save(args);
		},

		/**
		 * ######### ######## ##########.
		 * @param {Object} response ##### #######.
		 * @param {Object} config ############.
		 */
		openQuickActivityPage: function(response, config) {
			var typeColumnValue = config.typeColumnValue;
			var editPages = this.get("QuickEditPages");
			if (editPages.contains(typeColumnValue)) {
				var editPage = editPages.get(typeColumnValue);
				config.schemaName = editPage.get("SchemaName");
			} else {
				return;
			}
			var openCardConfig = {
				schemaName: config.schemaName,
				operation: Terrasoft.ConfigurationEnums.CardOperation.ADD,
				moduleId: this.sandbox.id + "_chain" + this.get("Id") + "quickAdd",
				defaultValues: this.defQuickAddActivityValuePairs(config),
				renderTo: "centerPanel"
			};
			this.Terrasoft.chain(
				function(next) {
					this.getEntityConnectionValues(openCardConfig, next);
				},
				function(next) {
					this.setAdditionalDefValues(openCardConfig, next);
				},
				function(next) {
					var args = {
						success: true,
						isInChain: true
					};
					this.sendSaveCardModuleResponse(args);
					next.call(this);
				},
				function() {
					this.openCardInChain(openCardConfig);
				},
				this
			);
		},

		/**
		 * ######### ######## ### ########### ########## ## ######### ###### #####.
		 * @protected
		 * @param {Object} openCardConfig ############ ### ######## ########.
		 * @param {Function} next ####### ######### ######.
		 */
		getEntityConnectionValues: function(openCardConfig, next) {
			var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: "EntityConnection"
			});
			esq.addColumn("ColumnUId");
			esq.filters.addItem(esq.createColumnFilterWithParameter(
				this.Terrasoft.ComparisonType.EQUAL, "SysEntitySchemaUId", this.entitySchema.uId));
			esq.getEntityCollection(function(result) {
				if (result.success) {
					var entities = result.collection;
					this.Terrasoft.each(this.columns, function(column) {
						if (column.type === this.Terrasoft.ViewModelColumnType.ENTITY_COLUMN) {
							entities.each(function(item) {
								if (column.uId === item.get("ColumnUId")) {
									var entityValue = this.get(column.name);
									if (entityValue) {
										openCardConfig.defaultValues.push({
											name: column.name,
											value: entityValue.value
										});
									}
								}
							}, this);
						}
					}, this);
				}
				next();
			}, this);
		},

		/**
		 * ######### ############## ######### ######## ### ########### ##########.
		 * @virtual
		 * @param {Object} openCardConfig ############ ### ######## ########.
		 * @param {Function} next ####### ######### ######.
		 */
		setAdditionalDefValues: function(openCardConfig, next) {
			next();
		},

		/**
		 * ######## ###### ######## #######.
		 * @ovveridden
		 * @return {[String]} ###### ######## #######.
		 */
		getDefQuickAddColumnNames: function() {
			return ["DetailedResult", "Confirmed", "ShowInScheduler", "Recepient"];
		},

		/**
		 * ######### ######### ######## ### ########### ##########.
		 * @virtual
		 * @param {Object} config ############ ### ######## ########.
		 * @return {[Object]} ###### ########.
		 */
		defQuickAddActivityValuePairs: function(config) {
			var activity = this.getEntityStructure("Activity");
			var typeColumnValue = config.typeColumnValue;
			var valuePairs = [
				{
					name: activity.attribute,
					value: typeColumnValue
				}
			];
			var schema = this.entitySchemaName;
			var columns = this.getDefQuickAddColumnNames();
			this.Terrasoft.each(columns, function(columnSrc) {
				var columnDst = columnSrc;
				if (columnSrc === "DetailedResult") {
					columnDst = "Title";
				}
				if (schema === columnSrc) {
					columnSrc = "Id";
				}
				var column = this.get(columnSrc);
				if (column) {
					valuePairs.push({
						name: columnDst,
						value: column.value || column
					});
				}
			}, this);
			return valuePairs;
		},

		/**
		 * ############## ########## ###### ###### "######## ########## ##########".
		 * @protected
		 */
		initQuickAddMenuItems: function() {
			this.sandbox.registerMessages(this.quickAddMixinMessages);
			this.sandbox.subscribe("OnQuickAddRecord", this.onQuickAddRecord, this, [this.sandbox.id]);
			if (this.getAddButtonMenuVisible()) {
				var collection = Ext.create("Terrasoft.BaseViewModelCollection");
				var entityStructure = this.getEntityStructure("Activity");
				if (entityStructure) {
					Terrasoft.each(entityStructure.pages, function(editPage) {
						var typeUId = editPage.UId || Terrasoft.GUID_EMPTY;
						if (collection.contains(typeUId)) {
							var messageTemplate = resources.localizableStrings.DuplicateEditPageMessageTemplate;
							var message = this.Ext.String.format(messageTemplate, typeUId);
							this.log(message, this.Terrasoft.LogMessageType.WARNING);
							return;
						}
						collection.add(typeUId, Ext.create("Terrasoft.BaseViewModel", {
							values: {
								Id: typeUId,
								Caption: editPage.captionLcz,
								Click: {bindTo: "onQuickAddRecord"},
								Tag: typeUId,
								SchemaName: editPage.cardSchema
							}
						}));
					}, this);
				}
				this.set("QuickEditPages", collection);
				var inSection = this.sandbox.publish("InitQuickAddMenuItems", collection, [this.sandbox.id]);
				if (!inSection) {
					this.set("QuickAddMenuItems", collection);
				}
			}
		},

		/**
		 * Destroys event subscriptions.
		 */
		destroyQuickAddMenuItems: function() {
			var messages = this.Terrasoft.keys(this.quickAddMixinMessages);
			this.sandbox.unRegisterMessages(messages);
		}

	});

});


