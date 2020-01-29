import {
  Mesh,
  Scene,
  Vector3,
  MeshBuilder,
} from "@babylonjs/core";
import { gateMultipliers } from "../configs/gateConfig";
import { gatePositions } from "../configs/gateConfig";
import { GATE_MATERIAL, GATE_MESH } from "../configs/constants";

export class Gate {
  public multiplier: number = 0;
  public gate: Mesh;

  constructor(scene: Scene, position: Vector3, multiplier: number) {
    this.multiplier = multiplier;

        this.gate = MeshBuilder.CreateCylinder(GATE_MESH, { height: 1.2, diameter: 0.7, tessellation: 16 }, scene);
        this.gate.material = scene.getMaterialByID(GATE_MATERIAL);
        this.gate.position = new Vector3(position.x, position.y, position.z);
        this.gate.rotation.z = Math.PI / 2;
    }
}

export const createGates = (scene: Scene): Array<Gate> => {
    let gates: Array<Gate> = [];
    let gate: Gate;
    let gateCount: number = gatePositions.length;
    let i = 0;
    if (gateCount) {
        do {
            gate = new Gate(scene, gatePositions[i], gateMultipliers[i]);
            gates.push(gate);
            i++;
        } while (i < gateCount);
    }

  return gates;
};
