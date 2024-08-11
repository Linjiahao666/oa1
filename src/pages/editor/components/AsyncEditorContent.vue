<template>
  <div class="w-full h-full p-4" :class="{ dark: isDark }">
    <div class="w-full h-full border-1 text-white dark" id="editor"></div>
  </div>
</template>

<script setup>
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import Quill from 'quill'
import { QuillBinding } from 'y-quill'
import { useDark } from '@vueuse/core'
import 'quill/dist/quill.snow.css'
const isDark = useDark()
onMounted(() => {
  const quill = new Quill('#editor', {
    theme: 'snow',
  })
  const doc = new Y.Doc()
  const text = doc.getText('quill')
  new QuillBinding(text, quill)
})

</script>

<style scoped>
.dark :deep(.ql-snow .ql-picker-label::before) {
  color: white;
}

/* 更改 Quill 编辑器中 SVG 图标的颜色 */
.dark :deep(.ql-snow .ql-stroke) {
  stroke: white;
}
</style>