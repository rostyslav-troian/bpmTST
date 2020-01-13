namespace Terrasoft.Configuration
{
	using System;
	using System.Text;
	using Newtonsoft.Json.Linq;
	using Terrasoft.Common;
	using Terrasoft.Core;
	using Terrasoft.Core.DB;
	using Terrasoft.Core.Entities;
	using Terrasoft.Social.OAuth;

	/// <summary>
	/// Represents an base Office365 OAuth authenticator.
	/// </summary>
	public class BaseOffice365OAuthAuthenticator : BaseOAuthAuthenticator
	{

		#region Constructors: Public

		/// <summary><see cref="OAuthAuthenticator(UserConnection)"/></summary>
		public BaseOffice365OAuthAuthenticator(UserConnection userConnection) : base(userConnection) {
		}

		/// <summary><see cref="OAuthAuthenticator()"/></summary>
		public BaseOffice365OAuthAuthenticator() : base() {
		}

		#endregion

		#region Properties: Protected

		/// <summary>
		/// Office365 authorization url.
		/// </summary>
		protected override string AuthorizeUrl
		{
			get {
				return "https://login.microsoftonline.com/common/oauth2/authorize";
			}
		}

		/// <summary>
		/// Office365 token url.
		/// </summary>
		protected override string TokenUrl
		{
			get {
				return "https://login.microsoftonline.com/common/oauth2/token";
			}
		}

		/// <summary>
		/// Impersonation permissions granted to the Office365 client application.
		/// </summary>
		protected override string Scope
		{
			get {
				return "Calendars.ReadWrite Contacts.ReadWrite Mail.ReadWrite";
			}
		}

		/// <summary>
		/// The App ID URI of the web API.
		/// </summary>
		protected override string Resource {
			get {
				return "https://outlook.office365.com";
			}
		}

		#endregion

		#region Methods: Private

		/// <summary>
		/// Creates a new <see cref="Terrasoft.Configuration.ContactSyncSettings"/> record
		/// for the specific <see cref="Terrasoft.Configuration.MailboxSyncSettings"/> identifier.
		/// </summary>
		/// <param name="mailboxId"><see cref="Terrasoft.Configuration.MailboxSyncSettings"/> identifier.</param>
		private void CreateNewContactSyncSettings(Guid mailboxId) {
			EntitySchema entitySchema = UserConnection.EntitySchemaManager.GetInstanceByName("ContactSyncSettings");
			Entity contact = entitySchema.CreateEntity(UserConnection);
			if (!contact.FetchFromDB(Guid.NewGuid())) {
				contact.SetDefColumnValues();
			}
			contact.SetColumnValue("MailboxSyncSettingsId", mailboxId);
			contact.SetColumnValue("ExportContactsAll", true);
			contact.SetColumnValue("ImportContactsAll", true);
			contact.Save();
		}

		/// <summary>
		/// Creates a new <see cref="Terrasoft.Configuration.ActivitySyncSettings"/> record
		/// for the specific <see cref="Terrasoft.Configuration.MailboxSyncSettings"/> identifier.
		/// </summary>
		/// <param name="mailboxId"><see cref="Terrasoft.Configuration.MailboxSyncSettings"/> identifier.</param>
		private void CreateNewActivitySyncSettings(Guid mailboxId) {
			EntitySchema entitySchema = UserConnection.EntitySchemaManager.GetInstanceByName("ActivitySyncSettings");
			Entity activity = entitySchema.CreateEntity(UserConnection);
			if (!activity.FetchFromDB(Guid.NewGuid())) {
				activity.SetDefColumnValues();
			}
			activity.SetColumnValue("MailboxSyncSettingsId", mailboxId);
			activity.SetColumnValue("ImportAppointmentsAll", true);
			activity.SetColumnValue("ImportTasksAll", true);
			activity.SetColumnValue("ExportActivitiesAll", true);
			activity.Save();
		}

		/// <summary>
		/// Parses claim part from <paramref name="jwtToken"/> token.
		/// </summary>
		/// <param name="jwtToken"><see ref="https://tools.ietf.org/html/rfc7519">Jwt token</see>.</param>
		/// <returns>Claim part string of <paramref name="jwtToken"/>.</returns>
		private string GetClaimStringFromToken(string jwtToken) {
			string result = jwtToken.Split(new char[] { '.' })[1];
			int mod4 = result.Length % 4;
			if (mod4 > 0) {
				result += new string('=', 4 - mod4);
			}
			return Encoding.UTF8.GetString(Convert.FromBase64String(result));
		}

		#endregion

		#region Methods: Protected

		/// <summary>
		/// Called at the end of the authorization process.
		/// Creates transaction for write to the DB needed user data.
		/// </summary>
		/// <param name="userLogin">OAuth application user login.</param>
		/// <param name="tokenStorageId">Created token storage identifier.</param>
		protected override void PostprocessAuthentication(string userLogin, Guid tokenStorageId) {
			using (DBExecutor dbExecutor = UserConnection.EnsureDBConnection()) {
				dbExecutor.StartTransaction();
				try {
					Guid mailboxId = CreateNewMailboxSyncSettings(userLogin, tokenStorageId);
					CreateNewContactCommunications(userLogin);
					CreateNewContactSyncSettings(mailboxId);
					CreateNewActivitySyncSettings(mailboxId);
					dbExecutor.CommitTransaction();
				} catch {
					dbExecutor.RollbackTransaction();
					throw;
				}
			}
		}

		/// <summary>
		/// Parse user name from <see ref="https://blogs.msdn.microsoft.com/exchangedev/2014/03/25/using-oauth2-to-access-calendar-contact-and-mail-api-in-office-365-exchange-online/">id_token</see>.
		/// Id_token property contains user data claim described in <see ref="https://tools.ietf.org/html/rfc7519">standart</see>.
		/// Unique_name claim field used as user email.
		/// </summary>
		/// <param name="rawOauthToken">Base64 OAuth response string.</param>
		/// <returns>User email if id_token valid, <c>string.Empty</c> otherwise.</returns>
		protected virtual string GetUserNameFromToken(string rawOauthToken) {
			JObject responseData = JObject.Parse(rawOauthToken);
			if (responseData["id_token"] != null) {
				string jwtToken = responseData["id_token"].Value<string>();
				string rawClaim = GetClaimStringFromToken(jwtToken); 
				JObject claim = JObject.Parse(rawClaim);
				return claim["unique_name"].Value<string>();
			}
			return string.Empty;
		}

		/// <summary>
		/// <see cref="OAuthAuthenticator.GetOAuthUserCredentials"/>
		/// </summary>
		protected override OAuthUserCredentials GetOAuthUserCredentials(string response) {
			OAuthUserCredentials result = base.GetOAuthUserCredentials(response);
			string userName = GetUserNameFromToken(response);
			if (userName.IsNotNullOrEmpty()) {
				result.UserLogin = userName;
			}
			return result;
		}

		#endregion

		#region Methods: Public

		/// <summary>
		/// Authentications user in the specific OAuth application.
		/// </summary>
		/// <param name="userLogin">User login to the application.</param>
		/// <param name="mailServerId">Mail server unique identifier.</param>
		public virtual string AuthenticateUser(string userLogin, Guid mailServerId) {
			State.Add("MailServerId", mailServerId.ToString());
			AditionalUrlParams.Add("prompt", "consent");
			return base.AuthenticateUser(userLogin);
		}

		#endregion

	}
}