<!-- 课程表 -->

<template>
    <div class="main">
        <ScheduleComponent :right="!props.edit" ref="scheduleComponent" />
        <Transition name="fade">
            <div v-if="props.edit" class="center">
                <div :style="{
            position: 'absolute',
            right: left,
            top: '50px',
            transition: 'right .8s ease-in-out',
        }">
                    <div style="display: flex; width: max-content; gap: .5em;">
                        <div v-for="(option1, index1) in options" :key="index1"
                            style="display: flex; gap: .5em; flex-direction: column;">
                            <div v-for="(option, index) in option1" :key="index" style="margin: 0 auto;"
                                @click="setSelected(index1, index)">
                                <CardContainer :style="{
            padding: '.4em', borderRadius: '.5em', width: 'max-content', cursor: 'pointer',
            transition: 'background-color .3s, width .5s, color 0.7s',
            backgroundColor: (schedule.selected.x == index1 && schedule.selected.y == index) ? colorUtils.hexAddOpacity(theme.fontColor, 0.3) : colorUtils.hexAddOpacity(theme.fontColor, 0),
        }">
                                    {{ option }}
                                </CardContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, watch } from "vue";
import CardContainer from "./CardContainer.vue";
import ScheduleComponent from "./ScheduleComponent.vue";
import useConfig from "@/core/conf";
import { cloneDeep } from "lodash";
import { useTheme } from "@/stores/theme";
import colorUtils from "@/core/colorUtils";
import { useSchedule } from "@/stores/schedule";
import { sleep } from "@/core/utils";

const theme = useTheme();

const schedule = useSchedule();

const props = defineProps<{
    edit: boolean
}>();

const options: string[][] = reactive([]);

const scheduleComponent = ref();

const left = ref("");

// const selected: { x: number, y: number } = reactive({ x: -1, y: -1 });

// watch(selected, () => {
//     console.log(selected);
// });

onMounted(async () => {
    const config = await useConfig();

    const opts = cloneDeep(config.fn.schedule.scheduleOptions).reverse();
    options.push(...opts);

    // console.log(scheduleComponent.value.container.main);
});

const changeLeft = async () => {
    await sleep(100);
    const rect = (scheduleComponent.value.container.main as HTMLDivElement).getBoundingClientRect();
    left.value = (rect.width + 90) + "px";
    // console.log(rect, left.value);
};

watch(() => schedule.selected.text, changeLeft);

watch(() => props.edit, () => {
    setTimeout(() => {
        changeLeft();
    }, 400);
});


onMounted(() => {
    window.addEventListener("click", changeLeft);
});

onUnmounted(() => {
    window.removeEventListener("click", changeLeft);
});


const setSelected = (i1: number, i2: number) => {
    const onSelect = schedule.selected.x == i1 && schedule.selected.y == i2;
    schedule.selected.x = (onSelect ? -1 : i1);
    schedule.selected.y = (onSelect ? -1 : i2);
    schedule.selected.text = options[schedule.selected.x][schedule.selected.y] || undefined;
};
</script>

<style scoped>
.center {
    /* position: absolute; */
    top: 50px;
    text-align: center;
}

.main {
    font-size: x-large;
}


.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>