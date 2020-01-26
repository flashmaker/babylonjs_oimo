import { Scene, Engine } from "@babylonjs/core";
import { createScene, createEngine } from "./scene";
import { createField } from "./field";

let scene: Scene, engine: Engine;

export const startGame = (): void => {
    engine = createEngine();
    scene = createScene(engine);
    createField(scene);
    registerRenderer(scene);
    
    doRender();
}


// do render loop and auto-resize
const doRender = (): void => {
    engine.runRenderLoop(() => {
        scene.render();
    });
    window.addEventListener('resize', () => {
        engine.resize();
    })
}

const registerRenderer = (scene: Scene): void => {
    scene.registerBeforeRender(() => {

    });
}


// export default class Game {

//     private _canvas: HTMLCanvasElement;
//     private _engine: BABYLON.Engine;
//     private _scene: BABYLON.Scene;
//     private _camera: BABYLON.ArcRotateCamera;

//     constructor(canvasElement: string) {
//         // Create Engine, Scene
//         this._canvas = document.querySelector(canvasElement) as HTMLCanvasElement;
//         this._engine = new BABYLON.Engine(this._canvas, true, {}, true);
//         this._scene = new BABYLON.Scene(this._engine);
//         new FPSMonitor(this._scene);
//         this.createBasicEnv();
//     }

//     // create environment with some basic webgl elements
//     createBasicEnv(): void {
//         // Create Camera
//         this._camera = new BABYLON.ArcRotateCamera(
//             'arcam',
//             0,
//             Math.PI / 2,
//             100,
//             BABYLON.Vector3.Zero(),
//             this._scene
//         );
//         var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, -1.0), this._scene);

//         this._camera.lowerRadiusLimit = 120;
//         this._camera.upperRadiusLimit = 430;
//         this._camera.lowerAlphaLimit = -Math.PI / 3;
//         this._camera.upperAlphaLimit = Math.PI / 3;
//         this._camera.lowerBetaLimit = Math.PI / 2;
//         this._camera.upperBetaLimit = Math.PI / 2;

//         this._camera.attachControl(this._canvas, false);

//         light.position = new BABYLON.Vector3(20, 150, 70);
//         // Create loading manager
//         const assetsManager = new BABYLON.AssetsManager(this._scene);
//         this._engine.loadingUIText = 'Loading...';
//         assetsManager.onProgressObservable.add((task) => {
//             const { remainingCount, totalCount } = task;
//             this._engine.loadingUIText = 'We are loading the scene. ' + remainingCount + ' out of ' + totalCount + ' items still need to be loaded.';
//         });
//         assetsManager.load();

//         // create materials
//         var sourceMat = new BABYLON.StandardMaterial("sourceMat", this._scene);
//         sourceMat.wireframe = true;
//         sourceMat.backFaceCulling = false;


//         var materialAmiga = new BABYLON.StandardMaterial("amiga", this._scene);
//         materialAmiga.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);


//         // physics engine

//         // var gravityVector = new BABYLON.Vector3(0, -9.81, 0);
//         // var physicsPlugin = new BABYLON.OimoJSPlugin();
//         // this._scene.enablePhysics(gravityVector, physicsPlugin);
//         this._scene.enablePhysics(new BABYLON.Vector3(0, -10, 0), new BABYLON.OimoJSPlugin());
//         var physicsEngine = this._scene.getPhysicsEngine();

//         // box
//         var b;
//         var boxParamArray = [[42, 10, 4, 0, 0, -23], [42, 10, 4, 0, 0, 23], [4, 10, 50, 0, -23, 0], [4, 10, 50, 0, 23, 0]];
//         boxParamArray.forEach(e => {
//             b = BABYLON.MeshBuilder.CreateBox("myBox", { height: e[0], width: e[1], depth: e[2] }, this._scene);
//             b.position = new BABYLON.Vector3(e[3], e[4], e[5]);
//             b.material = materialAmiga;
//             b.physicsImpostor = new BABYLON.PhysicsImpostor(b, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, this._scene);
//         });

//         // Spheres
//         var y = 3;
//         const sphereCount: number = 10;
//         for (var index = 0; index < sphereCount; index++) {
//             var sphere = BABYLON.Mesh.CreateSphere("Sphere0", 16, 3, this._scene);
//             sphere.material = materialAmiga;
//             sphere.position = new BABYLON.Vector3(1, y, Math.random() * 10 - 5);
//             sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1 }, this._scene);

//             y += 1;
//         }
//     }


// }