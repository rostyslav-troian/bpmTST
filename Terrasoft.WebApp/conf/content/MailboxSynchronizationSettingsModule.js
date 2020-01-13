Terrasoft.configuration.Structures["MailboxSynchronizationSettingsModule"] = {innerHierarchyStack: ["MailboxSynchronizationSettingsModule"]};
define("MailboxSynchronizationSettingsModule", ["sandbox", "ext-base", "terrasoft",
		"MailboxSynchronizationSettingsModuleResources", "MailboxSyncSettingsViewModel"],
	function(sandbox, Ext, Terrasoft, resources) {
		var viewModel = null;
		var viewConfig;

		/**
		 * Factory for mailbox syncronization settings view.
		 * @protected
		 * @return {Terrasoft.Container} Instance of MailBoxSyncSettings View
		 */
		function getView() {
			if (!viewConfig) {
				viewConfig = {
					id: "main",
					markerValue: resources.localizableStrings.WindowCaptionEx,
					selectors: {
						wrapEl: "#main"
					},
					items: [
						{
							className: "Terrasoft.Container",
							id: "topButtons",
							selectors: {
								wrapEl: "#topButtons"
							},
							classes: {
								wrapClassName: ["container-spacing"]
							},
							items: [
								{
									className: "Terrasoft.Button",
									style: Terrasoft.controls.ButtonEnums.style.GREEN,
									caption: resources.localizableStrings.AddButtonCaptionEx,
									click: {
										bindTo: "onAddButtonClick"
									}
								}
							]
						},
						{
							className: "Terrasoft.Container",
							id: "consumerSecretEdit",
							selectors: {
								wrapEl: "#consumerSecretEdit"
							},
							classes: {
								wrapClassName: ["container-spacing"]
							},
							items: [
								{
									className: "Terrasoft.Grid",
									type: "listed",
									primaryColumnName: "Id",
									primaryDisplayColumnName: "UserName",
									activeRow: {
										bindTo: "activeRowId"
									},
									columnsConfig: [
										{
											cols: 8,
											key: [
												{
													name: {
														bindTo: "UserName"
													},
													type: "title"
												}
											]
										},
										{
											cols: 8,
											key: [
												{
													name: {
														bindTo: "Type"
													}
												}
											]
										},
										{
											cols: 8,
											key: [
												{
													name: {
														bindTo: "MailBoxOwner"
													}
												}
											]
										}
									],
									captionsConfig: [
										{
											cols: 8,
											name: resources.localizableStrings.UserNameGridCaption
										},
										{
											cols: 8,
											name: resources.localizableStrings.TypeGridCaption
										},
										{
											cols: 8,
											name: resources.localizableStrings.MailBoxOwnerCaption
										}
									],
									collection: {
										bindTo: "mailboxGridData"
									},
									activeRowAction: {
										bindTo: "onActiveRowSelect"
									},
									activeRowActions: [
										{
											className: "Terrasoft.Button",
											style: Terrasoft.controls.ButtonEnums.style.BLUE,
											caption: resources.localizableStrings.EditButtonCaptionEx,
											markerValue: resources.localizableStrings.EditButtonCaptionEx,
											tag: "Edit",
											visible: {
												bindTo: "isSchemaCanEditRight"
											}
										},
										{
											className: "Terrasoft.Button",
											style: Terrasoft.controls.ButtonEnums.style.GREY,
											caption: resources.localizableStrings.DeleteButtonCaptionEx,
											markerValue: resources.localizableStrings.DeleteButtonCaptionEx,
											tag: "Delete",
											visible: {
												"bindTo": "isSchemaCanDeleteRight"
											}
										},
										{
											className: "Terrasoft.Button",
											style: Terrasoft.controls.ButtonEnums.style.GREY,
											caption: resources.localizableStrings.EditRightsButtonCaption,
											markerValue: resources.localizableStrings.EditRightsButtonCaption,
											tag: "EditRights"
										}
									],
									watchedRowInViewport: {
										bindTo: "loadNext"
									}
								}
							]
						}
					]
				};
			}
			return Ext.create("Terrasoft.Container", Terrasoft.deepClone(viewConfig));
		}

		/**
		 * Factory for mailbox syncronization settings view model.
		 * @protected
		 * @return {Terrasoft.MailboxSyncSettingsViewModel} Instance of MailBoxSyncSettings ViewModel
		 */
		function getViewModel() {
			var viewModelConfig = {
				values: {
					activeRowId: null,
					mailboxGridData: Ext.create("Terrasoft.BaseViewModelCollection")
				},
				sandbox: sandbox,
				Terrasoft: Terrasoft,
				Ext: Ext
			};
			return Ext.create("Terrasoft.MailboxSyncSettingsViewModel", viewModelConfig);
		}

		/**
		 * Replaces the last element in the chain of states, if the module identifier differs from the current.
		 * @protected
		 */
		function initHistoryState() {
			var state = sandbox.publish("GetHistoryState");
			var currentHash = state.hash;
			var currentState = state.state || {};
			if (currentState.moduleId === sandbox.id) {
				return;
			}
			var newState = Terrasoft.deepClone(currentState);
			newState.moduleId = sandbox.id;
			sandbox.publish("ReplaceHistoryState", {
				stateObj: newState,
				pageTitle: null,
				hash: currentHash.historyState,
				silent: true
			});
		}

		/**
		 * Registers module messages.
		 * @protected
		 */
		function registerMessages() {
			var messages = {
				"GetRecordInfo": {
					"mode": Terrasoft.MessageMode.PTP,
					"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				"AddMailBoxEvent": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				"MultiDeleteStart": {
					"mode": Terrasoft.MessageMode.BROADCAST,
					"direction": Terrasoft.MessageDirectionType.PUBLISH
				},
				"MultiDeleteFinished": {
					"mode": Terrasoft.MessageMode.BROADCAST,
					"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			};
			sandbox.registerMessages(messages);
		}

		/**
		 * If flag openAddMailboxSyncSettings is setted to true, opens mailbox adding module.
		 * @private
		 */
		function openAddMailboxSyncSettingsIfNeed() {
			var state = sandbox.publish("GetHistoryState");
			if (state.state.openAddMailboxSyncSettings === true) {
				sandbox.publish("ReplaceHistoryState", {
					hash: state.hash.historyState
				});
				viewModel.methods.openAddMailboxSyncSettings();
			}
		}

		/**
		 * Initializes module
		 * @param {Function} [callback] Callback function.
		 * @param {Object} [scope] Callback scope.
		 * @protected
		 */
		function init(callback, scope) {
			registerMessages();
			initHistoryState();
			viewModel = getViewModel();
			viewModel.init(callback, scope);
		}

		function render(renderTo) {
			sandbox.publish("ChangeHeaderCaption", {
				caption: resources.localizableStrings.WindowCaptionEx,
				dataViews: new Terrasoft.Collection()
			});
			sandbox.subscribe("NeedHeaderCaption", function() {
				sandbox.publish("InitDataViews", {caption: resources.localizableStrings.WindowCaptionEx});
			}, this);
			var genView = getView();
			genView.bind(viewModel);
			genView.render(renderTo);
			openAddMailboxSyncSettingsIfNeed();
		}

		return {
			init: init,
			render: render
		};
	});


