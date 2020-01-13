namespace Terrasoft.EmailDomain.EventProcessing
{
	using System;
	using System.Collections.Generic;
	using global::Common.Logging;
	using EmailContract.Commands;
	using IntegrationApi.Email;
	using Terrasoft.Common;
	using Terrasoft.Core;
	using Terrasoft.Core.Factories;
	using Terrasoft.EmailDomain.Interfaces;
	using Terrasoft.Web.Http.Abstractions;

	#region Class: EmailEventsProcessor

	/// <summary>
	/// Load emails command handler.
	/// </summary>
	[DefaultBinding(typeof(IEmailEventsProcessor))]
	public class EmailEventsProcessor : BaseEmailEventsProcessor, IEmailEventsProcessor
	{

		#region Fields: Private

		private ILog _log = LogManager.GetLogger("ExchangeListener");

		#endregion

		#region Constructors: Public 

		public EmailEventsProcessor(AppConnection appConnection, IHttpContextAccessor accessor) : base(appConnection, accessor) {
		}

		#endregion

		#region Methods: Private

		/// <summary>
		/// Checks is <paramref name="mailboxId"/> avaliable for current user.
		/// </summary>
		/// <param name="userConnection"><see cref="UserConnection"/> instance.</param>
		/// <param name="mailboxId">Mailbox identifier.</param>
		private void CheckMailboxAvaliable(UserConnection userConnection, Guid mailboxId) {
			GetMailboxAddress(userConnection, mailboxId);
		}

		#endregion

		#region Methods: Protected


		/// <summary>
		/// Starts <paramref name="emailsData"/> synchronization.
		/// </summary>
		/// <param name="userConnection"><see cref="UserConnection"/> instance.</param>
		/// <param name="emailsData"><see cref="LoadEmailCommand"/> instance.</param>
		protected void StartSynchronization(UserConnection userConnection, LoadEmailCommand emailsData) {
			Guid mailboxSyncSettingsId = emailsData.SubscriptionInfo.MailboxId;
			CheckMailboxAvaliable(userConnection, mailboxSyncSettingsId);
			var parameters = new Dictionary<string, object> {
				{ "MailboxId", mailboxSyncSettingsId },
				{ "Items", emailsData.Emails }
			};
			_log.Info($"StartSynchronization mailbox {mailboxSyncSettingsId} avaliable.");
			ValidateEvent(userConnection, parameters);
			_log.Info($"StartSynchronization mailbox {mailboxSyncSettingsId} valid.");
			Terrasoft.Core.Tasks.Task.StartNewWithUserConnection<LoadEmailEventExecutor, IDictionary<string, object>>(parameters);
		}

		#endregion

		#region Methods: Public

		/// <summary>
		/// Creates user connection and starts <paramref name="emailsData"/> synchronization.
		/// </summary>
		/// <param name="emailsData"><see cref="LoadEmailCommand"/> instance.</param>
		public void ProcessLoadEmailCommand(LoadEmailCommand emailsData) {
			_log.Info($"ProcessLoadEmailCommand for {emailsData.SubscriptionInfo.MailboxId} started.");
			var userName = emailsData.SubscriptionInfo.SysAdminUnit;
			var userConnection = CreateUserConnection(userName, emailsData.SubscriptionInfo.TimeZoneId);
			_log.Info($"UserConnection for {emailsData.SubscriptionInfo.SysAdminUnit} created.");
			try {
				StartSynchronization(userConnection, emailsData);
			}
			finally {
				userConnection?.Close(SessionEndMethod.Logout, false);
			}
			_log.Info($"ProcessLoadEmailCommand for {emailsData.SubscriptionInfo.MailboxId} ended.");
		}

		#endregion

	}

	#endregion

}
