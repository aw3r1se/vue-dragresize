# MacOS Traffic Lights Vue Component

Based on <a href="https://github.com/aw3r1se/macOS-traffic-lights">aw3r1se/macOS-traffic-lights</a>, if you need just svg files, check it first

## 🔧 Installation

```sh
npm i @aw3r1se/vue-dragresize
```

## ✏️ Usage

```vue
<script>
  import { useDragResize } from '@aw3r1se/vue-drag-resize';
  import Resizers from '@aw3r1se/vue-drag-resize';

  const {
    geom,
    style,
    beginDrag,
    beginResize,
    toggleMaximize,
  } = useDragResize({ minSize: 400 });
</script>

<template>
  <div
      :style="style"
      @dblclick="toggleMaximize"
      @mousedown="beginDrag"
  >
    <Resizers @resize-start="beginResize" />
  </div>
</template>
```

If you need to focus/unfocus the buttons, you can use the following functions:
```vue
<script>
  import { ref } from 'vue';
  import TrafficLights from 'macos-traffic-lights-vue';
  
  const trafficLights = ref();
  
  const someFunction = () => {
      if (x) {
          trafficLights.value.focus();
      }
      
      if (y) {
          trafficLights.value.unfocus();
      }
  };
</script>

<template>
  <TrafficLights
      ref="trafficLights"
      @close="handleClose"
      @minimize="handleMinimize"
      @maximize="handleMaximize"
  />
</template>
```

## 🤝 Contributing
If you want to add or improve something - you are welcome

* Fork → Branch → Commit with feat: / fix: prefix
* Test locally
* Open a pull request