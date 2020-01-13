<%@ Page Language="C#" CodeBehind="Login.aspx.cs" ValidationMessagePanel="InformationPanel"
	Inherits="Terrasoft.WebApp.Loader.Login.Login" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
	<script type="text/javascript">
		document.onkeydown = tryLogin;

		var isChangePasswordMode;

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
			if (isChangePasswordMode === true) {
				Terrasoft.AjaxMethods.DoChangePasswordLogin();
			}
			else {
				Terrasoft.AjaxMethods.DoLogin();
			}
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
				<table id="LoginCenterTable" cellspacing="0">
					<tr>
						<td id="LoginLeftCell" class="login-cell"></td>
						<td id="LoginCenterCell" class="login-cell">
							<table id="LoginCenterCellTable">
								<tr>
									<td id="LoginCenterColumn">
										<div style="float: right; padding-right: 25px;">
											<TS:Panel ID="LoginWindow" UseDefaultLayout="false" runat="server" Border="false"
												Height="250">
												<Body>
													<TS:ImageBox ID="LogoImage" runat="server" Cls="login-ico-logo-terrasoft login-user" />
													<table id="LoginControls" style="vertical-align: middle; margin-top: 3px; margin-right: 90px">
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
														<div id="ChangePasswordView" runat="server">
														<tr>
															<td class="lable" valign="middle">
																<TS:Label runat="server" ID="NewPasswordLabel" Cls="x-display-name-required" />
															</td>
															<td class="control" valign="middle">
																<TS:TextEdit ID="NewPasswordEdit" runat="server" Required="true" AutoWidth="true" AllowBlank="false"
																	IsSecureValue="true" Text="" Caption="@Terrasoft.WebApp,Login.NewPasswordEdit.Caption">
																</TS:TextEdit>
															</td>
														</tr>
														<tr>
															<td class="lable" valign="middle">
																<TS:Label runat="server" ID="ConfirmPasswordLabel" Cls="x-display-name-required" />
															</td>
															<td class="control" valign="middle">
																<TS:TextEdit ID="ConfirmPasswordEdit" runat="server" Required="true" AutoWidth="true" AllowBlank="false"
																	IsSecureValue="true" Text="" Caption="@Terrasoft.WebApp,Login.ConfirmPasswordEdit.Caption">
																</TS:TextEdit>
															</td>
														</tr>
														</div>
														<tr id="LoginWorkspaces">
															<td class="x-display-name-required lable" valign="middle">
																<TS:Label runat="server" ID="WorkspaceLabel" Cls="x-display-name-required" />
															</td>
															<td class="control" valign="middle">
																<TS:ComboBoxEdit ID="WorkspaceEdit" runat="server" AllowEmpty="true" Required="true"
																	AutoWidth="true" Caption="@Terrasoft.WebApp.Loader,Login.WorkspaceEdit.Caption">
																	<SelectedItem Value="ViewPage.aspx?Id=5e5f9a9e-aa7d-407d-9e1e-1c24c3f9b59a" />
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
															<td>
															</td>
															<td id="LoginButtonPlaceholder">
																<TS:Button ID="LoginButton" runat="server" ButtonStyle="Orange" Caption="@Terrasoft.WebApp.Loader,Login.Start.Caption">
																	<AjaxEvents>
																		<Click OnClientEvent="setProviderNameIfNullAndLogin('InternalUserPassword');" />
																		<%--<Click OnClientEvent="setProviderName('InternalUserPassword');" />--%>
																	</AjaxEvents>
																</TS:Button>
																<%--<TS:PageContainer ID="ProvidersPageContainer" runat="server" AutoLayout="true" AutoHeight="true"
																	AutoWidth="true">
																</TS:PageContainer>--%>
															</td>
														</tr>
													</table>
												</Body>
											</TS:Panel>
										</div>
									</td>
									<td id="LoginRightColumn">
										<div>
											<TS:Panel UseDefaultLayout="false" ID="Information" runat="server" Border="false"
												Cls="x-label loginwindow-infopanel">
												<Body>
													<TS:Label runat="server" ID="Support" Cls="loginwindow-label" Bold="true" StyleSpec="margin:10px 0;" />
													<TS:Panel UseDefaultLayout="false" ID="SupportRuPhonePanel" runat="server" Border="false">
														<Body>
														<table>
															<tr>
																<td>
																	<TS:Label runat="server" ID="SupportCity1" Cls="loginwindow-label"/>
																</td>
																<td>
																	<TS:Label runat="server" ID="Phone1" Cls="loginwindow-label bold"/>
																</td>
															</tr>
															<tr>
																<td>
																	<TS:Label runat="server" ID="SupportCity2" Cls="loginwindow-label"/>
																</td>
																<td>
																	<TS:Label runat="server" ID="Phone2" Cls="loginwindow-label bold"/>
																</td>
															</tr>
															<tr>
																<td>
																	<TS:Label runat="server" ID="SupportCity3" Cls="loginwindow-label"/>
																</td>
																<td>
																	<TS:Label runat="server" ID="Phone3" Cls="loginwindow-label bold" />
																</td>
															</tr>
														</table>
														</Body>
													</TS:Panel>
													<TS:Panel UseDefaultLayout="false" ID="SupportEnPhonePanel" runat="server" Border="false">
														<Body>
														<table>
															<tr>
																<td>
																	<TS:Label runat="server" ID="SupportCityEn1" Cls="loginwindow-label"/>
																</td>
																<td>
																	<TS:Label runat="server" ID="PhoneEn1" Cls="loginwindow-label bold"/>
																</td>
															</tr>
														</table>
														</Body>
													</TS:Panel>
													<asp:HyperLink runat="server" ID="Email" CssClass="loginwindow-label indent phonemail-ico mail underline-link"/>
													<%--<asp:HyperLink runat="server" ID="Url" CssClass="loginwindow-label indent globe-ico underline-link" />
													<TS:Label runat="server" ID="ImportantLinks" Cls="loginwindow-label" Bold="true"
														StyleSpec="margin:30px 0 5px 0;" Hidden="true" />
													<asp:HyperLink runat="server" ID="ImportantLink1" CssClass="loginwindow-label indent bluearrow-ico underline-link" />
													<asp:HyperLink runat="server" ID="ImportantLink2" CssClass="loginwindow-label indent bluearrow-ico underline-link" />
													<asp:HyperLink runat="server" ID="ImportantLink3" CssClass="loginwindow-label indent bluearrow-ico underline-link" />
													<asp:HyperLink runat="server" ID="ImportantLink4" CssClass="loginwindow-label indent bluearrow-ico underline-link" />--%>
												</Body>
											</TS:Panel>
										</div>
									</td>
								</tr>
							</table>
						</td>
						<td id="LoginRightCell" class="login-cell">
						</td>
					</tr>
				</table>
			</div>
			<div id="LoginVersion">
				<TS:Label ID="VersionLabel" runat="server" Cls="loginwindow-label-version" />
			</div>
		</div>
	</div>
	</form>
</body>
</html>