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
var helloworld;
(function (helloworld) {
    function run() {
        return __awaiter(this, void 0, void 0, function () {
            var t, prefab, ani, preabplane, plane, plane2, pos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, RES.loadConfig("default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.getResAsync("logo.png")];
                    case 2:
                        _a.sent();
                        // Create camera.
                        // egret3d.Camera.main;
                        // paper.Scene.create("MyTestScene.scene.json",true)
                        //    await RES.getResAsync("3d/Assets/MyTestScene.scene.json");
                        // var   t:paper.Scene  = paper.Application.sceneManager.loadScene("3d/Assets/MyTestScene.scene.json");
                        return [4 /*yield*/, RES.getResAsync("Assets/Runpath.scene.json")];
                    case 3:
                        // Create camera.
                        // egret3d.Camera.main;
                        // paper.Scene.create("MyTestScene.scene.json",true)
                        //    await RES.getResAsync("3d/Assets/MyTestScene.scene.json");
                        // var   t:paper.Scene  = paper.Application.sceneManager.loadScene("3d/Assets/MyTestScene.scene.json");
                        _a.sent();
                        t = paper.Application.sceneManager.loadScene("Assets/Runpath.scene.json");
                        return [4 /*yield*/, RES.getResAsync("Assets/Prisoner.prefab.json")];
                    case 4:
                        _a.sent();
                        prefab = RES.getRes("Assets/Prisoner.prefab.json");
                        person = prefab.createInstance();
                        ani = person.getComponent(egret3d.Animation);
                        ani.play("run");
                        person.addComponent(CharControl);
                        return [4 /*yield*/, RES.getResAsync("Assets/Plane.prefab.json")];
                    case 5:
                        _a.sent();
                        preabplane = RES.getRes("Assets/Plane.prefab.json");
                        plane = preabplane.createInstance();
                        // var ani =  person.getComponent(egret3d.Animation)
                        // ani.play("run")
                        //   var tt:paper.GameObject =  t.find("Plane")
                        plane.addComponent(MovePlane);
                        plane2 = preabplane.createInstance();
                        pos = plane2.transform.getPosition();
                        pos.z -= 200;
                        plane2.transform.setPosition(pos);
                        plane2.addComponent(MovePlane);
                        // createCube();
                        createGameUI();
                        return [2 /*return*/];
                }
            });
        });
    }
    helloworld.run = run;
    function createCube() {
        var cube = paper.GameObject.create("Cube");
        cube.transform.setLocalEulerAngles(45, 45, 0);
        cube.addComponent(RotateScript);
        var meshFilter = cube.addComponent(egret3d.MeshFilter);
        meshFilter.mesh = egret3d.DefaultMeshes.CUBE;
        var meshRenderer = cube.addComponent(egret3d.MeshRenderer);
        var texture = RES.getRes("logo.png");
        var material = egret3d.Material.create().setTexture(texture);
        meshRenderer.material = material;
    }
    function createGameUI() {
        var gameObject = paper.GameObject.create();
        gameObject.name = "GameUI";
        gameObject.addComponent(egret3d.Egret2DRenderer);
        gameObject.addComponent(GameUIScript);
    }
    var RotateScript = (function (_super) {
        __extends(RotateScript, _super);
        function RotateScript() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._timer = 0;
            return _this;
        }
        RotateScript.prototype.onUpdate = function (deltaTime) {
            this._timer += deltaTime;
            var sin = Math.sin(this._timer * 0.5);
            var cos = -Math.cos(this._timer * 0.5);
            this.gameObject.transform.setLocalEulerAngles(sin * 45, cos * 45, 0);
        };
        return RotateScript;
    }(paper.Behaviour));
    __reflect(RotateScript.prototype, "RotateScript");
    var MovePlane = (function (_super) {
        __extends(MovePlane, _super);
        function MovePlane() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._timer = 0;
            return _this;
        }
        MovePlane.prototype.onUpdate = function (deltaTime) {
            var pos = this.gameObject.transform.getPosition();
            pos.z += 10 * deltaTime;
            if (pos.z >= 200)
                pos.z = -200;
            this.gameObject.transform.setPosition(pos);
        };
        return MovePlane;
    }(paper.Behaviour));
    __reflect(MovePlane.prototype, "MovePlane");
    var movepos = 11.8;
    var CharControl = (function (_super) {
        __extends(CharControl, _super);
        function CharControl() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.curline = 0;
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
    var GameUIScript = (function (_super) {
        __extends(GameUIScript, _super);
        function GameUIScript() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GameUIScript.prototype.onStart = function () {
            var renderer = this.gameObject.getComponent(egret3d.Egret2DRenderer);
            var adapter = new egret3d.MatchWidthOrHeightAdapter();
            adapter.setResolution(egret3d.stage.screenViewport.w, egret3d.stage.screenViewport.h);
            renderer.screenAdapter = adapter;
            var assetAdapter = new AssetAdapter();
            egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
            egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
            var theme = new eui.Theme("resource/2d/default.thm.json", renderer.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, onThemeLoadComplete, this);
            function onThemeLoadComplete() {
                var uiLayer = new eui.UILayer();
                uiLayer.touchEnabled = false;
                renderer.root.addChild(uiLayer);
                var button = new eui.Button();
                button.label = "left";
                // button.horizontalCenter = 0;
                //    button.verticalCenter = 0;
                button.x = 100;
                button.y = egret3d.stage.screenViewport.h - 100;
                button.width = 80;
                button.height = 40;
                uiLayer.addChild(button);
                button.addEventListener(egret.TouchEvent.TOUCH_TAP, onButtonClick, this);
                var button2 = new eui.Button();
                button2.label = "right";
                // button.horizontalCenter = 0;
                //    button.verticalCenter = 0;
                button2.x = egret3d.stage.screenViewport.w - 100;
                button2.y = egret3d.stage.screenViewport.h - 100;
                button2.width = 80;
                button2.height = 40;
                uiLayer.addChild(button2);
                button2.addEventListener(egret.TouchEvent.TOUCH_TAP, onButtonClick2, this);
                function onButtonClick(e) {
                    // showPannel("Button Click!");
                    //  var pos:egret3d.Vector3 = person.transform.getPosition();
                    person.getComponent(CharControl).Movexdir(1);
                    /*  var anilist:string[] = ["left","run"]
                      var ani =  person.getComponent(egret3d.Animation)
                       ani.play(anilist)*/
                }
                function onButtonClick2(e) {
                    // showPannel("Button Click!");
                    person.getComponent(CharControl).Movexdir(-1);
                    /*        var pos:egret3d.Vector3 = person.transform.getPosition();
                           pos.x += 11.8;
                           person.transform.setPosition(pos)
                           var anilist:string[] = ["right","run"]
                           var ani =  person.getComponent(egret3d.Animation)
                            ani.play(anilist)*/
                }
                function showPannel(title) {
                    var panel = new eui.Panel();
                    panel.title = title;
                    panel.horizontalCenter = 0;
                    panel.verticalCenter = 0;
                    uiLayer.addChild(panel);
                }
            }
        };
        return GameUIScript;
    }(paper.Behaviour));
    __reflect(GameUIScript.prototype, "GameUIScript");
    var ThemeAdapter = (function () {
        function ThemeAdapter() {
        }
        ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
            var _this = this;
            function onResGet(e) {
                onSuccess.call(thisObject, e);
            }
            function onResError(e) {
                if (e.resItem.url == url) {
                    RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                    onError.call(thisObject);
                }
            }
            if (typeof generateEUI !== 'undefined') {
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI);
                }, this);
            }
            else if (typeof generateEUI2 !== 'undefined') {
                RES.getResByUrl("resource/gameEui.json", function (data, url) {
                    window["JSONParseClass"]["setData"](data);
                    onResGet(data);
                    egret.callLater(function () {
                        onSuccess.call(thisObject, generateEUI2);
                    }, _this);
                }, this, RES.ResourceItem.TYPE_JSON);
            }
            else {
                RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
            }
        };
        return ThemeAdapter;
    }());
    __reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
    var AssetAdapter = (function () {
        function AssetAdapter() {
        }
        AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
            function onGetRes(data) {
                compFunc.call(thisObject, data, source);
            }
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        };
        return AssetAdapter;
    }());
    __reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
})(helloworld || (helloworld = {}));
//# sourceMappingURL=Main.js.map