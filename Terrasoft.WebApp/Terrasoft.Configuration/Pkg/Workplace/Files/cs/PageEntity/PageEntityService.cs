namespace Terrasoft.Configuration.PageEntity
{
	using System;
	using System.Collections.Generic;
	using System.Linq;
	using System.ServiceModel;
	using System.ServiceModel.Activation;
	using System.ServiceModel.Web;
	using Terrasoft.Core.Factories;
	using Terrasoft.Web.Common;

	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
	public class PageEntityService : BaseService
	{

		#region Methods: Private

		/// <summary>
		/// Creates <see cref="IPageEntityManager"/> implementation instance.
		/// </summary>
		/// <returns><see cref="IPageEntityManager"/> implementation instance.</returns>
		private IPageEntityManager GetSectionManager() {
			return ClassFactory.Get<IPageEntityManager>(new ConstructorArgument("uc", UserConnection));
		}

		#endregion

		#region Methods: Public

		[OperationContract]
		[WebInvoke(Method = "POST", BodyStyle = WebMessageBodyStyle.Wrapped,
			RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
		public IEnumerable<string> GetSectionPages(Guid sectionId) {
			var manager = GetSectionManager();
			var result = manager.GetSectionPages(sectionId);
			return result.Select(p => p.ToString());
		}

		[OperationContract]
		[WebInvoke(Method = "POST", BodyStyle = WebMessageBodyStyle.Wrapped,
			RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
		public IEnumerable<string> GetEntityPages(Guid entityId) {
			var manager = GetSectionManager();
			var result = manager.GetEntityPages(entityId);
			return result.Select(p => p.ToString());
		}

		#endregion

	}
}