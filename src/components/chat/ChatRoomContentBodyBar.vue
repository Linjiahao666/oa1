<template>
  <div class="flex flex-row p-2" :class="[isSender ? 'justify-end' : 'justify-start']">
    <div class="flex" :class="[isSender ? 'flex-row-reverse' : 'flex-row']">
      <el-icon class="border-2 w-8 h-8 rounded-full">
        <User />
      </el-icon>
      <div class="mx-2">
        <ChatRoomContentBodyMessage />
      </div>
    </div>
  </div>
</template>

<script setup>
// import { computed, inject, provide } from 'vue';
import ChatRoomContentBodyMessage from './ChatRoomContentBodyMessage.vue';
const { role } = defineProps({
  role: {
    type: String,
    default: 'receiver',
    validator(value) {
      return ['sender', 'receiver'].includes(value)
    }
  }
})
const isSender = computed(() => {
  return role === 'sender'
})

provide('isSender', isSender)
</script>

<style scoped lang='scss'></style>