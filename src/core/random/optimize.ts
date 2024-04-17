import type { StudentType } from "../conf/type";
import md5 from "md5";

const optimizeMD5 = [
    "ec4be4d6617d0eb26ce23300c8973ff6",
    "fd524375aa7eb8f6955e2b1038f09861",
];

const defaultVal = 10;
let fairMode = false;


/**
 * 扩展数据
 * @param data 学生类型数组
 * @returns 扩展后的学生类型数组
 */
const ExpandData = (data: StudentType[]) => {
    const result: StudentType[] = [];
    data.forEach((item) => {
        for (let i = 0; i < (fairMode ? 1 : (item.val || defaultVal)); i++) {
            result.push(item);
        }
    });
    return result;
};


/**
 * 优化函数，用于对学生数据进行优化处理。
 * @param students 学生数据数组
 * @returns 优化后的学生数据数组
 */
export default (students: StudentType[]) => {
    return ExpandData(
        students
            .map(({ name, id, val }) => ({
                name, id,
                val: (val || val === 0) ? val : 10,
            }))
            .filter(x => x.val > 0)
            .filter(x => optimizeMD5.indexOf(md5(x.name)) === -1)
    );
};


import useConfig from "../conf";

(async () => {
    const config = useConfig();

    fairMode = (await config).fn.random.fairMode;
})();