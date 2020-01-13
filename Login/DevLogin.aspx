<%@ Page Language="C#" CodeBehind="DevLogin.aspx.cs" ValidationMessagePanel="InformationPanel"
	Inherits="Terrasoft.WebApp.Loader.Login.DevLogin" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
	<script type="text/javascript">
		document.onkeydown = tryLogin;

		function tryLogin(evt) {
			evt = (evt) ? evt : window.event;
			if (evt) {
				var elm = (evt.target) ?
					evt.target : evt.srcElement;
				if (elm) {
					var code = (evt.charCode) ?
						evt.charCode : evt.keyCode;
					if (code == 13) {
						setProviderNameIfNullAndLogin('InternalUserPassword');
						return false;
					} else {
						return true;
					}
				}
			}
		}

		function doRedirect(id) {
			if (id == 'LicException') {
				Terrasoft.AjaxMethods.RedirectToLicManager();
			}
		}

		function setProviderName(providerName) {
			var providerNameEl = Ext.get(document.getElementById('ProviderName'));
			providerNameEl.dom.value = providerName;
		}

		function setProviderNameAndLogin(providerName) {
			setProviderName(providerName);
			Terrasoft.AjaxMethods.DoLogin();
		}

		function setProviderNameIfNullAndLogin(providerName) {
			var providerNameEl = Ext.get(document.getElementById('ProviderName'));
			if (!providerNameEl.dom.value) {
				setProviderName(providerName);
			}
			Terrasoft.AjaxMethods.DoLogin();
		}

		function timeOutRedirect() {
			var selfParent = self.parent;
			if (selfParent.frames && selfParent.frames.length != 0) {
				var sysMainPageShellId = 'Id=4e342d5e-bd89-4b79-98e2-22e433122403';
				var sysMainPageIdRegExpr = /Id=5e5f9a9e-aa7d-407d-9e1e-1c24c3f9b59a/gi;
				var decodedMainPageHref = decodeURIComponent(document.location.href);
				selfParent.location = encodeURI(decodedMainPageHref.replace(sysMainPageIdRegExpr, sysMainPageShellId));
			}
		}

	</script>
	<title>bpm'online</title>
</head>
<body>
	<script type="text/javascript"> timeOutRedirect(); </script>
	<form id="MainForm" runat="server">
	<TS:ScriptManager ID="ScriptManager" runat="server" />
	<TS:HiddenField ID="ProviderName" runat="server" />
	<TS:HiddenField ID="CurrentUserTimeZoneOffset" runat="server" />
	<div id="LoginPlaceHolder">
		<div id="LoginCenter">
			<TS:MessagePanel ID="InformationPanel" runat="server" Width="100%" Closable="true">
				<Links>
					<TS:LinkConfig Caption="@Terrasoft.WebApp.Loader,Login.ManageLicenseUsersLink.Caption" LinkId="LicException" />
				</Links>
				<AjaxEvents>
					<LinkClick OnClientEvent="doRedirect(id)">
					</LinkClick>
				</AjaxEvents>
			</TS:MessagePanel>
			<div id="LoginCenterContent">
				<div id="LoginLeftColumn">
					<TS:Panel ID="LoginWindow" UseDefaultLayout="false" runat="server" Border="false"
						Height="200" StyleSpec="margin: 0px auto; width: 335px; margin-top: 30px">
						<Body>
							<table id="LoginControls" style="vertical-align: middle; margin-top: 3px;">
								<tr>
									<td class="x-display-name-required lable" valign="middle">
										<TS:Label runat="server" ID="UserLabel" Cls="x-display-name-required" />
									</td>
									<td class="control" style="width: 220px;" valign="middle">
										<TS:TextEdit ID="LoginEdit" runat="server" Required="true" Text="" AutoWidth="true"
											Caption="@Terrasoft.WebApp.Loader,Login.LoginEdit.Caption">
										</TS:TextEdit>
									</td>
								</tr>
								<tr>
									<td class="lable" valign="middle">
										<TS:Label runat="server" ID="PasswordLabel" Cls="x-display-name-required" />
									</td>
									<td class="control" valign="middle">
										<TS:TextEdit ID="PasswordEdit" runat="server" Required="true" AutoWidth="true" AllowBlank="false"
											IsSecureValue="true" Text="" Caption="@Terrasoft.WebApp.Loader,Login.PasswordEdit.Caption">
										</TS:TextEdit>
									</td>
								</tr>
								<tr id="LoginWorkspaces">
									<td class="x-display-name-required lable" valign="middle">
										<TS:Label runat="server" ID="WorkspaceLabel" Cls="x-display-name-required" />
									</td>
									<td class="control" valign="middle">
										<TS:ComboBoxEdit ID="WorkspaceEdit" runat="server" AllowEmpty="true" Required="true"
											AutoWidth="true" Caption="@Terrasoft.WebApp.Loader,Login.WorkspaceEdit.Caption">
											<SelectedItem Value="ViewPage.aspx?Id=4e342d5e-bd89-4b79-98e2-22e433122403" />
										</TS:ComboBoxEdit>
									</td>
								</tr>
								<tr id="StaySignedIn">
									<td />
									<td class="control" valign="middle">
										<TS:CheckBox ID="StaySignedInEdit" runat="server" Width="100%" CaptionPosition="Right"
											Caption="@Terrasoft.WebApp.Loader,Login.StaySignedInEdit.Caption"/>
									</td>
								</tr>
								<tr>
									<td colspan="2" align="center">&nbsp;</td>
								</tr>
								<tr>
									<td>
									</td>
									<td id="LoginButtonPlaceholder">
										<TS:Button ID="LoginButton" runat="server" ButtonStyle="Orange" Caption="@Terrasoft.WebApp.Loader,Login.Start.Caption">
											<AjaxEvents>
												<Click OnClientEvent="setProviderNameIfNullAndLogin('InternalUserPassword');" />
											</AjaxEvents>
										</TS:Button>
									</td>
								</tr>
							</table>
						</Body>
					</TS:Panel>
				</div>
			</div>
			<div id="LoginVersion">
				<TS:Label ID="VersionLabel" runat="server" Cls="loginwindow-label-version" />
			</div>
		</div>
	</div>
	</form>
</body>
</html>
