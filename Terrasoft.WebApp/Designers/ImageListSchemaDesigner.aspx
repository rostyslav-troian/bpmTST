<%@ Page Language="C#" Caption="@Terrasoft.WebApp,ImageListSchemaDesigner.Caption"  CodeBehind="ImageListSchemaDesigner.aspx.cs"
	Inherits="Terrasoft.WebApp.Designers.ImageListSchemaDesigner" %>

<%@ Register TagPrefix="UC" TagName="ObjectInspectorUserControl" Src="~/Templates/UserControls/ObjectInspectorUserControl.ascx" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title></title>
	
	<script language="javascript" type="text/javascript">

		function onSchemaDataSourceActiveRowChanged(dataSource, primaryColumnValue) {
			var activeRow = dataSource.getRow(primaryColumnValue);
			if (activeRow) {
				var controlId = activeRow.getColumnValue('ClientId');
				DesignModeManager.onItemSelect('', controlId);
				ImagesGrid.selectNodeById(primaryColumnValue);
				ImagesGrid.setActiveNodeById(primaryColumnValue);
				ImagesCombobox.setRawValue(activeRow.getColumnValue('Caption'));
			}
		}

		function onPropertiesDataSourceLoaded(dataSource,dataArray,request) {
			PropertiesDataSource.setActiveRow(0);
		}

		function onPropertiesDataSourceStructureLoaded(dataSource) {
			if (DesignModeManager.isCurrentItemResponse) {
				var descriptor = DesignModeManager.getCurrentItemDescriptor();
				ObjectInspector.rebuild(descriptor);
			}
		}

		function onSettingsDataSourceLoaded(dataSource,dataArray,request) {
			SettingsDataSource.setActiveRow(0);
		}

		function onObjectInspectorDesignModeUsageTypeChange(designModeUsageType) {
			DesignModeManager.setUsageType(designModeUsageType);
			var descriptor = DesignModeManager.getCurrentItemDescriptor();
			ObjectInspector.rebuild(descriptor);
		}

		function removeSelectedImageListSchemaItem() {
			var selNodeId = ImagesGrid.selModel.selNodes[0].id;
			var row = ImageListSchemaDataSource.getRow(selNodeId);
			var itemUId = row.getColumnValue('UId');
			var parentItemId = row.getColumnValue('ParentId');
			DesignModeManager.removeItem(itemUId, parentItemId, null);
		}

		function MoveUpButtonClick() {
			MoveItem(true);
		}

		function MoveDownButtonClick() {
			MoveItem(false);
		}

		function MoveItem(isMoveUp) {
			var selectedNodeId = ImagesGrid.getSelectionModel().selNodes[0].id;
			var primaryColumnValue = ImagesGrid.dataSource.getPrimaryColumnValue();
			var row = ImageListSchemaDataSource.getRow(selectedNodeId);
			var itemUId = row.getColumnValue('UId');
			var parentItemId = row.getColumnValue('ParentId');
			var position = row.index() - 1;
			var newPosition;
			if (isMoveUp == true) {
				newPosition = position - 1;
			} else {
				newPosition = position + 1;
			}
			DesignModeManager.onBeforeControlMove(parentItemId, itemUId, newPosition);
		}

		function onPageSchemaControlsTreeBeforeNodesDrop(dropEvent) {
			DesignModeManager.unselectItems();
			return dropEvent.customDrop = true;
		}

		function onImagesComboboxSelect(control, recordParameter, index) {
			var record = Ext.decode(recordParameter);
			var id = record.value;
			DesignModeManager.selectItem(null, id);
		}

		function onImagesComboboxBeforeQuery(queryEvent) {
			var control = queryEvent.combo;
			var itemList = getImagesListBySchemaDataSource(ImageListSchemaDataSource);
			control.store.setDefaultSort('text');
			control.loadData(itemList);
		}

		function getImagesListBySchemaDataSource(ImageListSchemaDataSource) {
			var controlsList = new Array();
			for (var i = 0; i < ImageListSchemaDataSource.rows.length; i++) {
				var record = ImageListSchemaDataSource.rows.items[i];
				var nodeType = record.getColumnValue("NodeType");
				var typeName = record.getColumnValue("TypeName");
				var control = new Array();
				control.push(record.getColumnValue("ClientId"));
				control.push(record.getColumnValue("Caption"));
				controlsList.push(control);
			}
			return controlsList;
		}

		function OnApplySettings() {
			DesignModeManager.onSettingChanged(Ext.encode(DesignModeManager.changedSettings));
		}

		function actualizeImagesCombobox(value) {
			ImagesCombobox.setRawValue(value);
		}

	</script>

</head>
<body>
	<form id="htmlForm" runat="server">
	<TS:ScriptManager ID="ScriptManager" runat="server" AjaxViewStateMode="Include">
	</TS:ScriptManager>
	<TS:VirtualDataSource ID="ImageListSchemaDataSource" runat="server">
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
	<TS:Menu ID="VisualDesignerActionMenu" runat="server">
		<Items>
			<TS:MenuItem ID="AddMenuItem" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Add.Caption"
				Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:common-icon-add.png}">
				<AjaxEvents>
					<Click OnEvent="AddNewItem" />
				</AjaxEvents>
			</TS:MenuItem>
			<TS:MenuItem ID="DeleteMenuItem" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Delete.Caption" Enabled="false"
				Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:common-icon-delete.png}">
				<AjaxEvents>
					<Click OnClientEvent="removeSelectedImageListSchemaItem();" />
				</AjaxEvents>
			</TS:MenuItem>
			<TS:MenuSeparator ID="MenuSeparator" runat="server" />
			<TS:MenuItem ID="UpMenuItem" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Up.Caption" Enabled="false"
				Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:entityschemadesigner-menu-upitem.png}">
				<AjaxEvents>
					<Click OnClientEvent="MoveUpButtonClick();" />
				</AjaxEvents>
			</TS:MenuItem>
			<TS:MenuItem ID="DownMenuItem" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Down.Caption" Enabled="false"
				Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:entityschemadesigner-menu-downitem.png}">
				<AjaxEvents>
					<Click OnClientEvent="MoveDownButtonClick();" />
				</AjaxEvents>
			</TS:MenuItem>
		</Items>
	</TS:Menu>

	<UC:ObjectInspectorUserControl ID="PropertiesWindow" runat="server" />
	<TS:ImageListSchemaDesignModeManager runat="server" ID="DesignModeManager" SchemaDataSourceId="ImageListSchemaDataSource"
		PropertyDataSourceId="PropertiesDataSource" SettingsDataSourceId="SettingsDataSource" OnSchemaChanged="DesignModeManager_OnSchemaChanged">
	</TS:ImageListSchemaDesignModeManager>

	<TS:ControlLayout ID="MainPanel" runat="server" Width="100%" Height="100%" IsViewPort="true" Padding="5" HelpContextId="399">
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
			<TS:Spacer runat="server" StripeVisible="true">
			</TS:Spacer>
			<TS:Button ID="AddNewImageListItem" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Add.Caption">
				<AjaxEvents>
					<Click OnEvent="AddNewItem" ShowLoadMask="true" />
				</AjaxEvents>
			</TS:Button>
			<TS:Button ID="DeleteImageListItem" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Delete.Caption" Enabled="false">
				<AjaxEvents>
					<Click OnClientEvent="removeSelectedImageListSchemaItem();" ShowLoadMask="true" />
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
				Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:help.png}" Enabled="false" Hidden="true" >
			</TS:Button>
			<TS:Spacer Size="100%" runat="server" />
			<TS:Button ID="ViewButton" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Additional.Caption">
				<Menu>
					<TS:MenuItem ID="ViewSources" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,View.Source">
						<AjaxEvents>
							<Click OnEvent="ViewSourceButtonOnClick" />
						</AjaxEvents>
					</TS:MenuItem>
					<TS:MenuItem ID="ViewMetadata" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,View.MetaData">
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
			<TS:Button runat="server" ID="IlsdHelpButton" ImageList="Terrasoft.WebApp" ImageAsSprite="true" CanFocus="false"
				Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:help.png}" Hidden="true" >
			</TS:Button>
		</TS:ControlLayout>
		<TS:MessagePanel ID="MessagePanel" runat="server" Width="100%" />
		<TS:ControlLayout ID="ImageListSchemaDesignerScrollPanel" runat="server"
			Width="100%" Height="100%" Direction="Horizontal">
			<TS:ControlLayout ID="ScrollControlLayout" runat="server" AutoScroll="true"
				Height="100%" Width="100%" HasSplitter="true" Edges="1 1 1 1">
				<TS:ControlLayout ID="IlsdImageListSchema" runat="server" Width="100%" DefaultMargins="10 0 0 0" FitHeightByContent="true"
					HorizontalAlign="Center">
				</TS:ControlLayout>
			</TS:ControlLayout>
			<TS:ControlLayout ID="Properties" runat="server" Width="300px" Height="100%">
				<TS:TabPanel ID="ImageTreePanel" runat="server" Width="100%" Height="60%" HasSplitter="true"
					HasOptionsButton="false" Collapsible="true">
					<Tabs>
						<TS:Tab ID="ImageTreeTab" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Schema.Caption">
							<Body>
								<TS:ControlLayout runat="server" Width="100%" DisplayStyle="Topbar" Edges="0 0 1 0" Margins="1 0 0 0">
									<TS:ComboBoxEdit ID="ImagesCombobox" runat="server" Width="100%" Sorted="true">
									<AjaxEvents>
										<Select OnClientEvent="onImagesComboboxSelect(el, record, index);" />
										<BeforeQuery OnClientEvent="onImagesComboboxBeforeQuery(queryEvent);" />
									</AjaxEvents>
									</TS:ComboBoxEdit>
								</TS:ControlLayout>
								<TS:TreeGrid ID="ImagesGrid" runat="server" ToolbarVisible="false" Width="100%" Height="100%"
									EnableInnerDragDrop="true" FooterVisible="false" HideRowBorders="true" ImageList="Terrasoft.WebApp"
									HideHeaders="true" ShowAutoWidthMenu="false" QuickFilterVisible="false"
									ShowMultiLineMenu="false" ShowSummariesMenu="false" StripeRows="false"
									QuickViewMode="None" DataSourceId="ImageListSchemaDataSource" ContextMenuId="VisualDesignerActionMenu">
									<AjaxEvents>
										<BeforeNodesDrop OnClientEvent="onPageSchemaControlsTreeBeforeNodesDrop(dropEvent)" />
										<NodesDrop OnClientEvent="Terrasoft.AjaxMethods.ControlTreeOnNodesDrop(nodes,targetNode,parentNode,movePosition)" />
										<NodeDragOver OnClientEvent="function(overEvent) {}" />
									</AjaxEvents>
								</TS:TreeGrid>
							</Body>
						</TS:Tab>
					</Tabs>
				</TS:TabPanel>
				<TS:TabPanel ID="PropertiesPanel" runat="server" Width="100%" Height="40%" HasOptionsButton="false" Collapsible="true">
					<Tabs>
						<TS:Tab ID="PropertiesTab" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,ObjectInspector.Caption">
							<Body>
								<TS:ObjectInspector runat="server" Width="100%" Height="100%" ID="ObjectInspector"
									ViewButtonsMode="None" PropertiesDataSourceId="PropertiesDataSource">
									<AjaxEvents>
										<EventEditorRequest OnClientEvent="onObjectInspectorEventEditorRequest(eventName);" />
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