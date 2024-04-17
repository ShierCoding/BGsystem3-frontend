import { defineStore } from "pinia";

export const useError = defineStore("error", {
    state() {
        return {
            error: undefined as string | undefined,
        };
    },
});
