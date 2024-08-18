<template>
    <div>
        <CardContainer padding="2em 2em" blur="1rem" :style="{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
        }">
            <div class="container" style="width: max-content; font-size: 2em;">
                BGsystem捕获了一个数据缺失错误
            </div>
            <div class="container" style="min-width: max-content; font-size: 1.5em;">
                错误代码：<code>{{ error.error }}</code>
            </div>
            <template v-if="error.error == 'SCHEDULE_DATA_UNDEFINED'">
                <div class="container" style="min-width: max-content; font-size: 1.5em; margin-bottom: 1em;">
                    请选择需要代替的数据所对应的日期
                </div>
                <div class="row">
                    <template v-for="(item, index) in data" :key="index">
                        <div style="width: max-content;">
                            <TimerButton @click="day.day = index; error.error = undefined; router.push('/')">{{ item }}
                            </TimerButton>
                        </div>
                    </template>
                </div>
            </template>
            <component :is="error.error == undefined ? null :  ErrorHandler[error.error]"></component>
        </CardContainer>
    </div>
</template>

<script setup lang="ts">
import CardContainer from "@/components/CardContainer.vue";
import TimerButton from "@/components/timer/TimerButton.vue";
import { useDay } from "@/stores/day";
import router from "@/router";
import { useError } from "@/stores/error";
import { watch } from "vue";
import ErrorHandler from "@/core/errorHandler";

const data = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

const day = useDay();

const error = useError();

const catchError = () => {
    if (error.error == undefined) router.push("/");
};

catchError();
watch(() => error.error, catchError);

</script>

<style scoped>
.container {
    margin-bottom: .3em;
    /* text-shadow: 0 0 1px #0005; */
}

.row {
    display: flex;
    justify-content: center;
    gap: .5em;
}
</style>