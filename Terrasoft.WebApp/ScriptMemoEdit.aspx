<%@ Page Language="C#" Caption="@Terrasoft.WebApp,ScriptMemoEdit.Caption" CodeBehind="ScriptMemoEdit.aspx.cs"
	Inherits="Terrasoft.WebApp.ScriptMemoEdit" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title></title>
	<script type="text/javascript">
		function setTitle(format) {
			var parentWindow = window.opener;
			if (!parentWindow) {
				return;
			}
			var schemaCaption;
			var schemaDataSource = parentWindow.SchemaDataSource || parentWindow.ProcessUserTaskSchemaDataSource;
			var schemaDataSourceRows = schemaDataSource.rows.items;
			var hierarchicalColumnName = schemaDataSource.structure.hierarchicalColumnName;
			for (var i = 0; i < schemaDataSourceRows.length; i++) {
				if (schemaDataSourceRows[i].getColumnValue(hierarchicalColumnName) == null) {
					schemaCaption = schemaDataSourceRows[i].getColumnValue("Caption");
					break;
				}
			}
			if (schemaCaption) {
				var propertyName = parentWindow.PropertiesDataSource.activeRow.getColumnValue("Name");
				document.title = format.replace("{0}", propertyName).replace("{1}", schemaCaption);
			}
		}

		function loadScript(itemUId, propertyName, headerText, footerText) {
			var parentWindow = window.opener;
			if (!parentWindow) {
				return;
			}
			window.itemUId = itemUId;
			window.propertyName = propertyName;
			var propertyDataSource = parentWindow.PropertiesDataSource;
			var row = propertyDataSource.findRow("UId", itemUId);
			if (!row) {
				return;
			}
			var propertyValue = row.getColumnValue(propertyName);
			SyntaxMemoEdit.on('onpluginloaded', function () {
				this.scriptableObject.SetText(propertyValue);
				if (headerText && footerText) {
					this.scriptableObject.SetHeaderAndFooterText(headerText, footerText);
				}
			}, SyntaxMemoEdit);
			Ext.EventManager.on(window, 'beforeunload', saveScript, window);
		}

		function saveScript() {
			var parentWindow = window.opener;
			if (!parentWindow) {
				return;
			}
			var itemUId = window.itemUId;
			var propertyName = window.propertyName;
			var designModeManager = parentWindow.window.DesignModeManager;
			if (!itemUId || !propertyName || !designModeManager) {
				return;
			}
			var propertyValue = SyntaxMemoEdit.scriptableObject.GetText();
			designModeManager.setPropertyValue(itemUId, propertyName, propertyValue);
		};

		function switchSearchViewVisible() {
			SyntaxMemoEdit.scriptableObject.SwitchSearchViewVisible();
		}

		function switchWhitespaceVisible() {
			SyntaxMemoEdit.scriptableObject.SwitchWhitespaceVisible();
		}

		function initSignatureWindow(methodInfo) {
			if (methodInfo) {
				var signatureContainer = SignatureContainerLayout.el.dom.firstChild;
				Ext.get(signatureContainer).addClass('signatureclass');
				var override = (methodInfo.isOverride) ? 'override ' : '';
				var retVal = highlight(methodInfo.retType) + ' ';
				var args = '';
				Ext.each(methodInfo.args, function (arg) {
					var argType = highlight(arg.type);
					var params = (arg.isParams) ? 'params ' : '';
					args = args + params + argType + ' ' + arg.name + ', ';
				});
				args = '(' + args.substr(0, args.lastIndexOf(',')) + ')';
				var headerValue = override + retVal + methodInfo.name + args;
				signatureContainer.innerHTML = headerValue;
			} else {
				SignatureContainerLayout.setVisible(false);
			}
		}

		function htmlEncode(str) {
			return Ext.util.Format.htmlEncode(str);
		}

		function highlight(text) {
			return '<span style="color:blue">' + htmlEncode(text) + '</span>';
		}

	</script>
</head>
<body>
	<form id="htmlForm" runat="server">
	<TS:ScriptManager ID="ScriptManager" runat="server" />
	<TS:ControlLayout runat="server" IsViewPort="true" Direction="Vertical">
		<TS:ControlLayout ID="ControlLayout1" runat="server" Width="100%" DisplayStyle="Topbar"
			Margins="0 0 0 0">
			<TS:Button ID="SwitchFindWindowVisibleButton" runat="server" Image="{Source: ResourceManager, ResourceManagerName: Terrasoft.WebApp, ResourceItemName: common-ico-outline.png}">
				<AjaxEvents>
					<Click OnClientEvent="switchSearchViewVisible();" />
				</AjaxEvents>
			</TS:Button>
			<TS:Button ID="SwitchWhitespaceVisibleButton" runat="server" ImageAsSprite="false"
				Image="{Source: ResourceManager, ResourceManagerName: Terrasoft.WebApp, ResourceItemName: syntaxmemoedit-switchwhitespacevisible.png}">
				<AjaxEvents>
					<Click OnClientEvent="switchWhitespaceVisible();" />
				</AjaxEvents>
			</TS:Button>
		</TS:ControlLayout>
		<TS:ControlLayout ID="SignatureContainerLayout" runat="server" Width="100%" Height="20px">
		</TS:ControlLayout>
		<TS:SilverlightContainer ID="SyntaxMemoEdit" Width="100%" Height="100%" runat="server"
			Source="/ClientBin/Terrasoft.UI.WindowsControls.SyntaxMemo.xap">
			<ScriptableEvents>
					<TS:SilverlightScriptableEvent Name="FocusChanged" />
			</ScriptableEvents>
		</TS:SilverlightContainer>
		<TS:ControlLayout runat="server" Width="100%" DisplayStyle="Footer">
			<TS:Spacer runat="server" Size="100%">
			</TS:Spacer>
			<TS:Button runat="server" Caption="@Terrasoft.WebApp,ScriptMemoEdit.SaveButton.Caption"
				ID="SaveButton">
				<AjaxEvents>
					<Click OnClientEvent="saveScript();">
					</Click>
				</AjaxEvents>
			</TS:Button>
			<TS:Button runat="server" Caption="@Terrasoft.WebApp,ScriptMemoEdit.CloseButton.Caption"
				ID="CloseButton">
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
