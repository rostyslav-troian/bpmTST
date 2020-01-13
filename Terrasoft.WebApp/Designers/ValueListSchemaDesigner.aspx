<%@ Page Language="C#" Caption="@Terrasoft.WebApp,ValueListSchemaDesigner.Caption"
	CodeBehind="ValueListSchemaDesigner.aspx.cs" Inherits="Terrasoft.WebApp.Designers.ValueListSchemaDesigner" %>

<%@ Register TagPrefix="UC" TagName="InputValue" Src="~/Templates/UserControls/InputValue.ascx" %>
<%@ Register TagPrefix="UC" TagName="ObjectInspectorUserControl" Src="~/Templates/UserControls/ObjectInspectorUserControl.ascx" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
	<title></title>
	<script language="javascript" type="text/javascript">
		function onSchemaDataSourceActiveRowChanged(dataSource, primaryColumnValue) {
			var activeRow = dataSource.getRow(primaryColumnValue);
			if (activeRow) {
				selectedItemUId = activeRow.getColumnValue('UId');
				parentId = activeRow.getColumnValue('ParentId');
				DesignModeManager.onItemSelect(parentId, selectedItemUId);
				ValueListSchemaTree.selectNodeById(primaryColumnValue);
				ValueListSchemaTree.setActiveNodeById(primaryColumnValue);
				vlsdEntityCombobox.setRawValue(activeRow.getColumnValue('Caption'));
			}
		}

		function onAddItemButtonClick() {
			var selectedNode = ValueListSchemaTree.getSelectionModel().selNodes[0];
			if (selectedNode) {
				var data = new Object();
				data.typeName = ValueListSchemaTree.getSelectionModel().selData[0].TypeName;
				DesignModeManager.addItems(selectedNode.id, Ext.encode(data), 0);
			}
		}

		function OnAddItemClick(menuItem, e) {
			if (menuItem instanceof Ext.menu.Separator) {
				return;
			}
			var selectedNode = ValueListSchemaTree.getSelectionModel().selNodes[0];
			var data = new Object();
			data.typeName = menuItem.tag;
			data.entityGroup = menuItem.entityGroup;
			DesignModeManager.addItems(selectedNode.id, Ext.encode(data), 0);
		}

		function onDeleteItemButtonClick() {
			var stringList = Ext.StringList('WebApp.Common');
			Ext.MessageBox.confirm(stringList.getValue('Message.Warning'), stringList.getValue('Message.DeleteElementConfirm'), function (btn) {
				if (btn == 'yes') {
					var selectedNode = ValueListSchemaTree.getSelectionModel().selNodes[0];
					if (selectedNode) {
						var ids = new Array(selectedNode.id);
						DesignModeManager.removeItems(Ext.encode(ids));
					}
				}
			}, this);
		}

		function onUpItemButtonClick() {
			var selectedNode = ValueListSchemaTree.getSelectionModel().selNodes[0];
			if (selectedNode) {
				var data = new Object();
				data.position = "Above";
				DesignModeManager.moveItem('', selectedNode.id, Ext.encode(data));
			}
		}

		function onDownItemButtonClick() {
			var selectedNode = ValueListSchemaTree.getSelectionModel().selNodes[0];
			if (selectedNode) {
				var data = new Object();
				data.position = "Below";
				DesignModeManager.moveItem('', selectedNode.id, Ext.encode(data));
			}
		}

		function onPropertiesDataSourceLoaded(dataSource, rows, cfg) {
			PropertiesDataSource.setActiveRow(0);
		}

		function onPropertiesDataSourceStructureLoaded(dataSource) {
			if (DesignModeManager.isCurrentItemResponse) {
				var descriptor = DesignModeManager.getCurrentItemDescriptor();
				if (descriptor) {
					ObjectInspector.rebuild(descriptor);
				} else {
					ObjectInspector.clear();
				}
			}
		}

		function OnApplySettings() {
			debugger;
			var treegrid = Ext.getCmp('ValueListSchemaTree');
			//treegrid.unselect();
			DesignModeManager.onSettingChanged(Ext.encode(DesignModeManager.changedSettings));
			//treegrid.getView().refreshPage(true);
		}

		function onSettingsDataSourceLoaded(dataSource, rows, cfg) {
			SettingsDataSource.setActiveRow(0);
		}

		function onValueListSchemaPropertiesTreeNodeDragDrop(nodes, targetNode, parentNode, movePosition) {
			var selNodes = Ext.decode(nodes);
			for (var i = 0; i < selNodes.length; i++) {
				var data = new Object();
				data.position = movePosition;
				DesignModeManager.moveItem(Ext.decode(targetNode).UId, selNodes[i].UId, Ext.encode(data));
			}
		}

		function onValueListSchemaPropertiesTreeNodeDragOver(overEvent) {
			var dropNodes = overEvent.dropNodes;
			var targetNode = overEvent.target;
			var targetNodeColumns = SchemaDataSource.getRow(targetNode.id).columns;
			var pt = overEvent.point;
			if (targetNodeColumns.Name == "Indexes" || targetNodeColumns.Name == "Columns" ||
					targetNodeColumns.NodeType == "InheritedColumns") {
				overEvent.cancel = true;
				return;
			}
			if (targetNodeColumns.NodeType == "InheritedColumns" && pt == "Above") {
				overEvent.cancel = true;
				return;
			}
			for (var n = 0; n < dropNodes.length; n++) {
				var dropNode = dropNodes[n];
				var dropNodeColumns = SchemaDataSource.getRow(dropNode.id).columns;
				if (pt == "Append") {
					overEvent.cancel = true;
					return;
					if (dropNodeColumns.ParentId == targetNodeColumns.UId) {
						overEvent.cancel = true;
						return;
					}
				}
				else {
					if (dropNodeColumns.NodeType != targetNodeColumns.NodeType) {
						overEvent.cancel = true;
						return;
					}
				}
				if (dropNodeColumns.Name == "Columns") {
					overEvent.cancel = true;
					return;
				}
			}
		}

		function onObjectInspectorDesignModeUsageTypeChange(designModeUsageType) {
			DesignModeManager.setUsageType(designModeUsageType);
		}

		function onObjectInspectorDesignModeUsageTypeChange(designModeUsageType) {
			DesignModeManager.setUsageType(designModeUsageType);
		}

		function onVlsdEnityComboboxSelect(control, recordParameter, index) {
			var record = Ext.decode(recordParameter);
			var id = record.value;
			DesignModeManager.selectItem(null, id);
		}

		function onvlsdEnityComboboxBeforeQuery(queryEvent) {
			var control = queryEvent.combo;
			var itemList = getControlsListBySchemaDataSource(SchemaDataSource);
			control.store.setDefaultSort('text');
			control.loadData(itemList);
		}

		function getControlsListBySchemaDataSource(SchemaDataSource) {
			var controlsList = new Array();
			for (var i = 0; i < SchemaDataSource.rows.length; i++) {
				var record = SchemaDataSource.rows.items[i];
				var nodeType = record.getColumnValue("NodeType");
				var typeName = record.getColumnValue("TypeName");
				if ((nodeType != "InnerProperty") && (typeName != "DataSourceStructureColumn")) {
					var control = new Array();
					control.push(record.getColumnValue("UId"));
					control.push(record.getColumnValue("Caption"));
					controlsList.push(control);
				}
			}
			return controlsList;
		}

		function actualizeVlsdEntityCombobox(value) {
			vlsdEntityCombobox.setRawValue(value);
		}

		function filterMenuPanel(menu, filter) {
			if (!menu) {
				return false;
			}
			var items = menu.items.items;
			for (var i = 0; i < items.length; i++) {
				var itemVisilbe = false;
				var item = items[i];
				if (item instanceof Ext.menu.Separator) {
					menu.setVisibleByIndex(i, false);
					continue;
				}
				if (item.caption.toLowerCase().search(filter.toLowerCase()) != -1) {
					itemVisilbe = true;
				}
				menu.setVisibleByIndex(i, itemVisilbe);
			}
		}

		function checkAllActions(check) {
			DBMetaActionsDataSource.rows.each(function (item) {
				var nodeId = item.columns.UId;
				var node = DBMetaActionsTree.getNodeById(nodeId);
				if (node.rendered) {
					var nodeChecker = node.checker;
					if (nodeChecker) {
						nodeChecker.setValue(check);
					}
				} else {
					var configs = DBMetaActionsTree.configs;
					configs[nodeId].checked = check;
				}
			}, this);
		}

		function checkSelectedActions(check) {
			var selectedNodes = DBMetaActionsTree.selModel.selNodes;
			for (var i = 0; i < selectedNodes.length; i++) {
				var node = selectedNodes[i];
				var nodeChecker = node.checker;
				if (nodeChecker) {
					nodeChecker.setValue(check);
				}
			}
		}

		function onActionNodeCheck(nodeId, isChecked) {
			Terrasoft.AjaxMethods.DBMetaActionsTreeOnNodeCheck(nodeId, isChecked)
		}

	</script>
</head>
<body>
	<form id="htmlForm" runat="server">
	<TS:ScriptManager ID="ScriptManager" runat="server" AjaxViewStateMode="Include">
	</TS:ScriptManager>
	<UC:InputValue ID="InputValueWindow" runat="server" EnableViewState="true" />
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
	<TS:VirtualDataSource ID="DBMetaActionsDataSource" runat="server" />
	<TS:ValueListSchemaDesignModeManager runat="server" ID="DesignModeManager" SchemaDataSourceId="SchemaDataSource"
		PropertyDataSourceId="PropertiesDataSource" SettingsDataSourceId="SettingsDataSource">
	</TS:ValueListSchemaDesignModeManager>
	<TS:Menu runat="server" ID="ValueListSchemaPropertiesTreeContextMenu">
		<Items>
			<TS:MenuItem ID="AddItemMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Add.Caption"
				ImageList="Terrasoft.WebApp" ImageName="common-icon-add.png" runat="server">
				<AjaxEvents>
					<Click OnEvent="AddNewItem" />
				</AjaxEvents>
			</TS:MenuItem>
			<TS:MenuItem ID="DeleteItemMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Delete.Caption"
				ImageList="Terrasoft.WebApp" ImageName="common-icon-delete.png" runat="server">
				<AjaxEvents>
					<Click OnClientEvent="onDeleteItemButtonClick();" />
				</AjaxEvents>
			</TS:MenuItem>
			<TS:MenuSeparator ID="MenuSeparator1" runat="server" />
			<TS:MenuItem ID="UpItemMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Up.Caption"
				ImageList="Terrasoft.WebApp" ImageName="valuelistschemadesigner-menu-upitem.png"
				runat="server">
				<AjaxEvents>
					<Click OnClientEvent="onUpItemButtonClick();" />
				</AjaxEvents>
			</TS:MenuItem>
			<TS:MenuItem ID="DownItemMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Down.Caption"
				ImageList="Terrasoft.WebApp" ImageName="valuelistschemadesigner-menu-downitem.png"
				runat="server">
				<AjaxEvents>
					<Click OnClientEvent="onDownItemButtonClick();" />
				</AjaxEvents>
			</TS:MenuItem>
		</Items>
		<AjaxEvents>
			<Prepare OnEvent="ValueListSchemaPropertiesTreeContextMenuOnPrepare" />
		</AjaxEvents>
	</TS:Menu>
	<TS:ControlLayout ID="ControlLayout1" IsViewPort="true" runat="server" Direction="Vertical" Padding="5" HelpContextId="298">
		<TS:ControlLayout ID="ControlLayout2" runat="server" Width="100%" DisplayStyle="Topbar" Margins="0 0 4 0">
			<TS:Button ID="SaveButton" runat="server" Image="{Source: ResourceManager, ResourceManagerName:Terrasoft.WebApp.BaseDesigner, ResourceItemName: commondesigner-save.png}">
				<AjaxEvents>
					<Click OnEvent="SaveButtonOnClick" Timeout="300000" ShowLoadMask="true" />
				</AjaxEvents>
				<Menu>
					<TS:MenuItem ID="SaveWithoutVerificationButton" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Save.WithoutVerification"
						Image="{Source: ResourceManager, ResourceManagerName:Terrasoft.WebApp.BaseDesigner, ResourceItemName: commondesigner-save.png}">
						<AjaxEvents>
							<Click OnEvent="SaveWithoutVerificationOnClick" ShowLoadMask="true" />
						</AjaxEvents>
					</TS:MenuItem>
					<TS:MenuItem  ID="SaveWithVerificationButton" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Save.WithVerification"
						Image="{Source: ResourceManager, ResourceManagerName:Terrasoft.WebApp.BaseDesigner, ResourceItemName: commondesigner-savewithverification.png}">
						<AjaxEvents>
							<Click OnEvent="SaveWithVerificationOnClick" ShowLoadMask="true" Timeout="900000000" />
						</AjaxEvents>
					</TS:MenuItem>
				</Menu>
			</TS:Button>
			<TS:Spacer ID="vlsdSpacerAfterSaveButton" StripeVisible="true" runat="server" />
			<TS:Button ID="vlsdAddItemButton" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Add.Caption" Enabled="false">
				<AjaxEvents>
					<Click OnEvent="AddNewItem" />
				</AjaxEvents>
			</TS:Button>
			<TS:Button ID="DeleteItemButton" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Delete.Caption">
				<AjaxEvents>
					<Click OnClientEvent="onDeleteItemButtonClick();" />
				</AjaxEvents>
			</TS:Button>
			<TS:Spacer ID="vlsdSpacerAfterDeleteItemButton" StripeVisible="true" runat="server" />
			<TS:Button ID="UpItemButton" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Up.Caption">
				<AjaxEvents>
					<Click OnClientEvent="onUpItemButtonClick();" />
				</AjaxEvents>
			</TS:Button>
			<TS:Button ID="DownItemButton" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Down.Caption">
				<AjaxEvents>
					<Click OnClientEvent="onDownItemButtonClick();" />
				</AjaxEvents>
			</TS:Button>
			<TS:Button runat="server" ID="HelpButton" ImageList="Terrasoft.WebApp" ImageAsSprite="false" CanFocus="false"
				Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:help.png}" Enabled="false" Hidden="true" >
				<AjaxEvents>
					<Click OnClientEvent="Terrasoft.HelpContext.showHelp(null)" />
				</AjaxEvents>
			</TS:Button>
			<TS:Spacer ID="vlsdSpacerAfterDownItemButton" Size="100%" runat="server" />
			<TS:Button ID="vlsdAdditionalButton" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Additional.Caption">
				<Menu>
					<TS:MenuItem ID="vlsdMenuItemSource" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,View.Source">
						<AjaxEvents>
							<Click OnEvent="ViewSourceButtonOnClick" />
						</AjaxEvents>
					</TS:MenuItem>
					<TS:MenuItem ID="vlsdMenuItemMeta" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,View.MetaData">
						<AjaxEvents>
							<Click OnEvent="ViewMetaDataButtonOnClick" />
						</AjaxEvents>
					</TS:MenuItem>
				</Menu>
			</TS:Button>
			<TS:Button ID="PropertiesButton" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Settings.Caption">
				<AjaxEvents>
					<Click OnEvent="PropertiesButtonOnClick" />
				</AjaxEvents>
			</TS:Button>
			<TS:Button runat="server" ID="vlsdHelpButton" ImageList="Terrasoft.WebApp" ImageAsSprite="true" CanFocus="false"
				Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:help.png}" Hidden="true">
				<AjaxEvents>
					<Click OnClientEvent="Terrasoft.HelpContext.showHelp(null, 'vlsdHelpButton')" />
				</AjaxEvents>
			</TS:Button>
		</TS:ControlLayout>
		<TS:MessagePanel ID="MessagePanel" runat="server" Width="100%" />
		<TS:ControlLayout ID="ControlLayout3" runat="server" Height="100%" Margins="0 0 5 0" Direction="Horizontal" Width="100%">
			<TS:TabPanel ID="ValueListSchemaTabPanel" runat="server" Width="60%" DockSite="true" Collapsible="false"
				EnableDrop="true" AllowDraggingTabs="true" HasSplitter="true" Height="100%" HasOptionsButton="false">
				<Tabs>
					<TS:Tab Caption="@Terrasoft.WebApp.BaseDesigner,Schema.Caption">
						<Body>
							<TS:ControlLayout ID="ControlLayout4" runat="server" Width="100%" DisplayStyle="Topbar" Edges="0 0 1 0" Margins="1 0 0 0">
								<TS:ComboBoxEdit ID="vlsdEntityCombobox" runat="server" Width="100%">
									<AjaxEvents>
										<Select OnClientEvent="onvlsdEnityComboboxSelect(el, record, index);" />
										<BeforeQuery OnClientEvent="onvlsdEnityComboboxBeforeQuery(queryEvent);" />
									</AjaxEvents>
								</TS:ComboBoxEdit>
							</TS:ControlLayout>
							<TS:TreeGrid Width="100%" Height="100%" ID="ValueListSchemaTree" runat="server" FooterVisible="False"
								ParentFieldName="ParentId" SelectionMode="SingleRow" ContextMenuId="ValueListSchemaPropertiesTreeContextMenu"
								EnableInnerDragDrop="true" ImageList="Terrasoft.WebApp" AllowRootChildren="false" HideHeaders="true"
								DataSourceId="SchemaDataSource" QuickViewMode="None" AutoLayout="true" AutoScroll="true" ShowAutoWidthMenu="false"
								ShowMultiLineMenu="false" ShowSummariesMenu="false" HideRowBorders="true" StripeRows="false">
								<AjaxEvents>
									<NodesDrop OnClientEvent="onValueListSchemaPropertiesTreeNodeDragDrop(nodes,targetNode,parentNode,movePosition)" />
									<NodeDragOver OnClientEvent="onValueListSchemaPropertiesTreeNodeDragOver(overEvent)" />
								</AjaxEvents>
							</TS:TreeGrid>
						</Body>
					</TS:Tab>
				</Tabs>
			</TS:TabPanel>
			<TS:ControlLayout ID="ObjectInspectorLayout" runat="server" Width="40%" Height="100%">
				<TS:TabPanel ID="ValueListSchemaPropertiesTabPanel" runat="server" Width="100%" DockSite="true" HasOptionsButton="false"
					EnableDrop="true" AllowDraggingTabs="true" Height="100%" Collapsible="false">
					<Tabs>
						<TS:Tab Caption="@Terrasoft.WebApp.BaseDesigner,ObjectInspector.Caption" ID="ValueListSchemaObjectInspectorTab"
							runat="server" Draggable="true" AllowDraggingOutside="true">
							<Body>
								<TS:ObjectInspector runat="server" ID="ObjectInspector" Width="100%" Height="100%"
									ViewButtonsMode="AjaxControl" PropertiesDataSourceId="PropertiesDataSource" MaxCaptionWidth="300">
									<AjaxEvents>
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
