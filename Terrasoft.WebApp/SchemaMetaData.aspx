<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SchemaMetaData.aspx.cs"
	Inherits="Terrasoft.WebApp.SchemaMetaData" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
	<title></title>
	<script type="text/javascript">
		function onKeyPress(el, e) {
			var key = e.getKey();
			if (key == e.ESC) {
				btnCancel.events.click.fire();
			}
		}

		function loadScript(text, isReadOnly) {
			MetaDataDifferencePackageMemoEdit.on("onpluginloaded", function () {
				this.scriptableObject.SetText(text);
				this.scriptableObject.IsReadOnly = isReadOnly;
			}, MetaDataDifferencePackageMemoEdit);
		}

		function getMetaDataDifferencePackage() {
			return MetaDataDifferencePackageMemoEdit.scriptableObject.GetText();
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
				<TS:TabPanel runat="server" Height="100%" Width="100%" ID="TabPanel" Collapsible="false">
					<Tabs>
						<TS:Tab ID="MetaDataTab" runat="server">
							<Body>
								<TS:MemoEdit ID="MetaDataMemoEdit" runat="server" Width="100%" Height="100%"
									AlignedByCaption="true" Enabled = "false">
									<AjaxEvents>
										<SpecialKey OnClientEvent="onKeyPress(el, e);" />
									</AjaxEvents>
								</TS:MemoEdit>
							</Body>
						</TS:Tab>
						<TS:Tab ID="ReadableMetaDataTab" runat="server">
							<Body>
								<TS:MemoEdit ID="ReadableMetaDataMemoEdit" runat="server" Width="100%" Height="100%"
									AlignedByCaption="true" Enabled = "false">
									<AjaxEvents>
										<SpecialKey OnClientEvent="onKeyPress(el, e);" />
									</AjaxEvents>
								</TS:MemoEdit>
							</Body>
						</TS:Tab>
						<TS:Tab ID="MetaDataDifferencePackageTab" runat="server">
							<Body>
								<TS:SilverlightContainer ID="MetaDataDifferencePackageMemoEdit" Width="100%" Height="100%" runat="server"
									Source="/ClientBin/Terrasoft.UI.WindowsControls.SyntaxMemo.xap">
								</TS:SilverlightContainer>
							</Body>
						</TS:Tab>
					</Tabs>
				</TS:TabPanel>
			</TS:ControlLayout>
		</TS:ControlLayout>
		<TS:ControlLayout runat="server" Width="100%" DisplayStyle="Footer">
			<TS:Spacer runat="server" Size="100%">
			</TS:Spacer>
			<TS:Button ID="btnSave" runat="server" Caption="@Terrasoft.WebApp,SchemaMetaData.Save" Enabled="false">
				<AjaxEvents>
					<Click CausesValidation="true" OnClientEvent="Terrasoft.AjaxMethods.SaveData(getMetaDataDifferencePackage());" />
				</AjaxEvents>
			</TS:Button>
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
