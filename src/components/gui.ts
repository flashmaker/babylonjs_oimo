import {
    Scene
} from "@babylonjs/core";
import {
    AdvancedDynamicTexture,
    Control,
    Rectangle
} from "@babylonjs/gui";
import { CONTROL_RECT } from "../configs/constants";

export const createGUI = (scene: Scene): AdvancedDynamicTexture => {
    let advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI', true, scene);
    let controlRect = new Rectangle(CONTROL_RECT);
    controlRect.width = 1;
    controlRect.height = 1;
    controlRect.isPointerBlocker = true;

    controlRect.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER
    controlRect.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    advancedTexture.addControl(controlRect);

    return advancedTexture;
}