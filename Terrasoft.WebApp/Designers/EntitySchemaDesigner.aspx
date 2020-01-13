<%@ Page Language="C#" Caption="@Terrasoft.WebApp,EntitySchemaDesigner.Caption" CodeBehind="EntitySchemaDesigner.aspx.cs"
	Inherits="Terrasoft.WebApp.Designers.EntitySchemaDesigner" %>

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
				EntitySchemaTree.selectNodeById(primaryColumnValue);
				EntitySchemaTree.setActiveNodeById(primaryColumnValue);
				esdEntityCombobox.setRawValue(activeRow.getColumnValue('Caption'));
			}
		}

		function onAddItemButtonClick() {
			var selectedNode = EntitySchemaTree.getSelectionModel().selNodes[0];
			if (selectedNode) {
				var data = new Object();
				data.typeName = EntitySchemaTree.getSelectionModel().selData[0].TypeName;
				DesignModeManager.addItems(selectedNode.id, Ext.encode(data), 0);
			}
		}

		function OnAddItemClick(menuItem, e) {
			if (menuItem instanceof Ext.menu.Separator) {
				return;
			}
			var selectedNode = EntitySchemaTree.getSelectionModel().selNodes[0];
			var data = new Object();
			data.typeName = menuItem.tag;
			data.entityGroup = menuItem.entityGroup;
			DesignModeManager.addItems(selectedNode.id, Ext.encode(data), 0);
		}

		function onDeleteItemButtonClick() {
			var stringList = Ext.StringList('WebApp.Common');
			Ext.MessageBox.confirm(stringList.getValue('Message.Warning'), stringList.getValue('Message.DeleteElementConfirm'), function(btn) {
				if (btn == 'yes') {
					var selectedNode = EntitySchemaTree.getSelectionModel().selNodes[0];
					if (selectedNode) {
						var ids =new Array(selectedNode.id);
						DesignModeManager.removeItems(Ext.encode(ids));
					}
				}
			}, this);
		}

		function onUpItemButtonClick() {
			var selectedNode = EntitySchemaTree.getSelectionModel().selNodes[0];
			if (selectedNode) {
				var data = new Object();
				data.position = "Above";
				DesignModeManager.moveItem('', selectedNode.id, Ext.encode(data));
			}
		}

		function onDownItemButtonClick() {
			var selectedNode = EntitySchemaTree.getSelectionModel().selNodes[0];
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
			DesignModeManager.onSettingChanged(Ext.encode(DesignModeManager.changedSettings));
			EntitySchemaTree.getView().refreshPage(true);
		}

		function onSettingsDataSourceLoaded(dataSource, rows, cfg) {
			SettingsDataSource.setActiveRow(0);
		}

		function onEntitySchemaPropertiesTreeNodeDragDrop(nodes,targetNode,parentNode,movePosition) {
			var selNodes = Ext.decode(nodes);
			for (var i = 0; i < selNodes.length; i++) {
				var data = new Object();
				data.position = movePosition;
				DesignModeManager.moveItem(Ext.decode(targetNode).UId, selNodes[i].UId, Ext.encode(data));
			}
		}

		function onEntitySchemaPropertiesTreeNodeDragOver(overEvent) {
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
					if (targetNodeColumns.NodeType == "EntitySchemaIndex") {
						if (dropNodeColumns.NodeType != "EntitySchemaIndexColumn") {
							overEvent.cancel = true;
							return;
						}
					}
					else {
						overEvent.cancel = true;
						return;
					}
					if (dropNodeColumns.ParentId == targetNodeColumns.UId) {
						overEvent.cancel = true;
						return;
					}
				}
				else {
					if (dropNodeColumns.NodeType != "EntitySchemaIndexColumn") {
						if (dropNodeColumns.ParentId != targetNodeColumns.ParentId) {
							overEvent.cancel = true;
							return;
						}
					}
					else if (dropNodeColumns.NodeType != targetNodeColumns.NodeType) {
						overEvent.cancel = true;
						return;
					}
				}
				if (dropNodeColumns.Name == "Indexes" || dropNodeColumns.Name == "Columns") {
					overEvent.cancel = true;
					return;
				}
				if (dropNodeColumns.IsInherited == "True") {
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

		function onEsdEnityComboboxSelect(control, recordParameter, index) {
			var record = Ext.decode(recordParameter);
			var id = record.value;
			DesignModeManager.selectItem(null, id);
		}

		function onEsdEnityComboboxBeforeQuery(queryEvent) {
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

		function actualizeEsdEntityCombobox(value) {
			esdEntityCombobox.setRawValue(value);
		}

		function filterMenuPanel(menu, filter) {
			if (!menu) {
				return false;
			}
			var items = menu.items.items;
			for(var i = 0; i < items.length; i++) {
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
			DBMetaActionsDataSource.rows.each(function(item) {
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
	<TS:EntitySchemaDesignModeManager runat="server" ID="DesignModeManager" SchemaDataSourceId="SchemaDataSource"
		PropertyDataSourceId="PropertiesDataSource" SettingsDataSourceId="SettingsDataSource">
	</TS:EntitySchemaDesignModeManager>
	<TS:Menu runat="server" ID="EntitySchemaPropertiesTreeContextMenu">
		<Items>
			<TS:MenuItem ID="AddItemMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Add.Caption"
				ImageList="Terrasoft.WebApp" ImageName="common-icon-add.png" runat="server" Enabled="false">
				<AjaxEvents>
					<MenuItemClick OnClientEvent="OnAddItemClick(menuItem, e);" />
				</AjaxEvents>
			</TS:MenuItem>
			<TS:MenuItem ID="DeleteItemMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Delete.Caption"
				ImageList="Terrasoft.WebApp" ImageName="common-icon-delete.png" runat="server" Enabled="false">
				<AjaxEvents>
					<Click OnClientEvent="onDeleteItemButtonClick();" />
				</AjaxEvents>
			</TS:MenuItem>
			<TS:MenuSeparator runat="server" />
			<TS:MenuItem ID="UpItemMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Up.Caption"
				ImageList="Terrasoft.WebApp" ImageName="entityschemadesigner-menu-upitem.png" Enabled="false"
				runat="server">
				<AjaxEvents>
					<Click OnClientEvent="onUpItemButtonClick();" />
				</AjaxEvents>
			</TS:MenuItem>
			<TS:MenuItem ID="DownItemMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Down.Caption"
				ImageList="Terrasoft.WebApp" ImageName="entityschemadesigner-menu-downitem.png" Enabled="false"
				runat="server">
				<AjaxEvents>
					<Click OnClientEvent="onDownItemButtonClick();" />
				</AjaxEvents>
			</TS:MenuItem>
		</Items>
		<AjaxEvents>
			<Prepare OnEvent="EntitySchemaPropertiesTreeContextMenuOnPrepare" />
		</AjaxEvents>
	</TS:Menu>
	<TS:ControlLayout IsViewPort="true" runat="server" Direction="Vertical" Padding="5" HelpContextId="298">
		<TS:ControlLayout runat="server" Width="100%" DisplayStyle="Topbar" Margins="0 0 4 0">
			<TS:Button ID="SaveButton" runat="server" Image="{Source: ResourceManager, ResourceManagerName:Terrasoft.WebApp.BaseDesigner, ResourceItemName: commondesigner-save.png}">
				<AjaxEvents>
					<Click OnEvent="SaveButtonOnClick" ShowLoadMask="true" Timeout="300000" />
				</AjaxEvents>
				<Menu>
					<TS:MenuItem ID="SaveWithoutVerificationButton" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Save.WithoutVerification"
						Image="{Source: ResourceManager, ResourceManagerName:Terrasoft.WebApp.BaseDesigner, ResourceItemName: commondesigner-save.png}">
						<AjaxEvents>
							<Click OnEvent="SaveWithoutVerificationOnClick" ShowLoadMask="true" Timeout="300000" />
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
			<TS:Spacer ID="esdSpacerAfterSaveButton" StripeVisible="true" runat="server" />
			<TS:Button ID="esdAddItemButton" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Add.Caption"
				Enabled="false">
				<AjaxEvents>
					<MenuItemClick OnClientEvent="OnAddItemClick(menuItem, e);" />
				</AjaxEvents>
			</TS:Button>
			<TS:Button ID="DeleteItemButton" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Delete.Caption"
				Enabled="false">
				<AjaxEvents>
					<Click OnClientEvent="onDeleteItemButtonClick();" />
				</AjaxEvents>
			</TS:Button>
			<TS:Spacer ID="esdSpacerAfterDeleteItemButton" StripeVisible="true" runat="server" />
			<TS:Button ID="UpItemButton" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Up.Caption"
				Enabled="false">
				<AjaxEvents>
					<Click OnClientEvent="onUpItemButtonClick();" />
				</AjaxEvents>
			</TS:Button>
			<TS:Button ID="DownItemButton" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Down.Caption"
				Enabled="false">
				<AjaxEvents>
					<Click OnClientEvent="onDownItemButtonClick();" />
				</AjaxEvents>
			</TS:Button>
			<TS:Button runat="server" ID="HelpButton" ImageList="Terrasoft.WebApp" ImageAsSprite="false" CanFocus="false"
				Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:help.png}" Enabled="false" Hidden="true" >
			</TS:Button>
			<TS:Spacer ID="esdSpacerAfterDownItemButton" Size="100%" runat="server" />
			<TS:Button ID="esdAdditionalButton" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Additional.Caption">
				<Menu>
					<TS:MenuItem ID="esdShowProcessButtonMenuItem" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,OpenProcess.Caption">
						<AjaxEvents>
							<Click OnClientEvent="Terrasoft.AjaxMethods.ShowProcessButtonOnClick()" />
						</AjaxEvents>
					</TS:MenuItem>
					<TS:MenuSeparator runat="server" />
					<TS:MenuItem ID="esdMenuItemSource" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,View.Source">
						<AjaxEvents>
							<Click OnEvent="ViewSourceButtonOnClick" />
						</AjaxEvents>
					</TS:MenuItem>
					<TS:MenuItem ID="esdMenuItemMeta" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,View.MetaData">
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
			<TS:Button runat="server" ID="esdHelpButton" ImageList="Terrasoft.WebApp" ImageAsSprite="true" CanFocus="false"
				Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:help.png}" Hidden="true">
			</TS:Button>
		</TS:ControlLayout>
		<TS:MessagePanel ID="MessagePanel" runat="server" Width="100%" />
		<TS:ControlLayout runat="server" Height="100%" Margins="0 0 5 0" Direction="Horizontal" Width="100%">
			<TS:TabPanel ID="EntitySchemaTabPanel" runat="server" Width="60%" DockSite="true" Collapsible="false"
				EnableDrop="true" AllowDraggingTabs="true" HasSplitter="true" Height="100%" HasOptionsButton="false">
				<Tabs>
					<TS:Tab Caption="@Terrasoft.WebApp.BaseDesigner,Schema.Caption">
						<Body>
							<TS:ControlLayout runat="server" Width="100%" DisplayStyle="Topbar" Edges="0 0 1 0" Margins="1 0 0 0">
								<TS:ComboBoxEdit ID="esdEntityCombobox" runat="server" Width="100%">
									<AjaxEvents>
										<Select OnClientEvent="onEsdEnityComboboxSelect(el, record, index);" />
										<BeforeQuery OnClientEvent="onEsdEnityComboboxBeforeQuery(queryEvent);" />
									</AjaxEvents>
								</TS:ComboBoxEdit>
							</TS:ControlLayout>
							<TS:TreeGrid Width="100%" Height="100%" ID="EntitySchemaTree" runat="server" FooterVisible="False"
								ParentFieldName="ParentId" SelectionMode="SingleRow" ContextMenuId="EntitySchemaPropertiesTreeContextMenu"
								EnableInnerDragDrop="true" ImageList="Terrasoft.WebApp" AllowRootChildren="false" HideHeaders="true"
								DataSourceId="SchemaDataSource" QuickViewMode="None" AutoLayout="true" AutoScroll="true" ShowAutoWidthMenu="false"
								ShowMultiLineMenu="false" ShowSummariesMenu="false" HideRowBorders="true" StripeRows="false">
								<AjaxEvents>
									<NodesDrop OnClientEvent="onEntitySchemaPropertiesTreeNodeDragDrop(nodes,targetNode,parentNode,movePosition)" />
									<NodeDragOver OnClientEvent="onEntitySchemaPropertiesTreeNodeDragOver(overEvent)" />
								</AjaxEvents>
							</TS:TreeGrid>
						</Body>
					</TS:Tab>
					<TS:Tab Caption="@Terrasoft.WebApp.BaseDesigner,Actions.Save.Caption" ID="EntitySchemaActionsTab"
						runat="server" Draggable="true" AllowDraggingOutside="true" Hidden="true">
						<Body>
							<TS:ControlLayout runat="server" Direction="Vertical" Width="100%" Height="100%">
								<%--
								<TS:ControlLayout runat="server" Width="100%" DisplayStyle="Topbar">
									<TS:Button ID="DBMetaActionsExecuteButton" runat="server" ImageList="Terrasoft.WebApp"
										ImageName="solutionexplorermodule-menu-viewpage.png">
										<AjaxEvents>
											<Click OnEvent="DBMetaActionsExecuteButtonOnClick" />
										</AjaxEvents>
									</TS:Button>
									<TS:Button ID="OperationButton" runat="server" Caption="@Terrasoft.WebApp,EntitySchemaDesigner.OperationButton.Caption" Hidden="false">
										<Menu>
											<TS:MenuItem ID="SaveActionsToFileMenuItem" runat="server" Caption="@Terrasoft.WebApp,EntitySchemaDesigner.OperationButton.ActionsMenu.SaveActionsToFileMenuItem.Caption">
												<AjaxEvents>
													<Click OnEvent="SaveActionsToFileMenuItemOnClick" IsUpload="true" />
												</AjaxEvents>
											</TS:MenuItem>
										</Menu>
									</TS:Button>
								</TS:ControlLayout>--%>
								<TS:ControlLayout runat="server" Width="100%" Height="100%">
									<TS:TreeGrid ID="DBMetaActionsTree" runat="server" Width="100%" Height="100%" FooterVisible="False"
										ParentFieldName="ParentId" SelectionMode="MultiRows" StripeRows="True" ImageList="Terrasoft.WebApp"
										DataSourceId="DBMetaActionsDataSource" QuickViewMode="None" IsColumnAutowidth="true">
										<AjaxEvents>
											<NodeCheck OnClientEvent="onActionNodeCheck(nodeId, isChecked);" />
											<%--<NodeCheck OnClientEvent="Terrasoft.AjaxMethods.DBMetaActionsTreeOnNodeCheck(nodeId, isChecked)" />--%>
											<LinkClick OnClientEvent="Terrasoft.AjaxMethods.DBMetaActionsTreeOnLinkClick(linkId, nodeId)" />
											<ColumnHidden OnClientEvent="Terrasoft.AjaxMethods.DBMetaActionsTreeOnColumnHidden(columnName, isVisible)" />
										</AjaxEvents>
									</TS:TreeGrid>
								</TS:ControlLayout>
							</TS:ControlLayout>
						</Body>
					</TS:Tab>
				</Tabs>
			</TS:TabPanel>
			<TS:ControlLayout ID="ObjectInspectorLayout" runat="server" Width="40%" Height="100%">
				<TS:TabPanel ID="EntitySchemaPropertiesTabPanel" runat="server" Width="100%" DockSite="true" HasOptionsButton="false"
					EnableDrop="true" AllowDraggingTabs="true" Height="100%" Collapsible="false">
					<Tabs>
						<TS:Tab Caption="@Terrasoft.WebApp.BaseDesigner,ObjectInspector.Caption" ID="EntitySchemaObjectInspectorTab"
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
