import MathUtils from "./MathUtils";


export class Vector3D {

    x: number = 0;
    y: number = 0;
    z: number = 0;

    constructor(x?: number, y?: number, z?: number) {
        if (this.x != undefined) {
            this.x = x!;
        }
        if (this.y != undefined) {
            this.y = y!;
        }
        if (this.z != undefined) {
            this.z = z!;
        }
    }

    /**
     * 设置值
     * @param x 
     * @param y 
     * @param z 
     */
    setValue(x: number, y?: number, z?: number): void {
        this.x = x;
        if (this.y != undefined) {
            this.y = y!;
        }
        if (this.z != undefined) {
            this.z = z!;
        }
    }

    /**
     * 向量的长度
     */
    get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    /**
     * 向量长度的平方
     */
    get lengthSquared(): number {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    /**
     * 向量归一化
     * @returns 改变并返回自身
     */
    normalizeSelf(): Vector3D {
        return Vector3D.normalize(this, this);
    }

    /**
     * 向量取反
     * @returns 改变并返回自身
     */
    negateSelf(): Vector3D {
        return Vector3D.negate(this, this);
    }

    /**
     * 向量加法
     * @param b 
     * @returns  改变并返回自身
     */
    add(b: Vector3D): Vector3D {
        return Vector3D.add(this, b, this);
    }

    /**
     * 向量减法
     * @param b 
     * @returns  改变并返回自身
     */
    subtract(b: Vector3D): Vector3D {
        return Vector3D.subtract(this, b, this);
    }

    /**
     * 向量与标量的乘法(缩放向量)
     * @param k 
     * @returns  改变并返回自身
     */
    scale(k: number): Vector3D {
        return Vector3D.scale(k, this, this);
    }

    /**
     * 克隆
     * @returns 
     */
    clone(): Vector3D {
        return new Vector3D(this.x, this.y, this.z);
    }

    /**
     * 复制
     * @param out 
     * @returns 
     */
    copyTo(out: Vector3D): Vector3D {
        out.x = this.x;
        out.y = this.y;
        out.z = this.z;
        return out;
    }

    //==========================================================static==============================================================//
    //==========================================================static==============================================================//
    //==========================================================static==============================================================//

    /**
     * 求两个点的欧式距离
     * @param a 
     * @param b 
     */
    static distance(a: Vector3D, b: Vector3D): number {
        const x: number = b.x - a.x;
        const y: number = b.y - a.y;
        const z: number = b.z - a.z;
        return Math.sqrt(x * x + y * y + z * z);
    }

    /**
     * 求两个点之间的欧式距离二次方
     * @param a 
     * @param b 
     * @returns 
     */
    static distanceSquared(a: Vector3D, b: Vector3D): number {
        const x: number = b.x - a.x;
        const y: number = b.y - a.y;
        const z: number = b.z - a.z;
        return x * x + y * y + z * z;
    }

    /**
     * 向量归一化
     * @param value 
     * @param out 
     * @returns         out为null时返回一个新的Vector3D对象，否则使用传入
     */
    static normalize(value: Vector3D, out?: Vector3D): Vector3D {
        if (!out) {
            out = new Vector3D();
        }
        const { x, y, z } = value;
        let len: number = Math.sqrt(x * x + y * y + z * z);
        if (len > 0) {
            len = 1.0 / len;
            out.x = x * len;
            out.y = y * len;
            out.z = z * len;
        }
        return out;
    }


    /**
     * 向量取反并返回
     * @param a 
     * @param out 
     * @returns 
     */
    static negate(a: Vector3D, out: Vector3D): Vector3D {
        out.x = -a.x;
        out.y = -a.y;
        out.z = -a.z;
        return out;
    }

    /**
     * 向量加法
     * @param a 
     * @param b 
     * @param out 
     * @returns 
     */
    static add(a: Vector3D, b: Vector3D, out: Vector3D): Vector3D {
        out.x = a.x + b.x;
        out.y = a.y + b.y;
        out.z = a.z + b.z;
        return out;
    }

    /**
     * 向量减法
     * @param a 
     * @param b 
     * @param out 
     * @returns 
     */
    static subtract(a: Vector3D, b: Vector3D, out?: Vector3D): Vector3D {
        if (out === undefined) {
            out = new Vector3D();
        }
        out.x = a.x - b.x;
        out.y = a.y - b.y;
        out.z = a.z - b.z;
        return out;
    }

    /**
     * 向量与标量的乘法
     * @param k 
     * @param value 
     * @param out 
     * @returns 
     */
    static scale(k: number, value: Vector3D, out?: Vector3D): Vector3D {
        if (out === undefined) {
            out = new Vector3D();
        }
        out.x = value.x * k;
        out.y = value.y * k;
        out.z = value.z * k;
        return out;
    }

    /**
     * 向量点乘dot(a,b)=|a||b|*cos(angle)
     * @param a 
     * @param b 
     * @returns 0 互相垂直 >0 向量夹角小于90度  <0 向量夹角大于90度 
     */
    static dot(a: Vector3D, b: Vector3D): number {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    /**
     * 求两个向量之间的夹角 cos(a,b)=dot(a,b)/|a||b|
     * @param a
     * @param b 
     */
    static angle(a: Vector3D, b: Vector3D): number {
        return Math.acos(Vector3D.dot(a, b) / (a.length * b.length));
    }

    /**
     * 求两个单位向量之间的夹角 cos(a,b)=dot(a,b)/|a||b| 因为a,b 是单位向量，所以分母必为1，而任何数除1等于他本身。
     * @param a
     * @param b 
     */
    static angleFast(a:Vector3D,b:Vector3D):number{
        return Math.acos(Vector3D.dot(a,b));
    }

    /**
     * 求A向量在B向量上的投影长度,
     * 假设C为A在B上的投影向量,
     * 那么|C|=|A|cos(A,B),而cos(A,B)=dot(A,B)/|A||B|,
     * 所以|C|=dot(A,B)/|B|,C=B的单位向量乘以|C|
     * @param a 
     * @param b 
     */
    static projection(a: Vector3D, b: Vector3D): number {
        let len:number=b.length;
        if(MathUtils.equals(len,0)){
            console.error("无法投影到零向量上！");
            return 0;
        }
        return this.dot(a, b) / b.length;
    }
    
    /**
     * 向量叉乘(求垂直于ab的向量)
     * @param a 
     * @param b 
     * @param out 
     */
    static cross(a: Vector3D, b: Vector3D, out?: Vector3D): Vector3D {
        if (out === undefined) {
            out = new Vector3D();
        }
        const ax: number = a.x;
        const ay: number = a.y;
        const az: number = a.z;

        const bx: number = b.x;
        const by: number = b.y;
        const bz: number = b.z;

        out.x = ay * bz - az * by;
        out.y = az * bx - ax * bz;
        out.z = ax * by - ay * bx;
        return out;
    }
}