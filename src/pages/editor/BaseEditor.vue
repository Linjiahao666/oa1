<template>
  <div class="w-full h-full">
    <EditorHead :list="list" @tabChange="changeComp" />
    <EditorContainer class="bg-editor">
      <KeepAlive>
        <AsyncEditor v-if="currentComponent === 0" />
        <VueEditor v-else />
      </KeepAlive>
    </EditorContainer>
  </div>
</template>

<script setup>
import EditorHead from './components/EditorHead.vue'
import AsyncEditor from './components/AsyncEditorContent.vue'
import EditorContainer from './components/EditorContainer.vue'
import { EditorType } from '@/const/index.ts'
import VueEditor from './components/VueEditorContent.vue'
const currentComponent = ref(0)
const changeComp = (index) => {
  currentComponent.value = index
};
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