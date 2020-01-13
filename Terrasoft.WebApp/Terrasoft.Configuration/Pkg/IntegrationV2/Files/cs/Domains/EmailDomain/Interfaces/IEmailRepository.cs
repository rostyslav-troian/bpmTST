namespace Terrasoft.EmailDomain.Interfaces
{
	using System;
	using Terrasoft.Core;
	using Terrasoft.EmailDomain.Model;

	#region Interface: IEmailRepository

	/// <summary>
	/// Email model repository interface.
	/// </summary>
	internal interface IEmailRepository
	{

		#region Methods: Internal

		/// <summary>
		/// Saves <paramref name="email"/> to storage.
		/// </summary>
		/// <param name="email"><see cref="EmailModel"/> instnace.</param>
		/// <param name="mailboxId">Mailbox identifier.</param>
		/// <param name="syncSessionId">Synchronization session identifier.</param>
		void Save(EmailModel email, Guid mailboxId = default(Guid), string syncSessionId = null);

		#endregion

	}

	#endregion

}
