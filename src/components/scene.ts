import {
    Scene,
    Engine,
    Vector3,
    Color4,
    OimoJSPlugin,
    HemisphericLight
} from "@babylonjs/core";
import FPSMonitor from '../libs/fpsMonitor';
import { HEMISPHERIC_LIGHT } from "../configs/constants";
import { addCamera } from "./camera";

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
const physics = new OimoJSPlugin();

export const createEngine = (): Engine => new Engine(canvas, true, {}, true);

const addLights = (scene: Scene): void => {
    var light = new HemisphericLight(HEMISPHERIC_LIGHT, new Vector3(1, 0.5, 0), scene);
    light.intensity = 0.5;
}
export const createScene = (engine: Engine): Scene => {
    const scene = new Scene(engine);
    new FPSMonitor(scene);
    // TODO: add SceneOptimizer
    scene.clearColor = new Color4(0.5, 0.8, 0.5, 1);
    const camera = addCamera(scene, canvas);

    //     const adt = addGUI(scene, canvas, camera);

    addLights(scene);

    scene.enablePhysics(new Vector3(0, -20, 0), physics);
    physics.setTimeStep(1 / 60);
    return scene;
};

