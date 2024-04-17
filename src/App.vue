<template>
    <div class="container" :style="{ ...backgroundImgConfig }">
        <video class="video" ref="videoDom" v-if="showVideo" muted autoplay loop />

        <RouterView />

        <StartPage v-if="showStartPage" />
    </div>
</template>

<script setup lang="ts">
import StartPage from "@/components/startPage/StartPage.vue";

import { RouterView } from "vue-router";
import useConfig from "./core/conf";
import { useTheme } from "./stores/theme";
import { useError } from "./stores/error";
import { nextTick, onMounted, reactive, ref, watch, type StyleValue } from "vue";
import { useCssVar } from "@vueuse/core";
import router from "./router";

const theme = useTheme();
const backgroundImgConfig: StyleValue = reactive({});

const showStartPage = ref(import.meta.env.MODE !== "development");

const showVideo = ref(false);
const videoUrl = ref("");
const videoDom = ref<HTMLVideoElement>();

const zoom = ref("auto");

onMounted(async () => {
    const config = await useConfig();
    console.log(config.fn.labor.data);

    useCssVar("--backdrop-filter-blur").value = config.style.blur;

    theme.setTheme(config.style.theme);

    zoom.value = config.style.zoom;

    if (config.style.backgroundVideo) {

        showVideo.value = true;
        videoUrl.value = config.style.backgroundVideoSrc;

        await nextTick();

        // 获取视频时长
        (videoDom.value as HTMLVideoElement).src = config.style.backgroundVideoSrc;
        (videoDom.value as HTMLVideoElement).onloadedmetadata = () => {

            console.log((videoDom.value as HTMLVideoElement).duration);

            // 每隔视频时长就从头播放，防止视频转码问题导致视频卡住
            // setInterval(() => {
            //     console.log((videoDom.value as HTMLVideoElement).currentTime);
            //     (videoDom.value as HTMLVideoElement).currentTime = 0;
            // }, (videoDom.value as HTMLVideoElement).duration * 1000);
        };


    } else if (config.style.background) {
        backgroundImgConfig.backgroundImage = `url(${config.style.background})`;
    }
});

const error = useError();
watch(() => error.error, () => {
    router.push("/error");
});

</script>

<style scoped>
.container {
    width: 100vw;
    height: 100vh;

    background-color: v-bind("theme.backgroundColor");
    background-repeat: no-repeat;
    background-size: 100% 100%;

    background-position: center center;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;

    color: v-bind("theme.fontColor");

    font-size: 1em;

    zoom: v-bind("zoom");
}

.footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 10px;
}

.video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* z-index: -1; */
}
</style>
