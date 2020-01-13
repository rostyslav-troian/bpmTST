namespace Terrasoft.Configuration.Domain {
	using System;
	using System.Web;
	using Terrasoft.Core.Factories;
	using Terrasoft.Web.Common;

	#region Class: DomainResolver

	[DefaultBinding(typeof(IDomainResolver))]
	public class DomainFromRequestResolver : IDomainResolver {

		#region Fields: Private

		/// <summary>
		/// <see cref="HttpRequestWrapper"/> instance.
		/// </summary>
		private HttpRequestWrapper _request;

		#endregion

		#region Constructors: Public

		public DomainFromRequestResolver() {
			var currentRequest = HttpContext.Current.Request ?? throw new Exception("Current request is empty.");
			_request = new HttpRequestWrapper(currentRequest);
		}

		#endregion

		#region Methods: Public

		/// <inheritdoc cref="IDomainResolver.GetDomain"/>
		public string GetDomain() {
			return WebUtilities.GetUrl(_request, string.Empty);
		}

		#endregion

	}

	#endregion

}
