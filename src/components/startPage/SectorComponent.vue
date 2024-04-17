<template>
    <div>
        <svg width="10" height="10" :style="{
            zoom: props.zoom,
            transform: `rotate(${props.spin}deg)`,
            position: 'absolute'
    }">
            <path :d="`M5 5 L5 0 A5 5 0 0 1 ${angle1} ${angle2} Z`" :fill="props.color" />
        </svg>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
    zoom?: number,
    angle?: number,
    spin?: number,
    color?: string,
}>(), {
    zoom: 1,
    angle: 45,
    spin: 0,
    color: "red",
});

const angle1 = computed(() => (
    5 + 5 * Math.cos((props.angle - 90) * Math.PI / 180)
));

const angle2 = computed(() => (
    5 + 5 * Math.sin((props.angle - 90) * Math.PI / 180)
));
</script>