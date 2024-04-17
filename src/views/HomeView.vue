<template>
    <Transition name="fade" @after-enter="raw_opacity = 1" @before-leave="raw_opacity = 0">
        <div v-if="!optSchedule">
            <CardContainer padding="2em 3em" :style="{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -55%)',
        boxShadow: `0 0 ${backgroundFilter}em #0004`,
        opacity: backgroundFilter,
    }" :blur="backgroundFilter * 20 + 'px'">
                <TimeComponent />
                <div style="margin: 1em;"></div>
                <LaborComponent />
            </CardContainer>

        </div>
    </Transition>

    <RandomSelect :random="random" @selected="random = false" />

    <EditableSchedule :edit="optSchedule" />

    <FooterTemplate :navigator="[
        { name: '考试倒计时', callback: () => {
            axios.get('/open/timer')
            router.push('/timer');
        } },
        (optSchedule ? {
            name: '重置课程表', callback: () => schedule.init()
        } : {
            name: '随机选人', callback: () => random = true
        }),
        {
            name: optSchedule ? '结束编辑' : '编辑课程表',
            callback: () => optSchedule = !optSchedule
        }
    ]" />
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
    await schedule.init();

    if (schedule.data == undefined) {
        console.log("/error");
        useError().error = "SCHEDULE_DATA_UNDEFINED";
    }
})();
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