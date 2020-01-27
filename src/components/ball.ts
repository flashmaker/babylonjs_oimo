import {
    Mesh,
    Scene,
    Vector3,
    StandardMaterial,
    Color3,
    PhysicsImpostor
} from "@babylonjs/core";
import { ballsSize } from "../configs/ballConfig";
import { ballsMass } from "../configs/ballConfig";
import { ballLevelMultiplier } from "../configs/ballConfig";

export class Ball {
    public lastMultiplier: number = 0;
    public ball: Mesh;

    constructor(scene: Scene, material: StandardMaterial, position: Vector3, size: number, mass: number, lastMultiplier: number = 0) {
        this.lastMultiplier = lastMultiplier;

        this.ball = Mesh.CreateSphere("Sphere0", 16, size, scene);
        this.ball.material = material;
        this.ball.position = new Vector3(position.x, position.y, position.z);
        this.ball.physicsImpostor = new PhysicsImpostor(this.ball, PhysicsImpostor.SphereImpostor, { mass: mass }, scene);
    }

    destroy(): void {
        this.ball.dispose();
    }
}

export const addBalls = (scene: Scene, level: number, position: Vector3): Array<Ball> => {
    let balls: Array<Ball> = [];
    let ball: Ball;
    let ballSize = ballsSize[level];
    let ballMass = ballsMass[level];
    let ballCount: number = ballLevelMultiplier[level];


    // TODO: move to config ball color
    const material = new StandardMaterial("amiga", scene);
    material.emissiveColor = new Color3(0.5, 0.5, 0.5);

    // TODO: remove set position here or add randomizer func
    position.y = 3;
    position.x = 1;
    if (ballCount > 0) {
        do {
            position.z = Math.random() * 10 - 5;
            position.y++;
            ball = new Ball(scene, material, position, ballSize, ballMass, level);
            balls.push(ball);
            ballCount--;
        } while (ballCount > 0);
    }

    return balls;
}