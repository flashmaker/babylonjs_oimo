import {
  Scene,
  ArcRotateCamera,
  Vector3,
} from "@babylonjs/core";
import { MAIN_CAMERA } from "../configs/constants";

export const addCamera = (scene: Scene, canvas: HTMLCanvasElement): ArcRotateCamera => {
  let camera = new ArcRotateCamera(MAIN_CAMERA, 0, 0, 20, new Vector3(0, 0, 0), scene);
  camera.setPosition(new Vector3(0, 0, -20));
  camera.alpha = -Math.PI / 2;
  camera.lowerRadiusLimit = 20;
  camera.upperRadiusLimit = 20;
  return camera;
}
