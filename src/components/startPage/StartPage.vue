<template>
    <div class="container" v-if="show" :style="{
        opacity: opacity
    }">
        <div class="main">

            <div class="row">

                <div style="width: 100px; height: 100px; transform: translateX(-50px);">
                    <template v-for="(color, index) in colors" :key="index">
                        <SectorComponent :zoom="10" :color="color" :spin="index * angle - 1" :angle="angle + 2" />
                    </template>
                    <div class="ball"></div>
                </div>

                <div style="" class="text">
                    BGsystem3
                    <div class="info">
                        上海市第二中学编程社
                    </div>
                    <div class="info2" style="font-size: 0.3em;">
                        version: {{ version }}
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import SectorComponent from "./SectorComponent.vue";
import { onMounted, ref } from "vue";
import { useTransition, TransitionPresets } from "@vueuse/core";
import { sleep } from "@/core/utils";
import useConfig from "@/core/conf";

const showTime = ref(2000);

const colors = [
    "#e10004",
    "#95005d",
    "#1216bb",
    "#05816e",
    "#2bc820",
    "#63b50e",
    "#dcac00",
    "#fa8502",
    "#f72c03",
];

const raw_angle = ref(0);

const angle = useTransition(raw_angle, {
    duration: 1500,
    transition: TransitionPresets.easeInOutCubic,
});

const raw_opacity = ref(1);

const opacity = useTransition(raw_opacity, {
    duration: 800,
});

const show = ref(true);

const ballColor = ref("#0000");

(async () => {
    const config = await useConfig();

    ballColor.value = config.style.theme == "dark" ? "#000" : "#fff";
})();

onMounted(async () => {
    raw_angle.value = 360 / colors.length;

    await sleep(showTime.value);

    raw_angle.value = 0;

    await sleep(400);

    raw_opacity.value = 0;

    await sleep(800);

    show.value = false;
});

const version = __APP_VERSION__;

</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    background-color: #000;
    z-index: 9999;
    position: absolute;
}

.main {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

.row {
    text-align: center;

    display: flex;
    align-items: center;

    gap: 1em;
}

/* 白圆 */
.ball {
    width: 100px;
    height: 100px;
    background-color: v-bind("ballColor");
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateY(-50%) scale(0.7);
    z-index: 9999;
    /* box-shadow: 0 0 1em #000; */
}

.text {
    font-size: 4em;
    font-weight: bold;
    animation: ease-in-out v-bind("(showTime / 1000 + 1.5) + 's'") both slidein;
}

.info {
    font-size: 0.5em;
    animation: ease-in-out v-bind("(showTime / 1000 + 1.5) + 's'") both slidein2;
}

.info2 {
    font-size: 0.5em;
    animation: ease-in-out v-bind("(showTime / 1000 + 1.5) + 's'") both slidein3;
}

@keyframes slidein {
    0% {
        transform: translateX(-50%);
        opacity: 0;
    }

    45% {
        transform: none;
        opacity: 1;
    }

    55% {
        transform: none;
        opacity: 1;
    }

    100% {
        transform: translateX(50%);
        opacity: 0;
    }
}

@keyframes slidein2 {
    0% {
        transform: translateX(-35%);
        opacity: 0;
    }

    45% {
        transform: none;
        opacity: 1;
    }

    55% {
        transform: none;
        opacity: 1;
    }

    100% {
        transform: translateX(35%);
        opacity: 0;
    }
}

@keyframes slidein3 {
    0% {
        transform: translateX(-50%);
        opacity: 0;
    }

    45% {
        transform: none;
        opacity: 1;
    }

    55% {
        transform: none;
        opacity: 1;
    }

    100% {
        transform: translateX(50%);
        opacity: 0;
    }
}
</style>