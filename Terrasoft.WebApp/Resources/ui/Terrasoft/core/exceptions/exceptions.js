/**
 */
Ext.define("Terrasoft.exceptions.UnknownException", {
	alternateClassName: "Terrasoft.UnknownException",
	message: Terrasoft.Resources.Exception.UnknownException,
	toString: function() {
		return this.alternateClassName + ": " + this.message;
	},
	constructor: function(config) {
		Ext.apply(this, config);
	}
});

Ext.define("Terrasoft.exceptions.NotImplementedException", {
	extend: "Terrasoft.UnknownException",
	alternateClassName: "Terrasoft.NotImplementedException",
	message: Terrasoft.Resources.Exception.NotImplementedException
});

/**
 * An exception thrown when trying to retrieve a collection item by a type getSmth() method
 */
Ext.define("Terrasoft.exceptions.ItemNotFoundException", {
	extend: "Terrasoft.UnknownException",
	alternateClassName: "Terrasoft.ItemNotFoundException",
	message: Terrasoft.Resources.Exception.ItemNotFoundException
});

/**
 * The exception thrown when trying to pass an empty or null argument
 */
Ext.define("Terrasoft.exceptions.NullOrEmptyException", {
	extend: "Terrasoft.UnknownException",
	alternateClassName: "Terrasoft.NullOrEmptyException",
	message: Terrasoft.Resources.Exception.NullOrEmptyException
});

Ext.define("Terrasoft.exceptions.ArgumentNullOrEmptyException", {
	extend: "Terrasoft.UnknownException",
	alternateClassName: "Terrasoft.ArgumentNullOrEmptyException",
	message: Terrasoft.Resources.Exception.ArgumentNullOrEmptyException,
	argumentName: null,
	toString: function() {
		if (this.argumentName) {
			return this.alternateClassName + ": " +
				Ext.String.format(Terrasoft.Resources.Exception.ArgumentNullOrEmptyExceptionWithArgumentName,
					this.argumentName);
		}
		return this.alternateClassName + ": " + this.message;
	}
});

Ext.define("Terrasoft.exceptions.UnsupportedTypeException", {
	extend: "Terrasoft.UnknownException",
	alternateClassName: "Terrasoft.UnsupportedTypeException",
	message: Terrasoft.Resources.Exception.UnsupportedTypeException
});

Ext.define("Terrasoft.exceptions.ItemAlreadyExistsException", {
	extend: "Terrasoft.UnknownException",
	alternateClassName: "Terrasoft.ItemAlreadyExistsException",
	message: Terrasoft.Resources.Exception.ItemAlreadyExistsException
});

Ext.define("Terrasoft.exceptions.DataFieldIsRequiredException", {
	extend: "Terrasoft.UnknownException",
	alternateClassName: "Terrasoft.DataFieldIsRequiredException",
	fieldName: "",
	toString: function() {
		return Terrasoft.Resources.Exception.DataFieldIsRequiredException.DataField + " \"" + this.fieldName +
			"\" " + Terrasoft.Resources.Exception.DataFieldIsRequiredException.IsRequired;
	}
});

Ext.define("Terrasoft.exceptions.InvalidOperationException", {
	extend: "Terrasoft.UnknownException",
	alternateClassName: "Terrasoft.InvalidOperationException",
	message: Terrasoft.Resources.Exception.InvalidOperationException
});

Ext.define("Terrasoft.exceptions.InvalidObjectState", {
	extend: "Terrasoft.UnknownException",
	alternateClassName: "Terrasoft.InvalidObjectState",
	message: Terrasoft.Resources.Exception.InvalidObjectState
});

Ext.define("Terrasoft.exceptions.InvalidFormatException", {
	extend: "Terrasoft.UnknownException",
	alternateClassName: "Terrasoft.InvalidFormatException",
	message: Terrasoft.Resources.Exception.InvalidFormatException
});

Ext.define("Terrasoft.exceptions.InvalidDateFormatException", {
	extend: "Terrasoft.InvalidFormatException",
	alternateClassName: "Terrasoft.InvalidDateFormatException",
	message: Terrasoft.Resources.Exception.InvalidDateFormatException
});

Ext.define("Terrasoft.exceptions.UnauthorizedException", {
	extend: "Terrasoft.UnknownException",
	alternateClassName: "Terrasoft.UnauthorizedException",
	message: Terrasoft.Resources.Exception.UnauthorizedException
});

Ext.define("Terrasoft.exceptions.QueryExecutionException", {
	extend: "Terrasoft.UnknownException",
	alternateClassName: "Terrasoft.QueryExecutionException",
	message: Terrasoft.Resources.Exception.QueryExecutionException,
	errorInfo: null,
	toString: function() {
		return this.errorInfo ? (this.errorInfo.errorCode + ": \"" + this.message + "\" ") : this.message;
	}
});

Ext.define("Terrasoft.exceptions.ModuleProcessingException", {
	extend: "Terrasoft.UnknownException",
	alternateClassName: "Terrasoft.ModuleProcessingException",
	message: Terrasoft.Resources.Exception.ModuleProcessingException,
	errorInfo: null,
	toString: function() {
		var message = this.callParent(arguments);
		var errorInfo = this.errorInfo;
		if (errorInfo) {
			message += "\nmoduleId: " + errorInfo.moduleId + "\nmoduleName: " + errorInfo.moduleName;
		}
		return message;
	}
});

Ext.define("Terrasoft.exceptions.MobileException", {
	extend: "Terrasoft.UnknownException",
	alternateClassName: "Terrasoft.MobileException",
	errorInfo: null,
	toString: function() {
		var messageText = this.callParent(arguments);
		var nextException = this.errorInfo;
		while (nextException) {
			var message = nextException.message;
			messageText += message ? "\n\n" + message : "";
			nextException = nextException.errorInfo;
		}
		return messageText;
	}
});

Ext.define("Terrasoft.exceptions.FileSystemException", {
	extend: "Terrasoft.MobileException",
	alternateClassName: "Terrasoft.FileSystemException",
	code: null,
	toString: function() {
		var parentMessage = this.callParent(arguments);
		var message = (this.code) ?
			Ext.String.format(Terrasoft.Resources.Exception.FileSystemExceptionFormat, this.code) +
			"\n\n" + parentMessage : parentMessage;
		return message;
	}
});

Ext.define("Terrasoft.exceptions.FileException", {
	extend: "Terrasoft.MobileException",
	alternateClassName: "Terrasoft.FileException",
	name: null,
	toString: function() {
		var parentMessage = this.callParent(arguments);
		var message = (this.name) ?
			Ext.String.format(Terrasoft.Resources.Exception.FileExceptionFormat, this.name) +
			"\n\n" + parentMessage : parentMessage;
		return message;
	}
});

Ext.define("Terrasoft.exceptions.DirectoryException", {
	extend: "Terrasoft.MobileException",
	alternateClassName: "Terrasoft.DirectoryException",
	name: null,
	toString: function() {
		var parentMessage = this.callParent(arguments);
		var message = (this.name) ?
			Ext.String.format(Terrasoft.Resources.Exception.DirectoryExceptionFormat, this.name) +
			"\n\n" + parentMessage : parentMessage;
		return message;
	}
});

Ext.define("Terrasoft.exceptions.DirectoryNotFoundException", {
	extend: "Terrasoft.DirectoryException",
	alternateClassName: "Terrasoft.DirectoryNotFoundException"
});

Ext.define("Terrasoft.exceptions.FileSystemEntryNotImplementedException", {
	extend: "Terrasoft.MobileException",
	alternateClassName: "Terrasoft.FileSystemEntryNotImplementedException",
	methodName: null,
	toString: function() {
		var parentMessage = this.callParent(arguments);
		var message = (this.methodName) ?
			Ext.String.format(Terrasoft.Resources.Exception.FileSystemEntryNotImplementedExceptionFormat,
				this.methodName) + "\n\n" + parentMessage : parentMessage;
		return message;
	}
});
