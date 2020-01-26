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
        100,
        Vector3.Zero(),
        scene
    );

    camera.lowerRadiusLimit = 120;
    camera.upperRadiusLimit = 430;
    camera.lowerAlphaLimit = -Math.PI / 3;
    camera.upperAlphaLimit = Math.PI / 3;
    camera.lowerBetaLimit = Math.PI / 2;
    camera.upperBetaLimit = Math.PI / 2;

    camera.attachControl(canvas, false);
}