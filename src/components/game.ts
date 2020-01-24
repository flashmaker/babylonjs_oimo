import * as BABYLON from '@babylonjs/core';
import FPSMonitor from '../libs/fpsMonitor';

export default class Game {

    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.ArcRotateCamera;

    constructor(canvasElement: string) {
        // Create Engine, Scene
        this._canvas = document.querySelector(canvasElement) as HTMLCanvasElement;
        this._engine = new BABYLON.Engine(this._canvas, true, {}, true);
        this._scene = new BABYLON.Scene(this._engine);
        new FPSMonitor(this._scene);
        this.createBasicEnv();
    }

    // create environment with some basic webgl elements
    createBasicEnv(): void {
        const sphereCount: number = 20;

        // Create Lights
        // new BABYLON.HemisphericLight('hLight', new BABYLON.Vector3(-1, -1, -1), this._scene);
        // const lightPos = new BABYLON.Vector3(5, 5, 5);
        // const spotLight = new BABYLON.SpotLight('sLight', lightPos, new BABYLON.Vector3(0, -1, 0), Math.PI / 2, 20, this._scene);
        // const spotLightMesh = BABYLON.MeshBuilder.CreateSphere('lightMesh', { diameter: 0.2 }, this._scene);
        // spotLightMesh.position = lightPos;


        // Create Camera
        this._camera = new BABYLON.ArcRotateCamera(
            'arcam',
            0,
            Math.PI / 2,
            100,
            BABYLON.Vector3.Zero(),
            this._scene
        );
        var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, -1.0), this._scene);
        //this._camera.upperBetaLimit = Math.PI / 2;
        //this._camera.lowerRadiusLimit = 5;
        //this._camera.upperRadiusLimit = 30;

        this._camera.maxZ = 5000;
        this._camera.lowerRadiusLimit = 120;
        this._camera.upperRadiusLimit = 430;
        this._camera.lowerAlphaLimit = -Math.PI / 3;
        this._camera.upperAlphaLimit = Math.PI / 3;
        this._camera.lowerBetaLimit = Math.PI / 2;
        this._camera.upperBetaLimit = Math.PI / 2;

        this._camera.attachControl(this._canvas, false);

        //this._scene .activeCamera.panningSensibility = 0;



        // physics engine

        // var gravityVector = new BABYLON.Vector3(0, -9.81, 0);
        //var physicsPlugin = new BABYLON.OimoJSPlugin();
        // this._scene.enablePhysics(gravityVector, physicsPlugin);

        this._scene.enablePhysics(new BABYLON.Vector3(0, -10, 0), new BABYLON.OimoJSPlugin());


        light.position = new BABYLON.Vector3(20, 150, 70);
        // Create loading manager
        const assetsManager = new BABYLON.AssetsManager(this._scene);
        // assetsManager.addTextureTask('ground-diffuse-texture', 'assets/textures/ground.jpg');
        //assetsManager.addTextureTask('ground-heightMap-texture', 'assets/textures/heightMap.png');
        this._engine.loadingUIText = 'Loading...';
        assetsManager.onProgressObservable.add((task) => {
            const { remainingCount, totalCount } = task;
            this._engine.loadingUIText = 'We are loading the scene. ' + remainingCount + ' out of ' + totalCount + ' items still need to be loaded.';
        });
        assetsManager.load();

        // Create Ground from HeightMap
        //const groundMat = new BABYLON.StandardMaterial('ground-material', this._scene);
        //const diffuseTexture = new BABYLON.Texture('assets/textures/ground.jpg', this._scene);
        //diffuseTexture.uScale = 6;
        //diffuseTexture.vScale = 6;
        //groundMat.diffuseTexture = diffuseTexture;
        //groundMat.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        //const ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap('ground', 'assets/textures/heightMap.png', {
        //    width: 10,
        //    height: 10,
        //   subdivisions: 32,
        //   minHeight: 0,
        //  maxHeight: 1
        //}, this._scene);
        // ground.material = groundMat;

        // create materials
        var sourceMat = new BABYLON.StandardMaterial("sourceMat", this._scene);
        sourceMat.wireframe = true;
        sourceMat.backFaceCulling = false;

        // Light Animation
        /* let alpha = 0;
        this._scene.onBeforeRenderObservable.add(() => {
            alpha += 0.01;
            const pos = new BABYLON.Vector3(
                Math.cos(alpha),
                5,
                Math.sin(alpha)
            );
            spotLight.position = pos;
            spotLightMesh.position = pos;
        }); */

        // create two cube

        //var a = BABYLON.Mesh.CreateBox("box", 4, this._scene);
        //var b = BABYLON.Mesh.CreateBox("box", 4, this._scene);
        var outerBox = BABYLON.Mesh.CreateBox("box", 3, null);
        outerBox.scaling.y = 17.0;
        outerBox.scaling.z = 17.0;

        var innerBox = BABYLON.Mesh.CreateBox("box", 3, null);
        innerBox.scaling.y = 14.0;
        innerBox.scaling.z = 14.0;

        //innerBox.position.x += 5;
        //b.position.y += 2.5;


        var oBox = BABYLON.CSG.FromMesh(outerBox);
        var iBox = BABYLON.CSG.FromMesh(innerBox);

        // Set up a MultiMaterial
        var mat0 = new BABYLON.StandardMaterial("mat0", this._scene);

        mat0.diffuseColor.copyFromFloats(0.8, 0.2, 0.2);
        mat0.backFaceCulling = false;

        var field = oBox.subtract(iBox);
        var newMesh = field.toMesh("csg", mat0, this._scene, true);
        newMesh.position = new BABYLON.Vector3(0, 0, 0);

        outerBox.dispose();
        innerBox.dispose();

        // Spheres
        var materialAmiga = new BABYLON.StandardMaterial("amiga", this._scene);
        materialAmiga.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        var y = 0;
        for (var index = 0; index < sphereCount; index++) {
            var sphere = BABYLON.Mesh.CreateSphere("Sphere0", 16, 3, this._scene);
            sphere.material = materialAmiga;

            sphere.position = new BABYLON.Vector3(0, y, Math.random() * 10 - 5);

            y += 1;
        }

    }

    // do render loop and auto-resize
    doRender(): void {
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });
        window.addEventListener('resize', () => {
            this._engine.resize();
        })
    }

}