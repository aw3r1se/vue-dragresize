import { reactive, computed, onMounted, onBeforeUnmount } from 'vue';

export function useDragResize(options = {}) {
    const minSize  = options.minSize  ?? 200;
    const marginPx = options.marginPx ?? 10;
    const stepPx = options.stepPx ?? 12;   // шаг сетки в пикселях
    const animMs   = options.animMs   ?? 250;

    const geom = reactive({ w: 0, h: 0, x: 0, y: 0 });
    const flags = reactive({
        isDragging : false,
        isResizing : false,
        isMax      : true,
        isAnimating: false,
    });

    let savedGeom = null;

    const style = computed(() => ({
        width : `${geom.w}px`,
        height: `${geom.h}px`,
        left  : `${geom.x}px`,
        top   : `${geom.y}px`,
        transition: flags.isAnimating
            ? `left ${animMs}ms ease, top ${animMs}ms ease, width ${animMs}ms ease, height ${animMs}ms ease`
            : 'none',
    }));

    const startAnim = () => {
        flags.isAnimating = true;
        setTimeout(() => (flags.isAnimating = false), animMs);
    };

    const clampToViewport = () => {
        const maxW = window.innerWidth  - marginPx * 2;
        const maxH = window.innerHeight - marginPx * 2;

        geom.w = flags.isMax ? maxW : Math.min(Math.max(geom.w, minSize), maxW);
        geom.h = flags.isMax ? maxH : Math.min(Math.max(geom.h, minSize), maxH);

        geom.x = Math.min(Math.max(geom.x, -geom.w + marginPx), maxW - marginPx);
        geom.y = Math.min(Math.max(geom.y, -geom.h + marginPx), maxH - marginPx);
    };

    let startMouse = { x: 0, y: 0 };
    let startPos   = { x: 0, y: 0 };
    let startSize  = { w: 0, h: 0 };
    let currentHandle = '';

    const beginDrag = (e) => {
        flags.isDragging = true;
        startMouse = { x: e.clientX, y: e.clientY };
        startPos   = { x: geom.x,   y: geom.y };
    };

    const doDrag = (e) => {
        if (!flags.isDragging) return;
        flags.isMax = false;
        geom.x = startPos.x + (e.clientX - startMouse.x);
        geom.y = startPos.y + (e.clientY - startMouse.y);
    };

    const beginResize = (e, handle) => {
        e.stopPropagation();
        flags.isResizing = true;
        currentHandle    = handle;

        startMouse = { x: e.clientX, y: e.clientY };
        startSize  = { w: geom.w, h: geom.h };
        startPos   = { x: geom.x, y: geom.y };
    };

    const doResize = (e) => {
        if (!flags.isResizing) return;

        const dx = e.clientX - startMouse.x;
        const dy = e.clientY - startMouse.y;

        let w = startSize.w;
        let h = startSize.h;

        if (currentHandle.includes('right'))  w += dx;
        if (currentHandle.includes('left'))   w -= dx;
        if (currentHandle.includes('bottom')) h += dy;
        if (currentHandle.includes('top'))    h -= dy;

        w = Math.max(minSize, Math.round(w / stepPx) * stepPx);
        h = Math.max(minSize, Math.round(h / stepPx) * stepPx);

        let x = startPos.x;
        let y = startPos.y;
        if (currentHandle.includes('left')) x = startPos.x + (startSize.w - w);
        if (currentHandle.includes('top'))  y = startPos.y + (startSize.h - h);

        Object.assign(geom, { w, h, x, y });
        flags.isMax = false;
        clampToViewport();
    };

    const stopActions = () => {
        if (flags.isDragging || flags.isResizing) {
            flags.isDragging = false;
            flags.isResizing = false;
            clampToViewport();
        }
    };

    const toggleMaximize = () => {
        startAnim();
        const maxW = window.innerWidth  - marginPx * 2;
        const maxH = window.innerHeight - marginPx * 2;

        if (flags.isMax) {
            if (!savedGeom) {
                const halfW = Math.max(minSize, Math.floor(maxW / 2));
                const halfH = Math.max(minSize, Math.floor(maxH / 2));
                Object.assign(geom, {
                    w: halfW,
                    h: halfH,
                    x: Math.floor((maxW - halfW) / 2),
                    y: Math.floor((maxH - halfH) / 2),
                });
            } else {
                Object.assign(geom, savedGeom);
            }
            flags.isMax = false;
        } else {
            savedGeom = { ...geom };
            Object.assign(geom, { w: maxW, h: maxH, x: 0, y: 0 });
            flags.isMax = true;
        }
    };

    onMounted(() => {
        clampToViewport();
        window.addEventListener('mousemove', doDrag);
        window.addEventListener('mousemove', doResize);
        window.addEventListener('mouseup',   stopActions);
        window.addEventListener('resize',    clampToViewport);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('mousemove', doDrag);
        window.removeEventListener('mousemove', doResize);
        window.removeEventListener('mouseup',   stopActions);
        window.removeEventListener('resize',    clampToViewport);
    });

    return {
        geom,
        flags,
        style,
        beginDrag,
        beginResize,
        toggleMaximize,
        clampToViewport,
    };
}
