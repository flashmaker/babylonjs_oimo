import { Vector3 } from "@babylonjs/core";

// multiplier for game
export const gateMultipliers: number[] = [3, 4, 5];

// gate size
export const gateSizes: Array<Vector3> = [
    new Vector3(0, 0, 0),
];

// gate's position
// TODO:: add gate's position z,y,x
export const gatePositions: Array<Vector3> = [
    //new Vector3(0, 4, -2),
    new Vector3(0, 1.75, 1.5),
    new Vector3(0, -1.25, -1.5),
    new Vector3(0, -1.25, 1.5)
];

// map of the gates
export const gatesMap: number[][] = [[0], [1,2]];