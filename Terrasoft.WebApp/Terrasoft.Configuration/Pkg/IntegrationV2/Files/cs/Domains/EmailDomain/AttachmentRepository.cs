namespace Terrasoft.EmailDomain
{
	using System;
	using IntegrationApi.Interfaces;
	using Terrasoft.Core;
	using Terrasoft.Core.Entities;
	using Terrasoft.Core.Factories;
	using Terrasoft.EmailDomain.Interfaces;
	using Terrasoft.EmailDomain.Model;

	#region Class: AttachmentRepository

	/// <summary>
	/// Attachment model repository.
	/// </summary>
	[DefaultBinding(typeof(IAttachmentRepository))]
	internal class AttachmentRepository : IAttachmentRepository
	{

		#region Fields: Private

		/// <summary>
		/// <see cref="UserConnection"/> instance.
		/// </summary>
		private readonly UserConnection _userConnection;

		#endregion

		#region Constructors: Public

		public AttachmentRepository(UserConnection uc) {
			_userConnection = uc;
		}

		#endregion

		#region Methods: Private

		/// <summary>
		/// Creates activity file entity.
		/// </summary>
		/// <param name="attach">Attachment model instance.</param>
		/// <param name="emailId">Email identifier.</param>
		/// <returns>Activity file entity.</returns>
		private Entity CreateActivityFileEntity(AttachmentModel attach, Guid emailId) {
			var activityFile = GetActivityFileEntity();
			var utils = ClassFactory.Get<IActivityUtils>();
			activityFile.SetDefColumnValues();
			var name = utils.GetAttachmentName(_userConnection, attach.Name);
			activityFile.PrimaryColumnValue = attach.Id;
			activityFile.SetColumnValue("Name", name);
			activityFile.SetColumnValue("Version", 1);
			activityFile.SetColumnValue("TypeId", IntegrationConsts.FileTypeId);
			activityFile.SetColumnValue("ActivityId", emailId);
			activityFile.SetColumnValue("ModifiedOn", DateTime.Now);
			activityFile.SetColumnValue("Uploaded", true);
			activityFile.SetColumnValue("Inline", attach.IsInline);
			return activityFile;
		}

		/// <summary>
		/// Saves <paramref name="attach"/> as <paramref name="emailId"/> activity file.
		/// </summary>
		/// <param name="attach">Attachment model instance.</param>
		/// <param name="emailId">Email identifier.</param>
		private void SaveActivityFile(AttachmentModel attach, Guid emailId) {
			var uploader = ClassFactory.Get<IFileUploader>("EmailAttachmentUploader", new ConstructorArgument("uc", _userConnection));
			var activityFile = CreateActivityFileEntity(attach, emailId);
			activityFile.Save();
			uploader.UploadAttach(activityFile.PrimaryColumnValue, activityFile.GetTypedColumnValue<string>("Name"), attach.Data);
		}

		/// <summary>
		/// Create empty activity file <see cref="Entity"/>.
		/// </summary>
		/// <returns>Activity file <see cref="Entity"/>.</returns>
		private Entity GetActivityFileEntity() {
			var schema = _userConnection.EntitySchemaManager.GetInstanceByName("ActivityFile");
			return schema.CreateEntity(_userConnection);
		}

		#endregion

		#region Methods: Public

		/// <inheritdoc cref="IAttachmentRepository.GetAttachmentLink(Guid)"/>
		public string GetAttachmentLink(Guid attachmentId) {
			var item = _userConnection.EntitySchemaManager.GetItemByName("ActivityFile");
			return $"../rest/FileService/GetFile/{item.UId}/{attachmentId}";
		}

		/// <inheritdoc cref="IAttachmentRepository.SaveAttachments(EmailModel)"/>
		public void SaveAttachments(EmailModel email) {
			foreach (var attach in email.Attachments) {
				SaveActivityFile(attach, email.Id);
			}
		}

		/// <inheritdoc cref="IAttachmentRepository.SetInline(Guid)"/>
		public void SetInline(Guid attachmentId) {
			var activityFileEntity = GetActivityFileEntity();
			if (activityFileEntity.FetchFromDB(attachmentId, false)) {
				activityFileEntity.SetColumnValue("Inline", true);
				activityFileEntity.Save();
			}
		}

		#endregion

	}

	#endregion

}
