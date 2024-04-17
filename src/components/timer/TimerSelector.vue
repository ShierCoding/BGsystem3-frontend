<template>
    <div style="width: 10em; margin: 0;">
        <VueDatePicker time-picker v-bind="{ [theme.theme]: true }" v-model="time" teleport-center />
    </div>
</template>

<script setup lang="ts">
import { useTheme } from "@/stores/theme";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";

const theme = useTheme();

const now = new Date(+new Date() + 1000 * 60 * 60);

const time = ref({
    hours: now.getHours(),
    minutes: Math.floor((now.getMinutes() + 10) / 10) * 10,
    seconds: 0
});

defineExpose({
    time
});
</script>

<style scoped>
.btn {
    display: inline-block;
    padding: 0.7em 1em;
    background-color: #fff1;
    backdrop-filter: blur(1em);
    border: 1px solid #fff4;
    color: #fff;
    border-radius: 1em;
    cursor: pointer;
    transition: .5s;

    font-size: 1.2em;
}

.btn:active {
    background-color: #fff4;
}
</style>