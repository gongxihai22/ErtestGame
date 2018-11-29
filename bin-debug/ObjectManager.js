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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ObjectManager = (function () {
    function ObjectManager() {
        this.objdata = [
            { "obj": "Assets/TreeStump.prefab.json", "x": 14, "y": 8, "z": -80, "line": 1 },
            { "obj": "Assets/TreeStump.prefab.json", "x": 0, "y": 8, "z": -50, "line": 0 },
            { "obj": "Assets/boss_ym_gjfl.prefab.json", "x": -12, "y": 5, "z": -150, "line": -1 },
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
    ObjectManager.prototype.loadMainchar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var prefab, ani;
            return __generator(this, function (_a) {
                prefab = RES.getRes("Assets/Prisoner.prefab.json");
                this.person = prefab.createInstance();
                ani = this.person.getComponent(egret3d.Animation);
                ani.play("run");
                this.charcon = this.person.addComponent(CharControl);
                return [2 /*return*/];
            });
        });
    };
    ObjectManager.prototype.loadAllObj = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                //   await RES.getResAsync("Assets/TreeStump.prefab.json")
                this.objdata.forEach(function (element) {
                    var prefab = _this.mapprefab[element.obj];
                    if (!prefab) {
                        //  RES.getRes(element.obj);
                        prefab = RES.getRes(element.obj);
                    }
                    var obstacle = prefab.createInstance();
                    var pos = obstacle.transform.getPosition();
                    pos.x = element.x;
                    pos.z = element.z;
                    pos.y = element.y;
                    obstacle.transform.setPosition(pos);
                    var moveobj = obstacle.addComponent(MoveObj);
                    moveobj.setcurline(element.line);
                });
                return [2 /*return*/];
            });
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
        _this.curline = 0;
        return _this;
    }
    MoveObj.prototype.onUpdate = function (deltaTime) {
        var pos = this.gameObject.transform.getPosition();
        pos.z += 30 * deltaTime;
        //   console.log("add z........." + 30*deltaTime);
        if (pos.z >= 200)
            pos.z = -200;
        this.gameObject.transform.setPosition(pos);
        this.checkcol(ObjectManager.getInstance().charcon);
    };
    MoveObj.prototype.setcurline = function (line) {
        this.curline = line;
    };
    MoveObj.prototype.checkcol = function (mainchr) {
        if (this.curline == mainchr.curline) {
            var z1 = this.gameObject.transform.position.z;
            var z2 = mainchr.gameObject.transform.position.z;
            //   console.log("z1.........." + z1);
            // console.log("z2.........." + z2);
            //        console.log("dis.........." + Math.abs(z1-z2));
            if (Math.abs(z1 - z2) < 5.0) {
                //  console.log("Col is on..........");
            }
        }
    };
    return MoveObj;
}(paper.Behaviour));
__reflect(MoveObj.prototype, "MoveObj");
var movepos = 11.8;
var CharControl = (function (_super) {
    __extends(CharControl, _super);
    function CharControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.curline = 2;
        _this.isMoving = false;
        _this.destpos = 0;
        _this.destline = 0;
        return _this;
    }
    CharControl.prototype.onStart = function () {
        this.curline = 0;
    };
    CharControl.prototype.onUpdate = function (deltaTime) {
        if (this.isMoving) {
            var pos = this.gameObject.transform.getPosition();
            if (pos.x < this.destpos) {
                pos.x += deltaTime * 20;
                if (pos.x >= this.destpos) {
                    pos.x = this.destpos;
                    this.isMoving = false;
                    this.curline = this.destline;
                }
            }
            if (pos.x > this.destpos) {
                pos.x -= deltaTime * 20;
                if (pos.x <= this.destpos) {
                    pos.x = this.destpos;
                    this.isMoving = false;
                    this.curline = this.destline;
                }
            }
            this.gameObject.transform.setPosition(pos);
        }
    };
    CharControl.prototype.Movexdir = function (dir) {
        if (this.curline == -1 && dir == -1) {
            return;
        }
        if (this.curline == 1 && dir == 1) {
            return;
        }
        this.destline = this.curline + dir;
        if (this.destline < -1) {
            this.destline = -1;
            return;
        }
        if (this.destline > 1) {
            this.destline = 1;
            return;
        }
        if (dir > 0) {
            var anilist = ["left", "run"];
            var ani = this.gameObject.getComponent(egret3d.Animation);
            ani.play(anilist);
        }
        else {
            var anilist = ["right", "run"];
            var ani = this.gameObject.getComponent(egret3d.Animation);
            ani.play(anilist);
        }
        this.destpos = this.destline * movepos;
        this.isMoving = true;
    };
    return CharControl;
}(paper.Behaviour));
__reflect(CharControl.prototype, "CharControl");
//# sourceMappingURL=ObjectManager.js.map