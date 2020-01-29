import { Scene, Engine, Vector3 } from "@babylonjs/core";
import { createScene, createEngine } from "./scene";
import { createMaterials } from "./materials";
import { createField } from "./field";
import { Ball, addBalls } from "./ball";
import { Gate, createGates } from "./gate";

let scene: Scene;
let engine: Engine;
let balls: Ball[];
let gates: Gate[];

export const startGame = (): void => {
  engine = createEngine();
  scene = createScene(engine);
  createMaterials(scene);
  createField(scene);
  // TODO: set balls position
  balls = addBalls(scene, 0, new Vector3(0.5, 4, -2));
  gates = createGates(scene);

  registerRenderer(scene);

  doRender();
};

// do render loop and auto-resize
const doRender = (): void => {
  engine.runRenderLoop(() => {
    scene.render();
  });
  window.addEventListener("resize", () => {
    engine.resize();
  });
};

const registerRenderer = (scene: Scene): void => {
  scene.registerBeforeRender(() => {

  });
}
;
