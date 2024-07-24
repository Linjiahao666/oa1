<template>
  <div class="flex flex-col w-full h-full">
    <ChatRoomContentHead />
    <ChatRoomContentBody ref="body" />
    <div class="resize-handle" @mousedown="startResize"></div>
    <ChatRoomContentFooter ref="footer" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import ChatRoomContentBody from './ChatRoomContentBody.vue';
import ChatRoomContentFooter from './ChatRoomContentFooter.vue';
import ChatRoomContentHead from './ChatRoomContentHead.vue';
const footer = ref();
const body = ref()
function startResize(event) {
  const startY = event.clientY;
  const initHeight = footer.value.$el.offsetHeight;
  const bodyHeight = body.value.$el.offsetHeight;
  function doResize(e) {
    const diff = e.clientY - startY;
    const newHeight = initHeight - diff;
    const newBodyHeight = bodyHeight + diff;
    if (newHeight < 150 || newBodyHeight < 100) return;
    footer.value.$el.style.height = `${newHeight}px`;
  }

  function stopResize() {
    window.removeEventListener('mousemove', doResize);
    window.removeEventListener('mouseup', stopResize);
  }

  window.addEventListener('mousemove', doResize);
  window.addEventListener('mouseup', stopResize);
}


</script>

<style scoped lang='scss'>
.resize-handle {
  cursor: row-resize;
  height: 1px;
  width: 100%;
  transition-duration: .3s;
  background-color: var(--el-border-color);
  position: relative;

  &::after,
  &::before {
    content: '';
    height: 3px;
    width: 100%;
    opacity: 0;
    background-color: var(--el-border-color);
    display: block;
    transition-duration: .3s;
    position: absolute;
  }

  &::before {
    top: -100%;
  }

  &::after {
    bottom: 100%;
  }

  &:hover::after,
  &:hover::before {
    opacity: 1;
  }
}
</style>