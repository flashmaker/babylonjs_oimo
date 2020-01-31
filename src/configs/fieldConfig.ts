import { TRANSPARENT_MATERIAL } from "../configs/constants";
// parameters for field's boxes: height, width, depth, x, y, z
export const boxesParams: [number, number, number, number, number, number, string?][] = [
    // h,w,d,x,y,z
    [10, 0.5, 1, -2.75, 0, 0],
    [10, 0.5, 1, 2.75, 0, 0],
    [0.5, 5, 1, 0, -4.75, 0],
    [0.5, 5, 1, 0, 4.75, 0],
    [0.5, 3.5, 1, -0.75, 1.75, 0],
    [0.5, 0.5, 1, 2.25, 1.75, 0],
    [0.5, 0.5, 1, -2.25, -1.25, 0],
    [0.5, 2, 1, 0, -1.25, 0],
    [0.5, 0.5, 1, 2.25, -1.25, 0],
    [10, 6, 1, 0, 0, -0.75, TRANSPARENT_MATERIAL],
    [10, 6, 1, 0, 0, 0.75, TRANSPARENT_MATERIAL]
];

// TODO: add arc parameters