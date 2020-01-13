<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CompilationErrors.aspx.cs"
	Inherits="Terrasoft.WebApp.CompilationErrors" %>

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
	<TS:ControlLayout runat="server" IsViewPort="true" Height="100%" Width="100%">
		<TS:ControlLayout runat="server" Height="100%" Width="100%">
			<TS:ControlLayout runat="server" Width="100%" Height="100%">
				<TS:MessagePanel ID="MessagePanel" runat="server" Width="100%" />
				<TS:ControlLayout runat="server" Height="100%" Width="100%" DisplayStyle="Controls">
					<TS:ControlLayout ID="SourceCodeRelatedLayout" runat="server" Width="100%" Direction="Horizontal" DisplayStyle="Topbar"
						Edges="0 0 1 0">
						<TS:Button ID="EditSolutionButton" runat="server" Enabled="false"
							Caption="@Terrasoft.WebApp,CompilationErrors.Change.Caption">
							<AjaxEvents>
								<Click ViewStateMode="Include" OnEvent="OnEditWorkspaceClick" />
							</AjaxEvents>
						</TS:Button>
						<TS:Button ID="ViewSourceButton" runat="server" Enabled="false"
							Caption="@Terrasoft.WebApp,CompilationErrors.ViewSource.Caption">
							<AjaxEvents>
								<Click ViewStateMode="Include" OnEvent="ViewSourceClick" />
							</AjaxEvents>
						</TS:Button>
					</TS:ControlLayout>
					<TS:TreeGrid ID="CompilationErrorsGrid" runat="server" Width="100%" Height="100%"
						FooterVisible="false" StripeRows="True" QuickViewMode="None" IsSummaryVisible="False"
						DataSourceId="virtualDataSource" CaptionVerticalAlign="Top" ShowSummariesMenu="false"
						EnableInnerDragDrop="true" DragDropGroup="VDS">
						<AjaxEvents>
							<NodesDrop OnClientEvent="Terrasoft.AjaxMethods.MoveRecords(nodes,
							targetNode,parentNode,movePosition)" />
							<SelectionChange OnEvent="OnCompilationErrorsGridSelectionChange" />
						</AjaxEvents>
					</TS:TreeGrid>
				</TS:ControlLayout>
			</TS:ControlLayout>
		</TS:ControlLayout>
		<TS:ControlLayout runat="server" Width="100%" DisplayStyle="Footer">
			<TS:Spacer runat="server" Size="100%">
			</TS:Spacer>
			<TS:Button ID="btnCancel" runat="server" Caption="@Terrasoft.WebApp,CompilationErrors.CancelButton.Caption">
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
