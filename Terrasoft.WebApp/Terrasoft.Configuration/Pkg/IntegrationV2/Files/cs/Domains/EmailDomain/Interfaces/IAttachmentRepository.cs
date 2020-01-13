namespace Terrasoft.EmailDomain.Interfaces
{
	using System;
	using Terrasoft.EmailDomain.Model;

	#region Interface: IAttachmentRepository

	/// <summary>
	/// Attachment model repository interface.
	/// </summary>
	internal interface IAttachmentRepository
	{

		#region Methods: Internal

		/// <summary>
		/// Saves attachments from <paramref name="email"/> to storage.
		/// </summary>
		/// <param name="email"><see cref="EmailModel"/> instance.</param>
		void SaveAttachments(EmailModel email);

		/// <summary>
		/// Returns file service link for <paramref name="attachmentId"/>.
		/// </summary>
		/// <param name="attachmentId">Attachment identifier.</param>
		/// <returns>Attachment file service link.</returns>
		string GetAttachmentLink(Guid attachmentId);

		/// <summary>
		/// Set inline flag.
		/// </summary>
		/// <param name="attachmentId">Attachment identifier.</param>
		void SetInline(Guid attachmentId);

		#endregion

	}

	#endregion

}
