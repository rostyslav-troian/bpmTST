<%@ Page Language="C#" Caption="@Terrasoft.WebApp,SchemaPackageEdit.Caption" AutoEventWireup="true" CodeBehind="LookupGridPage.aspx.cs" Inherits="Terrasoft.WebApp.LookupGridPage" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
</head>
<body>
    <form id="form1" runat="server">
    <TS:ScriptManager ID="ScriptManager" runat="server" />
    <TS:EntityDataSource ID="lgpEntityDataSource" PageRowsCount="-1" runat="server">
	</TS:EntityDataSource>
	<TS:ControlLayout ID="ControlLayout1" runat="server" IsViewPort="true" Direction="Vertical" Height="100%" Width="100%">
		<TS:ControlLayout ID="ControlLayout2" runat="server" Width="100%" Height="100%" Padding="5">
			<TS:TreeGrid ID="lgpTreeGrid" runat="server" Width="100%" Height="100%" ImageList="Terrasoft.WebApp"
				FooterVisible="False" HideHeaders="true" StripeRows="False" HideRowBorders="False"
				StyleSpec="" DataSourceId="lgpEntityDataSource"
				EnableInnerDragDrop="false" SelectionMode="SingleRow" QuickViewMode="None">
				<AjaxEvents>
					<DblClick OnEvent="OKButtonClick_Execute" />
				</AjaxEvents>
			</TS:TreeGrid>
		</TS:ControlLayout>
		<TS:ControlLayout ID="ControlLayout4" runat="server" Width="100%" DisplayStyle="Footer">
			<TS:Spacer ID="Spacer1" runat="server" Size="100%" />
			<TS:Button ID="btnOk" runat="server" Caption="@Terrasoft.UI.WebControls,CloseResult.Ok">
				<AjaxEvents>
					<Click OnEvent="OKButtonClick_Execute" />
				</AjaxEvents>
			</TS:Button>
			<TS:Button ID="btnCancel" runat="server" Caption="@Terrasoft.UI.WebControls,CloseResult.Cancel">
				<AjaxEvents>
					<Click OnClientEvent="Terrasoft.AjaxMethods.ClearSessionData();">
					</Click>
				</AjaxEvents>
			</TS:Button>
		</TS:ControlLayout>
	</TS:ControlLayout>
    </form>
</body>
</html>
