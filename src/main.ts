import { TriangleUtils } from "./drongo/math/TriangleUtils";
import { Vector3D } from "./drongo/math/Vector3D";




let a: Vector3D = new Vector3D(0, 0, 0);
let b: Vector3D = new Vector3D(0, 100, 0);
let c: Vector3D = new Vector3D(100, 0, 0);

let p: Vector3D = new Vector3D(1, 1, 0);


let time: number = new Date().getTime();
for (let index = 0; index < 100000; index++) {
    TriangleUtils.inside(p, a, b, c);
}
console.log("同向法:", new Date().getTime() - time);

time = new Date().getTime();
for (let index = 0; index < 100000; index++) {
    TriangleUtils.inside2(a, b, c, p);
}
console.log("重心法:", new Date().getTime() - time);
