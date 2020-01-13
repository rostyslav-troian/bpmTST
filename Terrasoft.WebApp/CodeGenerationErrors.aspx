<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CodeGenerationErrors.aspx.cs"
	Inherits="Terrasoft.WebApp.CodeGenerationErrors" %>

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
		<TS:ControlLayout runat="server" Height="100%" Padding="5" Width="100%">
			<TS:ControlLayout runat="server" Width="100%" Height="100%" DisplayStyle="Controls">
				<TS:MessagePanel ID="MessagePanel" runat="server" Width="100%" Margins="0 0 10 0" />
				<TS:TabPanel runat="server" Height="100%" Width="100%">
					<Tabs>
						<TS:Tab runat="server" Caption="@Terrasoft.WebApp,CodeGenerationErrors.Caption">
							<Body>
								<TS:TreeGrid ID="CodeGenerationErrorsGrid" runat="server" StripeRows="True" Height="100%"
									Width="100%" DataSourceId="virtualDataSource" IsSummaryVisible="False" EnableInnerDragDrop="true"
									DragDropGroup="VDS" QuickViewMode="None" ShowSummariesMenu="false" FooterVisible="false">
									<AjaxEvents>
										<NodesDrop OnClientEvent="Terrasoft.AjaxMethods.MoveRecords(nodes,targetNode,parentNode,movePosition)" />
									</AjaxEvents>
								</TS:TreeGrid>
							</Body>
						</TS:Tab>
					</Tabs>
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
