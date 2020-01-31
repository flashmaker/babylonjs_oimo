import {
  Mesh,
  Scene,
  Vector3,
  MeshBuilder,
  Color4,
  StandardMaterial,
  Texture,
  Vector4,
} from "@babylonjs/core";
import { gateMultipliers, gatePositions } from "../configs/gateConfig";
import { GATE_MATERIAL, TRANSPARENT_MATERIAL, GATE_MESH, GATE_СYLINDER } from "../configs/constants";

export class Gate {
  public multiplier: number = 0;
  public сylinder: Mesh;
  public mesh: Mesh;

  constructor(scene: Scene, position: Vector3, multiplier: number) {
    this.multiplier = multiplier;

    // TODO: set new material
    let faceMaterial = new StandardMaterial("material", scene);
    faceMaterial.diffuseTexture = new Texture("../assets/textures/gate_4x.jpg", scene)
  
    var faceUV = [];
    faceUV[0] = new Vector4(0, 1, 1, 0);
    faceUV[1] = new Vector4(0, 0, 0, 0);
    faceUV[2] = new Vector4(0, 0, 0,0);

    this.сylinder = MeshBuilder.CreateCylinder(GATE_СYLINDER, { height: 1.2, diameter: 0.7, tessellation: 16, faceUV: faceUV }, scene);
    //this.сylinder.material = scene.getMaterialByID(GATE_MATERIAL);
   this.сylinder.material = faceMaterial;
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





  // TODO: REMOVE TEST
  var cld: Mesh;

  var cldMaterial = new StandardMaterial("material", scene);
  cldMaterial.diffuseTexture = new Texture("../assets/textures/gate_4x.jpg", scene)

  var faceUV = [];
  faceUV[0] = new Vector4(0, 1, 1, 0);
  faceUV[1] = new Vector4(0, 0, 0.5, 1);
  faceUV[2] = new Vector4(0, 0, 1, 1);



  var faceColors = new Array(3);
  faceColors[0] = new Color4(1, 0, 0, 1);
  faceColors[1] = new Color4(0, 1, 0, 1);
  faceColors[2] = new Color4(0, 0, 1, 1);

  cld = MeshBuilder.CreateCylinder("test", { height: 8, diameter: 3, tessellation: 16, faceUV: faceUV, faceColors: faceColors}, scene);
  cld.position = new Vector3(5, 0, 0);
  cld.rotation.x = Math.PI / 2;
  cld.material = cldMaterial;

// END REMOVE TEST



  return gates;
};
