<template>
    <Transition name="fade" @after-enter="raw_opacity = 1" @before-leave="raw_opacity = 0">
        <div v-if="!optSchedule">

            <template v-if="displayClock || displayLabor">
                <CardContainer padding="2em 3em" :style="{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -55%)',
                    boxShadow: `0 0 ${backgroundFilter}em #0004`,
                    opacity: backgroundFilter,
                }" :blur="backgroundFilter * 30 + 'px'">
                    <template v-if="displayClock">
                        <TimeComponent />
                    </template>
                    <template v-if="displayLabor">
                        <div style="margin: 1em;"></div>
                        <LaborComponent />
                    </template>
                </CardContainer>
            </template>
        </div>
    </Transition>

    <RandomSelect :random="random" @selected="random = false" />

    <template v-if="displaySchedule">
        <EditableSchedule :edit="optSchedule" />
    </template>

    <FooterTemplate :navigator="([
        (displayTimer ? {
            name: '考试倒计时', callback: () => {
                axios.get('/open/timer')
                router.push('/timer');
            }
        } : undefined),
        ...(optSchedule ? [{
            name: '重置课程表', callback: () => schedule.init()
        }, {
            name: '结束编辑',
            callback: () => optSchedule = false
        }] : [(displayRandom ? {
            name: '随机选人', callback: () => random = true
        } : undefined), (displaySchedule ? {
            name: '编辑课程表',
            callback: () => optSchedule = true
        } : undefined)]),
    ] as NavigatorType).filter(x => !isUndefined(x))" />
</template>

<script setup lang="ts">
import FooterTemplate from "@/components/FooterTemplate.vue";
import TimeComponent from "@/components/TimeComponent.vue";
import LaborComponent from "@/components/LaborComponent.vue";
import CardContainer from "@/components/CardContainer.vue";
import RandomSelect from "@/components/RandomSelect.vue";
import EditableSchedule from "@/components/EditableSchedule.vue";

import router from "@/router";
import { ref, watch } from "vue";

import { useTransition } from "@vueuse/core";
import { useSchedule } from "@/stores/schedule";
import { useError } from "@/stores/error";

import axios from "axios";
import conf from "@/core/conf";
import { isUndefined } from "lodash";

const displayLabor = ref(false);
const displaySchedule = ref(false);
const displayClock = ref(false);
const displayRandom = ref(false);
const displayTimer = ref(false);
const displayCountdown = ref(false);

const schedule = useSchedule();

const raw_opacity = ref(1);
const backgroundFilter = useTransition(raw_opacity, {
    duration: 500,
});

const random = ref(false);
const optSchedule = ref(false);

watch(random, () => {
    console.log(random.value);
});


(async () => {
    const config = await conf();
    displayLabor.value = config.fn.use.indexOf("labor") !== -1;
    displaySchedule.value = config.fn.use.indexOf("schedule") !== -1;
    displayClock.value = config.fn.use.indexOf("clock") !== -1;
    displayRandom.value = config.fn.use.indexOf("random") !== -1;
    displayTimer.value = config.fn.use.indexOf("timer") !== -1;
    displayCountdown.value = config.fn.use.indexOf("countdown") !== -1;


    if (displaySchedule.value) {
        await schedule.init();
        if (schedule.data == undefined) {
            console.log("/error");
            useError().setError("SCHEDULE_DATA_UNDEFINED");
        }
    }
})();

type NavigatorType = {
    name: string;
    callback: () => void;
}[];
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>