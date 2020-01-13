namespace Terrasoft.Configuration
{
	using System;
	using System.ServiceModel;
	using System.ServiceModel.Activation;
	using System.ServiceModel.Web;
	using Terrasoft.Configuration.Section;
	using Terrasoft.Web.Common;

	/// <summary>
	/// Service for working with access to schemas on ssp.
	/// </summary>
	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
	public class SspSchemaAccessService : BaseService
	{

		/// <summary>
		/// Allows access of related schemas by given <param name="entitySchemaUId">schema UId</param> on ssp.
		/// </summary>
		/// <param name="entitySchemaUId">Entity schema UId.</param>
		/// <param name="cardSchemaUId">Card schema UId.</param>
		[OperationContract]
		[WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
			ResponseFormat = WebMessageFormat.Json)]
		public void AllowRelatedEntitiesOnSsp(Guid entitySchemaUId, Guid cardSchemaUId) {
			var repo = new SspEntitySchemaRepository(UserConnection);
			repo.AllowRelatedEntitiesOnSsp(entitySchemaUId, cardSchemaUId);
		}
	}
}