namespace IntegrationV2.Files.cs.Listener.Subscription
{
	using IntegrationApi.Interfaces;
	using Terrasoft.Core.Entities;
	using Terrasoft.Core.Entities.Events;
	using Terrasoft.Core.Factories;

	#region Class: MailboxSyncSettingsEventListener

	[EntityEventListener(SchemaName = "MailboxSyncSettings")]
	public class MailboxSyncSettingsEventListener : BaseEntityEventListener
	{

		#region Methods: Public

		/// <summary>
		/// <see cref="BaseEntityEventListener.OnDeleting"/>
		/// </summary>
		public override void OnDeleting(object sender, EntityBeforeEventArgs e) {
			base.OnDeleting(sender, e);
			var entity = (Entity)sender;
			var userConnection = entity.UserConnection;
			var managerFactory = ClassFactory.Get<IListenerManagerFactory>();
			var manager = managerFactory.GetExchangeListenerManager(userConnection);
			manager.StopListener(entity.PrimaryColumnValue);
		}

		#endregion

	}

	#endregion

}
