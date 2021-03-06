import {
    Mesh,
    Scene,
    Vector3,
    PhysicsImpostor,
} from "@babylonjs/core";
import { BALL_MATERIAL, BALL_MESH } from "../configs/constants";
import { ballsSize, ballsMass, ballLevelMultiplier, positionDeviation } from "../configs/ballConfig";

export class Ball {
    public lastGate: number = 0;
    public mesh: Mesh;

    constructor(scene: Scene, position: Vector3, size: number, mass: number, lastGate: number = 0) {
        this.lastGate = lastGate;

        this.mesh = Mesh.CreateSphere(BALL_MESH, 16, size, scene);
        this.mesh.material = scene.getMaterialByID(BALL_MATERIAL);
        this.mesh.position = new Vector3(position.x, position.y, position.z);
        this.mesh.physicsImpostor = new PhysicsImpostor(this.mesh, PhysicsImpostor.SphereImpostor, { mass: mass }, scene);
    }

    destroy(): void {
        this.mesh.dispose();
    }
}

const randPosition = (position: Vector3): Vector3 => {
    return new Vector3(
        position.x + (Math.random() * positionDeviation.x * 2 - positionDeviation.x),
        position.y + (Math.random() * positionDeviation.y * 2 - positionDeviation.y),
        position.z + (Math.random() * positionDeviation.z * 2 - positionDeviation.z)
    );
};

export const addBalls = (scene: Scene, ballsArray:Ball[], level: number, position: Vector3): void => {
    let ball: Ball;
    const ballSize = ballsSize[level];
    const ballMass = ballsMass[level];
    const ballCount: number = ballLevelMultiplier[level];
    let i = 0;

    if (ballCount > 0) {
        do {
            setTimeout(() => {
                ball = new Ball(scene, randPosition(position), ballSize, ballMass, level);
                ballsArray.push(ball);
            }, 5 * (i++));
        } while (i < ballCount);
    }
}
