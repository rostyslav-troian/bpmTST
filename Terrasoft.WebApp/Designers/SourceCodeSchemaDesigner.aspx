<%@ Page Language="C#" Caption="@Terrasoft.WebApp,SourceCodeSchemaDesigner.Caption"
	CodeBehind="SourceCodeSchemaDesigner.aspx.cs" Inherits="Terrasoft.WebApp.Designers.SourceCodeSchemaDesigner" %>

<%@ Register TagPrefix="UC" TagName="ObjectInspectorUserControl" Src="~/Templates/UserControls/ObjectInspectorUserControl.ascx" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title></title>
</head>
<body>
	<form id="htmlForm" runat="server">
	<TS:ScriptManager ID="ScriptManager" runat="server" AjaxViewStateMode="Include">
	</TS:ScriptManager>
	<TS:VirtualDataSource ID="SourceCodeSchemaDataSource" runat="server">
		<AjaxEvents>
			<ActiveRowChanged OnClientEvent="onSchemaDataSourceActiveRowChanged(dataSource, primaryColumnValue);" />
		</AjaxEvents>
	</TS:VirtualDataSource>
	<TS:VirtualDataSource ID="SourceCodeLogDataSource" runat="server">
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
	<TS:Menu runat="server" ID="SourceCode_Menu">
		<Items>
			<TS:MenuItem runat="server" ID="AddMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Add.Caption"
				Enabled="false" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:common-icon-add.png}">
				<AjaxEvents>
					<Click OnClientEvent="onAddItemButtonClick();" />
				</AjaxEvents>
			</TS:MenuItem>
			<TS:MenuItem runat="server" ID="DeleteMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Delete.Caption"
				Enabled="false" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:common-icon-delete.png}">
				<AjaxEvents>
					<Click OnClientEvent="removeSelectedSourceCodeSchemaItem();" />
				</AjaxEvents>
			</TS:MenuItem>
			<TS:MenuSeparator runat="server" ID="SeparatorMenuItem" />
			<TS:MenuItem runat="server" ID="MoveUpMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Up.Caption"
				Enabled="false" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:entityschemadesigner-menu-upitem.png}">
				<AjaxEvents>
					<Click OnClientEvent="MoveUpButtonClick();" />
				</AjaxEvents>
			</TS:MenuItem>
			<TS:MenuItem runat="server" ID="MoveDownMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Down.Caption"
				Enabled="false" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:entityschemadesigner-menu-downitem.png}">
				<AjaxEvents>
					<Click OnClientEvent="MoveDownButtonClick();" />
				</AjaxEvents>
			</TS:MenuItem>
		</Items>
	</TS:Menu>
	<UC:ObjectInspectorUserControl ID="PropertiesWindow" runat="server" />
	<TS:SourceCodeSchemaDesignModeManager runat="server" ID="DesignModeManager" SchemaDataSourceId="SourceCodeSchemaDataSource"
		PropertyDataSourceId="PropertiesDataSource" SettingsDataSourceId="SettingsDataSource">
		<AjaxEvents>
			<PropertyChanged OnClientEvent="onPropertyChanged(itemId, propertyName, propertyValue);"></PropertyChanged>
		</AjaxEvents>
	</TS:SourceCodeSchemaDesignModeManager>
	<TS:ControlLayout ID="MainPanel" runat="server" Width="100%" Height="100%" IsViewPort="true"
		Padding="5" HelpContextId="399">
		<TS:ControlLayout ID="ToolBar" runat="server" Width="100%" Height="100%" DisplayStyle="Topbar"
			Margins="0 0 4 0">
			<TS:Button ID="SaveButton" runat="server" Image="{Source: ResourceManager, ResourceManagerName:Terrasoft.WebApp.BaseDesigner, ResourceItemName: commondesigner-save.png}">
				<AjaxEvents>
					<Click Success="validateSources();" OnEvent="SaveButtonOnClick" ShowLoadMask="true" />
				</AjaxEvents>
				<Menu>
					<TS:MenuItem ID="Save" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Save.WithoutVerification"
						Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp.BaseDesigner, ResourceItemName:commondesigner-save.png}">
						<AjaxEvents>
							<Click Success="validateSources();" OnEvent="SaveButtonOnClick" ShowLoadMask="true" />
						</AjaxEvents>
					</TS:MenuItem>
					<TS:MenuItem ID="SaveWithWerification" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Save.WithVerification"
						Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp.BaseDesigner, ResourceItemName:commondesigner-savewithverification.png}">
						<AjaxEvents>
							<Click Success="validateSources();" OnEvent="SaveWithVerificationOnClick" ShowLoadMask="true" Timeout="900000000" />
						</AjaxEvents>
					</TS:MenuItem>
				</Menu>
			</TS:Button>
			<TS:Spacer runat="server" StripeVisible="true">
			</TS:Spacer>
			<TS:Button ID="DeleteSourceCodeItem" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Delete.Caption"
				Enabled="false">
				<AjaxEvents>
					<Click OnClientEvent="removeSelectedSourceCodeSchemaItem();" ShowLoadMask="true" />
				</AjaxEvents>
			</TS:Button>
			<TS:Spacer ID="ToolBarSpacer" runat="server" StripeVisible="true" />
			<TS:Button ID="MoveUp" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Up.Caption"
				Enabled="false">
				<AjaxEvents>
					<Click OnClientEvent="MoveUpButtonClick();" />
				</AjaxEvents>
			</TS:Button>
			<TS:Button ID="MoveDown" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Down.Caption"
				Enabled="false">
				<AjaxEvents>
					<Click OnClientEvent="MoveDownButtonClick();" />
				</AjaxEvents>
			</TS:Button>
			<TS:Button runat="server" ID="HelpButton" ImageList="Terrasoft.WebApp" ImageAsSprite="false"
				CanFocus="false" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:help.png}"
				Enabled="false" Hidden="true">
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
			<TS:Button runat="server" ID="PutsdHelpButton" ImageList="Terrasoft.WebApp" ImageAsSprite="true" CanFocus="false"
				Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:help.png}" Hidden="false" >
			</TS:Button>
		</TS:ControlLayout>
		<TS:MessagePanel ID="MessagePanel" runat="server" Hidden="true" Width="100%" />
		<TS:ControlLayout ID="SourceCodeSchemaDesignerScrollPanel" runat="server" Width="100%"
			Height="100%" Direction="Horizontal">
			<TS:MessagePanel runat="server" Width="100%" Margins="0 0 10 0" />
			<TS:TabPanel runat="server" ID="SourcePanel" Width="100%" Height="100%" HasSplitter="true"
				HasOptionsButton="false" CollapseMode="CurrentItem" Closeable="false" Collapsible="false">
				<AjaxEvents>
					<BeforeTabChange OnClientEvent="onEditTabPanelBeforeTabChange(el, newTab, currentTab);" ShowOpaqueMask="true" />
				</AjaxEvents>
				<Tabs>
					<TS:Tab runat="server" ID="SourceTab" Caption="@Terrasoft.WebApp.BaseDesigner,SourceArea.Caption">
						<Body>
							<TS:ControlLayout runat="server" Width="100%" Height="100%">
								<TS:SilverlightContainer ID="CodeSyntaxMemoEdit" Width="100%" Height="100%" runat="server"
									Source="/ClientBin/Terrasoft.UI.WindowsControls.SyntaxMemo.xap">
									<ScriptableEvents>
										<TS:SilverlightScriptableEvent Name="FocusChanged" />
									</ScriptableEvents>
									<AjaxEvents>
										<CustomEvent OnClientEvent="processCodeCustomEvents(sender, args)" />
									</AjaxEvents>
								</TS:SilverlightContainer>
							</TS:ControlLayout>
						</Body>
					</TS:Tab>
				</Tabs>
			</TS:TabPanel>
			<TS:ControlLayout ID="Properties" runat="server" Width="300px" Height="100%">
				<TS:TabPanel ID="SourceCodeTreePanel" runat="server" Width="100%" Height="60%" HasSplitter="true"
					HasOptionsButton="false" Collapsible="true">
					<Tabs>
						<TS:Tab ID="SourceCodeTreeTab" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Schema.Caption">
							<Body>
								<TS:ControlLayout runat="server" Width="100%" DisplayStyle="Topbar" Edges="0 0 1 0"
									Margins="1 0 0 0">
									<TS:ComboBoxEdit ID="SourceCodeCombobox" runat="server" Width="100%" Sorted="true">
									<AjaxEvents>
										<Select OnClientEvent="onSourceCodeItemsComboboxSelect(el, record, index);" />
										<BeforeQuery OnClientEvent="onSourceCodeItemsComboboxBeforeQuery(queryEvent);" />
									</AjaxEvents>
									</TS:ComboBoxEdit>
								</TS:ControlLayout>
								<TS:TreeGrid ID="SourceCodeGrid" runat="server" ToolbarVisible="false" Width="100%"
									Height="100%" EnableInnerDragDrop="true" FooterVisible="false" HideRowBorders="true"
									ImageList="Terrasoft.WebApp" HideHeaders="true" ShowAutoWidthMenu="false" QuickFilterVisible="false"
									ShowMultiLineMenu="false" ShowSummariesMenu="false" StripeRows="false" QuickViewMode="None"
									DataSourceId="SourceCodeSchemaDataSource" ContextMenuId="SourceCode_Menu">
									<AjaxEvents>
										<BeforeNodesDrop OnClientEvent="onPageSchemaControlsTreeBeforeNodesDrop(dropEvent)" />
										<NodesDrop OnClientEvent="Terrasoft.AjaxMethods.ControlTreeOnNodesDrop(nodes,targetNode,parentNode,movePosition)" />
										<NodeDragOver OnClientEvent="function(overEvent) {}" />
									</AjaxEvents>
								</TS:TreeGrid>
							</Body>
						</TS:Tab>
						<TS:Tab ID="SourceCodeLogTab" runat="server" Caption="@Terrasoft.WebApp.SourceCodeSchemaDesigner,SourceCodeLog.SourceCodeLogGrid.Caption" Hidden="True">
							<Body>
								<TS:TreeGrid ID="SourceCodeLogGrid" runat="server" ToolbarVisible="false" Width="100%"
									Height="100%" FooterVisible="false" HideRowBorders="true" ImageList="Terrasoft.WebApp" HideHeaders="false" ShowAutoWidthMenu="True" QuickFilterVisible="false"
									ShowMultiLineMenu="false" ShowSummariesMenu="false" AutoScroll="True" StripeRows="false" QuickViewMode="None" DataSourceId="SourceCodeLogDataSource">
									<AjaxEvents>
										<DblClick OnClientEvent="onSourceCodeLogGridDblClick();" StopEvent="True" StopPropagation="True" PreventDefault="True"></DblClick>
									</AjaxEvents>
								</TS:TreeGrid>
							</Body>
						</TS:Tab>
					</Tabs>
				</TS:TabPanel>
				<TS:TabPanel ID="PropertiesPanel" runat="server" Width="100%" Height="40%" HasOptionsButton="false"
					Collapsible="true">
					<Tabs>
						<TS:Tab ID="PropertiesTab" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,ObjectInspector.Caption">
							<Body>
								<TS:ObjectInspector runat="server" Width="100%" Height="100%" ID="objectInspector"
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
