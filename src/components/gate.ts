import {
  Mesh,
  Scene,
  Vector3,
  MeshBuilder,
  Color4,
} from "@babylonjs/core";
import { gateMultipliers, gatePositions } from "../configs/gateConfig";
import { GATE_MATERIAL, TRANSPARENT_MATERIAL, GATE_MESH, GATE_СYLINDER } from "../configs/constants";

export class Gate {
  public multiplier: number = 0;
  public сylinder: Mesh;
  public mesh: Mesh;

  constructor(scene: Scene, position: Vector3, multiplier: number) {
    this.multiplier = multiplier;

    var faceColors = [];
    faceColors[0] = new Color4(0.5, 0.5, 0.5, 1)

    this.сylinder = MeshBuilder.CreateCylinder(GATE_СYLINDER, { height: 1.2, diameter: 0.7, tessellation: 16 }, scene);
    this.сylinder.material = scene.getMaterialByID(GATE_MATERIAL);
    this.сylinder.position = new Vector3(position.x, position.y, position.z);
    this.сylinder.rotation.x = Math.PI / 2;

    this.mesh = MeshBuilder.CreatePlane(GATE_MESH, { height: 0.5, width: 1 }, scene);
    this.mesh.material = scene.getMaterialByID(TRANSPARENT_MATERIAL);
    this.mesh.position = new Vector3(position.x, position.y - 0.25, position.z);
    this.mesh.rotation.x = Math.PI / 2;
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
