<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FileUpload.aspx.cs" Inherits="Terrasoft.WebApp.FileUpload"  %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
	<title></title>
</head>
<body>
	<form id="htmlForm" runat="server">
	<TS:ScriptManager ID="ScriptManager" runat="server" ScriptMode="Debug" />
	<TS:ControlLayout runat="server" IsViewPort="true">
		<TS:ControlLayout runat="server" Height="100%" Padding="5" Width="100%" Edges="0 0 1 0">
			<TS:FileUploadEdit ID="FileUploadEdit" runat="server" Width="100%">
				<AjaxEvents>
					<Change OnEvent="FileUploadEditChange" />
				</AjaxEvents>
			</TS:FileUploadEdit>
		</TS:ControlLayout>
		<TS:ControlLayout ID="ControlLayout1" runat="server" Width="100%" DisplayStyle="Footer">
			<TS:Spacer runat="server" Size="100%">
			</TS:Spacer>
			<TS:Button ID="btnUpload" runat="server" Caption="@Terrasoft.WebApp,FileUpload.Upload">
				<AjaxEvents>
					<Click OnClientEvent="window.close();">
					</Click>
				</AjaxEvents>
			</TS:Button>
			<TS:Button ID="btnCancel" runat="server" Caption="@Terrasoft.UI.WebControls,CloseResult.Cancel">
				<AjaxEvents>
					<Click OnClientEvent="Terrasoft.AjaxMethods.ClearSessionFileData();">
					</Click>
				</AjaxEvents>
			</TS:Button>
		</TS:ControlLayout>
	</TS:ControlLayout>
	</form>
</body>
</html>
