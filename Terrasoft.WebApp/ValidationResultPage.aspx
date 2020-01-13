<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ValidationResultPage.aspx.cs"
	Inherits="Terrasoft.WebApp.ValidationResultPage" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
	<title></title>
	<script type="text/javascript">

	    function onUnload() {
	        Ext.EventManager.un(window, 'beforeunload', onUnload);
	        Terrasoft.AjaxMethods.OnWindowUnload();
	    }

	</script>
</head>
<body>
	<form id="htmlForm" runat="server">
	<TS:ScriptManager ID="ScriptManager" runat="server" ScriptMode="Debug" />
	<TS:ControlLayout ID="ControlLayout1" runat="server" IsViewPort="true" Height="100%" Width="100%">
		<TS:ControlLayout ID="ControlLayout2" runat="server" Height="100%" Width="100%">
			<TS:ControlLayout ID="ControlLayout3" runat="server" Width="100%" Height="100%">
				<TS:ControlLayout ID="ControlLayout4" runat="server" Height="100%" Width="100%" DisplayStyle="Controls">
					<TS:TreeGrid ID="ValidationResultPageGrid" runat="server" Width="100%" Height="100%"
						FooterVisible="false" StripeRows="True" QuickViewMode="None" IsSummaryVisible="False"
						DataSourceId="VirtualDataSource" CaptionVerticalAlign="Top" ShowSummariesMenu="false"
						EnableInnerDragDrop="true" DragDropGroup="VDS">
					</TS:TreeGrid>
				</TS:ControlLayout>
			</TS:ControlLayout>
		</TS:ControlLayout>
		<TS:ControlLayout ID="ControlLayout6" runat="server" Width="100%" DisplayStyle="Footer">
			<TS:Spacer ID="Spacer1" runat="server" Size="100%">
			</TS:Spacer>
			<TS:Button ID="btnCancel" runat="server" Caption="@Terrasoft.WebApp,ValidationResultPage.CancelButton.Caption">
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
