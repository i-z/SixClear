// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
const ScrollList = require('ScrollList')


cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        dataView: {default: null, type: cc.Node}
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
      cc.log('STARTED!!!');

      cc.resources.load('leaders_stub', cc.TextAsset, null, (err, data) => {
        if (err && err.status !== 0 && err.status !== 200) {
          console.log('ERROR >>');
          console.log(err);
          return;
        }

        let value = JSON.parse(data.text);
        cc.log('PARSED!!!');
        cc.log(value);
        cc.log(value[0].name);
        let dataViewComponent = this.dataView.getComponent(ScrollList);
        dataViewComponent.data = value;

      });

    }

    // update (dt) {},
});
