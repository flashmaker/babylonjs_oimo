// create game field
import {
  Scene,
  Vector3,
  MeshBuilder,
  PhysicsImpostor,
  Mesh,
} from "@babylonjs/core";
import { boxesParams } from "../configs/fieldConfig";

export const createField = (scene: Scene): void => {
  // boxes
  let b: Mesh; let i: number = 0; let e: [number, number, number, number, number, number, string?];
  const boxesCount = boxesParams.length;
  if (boxesCount) {
    do {
      e = boxesParams[i];
      b = MeshBuilder.CreateBox("myBox", { height: e[0], width: e[1], depth: e[2] }, scene);
      b.position = new Vector3(e[3], e[4], e[5]);
      b.material = e[6] ? scene.getMaterialByID(e[6]) : scene.getMaterialByID("fieldMaterial");
      b.physicsImpostor = new PhysicsImpostor(b, PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      i++;
    } while (i < boxesCount);
  }

  // TODO: add arc processor
}
;
