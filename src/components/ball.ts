import {
    Mesh,
    Scene,
    Vector3,
    StandardMaterial,
    Color3,
    PhysicsImpostor
} from "@babylonjs/core";
import { ballsSize } from "../configs/ballConfig";
import { ballLevelMultiplier } from "../configs/ballConfig";

export class Ball {
    public lastMultiplier: number = 0;
    constructor(scene: Scene, material: StandardMaterial, position: Vector3, lastMultiplier: number = 0) {
        this.lastMultiplier = lastMultiplier;

        var sphere = Mesh.CreateSphere("Sphere0", 16, 3, scene);
        sphere.material = material;
        sphere.position = position;
        sphere.physicsImpostor = new PhysicsImpostor(sphere, PhysicsImpostor.SphereImpostor, { mass: 1 }, scene);

    }
}

export const addBalls = (scene: Scene, level: number, position: Vector3): Array<Ball> => {
    let balls: Array<Ball> = [];
    let ball: Ball;
    let ballSize = ballsSize[level];
    let ballCount: number = ballLevelMultiplier[level];


    // TODO move to config ball color
    const material = new StandardMaterial("amiga", scene);
    material.emissiveColor = new Color3(0.5, 0.5, 0.5);


    if (ballCount > 0) {
        do {
            ball = new Ball(scene, material, position, level);
            balls.push(ball);
            ballCount--;
        } while (ballCount <= 0);
    }

    return balls;
}