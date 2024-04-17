<template>
    <div class="main" :style="{
        ...(props.transition ? {
            width: parentWidth + 'px',
            height: parentHeight + 'px',
        } : {}),
        display: 'grid',
    }" ref="containerParent">
        <div ref="containerChild" style="width: max-content; height: max-content; margin: auto;">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTheme } from "@/stores/theme";
import { useCssVar } from "@vueuse/core";
import { useTransition, TransitionPresets } from "@vueuse/core";
import { onMounted, ref } from "vue";

const props = withDefaults(defineProps<{
    padding?: string,
    borderRadius?: string,
    blur?: string,
    transition?: boolean,
}>(), {
    padding: "1em",
    blur: "var(--backdrop-filter-blur)",
    borderRadius: "1.5em",
    transition: false,
});

const containerParent = ref();
const containerChild = ref();

const childWidth = ref(0);
const childHeight = ref(0);
const parentWidth = useTransition(childWidth, {
    duration: 500,
    transition: TransitionPresets.easeInOutQuad,
});
const parentHeight = useTransition(childHeight, {
    duration: 500,
    transition: TransitionPresets.easeInOutQuad,
});

// 监听containerChild宽度发生变化
const observer = new ResizeObserver(() => {
    childWidth.value = containerChild.value.clientWidth;
    childHeight.value = containerChild.value.clientHeight;
});

onMounted(() => {
    observer.observe(containerChild.value);
    childWidth.value = containerChild.value.clientWidth;
    childHeight.value = containerChild.value.clientHeight;
});

const theme = useTheme();

useCssVar("--border-color").value = theme.fontColor + "2";

defineExpose({
    main: containerParent,
});
</script>

<style scoped>
.main {
    /* position: absolute; */

    transition: background-color 0.7s, color 0.7s;

    text-align: center;

    border: 1px solid v-bind("theme.fontColor + '2'");
    border-radius: v-bind("props.borderRadius");

    padding: v-bind("props.padding");

    box-shadow: 0 0 1em #0006;


    backdrop-filter: blur(v-bind("props.blur"));
    -webkit-backdrop-filter: blur(v-bind("props.blur"));

    width: max-content;
}

.main:active {
    background-color: v-bind("theme.fontColor + '1'");
}
</style>