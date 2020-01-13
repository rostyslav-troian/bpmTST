<%@ Page Language="C#" Caption="@Terrasoft.WebApp,Workspaces.Caption" AutoEventWireup="true" CodeBehind="Workspaces.aspx.cs" Inherits="Terrasoft.WebApp.Workspaces" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
</head>
<body>
	<form id="htmlForm" runat="server">
	<TS:ScriptManager ID="ScriptManager" runat="server" AjaxViewStateMode="Include" />
	<TS:EntityDataSource ID="WorkspaceDataSource" runat="server" SchemaUId="{7f9653ec-2e91-4aaa-a065-7b1d46edd292}"
		ManagerName="SystemEntitySchemaManager" />
	<TS:Menu runat="server" ID="WorkspaceTreeContextMenu">
		<Items>
			<TS:MenuItem ID="AddMenuItem" runat="server" Caption="@Terrasoft.WebApp,Add.Caption">
				<AjaxEvents>
					<Click OnEvent="OnAddWorkspaceClick" />
				</AjaxEvents>
			</TS:MenuItem>
			<TS:MenuItem ID="CopyMenuItem" runat="server" Caption="@Terrasoft.WebApp,Copy.Caption">
				<AjaxEvents>
					<Click OnEvent="OnCopyWorkspaceClick" />
				</AjaxEvents>
			</TS:MenuItem>
			<TS:MenuItem ID="EditMenuItem" runat="server" Caption="@Terrasoft.WebApp,Edit.Caption">
				<AjaxEvents>
					<Click OnEvent="OnEditWorkspaceClick" Timeout="900000000" ShowLoadMask="true"/>
				</AjaxEvents>
			</TS:MenuItem>
			<TS:MenuItem ID="DeleteMenuItem" runat="server" Caption="@Terrasoft.WebApp,Delete.Caption">
				<AjaxEvents>
					<Click Before="var stringCommonList = Ext.StringList('WebApp.Common'); return Ext.MessageBox.ajaxEventConfirm(this, stringCommonList.getValue('Message.Confirm'), stringCommonList.getValue('Message.DeleteRecordConfirm'));"
						OnEvent="OnDeleteWorkspaceClick" Timeout="900000000" ShowLoadMask="true"/>
				</AjaxEvents>
			</TS:MenuItem>
		</Items>
	</TS:Menu>
	<TS:ControlLayout ID="MainPanel" runat="server" IsViewPort="true" Direction="Vertical" Height="100%" Width="100%">
		<TS:ControlLayout ID="ButtonsControlLayout" runat="server" Width="100%" Edges="0 0 1 0" DisplayStyle="Topbar">
				<TS:Button ID="AddButton" runat="server" ImageAsSprite="false" Caption="@Terrasoft.WebApp,Add.Caption">
					<AjaxEvents>
						<Click OnEvent="OnAddWorkspaceClick" />
					</AjaxEvents>
				</TS:Button>
				<TS:Button ID="CopyButton" runat="server" ImageAsSprite="false" Caption="@Terrasoft.WebApp,Copy.Caption">
					<AjaxEvents>
						<Click OnEvent="OnCopyWorkspaceClick" />
					</AjaxEvents>
				</TS:Button>
				<TS:Button ID="EditButton" runat="server" ImageAsSprite="false" Caption="@Terrasoft.WebApp,Edit.Caption">
					<AjaxEvents>
						<Click OnEvent="OnEditWorkspaceClick" Timeout="900000000" ShowLoadMask="true"/>
					</AjaxEvents>
				</TS:Button>
				<TS:Button ID="DeleteButton" runat="server" ImageAsSprite="false" Caption="@Terrasoft.WebApp,Delete.Caption">
					<AjaxEvents>
						<Click Before="var stringCommonList = Ext.StringList('WebApp.Common'); return Ext.MessageBox.ajaxEventConfirm(this, stringCommonList.getValue('Message.Confirm'), stringCommonList.getValue('Message.DeleteRecordConfirm'));"
							OnEvent="OnDeleteWorkspaceClick" Timeout="900000000" ShowLoadMask="true"/>
					</AjaxEvents>
				</TS:Button>
		</TS:ControlLayout>
		<TS:TreeGrid ID="WorkspaceTree" runat="server" Edges="0 0 0 0" Width="100%" Height="100%"
			FooterVisible="true" ShowHeaders="true" StripeRows="false"
			HideRowBorders="true"
			QuickViewMode="None" IsSummaryVisible="false" DataSourceId="WorkspaceDataSource"
			EnableEditing="false" ContextMenuId="WorkspaceTreeContextMenu" SelectionMode="SingleRow"
			ShowSummariesMenu="false" AutoLayout="true" AutoScroll="true">
			<AjaxEvents>
				<DblClick OnEvent="OnEditWorkspaceClick" ShowLoadMask="true"/>
			</AjaxEvents>
		</TS:TreeGrid>
	</TS:ControlLayout>
	</form>
</body>
</html>
