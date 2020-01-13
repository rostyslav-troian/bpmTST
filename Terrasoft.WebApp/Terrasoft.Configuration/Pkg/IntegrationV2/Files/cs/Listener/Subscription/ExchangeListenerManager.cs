namespace Terrasoft.Configuration
{
	using System;
	using System.Collections.Generic;
	using System.IO;
	using System.Net;
	using System.Text;
	using EmailContract.DTO;
	using global::Common.Logging;
	using IntegrationApi.Interfaces;
	using IntegrationApi.MailboxDomain.Interfaces;
	using IntegrationApi.MailboxDomain.Model;
	using Newtonsoft.Json.Linq;
	using Terrasoft.Common;
	using Terrasoft.Common.Json;
	using Terrasoft.Core;
	using Terrasoft.Core.Configuration;
	using Terrasoft.Core.Factories;
	using MailboxFolder = EmailContract.DTO.MailboxFolder;
	using TS = Terrasoft.Web.Http.Abstractions;

	#region Class: ExchangeListenerManager

	/// <summary>
	/// Class provides methods for exchange listeners service interaction.
	/// </summary>
	[DefaultBinding(typeof(IExchangeListenerManager))]
	public class ExchangeListenerManager : IExchangeListenerManager
	{

		#region Fields: Private

		/// <summary>
		/// <see cref="ILog"/> instance.
		/// </summary>
		private readonly ILog _log = LogManager.GetLogger("ExchangeListener");

		#endregion

		#region Fields: Protected

		/// <summary>
		/// <see cref="UserConnection"/> instance.
		/// </summary>
		protected readonly UserConnection UserConnection;

		/// <summary>
		/// <see cref="IHttpWebRequestFactory"/> implementation instance.
		/// </summary>
		protected readonly IHttpWebRequestFactory _requestFactory;

		/// <summary>
		/// <see cref="IMailboxService"/> implementation instance.
		/// </summary>
		protected readonly IMailboxService _mailboxService;

		#endregion

		#region Constructors: Public

		/// <summary>
		/// Initializes a new instance of the <see cref="ExchangeListenerManager"/> class.
		/// </summary>
		/// <param name="userConnection"><see cref="UserConnection"/> instance.</param>
		public ExchangeListenerManager(UserConnection userConnection) {
			UserConnection = userConnection;
			_requestFactory = ClassFactory.Get<IHttpWebRequestFactory>();
			_mailboxService = ClassFactory.Get<IMailboxService>(new ConstructorArgument("uc", userConnection));
		}

		#endregion

		#region Properties: Public

		/// <summary>
		/// Current <see cref="HttpRequest"/> instance.
		/// </summary>
		public TS.HttpRequest Request { get; set; } = TS.HttpContext.Current != null ? TS.HttpContext.Current.Request : null;

		#endregion

		#region Method: Private

		/// <summary>
		/// Calls <paramref name="action"/> and handles thrown exceptions.
		/// </summary>
		/// <param name="action">Authentication action.</param>
		/// <param name="senderEmailAddress">Mailbox address.</param>
		private void TryDoListenerAction(string senderEmailAddress, Action action) {
			try {
				action();
			} catch (Exception e) {
				bool isAggregateException = e.GetType() == typeof(AggregateException);
				string exceptionClassName, exceptionMessage;
				if (isAggregateException) {
					exceptionClassName = e.InnerException.GetType().Name;
					exceptionMessage = e.InnerException.Message;
				} else {
					exceptionClassName = e.GetType().Name;
					exceptionMessage = e.Message;
				}
				_log.Error(exceptionMessage, e);
				if (!GetIsFeatureDisabled("EmailIntegrationV2")) {
					var helper = ClassFactory.Get<ISynchronizationErrorHelper>
						(new ConstructorArgument("userConnection", UserConnection));
					helper.ProcessSynchronizationError(senderEmailAddress, exceptionClassName, exceptionMessage);
				}
				throw;
			}
		}

		/// <summary>
		/// Returns is feature enabled for <paramref name="uc"/>.
		/// </summary>
		/// <param name="uc"><see cref="UserConnection"/> instance.</param>
		/// <param name="code">Feature code.</param>
		/// <returns><c>True</c> if feature enabled, otherwise returns false.</returns>
		private bool GetIsFeatureDisabled(string code) {
			var featureUtil = ClassFactory.Get<IFeatureUtilities>();
			return !featureUtil.GetIsFeatureEnabled(UserConnection, code);
		}

		/// <summary>
		/// Combined url from <paramref name="request"/> and <paramref name="path"/>. 
		/// </summary>
		/// <param name="request"><see cref="HttpRequest"/> instance.</param>
		/// <param name="path">Url path.</param>
		/// <returns>Url.</returns>
		private string GetUrl(TS.HttpRequest request, string path) {
			var combinedPath = string.Concat(request.ApplicationPath?.TrimEnd('/'), "/", path);
			var port = request.Host.Port ?? -1;
			var uriBuilder = new UriBuilder(request.Scheme, request.Host.Host, port, combinedPath);
			return uriBuilder.Uri.ToString();
		}

		/// <summary>
		/// Returns bpm'online new email events endpoint uri.
		/// </summary>
		/// <returns>Bpm'online new email events endpoint uri.</returns>
		/// <seealso cref="ExchangeListenerService"/>.
		private string GetBpmEndpointUrl() {
			var endpointUrl = GetBpmonlineExchangeEventsEndpointUrl();
			if (endpointUrl.IsEmpty()) {
				throw new InvalidObjectStateException("Bpmonline exchange events endpoint url cannot be created. " +
					"Fill BpmonlineExchangeEventsEndpointUrl system setting.");
			}
			return endpointUrl;
		}

		/// <summary>
		/// Get value of BpmonlineExchangeEventsEndpointUrl system setting.
		/// </summary>
		/// <returns>Value of BpmonlineExchangeEventsEndpointUrl system setting.</returns>
		private string GetBpmonlineExchangeEventsEndpointUrl() {
			string endpointUrl = SysSettings.GetValue(UserConnection, "BpmonlineExchangeEventsEndpointUrl", "");
			if (endpointUrl.IsEmpty()) {
				endpointUrl = GetNewBpmonlineExchangeEventsEndpointUrl();
				SetBpmonlineExchangeEventsEndpointUrl(endpointUrl);
			}
			return endpointUrl;
		}

		/// <summary>
		/// Create new value of BpmonlineExchangeEventsEndpointUrl system setting.
		/// </summary>
		/// <returns>New value of BpmonlineExchangeEventsEndpointUrl system setting.</returns>
		private string GetNewBpmonlineExchangeEventsEndpointUrl() {
			var urlPath = GetIsFeatureDisabled("EmailIntegrationV2")
				? "ServiceModel/ExchangeListenerService.svc/NewEmail"
				: "ServiceModel/ExchangeListenerService.svc/ProcessFullEmail";
			return Request != null ? GetUrl(Request, urlPath) : string.Empty;
		}

		/// <summary>
		/// Set <paramref name="endpointUrl"/> to BpmonlineExchangeEventsEndpointUrl system setting.
		/// </summary>
		/// <param name="endpointUrl"></param>
		private void SetBpmonlineExchangeEventsEndpointUrl(string endpointUrl) {
			SysSettings.SetDefValue(UserConnection, "BpmonlineExchangeEventsEndpointUrl", endpointUrl);
		}

		/// <summary>
		/// Gets exchange server email events subscription credentials.
		/// </summary>
		/// <param name="mailboxId"><see cref="MailboxSyncSettings"/> instance inique identifier.</param>
		/// <returns><see cref="SynchronizationCredentials"/> instance.</returns>
		private SynchronizationCredentials GetSynchronizationCredentials(Guid mailboxId) {
			var mailbox = _mailboxService.GetMailbox(mailboxId);
			if (mailbox == null) {
				throw new ItemNotFoundException($"Mailbox {mailboxId} not found");
			}
			return GetSynchronizationCredentials(mailbox);
		}

		/// <summary>
		/// Gets exchange server email events subscription credentials.
		/// </summary>
		/// <param name="mailboxId"><see cref="MailboxSyncSettings"/> instance inique identifier.</param>
		/// <returns><see cref="SynchronizationCredentials"/> instance.</returns>
		private SynchronizationCredentials GetSynchronizationCredentials(string mailboxName) {
			var mailbox = _mailboxService.GetMailboxBySenderEmailAddress(mailboxName);
			if (mailbox == null) {
				throw new ItemNotFoundException($"Mailbox {mailboxName} not found");
			}
			return GetSynchronizationCredentials(mailbox);
		}

		/// <summary>
		/// Gets exchange server email events subscription credentials.
		/// </summary>
		/// <param name="mailbox"><see cref="Mailbox"/> instance.</param>
		/// <returns><see cref="SynchronizationCredentials"/> instance.</returns>
		private SynchronizationCredentials GetSynchronizationCredentials(Mailbox mailbox) {
			var credentials = mailbox.ConvertToSynchronizationCredentials(UserConnection);
			credentials.BpmEndpoint = GetBpmEndpointUrl();
			return credentials;
		}

		/// <summary>
		/// Creates exchange server email events subscription parameters for <paramref name="mailboxId"/>.
		/// </summary>
		/// <param name="mailboxId"><see cref="MailboxSyncSettings"/> instance inique identifier.</param>
		/// <returns>Exchange server email events subscription parameters data array.</returns>
		private byte[] GetConnectionParams(Guid mailboxId) {
			var mailbox = _mailboxService.GetMailbox(mailboxId);
			if (mailbox == null) {
				throw new ItemNotFoundException($"Mailbox {mailboxId} not found");
			}
			var credentials = GetSynchronizationCredentials(mailbox);
			var json = Json.Serialize(credentials);
			return Encoding.UTF8.GetBytes($"[{json}]");
		}

		/// <summary>
		/// Serialize exchange server credentials.
		/// </summary>
		/// <param name="credentials"><see cref="SynchronizationCredentials"/> instance.</param>
		/// <returns>Exchange server credentials data array.</returns>
		private byte[] Serialize(SynchronizationCredentials credentials) {
			var json = Json.Serialize(credentials);
			return Encoding.UTF8.GetBytes(json);
		}

		/// <summary>
		/// Executes ecxchange listener action.
		/// </summary>
		/// <param name="data"><see cref="byte"/> array action parameters.</param>
		/// <param name="exchangeListenerAction"><see cref="ExchangeListenerActions"/> value.</param>
		/// <returns>Response string value.</returns>
		private string ExecuteListenerAction(byte[] data, string exchangeListenerAction) {
			string serviceUri = ExchangeListenerActions.GetActionUrl(UserConnection, exchangeListenerAction);
			return ExecuteAction(data, serviceUri);
		}

		/// <summary>
		/// Returns mailbox folders list from integration provider.
		/// </summary>
		/// <param name="data"><see cref="byte"/> array action parameters.</param>
		/// <returns>Response string value.</returns>
		private string GetFoldersFromProvider(byte[] data) {
			string serviceUri = ExchangeListenerActions.GetAllMailboxFoldersUrl(UserConnection);
			return ExecuteAction(data, serviceUri);
		}

		/// <summary>
		/// Send <paramref name="data"/> to <paramref name="serviceUri"/>.
		/// </summary>
		/// <param name="data">Sending data.</param>
		/// <param name="serviceUri">Endpoint to data send.</param>
		/// <returns>Response string value.</returns>
		private string ExecuteAction(byte[] data, string serviceUri) {
			WebRequest request = _requestFactory.Create(serviceUri);
			request.Method = "POST";
			request.ContentType = "application/json; charset=utf-8";
			request.ContentLength = data.Length;
			request.Timeout = 5 * 60 * 1000;
			using (Stream stream = request.GetRequestStream()) {
				stream.Write(data, 0, data.Length);
			}
			WebResponse response = request.GetResponse();
			using (Stream dataStream = response.GetResponseStream()) {
				StreamReader reader = new StreamReader(dataStream);
				return reader.ReadToEnd();
			}
		}

		#endregion

		#region Methods: Public

		/// <inheritdoc cref="IExchangeListenerManager.StartListener"/>
		public void StartListener(Guid mailboxId) {
			if (GetIsFeatureDisabled("ExchangeListenerEnabled")) {
				return;
			}
			var mailbox = _mailboxService.GetMailbox(mailboxId);
			if (!mailbox.CheckSynchronizationSettings()) {
				_log.Warn($"mailbox {mailbox.SenderEmailAddress} synchronization settings not valid");
				return;
			}
			byte[] data = GetConnectionParams(mailboxId);
			TryDoListenerAction(mailbox.SenderEmailAddress, () => {
				ExecuteListenerAction(data, ExchangeListenerActions.Create);
			});
		}

		/// <inheritdoc cref="IExchangeListenerManager.StopListener"/>
		public void StopListener(Guid mailboxId) {
			if (GetIsFeatureDisabled("ExchangeListenerEnabled")) {
				return;
			}
			byte[] data = Encoding.UTF8.GetBytes(Json.Serialize(new[] { mailboxId }));
			var mailbox = _mailboxService.GetMailbox(mailboxId);
			TryDoListenerAction(mailbox.SenderEmailAddress, () => {
				ExecuteListenerAction(data, ExchangeListenerActions.Close);
			});
		}

		/// <inheritdoc cref="IExchangeListenerManager.RecreateListener"/>
		public void RecreateListener(Guid mailboxId) {
			if (GetIsFeatureDisabled("ExchangeListenerEnabled")) {
				return;
			}
			var mailbox = _mailboxService.GetMailbox(mailboxId);
			if (!mailbox.CheckSynchronizationSettings()) {
				StopListener(mailboxId);
				_log.Warn($"mailbox {mailbox.SenderEmailAddress} synchronization settings not valid");
				return;
			}
			byte[] data = GetConnectionParams(mailboxId);
			TryDoListenerAction(mailbox.SenderEmailAddress, () => {
				ExecuteListenerAction(data, ExchangeListenerActions.Recreate);
			});
		}

		/// <inheritdoc cref="IExchangeListenerManager.GetIsServiceAvaliable"/>
		public bool GetIsServiceAvaliable() {
			if (GetIsFeatureDisabled("ExchangeListenerEnabled")) {
				return false;
			}
			try {
				string serviceUri = ExchangeListenerActions.GetActionUrl(UserConnection, ExchangeListenerActions.Status);
				WebRequest request = _requestFactory.Create(serviceUri);
				request.ContentType = "application/json; charset=utf-8";
				request.Timeout = 5 * 60 * 1000;
				var response = (HttpWebResponse)request.GetResponse();
				return response.StatusCode == HttpStatusCode.OK;
			} catch (Exception) {
				return false;
			}
		}

		/// <inheritdoc cref="IExchangeListenerManager.GetSubscriptionsStatuses"/>
		public Dictionary<Guid, string> GetSubscriptionsStatuses(Guid[] mailboxIds) {
			var result = new Dictionary<Guid, string>();
			if (GetIsFeatureDisabled("ExchangeListenerEnabled")) {
				return result;
			}
			byte[] data = Encoding.UTF8.GetBytes(Json.Serialize(mailboxIds));
			var rawResult = ExecuteListenerAction(data, ExchangeListenerActions.SubscriptionsState);
			JObject resultObj = Json.Deserialize(rawResult) as JObject;
			foreach (var item in resultObj) {
				Guid key = Guid.Parse(item.Key);
				if (!result.ContainsKey(key)) {
					result.Add(key, item.Value.Value<string>("State"));
				}
			}
			return result;
		}

		/// <inheritdoc cref="IExchangeListenerManager.StartSynchronization"/>
		public void StartSynchronization(Guid mailboxId, DateTime loadFromDate) {
			if (GetIsFeatureDisabled("EmailIntegrationV2")) {
				return;
			}
			var syncCredentials = GetSynchronizationCredentials(mailboxId);
			var requestFactory = ClassFactory.Get<IHttpWebRequestFactory>();
			var emailProvider = ClassFactory.Get<IEmailProvider>(
				new ConstructorArgument("userConnection", UserConnection),
				new ConstructorArgument("requestFactory", requestFactory));
			TryDoListenerAction(syncCredentials.SenderEmailAddress, () => {
				emailProvider.StartSynchronization(syncCredentials, loadFromDate);
			});
		}

		/// <inheritdoc cref="IExchangeListenerManager.ValidateCredentials"/>
		public CredentialsValidationInfo ValidateCredentials(Mailbox mailbox) {
			if (GetIsFeatureDisabled("EmailIntegrationV2")) {
				return new CredentialsValidationInfo {
					IsValid = false,
					Message = "Feature EmailIntegrationV2 disabled"
				};
			}
			var credentials = GetSynchronizationCredentials(mailbox);
			var data = Serialize(credentials);
			var rawResult = string.Empty;
			TryDoListenerAction(mailbox.SenderEmailAddress, () => {
				rawResult = ExecuteListenerAction(data, ExchangeListenerActions.Validate);
			});
			return Json.Deserialize<CredentialsValidationInfo>(rawResult);
		}

		/// <inheritdoc cref="IExchangeListenerManager.GetMailboxFolders"/>
		public IEnumerable<MailboxFolder> GetMailboxFolders(string mailboxName) {
			if (GetIsFeatureDisabled("EmailIntegrationV2")) {
				return new List<MailboxFolder>();
			}
			var credentials = GetSynchronizationCredentials(mailboxName);
			var data = Serialize(credentials);
			var rawResult = string.Empty;
			TryDoListenerAction(mailboxName, () => {
				rawResult = GetFoldersFromProvider(data);
			});
			return Json.Deserialize<IEnumerable<MailboxFolder>>(rawResult);
		}

		#endregion

	}

	#endregion

}