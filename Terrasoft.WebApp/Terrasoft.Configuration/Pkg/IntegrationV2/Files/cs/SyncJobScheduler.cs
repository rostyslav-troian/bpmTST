namespace IntegrationV2
{
	using System;
	using System.Collections.Generic;
	using Common.Logging;
	using IntegrationApi.Interfaces;
	using Terrasoft.Core;
	using Terrasoft.Core.Factories;

	#region Class: SyncJobScheduler

	[DefaultBinding(typeof(ISyncJobScheduler))]
	public class SyncJobScheduler : ISyncJobScheduler
	{

		#region Fields: Private

		/// <summary>
		/// Synchronization jobs name.
		/// </summary>
		private const string SyncJobGroupName = "Exchange";
		
		/// <summary>
		/// Exchange integration logger.
		/// </summary>
		private ILog _log { get; } = LogManager.GetLogger("Exchange");

		/// <summary>
		/// <see cref="IAppSchedulerWraper"/> implementation.
		/// </summary>
		private readonly IAppSchedulerWraper _appSchedulerWraper = ClassFactory.Get<IAppSchedulerWraper>();

		#endregion

		#region Methods: Private

		private string GetSyncJobName(UserConnection userConnection, string jobName) {
			return $"{jobName}_{userConnection.CurrentUser.Id}";
		}

		private string GetSyncJobName(UserConnection userConnection, string jobName,
				string senderEmailAddress, string suffix = null) {
			string result = $"{senderEmailAddress}_{jobName}_{userConnection.CurrentUser.Id}";
			return string.IsNullOrEmpty(suffix) ? result : $"{result}_{suffix}";
		}

		/// <summary>
		/// Removes <paramref name="syncJobName"/> job from scheduled jobs.
		/// </summary>
		/// <param name="syncJobName">Synchronization job name.</param>
		/// <param name="userConnection"><see cref="UserConnection"/> instance.</param>
		private void RemoveProcessJob(string syncJobName, UserConnection userConnection) {
			var stackTrace = new System.Diagnostics.StackTrace(false);
			_log.ErrorFormat("RemoveJob called: CurrentUser {0}, SyncJobName {1}. Trace: {2}",
				userConnection.CurrentUser.Name, syncJobName, stackTrace.ToString());
			_appSchedulerWraper.RemoveJob(syncJobName, SyncJobGroupName);
		}

		/// <summary>
		/// Creates exchange synchronization process job.
		/// </summary>
		/// <param name="userConnection"><see cref="UserConnection"/> instance.</param>
		/// <param name="syncJobName">Synchronization job name.</param>
		/// <param name="processName">Synchronization process name.</param>
		/// <param name="period">Synchronization job run perion in minutes.</param>
		/// <param name="parameters">Synchronization process parameters.</param>
		private void CreateProcessJob(UserConnection userConnection, string syncJobName, string processName,
				int period, IDictionary<string, object> parameters) {
			RemoveProcessJob(syncJobName, userConnection);
			if (period == 0) {
				parameters.Add("CreateReminding", true);
				_log.ErrorFormat("ScheduleImmediateProcessJob called: CurrentUser {0}, SyncJobName {1}",
					userConnection.CurrentUser.Name, syncJobName);
				_appSchedulerWraper.ScheduleImmediateProcessJob(syncJobName, SyncJobGroupName, processName,
					userConnection.Workspace.Name, userConnection.CurrentUser.Name, parameters);
			} else {
				_log.ErrorFormat("ScheduleMinutelyJob called: CurrentUser {0}, SyncJobName {1}",
					userConnection.CurrentUser.Name, syncJobName);
				_appSchedulerWraper.ScheduleMinutelyJob(syncJobName, SyncJobGroupName, processName,
					userConnection.Workspace.Name, userConnection.CurrentUser.Name, period, parameters);
			}
		}

		#endregion

		#region Methods: Public

		/// <inheritdoc cref="ISyncJobScheduler.CreateSyncJob(UserConnection, int, string, IDictionary<string, object>)"/>
		public void CreateSyncJob(UserConnection userConnection, int periodInMinutes, string processName,
				IDictionary<string, object> parameters = null) {
			string suffix = string.Empty;
			if (periodInMinutes < 0) {
				throw new ArgumentOutOfRangeException("periodInMinutes");
			}
			if (periodInMinutes == 0) {
				suffix = "ImmediateProcessJob";
			}
			string syncJobName;
			if (parameters != null && parameters.ContainsKey("SenderEmailAddress")) {
				syncJobName = GetSyncJobName(userConnection, processName, parameters["SenderEmailAddress"].ToString(), suffix);
			} else {
				syncJobName = GetSyncJobName(userConnection, processName);
			}
			CreateProcessJob(userConnection, syncJobName, processName, periodInMinutes, parameters);
		}

		/// <inheritdoc cref="ISyncJobScheduler.RemoveSyncJob(UserConnection, string, string"/>
		public void RemoveSyncJob(UserConnection userConnection, string senderEmailAddress, string processName) {
			string syncJobName = GetSyncJobName(userConnection, processName, senderEmailAddress);
			RemoveProcessJob(syncJobName, userConnection);
		}

		#endregion

	}

	#endregion

}
