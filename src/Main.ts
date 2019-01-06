namespace helloworld {
    declare var  person:paper.GameObject ;
    declare var  plane:paper.GameObject ;
    declare var  plane2:paper.GameObject ;

    export async function run() {
        var s = 0
      //    await RES.loadConfig("https://h5gameres.kuaiyugo.com/chatgame/cocos_games_res/outSource/cowboy/20180810/resource/default.res.json", "https://h5gameres.kuaiyugo.com/chatgame/cocos_games_res/outSource/cowboy/20180810/resource");
    //  await RES.loadConfig("http://129.204.122.74/resource/default.res.json", "http://129.204.122.74/resource/");
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

    }


    



    
}