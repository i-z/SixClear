const user = require('user');

const UserAgent = cc.Class({

  ctor: function () {
  },

  launch: function () {
    user.launch();
  },

  roundEnded: function (score) {
    user.roundEnded(score);
  }

});

const ua = new UserAgent();
module.exports = ua;
