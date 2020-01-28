import { Vector3 } from "@babylonjs/core";

// multiplier for game
export const gateMultipliers: number[] = [3, 4, 5, 6];

// gate's position
// TODO:: add gate's position z,y,x
export const gatePositions: Array<Vector3> = [
    new Vector3(0, 1.75, 1.5),
    new Vector3(0, -1.25, -1.5),
    new Vector3(0, -1.25, 1.5)
]; 