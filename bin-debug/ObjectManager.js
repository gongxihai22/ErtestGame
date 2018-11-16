var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ObjectManager = (function () {
    function ObjectManager() {
        this.objdata = [
            { "obj": "Assets/TreeStump.prefab.json", "x": 12, "y": 7, "z": 100, "line": 1 },
            { "obj": "Assets/TreeStump.prefab.json", "x": 12, "y": 7, "z": 100, "line": 1 },
            { "obj": "Assets/TreeStump.prefab.json", "x": 12, "y": 7, "z": 100, "line": 1 },
        ];
        this.mapprefab = {};
    }
    ObjectManager.getInstance = function () {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ObjectManager();
        return this.instance;
    };
    ObjectManager.prototype.loadAllObj = function () {
        var _this = this;
        this.objdata.forEach(function (element) {
            var prefab = _this.mapprefab[element.obj];
            if (!prefab) {
                RES.getRes(element.obj);
                prefab = RES.getRes(element.obj);
            }
            var obstacle = prefab.createInstance();
            var pos = obstacle.transform.getPosition();
            pos.x = element.x;
            pos.z = element.z;
            pos.y = element.y;
            obstacle.transform.setPosition(pos);
            obstacle.addComponent(MoveObj);
        });
    };
    ObjectManager.instance = null;
    return ObjectManager;
}());
__reflect(ObjectManager.prototype, "ObjectManager");
var MoveObj = (function (_super) {
    __extends(MoveObj, _super);
    function MoveObj() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._timer = 0;
        return _this;
    }
    MoveObj.prototype.onUpdate = function (deltaTime) {
        var pos = this.gameObject.transform.getPosition();
        pos.z += 15 * deltaTime;
        if (pos.z >= 200)
            pos.z = -200;
        this.gameObject.transform.setPosition(pos);
    };
    return MoveObj;
}(paper.Behaviour));
__reflect(MoveObj.prototype, "MoveObj");
//# sourceMappingURL=ObjectManager.js.map