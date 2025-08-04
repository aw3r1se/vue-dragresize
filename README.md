# MacOS Traffic Lights Vue Component

## 🔧 Installation

```sh
npm i vue-dragresize
```

## ✏️ Usage

```vue
<script>
  import { useDragResize } from 'vue-drag-resize';
  import Resizers from 'vue-drag-resize';

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

## 🤝 Contributing
If you want to add or improve something - you are welcome

* Fork → Branch → Commit with feat: / fix: prefix
* Test locally
* Open a pull request