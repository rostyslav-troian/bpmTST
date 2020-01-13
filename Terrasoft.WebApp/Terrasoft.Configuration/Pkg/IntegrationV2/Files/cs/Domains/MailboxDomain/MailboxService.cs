namespace IntegrationV2.MailboxDomain
{
	using System;
	using System.Collections.Generic;
	using System.Linq;
	using IntegrationApi.MailboxDomain.Interfaces;
	using IntegrationApi.MailboxDomain.Model;
	using IntegrationV2.MailboxDomain.Interfaces;
	using Terrasoft.Core;
	using Terrasoft.Core.Factories;
	using Terrasoft.EmailDomain;

	#region Class: MailboxService

	/// <summary>
	/// Mailbox service implementation.
	/// </summary>
	[DefaultBinding(typeof(IMailboxService))]
	public class MailboxService : IMailboxService
	{

		#region Fields: Private

		private IMailboxRepository _mailboxRepository;

		private UserConnection _userConnection;

		#endregion

		#region Constructors: Public

		public MailboxService(UserConnection uc) {
			_mailboxRepository = ClassFactory.Get<IMailboxRepository>(new ConstructorArgument("uc", uc));
			_userConnection = uc;
		}

		#endregion

		#region Methods: Public

		/// <inheritdoc cref="IMailboxService.GetMailboxBySenderEmailAddress(string, bool)"/>
		public Mailbox GetMailboxBySenderEmailAddress(string senderEmailAddress, bool userMailboxesOnly = true) {
			var allMailboxes = _mailboxRepository.GetAll(userMailboxesOnly);
			return userMailboxesOnly
				? allMailboxes.FirstOrDefault(m => m.SenderEmailAddress == senderEmailAddress && 
					(m.OwnerId.Equals(_userConnection.CurrentUser.Id) || m.IsShared))
				: allMailboxes.FirstOrDefault(m => m.SenderEmailAddress == senderEmailAddress);
		}

		/// <inheritdoc cref="IMailboxService.GetMailbox(Guid, bool)"/>
		public Mailbox GetMailbox(Guid mailboxId, bool userMailboxesOnly = true) {
			return _mailboxRepository.GetAll(userMailboxesOnly)
				.FirstOrDefault(m => m.Id.Equals(mailboxId));
		}


		/// <inheritdoc cref="IMailboxService.GetExchangeMailboxes()"/>
		public List<Mailbox> GetExchangeMailboxes() {
			return _mailboxRepository.GetAll(false).Where(m => 
				m.TypeId.Equals(IntegrationConsts.ExchangeMailServerTypeId) &&
				m.AllowSynchronization && !m.SynchronizationStopped).ToList();
		}

		#endregion

	}

	#endregion

}
