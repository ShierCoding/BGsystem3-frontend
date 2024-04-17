<template>
    <div>
        <table>
            <tbody>
                <template v-for="(item, index) in labor.data" :key="index">
                    <tr>
                        <td class="type" :class="{'important': item.important}">{{ item.name }}：</td>
                        <td class="people" :class="{'important': item.important}">{{ item.people[day.day] }}</td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import useConfig from "@/core/conf";
import { reactive } from "vue";

import { useDay } from "@/stores/day";

const labor = reactive({
    data: [] as {
        name: string,
        people: string[],
        important?: boolean,
    }[],
});

const day = useDay();

(async () => {
    const config = await useConfig();

    labor.data = config.fn.labor.data;
})();
</script>

<style scoped>
table {
    font-size: 1.5em;
    margin: auto;
    /* width: 100%; */
    border-collapse: collapse;
}

tr {
    line-height: 1.6em;
}

.type {
    text-align: right;
    padding-right: .5em;
    opacity: 0.6;
}

.people {
    text-align: center;
    opacity: 0.6;
}

.important {
    opacity: 1;
}
</style>