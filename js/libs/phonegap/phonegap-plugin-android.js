// phonegap plugins
(function(){
	PhoneGap.plugins = PhoneGap.plugins || {};
	window.plugins = window.plugins || {}; // bug fix
	
	
	// childBrowser
	function ChildBrowser() {}
	ChildBrowser._onLocationChange = function(newLoc){
		window.plugins.childBrowser.onLocationChange(newLoc);
	};
	ChildBrowser._onClose = function(){
		window.plugins.childBrowser.onClose();
	};
	ChildBrowser._onOpenExternal = function(){
		window.plugins.childBrowser.onOpenExternal();
	};
	// Show a webpage, will result in a callback to onLocationChange
	ChildBrowser.prototype.showWebPage = function(loc){
		if (options === null || options === "undefined") {
	        var options = new Object();
	        options.showLocationBar = true;
	    }
	    PhoneGap.exec(this._onEvent, this._onError, "ChildBrowserCommand", "showWebPage", [loc, options]);
	};
	// close the browser, will NOT result in close callback
	ChildBrowser.prototype.close = function(){
		PhoneGap.exec("ChildBrowserCommand.close");
	};
	PhoneGap.addConstructor(function() {
		PhoneGap.plugins.childBrowser = new ChildBrowser();
		window.plugins.childBrowser = PhoneGap.plugins.childBrowser;
	});	
	
	
	// http request
	function HttpRequest() {};
	HttpRequest.prototype.request = function(urlString, successCallback, failCallback){
		return PhoneGap.exec(successCallback, failCallback, "HTTPRequest", "grabURL", [urlString]);
	};
	HttpRequest.prototype.requestInBackground = function(urlString, successCallback, failCallback){
		return PhoneGap.exec(successCallback, failCallback, "HTTPRequest", "grabURLInBackground", [urlString]);
	};
	PhoneGap.addConstructor(function() {
		PhoneGap.plugins.httpRequest = new HttpRequest();
	});	
	
	//picker
	function Picker() {
    	this._callback;
	};
	Picker.prototype.show = function(options, cb) {
	    this._callback = cb;
	    PhoneGap.exec(this._selected, this._onError,"Picker","show", [options]);
	};
	Picker.prototype._selected = function(selectedValue) {
	    if (this._callback)
	        this._callback(selectedValue);
	};
	Picker.prototype._onError = function(data) {
	    if (typeof window.plugins.picker.onError === "function") {
	        window.plugins.picker.onError(data);
	    }
  	};
	PhoneGap.addConstructor(function() {
	    PhoneGap.plugins.picker = new Picker();
	    window.plugins.picker = PhoneGap.plugins.picker; // bug fix
	});
})();