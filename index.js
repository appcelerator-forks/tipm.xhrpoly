/**
 * xhr polyfill to make titaniums XHR library
 * compatible with web based XHR libraries
 */

var Emitter = require('component-emitter');

// Global Context

var globalCTX = (function(){ return this; })();

// Patch global scope

globalCTX.XMLHttpRequest = XMLHttpRequest;

// sub for browser global location property.

globalCTX.location = {};

// expose XMLHttpRequest

module.exports = XMLHttpRequest;

/**
 * XMLHttpRequest
 */

function XMLHttpRequest() {
  var self = this;
  // titanium xhr client
  this._proxy =  Ti.Network.createHTTPClient();
  this.upload = {
    onprogress: function(){}
  }
  this._proxy.onsendstream = function(e){
    self.upload.onprogress({loaded:e.progress, total:1});
  }
}

XMLHttpRequest.prototype.__proto__ = Emitter.prototype;

XMLHttpRequest.prototype.abort = function() {
  this._proxy.abort();
};

XMLHttpRequest.prototype.open = function(method, url, async) {
  this._proxy.open(method, url, async);
};

XMLHttpRequest.prototype.getResponseHeader = function(name) {
  this._proxy.getResponseHeader(name);
};

XMLHttpRequest.prototype.send = function(data) {
  this._proxy.send(data);
};

XMLHttpRequest.prototype.setRequestHeader = function(key, val) {
  this._proxy.setRequestHeader(key, val);
};

Object.defineProperties(XMLHttpRequest.prototype, {
   'onreadystatechange' : {
      set: function (val) {
        return this._proxy.onreadystatechange = val
      }
    },
    'readyState': {
      get: function () {
        return this._proxy.readyState;
      }
    },
    'responseText': {
      get: function () {
        return this._proxy.responseText;
      }
    },
    'responseXML': {
      get: function () {
        return this._proxy.responseXML;
      }
    },
    'status': {
      get: function () {
        return this._proxy.status;
      }
    }
});

XMLHttpRequest.prototype.getAllResponseHeaders = function() {
  return '';
};
