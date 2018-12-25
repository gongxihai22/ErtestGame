class ObjectManager
{
    public constructor()
    {

    }

    private static instance:ObjectManager = null;

    public objdata:any[] =
    [
        {"obj":"Assets/TreeStump.prefab.json","x":14,"y":8,"z":-80,"line":1,"pt":-1},
        {"obj":"Assets/TreeStump.prefab.json","x":0,"y":8,"z":-50,"line":0,"pt":-1},
     //  {"obj":"Assets/boss_ym_gjfl.prefab.json","x":-12,"y":5,"z":-150,"line":-1},
         {"obj":"Assets/Crystle.prefab.json","x":-12,"y":-10,"z":-150,"line":-1,"pt":10},
    ]

    private  mapprefab:{[key:string] : egret3d.Prefab} = {};
    public  person:paper.GameObject ;
    public charcon:CharControl;
    public nowscore:number = 0;

    public static getInstance()
    {

         if (this.instance) 
         {
                return this.instance;
         }
         this.instance = new ObjectManager();
         return this.instance;
    }

    public async loadMainchar()
    {
           // await RES.getResAsync("Assets/Prisoner.prefab.json");
       const prefab = RES.getRes("Assets/Prisoner.prefab.json") as egret3d.Prefab
      this.person = prefab.createInstance()
       var ani =  this.person.getComponent(egret3d.Animation)
       ani.play("run")
      this.charcon = this.person.addComponent(CharControl)
    }


   public async  loadAllObj() 

    {
      //   await RES.getResAsync("Assets/TreeStump.prefab.json")
        this.objdata.forEach(element => {
                var prefab =  this.mapprefab[element.obj];
                if(!prefab)
                {
                  //  RES.getRes(element.obj);
                   
                    prefab = RES.getRes(element.obj) as egret3d.Prefab
                }
                var obstacle = prefab.createInstance()
                var pos:egret3d.Vector3 = obstacle.transform.getPosition();
                pos.x = element.x;
                pos.z = element.z;
                 pos.y = element.y;
                obstacle.transform.setPosition(pos);
                var moveobj =  obstacle.addComponent(MoveObj);
                moveobj.setcurline( element.line)
                moveobj.setdata(element)
            
        });
    }


}


   class MoveObj extends paper.Behaviour {
        private _timer: number = 0;
        private curline:number = 0;
        private objdata:any
        

        public onUpdate(deltaTime: number) {
            var pos:egret3d.Vector3 = this.gameObject.transform.getPosition();
            pos.z += 30*deltaTime;
           //   console.log("add z........." + 30*deltaTime);
            if(pos.z >= 200)
                pos.z = -200;
            this.gameObject.transform.setPosition(pos)
            this.checkcol(ObjectManager.getInstance().charcon);
       
        }

        public setcurline(line:number)
        {
            this.curline = line

        }

        public setdata(data:any)
        {
            this.objdata = data;
        }

        private checkcol(mainchr:CharControl)
        {
            if(this.curline == mainchr.curline)
            {
                var z1 = this.gameObject.transform.position.z;
                var z2 = mainchr.gameObject.transform.position.z;
              //   console.log("z1.........." + z1);
                // console.log("z2.........." + z2);
            //        console.log("dis.........." + Math.abs(z1-z2));
                if(Math.abs(z1-z2) < 5.0)
                {
                  //  console.log("Col is on..........");
                    if(this.objdata.pt > 0)
                    {
                        ObjectManager.getInstance().nowscore  += this.objdata.pt
                        UIManager.getInstance().UpdateScore( ObjectManager.getInstance().nowscore);
                    }
                    
                }
            }
        
        }

    }

        const movepos:number = 11.8;
    class CharControl  extends paper.Behaviour {

        public curline:number = 2
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