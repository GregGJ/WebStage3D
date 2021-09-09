
export default class MathUtils {

    /**
     * 小于此值的所有绝对值都被认为等于零
     */
    static readonly zeroTolerance: number = 1e-6;

    /**度到弧度的换算系数*/
    static readonly degreeToRadFactor: number = Math.PI / 180;

    /**弧度到度的换算系数*/
    static readonly radToDegreeFactor: number = 180 / Math.PI;
    
    /**
     * 检测是否相等(误差1e-6)
     * @param a
     * @param b
     * @returns true 相等 false不相等
     */
    static equals(a: number, b: number): boolean {
        return Math.abs(a - b) <= MathUtils.zeroTolerance;
    }

    /**
     * 判断是否时2的幂
     * @param v
     * @returns 
     */
    static isPowerOf2(v: number): boolean {
        return (v & (v - 1)) === 0;
    }
}