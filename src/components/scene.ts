import {
    Scene,
    Engine,
    Vector3,
    Color4,
    OimoJSPlugin,
    HemisphericLight,
    Vector2,
    Nullable
} from "@babylonjs/core";
import {
    Control
} from "@babylonjs/gui";

import FPSMonitor from '../libs/fpsMonitor';
import { HEMISPHERIC_LIGHT, CONTROL_RECT } from "../configs/constants";
import { addCamera } from "./camera";
import { createGUI } from "./gui";
import { lowerAlphaLimit, upperAlphaLimit, gravityAngleCorrection, gravityMultyplier } from "../configs/cameraConfig";

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
const physics = new OimoJSPlugin();
const addLights = (scene: Scene): void => {
    var light = new HemisphericLight(HEMISPHERIC_LIGHT, new Vector3(1, 0.5, 0), scene);
    light.intensity = 0.5;
}

export const createEngine = (): Engine => new Engine(canvas, true, {}, true);

export const createScene = (engine: Engine): Scene => {
    let isDown: Boolean = false;
    let controlRect: Nullable<Control>;
    let downStartX: number = 0;
    let downCameraAlpha: number = 0;
    let downWidthX: number = 0;

    const scene = new Scene(engine);
    new FPSMonitor(scene);

    // TODO: add SceneOptimizer

    scene.clearColor = new Color4(0.5, 0.8, 0.5, 1);
    const camera = addCamera(scene, canvas);

    addLights(scene);

    scene.enablePhysics(new Vector3(0, -20, 0), physics);
    physics.setTimeStep(1 / 60);

    const advancedTexture = createGUI(scene);
    controlRect = advancedTexture._rootContainer.getChildByName(CONTROL_RECT);

    if (controlRect) {
        controlRect.onPointerDownObservable.add((coordinates: Vector2) => {
            isDown = true;
            downStartX = coordinates.x;
            // TODO: analyze width
            downWidthX = canvas.width;
            downCameraAlpha = camera.alpha;
        });

        controlRect.onPointerUpObservable.add((coordinates: Vector2) => {
            isDown = false;
        });

        controlRect.onPointerMoveObservable.add((coordinates: Vector2) => {
            if (isDown) {
                const delta = coordinates.x - downStartX;
                // TODO: analyze width
                const width = 200;

                let angelPointer = delta / width;// > 1 ? 1 : delta / width < - 1 ? -1 : delta / width;
                let deltaAlpha = angelPointer * upperAlphaLimit + downCameraAlpha;
                let newAlpha = deltaAlpha > upperAlphaLimit
                    ? upperAlphaLimit : deltaAlpha < lowerAlphaLimit
                        ? lowerAlphaLimit : deltaAlpha;

                camera.alpha = newAlpha;
                let gravityX = - gravityMultyplier * (newAlpha + gravityAngleCorrection);
                scene.getPhysicsEngine()?.setGravity(new Vector3(gravityX, -20, 0));
            }
        })
    }

    return scene;
};