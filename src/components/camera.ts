import {
  Scene,
  ArcRotateCamera,
  Vector3,
} from "@babylonjs/core";
import { MAIN_CAMERA } from "../configs/constants";

export const addCamera = (scene: Scene, canvas: HTMLCanvasElement): ArcRotateCamera => {
    let camera = new ArcRotateCamera(
        MAIN_CAMERA,
        0,
        Math.PI / 2,
        20,
        Vector3.Zero(),
        scene
    );

    // camera.lowerRadiusLimit = 20;
    // camera.upperRadiusLimit = 20;
    // camera.lowerAlphaLimit = -Math.PI / 4;
    // camera.upperAlphaLimit = Math.PI / 4;
    // camera.lowerBetaLimit = Math.PI / 2;
    // camera.upperBetaLimit = Math.PI / 2;

    //camera.attachControl(canvas, false);
    return camera;
}
