namespace Terrasoft.EmailDomain
{
	using System;
	using System.Collections.Generic;
	using System.Linq;
	using EmailContract;
	using IntegrationApi.Interfaces;
	using Terrasoft.Core;
	using Terrasoft.Core.Entities;
	using Terrasoft.Core.Factories;
	using Terrasoft.EmailDomain.Interfaces;
	using Terrasoft.EmailDomain.Model;
	using Terrasoft.Mail.Sender;

	#region Class: EmailRepository

	/// <summary>
	/// Email message model repository.
	/// </summary>
	[DefaultBinding(typeof(IEmailRepository))]
	internal class EmailRepository : IEmailRepository
	{

		#region Fields: Private

		/// <summary>
		/// <see cref="UserConnection"/> instance.
		/// </summary>
		private UserConnection _userConnection;

		/// <summary>
		/// <see cref="IActivityUtils"/> implementation instance.
		/// </summary>
		private readonly IActivityUtils _activityUtils = ClassFactory.Get<IActivityUtils>();

		/// <summary>
		/// <see cref="IAttachmentRepository"/> implementation instance.
		/// </summary>
		private readonly IAttachmentRepository _attachmentRepository;

		#endregion

		#region Constructors: Public

		public EmailRepository(UserConnection uc) {
			_userConnection = uc;
			_attachmentRepository = ClassFactory.Get<IAttachmentRepository>(new ConstructorArgument("uc", uc));
		}

		#endregion

		#region Methods: Private

		/// <summary>
		/// Creates activity instance for <paramref name="email"/>.
		/// </summary>
		/// <param name="email">Email model instance.</param>
		/// <returns>Saved activity instance.</returns>
		private Entity CreateActivity(EmailModel email) {
			var schema = _userConnection.EntitySchemaManager.GetInstanceByName("Activity");
			var activity = schema.CreateEntity(_userConnection);
			activity.SetDefColumnValues();
			activity.SetColumnValue("Sender", email.From);
			activity.SetColumnValue("SendDate", email.SendDate);
			activity.SetColumnValue("Title", email.Subject);
			activity.SetColumnValue("TypeId", IntegrationConsts.EmailTypeId);
			activity.SetColumnValue("Body", email.Body);
			activity.SetColumnValue("IsHtmlBody", email.IsHtmlBody);
			activity.SetColumnValue("HeaderProperties", string.Join("\n", email.Headers));
			activity.SetColumnValue("OwnerId", _userConnection.CurrentUser.ContactId);
			activity.SetColumnValue("Recepient", string.Join(" ", email.To));
			activity.SetColumnValue("CopyRecepient", string.Join(" ", email.Copy));
			activity.SetColumnValue("BlindCopyRecepient", string.Join(" ", email.BlindCopy));
			activity.SetColumnValue("EmailSendStatusId", IntegrationConsts.EmailSentStatusId);
			activity.SetColumnValue("PriorityId", GetActivityPriority(email.Importance));
			activity.SetColumnValue("ActivityCategoryId", IntegrationConsts.EmailCategoryId);
			activity.SetColumnValue("StatusId", IntegrationConsts.ActivityCompletedStatusId);
			activity.SetColumnValue("DueDate", email.SendDate);
			activity.SetColumnValue("StartDate", email.SendDate);
			activity.SetColumnValue("MailHash", _activityUtils.GetEmailHash(_userConnection, email.SendDate, email.Subject,
				email.OriginalBody, _userConnection.CurrentUser.TimeZone));
			SaveActivity(activity, email);
			return activity;
		}

		/// <summary>
		/// Saves <paramref name="activity"/> to database.
		/// </summary>
		/// <param name="activity">Activity entity instance.</param>
		/// <param name="email">Email model instance.</param>
		private void SaveActivity(Entity activity, EmailModel email) {
			List<Guid> emailIds = _activityUtils.GetExistingEmaisIds(_userConnection, email.SendDate, email.Subject,
				email.OriginalBody, _userConnection.CurrentUser.TimeZone);
			if (emailIds.Any()) {
				var emailId = emailIds.First();
				activity.PrimaryColumnValue = emailId;
				email.Id = emailId;
			} else {
				activity.Save();
				email.Id = activity.PrimaryColumnValue;
				_attachmentRepository.SaveAttachments(email);
			}
		}

		/// <summary>
		/// Creates EmailMessageData instance for <paramref name="activity"/>.
		/// </summary>
		/// <param name="activity">Activity entity instance.</param>
		/// <param name="email">Email model instance.</param>
		/// <param name="mailboxId">Mailbox identifier.</param>
		/// <param name="syncSessionId">Synchronization session identifier.</param>
		private void CreateEmailMessageData(Entity activity, EmailModel email, Guid mailboxId, string syncSessionId) {
			var ticks = _activityUtils.GetSendDateTicks(_userConnection, activity);
			var userConnectionParam = new ConstructorArgument("userConnection", _userConnection);
			var helper = ClassFactory.Get<IEmailMessageHelper>(userConnectionParam);
			Dictionary<string, string> headers = new Dictionary<string, string>() {
				{ "MessageId", email.MessageId },
				{ "InReplyTo", email.InReplyTo },
				{ "SyncSessionId", syncSessionId },
				{ "References", email.References },
				{ "SendDateTicks", ticks.ToString() }
			};
			helper.CreateEmailMessage(activity, mailboxId, headers);
		}

		/// <summary>
		/// Returns <paramref name="importance"/> identifier.
		/// </summary>
		/// <param name="importance">Email message importance.</param>
		/// <returns>Message importance identifier.</returns>
		private Guid GetActivityPriority(EmailImportance importance) {
			return EmailPriorityConverter.GetActivityPriority((int)importance);
		}

		#endregion

		#region Methods: Public

		/// <inheritdoc cref="IEmailRepository.Save(EmailModel, Guid, string)"/>
		public void Save(EmailModel email, Guid mailboxId = default(Guid), string syncSessionId = null) {
			var activity = CreateActivity(email);
			CreateEmailMessageData(activity, email, mailboxId, syncSessionId);
		}

		#endregion

	}

	#endregion

}
