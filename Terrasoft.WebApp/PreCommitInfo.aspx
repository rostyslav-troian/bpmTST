<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PreCommitInfo.aspx.cs" Inherits="Terrasoft.WebApp.PreCommitInfo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
	<title></title>
	<script type="text/javascript">

			function onUnload() {
				Ext.EventManager.un(window, 'beforeunload', onUnload);
				Terrasoft.AjaxMethods.OnWindowUnload();
			}

			function onActionPageClose() {
				Ext.EventManager.un(this, 'beforeunload', onActionPageClose);
				window.close();
			}

	</script>
</head>
<body>
	<form id="htmlForm" runat="server">
	<TS:ScriptManager ID="ScriptManager" runat="server" ScriptMode="Debug" />
		<TS:VirtualDataSource runat="server" ID="VirtualDataSource">
		</TS:VirtualDataSource>
	<TS:ControlLayout ID="ControlLayout1" runat="server" IsViewPort="true" Height="100%" Width="100%">
			<TS:ControlLayout ID="ControlLayout2" runat="server" Width="100%" Height="100%" DisplayStyle="Controls">
				<TS:MessagePanel ID="MessagePanel" runat="server" Width="100%" Margins="0 0 10 0" />
				<TS:ControlLayout ID="DesriptionControlLayout" runat="server" Width="100%" AutoHeight="True" DisplayStyle="Controls" Direction="Horizontal" Padding="5 0 5 5">
					<TS:MemoEdit ID="DescriptionMemoEdit" runat="server" Width="100%" Height="50" Required="True" Caption="@Terrasoft.WebApp,PreCommitInfo.Description.Caption"></TS:MemoEdit>
				</TS:ControlLayout>
				<TS:TreeGrid ID="PackageActionsInfoGrid" runat="server" StripeRows="True" Height="100%" Visible="True"
					Width="100%" DataSourceId="VirtualDataSource" IsSummaryVisible="False" EnableInnerDragDrop="true" ImageList="Terrasoft.WebApp"
					DragDropGroup="VDS" QuickViewMode="None" ShowSummariesMenu="false" FooterVisible="false" HideRowBorders="true" AutoExpandRootNode="true">
					<AjaxEvents>
						<NodesDrop OnClientEvent="Terrasoft.AjaxMethods.MoveRecords(nodes,targetNode,parentNode,movePosition)" />
					</AjaxEvents>
				</TS:TreeGrid>
			</TS:ControlLayout>
		<TS:ControlLayout ID="ControlLayout3" runat="server" Width="100%" DisplayStyle="Footer">
			<TS:Button runat="server" Caption="@Terrasoft.WebApp,PreCommitInfo.Refresh.Caption">
				<AjaxEvents>
					<Click OnClientEvent="Terrasoft.AjaxMethods.OnLoadPackageElementsTree()">
					</Click>
				</AjaxEvents>
			</TS:Button>
			<TS:Spacer ID="Spacer1" runat="server" Size="100%">
			</TS:Spacer>
			<TS:Button ID="CommitButton" runat="server" Caption="@Terrasoft.WebApp,PackageActionsInfo.Commit.Caption">
				<AjaxEvents>
					<Click OnClientEvent="Terrasoft.AjaxMethods.OnCommitButtonClick()" ShowLoadMask="true">
					</Click>
				</AjaxEvents>
			</TS:Button>
			<TS:Button ID="CloseButton" runat="server" Caption="@Terrasoft.WebApp,PackageActionsInfo.Close.Caption">
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
