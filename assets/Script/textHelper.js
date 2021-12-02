// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

var TextHelper = cc.Class({

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
    },

    ctor: function () {
        this.isInit = false;
        this.callbacks = [];
    },

    _getStringLoaded: function (id) {
        var str = this.strings[id]
        if (str) {
            return str;
        }
        return "";
    },

    init: function()
    {
        cc.log(" -- INFO -- start init TextHelper --");
        var path = null;
        switch (cc.sys.language) {
            case cc.sys.LANGUAGE_RUSSIAN:
                path = "localization/ru-RU/strings";
                break;
            case cc.sys.LANGUAGE_ENGLISH:
                path = "localization/en-US/strings";
                break;
        
            default:
                path = "localization/en-US/strings";
                break;
        }

        if (path) {
            cc.resources.load(path, cc.JsonAsset, null, (err, asset) => {
                cc.log(err);
                cc.log("+++++++++++");
                cc.log(asset);
                if (asset) {
                    this.strings = asset.json;
                    this.isInit = true;
                    this.callbacks.forEach(element => {
                        cc.log(element);
                        element.callback(this._getStringLoaded(element.id));
                    });
                    this.callbacks = [];
                }
            });
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    getString: function (id, onLoad)
    {
        if (!this.isInit) {
            this.init()
            this.callbacks.push({id: id, callback: onLoad});
            return;
        }
        onLoad(_getStringLoaded(id));
    }

    // update (dt) {},
});

var helper = new TextHelper();
module.exports = helper;