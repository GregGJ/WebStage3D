import { Vector3D } from "./Vector3D";



export class TriangleUtils {

    static tmp_Vec3_0: Vector3D = new Vector3D();
    static tmp_Vec3_1: Vector3D = new Vector3D();
    static tmp_Vec3_2: Vector3D = new Vector3D();


    /**
     * 判断一个点是否在某个三角行内部(同向法)
     * @param point 
     * @param a 
     * @param b 
     * @param c 
     * @returns 
     */
    static inside(point: Vector3D, a: Vector3D, b: Vector3D, c: Vector3D): boolean {
        let ab: boolean = this.isRight(a, b, point);
        return ab == this.isRight(b, c, point) && ab == this.isRight(c, a, point);
    }

    /**
     * 使用右手定则来判断ac是否在ab的左侧
     * @param a 
     * @param b 
     * @param c 
     * @returns 
     */
    static isRight(a: Vector3D, b: Vector3D, c: Vector3D): boolean {
        let ab: Vector3D = this.tmp_Vec3_0;
        ab.x = b.x - a.x;
        ab.y = b.y - a.y;
        ab.z = b.z - a.z;

        let ac: Vector3D = this.tmp_Vec3_1;
        ac.x = c.x - a.x;
        ac.y = c.y - a.y;
        ac.z = c.z - a.z;

        let cross: Vector3D = this.tmp_Vec3_2;
        Vector3D.cross(ab, ac, cross);
        if (cross.z > 0) {
            return true;
        }
        return false;
    }

    /**
     * 判断点是否在三角形内(重心法)
     * @param point 
     * @param a 
     * @param b 
     * @param c 
     * @returns 
     */
    static inside2( point: Vector3D,a: Vector3D, b: Vector3D, c: Vector3D): boolean {
        let v0: Vector3D = Vector3D.subtract(c, a, this.tmp_Vec3_0);
        let v1: Vector3D = Vector3D.subtract(b, a, this.tmp_Vec3_1);
        let v2: Vector3D = Vector3D.subtract(point, a, this.tmp_Vec3_2);

        let dot00 = Vector3D.dot(v0, v0);
        let dot01 = Vector3D.dot(v0, v1);
        let dot02 = Vector3D.dot(v0, v2);
        let dot11 = Vector3D.dot(v1, v1);
        let dot12 = Vector3D.dot(v1, v2);

        let inverDeno = 1 / (dot00 * dot11 - dot01 * dot01);

        let u = (dot11 * dot02 - dot01 * dot12) * inverDeno;
        if (u < 0 || u > 1) // 如果超出范围，直接返回
        {
            return false;
        }

        let v = (dot00 * dot12 - dot01 * dot02) * inverDeno;
        if (v < 0 || v > 1) // 如果v超出范围，直接返回
        {
            return false;
        }
        return u + v <= 1;
    }
}