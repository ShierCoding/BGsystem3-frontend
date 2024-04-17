<!-- 随机选人 -->

<template>
    <div class="container" v-show="props.random">
        <KeepAlive>
            <CardContainer :style="{
        position: 'absolute',
        minWidth: '3em',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9997,
        boxShadow: `0 0 ${backgroundFilter}em #0004`,
        border: '1px solid ' + colorOpacity[2],
    }" padding="1em" :blur="backgroundFilter * 20 + 'px'" borderRadius="1em">
                <div :style="{ color: colorOpacity[0], textShadow: 'none' }">
                    <div class="selectedid">{{ selected.id }}</div>
                    <div>{{ selected.name }}</div>
                </div>
            </CardContainer>
        </KeepAlive>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRandom } from "@/core/random";
import useConfig from "@/core/conf";
import CardContainer from "./CardContainer.vue";
import { DefaultConfig, type StudentType } from "@/core/conf/type";

import colorUtils from "@/core/colorUtils";

const emits = defineEmits(["selected"]);

const props = defineProps<{
    random: boolean,
}>();


import { useTransition, TransitionPresets } from "@vueuse/core";
import { useTheme } from "@/stores/theme";

const theme = useTheme();

const raw_opacity = ref(0);
const backgroundFilter = useTransition(raw_opacity, {
    duration: 500,
    transition: TransitionPresets.easeInOutCubic,
});

const colorOpacity = computed(() => {
    const col1 = colorUtils.parseHexColor(theme.fontColor);
    const col2 = colorUtils.parseHexColor(theme.backgroundColor);
    return [
        `rgba(${col1.r}, ${col1.g}, ${col1.b}, ${backgroundFilter.value})`,
        `rgba(${col2.r}, ${col2.g}, ${col2.b}, ${backgroundFilter.value * 0.5})`,
        `rgba(${col1.r}, ${col1.g}, ${col1.b}, ${backgroundFilter.value * 0.2})`,
    ];
});


watch(() => props.random, async () => {
    if (props.random === true) {
        raw_opacity.value = 1;
        select().then(() => {
            raw_opacity.value = 0;
            emits("selected");
        });
    }
});

const selected = ref<StudentType>({
    name: "",
    id: "",
    val: 10,
});

let getRandom: () => StudentType = () => ({ name: "", id: "", val: 10 }),
    getRandom2: () => StudentType = () => ({ name: "", id: "", val: 10 });

let config = DefaultConfig();

(async () => {
    const _config = await useConfig();

    config = _config;

    getRandom = useRandom(config.fn.random.data);
    getRandom2 = useRandom(config.fn.random.data);

    selected.value = getRandom();

    console.log(getRandom());
})();

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const select = async () => {

    const intervalid = setInterval(() => {
        selected.value = getRandom2();
    }, 20);

    await sleep(config.fn.random.shuffleDuration);

    clearInterval(intervalid);

    await sleep(10);

    selected.value = getRandom();

    await sleep(config.fn.random.displayDuration - config.fn.random.shuffleDuration - 500);

    raw_opacity.value = 0;

    await sleep(500);
};

</script>

<style scoped>
.container {
    font-size: 2em;

    opacity: 1;
}

.selectedid {
    font-size: 2em;
}

.display {
    opacity: 1;
}
</style>@/core/ColorUtils