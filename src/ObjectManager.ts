class ObjectManager
{
    public constructor()
    {

    }

    private static instance:ObjectManager = null;

    public objdata:any[] =
    [
        {"obj":"Assets/TreeStump.prefab.json","x":12,"y":7,"z":100,"line":1},
        {"obj":"Assets/TreeStump.prefab.json","x":12,"y":7,"z":100,"line":1},
        {"obj":"Assets/TreeStump.prefab.json","x":12,"y":7,"z":100,"line":1},
    ]

    private  mapprefab:{[key:string] : egret3d.Prefab} = {};

    public static getInstance()
    {

         if (this.instance) 
         {
                return this.instance;
         }
         this.instance = new ObjectManager();
         return this.instance;
    }


   public    loadAllObj() 

    {
        this.objdata.forEach(element => {
                var prefab =  this.mapprefab[element.obj];
                if(!prefab)
                {
                    RES.getRes(element.obj);
                   //  await RES.getResAsync()
                    prefab = RES.getRes(element.obj) as egret3d.Prefab
                }
                var obstacle = prefab.createInstance()
                var pos:egret3d.Vector3 = obstacle.transform.getPosition();
                pos.x = element.x;
                pos.z = element.z;
                 pos.y = element.y;
                obstacle.transform.setPosition(pos);
                obstacle.addComponent(MoveObj);
            
        });
    }


}


   class MoveObj extends paper.Behaviour {
        private _timer: number = 0;
        

        public onUpdate(deltaTime: number) {
            var pos:egret3d.Vector3 = this.gameObject.transform.getPosition();
            pos.z += 15*deltaTime;
            if(pos.z >= 200)
                pos.z = -200;
            this.gameObject.transform.setPosition(pos)
        }
    }