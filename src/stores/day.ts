import { defineStore } from "pinia";

export const useDay = defineStore("day", {
    state() {
        return {
            day: (new Date().getDay()) == 0 ? 6 : (new Date().getDay() - 1),
        };
    },
});
