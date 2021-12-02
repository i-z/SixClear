const ServiceClient = cc.Class({

  ctor: function () {

  },

  setUrl: function (url) {
    this._url = url;
    console.log("serUrl " + url);
  },

  _sendRequest: function (cmd, obj, callback) {
    let data = '';
    if (obj) {
      data = encodeURIComponent(JSON.stringify(obj));
    }

    let uri = '';
    if (data !== '') {
      uri = `${this._url}${cmd}?data=${data}`;
    }
    else {
      uri = `${this._url}${cmd}`;
    }

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
        console.log('INFO >> _sendRequest > recv ok! > ' + xhr.responseText);
        const res = JSON.parse(xhr.responseText);
        if (callback) {
          callback(res);
        }
      }
    };
    xhr.open('GET', uri, true);
    xhr.send();
  },

  launch: function (data, callback) {
    this._sendRequest('launch', data, callback);
  },

  leaderboard: function (callback) {
    this._sendRequest('leaderboard', null, callback);
  },

  storeRecord: function (data, callback) {
    this._sendRequest('store_record', data, callback);
  }

});

const client = new ServiceClient();
module.exports = client;
