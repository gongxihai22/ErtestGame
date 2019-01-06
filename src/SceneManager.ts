class SceneManager {
	public constructor() {
	}

	  private static instance:SceneManager = null;

 	public plane:paper.GameObject ;
    public plane2:paper.GameObject ;
    public static getInstance()
    {

         if (this.instance) 
         {
                return this.instance;
         }
         this.instance = new SceneManager();
         return this.instance;
    }

	public CreateMainRoad()
	{
	
    

    
 //   await RES.getResAsync("Assets/Plane.prefab.json");
    const preabplane = RES.getRes("Assets/Plane.prefab.json") as egret3d.Prefab
     this.plane = preabplane.createInstance()
     this.plane.addComponent(MovePlane);

     this.plane2 = preabplane.createInstance()
       var pos:egret3d.Vector3 = this.plane2.transform.getPosition();
       pos.z -= 200;
       this.plane2.transform.setPosition(pos);
       var pl = this.plane2.addComponent(MovePlane);
       pl.setplaneid(2)
	}
}

    class MovePlane extends paper.Behaviour {
        private _timer: number = 0;
        private _planeid:number = 1;
        
        public setplaneid(id:number)
        {
            this._planeid = id;
        }

        public onUpdate(deltaTime: number) {
            var pos:egret3d.Vector3 = this.gameObject.transform.getPosition();
            pos.z += 60*deltaTime;
            if( pos.z >=200 )
            {
                var zdest =0;
                if( this._planeid == 1)
					zdest =  SceneManager.getInstance().plane2.transform.getPosition().z -199.5;
                else
                    zdest =  SceneManager.getInstance().plane.transform.getPosition().z -199.5;
                pos.z = zdest;
                ObjectManager.getInstance().ResetMoveobj(pos.z,this._planeid);
                   
            }
                      
            this.gameObject.transform.setPosition(pos)
        }
    }