// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
const Binder = require('Binder')

function bindNode(node, value){
  const l = node.getComponent(cc.Label);
  if (l) {
    l.string = value;
  }
}

function bindChildren(e, prop, value) {
  const binder = e.getComponent(Binder);
  if (binder) {
    if (binder.fieldName === prop) {
      bindNode(e, value);
    }
  }
  const children = e.getChildren();
  for (let i = 0; i < children.length; i++) {
    bindChildren(children[i], prop, value);
  }
}

cc.Class({
    extends: cc.ScrollView,

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

        prefab: {
          default: null,
          type: cc.Prefab
        },

        
        data: {
            get () {
                return this._data;
            },
            set (value) {
                this._data = value;
                this.bind();
            }
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    bind() {
      if (this.content) {
        this.content.removeAllChildren();
        if (this.prefab !== null) {
          if (this._data.length > 0) {
            for (let i = 0; i < this._data.length; i++) {
              const e = this._data[i];
              const item = cc.instantiate(this.prefab)
              for (const prop in e) {
                console.log("obj." + prop + " = " + e[prop]);
                bindChildren(item, prop, e[prop]);
              }
              this.content.addChild(item);
            }
          }
        }
      }
    }

    // update (dt) {},
});
