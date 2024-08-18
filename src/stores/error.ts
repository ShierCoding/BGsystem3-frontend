import { isUndefined } from "lodash";
import { defineStore } from "pinia";

export const useError = defineStore("error", {
    state() {
        return {
            error: undefined as string | undefined,
        };
    },
    actions: {
        setError(error: string) {
            if (isUndefined(this.error))
                this.error = error;
        },
    },
});
