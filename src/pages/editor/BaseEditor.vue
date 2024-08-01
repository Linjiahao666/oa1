<template>
  <div class="w-full h-full">
    <EditorHead :list="list" />
    <KeepAlive>
      <component :is="currentComponent"></component>
    </KeepAlive>
  </div>
</template>

<script setup>
import EditorHead from './components/EditorHead.vue'
import AsyncEditor from './components/AsyncEditorContent.vue'
import { EditorType } from '@/const/index.ts'
const currentComponent = ref('AsyncEditor')
const list = reactive([
  {
    name: EditorType.ASYNCEDITOR,
    id: 1
  },
  {
    name: EditorType.VUEEDITOR,
    id: 2
  }
])
</script>

<style scoped lang='scss'></style>