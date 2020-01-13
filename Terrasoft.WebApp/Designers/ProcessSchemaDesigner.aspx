<%@ Page Language="C#" Caption="@Terrasoft.WebApp,ProcessSchemaDesigner.Caption"
	CodeBehind="ProcessSchemaDesigner.aspx.cs" Inherits="Terrasoft.WebApp.Designers.ProcessSchemaDesigner" %>

<%@ Register TagPrefix="UC" TagName="ObjectInspectorUserControl" Src="~/Templates/UserControls/ObjectInspectorUserControl.ascx" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
	<title></title>
	<script type="text/javascript">
		
		function onLoad() {
			showLoadMask();
			prepareButtonEvents();
		}

		function prepareButtonEvents() {
			Ext.Button.prototype.onClick = function(e) {
				var menu = this.menu;
				if (menu) {
					if (this.enabled) {
						if (this.hasListener("click")) {
							this.fireEvent("click", this, e);
						} else if (menu.items) {
							var visibleItems = menu.getVisibleItems();
							if (visibleItems.length > 0) {
								this.showMenu(e);
							}
						}
					}
					if (this.handler) {
						this.handler.call(this.scope || this, this, e);
					}
				} else {
					if (e.button != 0) {
						return;
					}
					if (this.enabled) {
						if (this.processToggle(e)) {
							this.buttonEl.dom.focus();
							if (this.handler) {
								this.handler.call(this.scope || this, this, e);
							}
							if (this.closeResult) {
								var parentWindow = this.findParentWindow();
								if (parentWindow) {
									parentWindow.close(this.closeResult);
								}
							}
						}
					}
				}
			}
		}

		function showLoadMask() {
			var loadMaskLoadingMessage = Ext.StringList('WC.Common').getValue('LoadMask.Loading');
			this.body = Ext.getBody();
			this.body.mask(loadMaskLoadingMessage, 'x-mask-loading blue', true, false, true, null, true);
		}

		function hideLoadMask() {
			this.body.unmask();
		}

		function addElementOnClick() {
			var selectedNode = ProcessSchemaTree.getSelectionModel().selNodes[0];
			if (selectedNode) {
				var data = new Object();
				data.typeName = ProcessSchemaTree.getSelectionModel().selData[0].TypeName;
				DesignModeManager.addItems(selectedNode.id, Ext.encode(data), 0);
			}
		}

		function selectionModeOnClick() {
			sendMessage({
				message: "SetSelectionMode"
			});
		}

		function removeElementOnClick() {
			var selectedIds = getSelectedIds();
			DesignModeManager.removeItems(Ext.encode(selectedIds));
		}

		function onControlRemoveResponse(selectedIds) {
			var removedItems = Ext.decode(selectedIds);
			closeRemovedItemsTab(removedItems);
			sendMessage({
				message: "RemoveItems",
				itemsUId: selectedIds
			});
		}

		function onElementPropertyChangedResponse(elementId, elementType, jsonUIData) {
			elementId = elementId.replace(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/, '$1-$2-$3-$4-$5');
			SetElementProperties(elementId, elementType, jsonUIData);
		}

		function changeProcessSchemaTreeSelection(jsonStringData) {
			if (Ext.isEmpty(jsonStringData)) {
				return;
			}
			ProcessSchemaTree.selModel.clearSelections();
			var selectedItems = Ext.decode(jsonStringData);
			var ids = new Array();
			for (var item in selectedItems) {
				ids.push(selectedItems[item].Id);
			}
			ProcessSchemaTree.selectNodes(ids, true, true);
		}

		function getSelectedIds() {
			var selectedIds = new Array();
			var selNodes = ProcessSchemaTree.selModel.selNodes;
			var activeRow = SchemaDataSource.activeRow;
			if (selNodes.length == 0 && activeRow) {
				selectedIds.push(activeRow.getPrimaryColumnValue());
			}
			for (var i = 0; i < selNodes.length; i++) {
				selectedIds.push(selNodes[i].id);
			}
			return selectedIds;
		}

		function createJsonString(propertyName, propertyValue) {
			return "{\"" + propertyName + "\":" + propertyValue + "}";
		}

		function existPendingRequests() {
			var pendingRequests = DesignModeManager.pendingRequests;
			return pendingRequests && pendingRequests.length;
		}

		function saveButtonOnClick() {
			MessagePanel.clear();
			if (existPendingRequests()) {
				showLoadMask();
				var intervalId = setInterval(function () {
					if (!existPendingRequests()) {
						clearInterval(intervalId);
						hideLoadMask();
						Terrasoft.AjaxMethods.SaveSchema();
					}
				}, 0);
			} else {
				Terrasoft.AjaxMethods.SaveSchema();
			}
		}

		function copySchemaButtonOnClick() {
			Terrasoft.AjaxMethods.CopyAndSaveSchema();
		}

		function saveWithVerificationOnClick() {
			MessagePanel.clear();
			Terrasoft.AjaxMethods.SaveSchemaWithVerification();
		}

		function pluginDisposingEvent(sender, args) {
		}

		function onSchemaDataSourceActiveRowChanged(dataSource, primaryColumnValue) {
			var activeRow = dataSource.getRow(primaryColumnValue);
			if (activeRow) {
				var uid = activeRow.getColumnValue('UId');
				DesignModeManager.onItemSelect('', uid);
				if (!ProcessSchemaTree.selModel.selMap[primaryColumnValue]) {
					ProcessSchemaTree.selectNodeById(primaryColumnValue, true);
					ProcessSchemaTree.setActiveNodeById(primaryColumnValue);
				}
				if (SchemaItemsCombobox.store.totalLength == 0) {
					var queryEvent = {
						combo: SchemaItemsCombobox
					};
					onSchemaItemsComboboxBeforeQuery(queryEvent);
				}
				if (SchemaItemsCombobox.rendered === true) {
					SchemaItemsCombobox.setRawValue(activeRow.getColumnValue('Caption'));
				}
			}
		}

		function onPropertiesDataSourceLoaded(dataSource, rows, cfg) {
			PropertiesDataSource.setActiveRow(0);
		}

		function onPropertiesDataSourceStructureLoaded(dataSource) {
			if (DesignModeManager.isCurrentItemResponse) {
				var descriptor = DesignModeManager.getCurrentItemDescriptor();
				ObjectInspector.rebuild(descriptor);
			}
		}

		function onProcessSchemaTreeSelectionChange(columns) {
			var elementName = JSON.parse(columns).Name;
			SetFocusedElementByName(elementName);
		}

		function onSettingsDataSourceLoaded(dataSource, rows, cfg) {
			SettingsDataSource.setActiveRow(0);
		}

		function OnApplySettings() {
			DesignModeManager.onSettingChanged(Ext.encode(DesignModeManager.changedSettings));
		}

		function onComponentsSearchSpecialKey(el, e) {
			var key = e.getKey();
			var text = componentsSearch.getValue();
			var oneList = ProcsdComponentsMenuPanel.oneList;
			var restoreMenu;
			var buildOneList;
			var addCssClass;
			var removeCssClass;
			var filter;
			var showSearchToolButton;
			switch (key) {
				case e.ENTER:
					restoreMenu = Ext.isEmpty(text) ? (oneList ? true : false) : false;
					buildOneList = Ext.isEmpty(text) ? false : (oneList ? false : true);
					addCssClass = Ext.isEmpty(text) ? false : true;
					removeCssClass = Ext.isEmpty(text) ? true : false;
					filter = Ext.isEmpty(text) ? false : true;
					showSearchToolButton = Ext.isEmpty(text) ? false : true;
					break;
				case e.ESC:
					restoreMenu = oneList ? true : false;
					buildOneList = false;
					addCssClass = false;
					removeCssClass = oneList ? true : false;
					filter = false;
					showSearchToolButton = false;
					componentsSearch.setValue('');
					break;
				default:
					return;
			}
			if (restoreMenu) {
				ProcsdComponentsMenuPanel.removeFilter();
				if (ShowGroupsMenuItem.checked) {
					ProcsdComponentsMenuPanel.restoreMenu();
				}
			}
			if (buildOneList) {
				ProcsdComponentsMenuPanel.buildOneLevelMenu();
			}
			if (showSearchToolButton) {
				ToolButtonClearSearch.show();
			} else {
				ToolButtonClearSearch.hide();
			}
			if (addCssClass) {
				componentsSearch.getEl().addClass('x-qf-text');
			}
			if (removeCssClass) {
				componentsSearch.getEl().removeClass('x-qf-text');
			}
			if (filter) {
				ProcsdComponentsMenuPanel.setFilter(function (item) {
					if (item instanceof Ext.menu.Separator) {
						return false;
					}
					if (item.caption.toLowerCase().search(text.toLowerCase()) != -1 ||
						item.itemType.toLowerCase().search(text.toLowerCase()) != -1) {
						return true;
					}
					return false;
				});
			}
		}

		function onClearSearchValue(e) {
			componentsSearch.setValue('');
			ToolButtonClearSearch.hide();
			ProcsdComponentsMenuPanel.removeFilter();
			if (ShowGroupsMenuItem.checked) {
				ProcsdComponentsMenuPanel.restoreMenu();
			}
			componentsSearch.getEl().removeClass('x-qf-text');
		}

		function onSchemaItemsComboboxSelect(control, recordParameter, index) {
			var record = Ext.decode(recordParameter);
			var id = record.value;
			DesignModeManager.selectItem(null, id);
		}

		function onSchemaItemsComboboxBeforeQuery(queryEvent) {
			var control = queryEvent.combo;
			var itemList = getItemsListBySchemaDataSource(SchemaDataSource);
			control.store.setDefaultSort('text');
			control.loadData(itemList);
		}

		function getItemsListBySchemaDataSource(SchemaDataSource) {
			var controlsList = new Array();
			for (var i = 0; i < SchemaDataSource.rows.length; i++) {
				var record = SchemaDataSource.rows.items[i];
				var control = new Array();
				control.push(record.getColumnValue("UId"));
				control.push(record.getColumnValue("Caption"));
				controlsList.push(control);
			}
			return controlsList;
		}

		function GetScaleValue(inputText) {
			var regExp = new RegExp(/^(\d+[,.]?\d*)%?$/);
			var result = inputText.match(regExp);
			if (result) {
				return result[1].replace(',', '.');
			} else {
				return null;
			}
		}

		function rebuildControlsTree(isAdvanced) {
			ProcsdComponentsMenuPanel.rebuild(function (item) {
				if (item instanceof Ext.menu.Separator) {
					return true;
				}
				return isAdvanced ? item.visible : item.usageType == 'General';
			});
		}

		function hideComponentsGroups(menuItem) {
			CollapseGroups.setDisabled(!menuItem.checked);
			ExpandGroups.setDisabled(!menuItem.checked);
			if (componentsSearch.getValue() != '') {
				return;
			}
			if (menuItem.checked) {
				ProcsdComponentsMenuPanel.restoreMenu();
			} else {
				ProcsdComponentsMenuPanel.buildOneLevelMenu(false);
			}
		}

		function sortControlTreeByAlphabet() {
			ProcsdComponentsMenuPanel.sortItems('ASC', function (a, b) {
				return a.caption < b.caption ? -1 : 1;
			});
		}

		function sortControlTreeByPosition() {
			ProcsdComponentsMenuPanel.sortItems('ASC', function (a, b) {
				return a.sortPosition < b.sortPosition ? -1 : 1;
			});
		}

		function onObjectInspectorDesignModeUsageTypeChange(designModeUsageType) {
			DesignModeManager.setUsageType(designModeUsageType);
		}

		function actualizeSchemaItemsCombobox(value) {
			SchemaItemsCombobox.setRawValue(value);
		}

		function ProcessSchemaActivityOnElementEditComplete(elementId, parameterValuesKey, newCaption) {
			Terrasoft.AjaxMethods.ProcessSchemaActivityOnElementEditComplete(elementId, parameterValuesKey, newCaption);
		}

		function ProcessSchemaIntermediateCatchSignalOnElementEditComplete(elementId, newCaption) {
			Terrasoft.AjaxMethods.ProcessSchemaIntermediateCatchSignalOnElementEditComplete(elementId, newCaption);
		}

		function onProcessSchemaTreeDblClick() {
			var itemUId = ProcessSchemaTree.selModel.selNodes[0].id;
			addScriptEditor(itemUId);
		}

		function addScriptEditor(itemUId) {
			var primaryColumnName = SchemaDataSource.getPrimaryColumnName();
			var row = SchemaDataSource.findRow(primaryColumnName, itemUId);
			if (!row) {
				return;
			}
			var itemTypeName = row.getColumnValue('TypeName');
			if (itemTypeName != 'SchemaMethod' && itemTypeName != 'ProcessSchemaScriptTask' &&
				itemTypeName != 'ExecutionContextItem') {
				return;
			}
			var scriptEditTab = findScriptEditTab(itemUId);
			if (!scriptEditTab) {
				var displayColumnName = SchemaDataSource.structure.primaryDisplayColumnName || "";
				var itemCaption = row.getColumnValue(displayColumnName);
				scriptEditTab = new Terrasoft.ScriptEditTab({
					designModeManager: DesignModeManager,
					schemaDataSource: SchemaDataSource,
					caption: itemCaption
				});
				scriptEditTab.setEditingItem({
					itemUId: itemUId
				});
				EditTabPanel.addTab(scriptEditTab, EditTabPanel.items.length, true);
			} else {
				EditTabPanel.setActiveTab(scriptEditTab, true);
			}
		}

		function closeRemovedItemsTab(removedItems) {
			for (var itemName in removedItems) {
				var item = removedItems[itemName];
				var tab = findScriptEditTab(item.Id);
				if (tab) {
					tab.close(true);
				}
			}
		}

		function findScriptEditTab(itemUId) {
			var tabItems = EditTabPanel.items;
			for (var i = 1, tabLength = tabItems.length; i < tabLength; i++) {
				var tab = tabItems.itemAt(i);
				if (tab.itemUId == itemUId) {
					return tab;
				}
			}
			return null;
		}

		function onDesignerLoaded() {
			ProcessSchemaEdit.on("messagereceived", onMessageReceived);
			if (EditTabPanel.collapsed === true) {
				hideLoadMask();
				EditTabPanel.on("expand", onEditTabPanelExpand, this);
			}
		}

		function onEditTabPanelExpand() {
			showLoadMask();
			EditTabPanel.un("expand", onEditTabPanelExpand, this);
		}

		function onMessageReceived(event) {
			var request = event.request;
			if (request.schemaUId !== DesignModeManager.schemaUId) {
				return;
			}
			startRequest(request);
		}

		function executeRequest(request) {
			var message = request.message;
			switch (message) {
				case "GetMetaData":
					var schemaMetaData = DesignModeManager.schemaMetaData;
					sendMessage({
						message: "ReadMetaData",
						metaData: schemaMetaData.metaData,
						resources: schemaMetaData.resources
					});
					completeRequest();
					break;
				case "ElementDoubleClick":
					var itemUId = request.itemUId;
					addScriptEditor(itemUId);
					Terrasoft.AjaxMethods.ProcessSchemaEditOnElementDoubleClick("", itemUId);
					completeRequest();
					break;
				case "ElementAdded":
					Terrasoft.AjaxMethods.AddProcessSchemaElement(request.managerItemUId, request.jsonStringData);
					break;
				case "SelectingChanged":
					var itemUId = request.itemUId;
					if (DesignModeManager.schemaDataSource.rows.containsKey(itemUId)) {
						DesignModeManager.selectItem('', itemUId);
					}
					completeRequest();
					break;
				case "DiagramRemoveItems":
					DesignModeManager.removeItems(Ext.encode(request.itemUIds), request.silentRemoveMode);
					break;
				case "DiagramItemsPropertiesChanged":
					var propertiesData = request.propertiesData;
					var properties = [];
					for (var i = 0; i < propertiesData.length; i++) {
						var jsonStringData = Ext.encode(propertiesData[i]);
						properties.push(jsonStringData);
						var containerUId = propertiesData[i].ContainerUId;
						if (!Ext.isEmpty(containerUId)) {
							DesignModeManager.moveItem(request.itemUIds[i], containerUId);
						}
					}
					Terrasoft.AjaxMethods.ChangeElementsProperty(Ext.encode(request.itemUIds),
						Ext.encode(properties));
					break;
				case "Initialized":
					DesignModeManager.selectItem('', DesignModeManager.schemaUId);
					hideLoadMask();
					completeRequest();
					break;
			}			
		}

		function startRequest(request) {
			if (DesignModeManager.executingRequest) {
				DesignModeManager.pendingRequests = DesignModeManager.pendingRequests || [];
				DesignModeManager.pendingRequests.push(request);
			} else {
				DesignModeManager.executingRequest = request;
				executeRequest(request);
			}
		}

		function completeRequest() {
			var pendingRequests = DesignModeManager.pendingRequests;
			if (pendingRequests && pendingRequests.length) {
				var request = DesignModeManager.executingRequest = pendingRequests.shift();
				executeRequest(request);
			} else {
				DesignModeManager.executingRequest = null;
			}
		}

		function sendMessage(requestJson) {
			var diagramWindow = ProcessSchemaEdit.getWin();
			var request = Ext.encode(requestJson);
			diagramWindow.postMessage(request, window.location.origin);
		}

		function setExpectingAddElementState(tag) {
			sendMessage({
				message: "SetExpectingAddElementState",
				newElementManagerItemUId: tag
			});
		}

		function SetElementProperties(itemUId, itemType, propertiesData) {
			sendMessage({
				message: "SetProperties",
				itemUId: itemUId,
				propertiesData: propertiesData
			});
		}

		function SetElementCaption(itemUId, caption) {		
			var captionObject = {
				currentCultureName: 'currentCulture',
				values: [
					{
						name: Terrasoft.CultureInfo.name,
						caption: Terrasoft.CultureInfo.displayName,
						hasValue: true,
						value: caption
					}
				]
			};
			DesignModeManager.setPropertyValue(itemUId, "Caption", Ext.util.JSON.encode(captionObject));
		}

		function SetFocusedElementByName(itemName) {
			sendMessage({
				message: "SetFocusedElementByName",
				itemName: itemName
			});
		}
	</script>

</head>
<body onload="onLoad();">
	<form id="htmlForm" runat="server">
		<TS:ScriptManager ID="ScriptManager" runat="server"/>
		<UC:ObjectInspectorUserControl ID="PropertiesWindow" runat="server" />
		<TS:VirtualDataSource ID="SchemaDataSource" runat="server">
			<AjaxEvents>
				<ActiveRowChanged OnClientEvent="onSchemaDataSourceActiveRowChanged(dataSource, primaryColumnValue);" />
			</AjaxEvents>
		</TS:VirtualDataSource>
		<TS:VirtualDataSource ID="PropertiesDataSource" runat="server">
			<AjaxEvents>
				<Loaded OnClientEvent="onPropertiesDataSourceLoaded(dataSource,dataArray,request);" />
				<StructureLoaded OnClientEvent="onPropertiesDataSourceStructureLoaded(dataSource)" />
			</AjaxEvents>
		</TS:VirtualDataSource>
		<TS:VirtualDataSource ID="SettingsDataSource" runat="server">
			<AjaxEvents>
				<Loaded OnClientEvent="onSettingsDataSourceLoaded(dataSource,dataArray,request);" />
			</AjaxEvents>
		</TS:VirtualDataSource>
		<TS:ProcessSchemaDesignModeManager runat="server" ID="DesignModeManager" SchemaDataSourceId="SchemaDataSource"
			PropertyDataSourceId="PropertiesDataSource" SettingsDataSourceId="SettingsDataSource"
			OnSchemaChanged="OnSchemaChanged">
		</TS:ProcessSchemaDesignModeManager>
		<TS:Menu ID="ProcessSchemaTreeContextMenu" runat="server" ImageList="Terrasoft.WebApp">
			<Items>
				<TS:MenuItem ID="AddMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Add.Caption"
					Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:common-icon-add.png}"
					runat="server">
					<AjaxEvents>
						<Click OnClientEvent="addElementOnClick()" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuItem runat="server" ID="DeleteMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Delete.Caption"
					Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:common-icon-delete.png}">
					<AjaxEvents>
						<Click Before="return Ext.MessageBox.ajaxEventConfirm(this, Ext.StringList('WebApp.Designers').getValue('List.Warning'),Ext.StringList('WebApp.Designers').getValue('List.DeleteRecordConfirm'));"
							OnClientEvent="removeElementOnClick()" />
					</AjaxEvents>
				</TS:MenuItem>
			</Items>
			<AjaxEvents>
				<Prepare OnEvent="ProcessSchemaTreeContextMenuOnPrepare" />
			</AjaxEvents>
		</TS:Menu>
		<TS:ControlLayout ID="ControlLayout1" runat="server" Direction="Vertical" IsViewPort="true" Padding="5" HelpContextId="363" DontShowLoadMask="true">
			<TS:ControlLayout ID="ControlLayout2" runat="server" Width="100%" DisplayStyle="Topbar" Margins="0 0 4 0">
				<TS:Button ID="SaveButton" runat="server" Enabled="true"
					Image="{Source: ResourceManager, ResourceManagerName:Terrasoft.WebApp.BaseDesigner, ResourceItemName: commondesigner-save.png}">
					<AjaxEvents>
						<Click OnClientEvent="saveButtonOnClick()" Timeout="900000000" />
					</AjaxEvents>
					<Menu>
						<TS:MenuItem ID="MenuItem1" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Save.WithoutVerification"
							Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp.BaseDesigner, ResourceItemName:commondesigner-save.png}">
							<AjaxEvents>
								<Click OnClientEvent="saveButtonOnClick()" Timeout="900000000" />
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuItem ID="SaveWithVerificationMenuItem" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Save.WithVerification"
							Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp.BaseDesigner, ResourceItemName:commondesigner-savewithverification.png}">
							<AjaxEvents>
								<Click OnClientEvent="saveWithVerificationOnClick()" Timeout="900000000" />
							</AjaxEvents>
						</TS:MenuItem>
					</Menu>
				</TS:Button>
				<TS:Spacer ID="prsdSpacerAfterSaveButton" StripeVisible="true" runat="server" />
				<TS:Button ID="SelectionModeButton" runat="server" ImageAsSprite="false"
					Image="{Source: ResourceManager, ResourceManagerName: Terrasoft.WebApp, ResourceItemName: processschemadesigner-img-arrow-base.png}">
					<AjaxEvents>
						<Click OnClientEvent="selectionModeOnClick()" />
					</AjaxEvents>
				</TS:Button>
				<TS:Spacer ID="prsdSpacerAfterVerticalShiftButton" StripeVisible="true" runat="server" />
				<TS:Button runat="server" ID="HelpButton" ImageList="Terrasoft.WebApp" ImageAsSprite="false" CanFocus="false"
					Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:help.png}" Enabled="false" Hidden="true" >
					<AjaxEvents>
						<Click OnClientEvent="Terrasoft.HelpContext.showHelp(null)" />
					</AjaxEvents>
				</TS:Button>
				<TS:Spacer ID="prsdSpacerAfterExportButton" Size="100%" runat="server" />
				<TS:Button ID="ViewButton" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Additional.Caption">
					<Menu>
						<TS:MenuItem runat="server" ID="ShowBaseProcess" Caption="@Terrasoft.WebApp.ProcessSchemaDesigner,ShowBaseProcess.Caption">
							<AjaxEvents>
								<Click OnEvent="ShowBaseProcessOnClick" />
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuSeparator />
						<TS:MenuItem ID="MenuItem3" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,View.Source"
							ImageName="solutionexplorermodule-sourceview.png">
							<AjaxEvents>
								<Click OnEvent="ViewSourceButtonOnClick" />
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuItem ID="MenuItem4" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,View.MetaData"
							ImageName="solutionexplorermodule-sourceview.png">
							<AjaxEvents>
								<Click OnEvent="ViewMetadataButtonOnClick" />
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuSeparator runat="server" ID="BeforeCopySchemaSeparator"/>
						<TS:MenuItem ID="CopySchema" runat="server" Caption="@Terrasoft.WebApp.ProcessSchemaDesigner,CopySchemaButton.Caption">
							<AjaxEvents>
								<Click OnClientEvent="copySchemaButtonOnClick()" />
							</AjaxEvents>
						</TS:MenuItem>
					</Menu>
				</TS:Button>
				<TS:Button ID="PropertiesButton" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Settings.Caption" Hidden="true">
					<AjaxEvents>
						<Click OnEvent="PropertiesButtonOnClick" />
					</AjaxEvents>
				</TS:Button>
				<TS:Button runat="server" ID="PrsdHelpButton" ImageList="Terrasoft.WebApp" ImageAsSprite="true" CanFocus="false"
					Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:help.png}" Hidden="true" >
					<AjaxEvents>
						<Click OnClientEvent="Terrasoft.HelpContext.showHelp(null, 'PrsdHelpButton')" />
					</AjaxEvents>
				</TS:Button>
			</TS:ControlLayout>
			<TS:MessagePanel ID="MessagePanel" runat="server" Hidden="true" Width="100%" />
			<TS:ControlLayout ID="ProcsdMainLayout" runat="server" HasSplitter="true" Margins="0 0 5 0" Height="100%"
				Direction="Horizontal" Width="100%">
				<TS:TabPanel runat="server" ID="AddElementsPanel" Width="300px" Height="100%" HasSplitter="true"
					HasOptionsButton="false" CollapseMode="CurrentItem">
					<Tabs>
						<TS:Tab runat="server" ID="AddElementsTab"  Caption="@Terrasoft.WebApp,ProcessSchemaDesigner.Elements.Caption">
							<Body>
								<TS:ControlLayout ID="ControlLayout3" runat="server" Width="100%" FitHeightByContent="true"
									Direction="Horizontal" Edges="0 0 1 0" Margins="1 0 0 0" DisplayStyle="Topbar">
									<TS:TextEdit runat="server" ID="componentsSearch" Width="100%" EmptyText="@Terrasoft.UI.WebControls,SearchEmptyText.Caption">
										<Tools>
											<TS:ToolButton ID="ToolButtonClearSearch" runat="server"
												Image="{ResourceManagerName:Terrasoft.UI.WebControls,ResourceItemName:toolbutton-close.gif,Source:ResourceManager}">
												<AjaxEvents>
													<Click OnClientEvent="onClearSearchValue(e)" />
												</AjaxEvents>
											</TS:ToolButton>
										</Tools>
										<AjaxEvents>
											<SpecialKey OnClientEvent="onComponentsSearchSpecialKey(el, e);" />
										</AjaxEvents>
									</TS:TextEdit>
									<TS:Spacer ID="Spacer1" runat="server" StripeVisible="true" />
									<TS:Button runat="server" ID="ComponentsPropertiesButton" ImageAsSprite="false"
										Image="{Source: ResourceManager, ResourceManagerName: Terrasoft.UI.WebControls, ResourceItemName: config.png}">
										<Menu>
											<TS:MenuSeparator ID="MenuSeparator1" runat="server" Caption="@Terrasoft.UI.WebControls.ObjectInspector,DisplaySettings.Sorting" />
											<TS:CheckMenuItem runat="server" ID="SortByNameMenuItem" Group="ControlsSortingTypes"
												Caption="@Terrasoft.UI.WebControls.ObjectInspector,DisplaySettings.PropertySortingType.Alphabet">
												<AjaxEvents>
													<Click OnClientEvent="sortControlTreeByAlphabet();" />
												</AjaxEvents>
											</TS:CheckMenuItem>
											<TS:CheckMenuItem runat="server" ID="SortByPositionMenuItem"  Group="ControlsSortingTypes" Checked="true"
												Caption="@Terrasoft.UI.WebControls.ObjectInspector,DisplaySettings.PropertySortingType.Position">
												<AjaxEvents>
													<Click OnClientEvent="sortControlTreeByPosition();" />
												</AjaxEvents>
											</TS:CheckMenuItem>
											<TS:MenuSeparator ID="MenuSeparator2" runat="server" Caption="@Terrasoft.UI.WebControls.ObjectInspector,DisplaySettings.Grouping" />
											<TS:CheckMenuItem runat="server" ID="ShowGroupsMenuItem" Checked="true" 
												Caption="@Terrasoft.UI.WebControls.ObjectInspector,DisplaySettings.UseGroups">
												<AjaxEvents>
													<CheckChange OnClientEvent="hideComponentsGroups(el);" />
												</AjaxEvents>
											</TS:CheckMenuItem>
											<TS:MenuItem runat="server" ID="CollapseGroups"
												Caption="@Terrasoft.UI.WebControls.ObjectInspector,DisplaySettings.CollapseGroups">
												<AjaxEvents>
													<Click OnClientEvent="ProcsdComponentsMenuPanel.collapseAllGroups();" />
												</AjaxEvents>
											</TS:MenuItem>
											<TS:MenuItem runat="server" ID="ExpandGroups"
												Caption="@Terrasoft.UI.WebControls.ObjectInspector,DisplaySettings.ExpandGroups">
												<AjaxEvents>
													<Click OnClientEvent="ProcsdComponentsMenuPanel.expandAllGroups();" />
												</AjaxEvents>
											</TS:MenuItem>
											<TS:MenuSeparator ID="MenuSeparator3" runat="server" Caption="@Terrasoft.UI.WebControls.ObjectInspector,DisplaySettings.DisplayElements" />
											<TS:CheckMenuItem ID="DisplayGeneralControlsMenuItem" runat="server" Group="ControlsDisplayProperties" Checked="true"
												Caption="@Terrasoft.UI.WebControls.ObjectInspector,DisplaySettings.DisplayProperty.General">
												<AjaxEvents>
													<Click OnClientEvent="rebuildControlsTree(false);" />
												</AjaxEvents>
											</TS:CheckMenuItem>
											<TS:CheckMenuItem ID="DisplayAvailiableControlsMenuItem" runat="server" Group="ControlsDisplayProperties"
												Caption="@Terrasoft.UI.WebControls.ObjectInspector,DisplaySettings.DisplayProperty.Availiable">
												<AjaxEvents>
													<Click OnClientEvent="rebuildControlsTree(true);" />
												</AjaxEvents>
											</TS:CheckMenuItem>
										</Menu>
									</TS:Button>
								</TS:ControlLayout>
								<TS:MenuPanel runat="server" ID="ProcsdComponentsMenuPanel" Width="100%" Height="100%">
									<AjaxEvents>
										<MenuItemClick OnClientEvent="setExpectingAddElementState(tag)" />
									</AjaxEvents>
								</TS:MenuPanel>
							</Body>
						</TS:Tab>
					</Tabs>
				</TS:TabPanel>
				<TS:TabPanel runat="server" ID="EditTabPanel" Width="100%" Height="100%" HasSplitter="true"
					HasOptionsButton="false" CollapseMode="CurrentItem" Closeable="false" Collapsible="false">
					<Tabs>
						<TS:Tab runat="server" ID="ProcessTab"
							Caption="@Terrasoft.WebApp.ProcessSchemaDesigner,DesignArea.Caption">
							<Body>
								<TS:ControlLayout ID="ControlLayout4" runat="server" Width="100%" Height="100%" HasSplitter="true" >
									<TS:DiagramContainer ID="ProcessSchemaEdit" Width="100%" Height="100%" runat="server">
									</TS:DiagramContainer>
								</TS:ControlLayout>
							</Body>
						</TS:Tab>
					</Tabs>
				</TS:TabPanel>
				<TS:ControlLayout ID="East" runat="server" Height="100%" Width="300px">
					<TS:TabPanel ID="TabPanel1" runat="server" HasSplitter="true" Width="100%" HasOptionsButton="false"
						Collapsible="true" Collapsed="false" Height="35%" Margins="0 0 0 0" AllowDraggingTabs="true" DockSite="true">
						<Tabs>
							<TS:Tab runat="server" ID="ProcessSchemaTab" Caption="@Terrasoft.WebApp.BaseDesigner,Schema.Caption"
								Draggable="true" AllowDraggingOutside="true">
								<Body>
									<TS:ControlLayout ID="ControlLayout5" runat="server" Direction="Vertical" Width="100%"
										DisplayStyle="Topbar" Edges="0 0 1 0" Margins="1 0 0 0">
										<TS:ComboBoxEdit runat="server" ID="SchemaItemsCombobox" Width="100%" Sorted="true">
											<AjaxEvents>
												<Select OnClientEvent="onSchemaItemsComboboxSelect(el, record, index);" />
												<BeforeQuery OnClientEvent="onSchemaItemsComboboxBeforeQuery(queryEvent);" />
											</AjaxEvents>
										</TS:ComboBoxEdit>
									</TS:ControlLayout>
									<TS:ControlLayout ID="ControlLayout6" runat="server" Direction="Vertical" Height="100%" Width="100%">
										<TS:TreeGrid runat="server" ID="ProcessSchemaTree" Height="100%" Width="100%" EnableInnerDragDrop="true"
											DataSourceId="SchemaDataSource" FooterVisible="false" ImageList="Terrasoft.WebApp"
											DragDropGroup="DesignerDD" HideHeaders="true" ShowAutoWidthMenu="false" ShowMultiLineMenu="false"
											ShowSummariesMenu="false" StripeRows="false" HideRowBorders="true" QuickViewMode="None"
											ContextMenuId="ProcessSchemaTreeContextMenu">
											<AjaxEvents>
												<SelectionChange OnClientEvent="onProcessSchemaTreeSelectionChange(nodeAttributes)" />
												<DblClick OnClientEvent="onProcessSchemaTreeDblClick(e);" />
											</AjaxEvents>
										</TS:TreeGrid>
									</TS:ControlLayout>
								</Body>
							</TS:Tab>
						</Tabs>
					</TS:TabPanel>
					<TS:TabPanel ID="ProcessActionSchemasTabPanel" runat="server" Width="100%" Height="65%" Collapsible="true" HasOptionsButton="false">
						<Tabs>
							<TS:Tab ID="Tab1" Caption="@Terrasoft.WebApp.BaseDesigner,ObjectInspector.Caption" runat="server">
								<Body>
									<TS:ObjectInspector runat="server" ID="ObjectInspector" Width="100%" Height="100%"
										PropertiesDataSourceId="PropertiesDataSource" ViewButtonsMode="None">
										<AjaxEvents>
											<PropertyChange OnClientEvent="Terrasoft.AjaxMethods.ObjectInspectorPropertyChange(propertyName, value, parentPath)" />
											<DesignModeUsageTypeChange OnClientEvent="onObjectInspectorDesignModeUsageTypeChange(designModeUsageType);" />
										</AjaxEvents>
									</TS:ObjectInspector>
								</Body>
							</TS:Tab>
						</Tabs>
					</TS:TabPanel>
				</TS:ControlLayout>
			</TS:ControlLayout>
		</TS:ControlLayout>
	</form>
</body>
</html>
