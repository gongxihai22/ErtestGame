class MainUI extends BaseUI{
	public constructor() {
		super("resource/2d/eui_skins/MainUi.exml")
	}
	private imgstart:eui.Image;

    protected onComplete():void
    {
        super.onComplete();

        this.imgstart.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStart,this);
	}

	private onStart()
	{
		 ObjectManager.getInstance().loadMainchar()

         ObjectManager.getInstance().loadAllObj()

		 SceneManager.getInstance().CreateMainRoad()

		 UIManager.getInstance().RemoveMainUI();

		 UIManager.getInstance().ShowPlayUI();
	}
}