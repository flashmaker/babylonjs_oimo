import {
  Scene,
  Vector3,
  MeshBuilder,
  PhysicsImpostor,
  Mesh,
} from "@babylonjs/core";
import { boxesParams } from "../configs/fieldConfig";
import { FIELD_MATERIAL, BOX_MESH } from "../configs/constants";

// create game field
export const createField = (scene: Scene): void => {
    // boxes
    let b: Mesh, i: number = 0, e: [number, number, number, number, number, number, string?];
    let boxesCount = boxesParams.length;
    if (boxesCount) {
        do {
            e = boxesParams[i];
            b = MeshBuilder.CreateBox(BOX_MESH, { height: e[0], width: e[1], depth: e[2] }, scene);
            b.position = new Vector3(e[3], e[4], e[5]);
            b.material = e[6] ? scene.getMaterialByID(e[6]) : scene.getMaterialByID(FIELD_MATERIAL);
            b.physicsImpostor = new PhysicsImpostor(b, PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
            i++;
        } while (i < boxesCount);
    }

  // TODO: add arc processor
}