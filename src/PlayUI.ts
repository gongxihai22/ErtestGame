class PlayUI extends BaseUI{
	public constructor() {
		super("resource/2d/eui_skins/RunPlay.exml")
	}
	private lab_score:eui.BitmapLabel;
    private score:number = 0;

    protected onComplete():void
    {
        super.onComplete();
     

      //  this.imgstart.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStart,this);
	}

    public SetScore(sc:number)
    {
        this.score = sc;
        this.lab_score.text = this.score.toString();

    }
}