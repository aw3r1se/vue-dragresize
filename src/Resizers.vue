<script setup>
defineProps({
    show: { type: Boolean, default: true },
});

const emit = defineEmits(['resize-start']);

const handles = [
    'top-left', 'top', 'top-right',
    'right',
    'bottom-right', 'bottom', 'bottom-left',
    'left',
];

function start(dir, e) {
    emit('resize-start', e, dir);
}
</script>

<template>
    <div
        v-for="dir in handles"
        v-show="show"
        :key="dir"
        class="vdr-handle"
        :class="`vdr-${dir}`"
        @mousedown.prevent="start(dir, $event)"
    />
</template>

<style scoped>
.vdr-handle {
    position: absolute;
    background-color: transparent;
}

/* Corners */
.vdr-top-left,
.vdr-top-right,
.vdr-bottom-right,
.vdr-bottom-left {
    width: 8px;
    height: 8px;
    z-index: 10;
}

/* Edges */
.vdr-top,
.vdr-bottom {
    left: 8px;
    right: 8px;
    height: 8px;
    z-index: 5;
}

.vdr-left,
.vdr-right {
    top: 8px;
    bottom: 8px;
    width: 8px;
    z-index: 5;
}

.vdr-top-left     { top: 0;    left: 0;  cursor: nwse-resize; }
.vdr-top          { top: 0;              cursor: ns-resize; }
.vdr-top-right    { top: 0;    right: 0; cursor: nesw-resize; }
.vdr-right        { right: 0;            cursor: ew-resize; }
.vdr-bottom-right { bottom: 0; right: 0; cursor: nwse-resize; }
.vdr-bottom       { bottom: 0;           cursor: ns-resize; }
.vdr-bottom-left  { bottom: 0; left: 0;  cursor: nesw-resize; }
.vdr-left         { left: 0;             cursor: ew-resize; }
</style>
