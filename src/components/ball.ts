import {
    Mesh,
    Scene,
    Vector3,
    PhysicsImpostor
} from "@babylonjs/core";

import { ballsSize, ballsMass, ballLevelMultiplier, positionDeviation } from "../configs/ballConfig";

export class Ball {
    public lastMultiplier: number = 0;
    public ball: Mesh;

    constructor(scene: Scene, position: Vector3, size: number, mass: number, lastMultiplier: number = 0) {
        this.lastMultiplier = lastMultiplier;

        this.ball = Mesh.CreateSphere("ball", 16, size, scene);
        this.ball.material = scene.getMaterialByID('ballMaterial');
        this.ball.position = new Vector3(position.x, position.y, position.z);
        this.ball.physicsImpostor = new PhysicsImpostor(this.ball, PhysicsImpostor.SphereImpostor, { mass: mass }, scene);
    }

    destroy(): void {
        this.ball.dispose();
    }
}
const randPosition = (position: Vector3): Vector3 => {
    return new Vector3(
        position.x + (Math.random() * positionDeviation.x * 2 - positionDeviation.x),
        position.y + (Math.random() * positionDeviation.y * 2 - positionDeviation.y),
        position.z + (Math.random() * positionDeviation.z * 2 - positionDeviation.z)
    );
}

export const addBalls = (scene: Scene, level: number, position: Vector3): Array<Ball> => {
    let balls: Array<Ball> = [];
    let ball: Ball;
    let ballSize = ballsSize[level];
    let ballMass = ballsMass[level];
    let ballCount: number = ballLevelMultiplier[level];
    let currentBall = 0;

    if (ballCount > 0) {
        do {
            (function (ind) {
                setTimeout(function () {
                    ball = new Ball(scene, randPosition(position), ballSize, ballMass, level);
                    balls.push(ball);
                }, 5 * (ind + 1));
            })(currentBall);
            currentBall++;
        } while (currentBall < ballCount);
    }
    return balls;
}