<template>
  <div class="w-full h-full">
    <slot>
      <div class="max-w-64 bg-green-400 rounded p-2" :class="[isSender ? 'sender-text' : 'receiver-text']"
        v-if="type === MESSAGETYPE.TEXT">
        <p>{{ text }}</p>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { MESSAGETYPE } from '@/const/index.ts'
import { inject } from 'vue';
const { type, text } = defineProps({
  type: {
    type: String,
    default: MESSAGETYPE.TEXT,
  },
  text: {
    type: String,
    default: 'a small text'.repeat(10),
  },
})
const isSender = inject('isSender')
</script>

<style scoped lang='scss'>
.sender-text,
.receiver-text {
  position: relative;
  $size: 10px;

  &::after {
    content: '';
    display: block;
    position: absolute;
    width: $size;
    height: $size;
    transform: rotate(45deg) translate(50%);
    top: 10px;
    right: 0;
    background-color: rgb(74 222 128);
    z-index: -1;
  }
}

.sender-text {
  &::after {
    transform: rotate(45deg) translate(50%);
    top: 10px;
    right: 0;
  }
}

.receiver-text {
  &::after {
    transform: rotate(-45deg) translate(-50%);
    top: 10px;
    left: 0;
  }
}
</style>