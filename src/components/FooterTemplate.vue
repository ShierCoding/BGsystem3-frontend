<template>
    <div class="footer" :style="{ bottom: footerBottom }">
        <div class="na">
            <template v-for="(item, index) in props.navigator" :key="index">
                <div @click="item.callback">{{ item.name }}</div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import useConfig from "@/core/conf";
import { ref } from "vue";
import { useTheme } from "@/stores/theme";

const theme = useTheme();

const props = defineProps<{
    navigator: {
        name: string;
        callback: () => void;
    }[];
}>();

const footerBottom = ref("0");

(async () => {
    const config = await useConfig();

    footerBottom.value = config.style.footerBottom;
})();

</script>

<style scoped>
.footer {
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 0;
}

.na {
    display: flex;
}

.na>* {
    font-size: 1em;
    margin: 1em;
    cursor: pointer;
    padding: .5em .7em;
    border-radius: 10em;

    /* font-weight: bold; */
    border: 1px solid v-bind("theme.fontColor + '4'");

    
    box-shadow: 0 0 1em #0004;

    transition: background-color .5s, width .5s;

    backdrop-filter: blur(var(--backdrop-filter-blur));
    -webkit-backdrop-filter: blur(var(--backdrop-filter-blur));
}

.na>*:active {
    background-color: v-bind("theme.fontColor + '3'");
}
</style>