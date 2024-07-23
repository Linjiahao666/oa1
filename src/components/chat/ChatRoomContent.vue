<template>
  <div class="flex flex-col w-full h-full relative">
    <ChatRoomContentHead />
    <ChatRoomContentBody ref="body" />
    <div class="resize-handle" @mousedown="startResize" ref="resize"></div>
    <ChatRoomContentFooter ref="footer" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import ChatRoomContentBody from './ChatRoomContentBody.vue';
import ChatRoomContentFooter from './ChatRoomContentFooter.vue';
import ChatRoomContentHead from './ChatRoomContentHead.vue';

const body = ref();
const footer = ref();
const resize = ref();

function startResize(event) {
  const startY = event.clientY;
  console.log(object);
  function doResize(moveEvent) {

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
  position: absolute;
  cursor: ns-resize;
  height: 2px;
  width: 100%;
  position: absolute;
  transition-duration: .3s;
  background-color: var(--el-border-color);
  bottom: 10rem;

  &:hover {
    height: 5px;
  }
}
</style>