import {
    Scene,
    StandardMaterial,
    Color3
} from "@babylonjs/core";
import { BALL_MATERIAL, FIELD_MATERIAL, GATE_MATERIAL, TRANSPARENT_MATERIAL } from "../configs/constants";

export const createMaterials = (scene: Scene): void => {
    const ballMaterial = new StandardMaterial(BALL_MATERIAL, scene);
    ballMaterial.emissiveColor = new Color3(0.2, 0.9, 0.2);

    const fieldMaterial = new StandardMaterial(FIELD_MATERIAL, scene);
    fieldMaterial.emissiveColor = new Color3(0.9, 0.1, 0.1);

    const gateMaterial = new StandardMaterial(GATE_MATERIAL, scene);
    gateMaterial.emissiveColor = new Color3(0.9, 0.2, 0.7);

    const transparentMaterial = new StandardMaterial(TRANSPARENT_MATERIAL, scene);
    transparentMaterial.alpha = 0;
}