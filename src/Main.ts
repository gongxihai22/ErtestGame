namespace helloworld {
    declare var  person:paper.GameObject ;

    export async function run() {
        await RES.loadConfig("default.res.json", "resource/");
        await RES.getResAsync("logo.png");

        // Create camera.
       // egret3d.Camera.main;

       // paper.Scene.create("MyTestScene.scene.json",true)

  //    await RES.getResAsync("3d/Assets/MyTestScene.scene.json");
  // var   t:paper.Scene  = paper.Application.sceneManager.loadScene("3d/Assets/MyTestScene.scene.json");

    await RES.getResAsync("Assets/Runpath.scene.json");
    var   t:paper.Scene  = paper.Application.sceneManager.loadScene("Assets/Runpath.scene.json");

    await RES.getResAsync("Assets/Prisoner.prefab.json");
    const prefab = RES.getRes("Assets/Prisoner.prefab.json") as egret3d.Prefab
    person = prefab.createInstance()
    var ani =  person.getComponent(egret3d.Animation)
    ani.play("run")
    person.addComponent(CharControl)
    

    
    await RES.getResAsync("Assets/Plane.prefab.json");
    const preabplane = RES.getRes("Assets/Plane.prefab.json") as egret3d.Prefab
    const plane = preabplane.createInstance()
   // var ani =  person.getComponent(egret3d.Animation)
   // ani.play("run")
  //   var tt:paper.GameObject =  t.find("Plane")
     plane.addComponent(MovePlane);

     const plane2 = preabplane.createInstance()
       var pos:egret3d.Vector3 = plane2.transform.getPosition();
       pos.z -= 200;
       plane2.transform.setPosition(pos);
       plane2.addComponent(MovePlane);

     

       // createCube();
        createGameUI();
    }

    function createCube() {
        const cube = paper.GameObject.create("Cube");
        cube.transform.setLocalEulerAngles(45, 45, 0);
        cube.addComponent(RotateScript);

        const meshFilter = cube.addComponent(egret3d.MeshFilter);
        meshFilter.mesh = egret3d.DefaultMeshes.CUBE;

        const meshRenderer = cube.addComponent(egret3d.MeshRenderer);
        const texture = RES.getRes("logo.png") as egret3d.Texture;
        const material = egret3d.Material.create().setTexture(texture);
        meshRenderer.material = material;
    }

    function createGameUI() {
        const gameObject = paper.GameObject.create();
        gameObject.name = "GameUI";
        gameObject.addComponent(egret3d.Egret2DRenderer);
        gameObject.addComponent(GameUIScript);
    }

    class RotateScript extends paper.Behaviour {
        private _timer: number = 0;

        public onUpdate(deltaTime: number) {
            this._timer += deltaTime;
            const sin = Math.sin(this._timer * 0.5);
            const cos = -Math.cos(this._timer * 0.5);

            this.gameObject.transform.setLocalEulerAngles(sin * 45, cos * 45, 0);
        }
    }

    
    class MovePlane extends paper.Behaviour {
        private _timer: number = 0;
        

        public onUpdate(deltaTime: number) {
            var pos:egret3d.Vector3 = this.gameObject.transform.getPosition();
            pos.z += 10*deltaTime;
            if(pos.z >= 200)
                pos.z = -200;
            this.gameObject.transform.setPosition(pos)
        }
    }

    const movepos:number = 11.8;
    class CharControl  extends paper.Behaviour {

        private curline:number = 0
        private isMoving:boolean = false
        private destpos:number = 0;
        private destline:number = 0;
        
        public onStart()
        {
            this.curline = 0;
        }

         public onUpdate(deltaTime: number) {
             if(this.isMoving)
             {
                 var pos:egret3d.Vector3 = this.gameObject.transform.getPosition();
                 if(pos.x < this.destpos)
                 {
                    pos.x += deltaTime *20;
                    if(pos.x >= this.destpos)
                    {
                        pos.x =this.destpos
                        this.isMoving = false
                        this.curline = this.destline
                    }

                 }

                 if(pos.x > this.destpos)
                 {
                    pos.x -= deltaTime *20;
                    if(pos.x <= this.destpos)
                    {
                        pos.x =this.destpos
                        this.isMoving = false
                        this.curline = this.destline
                    }
                 }

                 this.gameObject.transform.setPosition(pos);
             }

         }

        public Movexdir(dir:number) //dir:0 left   1:right
        {
            if(this.curline == -1 && dir == -1)
            {
                return;
            }
             if(this.curline == 1 && dir == 1)
            {
                return;
            }

            this.destline = this.curline + dir;
            if(this.destline < -1)
             {
                this.destline = -1;
                return
              }
            if(this.destline > 1)
              {
                  this.destline = 1;
                   return
              }  
            if(dir >0)
            {
                var anilist:string[] = ["left","run"]
                var ani =  this.gameObject.getComponent(egret3d.Animation)
                ani.play(anilist)
            }
            else
            {
                            
                var anilist:string[] = ["right","run"]
                var ani =  this.gameObject.getComponent(egret3d.Animation)
                ani.play(anilist)
            }

            this.destpos  = this.destline * movepos
            this.isMoving = true;
            
        }

    }


    class GameUIScript extends paper.Behaviour {
        public onStart() {
            const renderer = this.gameObject.getComponent(egret3d.Egret2DRenderer)!;
            const adapter = new egret3d.MatchWidthOrHeightAdapter();
            adapter.setResolution(egret3d.stage.screenViewport.w, egret3d.stage.screenViewport.h);
            renderer.screenAdapter = adapter;
            const assetAdapter = new AssetAdapter();
            egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
            egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

            const theme = new eui.Theme("resource/2d/default.thm.json", renderer.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, onThemeLoadComplete, this);

            function onThemeLoadComplete() {
                const uiLayer = new eui.UILayer();
                uiLayer.touchEnabled = false;
                renderer.root.addChild(uiLayer);

                let button = new eui.Button();
                button.label = "left";
               // button.horizontalCenter = 0;
            //    button.verticalCenter = 0;
                button.x = 100;
                button.y = egret3d.stage.screenViewport.h -100;
                button.width = 80;
                button.height = 40;

                uiLayer.addChild(button);

                button.addEventListener(egret.TouchEvent.TOUCH_TAP, onButtonClick, this);

                 let button2 = new eui.Button();
                button2.label = "right";
               // button.horizontalCenter = 0;
            //    button.verticalCenter = 0;
                button2.x = egret3d.stage.screenViewport.w -100;
                button2.y = egret3d.stage.screenViewport.h -100;
                button2.width = 80;
                button2.height = 40;

                uiLayer.addChild(button2);

                button2.addEventListener(egret.TouchEvent.TOUCH_TAP, onButtonClick2, this);

                function onButtonClick(e: egret.TouchEvent) {
                   // showPannel("Button Click!");
                           //  var pos:egret3d.Vector3 = person.transform.getPosition();
                             person.getComponent(CharControl).Movexdir(1)

                     /*  var anilist:string[] = ["left","run"]
                       var ani =  person.getComponent(egret3d.Animation)
                        ani.play(anilist)*/
                }

                 function onButtonClick2(e: egret.TouchEvent) {
                   // showPannel("Button Click!");
                     person.getComponent(CharControl).Movexdir(-1)
                /*        var pos:egret3d.Vector3 = person.transform.getPosition();
                       pos.x += 11.8;
                       person.transform.setPosition(pos)
                       var anilist:string[] = ["right","run"]
                       var ani =  person.getComponent(egret3d.Animation)
                        ani.play(anilist)*/
                }

                function showPannel(title: string) {
                    let panel = new eui.Panel();
                    panel.title = title;
                    panel.horizontalCenter = 0;
                    panel.verticalCenter = 0;
                    uiLayer.addChild(panel);
                }
            }
        }
    }

    class ThemeAdapter implements eui.IThemeAdapter {
        public getTheme(url: string, onSuccess: Function, onError: Function, thisObject: any): void {
            function onResGet(e: string): void {
                onSuccess.call(thisObject, e);
            }

            function onResError(e: RES.ResourceEvent): void {
                if (e.resItem.url == url) {
                    RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError as any, null);
                    onError.call(thisObject);
                }
            }

            if (typeof generateEUI !== 'undefined') {
                egret.callLater(() => {
                    onSuccess.call(thisObject, generateEUI);
                }, this);
            }
            else if (typeof generateEUI2 !== 'undefined') {
                RES.getResByUrl("resource/gameEui.json", (data: any, url: any) => {
                    (window as any)["JSONParseClass"]["setData"](data);
                    onResGet(data);
                    egret.callLater(() => {
                        onSuccess.call(thisObject, generateEUI2);
                    }, this);
                }, this, RES.ResourceItem.TYPE_JSON);
            }
            else {
                RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError as any, null);
                RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
            }
        }
    }

    declare var generateEUI: { paths: string[], skins: any }
    declare var generateEUI2: { paths: string[], skins: any }

    class AssetAdapter implements eui.IAssetAdapter {
        public getAsset(source: string, compFunc: Function, thisObject: any): void {
            function onGetRes(data: any): void {
                compFunc.call(thisObject, data, source);
            }
            let data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
    }
}