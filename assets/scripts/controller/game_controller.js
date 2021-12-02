"use strict";
let game_scene = require('game_scene');
let home = require('home')
let game = require('game')

const GameController = cc.Class({
  name: "GameController",

  _user: null,
  _view: null,
  _viewNode: null,
  _game: null,
  _gameNode: null,

  _currentScore: 0,


  ctor: function () {
  },

  init : function (usr) {
    this._user = usr;
    this._viewNode = cc.director.getScene().getChildByName("Canvas");
    this._view = this._viewNode.getComponent(game_scene);
    this._view.setCoins(this._user.getCoins());
    this._gameNode = cc.find("game", this._viewNode);
    this._game = this._gameNode.getComponent(game);

    self = this;
    this._viewNode.on("GOTO_GAME", function () {
      self._view.playBtSound()
      let h = cc.find("home", self._viewNode).getComponent(home);
      h.hide();
      self._game.show();
    });

    let self = this;
    this._gameNode.on("ADD_POINTS", function (num) {
      cc.log("SCORE1: " + self._currentScore);
      cc.log(num)
      self._currentScore += num;
      cc.log("SCORE: " + self._currentScore);
    });

    this._view.setCoins(this._user.getCoins());
  }

});

const controller = new GameController();
module.exports = controller;
