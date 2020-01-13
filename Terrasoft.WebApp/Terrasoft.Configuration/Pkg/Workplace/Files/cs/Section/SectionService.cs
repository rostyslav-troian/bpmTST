namespace Terrasoft.Configuration.Section
{
	using System;
	using System.Collections.Generic;
	using System.Linq;
	using System.ServiceModel;
	using System.ServiceModel.Activation;
	using System.ServiceModel.Web;
	using Newtonsoft.Json;
	using Terrasoft.Common;
	using Terrasoft.Core.Factories;
	using Terrasoft.Web.Common;

	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
	public class SectionService: BaseService
	{

		#region Methods: Private

		/// <summary>
		/// Creates <see cref="ISectionManager"/> implementation instance.
		/// </summary>
		/// <param name="type">Section manager type.</param>
		/// <returns><see cref="ISectionManager"/> implementation instance.</returns>
		private ISectionManager GetSectionManager(string type) {
			return ClassFactory.Get<ISectionManager>(new ConstructorArgument("uc", UserConnection),
				new ConstructorArgument("sectionType", type));
		}

		#endregion

		#region Methods: Public

		[OperationContract]
		[WebInvoke(Method = "POST", BodyStyle = WebMessageBodyStyle.Wrapped,
			RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
		public IEnumerable<string> GetGeneralAndSspSections(Guid sectionId) {
			var manager = GetSectionManager("General");
			var result = new List<string>();
			try {
				var sections = manager.GetSameEntitySections(sectionId);
				result.AddRangeIfNotExists(sections.Select(s => s.ToString()));
			}
			catch (Exception) {
			}
			return result;
		}

		[OperationContract]
		[WebInvoke(Method = "POST", BodyStyle = WebMessageBodyStyle.Wrapped,
			RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
		public IEnumerable<string> GetSectionsAvaliableForWorkplace(Guid workplaceId) {
			var manager = GetSectionManager("General");
			var result = manager.GetAvailableWorkplaceSections(workplaceId);
			return result.Select(s => s.ToString());
		}

		[OperationContract]
		[WebInvoke(Method = "POST", BodyStyle = WebMessageBodyStyle.Wrapped,
			RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
		public IEnumerable<string> GetSectionsWithoutSspView() {
			var manager = GetSectionManager("SSP");
			var result = manager.GetByType(SectionType.General);
			return result.Select(s => s.ToString());
		}

		[OperationContract]
		[WebInvoke(Method = "POST", BodyStyle = WebMessageBodyStyle.Wrapped,
			RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
		public IEnumerable<Guid> GetUsedEntityIds(Guid sectionId) {
			var manager = GetSectionManager("SSP");
			return manager.GetRelatedEntityIds(sectionId);
		}

		[OperationContract]
		[WebInvoke(Method = "POST", BodyStyle = WebMessageBodyStyle.Wrapped,
			RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
		public string GetSectionTypes() {
			var dictionary = new Dictionary<string, int>();
			foreach (SectionType sectionType in (SectionType[])Enum.GetValues(typeof(SectionType))) {
				dictionary.Add(sectionType.ToString().ToUpper(), (int)sectionType);
			}
			return JsonConvert.SerializeObject(dictionary);
		}

		[OperationContract]
		[WebInvoke(Method = "POST", BodyStyle = WebMessageBodyStyle.Wrapped,
			RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
		public IEnumerable<string> GetEntitiesWithAdministrationErrors(Guid sectionId) {
			var manager = GetSectionManager("SSP");
			return manager.GetSectionNonAdministratedByRecordsEntityCaptions(sectionId);
		}

		[OperationContract]
		[WebInvoke(Method = "POST", BodyStyle = WebMessageBodyStyle.Wrapped,
			RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
		[return: MessageParameter(Name = "IsErrorOccurred")]
		public bool SetSectionSchemasAdministratedByRecords(Guid sectionId) {
			bool isErrorOccurred = false;
			try {
				var manager = GetSectionManager("SSP");
				manager.SetSectionSchemasAdministratedByRecords(sectionId);
			} catch {
				isErrorOccurred = true;
			}
			return isErrorOccurred;
		}

		#endregion

	}
}