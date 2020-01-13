<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DSGrid.aspx.cs" Inherits="Terrasoft.WebApp.DSGrid" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title>DataSource Grid Test</title>
</head>
<body>
	<form id="form1" runat="server">
		<TS:ScriptManager ID="ScriptManager" runat="server" AjaxViewStateMode="Include" />
		<TS:EntityDataSource runat="server" ID="ContactDataSource" SchemaUId="16BE3651-8FE2-4159-8DD0-A803D4683DD3" />
		<TS:EntityDataSource runat="server" ID="AccountDataSource" SchemaUId="25D7C1AB-1DE0-4501-B402-02E0E5A72D6E" />
		<TS:ControlLayout runat="server" ID="ViewPort" IsViewPort="True" Direction="Vertical"
			DisplayStyle="Controls" Padding="10" Width="100%" AutoHeight="True">
			<TS:TreeGrid ID="EntitySchemaGrid" runat="server" StripeRows="True" Width="100%" Height="70%"
				ImageList="CoreImageList" EnableEditing="True" DataSourceId="ContactDataSource"
				QuickViewMode="Columns" IsSummaryVisible="False">
			</TS:TreeGrid>
			<TS:ControlLayout runat="server" ID="FilterEditLayout" Direction="Horizontal" DisplayStyle="Controls" 
				IsViewPort="False" Height="30%" Width="100%">
				<TS:FilterEdit runat="server" ID="FilterEdit" DataSourceId="ContactDataSource" Width="400"
					Height="100%" />
				<TS:Button runat="server" ID="ApplyButton" Width="100" Height="30" />
				<TS:Button runat="server" ID="ContactButton" Width="100" Height="30" />
				<TS:Button runat="server" ID="AccountButton" Width="100" Height="30" />
				<TS:Button runat="server" ID="AddFiltersButton" Width="100" Height="30" />
			</TS:ControlLayout>
		</TS:ControlLayout>
	</form>
</body>
</html>
