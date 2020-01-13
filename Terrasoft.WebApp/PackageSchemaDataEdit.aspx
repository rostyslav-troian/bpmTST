<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PackageSchemaDataEdit.aspx.cs"
	Inherits="Terrasoft.WebApp.PackageSchemaDataEdit" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="PageHead" runat="server">
	<title></title>
	<script type="text/javascript">

		function onUnload() {
			Ext.EventManager.un(window, 'beforeunload', onUnload);
		}

		function onSchemaComboBoxEditQuery() {
			if (SchemaComboBoxEdit.isProcessing === true) {
				return false;
			}
			if (SchemaComboBoxEdit.listLoaded !== true) {
				SchemaComboBoxEdit.isProcessing = true;
				Terrasoft.AjaxMethods.OnSchemaComboBoxEditQuery();
				return false;
			}
		};

		function onPackageSchemaDataColumnsChanged() {
			Ext.EventManager.un(this, 'beforeunload', onPackageSchemaDataColumnsChanged);
			Terrasoft.AjaxMethods.PackageSchemaDataColumnsChanged();
		}

	</script>
</head>
<body>
	<form id="MainHtmlForm" runat="server">
		<TS:ScriptManager ID="ScriptManager" runat="server" scriptmode="Debug" AjaxViewStateMode="Include" />
		<TS:EntityDataSource ID="DataEntityDataSource" runat="server">
		</TS:EntityDataSource>
		<TS:VirtualDataSource ID="SchemaDataVirtualDataSource" runat="server">
		</TS:VirtualDataSource>
		<TS:VirtualDataSource ID="SchemaColumnVirtualDataSource" runat="server">
		</TS:VirtualDataSource>
		<TS:HiddenField runat="server" ID="PackageSchemaDataIdHidden"></TS:HiddenField>

		<TS:ControlLayout ID="ControlLayout2" runat="server" IsViewPort="true" Direction="Vertical" Height="100%" Width="100%">
			<TS:ControlLayout ID="ControlLayout1" runat="server" Width="100%" Height="100%" DisplayStyle="Controls">
				<TS:MessagePanel ID="MessagePanel" runat="server" Width="100%" Margins="0 0 10 0" />
				<TS:ControlLayout ID="ControlLayout5" runat="server" Width="100%" Height="100%" Padding="5" Direction="Horizontal">
					<TS:TabPanel runat="server" ID="PackageSchemaDataTabPanel" Width="100%" Height="100%" HasSplitter="true"
						CollapseMode="CurrentItem" Collapsible="true" UseProfile="false">
						<Tabs>
							<TS:Tab runat="server" ID="Properties" ShowMenuItemCaption="true" Caption="@Terrasoft.WebApp,PackageSchemaDataEdit.PropertiesTab.Caption">
								<Body>
									<TS:ControlLayout ID="MainControlLayout" runat="server" Height="100%" Width="100%">
										<TS:ControlLayout ID="TopControlLayout" runat="server" Width="100%" Height="100%"
											Direction="Horizontal">
											<TS:ControlLayout ID="LeftControlLayout" runat="server" Width="40%" Height="100%" DisplayStyle="Controls"
												Direction="Vertical" HasSplitter="true" CollapseMode="CurrentItem" Padding="5 0 5 5">
												<TS:ControlLayout ID="SchemaControlLayout" runat="server" Width="100%" Height="75"
													DisplayStyle="Controls">
													<TS:TextEdit ID="NameTextEdit" runat="server" Required="True" Width="100%"
														Caption="@Terrasoft.WebApp,PackageSchemaDataEdit.Name.Caption">
													</TS:TextEdit>
													<TS:ComboBoxEdit ID="SchemaComboBoxEdit" runat="server" AllowEmpty="false" Required="true"
														Caption="@Terrasoft.WebApp,PackageSchemaDataEdit.ListSchemas.Caption" Width="100%">
														<AjaxEvents>
															<BeforeQuery OnClientEvent="onSchemaComboBoxEditQuery()" />
															<Select OnClientEvent="onConfirmSaveAndContinue(function(){Terrasoft.AjaxMethods.PackageSchemaChanged();})" />
														</AjaxEvents>
													</TS:ComboBoxEdit>
													<TS:ComboBoxEdit ID="InstallTypeComboBoxEdit" runat="server" AllowEmpty="false" Required="true"
														Caption="@Terrasoft.WebApp,PackageSchemaDataEdit.TypeInstall.Caption" Width="100%">
													</TS:ComboBoxEdit>
												</TS:ControlLayout>
												<TS:ControlLayout ID="ColumnsControlLayout" runat="server" Width="100%" Height="100%"
													DisplayStyle="Controls" HasSplitter="true" CollapseMode="CurrentItem">
													<TS:ControlLayout ID="ColumnsButtonControlLayout" runat="server" Width="100%" AutoHeight="True"
														DisplayStyle="Topbar" Edges="0 0 0 0" Margins="0 0 5 0" Direction="Horizontal"
														Caption="@Terrasoft.WebApp,PackageSchemaDataEdit.Columns.Caption">
														<TS:Button ID="AddColumnButton" runat="server" Caption="@Terrasoft.WebApp,PackageSchemaDataEdit.AddColumn.Caption">
															<AjaxEvents>
																<Click OnClientEvent="onConfirmSaveAndContinue(function(){Terrasoft.AjaxMethods.AddColumn();})"></Click>
															</AjaxEvents>
														</TS:Button>
														<TS:Button ID="EditColumnButton" runat="server" Caption="@Terrasoft.WebApp,PackageSchemaDataEdit.EditColumn.Caption">
															<AjaxEvents>
																<Click OnEvent="OnEditColumnButtonClick" />
															</AjaxEvents>
														</TS:Button>
														<TS:Button ID="DeleteColumnButton" runat="server" Caption="@Terrasoft.WebApp,PackageSchemaDataEdit.RemoveColumn.Caption">
															<AjaxEvents>
															</AjaxEvents>
														</TS:Button>
													</TS:ControlLayout>
													<TS:TreeGrid ID="ColumnsGrid" runat="server" StripeRows="True" Height="100%" Width="100%" ImageList="Terrasoft.WebApp"
														DataSourceId="SchemaColumnVirtualDataSource" IsSummaryVisible="False" ToolbarVisible="False"
														EnableInnerDragDrop="true" DragDropGroup="VDS" QuickViewMode="None" ShowSummariesMenu="false"
														FooterVisible="false" Edges="1 1 1 1" SelectionMode="SingleRow">
														<AjaxEvents>
															<SelectionChange OnEvent="OnColumnsGridSelectionChange" />
															<DblClick OnEvent="OnEditColumnButtonClick" />
														</AjaxEvents>
													</TS:TreeGrid>
												</TS:ControlLayout>
												<TS:ControlLayout ID="FilterControlLayout" runat="server" Width="100%" Height="100%" Edges="1 1 1 1">
													<TS:FilterEdit runat="server" ID="DataFilterEdit" DataSourceId="DataEntityDataSource"
														Width="100%" Height="30%" />
												</TS:ControlLayout>
											</TS:ControlLayout>
											<TS:ControlLayout ID="DataControlLayout" runat="server" Width="60%" Height="100%"
												DisplayStyle="Controls" Margins="0 0 5 0">
												<TS:ControlLayout ID="ControlLayout6" runat="server" Width="100%"
													DisplayStyle="Controls" Margins="0 0 0 0" Direction="Horizontal" Padding="5" Height="30px">
													<TS:Button ID="PreviewDataButton" runat="server" Caption="@Terrasoft.WebApp,PackageSchemaDataEdit.PreviewData.Caption" Margins="0 5 5 5">
														<AjaxEvents>
															<Click OnEvent="OnPreviewDataButtonClick" ShowLoadMask="True" />
														</AjaxEvents>
													</TS:Button>
													<TS:ControlLayout runat="server" Width="50%" HorizontalAlign="Left" Padding="5">
														<TS:Label runat="server" ID="PackageSchemaDataRowsCountLabel" StyleSpec="margin-bottom:5px;" HorizontalAlign="Right" Bold="True" />
													</TS:ControlLayout>
												</TS:ControlLayout>
												<TS:ControlLayout ID="ControlLayout4" runat="server" Width="100%" Height="100%">
													<TS:TreeGrid ID="ResultDataGrid" runat="server" StripeRows="True" Height="100%" Width="100%"
														DataSourceId="DataEntityDataSource" IsSummaryVisible="False" EnableInnerDragDrop="true"
														DragDropGroup="VDS" QuickViewMode="None" ShowSummariesMenu="false" FooterVisible="True" Edges="1 1 1 1" Margins="5 5 5 0"
														IsShowOppositeReference="false">
													</TS:TreeGrid>
												</TS:ControlLayout>
											</TS:ControlLayout>
										</TS:ControlLayout>
									</TS:ControlLayout>
								</Body>
							</TS:Tab>
							<TS:Tab runat="server" ID="PackageSchemaData" ShowMenuItemCaption="true" Caption="@Terrasoft.WebApp,PackageSchemaDataEdit.PackageSchemaDataTab.Caption">
								<AjaxEvents>
									<Activate OnClientEvent="Terrasoft.AjaxMethods.ViewPackageSchemaData()" />
								</AjaxEvents>
								<Body>
									<TS:ControlLayout ID="ControlLayout7" runat="server" Height="100%" Width="100%">
										<TS:ControlLayout ID="ControlLayout8" runat="server" Width="100%"
											DisplayStyle="Controls" Margins="0 0 0 0" Direction="Horizontal" Padding="5" Height="30px">
											<TS:Button ID="CheckDataButton" runat="server" Caption="@Terrasoft.WebApp,PackageSchemaDataEdit.CheckData.Caption">
												<AjaxEvents>
													<Click OnEvent="OnCheckDataButtonClick" />
												</AjaxEvents>
											</TS:Button>
											<TS:ControlLayout ID="ControlLayout9" runat="server" Width="50%" HorizontalAlign="Left" Padding="5">
												<TS:Label runat="server" ID="PackageSchemaLoadedDataRowsCountLabel" StyleSpec="margin-bottom:5px;" HorizontalAlign="Right" Bold="True" />
											</TS:ControlLayout>
										</TS:ControlLayout>
										<TS:ControlLayout ID="ControlLayout10" runat="server" Width="100%" Height="100%" Padding="5">
											<TS:TreeGrid ID="SchemaDataGrid" runat="server" StripeRows="True" Height="100%" Width="100%"
												DataSourceId="SchemaDataVirtualDataSource" IsSummaryVisible="False" EnableInnerDragDrop="true"
												DragDropGroup="VDS" QuickViewMode="None" ShowSummariesMenu="false" FooterVisible="false" Edges="1 1 1 1">
											</TS:TreeGrid>
										</TS:ControlLayout>
									</TS:ControlLayout>
								</Body>
							</TS:Tab>
						</Tabs>
					</TS:TabPanel>
				</TS:ControlLayout>
			</TS:ControlLayout>
			<TS:ControlLayout ID="FooterControlLayout" runat="server" Width="100%" DisplayStyle="Footer">
				<TS:Spacer ID="FooterSpacer" runat="server" Size="100%">
				</TS:Spacer>
				<TS:Button ID="SaveButton" runat="server" Caption="@Terrasoft.WebApp,PackageSchemaDataEdit.Save.Caption">
					<AjaxEvents>
						<Click CausesValidation="true" OnClientEvent="Terrasoft.AjaxMethods.SaveData();" />
					</AjaxEvents>
				</TS:Button>
				<TS:Button ID="CancelButton" runat="server" Caption="@Terrasoft.WebApp,PackageSchemaDataEdit.Close.Caption">
					<AjaxEvents>
						<Click OnClientEvent="window.close();">
						</Click>
					</AjaxEvents>
				</TS:Button>
			</TS:ControlLayout>
		</TS:ControlLayout>
	</form>
</body>
</html>
