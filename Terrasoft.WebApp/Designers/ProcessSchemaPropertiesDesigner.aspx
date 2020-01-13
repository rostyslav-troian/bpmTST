<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ProcessSchemaPropertiesDesigner.aspx.cs" Inherits="Terrasoft.WebApp.Designers.ProcessSchemaPropertiesDesigner" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
	<script type="text/javascript">

		function onSaveClick() {
			MessagePanel.clear();
			Terrasoft.AjaxMethods.OnSaveClick();
		}

</script>
<head runat="server">
	<title></title>
</head>
<body>
	<form id="schemaPropertiesForm" runat="server">
		<TS:ScriptManager ID="ScriptManager" runat="server" />
		<TS:ControlLayout ID="ControlLayout1" runat="server" IsViewPort="true" Direction="Vertical" Height="500px" Width="100%">
			<TS:MessagePanel ID="MessagePanel" runat="server" Width="100%" Closable="true"></TS:MessagePanel>
			<TS:ControlLayout ID="EditControls" runat="server" Direction="Vertical" Width="100%" Height="100%" Padding="5"
				DisplayStyle="Controls">
				<TS:TextEdit ID="ProcessSchemaNameEdit" runat="server" Required="true" Text="" Width="100%"
					Caption="@Terrasoft.WebApp.ProcessSchemaDesigner,ProcessSchemaName.Caption">
				</TS:TextEdit>
				<TS:TextEdit ID="ProcessSchemaCaptionEdit" runat="server" Required="true" Width="100%" Text=""
					Caption="@Terrasoft.WebApp.ProcessSchemaDesigner,ProcessSchemaCaption.Caption">
				</TS:TextEdit>
				<TS:ComboBoxEdit ID="PackagesEdit" runat="server" Required="True" Width="100%"
					Caption="@Terrasoft.WebApp.ProcessSchemaDesigner,Packages.Caption">
				</TS:ComboBoxEdit>
			</TS:ControlLayout>
			<TS:ControlLayout ID="Buttons" runat="server" Width="100%" DisplayStyle="Footer">
				<TS:Spacer ID="Spacer1" runat="server" Size="100%">
				</TS:Spacer>
				<TS:Button ID="SaveButton" runat="server" Caption="@Terrasoft.UI.WebControls,CloseResult.Ok">
					<AjaxEvents>
						<Click OnClientEvent="onSaveClick()" ShowLoadMask="true" />
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
