<%@ Control Language="C#" CodeBehind="InputValue.ascx.cs" Inherits="Terrasoft.WebApp.Templates.UserControls.InputValue" %>
<%--<TS:EntityDataSource ID="DataSource" runat="server" />--%>
<TS:Window runat="server" ID="InputValueWindow" Caption="Введите значение" ShowOnLoad="false"
	Width="300" Height="100" Modal="true" Border="false" Frame="true">
	<Body>
		<TS:ControlLayout ID="ControlLayout" runat="server">
		</TS:ControlLayout>
	</Body>
	<Buttons>
		<TS:Button ID="OkButton" Caption="OK" runat="server" />
		<TS:Button ID="CancelButton" Caption="Отмена" runat="server" StyleSpec="padding-left:5px;" />
	</Buttons>
</TS:Window>
