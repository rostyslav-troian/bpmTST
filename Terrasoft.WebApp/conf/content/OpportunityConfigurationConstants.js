Terrasoft.configuration.Structures["OpportunityConfigurationConstants"] = {innerHierarchyStack: ["OpportunityConfigurationConstants"]};
define("OpportunityConfigurationConstants", [], function() {
	var opportunity = {
		CloseReason: {
			DefeatedRival: "e45a0188-5be6-df11-971b-001d60e938c6"
		},
		/** Opportunity stages */
		Stage: {
			/** 1. Qualification */
			DeterminationOfPotential: "c2067b11-0ee0-df11-971b-001d60e938c6",
			/** 2. Needs analysis */
			NeedsAnalysis: "2a6de0f7-44d9-4b8a-bce6-acddb7ed8915",
			/** 3. Presentation */
			Presentation: "325f0619-0ee0-df11-971b-001d60e938c6",
			/** 4. Id. decision makers */
			IdentifyKeyContacts: "f4e4a00b-ec48-46d0-9ea0-c2b502165ee9",
			/** 5. Proposal development */
			PreparingQuotation: "241ade6b-4256-4947-ba8a-7d96988a97b6",
			/** 6. Proposal submission */
			PresentationQuotation: "423774cb-5ae6-df11-971b-001d60e938c6",
			/** 7. Negotiations */
			Conversation: "f808c955-c5aa-4aba-95c0-ba7d584d2f32",
			/** 8. Contracting */
			Contractions: "fb563df2-5ae6-df11-971b-001d60e938c6",
			/** 9. Closed won */
			FinishedWithVictory: "60d5310c-5be6-df11-971b-001d60e938c6",
			/** 10. Closed lost */
			FinishedWithLoss: "a9aafdfe-2242-4f42-8cd5-2ae3b9556d79",
			/** 11. Closed rerouted */
			TranslationIntoAnotherProcess: "9abf243c-fc00-45cf-8E28-cdb66c9208b0",
			/** 12. Closed rejected */
			RejectedByUs: "736f54fd-e240-46f8-8c7c-9066c30aff59"
		},
		Type: {
			PartnerSale: "c4505efc-6cf5-4b0c-b984-55076bc235f0"
		}
	};

	var oppContactRole = {
		DecisionMaker: "82ecb430-8d6b-40ea-8c01-741fe82cdcbd"
	};

	return {
		Opportunity: opportunity,
		OppContactRole: oppContactRole
	};
});


