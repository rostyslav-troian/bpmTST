<%@ Page Language="C#" Caption="@Terrasoft.WebApp,WorkspaceEdit.Caption" AutoEventWireup="true" CodeBehind="WorkspaceEdit.aspx.cs" Inherits="Terrasoft.WebApp.WorkspaceEdit" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
	<script type="text/javascript">
		function onKeyPress(el, e) {
			var key = e.getKey();
			if (key == e.ENTER) {
				btnSave.events.click.fire();
			} else if (key == e.ESC) {
				btnCancel.events.click.fire();
			}
		}
	</script>
</head>
<body>
	<form id="htmlForm" runat="server">
	<TS:ScriptManager ID="ScriptManager" runat="server" />
	<TS:ControlLayout ID="MainControlLayout" runat="server" IsViewPort="true" Direction="Vertical" Height="100%"
		Width="100%">
		<TS:MessagePanel ID="MessagePanel" runat="server" Width="100%" Margins="0 0 10 0" />
		<TS:ControlLayout ID="ContentControlLayout" runat="server" Width="100%" Height="100%" Padding="5" DisplayStyle="Controls">
			<TS:TextEdit ID="WorkspaceNameTextEdit" runat="server" AllowEmpty="false"
				Required="true" Caption="@Terrasoft.Core,SysBaseLookupSchema.Columns.Name.Caption" Width="100%">
				<AjaxEvents>
					<SpecialKey OnClientEvent="onKeyPress(el, e);" />
				</AjaxEvents>
			</TS:TextEdit>
			<TS:MemoEdit ID="WorkspaceDescriptionTextEdit" runat="server"
				Caption="@Terrasoft.Core,SysBaseLookupSchema.Columns.Description.Caption" Width="100%" Height="50px" />
		</TS:ControlLayout>
		<TS:ControlLayout ID="ButtonsControlLayout" runat="server" Width="100%" DisplayStyle="Footer">
			<TS:Spacer ID="Spacer1" runat="server" Size="100%" />
			<TS:Button ID="btnSave" runat="server" Caption="@Terrasoft.UI.WebControls,CloseResult.Ok">
				<AjaxEvents>
					<Click OnEvent="OnSaveClick" Timeout="900000000" ShowLoadMask="true"/>
				</AjaxEvents>
			</TS:Button>
			<TS:Button ID="btnCancel" runat="server" Caption="@Terrasoft.UI.WebControls,CloseResult.Cancel">
				<AjaxEvents>
					<Click OnClientEvent="window.close();" />
				</AjaxEvents>
			</TS:Button>
		</TS:ControlLayout>
	</TS:ControlLayout>
	</form>
</body>
</html>
