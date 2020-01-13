namespace IntegrationV2.MailboxDomain.Repository
{
	using System.Collections.Generic;
	using IntegrationApi.MailboxDomain.Model;
	using IntegrationV2.MailboxDomain.Interfaces;
	using Terrasoft.Core;
	using Terrasoft.Core.DB;
	using Terrasoft.Core.Factories;

	#region Class: MailboxFolderRepository

	/// <summary>
	/// Mailbox folders storage repository implementation.
	/// </summary>
	[DefaultBinding(typeof(IMailboxFolderRepository))]
	internal class MailboxFolderRepository : IMailboxFolderRepository
	{

		#region Fields: Private

		private UserConnection _userConnection;

		#endregion

		#region Constructors: Public

		public MailboxFolderRepository(UserConnection uc) {
			_userConnection = uc;
		}

		#endregion

		#region Methods: Private

		/// <summary>
		/// Creates mail folders query.
		/// </summary>
		/// <returns><see cref="Select"/> instance.</returns>
		private Select GetFoldersQuery() {
			return new Select(_userConnection)
					.Column("Id")
					.Column("FolderPath")
					.Column("MailboxId")
				.From("MailboxFoldersCorrespondence") as Select;
		}

		#endregion

		#region Methods: Public

		/// <inheritdoc cref="IMailboxFolderRepository.GetAll"/>
		public IEnumerable<MailboxFolder> GetAll() {
			var query = GetFoldersQuery();
			using (var dbExecutor = _userConnection.EnsureDBConnection()) {
				using (var reader = query.ExecuteReader(dbExecutor)) {
					while (reader.Read()) {
						yield return new MailboxFolder(reader);
					}
				}
			}
		}

		#endregion

	}

	#endregion

}
