namespace Terrasoft.Configuration.Url {
	using System;
	using Terrasoft.Core.Entities;

	#region Interface: IUrlGenerator

	public interface IUrlGenerator {

		/// <summary>
		/// Gets Url to view object.
		/// </summary>
		/// <param name="schemaName"><see cref="EntitySchema"/> name.</param>
		/// <param name="recordId">Record unique identifier.</param>
		/// <returns>Return Url to view object.</returns>
		string GetUrl(string schemaName, Guid recordId);

		/// <summary>
		/// Gets main page Url.
		/// </summary>
		/// <returns>Return main page Url.</returns>
		string GetDefaultUrl();
	}

	#endregion

}
