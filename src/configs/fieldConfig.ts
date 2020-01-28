// parameters for field's boxes: height, width, depth, x, y, z
export const boxesParams: [number,number,number,number,number,number, string?][] = [
// h,d,w,z,y,x
    [10, 1, 0.5, 0, 0, -2.75],
    [10, 1, 0.5, 0, 0, 2.75],
    [0.5, 1, 5, 0, -4.75, 0],
    [0.5, 1, 5, 0, 4.75, 0],
    [0.5, 1, 3.5, 0, 1.75, -0.75],
    [0.5, 1, 0.5, 0, 1.75, 2.25],
    [0.5, 1, 0.5, 0, -1.25, -2.25],
    [0.5, 1, 2, 0, -1.25, 0],
    [0.5, 1, 0.5, 0, -1.25, 2.25],
    [10, 2, 6, -1.5, 0, 0, 'transparentMaterial'],
    [10, 2, 6, 1.5, 0, 0, 'transparentMaterial']
];

// TODO: add arc parameters