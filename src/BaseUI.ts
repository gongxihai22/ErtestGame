class BaseUI extends eui.Component
{
    public constructor(skinName:string)
    {
        super();  
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onComponentCreated, this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.OnRemoveFromStage, this);  
        if(skinName)
            this.skinName = skinName;
    }

    protected onComponentCreated() : void
    {
        this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.onComponentCreated, this);
    }

    protected onComplete():void
    {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
    }

    protected onAddToStage():void
    {

    }

    protected OnRemoveFromStage():void
    {

    }
}