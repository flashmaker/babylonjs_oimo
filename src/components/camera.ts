import {
    Scene,
    ArcRotateCamera,
    Vector3
} from "@babylonjs/core";

export const addCamera = (scene: Scene, canvas: HTMLCanvasElement): void => {
    let camera = new ArcRotateCamera(
        'arcam',
        0,
        Math.PI / 2,
        20,
        Vector3.Zero(),
        scene
    );

    camera.lowerRadiusLimit = 20;
    camera.upperRadiusLimit = 20;
    camera.lowerAlphaLimit = -Math.PI / 4;
    camera.upperAlphaLimit = Math.PI / 4;
    camera.lowerBetaLimit = Math.PI / 2;
    camera.upperBetaLimit = Math.PI / 2;

    camera.attachControl(canvas, false);
}