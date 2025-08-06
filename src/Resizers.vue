<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    show: { type: Boolean, default: true },
});

const emit = defineEmits(['resize-start']);

const dirs = [
    'top-left', 'top', 'top-right',
    'right',
    'bottom-right', 'bottom', 'bottom-left',
    'left',
];

const classes = (dir) => {
    const base = 'w-2 h-2';
    switch (dir) {
    case 'top-left':     return `${base} cursor-nw-resize top-0 left-0`;
    case 'top':          return 'h-2 left-2 right-2 cursor-ns-resize top-0';
    case 'top-right':    return `${base} cursor-ne-resize top-0 right-0`;
    case 'right':        return 'w-2 top-2 bottom-2 cursor-ew-resize right-0';
    case 'bottom-right': return `${base} cursor-nw-resize bottom-0 right-0`;
    case 'bottom':       return 'h-2 left-2 right-2 cursor-ns-resize bottom-0';
    case 'bottom-left':  return `${base} cursor-ne-resize bottom-0 left-0`;
    case 'left':         return 'w-2 top-2 bottom-2 cursor-ew-resize left-0';
    default:             return '';
    }
};

function start(dir, e) {
    emit('resize-start', e, dir);
}
</script>

<template>
    <template
        v-for="dir in dirs"
        :key="dir"
    >
        <div
            v-show="props.show"
            class="absolute z-10 bg-transparent"
            :class="classes(dir)"
            @mousedown.prevent="(e) => start(dir, e)"
        />
    </template>
</template>

<style>
    @import 'tailwindcss';
</style>
