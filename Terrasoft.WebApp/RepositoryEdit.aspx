<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RepositoryEdit.aspx.cs" 
	Inherits="Terrasoft.WebApp.RepositoryEdit" Caption="@Terrasoft.WebApp,RepositoryEdit.Caption"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
</head>
<body>
	<form id="HtmlForm" runat="server">
	<TS:ScriptManager ID="ScriptManager" runat="server" />
	<TS:ControlLayout ID="MainControlLayout" runat="server" IsViewPort="true" Direction="Vertical" Height="100%"
		Width="100%">
		<TS:MessagePanel ID="MessagePanel" runat="server" Width="100%" Margins="0 0 10 0" />
		<TS:ControlLayout ID="ContentControlLayout" runat="server" Width="100%" Height="100%" Padding="5" DisplayStyle="Controls">
			<TS:TextEdit ID="RepositoryNameTextEdit" runat="server" AllowEmpty="false"
				Required="true" Caption="@Terrasoft.Core,SysBaseLookupSchema.Columns.Name.Caption" Width="100%" />
			<TS:TextEdit ID="RepositoryAddressTextEdit" runat="server" AllowEmpty="false"
				Required="true" Caption="@Terrasoft.Core,SysRepositorySchema.Columns.Address.Caption" Width="100%">
			</TS:TextEdit>
			<TS:CheckBox ID="RepositoryActiveCheckBox" runat="server"
				Caption="@Terrasoft.Core,SysRepositorySchema.Columns.IsActive.Caption" CaptionPosition="Left"></TS:CheckBox>
		</TS:ControlLayout>
		<TS:ControlLayout ID="ButtonsControlLayout" runat="server" Width="100%" DisplayStyle="Footer">
			<TS:Spacer ID="Spacer1" runat="server" Size="100%" />
			<TS:Button ID="ButtonSave" runat="server" Caption="@Terrasoft.UI.WebControls,CloseResult.Ok">
				<AjaxEvents>
					<Click OnEvent="OnSaveClick" Timeout="900000000" ShowLoadMask="true"/>
				</AjaxEvents>
			</TS:Button>
			<TS:Button ID="ButtonCancel" runat="server" Caption="@Terrasoft.UI.WebControls,CloseResult.Cancel">
				<AjaxEvents>
					<Click OnClientEvent="window.close();" />
				</AjaxEvents>
			</TS:Button>
		</TS:ControlLayout>
	</TS:ControlLayout>
	</form>
</body>
</html>
