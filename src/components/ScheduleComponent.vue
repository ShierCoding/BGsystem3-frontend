<!-- 课程表 -->

<template>
    <div class="container">
        <CardContainer ref="container" :style="props.right ? {
            right: '15px',
            top: '15px',
            ...defaultCss
        } : {
            right: '50px',
            top: '50px',
            ...defaultCss
        }">
            <div class="item-container">
                <template v-for="(item, index) in schedule.data" :key="index">
                    <div v-if="transitionPresets == 0" class="item" :style="{
            transition: 'bold .5s ease-in-out',
            fontWeight: during[index] ? 'bold' : 'normal',
            opacity: during.every(x => !x) ? '1' : (during[index] ? '1' : '0.7'),
        }">{{ item }}</div>
                    <div v-else style="width: max-content; margin: 0 auto;">
                        <CardContainer :style="{
            padding: (transitionPresets / 2) + 'em',
            borderRadius: '.7em',
        }" @click="setSelected(index)">{{ item }}</CardContainer>
                    </div>
                </template>
            </div>
        </CardContainer>
    </div>
</template>

<script setup lang="ts">
import CardContainer from "./CardContainer.vue";
import { useSchedule } from "@/stores/schedule";

import { useTransition, TransitionPresets } from "@vueuse/core";

import { ref, watch, type StyleValue, reactive } from "vue";

import useConfig from "@/core/conf";
import { parseTime } from "@/core/utils";

const schedule = useSchedule();

const props = defineProps<{
    right: boolean
}>();

const defaultCss: StyleValue = {
    position: "absolute",
    borderRadius: "1em",
    padding: ".9em",
    transition: "all .5s ease-in-out, border 0",
};

const container = ref();

const setSelected = (index: number) => {
    if (schedule.selected.text) {
        schedule.data[index] = schedule.selected.text;
        schedule.selected.text = undefined;
        schedule.selected.x = -1;
        schedule.selected.y = -1;
    }
};

const transition = ref(0);
const transitionPresets = useTransition(transition, {
    duration: 500,
    transition: TransitionPresets.easeInOutCubic,
});

watch(() => props.right, () => {
    if (props.right) {
        transition.value = 0;
    } else {
        transition.value = 1;
    }

});

const scheduleTime: [Date, Date][] = reactive([]);
const during: boolean[] = reactive([]);

(async () => {
    const config = await useConfig();

    scheduleTime.push(...config.fn.schedule.time.map(
        (time) => [parseTime(time[0]), parseTime(time[1])] as [Date, Date]
    ));

    console.log(schedule.data, scheduleTime, config.fn.schedule.time);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (let _ in scheduleTime) {
        during.push(false);
    }

    const refresh = () => {
        const now = new Date();
        for (let i = 0; i < scheduleTime.length; i++) {
            const [start, end] = scheduleTime[i];
            if (now >= start && now <= end) during[i] = true;
            else during[i] = false;
        }
    };

    setInterval(refresh, 5000);
    refresh();

})();

defineExpose({
    container: container,
});

</script>

<style scoped>
.item-container {
    display: flex;
    flex-direction: column;
    gap: .5em;
    font-size: 1.1em;
}
</style>