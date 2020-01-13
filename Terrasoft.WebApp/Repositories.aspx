<%@ Page Language="C#" Caption="@Terrasoft.WebApp,Repositories.Caption" AutoEventWireup="true" CodeBehind="Repositories.aspx.cs" Inherits="Terrasoft.WebApp.Repositories" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<script type="text/javascript">

		function onBeforeDelete(menuItem) {
		        var stringCommonList = Ext.StringList('WebApp.Common');
		        return Ext.MessageBox.ajaxEventConfirm(menuItem, stringCommonList.getValue('Message.Confirm'),
					stringCommonList.getValue('Message.DeleteRecordConfirm'));
		    }

	</script>
</head>
	<body>
		<form runat="server">
			<TS:ScriptManager ID="ScriptManager" runat="server" AjaxViewStateMode="Include" />
			<TS:EntityDataSource ID="RepositoryDataSource" runat="server" SchemaUId="{7b8d899e-40bf-4430-9665-908f653acf41}"
				ManagerName="SystemEntitySchemaManager" />
			<TS:Menu runat="server" ID="RepositoryTreeContextMenu">
				<Items>
					<TS:MenuItem Caption="@Terrasoft.WebApp,Add.Caption">
						<AjaxEvents>
							<Click OnEvent="OnAddRepositoryClick" />
						</AjaxEvents>
					</TS:MenuItem>
					<TS:MenuItem Caption="@Terrasoft.WebApp,Edit.Caption">
						<AjaxEvents>
							<Click OnEvent="OnEditRepositoryClick" Timeout="900000000" ShowLoadMask="true"/>
						</AjaxEvents>
					</TS:MenuItem>
					<TS:MenuItem Caption="@Terrasoft.WebApp,Delete.Caption">
						<AjaxEvents>
							<Click Before="return onBeforeDelete(this);"
								OnEvent="OnDeleteRepositoryClick" Timeout="900000000" ShowLoadMask="true"/>
						</AjaxEvents>
					</TS:MenuItem>
					<TS:MenuItem ID="AuthorizeRepositoryMenuItem" Caption="@Terrasoft.WebApp,Authorize.Caption">
						<AjaxEvents>
							<Click OnEvent="OnAuthorizeRepositoryClick" Timeout="900000000" ShowLoadMask="true"/>
						</AjaxEvents>
					</TS:MenuItem>
				</Items>
			</TS:Menu>
			<TS:ControlLayout runat="server" IsViewPort="true" Direction="Vertical" Height="100%" Width="100%">
				<TS:ControlLayout runat="server" Width="100%" Edges="0 0 1 0" DisplayStyle="Topbar">
						<TS:Button ID="AddRepositoryButton" runat="server" ImageAsSprite="false" Caption="@Terrasoft.WebApp,Add.Caption">
							<AjaxEvents>
								<Click OnEvent="OnAddRepositoryClick" />
							</AjaxEvents>
						</TS:Button>
						<TS:Button runat="server" ImageAsSprite="false" Caption="@Terrasoft.WebApp,Edit.Caption">
							<AjaxEvents>
								<Click OnEvent="OnEditRepositoryClick" Timeout="900000000" ShowLoadMask="true"/>
							</AjaxEvents>
						</TS:Button>
						<TS:Button runat="server" ImageAsSprite="false" Caption="@Terrasoft.WebApp,Delete.Caption">
							<AjaxEvents>
								<Click Before="return onBeforeDelete(this);"
									OnEvent="OnDeleteRepositoryClick" Timeout="900000000" ShowLoadMask="true"/>
							</AjaxEvents>
						</TS:Button>
						<TS:Button runat="server" ImageAsSprite="false" Caption="@Terrasoft.WebApp,Authorize.Caption">
							<AjaxEvents>
								<Click OnEvent="OnAuthorizeRepositoryClick" Timeout="900000000" ShowLoadMask="true"/>
							</AjaxEvents>
						</TS:Button>
				</TS:ControlLayout>
				<TS:TreeGrid ID="RepositoryTree" runat="server" Edges="0 0 0 0" Width="100%" Height="100%"
					FooterVisible="true" ShowHeaders="true" StripeRows="false"
					HideRowBorders="true"
					QuickViewMode="None" IsSummaryVisible="false" DataSourceId="RepositoryDataSource"
					EnableEditing="false" ContextMenuId="RepositoryTreeContextMenu" SelectionMode="SingleRow"
					ShowSummariesMenu="false" AutoLayout="true" AutoScroll="true">
					<AjaxEvents>
						<DblClick OnEvent="OnEditRepositoryClick" ShowLoadMask="true"/>
					</AjaxEvents>
				</TS:TreeGrid>
			</TS:ControlLayout>
			</form>
	</body>
</html>