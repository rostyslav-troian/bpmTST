<%@ Page Language="C#" CodeBehind="SourceControlLogin.aspx.cs" ValidationMessagePanel="InformationPanel"
	Inherits="Terrasoft.WebApp.SourceControlLogin" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title></title>
	<script type="text/javascript">
		function onKeyPress(el, e) {
			var key = e.getKey();
			if (key == e.ENTER) {
				SaveButton.events.click.fire();
			} else if (key == e.ESC) {
				CancelButton.events.click.fire();
			}
		}
	</script>
</head>
<body>
	<form id="htmlForm" runat="server">
	<TS:ScriptManager ID="ScriptManager" runat="server" />
	<TS:ControlLayout runat="server" IsViewPort="true">
		<TS:MessagePanel ID="InformationPanel" runat="server" Width="100%" Closable="true"></TS:MessagePanel>
		<TS:Label ID="RepositoryLabel" Visible="false" runat="server" Margins="10 10 10 5"></TS:Label>
		<TS:ControlLayout ID="Controls" runat="server" Direction="Vertical" Width="100%" Height="100%" Padding="5" DisplayStyle="Controls">
			<TS:TextEdit ID="SourceControlLoginEdit" runat="server" Required="true" Text="" Width="100%"
				Caption="@Terrasoft.WebApp,SourceControlLogin.LoginEdit.Caption">
				<AjaxEvents>
					<SpecialKey OnClientEvent="onKeyPress(el, e);" />
				</AjaxEvents>
			</TS:TextEdit>
			<TS:TextEdit ID="SourceControlPasswordEdit" runat="server" Required="true" Width="100%" AllowBlank="false"
				IsSecureValue="true" Text="" Caption="@Terrasoft.WebApp,SourceControlLogin.PasswordEdit.Caption">
				<AjaxEvents>
					<SpecialKey OnClientEvent="onKeyPress(el, e);" />
				</AjaxEvents>
			</TS:TextEdit>
		</TS:ControlLayout>
		<TS:ControlLayout ID="Buttons" runat="server" Width="100%" DisplayStyle="Footer">
			<TS:Spacer ID="Spacer1" runat="server" Size="100%">
			</TS:Spacer>
			<TS:Button ID="SaveButton" runat="server" Caption="@Terrasoft.UI.WebControls,CloseResult.Ok">
				<AjaxEvents>
					<Click CausesValidation="true" OnEvent="OnSaveClick" Timeout="9000000" ShowLoadMask="true"/>
				</AjaxEvents>
			</TS:Button>
			<TS:Button ID="CancelButton" runat="server" Caption="@Terrasoft.UI.WebControls,CloseResult.Cancel">
				<AjaxEvents>
					<Click OnClientEvent="window.close();" />
				</AjaxEvents>
			</TS:Button>
		</TS:ControlLayout>
	</TS:ControlLayout>
	</form>
</body>
</html>
