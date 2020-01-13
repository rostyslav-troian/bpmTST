namespace Terrasoft.EmailDomain
{
	using global::Common.Logging;
	using IntegrationApi.Interfaces;
	using IntegrationApi.MailboxDomain.Interfaces;
	using IntegrationApi.MailboxDomain.Model;
	using Terrasoft.Core;
	using Terrasoft.Core.Factories;

	#region Class: EmailsSyncSession
	
	[DefaultBinding(typeof(ISyncSession), Name = "Email")]
	public class EmailsSyncSession : ISyncSession
	{

		#region Fields: Private

		private UserConnection _userConnection;

		private string _senderEmailAddress;

		private readonly ILog _log = LogManager.GetLogger("ExchangeListener");

		#endregion

		#region Constructors: Public

		public EmailsSyncSession(UserConnection uc, string senderEmailAddress) {
			_userConnection = uc;
			_senderEmailAddress = senderEmailAddress;
		}

		#endregion

		#region Methods: Private

		/// <summary>
		/// Returns current session mailbox model.
		/// </summary>
		/// <returns>Mailbox instance.</returns>
		private Mailbox GetMailbox() {
			var mailboxService = ClassFactory.Get<IMailboxService>(new ConstructorArgument("uc", _userConnection));
			return mailboxService.GetMailboxBySenderEmailAddress(_senderEmailAddress);
		}

		#endregion

		#region Methods: Public

		/// <summary>
		/// Starts emails synchronization.
		/// </summary>
		public void Start() {
			var mailbox = GetMailbox();
			if (!mailbox.CheckSynchronizationSettings()) {
				_log.Warn($"mailbox {mailbox.SenderEmailAddress} synchronization settings not valid");
				return;
			}
			var loadFromDate = mailbox.GetLoadFromDate(_userConnection);
			var managerFactory = ClassFactory.Get<IListenerManagerFactory>();
			var manager = managerFactory.GetExchangeListenerManager(_userConnection);
			manager.StartSynchronization(mailbox.Id, loadFromDate);
		}

		#endregion

	}

	#endregion

}
