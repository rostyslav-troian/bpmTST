define("MailboxSyncSettingsResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		MailboxSyncSettingsCaption: "Mailbox synchronization settings",
		IdCaption: "Id",
		CreatedOnCaption: "Created on",
		CreatedByCaption: "Created by",
		ModifiedOnCaption: "Modified on",
		ModifiedByCaption: "Modified by",
		SysAdminUnitCaption: "User",
		MailServerCaption: "Email provider",
		UserNameCaption: "Username",
		UserPasswordCaption: "Password",
		EnableMailSynhronizationCaption: "Download emails to Creatio",
		AutomaticallyAddNewEmailsCaption: "Automatically download new emails",
		CyclicallyAddNewEmailsCaption: "Load new messages repeatedly",
		EmailsCyclicallyAddingIntervalCaption: "Cyclic download interval",
		ProcessListenersCaption: "Active processes",
		IsCustomFlagsNotSuportedCaption: "IsCustomFlagsNotSuported",
		LastSyncDateCaption: "LastSyncDate",
		IsSharedCaption: "Allow shared access",
		SendEmailsViaThisAccountCaption: "Send emails from Creatio",
		IsDefaultCaption: "Use by default",
		LoadAllEmailsFromMailBoxCaption: "Download all emails from mailbox",
		LoadEmailsFromDateCaption: "Download emails starting from",
		MailboxNameCaption: "Mailbox name",
		SenderEmailAddressCaption: "Sender\u0027s email",
		MailSyncPeriodCaption: "Sync existing emails for the following period",
		IsAnonymousAuthenticationCaption: "Anonymous authentication",
		ExchangeAutoSynchronizationCaption: "Synchronize contacts and activities cyclically",
		ExchangeSyncIntervalCaption: "Contact and activity synchronization interval",
		ContactSyncIntervalCaption: "ContactSyncInterval",
		ExchangeAutoSyncActivityCaption: "ExchangeAutoSyncActivity",
		SenderDisplayValueCaption: "Set custom display name",
		SignatureCaption: "Signature",
		UseSignatureCaption: "Add signatures to outbound emails",
		ActualizeMessageRelationsCaption: "ActualizeMessageRelations",
		MessageLanguageCaption: "Message language",
		LastErrorCaption: "Last synchronization error text",
		ErrorCodeCaption: "Error code identifier",
		RetryCounterCaption: "Number of retry attempts",
		OAuthTokenStorageCaption: "OAuth token storage identifier",
		SyncDateMinutesOffsetCaption: "SyncDateMinutesOffset",
		SendWebsocketNotificationsCaption: "Send new emails notifications by web socket",
		PersonalMetricsCaption: "PersonalMetrics",
		SynchronizationStoppedCaption: "Synchronization stopped"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});