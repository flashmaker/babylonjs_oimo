import {
    Scene,
    Engine,
    Vector3,
    Color4,
    OimoJSPlugin,
    HemisphericLight,
    Vector2,
    Nullable,
    ArcRotateCamera
} from "@babylonjs/core";
import {
    Control
} from "@babylonjs/gui";

import FPSMonitor from '../libs/fpsMonitor';
import { HEMISPHERIC_LIGHT } from "../configs/constants";
import { addCamera } from "./camera";
import { createGUI } from "./gui";
import { CONTROL_RECT } from "../configs/constants";

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
const physics = new OimoJSPlugin();
const addLights = (scene: Scene): void => {
    var light = new HemisphericLight(HEMISPHERIC_LIGHT, new Vector3(1, 0.5, 0), scene);
    light.intensity = 0.5;
}
let scene: Scene;
let camera: ArcRotateCamera;
let isDown: Boolean = false;
let controlRect: Nullable<Control>;
let downStartX: number = 0;
let downWidthX: number = 0;
let downCameraAlpha: number = 0;

export const createEngine = (): Engine => new Engine(canvas, true, {}, true);

export const createScene = (engine: Engine): Scene => {
    scene = new Scene(engine);
    new FPSMonitor(scene);
    // TODO: add SceneOptimizer
    scene.clearColor = new Color4(0.5, 0.8, 0.5, 1);
    camera = addCamera(scene, canvas);
    const advancedTexture = createGUI(scene);
    controlRect = advancedTexture._rootContainer.getChildByName(CONTROL_RECT);

    if (controlRect) {
        controlRect.onPointerDownObservable.add(onDown);
        controlRect.onPointerUpObservable.add(onUp);
        controlRect.onPointerMoveObservable.add(onMove)
    }

    addLights(scene);

    scene.enablePhysics(new Vector3(0, -20, 0), physics);
    physics.setTimeStep(1 / 60);
    return scene;
};

const calculateDelta = (moveX: number): number => {
    let delta: number = downStartX - moveX;
    return delta;
}

const calculateCameraAlpha = (delta: number): void => {
    // TODO: optimaze logic
    const width = 200;
    const gravityMultyplier = 10;
    const lowerAlphaLimit: number = -Math.PI / 4;
    const upperAlphaLimit: number = Math.PI / 4;

    let angelPointer = delta / width;// > 1 ? 1 : delta / width < - 1 ? -1 : delta / width;
    let deltaAlpha = angelPointer * upperAlphaLimit + downCameraAlpha;
    let newAlpha = angelPointer * upperAlphaLimit + downCameraAlpha > Math.PI / 4
        ? Math.PI / 4 : angelPointer * upperAlphaLimit + downCameraAlpha < - Math.PI / 4
            ? -Math.PI / 4 : angelPointer * upperAlphaLimit + downCameraAlpha;
    camera.alpha = newAlpha;
    let gravityX = - gravityMultyplier * newAlpha;
    
    
    scene.getPhysicsEngine()?.setGravity(new Vector3(0, -20, gravityX));
}

const onDown = (coordinates: Vector2): void => {
    isDown = true;
    downStartX = coordinates.x;
    downWidthX = canvas.width;
    downCameraAlpha = camera.alpha;
}

const onUp = (coordinates: Vector2): void => {
    isDown = false;
}

const onMove = (coordinates: Vector2): void => {
    if (isDown) {
        const delta = calculateDelta(coordinates.x);
        calculateCameraAlpha(delta);
    }
}

