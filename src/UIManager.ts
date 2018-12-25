// TypeScript file

class UIManager
{
    public constructor()
    {

    }

    private static instance:UIManager = null;
    private UIRoot:GameUIScript = null;
    private mainUI:MainUI = null
    private playUI:PlayUI = null
    
    public static getInstance()
    {

         if (this.instance) 
         {
                return this.instance;
         }
         this.instance = new UIManager();
         return this.instance;
    }

    public InitUISystem()
    {
        const gameobj = paper.GameObject.create();
        gameobj.name = "GameUI";
        gameobj.addComponent(egret3d.Egret2DRenderer);
        this.UIRoot = gameobj.addComponent(GameUIScript);
    }

    public ShowMainUI()
    {
        if(this.mainUI == null)
        {
            this.mainUI = new MainUI();
            this.UIRoot.addUI(this.mainUI)
        } 
        else
        {
            this.mainUI.visible = true;
        }
    }

    public ShowPlayUI()
    {
        if(this.playUI == null)
        {
            this.playUI = new PlayUI();
            this.UIRoot.addUI(this.playUI)
        } 
        else
        {
            this.playUI.visible = true;
        }
        this.playUI.SetScore(0)
    }


    public RemoveMainUI()
    {
        this.mainUI.visible = false;
    }

    public RemovePlayUI()
    {
        this.playUI.visible = false;
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

 class GameUIScript extends paper.Behaviour {
        private ptbegin:egret.Point = new egret.Point(0,0);
        private uiLayer:eui.UILayer;
         public addUI(ui:BaseUI)
        {
            if(this.uiLayer)
                this.uiLayer.addChild(ui)
        }
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
                this.uiLayer = new eui.UILayer();
                this.uiLayer.touchEnabled = true;
                renderer.root.addChild(this.uiLayer);

                UIManager.getInstance().ShowMainUI();
                this.uiLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN,ontouchstart,this)
                this.uiLayer.addEventListener(egret.TouchEvent.TOUCH_MOVE,ontouchmove,this)

                 function ontouchstart(e: egret.TouchEvent)
                {
                    var tt = e;
                    this.ptbegin.x = tt.localX;
                    this.ptbegin.y = tt.localX;
                } 

                 function ontouchmove(e: egret.TouchEvent)
                {
                    var tt = e;
                    var xdis = tt.localX -  this.ptbegin.x;
                    if(xdis > 200.0)
                       ObjectManager.getInstance().person.getComponent(CharControl).Movexdir(-1)

                    if(xdis < -200.0)
                       ObjectManager.getInstance().person.getComponent(CharControl).Movexdir(1)
                }

             //   var mainui = new MainUI();
               // uiLayer.addChild(mainui)

            /*    let button = new eui.Button();
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
                            ObjectManager.getInstance().person.getComponent(CharControl).Movexdir(1)

        }

                 function onButtonClick2(e: egret.TouchEvent) {

                      ObjectManager.getInstance().person.getComponent(CharControl).Movexdir(-1)
    
                }






                function showPannel(title: string) {
                    let panel = new eui.Panel();
                    panel.title = title;
                    panel.horizontalCenter = 0;
                    panel.verticalCenter = 0;
                    uiLayer.addChild(panel);
                }*/
            }
        }
    }
