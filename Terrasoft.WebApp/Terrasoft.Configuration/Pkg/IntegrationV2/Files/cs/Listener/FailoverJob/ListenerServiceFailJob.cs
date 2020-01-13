namespace Terrasoft.Configuration
{
	using System;
	using System.Collections.Generic;
	using System.Linq;
	using global::Common.Logging;
	using IntegrationApi.Interfaces;
	using IntegrationApi.MailboxDomain.Interfaces;
	using Terrasoft.Core;
	using Terrasoft.Core.Factories;

	#region Class: ListenerServiceFailJob

	public class ListenerServiceFailJob: IJobExecutor
	{

		#region Fields: Private

		/// <summary>
		/// <see cref="ILog"/> instance.
		/// </summary>
		private readonly ILog _log = LogManager.GetLogger("ExchangeListener");

		/// <summary>
		/// Mailbox failure handlers job group name.
		/// </summary>
		private readonly string _jobGroupName = "ExchangeListenerHandler";

		/// <summary>
		/// Mailbox subscription exists on litener service state code.
		/// </summary>
		private readonly string _subscriptionExistsState = "exists";

		/// <summary>
		/// <see cref="ExchangeListenerManager"/> instance.
		/// </summary>
		private IExchangeListenerManager ListenerManager;

		/// <summary>
		/// <see cref="UserConnection"/> instance.
		/// </summary>
		private UserConnection UserConnection;

		#endregion

		#region Methods: Private

		/// <summary>
		/// Checks existing mailboxes subscriptions state. Returns mailboxes without subscriptions.
		/// </summary>
		private Dictionary<Guid, string> GetMailboxesWithoutSubscriptions( ) {
			_log.DebugFormat("GetMailboxesWithoutSubscriptions method started");
			Dictionary<Guid, string> mailboxes = GetExchangeEmailMailboxes();
			_log.InfoFormat("GetMailboxesWithoutSubscriptions: selected {0} mailboxes", mailboxes.Count);
			if (!NeedProceed(mailboxes)) {
				_log.DebugFormat("GetMailboxesWithoutSubscriptions method ended");
				return new Dictionary<Guid, string>();
			}
			if (GetIsListenerServiceAvaliable()) {
				_log.DebugFormat("GetMailboxesWithoutSubscriptions: listener service avaliable, mailboxes subscriptions check started");
				FilterActiveMailboxes(mailboxes);
				_log.InfoFormat("GetMailboxesWithoutSubscriptions: filtered to {0} mailboxes", mailboxes.Count);
			}
			if (!NeedProceed(mailboxes)) {
				_log.DebugFormat("GetMailboxesWithoutSubscriptions method ended");
				return new Dictionary<Guid, string>();
			}
			_log.DebugFormat("GetMailboxesWithoutSubscriptions method ended");
			return mailboxes;
		}

		/// <summary>
		/// Starts failover handlers for <paramref name="mailboxes"/>.
		/// </summary>
		/// <param name="mailboxes">Mailboxes without subscriptions collection.</param>
		private void ScheduleFailoverHandlers(Dictionary<Guid, string> mailboxes) {
			_log.DebugFormat("StartFailoverHandlers started");
			var schedulerWraper = ClassFactory.Get<IAppSchedulerWraper>();
			schedulerWraper.RemoveGroupJobs(_jobGroupName);
			_log.DebugFormat("All jobs from {0} job group deleted.", _jobGroupName);
			foreach (var mailbox in mailboxes) {
				var parameters = new Dictionary<string, object> {
					{ "mailboxId", mailbox.Key }
				};
				schedulerWraper.ScheduleImmediateJob<ListenerServiceFailHandler>(_jobGroupName, UserConnection.Workspace.Name,
					mailbox.Value, parameters);
				_log.DebugFormat("ListenerServiceFailHandler for {0} mailbox started using {1} user.", mailbox.Key, mailbox.Value);
			}
			_log.DebugFormat("StartFailoverHandlers ended");
		}

		/// <summary>
		/// Checks is feature enabled.
		/// </summary>
		/// <param name="userConnection"><see cref="UserConnection"/> instance.</param>
		/// <param name="code">Feature code.</param>
		/// <returns><c>True</c> if feature enabled for current user. Returns <c>false</c> otherwise.</returns>
		private bool GetIsFeatureEnabled(UserConnection userConnection, string code) {
			var featureUtil = ClassFactory.Get<IFeatureUtilities>();
			return featureUtil.GetIsFeatureEnabled(userConnection, code);
		}

		#endregion

		#region Methods: Protected

		/// <summary>
		/// Returns exchange mailboxes with enabled email synchronization.
		/// </summary>
		/// <returns>Collection of exchange mailboxes with enabled email synchronization.</returns>
		protected Dictionary<Guid, string> GetExchangeEmailMailboxes() {
			_log.DebugFormat("GetExchangeEmailMailboxes started");
			var mailboxService = ClassFactory.Get<IMailboxService>(new ConstructorArgument("uc", UserConnection));
			var result = mailboxService.GetExchangeMailboxes();
			_log.DebugFormat("GetExchangeEmailMailboxes ended");
			return result.ToDictionary(
					m => m.Id,
					m => m.OwnerUserName
				);
		}

		/// <summary>
		/// Checks that exchange listeners service avaliable.
		/// </summary>
		/// <returns><c>True</c> if exchange listeners service avaliable. Otherwise returns <c>false</c>.</returns>
		protected bool GetIsListenerServiceAvaliable() {
			return ListenerManager.GetIsServiceAvaliable();
		}

		/// <summary>
		/// Removes mailboxes with active subscriptions from <paramref name="mailboxes"/>.
		/// </summary>
		/// <param name="mailboxes">Collection of exchange mailboxes with enabled email synchronization.</param>
		protected void FilterActiveMailboxes(Dictionary<Guid, string> mailboxes) {
			_log.DebugFormat("FilterActiveMailboxes started");
			var subscriptions = ListenerManager.GetSubscriptionsStatuses(mailboxes.Select(kvp => kvp.Key).ToArray());
			_log.DebugFormat("Recived {0} subscriptions state info from listener service.", subscriptions.Count);
			foreach (var existingSubscription in subscriptions.Where(kvp => kvp.Value == _subscriptionExistsState)
					.Select(kvp => kvp.Key)) {
				mailboxes.Remove(existingSubscription);
			}
			_log.DebugFormat("FilterActiveMailboxes ended");
		}

		/// <summary>
		/// Creates <see cref="ExchangeListenerManager"/> instance.
		/// </summary>
		protected IExchangeListenerManager GetExchangeListenerManager() {
			var managerFactory = ClassFactory.Get<IListenerManagerFactory>();
			return managerFactory.GetExchangeListenerManager(UserConnection);
		}

		/// <summary>
		/// Returns is fail handling steel needed for <paramref name="mailboxes"/>.
		/// </summary>
		/// <param name="mailboxes">Collection of exchange mailboxes with enabled email synchronization.</param>
		/// <returns><c>True</c> if fail handling steel needed for <paramref name="mailboxes"/>. 
		/// Otherwise returns <c>false</c>.</returns>
		protected bool NeedProceed(Dictionary<Guid, string> mailboxes) {
			return mailboxes.Count > 0;
		}

		#endregion

		#region Methods: Public

		/// <summary>
		/// Check exchange mailboxes subscriptions state. Starts exchange events service. 
		/// Fail handler for mailboxes without subscription.
		/// </summary>
		/// <param name="userConnection"><see cref="UserConnection"/> instance.</param>
		/// <param name="parameters">Process parameters collection.</param>
		public void Execute(UserConnection userConnection, IDictionary<string, object> parameters) {
			try {
				_log.InfoFormat("ListenerServiceFailJob started");
				if (!GetIsFeatureEnabled(userConnection, "ExchangeListenerEnabled")) {
					return;
				}
				UserConnection = userConnection;
				ListenerManager = GetExchangeListenerManager();
				_log.DebugFormat("ListenerServiceFailJob: _listenerManager initiated");
				var mailboxes = GetMailboxesWithoutSubscriptions();
				ScheduleFailoverHandlers(mailboxes);
			} finally {
				int periodMin = Core.Configuration.SysSettings.GetValue(userConnection, "ListenerServiceFailJobPeriod", 1);
				if (periodMin == 0) {
					var schedulerWraper = ClassFactory.Get<IAppSchedulerWraper>();
					schedulerWraper.RemoveGroupJobs(ListenerServiceFailJobFactory.JobGroupName);
					_log.ErrorFormat("ListenerServiceFailJobPeriod is 0, ListenerServiceFailJob stopped");
				}
				_log.InfoFormat("ListenerServiceFailJob ended");
			}
		}

		#endregion

	}

	#endregion

}