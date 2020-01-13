<%@ Page Language="C#" Caption="@Terrasoft.WebApp,ProcessUserTaskSchemaDesigner.Caption" CodeBehind="ProcessUserTaskSchemaDesigner.aspx.cs"
	Inherits="Terrasoft.WebApp.Designers.ProcessUserTaskSchemaDesigner" %>

<%@ Register TagPrefix="UC" TagName="ObjectInspectorUserControl" Src="~/Templates/UserControls/ObjectInspectorUserControl.ascx" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title></title>
	<script language="javascript" type="text/javascript">

		function onSchemaDataSourceActiveRowChanged(dataSource, primaryColumnValue) {
			var activeRow = dataSource.getRow(primaryColumnValue);
			if (activeRow) {
				var controlId = activeRow.getColumnValue('UId');
				DesignModeManager.onItemSelect('', controlId);
				ProcessUserTaskSchemaGrid.selectNodeById(primaryColumnValue);
				ProcessUserTaskSchemaGrid.setActiveNodeById(primaryColumnValue);
				ProcessUserTaskItemsCombobox.setRawValue(activeRow.getColumnValue('Caption'));
			}
		}

		function onPropertiesDataSourceLoaded(dataSource,dataArray,request) {
			PropertiesDataSource.setActiveRow(0);
		}

		function onPropertiesDataSourceStructureLoaded(dataSource) {
			if (DesignModeManager.isCurrentItemResponse) {
				var descriptor = DesignModeManager.getCurrentItemDescriptor();
				objectInspector.rebuild(descriptor);
			}
		}

		function onSettingsDataSourceLoaded(dataSource,dataArray,request) {
			SettingsDataSource.setActiveRow(0);
		}

		function onObjectInspectorDesignModeUsageTypeChange(designModeUsageType) {
			DesignModeManager.setUsageType(designModeUsageType);
			var descriptor = DesignModeManager.getCurrentItemDescriptor();
			objectInspector.rebuild(descriptor);
		}

		function onAddItemButtonClick() {
			var selectedNode = ProcessUserTaskSchemaGrid.getSelectionModel().selNodes[0];
			if (selectedNode) {
				var data = new Object();
				var row = ProcessUserTaskSchemaDataSource.findRow('UId', selectedNode.id);
				data.typeName = row.getColumnValue('TypeName');
				data.parentId = row.getColumnValue('ParentUId');
				DesignModeManager.addItems(row.getColumnValue('UId'), Ext.encode(data), 0);
			}
		}

		function onAddParameter() {
			var row = ProcessUserTaskSchemaDataSource.findRow('TypeName', 'Parameters');
			var data = new Object();
			data.typeName = row.getColumnValue('TypeName');
			data.parentId = row.getColumnValue('ParentUId');
			DesignModeManager.addItems(row.getColumnValue('UId'), Ext.encode(data), 0);
		}

		function onAddMethod() {
			var row = ProcessUserTaskSchemaDataSource.findRow('TypeName', 'Methods');
			var data = new Object();
			data.typeName = row.getColumnValue('TypeName');
			data.parentId = row.getColumnValue('ParentUId');
			DesignModeManager.addItems(row.getColumnValue('UId'), Ext.encode(data), 0);
		}

		function OnApplySettings() {
			DesignModeManager.onSettingChanged(Ext.encode(DesignModeManager.changedSettings));
		}

		function removeSelectedProcessUserTaskSchemaItem() {
			var selNodeId = ProcessUserTaskSchemaGrid.selModel.selNodes[0].id;
			var row = ProcessUserTaskSchemaDataSource.getRow(selNodeId);
			var itemUId = row.getColumnValue('UId');
			var parentItemId = row.getColumnValue('ParentId');
			DesignModeManager.removeItem(itemUId, parentItemId, null);
		}

		function MoveUpButtonClick() {
			var selectedNode = ProcessUserTaskSchemaGrid.getSelectionModel().selNodes[0];
			if (selectedNode) {
				var data = new Object();
				data.position = "Above";
				DesignModeManager.moveItem('', selectedNode.id, "Above");
			}
		}

		function MoveDownButtonClick() {
			var selectedNode = ProcessUserTaskSchemaGrid.getSelectionModel().selNodes[0];
			if (selectedNode) {
				var data = new Object();
				data.position = "Below";
				DesignModeManager.moveItem('', selectedNode.id, "Below");
			}
		}

		function onProcessUserTaskItemsComboboxSelect(control, recordParameter, index) {
			var record = Ext.decode(recordParameter);
			var id = record.value;
			DesignModeManager.selectItem(null, id);
		}

		function onProcessUserTaskItemsComboboxBeforeQuery(queryEvent) {
			var control = queryEvent.combo;
			var itemList = getControlsListBySchemaDataSource(ProcessUserTaskSchemaDataSource);
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

		function onProcessUserTaskSchemaTreeNodeDragDrop(nodes, targetNode, parentNode, movePosition) {
			var selNodes = Ext.decode(nodes);
			for (var i=0; i < selNodes.length; i++) {
				var data = new Object();
				data.position = movePosition;
				DesignModeManager.moveItem(Ext.decode(targetNode).UId, selNodes[i].UId, movePosition.toString());
			}
		}

		function onProcessUserTaskSchemaTreeNodeDragOver(overEvent) {
			var dropNodes = overEvent.dropNodes;
			var targetNode = overEvent.target;
			var targetNodeColumns = ProcessUserTaskSchemaDataSource.getRow(targetNode.id).columns;
			if (!targetNodeColumns.ParentUId) {
				overEvent.cancel = true;
				return;
			}
			var pt = overEvent.point;
			if (dropNodes.length != 1) {
				overEvent.cancel = true;
				return;
			}
			var dropNode = dropNodes[0];
			var dropNodeColumns = ProcessUserTaskSchemaDataSource.getRow(dropNode.id).columns;
			if (dropNodeColumns.ParentUId != targetNodeColumns.ParentUId) {
				if (dropNodeColumns.ParentUId != targetNodeColumns.UId) {
					overEvent.cancel = true;
					return;
				}
			} else if (dropNodeColumns.typeName == "SchemaMethod" && pt == "Append") {
				overEvent.cancel = true;
				return;
			} else if (dropNodeColumns.typeName == "Parameters" || dropNodeColumns.typeName == "Methods" ||
					dropNodeColumns.typeName == "LocalizableStrings") {
				overEvent.cancel = true;
				return;
			}
		}

		function actualizeProcessUserTaskItemsCombobox(value) {
			ProcessUserTaskItemsCombobox.setRawValue(value);
		}

	</script>
</head>
<body>
	<form id="htmlForm" runat="server">
	<TS:ScriptManager ID="ScriptManager" runat="server" AjaxViewStateMode="Include">
	</TS:ScriptManager>
	<TS:VirtualDataSource ID="ProcessUserTaskSchemaDataSource" runat="server">
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
	<UC:ObjectInspectorUserControl ID="PropertiesWindow" runat="server" />
	<TS:ProcessUserTaskSchemaDesignModeManager runat="server" ID="DesignModeManager" SchemaDataSourceId="ProcessUserTaskSchemaDataSource"
		PropertyDataSourceId="PropertiesDataSource" SettingsDataSourceId="SettingsDataSource" OnSchemaChanged="DesignModeManager_OnSchemaChanged">
	</TS:ProcessUserTaskSchemaDesignModeManager>

	<TS:Menu runat="server" ID="ProcessUserTask_Menu">
		<Items>
			<TS:MenuItem runat="server" ID="AddMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Add.Caption" Enabled="false"
				Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:common-icon-add.png}">
				<AjaxEvents>
					<Click OnClientEvent="onAddItemButtonClick();" />
				</AjaxEvents>
			</TS:MenuItem>
			<TS:MenuItem runat="server" ID="DeleteMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Delete.Caption" Enabled="false"
				Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:common-icon-delete.png}">
				<AjaxEvents>
					<Click OnClientEvent="removeSelectedProcessUserTaskSchemaItem();" />
				</AjaxEvents>
			</TS:MenuItem>
			<TS:MenuSeparator runat="server" ID="SeparatorMenuItem" />
			<TS:MenuItem runat="server" ID="MoveUpMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Up.Caption" Enabled="false"
				Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:entityschemadesigner-menu-upitem.png}">
				<AjaxEvents>
					<Click OnClientEvent="MoveUpButtonClick();" />
				</AjaxEvents>
			</TS:MenuItem>
			<TS:MenuItem runat="server" ID="MoveDownMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Down.Caption" Enabled="false"
				Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:entityschemadesigner-menu-downitem.png}">
				<AjaxEvents>
					<Click OnClientEvent="MoveDownButtonClick();" />
				</AjaxEvents>
			</TS:MenuItem>
		</Items>
		<AjaxEvents>
			<Prepare OnEvent="ProcessUserTaskSchemaPropertiesTreeContextMenuOnPrepare" />
		</AjaxEvents>
	</TS:Menu>

	<TS:ControlLayout ID="MainPanel" runat="server" Width="100%" Height="100%" IsViewPort="true" Padding="5" HelpContextId="414">
		<TS:ControlLayout ID="ToolBar" runat="server" Width="100%" Height="100%" DisplayStyle="Topbar" Margins="0 0 4 0">
			<TS:Button ID="SaveButton" runat="server"
				Image="{Source: ResourceManager, ResourceManagerName:Terrasoft.WebApp.BaseDesigner, ResourceItemName: commondesigner-save.png}">
				<AjaxEvents>
					<Click OnEvent="SaveButtonOnClick" ShowLoadMask="true" />
				</AjaxEvents>
				<Menu>
					<TS:MenuItem ID="Save" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Save.WithoutVerification"
						Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp.BaseDesigner, ResourceItemName:commondesigner-save.png}">
						<AjaxEvents>
							<Click OnEvent="SaveButtonOnClick" ShowLoadMask="true" />
						</AjaxEvents>
					</TS:MenuItem>
					<TS:MenuItem ID="SaveWithWerification" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Save.WithVerification"
						Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp.BaseDesigner, ResourceItemName:commondesigner-savewithverification.png}">
						<AjaxEvents>
							<Click OnEvent="SaveWithVerificationOnClick" ShowLoadMask="true" Timeout="900000000" />
						</AjaxEvents>
					</TS:MenuItem>
				</Menu>
			</TS:Button>
			<TS:Spacer ID="ToolBarSpacer_1" runat="server" StripeVisible="true" />
			<TS:Button ID="AddNewProcessUserTaskItem" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Add.Caption" Enabled="false">
				<AjaxEvents>
					<Click OnClientEvent="onAddItemButtonClick();" />
				</AjaxEvents>
				<Menu>
					<TS:MenuItem runat="server" ID="AddParameterMenuItem" Caption="@Terrasoft.WebApp,ProcessUserTaskSchemaDesigner.Add.Parameter.Caption">
						<AjaxEvents>
							<Click OnClientEvent="onAddParameter();" />
						</AjaxEvents>
					</TS:MenuItem>
					<TS:MenuItem runat="server" ID="AddMethodMenuItem" Caption="@Terrasoft.WebApp,ProcessUserTaskSchemaDesigner.Add.Method.Caption">
						<AjaxEvents>
							<Click OnClientEvent="onAddMethod();" />
						</AjaxEvents>
					</TS:MenuItem>
				</Menu>
			</TS:Button>
			<TS:Button ID="DeleteProcessUserTaskItem" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Delete.Caption" Enabled="false">
				<AjaxEvents>
					<Click OnClientEvent="removeSelectedProcessUserTaskSchemaItem();" />
				</AjaxEvents>
			</TS:Button>
			<TS:Spacer ID="ToolBarSpacer" runat="server" StripeVisible="true" />
			<TS:Button ID="MoveUp" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Up.Caption" Enabled="false">
				<AjaxEvents>
					<Click OnClientEvent="MoveUpButtonClick();" />
				</AjaxEvents>
			</TS:Button>
			<TS:Button ID="MoveDown" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Down.Caption" Enabled="false">
				<AjaxEvents>
					<Click OnClientEvent="MoveDownButtonClick();" />
				</AjaxEvents>
			</TS:Button>
			<TS:Button runat="server" ID="HelpButton" ImageList="Terrasoft.WebApp" ImageAsSprite="false" CanFocus="false"
				Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:help.png}" Hidden="true" >
				<AjaxEvents>
					<Click OnClientEvent="Terrasoft.HelpContext.showHelp(null)" />
				</AjaxEvents>
			</TS:Button>
			<TS:Spacer ID="Spacer2" Size="100%" runat="server" />
			<TS:Button ID="ViewButton" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Additional.Caption">
				<Menu>
					<TS:MenuItem ID="ViewSources" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,View.Source">
						<AjaxEvents>
							<Click OnEvent="ViewSourceButtonOnClick" />
						</AjaxEvents>
					</TS:MenuItem>
					<TS:MenuItem ID="ViewMetaData" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,View.MetaData">
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
			<TS:Button runat="server" ID="PutsdHelpButton" ImageList="Terrasoft.WebApp" ImageAsSprite="true" CanFocus="false"
				Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:help.png}" Hidden="true" >
				<AjaxEvents>
					<Click OnClientEvent="Terrasoft.HelpContext.showHelp(null, 'PutsdHelpButton')" />
				</AjaxEvents>
			</TS:Button>
		</TS:ControlLayout>
		<TS:MessagePanel ID="MessagePanel" runat="server" Width="100%" />
		<TS:ControlLayout ID="ProcessUserTaskSchemaWorkArea" runat="server" Width="100%" Height="100%"
			Direction="Horizontal">
			<TS:TabPanel runat="server" ID="ProcessUserTaskSchemaTabPanel" Width="100%" Height="100%" HasSplitter="true"
				HasOptionsButton="false" Collapsible="false">
				<Tabs>
					<TS:Tab runat="server" ID="ProcessUserTaskSchemaTab"  Caption="@Terrasoft.WebApp.BaseDesigner,Schema.Caption">
						<Body>
							<TS:ControlLayout ID="ControlLayout1" runat="server" Width="100%" DisplayStyle="Topbar" Edges="0 0 1 0" Margins="1 0 0 0">
								<TS:ComboBoxEdit ID="ProcessUserTaskItemsCombobox" runat="server" Width="100%">
									<AjaxEvents>
										<Select OnClientEvent="onProcessUserTaskItemsComboboxSelect(el, record, index);" />
										<BeforeQuery OnClientEvent="onProcessUserTaskItemsComboboxBeforeQuery(queryEvent);" />
									</AjaxEvents>
								</TS:ComboBoxEdit>
							</TS:ControlLayout>
							<TS:TreeGrid Width="100%" Height="100%" ID="ProcessUserTaskSchemaGrid" runat="server" FooterVisible="False"
								ParentFieldName="ParentId" SelectionMode="SingleRow" EnableInnerDragDrop="true" ImageList="Terrasoft.WebApp"
								AllowRootChildren="false" HideHeaders="true" DataSourceId="ProcessUserTaskSchemaDataSource" QuickViewMode="None"
								AutoLayout="true" AutoScroll="true" ShowAutoWidthMenu="false" ShowMultiLineMenu="false" ContextMenuId="ProcessUserTask_Menu"
								ShowSummariesMenu="false" HideRowBorders="true" StripeRows="false" HasSplitter="true">
								<AjaxEvents>
									<NodesDrop OnClientEvent="onProcessUserTaskSchemaTreeNodeDragDrop(nodes, targetNode, parentNode, movePosition)" />
									<NodeDragOver OnClientEvent="onProcessUserTaskSchemaTreeNodeDragOver(overEvent)" />
								</AjaxEvents>
							</TS:TreeGrid>
						</Body>
					</TS:Tab>
				</Tabs>
			</TS:TabPanel>
			<TS:ControlLayout ID="PropertiesControlLayout" runat="server" Width="40%" Height="100%">
				<TS:TabPanel ID="PropertiesPanel" runat="server" Width="100%" Height="40%" HasOptionsButton="false" Collapsible="false">
					<Tabs>
						<TS:Tab ID="PropertiesTab" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,ObjectInspector.Caption">
							<Body>
								<TS:ObjectInspector runat="server" Width="100%" Height="100%" ID="objectInspector"
									PropertiesDataSourceId="PropertiesDataSource" ViewButtonsMode="None">
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
