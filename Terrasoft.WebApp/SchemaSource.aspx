<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SchemaSource.aspx.cs" Inherits="Terrasoft.WebApp.SchemaSource" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
	<title></title>
	<script type="text/javascript">
		function processSchemaEditOnPluginLoaded() {
		}

		function loadScript(editor, text, isReadOnly, line, column) {
			editor.on('onpluginloaded', function () {
				this.scriptableObject.SetText(text);
				this.scriptableObject.IsReadOnly=isReadOnly;
				if (line > 0) {
					this.scriptableObject.SetCaretPosition(line, column);
				}
			}, editor);
		}
	</script>
</head>
<body>
	<form id="htmlForm" runat="server">
	<TS:ScriptManager ID="ScriptManager" runat="server" ScriptMode="Debug" />
	<TS:ControlLayout runat="server" IsViewPort="true" Height="100%" Width="100%">
		<TS:ControlLayout runat="server" Height="100%" Padding="5" Width="100%">
			<TS:ControlLayout runat="server" Width="100%" Height="100%" DisplayStyle="Controls">
				<TS:MessagePanel ID="MessagePanel" runat="server" Width="100%" Margins="0 0 10 0" />
				<TS:TabPanel runat="server" Height="100%" Width="100%" ID="TabPanel" Collapsible="false">
					<Tabs />
				</TS:TabPanel>
			</TS:ControlLayout>
		</TS:ControlLayout>
		<TS:ControlLayout runat="server" Width="100%" DisplayStyle="Footer">
			<TS:Spacer runat="server" Size="100%">
			</TS:Spacer>
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
