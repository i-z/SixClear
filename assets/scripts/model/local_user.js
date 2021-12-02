
const LocalUser = cc.Class({
  _userId: '',
  _coins: 0,

  ctor: function () {
    this._userId = localStorage.getItem('userId') || '';
    this._coins = localStorage.getItem('coins') || 100;
  },

  init: function () {
    
  },

  getCoins() {
    return this._coins;
  },

  setCoins(value) {
    this._coins = Number(value);
    localStorage.setItem("coins", String(value));
  }

});

const user = new LocalUser();
module.exports = user;
