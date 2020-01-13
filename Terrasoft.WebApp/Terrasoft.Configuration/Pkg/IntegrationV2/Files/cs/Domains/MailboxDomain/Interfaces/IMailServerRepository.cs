namespace IntegrationV2.MailboxDomain.Interfaces
{
	using System.Collections.Generic;
	using IntegrationApi.MailboxDomain.Model;

	#region Interface: IMailServerRepository

	/// <summary>
	/// Mailbox provider storage repository interface.
	/// </summary>
	internal interface IMailServerRepository
	{

		#region Methods: Internal

		/// <summary>
		/// Returns all mailbox providers list.
		/// </summary>
		/// <returns><see cref="MailServer"/> collection.</returns>
		IEnumerable<MailServer> GetAll();

		#endregion

	}

	#endregion

}
