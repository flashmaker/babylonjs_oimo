import { Scene, Engine, Vector3 } from "@babylonjs/core";
import { createScene, createEngine } from "./scene";
import { createMaterials } from "./materials";
import { createField } from "./field";
import { Ball, addBalls } from "./ball";
import { Gate, createGates } from "./gate";
import { gatesMap, gatePositions } from "../configs/gateConfig";

let scene: Scene;
let engine: Engine;
let balls: Ball[] = [];
let gates: Gate[];

export const startGame = (): void => {
  engine = createEngine();
  scene = createScene(engine);
  createMaterials(scene);
  createField(scene);
  // TODO: set balls position
  gates = createGates(scene);
  addBalls(scene, balls, 0, new Vector3(0.5, 4, -2));


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

const checkCollisions = () => {
  let i: number = 0;
  let j: number = 0;

  let currentBall: Ball;
  let currentGate: Gate;

  let ballsCount: number = balls.length;
  let gatesCount: number;
  
  let ballTargetGate: number[];
  if (ballsCount) {
    do {
      currentBall = balls[i];
      if (currentBall.lastGate < gatesMap.length) {
        ballTargetGate = gatesMap[currentBall.lastGate];
        gatesCount = ballTargetGate.length;

        if (gatesCount) {
          j = 0;
          do {
            currentGate = gates[ballTargetGate[j]];
            if (currentGate.mesh.intersectsMesh(currentBall.mesh, true)) {
              addBalls(scene, balls, currentBall.lastGate + 1, gatePositions[ballTargetGate[j]]);
              currentBall.destroy();
              balls.splice(i, 1);
              i--;
              ballsCount--;
            }
            j++;
          } while (j < gatesCount);
        }
      }
      i++;
    } while (i < ballsCount);
  }
}

const registerRenderer = (scene: Scene): void => {
  scene.registerBeforeRender(checkCollisions);
}