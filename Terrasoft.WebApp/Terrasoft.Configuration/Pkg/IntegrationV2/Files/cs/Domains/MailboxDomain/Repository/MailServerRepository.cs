namespace IntegrationV2.MailboxDomain.Repository
{
	using System.Collections.Generic;
	using IntegrationApi.MailboxDomain.Model;
	using IntegrationV2.MailboxDomain.Interfaces;
	using Terrasoft.Core;
	using Terrasoft.Core.DB;
	using Terrasoft.Core.Factories;

	#region Class: MailServerRepository

	/// <summary>
	/// Mail server repository implementation.
	/// </summary>
	[DefaultBinding(typeof(IMailServerRepository))]
	internal class MailServerRepository : IMailServerRepository
	{

		#region Fields: Private

		private UserConnection _userConnection;

		#endregion

		#region Conctructors: Public

		public MailServerRepository(UserConnection uc) {
			_userConnection = uc;
		}

		#endregion

		#region Methods: Private

		private Select GetMailServersQuery() {
			return new Select(_userConnection)
					.Column("MS", "Id")
					.Column("MS", "IsExchengeAutodiscover")
					.Column("MS", "ExchangeEmailAddress")
					.Column("MS", "TypeId")
					.Column("MS", "AllowEmailDownloading")
					.Column("MS", "AllowEmailSending")
					.Column("MS", "Address")
					.Column("MS", "Port")
					.Column("MS", "UseSSL")
					.Column("OAA", "ClientClassName")
				.From("MailServer").As("MS")
				.LeftOuterJoin("OAuthApplications").As("OAA").On("MS", "OAuthApplicationId").IsEqual("OAA", "Id") as Select;
		}

		#endregion

		#region Methods: Public

		/// <inheritdoc cref="IMailServerRepository.GetAll"/>
		public IEnumerable<MailServer> GetAll() {
			var query = GetMailServersQuery();
			using (var dbExecutor = _userConnection.EnsureDBConnection()) {
				using (var reader = query.ExecuteReader(dbExecutor)) {
					while (reader.Read()) {
						yield return new MailServer(reader);
					}
				}
			}
		}

		#endregion

	}

	#endregion

}
