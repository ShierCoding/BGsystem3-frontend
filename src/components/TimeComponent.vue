<template>
    <div>
        <div class="time">{{ currentTime.format(timeFormatter) }}</div>
        <div style="margin: -0.2em;"></div>
        <div class="date">{{ localize(currentTime.format(dateFormatter)) }}</div>
        <template v-if="showCountdown">
            <div class="countdown" ref="CountdownRef" :style="{
            opacity: realOpacity,
            minWidth: CountdownRefWidth + 'px',
        }">
                <div style="margin: .3em;"></div>
                距离{{ countdown.name }}还有{{ ((countdown.time - currentTime.unix()) / (60 * 60 * 24)).toFixed(1) }}天
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref } from "vue";
import useConfig from "@/core/conf";

import { useTransition, TransitionPresets } from "@vueuse/core";

import day from "dayjs";
import { sleep } from "@/core/utils";

const timeFormatter = ref("HH:mm:ss");
const currentTime = ref(day());

const dateFormatter = ref("MM月DD日");

const showCountdown = ref(false);
const countdown = reactive({
    name: "",
    time: 0,
});

const opacity = ref(0);
const realOpacity = useTransition(opacity, {
    duration: 500,
    transition: TransitionPresets.easeInOutCubic,
});

const CountdownRef = ref<HTMLDivElement>();
const CountdownRefWidth = ref(0);

(async () => {
    const config = await useConfig();

    timeFormatter.value = config.fn.clock.format;
    dateFormatter.value = config.fn.clock.dateFormat;

    showCountdown.value = (config.fn.use.indexOf("countdown") !== -1);

    setInterval(() => {
        currentTime.value = day();
    }, config.fn.clock.refreshRate);

    if (showCountdown.value === true) {
        setTimeout(async () => {

            const data = config.fn.countdown.data
                .filter(x => x.time > currentTime.value.unix());

            if (data.length == 0) {
                showCountdown.value = false;
                return;
            }

            let countdownIndex = 0;

            const NextCountdown = (opt: boolean = true) => {
                if (opt) opacity.value = 1;
                countdownIndex = (countdownIndex + 1) % data.length;
                countdown.name = data[countdownIndex].name;
                countdown.time = data[countdownIndex].time;

                if (CountdownRef.value)
                    CountdownRefWidth.value = Math.max(CountdownRefWidth.value, CountdownRef.value?.clientWidth);
            };

            for (const _i in data) {
                console.log(_i);
                NextCountdown(false);
                await nextTick();
            }

            NextCountdown();

            setInterval(async () => {
                opacity.value = 0;
                await sleep(500);
                NextCountdown();
            }, config.fn.countdown.interval);

        }, 0);
    }

})();

const localize = (raw: string) => (
    raw
        .replace("Sunday", "星期天")
        .replace("Monday", "星期一")
        .replace("Tuesday", "星期二")
        .replace("Wednesday", "星期三")
        .replace("Thursday", "星期四")
        .replace("Friday", "星期五")
        .replace("Saturday", "星期六")
);

</script>

<style scoped>
.time {
    font-size: 4.5em;
    /* font-weight: bold; */
}

.date {
    font-size: 2.2em;
}

.countdown {
    font-size: 2.2em;
}
</style>