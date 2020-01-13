<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PackageSchemaDataColumn.aspx.cs"
	Inherits="Terrasoft.WebApp.PackageSchemaDataColumn" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="PageHead" runat="server">
	<title></title>
	<script type="text/javascript">

		function onUnload() {
		}

		function onColumnsComboBoxEditQuery() {
			if (ColumnsComboBoxEdit.isProcessing === true) {
				return false;
			}
			if (ColumnsComboBoxEdit.listLoaded !== true) {
				ColumnsComboBoxEdit.isProcessing = true;
				Terrasoft.AjaxMethods.OnColumnsComboBoxEditQuery();
				return false;
			}
		};

	</script>
</head>
<body>
	<form id="MainHtmlForm" runat="server">
	<TS:ScriptManager ID="ScriptManager" runat="server" ScriptMode="Debug" />
	<TS:ControlLayout ID="MainControlLayout" runat="server" IsViewPort="true" Height="100%" Width="100%">
			<TS:MessagePanel ID="MessagePanel" runat="server" Width="100%" Margins="0 0 10 0" />
			<TS:ControlLayout ID="TopControlLayout" runat="server" Width="100%" Height="100%" Direction="Vertical"
					DisplayStyle="Controls" Padding="5 5 5 5">
				<TS:ComboBoxEdit ID="ColumnsComboBoxEdit" runat="server" AllowEmpty="false" Required="true"
					Caption="@Terrasoft.WebApp,PackageSchemaDataColumn.Column.Caption" Width="100%">
					<AjaxEvents>
						<BeforeQuery OnClientEvent="onColumnsComboBoxEditQuery()" />
					</AjaxEvents>
				</TS:ComboBoxEdit>
				<TS:CheckBox ID="IsForceUpdateCheckBox" runat="server" Checked="false" Caption="@Terrasoft.WebApp,PackageSchemaDataColumn.IsForceUpdate.Caption"
					Width="100%" Enabled="true" CaptionPosition="Left">
				</TS:CheckBox>
				<TS:CheckBox ID="IsKeyCheckBox" runat="server" Checked="false" Caption="@Terrasoft.WebApp,PackageSchemaDataColumn.IsKey.Caption"
					Width="100%" Enabled="true" CaptionPosition="Left">
				</TS:CheckBox>
		</TS:ControlLayout>
		<TS:ControlLayout ID="FooterControlLayout" runat="server" Width="100%" DisplayStyle="Footer">
			<TS:Spacer ID="Spacer1" runat="server" Size="100%">
			</TS:Spacer>
			<TS:Button ID="SaveButton" runat="server" Caption="@Terrasoft.WebApp,PackageSchemaDataEdit.Save.Caption">
				<AjaxEvents>
					<Click CausesValidation="true" OnClientEvent="Terrasoft.AjaxMethods.SaveData();" />
				</AjaxEvents>
			</TS:Button>
			<TS:Button ID="CancelButton" runat="server" Caption="@Terrasoft.WebApp,PackageSchemaDataEdit.Close.Caption">
				<AjaxEvents>
					<Click OnClientEvent="window.close();" />
				</AjaxEvents>
			</TS:Button>
		</TS:ControlLayout>
	</TS:ControlLayout>
	</form>
</body>
</html>
