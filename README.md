# Drag and resize vue-component

## 🔧 Installation

```sh
npm i @aw3r1se/vue-dragresize
```

## ✏️ Usage

```vue
<script>
  import { useDragResize, Resizers } from '@aw3r1se/vue-dragresize';

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