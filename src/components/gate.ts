import {
    Mesh,
    Scene,
    Vector3,
    StandardMaterial,
    Color3,
    PhysicsImpostor
} from "@babylonjs/core";
import { gateMultipliers } from "../configs/gateConfig";
import { gatePositions } from "../configs/gateConfig";

export class Gate {
    public multiplier: number = 0;
    public gate: Mesh;

    constructor(scene: Scene, material: StandardMaterial, position: Vector3, size: number, mass: number, multiplier: number = 0) {
        this.multiplier = multiplier;

        // TODO: create gate

    }
}


// TODO: create gates
export const createGates = (scene: Scene): Array<Gate> => {
    let gates: Array<Gate> = [];

    return gates;
}
