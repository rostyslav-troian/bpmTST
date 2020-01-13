<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PackageSqlScriptEdit.aspx.cs" Inherits="Terrasoft.WebApp.PackageSqlScriptEdit" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="PageHead" runat="server">
	<title></title>
	<script type="text/javascript">

		function onUnload() {
			Ext.EventManager.un(window, 'beforeunload', onUnload);
		}

		function loadScript(text, isReadOnly, line, column) {
			DBEngineTypeComboBoxEdit.on("change", setThemeAndLanguageByDBEngineType);
			BodySyntaxMemoEdit.on('onpluginloaded', function () {
				setThemeAndLanguageByDBEngineType();
				this.scriptableObject.SetText(text);
				this.scriptableObject.IsReadOnly = isReadOnly;
				if (line > 0) {
					this.scriptableObject.SetCaretPosition(line, column);
				}
			}, BodySyntaxMemoEdit);
		}

		function setThemeAndLanguageByDBEngineType() {
			var dbEngine = DBEngineTypeComboBoxEdit.getText();
			if (dbEngine.toLowerCase() === "mssql") {
				BodySyntaxMemoEdit.scriptableObject.SetLanguage("sqlserver");
				BodySyntaxMemoEdit.scriptableObject.setTheme("sqlserver");
			} else {
				BodySyntaxMemoEdit.scriptableObject.SetLanguage("sql");
				BodySyntaxMemoEdit.scriptableObject.setTheme("crimson_editor");
			}
		}

		function onSqlScriptSelected() {
			Ext.EventManager.un(this, 'beforeunload', onSqlScriptSelected);
			Terrasoft.AjaxMethods.NewSqlScriptSelected();
		}

	</script>
</head>
<body>
	<form id="MainHtmlForm" runat="server">
		<TS:ScriptManager ID="ScriptManager" runat="server" scriptmode="Debug" AjaxViewStateMode="Include" />
		<TS:EntityDataSource ID="SqlScriptDependOnDataSource" runat="server" SchemaUId="{59b473c1-b952-4f6c-b6e3-285cedf4f31c}"
			ManagerName="SystemEntitySchemaManager" HierarchicalDepth="-1" UseProfile="false" PageRowsCount="-1" />
		<TS:EntityDataSource ID="SqlScriptDependencyDataSource" runat="server" SchemaUId="{59b473c1-b952-4f6c-b6e3-285cedf4f31c}"
			ManagerName="SystemEntitySchemaManager" HierarchicalDepth="-1" UseProfile="false" PageRowsCount="-1" />
		<TS:ControlLayout ID="MainControlLayout" runat="server" IsViewPort="true" Height="100%" Width="100%">
			<TS:MessagePanel ID="MessagePanel" runat="server" Width="100%" Margins="0 0 10 0" />
			<TS:ControlLayout ID="TopControlLayout" runat="server" Width="100%" Height="100%" Direction="Vertical"
				DisplayStyle="Controls" Padding="5 5 5 5">
				<TS:TextEdit ID="NameTextEdit" runat="server" Required="true"
					Caption="@Terrasoft.WebApp,PackageSqlScriptEdit.Name.Caption" Width="100%" />
				<TS:ControlLayout ID="TypeControlLayout" runat="server" Width="100%" Direction="Horizontal"
					DisplayStyle="Controls" Padding="0 0 0 0">
					<TS:ComboBoxEdit ID="DBEngineTypeComboBoxEdit" runat="server" AllowEmpty="false" Required="true"
						Caption="@Terrasoft.WebApp,PackageSqlScriptEdit.DBEngineType.Caption" Width="50%">
						<AjaxEvents>
							<Select OnEvent="OnDBEngineTypeChanged" />
						</AjaxEvents>
					</TS:ComboBoxEdit>
					<TS:ComboBoxEdit ID="InstallTypeComboBoxEdit" runat="server" AllowEmpty="false" Required="true"
						Caption="@Terrasoft.WebApp,PackageSqlScriptEdit.TypeInstall.Caption" Width="50%">
						<AjaxEvents>
							<Select OnEvent="OnInstallTypeChanged" />
						</AjaxEvents>
					</TS:ComboBoxEdit>
				</TS:ControlLayout>
				<TS:SilverlightContainer ID="BodySyntaxMemoEdit" Width="100%" Height="100%" runat="server"
					Source="/ClientBin/Terrasoft.UI.WindowsControls.SyntaxMemo.xap" >
					<ScriptableEvents>
						<TS:SilverlightScriptableEvent Name="FocusChanged" />
					</ScriptableEvents>
				</TS:SilverlightContainer>
				<TS:TabPanel runat="server" ID="PackageDependencyPanel" Width="100%" Height="100%" HasSplitter="true"
					CollapseMode="CurrentItem" Collapsible="true">
					<Tabs>
						<TS:Tab runat="server" ID="DependOnTab" Caption="@Terrasoft.WebApp,PackageSqlScriptEdit.DependOnTab.Caption">
							<Body>
								<TS:ControlLayout runat="server" ID="ToolBar" DisplayStyle="Topbar" Width="100%" Edges="0 0 1 0" Margins="0 0 0 0">
									<TS:Button runat="server" ID="AddSqlScriptButton" Caption="@Terrasoft.WebApp.BaseDesigner,Add.Caption">
										<AjaxEvents>
											<Click OnEvent="OnAddSqlScriptButtonClick" />
										</AjaxEvents>
									</TS:Button>
									<TS:Button runat="server" ID="DeleteSqlScriptButton" Caption="@Terrasoft.WebApp.BaseDesigner,Delete.Caption">
										<AjaxEvents>
											<Click Before="var stringList = Ext.StringList('WebApp.Common');
												return Ext.MessageBox.ajaxEventConfirm(this,stringList.getValue('Message.Confirm'),
												stringList.getValue('Message.DeleteRecordConfirm'));"
												OnEvent="OnDeleteSqlScriptButtonClick" />
										</AjaxEvents>
									</TS:Button>
								</TS:ControlLayout>
								<TS:TreeGrid ID="SqlScriptDependOnTree" runat="server" Width="100%" Height="100%" ImageList="Terrasoft.WebApp"
									FooterVisible="true" HideHeaders="false" StripeRows="false" HideRowBorders="true" UseProfile = "false"
									StyleSpec="" DataSourceId="SqlScriptDependOnDataSource"
									EnableInnerDragDrop="false" DragDropGroup="SchemasDD">
									<AjaxEvents>
										<SelectionChange OnEvent="OnSqlScriptGridSelectionChange" />
									</AjaxEvents>
								</TS:TreeGrid>
							</Body>
						</TS:Tab>
						<TS:Tab runat="server" ID="DependencyTab" Caption="@Terrasoft.WebApp,PackageSqlScriptEdit.DependencyTab.Caption">
							<Body>
								<TS:TreeGrid ID="SqlScriptDependencyTree" runat="server" Width="100%" Height="100%" ImageList="Terrasoft.WebApp"
									FooterVisible="true" HideHeaders="false" StripeRows="false" HideRowBorders="true" UseProfile = "false"
									StyleSpec="" DataSourceId="SqlScriptDependencyDataSource"
									EnableInnerDragDrop="false" DragDropGroup="SchemasDD">
								</TS:TreeGrid>
							</Body>
						</TS:Tab>
					</Tabs>
				</TS:TabPanel>
			</TS:ControlLayout>
			<TS:ControlLayout ID="FooterControlLayout" runat="server" Width="100%" DisplayStyle="Footer">
				<TS:Spacer ID="FooterSpacer" runat="server" Size="100%">
				</TS:Spacer>
				<TS:Button ID="ValidationButton" runat="server" Caption="@Terrasoft.WebApp,PackageSqlScriptEdit.Validate.Caption">
					<AjaxEvents>
						<Click CausesValidation="true" OnClientEvent="Terrasoft.AjaxMethods.ValidateData(BodySyntaxMemoEdit.scriptableObject.GetText());"
							Timeout="90000000" ShowLoadMask="true" ShowOpaqueMask="true" />
					</AjaxEvents>
				</TS:Button>
				<TS:Button ID="SaveButton" runat="server" Caption="@Terrasoft.WebApp,PackageSqlScriptEdit.Save.Caption">
					<AjaxEvents>
						<Click CausesValidation="true" OnClientEvent="Terrasoft.AjaxMethods.SaveData(BodySyntaxMemoEdit.scriptableObject.GetText());" />
					</AjaxEvents>
				</TS:Button>
				<TS:Button ID="CloseButton" runat="server" Caption="@Terrasoft.WebApp,PackageSqlScriptEdit.Close.Caption">
					<AjaxEvents>
						<Click CausesValidation="false" OnClientEvent="Terrasoft.AjaxMethods.CloseWindow();" />
					</AjaxEvents>
				</TS:Button>
			</TS:ControlLayout>
		</TS:ControlLayout>
	</form>
</body>
</html>
