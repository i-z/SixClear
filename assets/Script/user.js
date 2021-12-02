const serviceClient = require('serviceClient');
const game_scene = require('game_scene');

const User = cc.Class({

  _userId: '',
  _coins: null,

  ctor: function () {
    this._userId = localStorage.getItem('userId') || '';
  },

  setPublicKey: function (key) {
    this._publicKey = key;
    this._encrypt = new JSEncrypt();
    this._encrypt.setPublicKey(key);
  },

  readSecret: function () {
    
  },

  roundEnded: function (score) {
    if (cc.sys.getNetworkType() === cc.sys.NetworkType.LAN || cc.sys.getNetworkType() === cc.sys.NetworkType.WWAN) {
      console.log('connected');
      const localTime = +new Date();
      const data = { uid: this._userId, localTime: localTime, protocolVersion: 1, max_score: score };
      const edata = this._encrypt.encrypt(JSON.stringify(data));
      serviceClient.storeRecord(edata);
      console.log(edata);
    } else if (cc.sys.getNetworkType() === cc.sys.NetworkType.NONE) {
      console.log('not connected');
    }
  },

  launch: function () {
    if (cc.sys.getNetworkType() === cc.sys.NetworkType.LAN || cc.sys.getNetworkType() === cc.sys.NetworkType.WWAN) {
      console.log('connected');
      const localTime = +new Date();
      const data = { userId: this._userId, launchTime: localTime };
      serviceClient.launch(data);
    } else if (cc.sys.getNetworkType() === cc.sys.NetworkType.NONE) {
      console.log('not connected');
    }
  }
});

const user = new User();
module.exports = user;
