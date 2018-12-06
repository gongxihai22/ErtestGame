namespace helloworld {
    declare var  person:paper.GameObject ;
    declare var  plane:paper.GameObject ;
    declare var  plane2:paper.GameObject ;

    export async function run() {
        await RES.loadConfig("default.res.json", "resource/");
        await RES.getResAsync("logo.png");
        await RES.loadGroup("preload",0);

        // Create camera.
       // egret3d.Camera.main;

       // paper.Scene.create("MyTestScene.scene.json",true)

  //    await RES.getResAsync("3d/Assets/MyTestScene.scene.json");
  // var   t:paper.Scene  = paper.Application.sceneManager.loadScene("3d/Assets/MyTestScene.scene.json");

   // await RES.getResAsync("Assets/Runpath.scene.json");
  /*  var   t:paper.Scene  = paper.Application.sceneManager.loadScene("Assets/Runpath.scene.json");
    

    
 //   await RES.getResAsync("Assets/Plane.prefab.json");
    const preabplane = RES.getRes("Assets/Plane.prefab.json") as egret3d.Prefab
     plane = preabplane.createInstance()
     plane.addComponent(MovePlane);

     plane2 = preabplane.createInstance()
       var pos:egret3d.Vector3 = plane2.transform.getPosition();
       pos.z -= 200;
       plane2.transform.setPosition(pos);
       var pl = plane2.addComponent(MovePlane);
       pl.setplaneid(2)*/

/*    await RES.getResAsync("Assets/BarbWireSingleLane.prefab.json");
    const preabcol = RES.getRes("Assets/BarbWireSingleLane.prefab.json") as egret3d.Prefab
    const obstacle = preabcol.createInstance()
    obstacle.addComponent(MovePlane);

     await RES.getResAsync("Assets/TreeStump.prefab.json");
    const preabcol2 = RES.getRes("Assets/TreeStump.prefab.json") as egret3d.Prefab
    const obstacle2 = preabcol2.createInstance()
    obstacle2.addComponent(MovePlane);*/
   //  ObjectManager.getInstance().loadMainchar()

  //  ObjectManager.getInstance().loadAllObj()
  	    var   t:paper.Scene  = paper.Application.sceneManager.loadScene("Assets/Runpath.scene.json");

    UIManager.getInstance().InitUISystem()

 //  SceneManager.getInstance().CreateMainRoad()


     

       // createCube();
     //   createGameUI();
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


    class RotateScript extends paper.Behaviour {
        private _timer: number = 0;

        public onUpdate(deltaTime: number) {
            this._timer += deltaTime;
            const sin = Math.sin(this._timer * 0.5);
            const cos = -Math.cos(this._timer * 0.5);

            this.gameObject.transform.setLocalEulerAngles(sin * 45, cos * 45, 0);
        }
    }

    



    
}