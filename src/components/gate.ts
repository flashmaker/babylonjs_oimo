import {
  Mesh,
  Scene,
  Vector3,
  MeshBuilder,
  StandardMaterial,
  Texture,
  Vector4,
  Color4,
} from "@babylonjs/core";
import { gateMultipliers, gatePositions } from "../configs/gateConfig";
import { GATE_MATERIAL, GATE_MESH } from "../configs/constants";

export class Gate {
  public multiplier: number = 0;
  public mesh: Mesh;

  constructor(scene: Scene, position: Vector3, multiplier: number) {
    this.multiplier = multiplier;


    // var canMaterial = new StandardMaterial("material", scene);
    // canMaterial.diffuseTexture = new Texture("../assets/textures/gate5x.png", scene)

    // var faceUV = [];
    // faceUV[0] = new Vector4(0, 0, 0, 0);
    // faceUV[1] = new Vector4(1, 0, 0.32, 1);
    // faceUV[2] = new Vector4(0, 0, 0.25, 1);



    var faceColors = [];
    faceColors[0] = new Color4(0.5, 0.5, 0.5, 1)

    this.mesh = MeshBuilder.CreateCylinder(GATE_MESH, { height: 1.2, diameter: 0.7, tessellation: 16}, scene);
    this.mesh.material = scene.getMaterialByID(GATE_MATERIAL);
    this.mesh.position = new Vector3(position.x, position.y, position.z);
    this.mesh.rotation.z = Math.PI / 2;

    var plane = MeshBuilder.CreatePlane("plane", {height:2, width: 1}, scene);




    //var can = MeshBuilder.CreateCylinder("can", { height: 1.16, faceUV: faceUV, faceColors: faceColors }, scene);
    //this.mesh.material = canMaterial;




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
