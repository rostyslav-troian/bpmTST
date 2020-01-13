<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="EditColumn.aspx.cs" Inherits="Terrasoft.WebApp.Designers.EditColumnPages.EditColumn" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
</head>
<body>
    <form id="htmlForm" runat="server">
	<TS:ScriptManager ID="ScriptManager" runat="server" />
	<TS:ControlLayout ID="ControlLayout1" runat="server" IsViewPort="true" Direction="Vertical" Height="500px"
		Width="600px" HelpContextId = "">
		<TS:MessagePanel ID="InformationPanel" runat="server" Width="100%" Closable="true">
		</TS:MessagePanel>
		<TS:ControlLayout ID="ControlLayout2" runat="server" Width="100%" Height="100%" Padding="5">
			<TS:ControlLayout ID="ControlsContainer" runat="server" Width="100%" Height="100%" DisplayStyle="Controls">
				<TS:LocalizableTextEdit ID="ColumnCaptionLocalizableTextEdit" runat="server" Required="true"
					Caption="@Terrasoft.WebApp.PageSchemaDesigner,EditColumnPage.Column.Caption" Width="100%"/>
				<TS:TextEdit ID="ColumnNameTextEdit" runat="server" Required="true"
					Caption="@Terrasoft.WebApp.PageSchemaDesigner,EditColumnPage.Column.Name" Width="100%" />
			</TS:ControlLayout>
		</TS:ControlLayout>
		<TS:ControlLayout ID="ControlLayout4" runat="server" Width="100%" DisplayStyle="Footer">
		    <TS:Button ID="btnHelp" runat="server" ImageList="Terrasoft.WebApp" ImageAsSprite="true" CanFocus="false"
				Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:help.png}">
		        <AjaxEvents>
		            <Click OnClientEvent="Terrasoft.HelpContext.showHelp(null, 'btnHelp')"/>
		        </AjaxEvents>
            </TS:Button>
			<TS:Spacer ID="Spacer1" runat="server" Size="100%" />
			<TS:Button ID="btnSave" runat="server" Caption="@Terrasoft.UI.WebControls,CloseResult.Ok">
				<AjaxEvents>
					<Click OnEvent="OnSaveClick" ShowLoadMask="true"/>
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
