import type { StudentType } from "../conf/type";
import optimize from "./optimize";
import _ from "lodash";


/**
 * 从给定的学生数据中随机选择一个学生。
 * @param data_raw 学生数据数组
 * @returns 返回一个函数，每次调用该函数都会返回一个随机选择的学生对象
 */
export const useRandom = (data_raw: StudentType[]) => {
    const data = optimize(_.cloneDeep(data_raw));

    console.log(data);

    const rawIndex = Array.from({ length: data.length }, (_, i) => i);
    const randomIndex = _.shuffle(rawIndex).slice(0, Math.floor(rawIndex.length / 3 * 2));

    return () => {
        let tempIndex = rawIndex[_.random(0, rawIndex.length - 1)];
        while (randomIndex.indexOf(tempIndex) !== -1) {
            tempIndex = rawIndex[_.random(0, rawIndex.length - 1)];
        }

        randomIndex.push(tempIndex);

        const temp = data[randomIndex.shift() as number];
        return temp;
    };
};