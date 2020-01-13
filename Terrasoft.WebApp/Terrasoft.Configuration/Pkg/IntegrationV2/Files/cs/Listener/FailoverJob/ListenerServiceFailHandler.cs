namespace Terrasoft.Configuration
{
	using System;
	using System.Collections.Generic;
	using System.Linq;
	using global::Common.Logging;
	using IntegrationApi.Interfaces;
	using IntegrationApi.MailboxDomain.Interfaces;
	using IntegrationApi.MailboxDomain.Model;
	using Terrasoft.Core;
	using Terrasoft.Core.Factories;

	#region Class: ListenerServiceFailHandler

	public class ListenerServiceFailHandler : IJobExecutor
	{

		#region Constants: Private

		/// <summary>
		/// <see cref="ILog"/> instance.
		/// </summary>
		private readonly ILog _log = LogManager.GetLogger("ExchangeListener");

		#endregion
		
		#region Fields: Protected

		/// <summary>
		/// <see cref="ExchangeListenerManager"/> instance.
		/// </summary>
		private IExchangeListenerManager ListenerManager;

		/// <summary>
		/// <see cref="UserConnection"/> instance.
		/// </summary>
		protected UserConnection UserConnection;

		#endregion

		#region Methods: Private

		/// <summary>
		/// Returns mailbox model instance.
		/// </summary>
		/// <param name="mailboxId">Mailbox unique identifier.</param>
		/// <returns>Mailbox instance.</returns>
		private Mailbox GetMailbox(Guid mailboxId) {
			var mailboxService = ClassFactory.Get<IMailboxService>(new ConstructorArgument("uc", UserConnection));
			return mailboxService.GetMailbox(mailboxId, false);
		}

		/// <summary>
		/// Returns mailbox last email recived date. When date is older thn synchronization period, then perion used.
		/// </summary>
		/// <param name="mailboxId">Mailbox unique identifier.</param>
		/// <returns>Mailbox last email recived date.</returns>
		private DateTime GetLastEmailDate(Mailbox mailbox) {
			var lastEmailDate = mailbox.GetLastEmailSyncDate(UserConnection);
			var periodDate = mailbox.GetLoadFromDate(UserConnection);
			var date = new List<DateTime> {
				periodDate.Date,
				lastEmailDate
			}.Max();
			return TimeZoneInfo.ConvertTime(date, TimeZoneInfo.Utc, UserConnection.CurrentUser.TimeZone);
		}

		private bool GetIsFeatureEnabled(string code) {
			var featureUtil = ClassFactory.Get<IFeatureUtilities>();
			return featureUtil.GetIsFeatureEnabled(UserConnection, code);
		}

		#endregion

		#region Methods: Protected

		/// <summary>
		/// Creates <see cref="ExchangeListenerManager"/> instance.
		/// </summary>
		protected IExchangeListenerManager GetExchangeListenerManager() {
			var managerFactory = ClassFactory.Get<IListenerManagerFactory>();
			return managerFactory.GetExchangeListenerManager(UserConnection);
		}

		/// <summary>
		/// Creates events subscription for mailbox.
		/// </summary>
		/// <param name="mailbox">Mailbox unique identifier.</param>
		protected void StartSubscription(Mailbox mailbox) {
			try {
				if (ListenerManager.GetIsServiceAvaliable()) {
					ListenerManager.RecreateListener(mailbox.Id);
				}
			} catch (Exception e) {
				_log.ErrorFormat("Events listener subscription for {0} mailbox create failed.", e, mailbox.Id);
			}
		}

		/// <summary>
		/// Starts email synchronization process for period.
		/// </summary>
		/// <param name="mailboxId">Mailbox unique identifier.</param>
		protected void StartPeriodSyncJob(Mailbox mailbox) {
			try {
				var syncDate = GetLastEmailDate(mailbox);
				var parameters = new Dictionary<string, object> {
					{ "SenderEmailAddress", mailbox.SenderEmailAddress },
					{ "LoadEmailsFromDate", syncDate }
				};
				var syncJobScheduler = ClassFactory.Get<ISyncJobScheduler>();
				syncJobScheduler.CreateSyncJob(UserConnection, 0, "LoadExchangeEmailsProcess", parameters);
			} catch (Exception e) {
				_log.ErrorFormat("Email synchronization process  for {0} mailbox not started.", e, mailbox.Id);
			}
		}

		#endregion

		#region Methods: Public

		/// <summary>
		/// Starts events subscription and email synchronization process for period.
		/// </summary>
		/// <param name="userConnection"><see cref="UserConnection"/> instance.</param>
		/// <param name="parameters">Parameters collection.</param>
		public void Execute(UserConnection userConnection, IDictionary<string, object> parameters) {
			_log.DebugFormat("ListenerServiceFailHandler started");
			UserConnection = userConnection;
			if (!GetIsFeatureEnabled("ExchangeListenerEnabled")) {
				_log.DebugFormat("ExchangeListenerEnabled feature disabled, ListenerServiceFailHandler ended");
				return;
			}
			ListenerManager = GetExchangeListenerManager();
			_log.DebugFormat("ExchangeListenerManager created");
			Guid mailboxId = (Guid)parameters["mailboxId"];
			var mailbox = GetMailbox(mailboxId);
			StartSubscription(mailbox);
			_log.DebugFormat("Events subscription for {0} mailbox created", mailboxId);
			StartPeriodSyncJob(mailbox);
			_log.DebugFormat("Email synchronization process for {0} mailbox created", mailboxId);
			_log.DebugFormat("ListenerServiceFailHandler ended");
		}

		#endregion

	}

	#endregion

}