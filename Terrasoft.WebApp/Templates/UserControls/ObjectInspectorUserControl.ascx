<%@ Control Language="C#" CodeBehind="ObjectInspectorUserControl.ascx.cs" Inherits="Terrasoft.WebApp.Templates.UserControls.ObjectInspectorUserControl" %>
<script language="javascript" type="text/javascript">
	function onSettingsWindowShow(el) {
		var items = el.items;
		var objectInspector = items.itemAt(0);
		var width = el.getWidth();
		var height = objectInspector.getHeight() + items.itemAt(1).getHeight() + el.header.getHeight();
		el.setHeight(height);
		var maxCaptionWidth = Math.floor(width/2);
		if (objectInspector.maxCaptionWidth != maxCaptionWidth) {
			objectInspector.maxCaptionWidth = maxCaptionWidth;
			objectInspector.propertiesLayout.maxCaptionWidth = objectInspector.maxCaptionWidth;
			objectInspector.rebuild();
		}
	}

	function onSettingsWindowResize(el, adjWidth, adjHeight, rawWidth, rawHeight) {
		var objectInspector = el.items.itemAt(0);
		if (objectInspector.fitHeightByContent) {
			objectInspector.fitHeightByContent = false;
			objectInspector.propertiesLayout.fitHeightByContent = false;
		}
		var maxCaptionWidth = Math.floor(adjWidth/2);
		if (objectInspector.maxCaptionWidth != maxCaptionWidth) {
			objectInspector.maxCaptionWidth = maxCaptionWidth;
			objectInspector.propertiesLayout.maxCaptionWidth = objectInspector.maxCaptionWidth;
			objectInspector.rebuild();
		}
	}

</script>

<TS:Window runat="server" ID="ObjectInspectorWindow" Caption="@Terrasoft.WebApp.BaseDesigner,Settings.Title"
	ShowOnLoad="false" Height="400" Width="500" Modal="true" FrameStyle="padding: 0 0 0 0"
	CloseAction="Hide">
	<AjaxEvents>
		<Show OnClientEvent="onSettingsWindowShow(el);" />
		<Resize OnClientEvent="onSettingsWindowResize(el, adjWidth, adjHeight, rawWidth, rawHeight);" />
	</AjaxEvents>
	<Body>
		<TS:ObjectInspector ID="ObjectInspectorControl" Width="100%" Height="100%" MaxCaptionWidth="250"
			runat="server" ViewButtonsMode="None" IsGroupButtonVisible="false" FitHeightByContent="true"
			IsSortingButtonVisible="false" UseGroups="true" Padding="10 10 10 10" />
		<TS:ControlLayout runat="server" Width="100%" DisplayStyle="Footer" ID="ButtonPanel">
			<TS:Spacer Size ="100%" runat="server" />
			<TS:Button ID="ObjectInspectorWindowOkButton" Caption="@Terrasoft.UI.WebControls.Common,Button.Ok" runat="server">
				<AjaxEvents>
					<Click OnEvent="ObjectInspectorWindowOkButtonOnClick" />
				</AjaxEvents>
			</TS:Button>
			<TS:Button ID="ObjectInspectorWindowCancelButton" Caption="@Terrasoft.UI.WebControls.Common,Button.Cancel" runat="server"
				StyleSpec="">
				<AjaxEvents>
					<Click OnEvent="ObjectInspectorWindowCancelButtonOnClick"></Click>
				</AjaxEvents>
			</TS:Button>
		</TS:ControlLayout>
	</Body>
</TS:Window>
