namespace Terrasoft.EmailDomain.EventProcessing
{
	using System;
	using System.Collections.Generic;
	using System.Linq;
	using global::Common.Logging;
	using EmailContract.DTO;
	using IntegrationApi.Email;
	using IntegrationApi.Interfaces;
	using Terrasoft.Core;
	using Terrasoft.Core.Factories;
	using Terrasoft.EmailDomain.Interfaces;

	#region Class: LoadEmailEventExecutor

	/// <summary>
	/// Synchronization action for full emails events.
	/// </summary>
	[DefaultBinding(typeof(LoadEmailEventExecutor))]
	public class LoadEmailEventExecutor : BaseLoadEmailEventExecutor
	{

		#region Fields: Private

		private ILog _log = LogManager.GetLogger("ExchangeListener");

		#endregion

		#region Methods: Private

		/// <summary>
		/// Locks email for synchronization in current task.
		/// </summary>
		/// <param name="uc"><see cref="UserConnection"/> instance.</param>
		/// <param name="emailDTO"><see cref="Email"/> instance.</param>
		/// <returns><c>True</c> if email locked for current task. Otherwise returns <c>false</c>.</returns>
		private bool LockItemForSync(UserConnection uc, Email emailDTO) {
			var helper = ClassFactory.Get<IEntitySynchronizerHelper>();
			return helper.CanCreateEntityInLocalStore(emailDTO.MessageId, uc, "EmailSynchronization");
		}

		/// <inheritdoc cref="BaseLoadEmailEventExecutor.Synchronize(UserConnection, IDictionary{string, object})"/>
		protected override void Synchronize(UserConnection uc, IDictionary<string, object> parameters) {
			_log.Info($"LoadEmailEventExecutor.Synchronize started");
			var emails = parameters["Items"] as IEnumerable<Email>;
			if (!emails.Any()) {
				_log.Info($"LoadEmailEventExecutor.Synchronize - no emails passed");
				return;
			}
			var emailService = ClassFactory.Get<IEmailService>(new ConstructorArgument("uc", uc));
			_log.Info($"IEmailService created");
			var synsSessionId = string.Format("LoadEmailEventSyncSession_{0}", Guid.NewGuid());
			var mailboxId = (Guid)parameters["MailboxId"];
			foreach (var emailDto in emails) {
				if (LockItemForSync(uc, emailDto)) {
					_log.Info($"{synsSessionId} - item {emailDto.MessageId} locked for sync");
					emailService.Save(emailDto, mailboxId, synsSessionId);
				} else {
					NeedReRun = true;
				}
			}
			SaveSyncSession(uc, synsSessionId);
			UnlockSyncedEntities(uc);
			_log.Info($"LoadEmailEventExecutor.Synchronize ended");
		}
		
		/// <summary>
		/// Sends synchronization session finish message.
		/// </summary>
		/// <param name="userConnection"><see cref="UserConnection"/> instance.</param>
		protected void SaveSyncSession(UserConnection userConnection, string synsSessionId) {
			var userConnectionParam = new ConstructorArgument("userConnection", userConnection);
			var helper = ClassFactory.Get<IEmailMessageHelper>(userConnectionParam);
			helper.SendSyncSessionFinished(synsSessionId);
		}

		#endregion

		#region Methods: Public

		/// <inheritdoc cref="BaseLoadEmailEventExecutor.Run(IDictionary{string, object})"/>
		public override void Run(IDictionary<string, object> parameters) {
			_log.Info($"LoadEmailEventExecutor.Run started");
			base.Run(parameters);
		}

		#endregion

	}

	#endregion

}
