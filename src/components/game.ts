import { Scene, Engine, Vector3 } from "@babylonjs/core";
import { createScene, createEngine } from "./scene";
import { createField } from "./field";
import { Ball, addBalls } from "./ball";
import { Gate, createGates } from "./gate";

let scene: Scene, engine: Engine, balls: Array<Ball>, gates: Array<Gate>;

export const startGame = (): void => {
    engine = createEngine();
    scene = createScene(engine);
    // TODO: createMaterials
    createField(scene);
    // TODO: set balls position
    balls = addBalls(scene, 0, Vector3.Zero());
    gates = createGates(scene);

    registerRenderer(scene);

    doRender();
}


// do render loop and auto-resize
const doRender = (): void => {
    engine.runRenderLoop(() => {
        scene.render();
    });
    window.addEventListener('resize', () => {
        engine.resize();
    })
}

const registerRenderer = (scene: Scene): void => {
    scene.registerBeforeRender(() => {

    });
}