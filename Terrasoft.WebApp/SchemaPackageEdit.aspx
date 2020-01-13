<%@ Page Language="C#" Caption="@Terrasoft.WebApp,SchemaPackageEdit.Caption" AutoEventWireup="true"
	CodeBehind="SchemaPackageEdit.aspx.cs" Inherits="Terrasoft.WebApp.SchemaPackageEdit" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<script language="javascript" type="text/javascript">

		function onSaveButtonClick() {
			if (SchemaPackageDataSource.activeRow.state == null) {
				window.close();
			}
			else if (SchemaPackageDataSource.modifiedValues || Terrasoft.Row.NEW) {
				SchemaPackageDataSource.save();
			}
			else {
				window.close();
			}
		}

		function onPackageSelected() {
			Ext.EventManager.un(this, 'beforeunload', onPackageSelected);
			Terrasoft.AjaxMethods.NewPackageSelected();
		}
	</script>
</head>
<body>
	<form id="form1" runat="server">
	<TS:ScriptManager ID="ScriptManager" runat="server" AjaxViewStateMode="Include" />
	<TS:EntityDataSource ID="SchemaPackageDependOnDataSource" runat="server" SchemaUId="{16e4e4cb-df27-4968-b6aa-53fb05a4930e}"
		ManagerName="SystemEntitySchemaManager" HierarchicalDepth="-1" UseProfile = "false" PageRowsCount="-1"/>
	<TS:EntityDataSource ID="SchemaPackageDependencyDataSource" runat="server" SchemaUId="{16e4e4cb-df27-4968-b6aa-53fb05a4930e}"
		ManagerName="SystemEntitySchemaManager" HierarchicalDepth="-1" UseProfile = "false" PageRowsCount="-1"/>
	<TS:EntityDataSource ID="SchemaPackageDataSource" runat="server" SchemaUId="{CA400A85-EC48-4B42-8E50-271929D27871}"
		ManagerName="SystemEntitySchemaManager">
		<AjaxEvents>
			<Loaded OnClientEvent="SchemaPackageDataSource.setActiveRow(0);" />
			<Saved OnEvent="SchemaPackageDataSourceOnSaved">
				<ExtraParameters>
					<TS:Parameter Name="request" Value="request" Mode="Raw" />
				</ExtraParameters>
			</Saved>
		</AjaxEvents>
	</TS:EntityDataSource>
	<TS:ControlLayout ID="ControlLayout1" runat="server" IsViewPort="true" Direction="Vertical" Height="100%"
		Width="100%">
		<TS:ControlLayout ID="ControlLayout2" runat="server" Width="100%" Height="100%" Padding="5">
			<TS:ControlLayout ID="ControlLayout3" runat="server" Width="100%" Height="100%" DisplayStyle="Controls">
				<TS:TextEdit ID="NameEdit" runat="server" DataSource="SchemaPackageDataSource" ColumnName="Name"
					Required="true" Caption="@Terrasoft.WebApp,SchemaPackageEdit.Name.Caption" Width="100%" />
				<TS:IntegerEdit ID="PositionEdit" runat="server" DataSource="SchemaPackageDataSource" Width="40%"
					ColumnName="Position" Caption="@Terrasoft.WebApp,SchemaPackageEdit.Position.Caption"/>
				<TS:ControlLayout ID="RepositoryControlLayout" runat="server" Width="100%" Height="27px" DisplayStyle="Controls" Direction="Horizontal">
					<TS:ComboBoxEdit ID="RootRepositoryComboBox" runat="server" AllowEmpty="false" Width="80%" Visible="False"
						Required="true" Caption="@Terrasoft.Core,SysPackageSchema.Columns.SysRepository.Caption">
						<AjaxEvents>
							<Select OnEvent="RootRepositoryComboBoxValueChanged" />
						</AjaxEvents>
					</TS:ComboBoxEdit>
					<TS:TextEdit ID="VersionEdit" runat="server" DataSource="SchemaPackageDataSource" ColumnName="Version"
						Caption="@Terrasoft.WebApp,SchemaPackageEdit.Version.Caption" Width="20%" />
				</TS:ControlLayout>
				<TS:MemoEdit ID="Description" runat="server" DataSource="SchemaPackageDataSource" ColumnName="Description"
					Caption="@Terrasoft.WebApp,SchemaPackageEdit.Additional.Caption" Width="100%"
					Height="50px" />
				<TS:ControlLayout ID="ControlLayout5" runat="server" Width="100%" Height="100%" Padding="5" Direction="Horizontal">
					<TS:TabPanel runat="server" ID="PackageDependencyPanel" Width="100%" Height="100%" HasSplitter="true"
						CollapseMode="CurrentItem" Collapsible="true">
					<Tabs>
						<TS:Tab runat="server" ID="PackageDependTab" Caption="@Terrasoft.WebApp,SchemaPackageEdit.DependOnTab.Caption">
							<Body>
								<TS:ControlLayout runat="server" ID="ToolBar" DisplayStyle="Topbar" Width="100%" Edges="0 0 1 0" Margins="0 0 0 0">
									<TS:Button runat="server" ID="AddPackageButton" Caption="@Terrasoft.WebApp.BaseDesigner,Add.Caption">
										<AjaxEvents>
											<Click OnEvent="OnAddPackageButtonClick" />
										</AjaxEvents>
									</TS:Button>
									<TS:Button runat="server" ID="DeletePackageButton" Caption="@Terrasoft.WebApp.BaseDesigner,Delete.Caption">
										<AjaxEvents>
											<Click Before="var stringList = Ext.StringList('WebApp.Common');return Ext.MessageBox.ajaxEventConfirm(this,stringList.getValue('Message.Confirm'),stringList.getValue('Message.DeleteRecordConfirm'));"
												OnEvent="OnDeletePackageButtonClick" ShowLoadMask="true" Timeout="9000000"/>
										</AjaxEvents>
									</TS:Button>
								</TS:ControlLayout>
								<TS:TreeGrid ID="PackageDependOnTree" runat="server" Width="100%" Height="100%" ImageList="Terrasoft.WebApp"
									FooterVisible="true" HideHeaders="false" StripeRows="false" HideRowBorders="true"
									StyleSpec="" DataSourceId="SchemaPackageDependOnDataSource"
									EnableInnerDragDrop="false" DragDropGroup="SchemasDD">
									<AjaxEvents>
										<SelectionChange OnEvent="OnSchemaGridSelectionChange" />
									</AjaxEvents>
								</TS:TreeGrid>
							</Body>
						</TS:Tab>
						<TS:Tab runat="server" ID="Tab1" Caption="@Terrasoft.WebApp,SchemaPackageEdit.DependencyTab.Caption">
							<Body>
								<TS:TreeGrid ID="PackageDependencyTree" runat="server" Width="100%" Height="100%" ImageList="Terrasoft.WebApp"
									FooterVisible="true" HideHeaders="false" StripeRows="false" HideRowBorders="true"
									StyleSpec="" DataSourceId="SchemaPackageDependencyDataSource"
									EnableInnerDragDrop="false" DragDropGroup="SchemasDD">
								</TS:TreeGrid>
							</Body>
						</TS:Tab>
					</Tabs>
				</TS:TabPanel>
				</TS:ControlLayout>
			</TS:ControlLayout>
		</TS:ControlLayout>
		<TS:ControlLayout ID="ControlLayout4" runat="server" Width="100%" DisplayStyle="Footer">
			<TS:Spacer ID="Spacer1" runat="server" Size="100%" />
			<TS:Button ID="SavePackageButton" runat="server" Caption="@Terrasoft.UI.WebControls,CloseResult.Ok">
				<AjaxEvents>
					<Click CausesValidation="false" OnClientEvent="onSaveButtonClick();" />
				</AjaxEvents>
			</TS:Button>
			<TS:Button ID="btnCancel" runat="server" Caption="@Terrasoft.UI.WebControls,CloseResult.Cancel">
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
