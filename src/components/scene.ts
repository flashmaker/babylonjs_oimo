import {
    Scene,
    Engine,
    Vector3,
    Color4,
    OimoJSPlugin
} from "@babylonjs/core";
import FPSMonitor from '../libs/fpsMonitor';


import { addCamera } from "./camera";
// import { addLevelBox, addLevelElements, addMultipliers, addToruses } from "./level";
// import { addBalls } from "./ball";
// import { IBallCounter } from "../interfaces/IBallCounter";
// import { addBackground } from "./background";
// import { addSkyBox } from "./skybox";
// import { showLooseScreen, addGUI } from "./gui";
// import { loadMaterialsToScene } from "./materials";


const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
const physics = new OimoJSPlugin();

export const createEngine = (): Engine => new Engine(canvas, true, {}, true);

export const createScene = (engine: Engine): Scene => {
    const scene = new Scene(engine);
    new FPSMonitor(scene);
    // TODO add SceneOptimizer
    // TODO add light
    scene.clearColor = new Color4(0.5, 0.8, 0.5, 1);
    const camera = addCamera(scene, canvas);

    //     loadMaterialsToScene(scene);

    //     const adt = addGUI(scene, canvas, camera);

    //     addLight(scene);
    //     addSkyBox(scene);
    //     addBackground(scene, new Vector3(0, -4, -2));
    //     addBackground(scene, new Vector3(4, -4, -2));
    //     addBackground(scene, new Vector3(-4, -4, -2));

         scene.enablePhysics(new Vector3(0, -20, 0), physics);
         //physics.setTimeStep(1 / 60);

    //     addLevelBox(scene, {
    //         height: 4.5,
    //         width: 3.0,
    //         depth: 0.4,
    //         thickness: 0.2,
    //     });
    //     addLevelElements(scene);
    //     addToruses(scene);

    //     const ballCounter: IBallCounter = { amount: 1 };
    //     const multipliers = addMultipliers(scene, ballCounter);

    //     addBalls(new Vector3(0, 4.2, 0), scene, ballCounter.amount, {
    //         segments: 16,
    //         diameter: 0.22,
    //         multipliers,
    //     });


 

    return scene;
};
