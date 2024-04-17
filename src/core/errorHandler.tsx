import type { JSX } from "vue/jsx-runtime";

export default {
    "SCHEDULE_DATA_UNDEFINED": () => (<div></div>),
    "CONFIG_DATA_EMPTY": () => (<div>
        配置文件为空，请检查配置文件是否正确后刷新页面
    </div>),
} as {
    [key: string]: () => JSX.Element,
};