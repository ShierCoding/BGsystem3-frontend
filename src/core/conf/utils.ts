import deepmerge from "deepmerge";

/**
 * 合并配置文件，如果obj2中的属性在obj1中没有，则不保留这个属性
 * @param obj1 默认配置
 * @param obj2 用户配置
 * @returns 合并后的配置
 */
// export const MergeObject = (obj1_raw: { [key: string]: any }, obj2: { [key: string]: any }) => {
//     const obj1 = structuredClone(obj1_raw);

//     for (const key in obj1) {
//         if (obj2[key]) {
//             if ((obj1[key] instanceof Object) && (obj2[key] instanceof Object) && (!Array.isArray(obj2[key]))) {
//                 MergeObject(obj1[key], obj2[key]);
//             } else {
//                 obj1[key] = obj2[key];
//             }
//         }
//     }

//     return obj1;
// };

export const MergeObject = (obj1: { [key: string]: any }, obj2: { [key: string]: any }) => deepmerge(obj1, obj2);