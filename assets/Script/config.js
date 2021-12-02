
const config = {
  _game: {},
  fortune: 0,
  version: '1.0.0',
  get game() {
    return this._game;
  },
  get signTime() {
    if (!this._signTime) {
      this._signTime = JSON.parse(localStorage.getItem("signTime") || "[]");
    }
    return this._signTime;
  },
  set signTime(value) {
    this._signTime = value;
    localStorage.setItem("signTime", JSON.stringify(value));
  },

  get toolNum() {
    if (!this._toolNum) {
      this._toolNum = JSON.parse(localStorage.getItem("toolNum") || "[0,0,0,0]");
    }
    return this._toolNum;
  },
  set toolNum(value) {
    this._toolNum = value;
    localStorage.setItem("toolNum", JSON.stringify(value));
  },

  get consumeTip() {
    if (!this._consumeTip) {
      this._consumeTip = JSON.parse(localStorage.getItem("consumeTip") || "true");
    }
    return this._consumeTip;
  },
  set consumeTip(value) {
    this._consumeTip = value;
    localStorage.setItem("consumeTip", JSON.stringify(value));
  },

  get userId() {
    if (!this._userId) {
      this._userId = localStorage.getItem("userId") || "";
    }
    return this._userId;
  },
  set userId(value) {
    this._userId = value;
    localStorage.setItem("userId", value);
  },

  load: function (callback) {
    /*cc.resources.load('config', cc.JsonAsset, null, (err, data) => {
      if (!err || err.status === 0 || err.status === 200) {
        console.log('config downloaded');
        this._game = data.json;
        serviceClient.setUrl(this._game.serverUrl);

        cc.resources.load('pub.pem', cc.TextAsset, null, (err, data) => {
          if (err && err.status !== 0 && err.status !== 200) {
            console.log('ERROR >>');
            console.log(err);
            return;
          }
          user.setPublicKey(data.text);

          if (callback) {
            callback();
          }
        });
      }
    });*/
  },

  toolPrices: [300, 500, 800, 1000]

};

module.exports = config;
