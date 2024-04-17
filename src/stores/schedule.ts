import { defineStore } from "pinia";
import useConfig from "@/core/conf";
import { useDay } from "./day";
import { cloneDeep } from "lodash";

export const useSchedule = defineStore("schedule", {
    state() {
        return {
            data: [] as string[],
            selected: {
                x: -1 as number,
                y: -1 as number,
                text: undefined as string | undefined
            }
        };
    },
    actions: {
        async init() {
            const config = await useConfig();
            const day = useDay();

            this.data = cloneDeep(config.fn.schedule.data[day.day]);
        }
    }
});



(async () => {
    const config = await useConfig();
    const day = useDay();

    const schedule = useSchedule();
    
    schedule.data = cloneDeep(config.fn.schedule.data[day.day]);
})();