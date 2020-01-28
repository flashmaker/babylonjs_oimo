import {
    Scene,
    StandardMaterial,
    Color3
} from "@babylonjs/core";

export const createMaterials = (scene: Scene): void => {
    const transparentMaterial = new StandardMaterial("transparentMaterial", scene);
    transparentMaterial.alpha = 0;

    const boxMaterial = new StandardMaterial("boxMaterial", scene);
    boxMaterial.emissiveColor = new Color3(0.7, 0.2, 0.4);

    const ballMaterial = new StandardMaterial("ballMaterial", scene);
    ballMaterial.emissiveColor = new Color3(0.3, 0.6, 0.2);
}