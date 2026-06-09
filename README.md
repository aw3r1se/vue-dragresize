# vue-dragresize

A tiny, dependency-free drag-and-resize primitive for Vue 3. It ships a `useDragResize`
composable that owns the geometry/state and a `Resizers` component that renders the eight
resize handles — you bring your own markup and styling for the box itself.

- 🪶 No runtime dependencies (Vue 3 peer only)
- 🧲 Grid snapping, min-size and viewport clamping built in
- 🔳 Maximize / restore with an animated transition
- 🎨 Self-contained handle styles — no Tailwind or global CSS required

## 🔧 Installation

```sh
npm i @aw3r1se/vue-dragresize
```

> The package is published as Vue source (`.vue` + ESM), so your bundler needs a Vue SFC
> compiler (Vite, Vue CLI, etc.) — which any Vue 3 app already has.

## ✏️ Usage

```vue
<script setup>
import { useDragResize, Resizers } from '@aw3r1se/vue-dragresize';

const {
  style,
  beginDrag,
  beginResize,
  toggleMaximize,
} = useDragResize({ minSize: 400 });
</script>

<template>
  <div
    class="box"
    :style="style"
    @mousedown="beginDrag"
    @dblclick="toggleMaximize"
  >
    <!-- your content -->
    <Resizers @resize-start="beginResize" />
  </div>
</template>

<style>
.box {
  position: absolute; /* required — geometry is driven by left/top/width/height */
}
</style>
```

The element must be `position: absolute` (or `fixed`); `style` sets `left`, `top`,
`width`, and `height` in pixels.

## ⚙️ API

### `useDragResize(options?)`

| Option     | Type     | Default | Description                                          |
| ---------- | -------- | ------- | ---------------------------------------------------- |
| `minSize`  | `number` | `200`   | Minimum width and height, in pixels.                 |
| `marginPx` | `number` | `10`    | Gap kept between the box and the viewport edges.     |
| `stepPx`   | `number` | `12`    | Grid step the box snaps to while resizing.           |
| `animMs`   | `number` | `250`   | Duration of the maximize/restore transition, in ms.  |

Returns:

| Key              | Type                       | Description                                                        |
| ---------------- | -------------------------- | ----------------------------------------------------------------- |
| `geom`           | `reactive({ w,h,x,y })`    | Current size and position in pixels.                              |
| `flags`          | `reactive`                 | `{ isDragging, isResizing, isMax, isAnimating }`.                 |
| `style`          | `ComputedRef<object>`      | Bind to the box's `:style`.                                       |
| `beginDrag`      | `(e: MouseEvent) => void`  | Wire to the box's `@mousedown` to start dragging.                 |
| `beginResize`    | `(e, handle) => void`      | Wire to `Resizers`' `@resize-start`.                             |
| `toggleMaximize` | `() => void`               | Toggle maximized / restored state.                                |
| `clampToViewport`| `() => void`               | Re-clamp the box into the viewport (called automatically).        |

The composable registers `mousemove`, `mouseup` and `resize` listeners on `window` while
mounted and removes them on unmount.

### `<Resizers />`

| Prop   | Type      | Default | Description                  |
| ------ | --------- | ------- | ---------------------------- |
| `show` | `boolean` | `true`  | Toggle handle visibility.    |

| Event          | Payload                              | Description                          |
| -------------- | ------------------------------------ | ------------------------------------ |
| `resize-start` | `(e: MouseEvent, handle: string)`    | Emitted on handle `mousedown`.       |

`handle` is one of `top-left`, `top`, `top-right`, `right`, `bottom-right`, `bottom`,
`bottom-left`, `left`. The component is positioned `absolute`ly, so its parent (the box)
should be a positioned element.

## 🤝 Contributing

If you want to add or improve something — you're welcome:

* Fork → Branch → Commit with a `feat:` / `fix:` prefix
* Test locally
* Open a pull request
