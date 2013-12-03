
/**
 * xhr polyfill to make titaniums XHR library
 * compatible with web based XHR libraries
 */

// expose XMLHttpRequest

module.exports = XMLHttpRequest;

/**
 * XMLHttpRequest
 */

function XMLHttpRequest() {

  // titanium xhr client

  this._proxy =  Ti.Network.createHTTPClient();

  // mapping for compatible functions

  this.getResponseHeader = this._proxy.getResponseHeader;
  this.open = this._proxy.open;
  this.send = this._proxy.send;
  this.setRequestHeader = this._proxy.setRequestHeader;
  this.abort = this._proxy.abort;
}


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

/**
 * inject the XMLHttpRequest namespace
 * into the global scope
 *
 * @param  {Object} ctx
 * @return {Null}
 * @api public
 */

XMLHttpRequest.patch = function (ctx){
  ctx.XMLHttpRequest = XMLHttpRequest;
  ctx.location = {};
};
