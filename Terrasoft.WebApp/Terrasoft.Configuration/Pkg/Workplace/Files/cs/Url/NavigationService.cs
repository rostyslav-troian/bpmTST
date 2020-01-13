namespace Terrasoft.Configuration.Url
{
	using System;
	using System.Net;
	using System.ServiceModel;
	using System.ServiceModel.Activation;
	using System.ServiceModel.Web;
	using System.Web;
	using Terrasoft.Core;
	using Terrasoft.Core.Factories;
	using Terrasoft.Web.Common;

	/// <summary>
	/// Represents navigation service.
	/// </summary>
	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
	public class NavigationService : BaseService
	{

		/// <summary>
		/// Returns <see cref="HttpRequestBase"/> instance.
		/// </summary>
		public HttpRequestBase Request { get; set; } = new HttpRequestWrapper(HttpContext.Current.Request);

		#region Methods: Private

		/// <summary>
		/// Creates <see cref="IUrlGenerator"/> implementation instance.
		/// </summary>
		/// <returns><see cref="IUrlGenerator"/> implementation instance.</returns>
		private IUrlGenerator GetUrlGenerator() {
			return ClassFactory.Get<IUrlGenerator>(new ConstructorArgument("uc", UserConnection));
		}

		/// <summary>
		/// Returns <see cref="HttpResponseBase"/> instance.
		/// </summary>
		/// <returns><see cref="HttpResponseBase"/> instance.</returns>
		private HttpResponseBase GetResponse() {
			return new HttpResponseWrapper(HttpContext.Current.Response);
		}

		#endregion

		#region Methods: Protected

		/// <summary>
		/// Gets navigation url.
		/// <param name="schemaName">Object schema name.</param>
		/// <param name="recordId">Object identifier.</param>
		/// </summary>
		/// <returns>Navigation url.</returns>
		protected string GetUrl(string schemaName, string recordId) {
			IUrlGenerator urlGenerator = GetUrlGenerator();
			string url = Guid.TryParse(recordId, out Guid id)
				? urlGenerator.GetUrl(schemaName, id)
				: urlGenerator.GetDefaultUrl();
			return url;
		}

		#endregion

		#region Constructors: Public

		public NavigationService(UserConnection userConnection) : base(userConnection) {
		}

		public NavigationService() : base() {
		}

		#endregion

		#region Methods: Public

		/// <summary>
		/// Redirects browser page to new url .
		/// </summary>
		/// <param name="schemaName">Object schema name.</param>
		/// <param name="recordId">Object identifier.</param>
		[OperationContract]
		[WebInvoke(Method = "GET", UriTemplate = "Redirect?schemaName={schemaName}&recordId={recordId}",
			BodyStyle = WebMessageBodyStyle.Wrapped, RequestFormat = WebMessageFormat.Json, 
			ResponseFormat = WebMessageFormat.Json)]
		public void Redirect(string schemaName, string recordId) {
			Request.Headers.Set("Redirect-Terrasoft", "true");
			HttpResponseBase response = GetResponse();
			response.AddHeader("Connection", "close");
			string url = GetUrl(schemaName, recordId);
			response.Redirect(url, false);
		}

		#endregion

	}
}