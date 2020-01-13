<%@ Page Language="C#" Caption="@Terrasoft.WebApp,DeployPackagePage.Caption" AutoEventWireup="true"
	CodeBehind="DeployPackagePage.aspx.cs" Inherits="Terrasoft.WebApp.DeployPackagePage" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
	<title></title>
	<script type="text/javascript">

		function onActionPageClose() {
			Ext.EventManager.un(this, 'beforeunload', onActionPageClose);
			window.close();
		}

	</script>
</head>
<body>
	<form id="form1" runat="server">
	<TS:ScriptManager ID="ScriptManager" runat="server" AjaxViewStateMode="Include" />
	<TS:ControlLayout ID="ControlLayout1" runat="server" IsViewPort="true" Direction="Vertical" Height="100%"
		Width="100%">
		<TS:MessagePanel ID="MessagePanel" runat="server" Hidden="true" Width="100%" />
		<TS:ControlLayout ID="ControlLayout2" runat="server" Width="100%" Height="100%" Padding="5">
			<TS:ControlLayout ID="ControlLayout3" runat="server" Width="100%" Height="100%" DisplayStyle="Controls">
				<TS:ComboBoxEdit ID="RootRepositoryComboBox" runat="server" AllowEmpty="false" Width="100%"
					Visible="true" Required="true"
					Caption="@Terrasoft.Core,SysPackageSchema.Columns.SysRepository.Caption">
					<AjaxEvents>
						<Select OnEvent="OnRootRepositoryComboBoxValueChanged" />
					</AjaxEvents>
				</TS:ComboBoxEdit>
				<TS:ComboBoxEdit ID="PackageNameComboBox" runat="server" Width="100%" Visible="true" Required="true"
					Caption="@Terrasoft.WebApp,DeployPackagePage.Name.Caption">
					<AjaxEvents>
						<Select OnEvent="OnRootPackageNameComboBoxValueChanged" />
					</AjaxEvents>
				</TS:ComboBoxEdit>
				<TS:ComboBoxEdit ID="VersionComboBox" runat="server" Width="100%" Visible="true" Required="true"
					Caption="@Terrasoft.WebApp,SchemaPackageEdit.Version.Caption" />
			</TS:ControlLayout>
		</TS:ControlLayout>
		<TS:ControlLayout ID="ControlLayout4" runat="server" Width="100%" DisplayStyle="Footer">
			<TS:Button ID="OpenRepositories" runat="server"
				Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.OpenRepositories.Caption">
				<AjaxEvents>
					<Click OnClientEvent="Terrasoft.openWindow('Repositories.aspx');">
					</Click>
				</AjaxEvents>
			</TS:Button>
			<TS:Spacer ID="Spacer1" runat="server" Size="100%" />
			<TS:Button ID="DeployPackageButton" runat="server"
				Caption="@Terrasoft.WebApp,DeployPackagePage.DeployPackageButton.Caption">
				<AjaxEvents>
					<Click OnEvent="OnDeployPackageButtonClick" Timeout="9000000" ShowLoadMask="true" />
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
